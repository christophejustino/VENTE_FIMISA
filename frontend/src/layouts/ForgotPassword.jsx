import React, { useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion";
import CircleLoader from "../components/CircleLoader/CircleLoader";
import SwiperComponent from "../components/Swiper/Swiper";
import { TabTitle } from "../utils/GeneralFunctions";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useSignIn } from "@clerk/clerk-react";

const ForgotPassword = () => {
  TabTitle("Mot de passe oublié");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().required("Veuillez entrer votre adresse email"),
  });
  const { isLoaded, signIn, setActive } = useSignIn();
  if (!isLoaded) {
    return null;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await signIn
        ?.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        })
        .then((_) => {
          setCodeSent(true);
        })
        .catch((err) => console.error("error", err.errors[0].longMessage));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onPressReset = async () => {
    setCode(code);
    await signIn
    ?.attemptFirstFactor({
      strategy: "reset_password_email_code",
      code,
    })
    .then((result) => {
      if (result.status === "needs_new_password") setChangePassword(true);
      setIsLoading(true);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <main className="w-full h-screen flex items-center justify-center dark:bg-white">
      <div
        className="h-full lg:h-[91vh] w-full lg:w-[82vw] grid grid-cols-1 lg:grid-cols-2"
      >
        <motion.section
          initial={{ x: -950 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="mx-auto w-[80%] relative mt-12"
        >
          <div className="w-full sm:w-[450px] h-[590px] mx-auto py-16">
            <div className="logo flex justify-center items-center ">
              <img className=" w-24 object-contain " src="logo.png" alt="" />
            </div>
            <div className="text-center my-4">
              <h1 className="text-gray-600 text-xl font-mono font-semibold ">
                Mot de passe oublié
              </h1>
            </div>
            <div className="text-center my-4">
              {/* <h1 className="text-gray-600 font-mono font-semibold ">
                Veuillez entrer vos coordonnées
              </h1> */}
            </div>
            {!changePassword && (
              <>
                {!codeSent && (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <Input
                      label="Entrez votre adresse email"
                      type="email"
                      id="email"
                      name="email"
                      errors={errors.email}
                      disable={isLoading}
                      state={{ ...register("email") }}
                    />
                    <p className="text-sm text-rose-600">
                      {errors?.email?.message}
                    </p>
                    <Button
                      type={"submit"}
                      width="w-full block"
                      styles="my-8"
                      color="bg-gradient-to-r from-indigo-800 to-blue-400"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center text-white mx-32 md:mx-48 w-10 h-10 -mt-2">
                          <CircleLoader />
                        </div>
                      ) : (
                        "Email envoyer"
                      )}
                    </Button>
                  </form>
                )}
                {codeSent && (
                  <div className="w-full">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-semibold  leading-6 text-gray-900">
                        Entrez votre code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className={clsx(
                            "block w-full rounded-md border-0 focus:ring-blue-600 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 text-gray-900 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset"
                          )}
                        />
                        <p className="text-sm text-rose-600">
                          {errors?.email?.message}
                        </p>
                        <Button
                          onClick={onPressReset}
                          type={"button"}
                          width="w-full block"
                          styles="my-8"
                          color="bg-gradient-to-r from-indigo-800 to-blue-400"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center text-white mx-32 md:mx-48 w-10 h-10 -mt-2">
                              <CircleLoader />
                            </div>
                          ) : (
                            "Vérifier Code"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {changePassword && <ResetPassword />}
            <p className="flex items-center justify-center">
              You have an account ?
              <Link to="/" className="text-indigo-600 underline">
                Se connecter
              </Link>
            </p>
          </div>
        </motion.section>
        <motion.section
          initial={{ x: 950 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="hidden lg:block"
        >
          <SwiperComponent />
        </motion.section>
      </div>
    </main>
  );
};
function ResetPassword() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup.string().min(8).required("Entrez votre mot de passe"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mot de passe must match")
      .required("Entrez votre confirmation mot de passe"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { isLoaded, signIn, setActive } = useSignIn();
  if (!isLoaded) {
    return null;
  }

  const onSubmit = async (data) => {
    console.log(data);
    await signIn
      ?.resetPassword({
        password: data.password,
      })
      .then((result) => {
        console.log(result);
        if (result.status === "complete") {
          console.log("Mot de passe changé avec succès");
          setActive({ session: result.createdSessionId });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="text-center text-base flex items-center justify-center font-bold my-2">
        Réinitialiser le mot de passe
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nouveau mot de passe"
          type="password"
          id="password"
          name="password"
          errors={errors.password}
          state={{ ...register("password") }}
        />
        <p className="text-sm text-rose-600">{errors?.password?.message}</p>
        <Input
          label="Confirm mot de passe"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          errors={errors.confirmPassword}
          state={{ ...register("confirmPassword") }}
        />
        <p className="text-sm text-rose-600">
          {errors?.confirmPassword?.message}
        </p>
        <Button
          type={"submit"}
          width="w-full block"
          styles="my-8"
          color="bg-gradient-to-r from-indigo-800 to-blue-400"
        >
          Réinitialiser mot de passe
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
