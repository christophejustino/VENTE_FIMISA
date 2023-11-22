import React, { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useSignUp} from "@clerk/clerk-react";
import CheckCode from "./CheckCode";

const CreerCompteLayout = () => {
  const { register, handleSubmit } = useForm();
  const { isLoaded, signUp, setActive} = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    if (!isLoaded) {
      // handle loading state
      return null;
    }

    try {
      
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.pseudo,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <>
    </>
  );
};

export default CreerCompteLayout;
