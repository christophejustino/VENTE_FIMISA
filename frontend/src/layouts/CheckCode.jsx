import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";

const CheckCode = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return null;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex flex-col sm:w-[450px] items-center justify-center">
        <h1 className="font-bold text-2xl mt-4">Créer un compte</h1>
        <p className="font-bold">
          Entrer la vérification code envoyée par votre adresse email
        </p>
        <form className="w-full flex flex-col space-y-6 mt-6 items-center justify-center">
          <div className="w-full space-y-2">
            <Input label="Code" type="text" />
          </div>
          <button className="bg-blue-600 h-10 w-full rounded-lg">
            Vérifier Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckCode;
