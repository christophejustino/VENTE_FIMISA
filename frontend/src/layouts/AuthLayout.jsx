import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion";
import SwiperComponent from "../components/Swiper/Swiper";
import { TabTitle } from "../utils/GeneralFunctions";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-react";
import * as yup from "yup";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const AuthLayout = () => {
  TabTitle("Se connecter à FIMISA");
  const schema = yup.object().shape({
    email: yup.string().required("Veuillez entrer votre adresse email"),
    password: yup
      .string()
      .min(8)
      .required("Veuillez entrer votre mot de passe"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    console.log(data);
    if (!isLoaded) {
      return;
    }
    try {
      setIsLoading(true);
      const result = await signIn
        .create({
          identifier: data.email,
          password: data.password,
        })
        .then(async (result) => {
          setIsLoading(true);
          if (result.status === "complete") {
            console.log(result);
            await setActive({ session: result.createdSessionId });
            navigate("/");
          } else {
            /*Investigate why the login hasn't completed */
            console.log(result);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.errors[0].meta.paramName === "identifier") {
            setError("email", { message: "Adresse email est introuvable" });
          }
          if (err.errors[0].meta.paramName === "password") {
            setError("password", { message: "Mot de passe est incorrect" });
          }
        });
    } catch (err) {
      console.error("error", err);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <main className="w-full h-screen min-h-[150px] flex max-w-[1366px] bg-white items-center justify-center">
      <div className="h-full lg:h-[91vh] min-h-[150px] max-w-[1366px] w-full lg:w-[86vw] grid grid-cols-1 lg:grid-cols-2">
        <motion.section
          initial={{ x: -950 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="mx-auto w-[80%] relative"
        >
          <div className="w-full sm:w-[450px] h-[590px] mx-auto py-16">
            <div className="logo flex justify-center items-center ">
              <img
                className=" md:w-24 w-24 object-contain"
                src="logo.png"
                alt=""
              />
            </div>
            <div className="text-center font-semibold text-2xl my-3">
              <h1>Bienvenue à nouveau !</h1>
            </div>
            <div className="text-center my-4">
              <h1 className="text-gray-600 font-semibold ">
                Veuillez entrer vos coordonnées
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                errors={errors.email}
                disable={isLoading}
                state={{ ...register("email") }}
              />
              <p className="text-sm text-rose-600">{errors?.email?.message}</p>

              <Input
                label="Mot de passe"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                errors={errors.password}
                disable={isLoading}
                state={{ ...register("password") }}
              />
              <p className="text-sm text-rose-600">
                {errors?.password?.message}
              </p>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 focus:ring-white cursor-pointer "
                  checked={isPasswordVisible}
                  onChange={togglePasswordVisibility}
                />
                <span className="text-sm text-gray-900 font-semibold cursor-pointer">
                  Afficher mot de passe
                </span>
              </label>

              <Button
                width="w-full block"
                styles="my-6"
                color="bg-gradient-to-r from-indigo-800 to-blue-400"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center text-white mx-32 md:mx-48 w-10 h-10 -mt-2">
                    <CircleLoader />
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
            <div className="absolute right-0 -my-4 md:mx-3">
              <Link
                to="/forgot-password"
                className="text-gray-500 cursor-pointer hover:underline hover:text-blue-700"
              >
                <p>Mot de passe oublié?</p>
              </Link>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ x: 950 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="hidden lg:block shadow bg-slate-50 rounded-lg"
        >
          <SwiperComponent />
        </motion.section>
      </div>
    </main>
  );
};

export default AuthLayout;
