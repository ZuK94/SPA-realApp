import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";
import { toast } from "react-toastify";

const LogIn = () => {
  const [error, setError] = useState("");
  const { loginUser: logIn, user } = useAuth();
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidationUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(150)
        .required(),
      password: Joi.string()
        .min(8)
        .max(20)
        .base64({ paddingRequired: false })
        .required(),
    }),
    async onSubmit(values) {
      setError("");

      try {
        await logIn(values);
        navigate("/my-cards");
        toast("you have logged in successfully");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="SPA-realApp" />;
  }
  return (
    <>
      <PageHeader title={"Log in"} description={"Log in to your account"} />

      {error && <div className="alert alert-danger">{error}</div>}
      <form autoComplete="off" onSubmit={form.handleSubmit}>
        <Input
          type={"email"}
          label={"Email address"}
          name={"email"}
          error={form.touched.email && form.errors.email}
          {...form.getFieldProps("email")}
        />{" "}
        <Input
          type={"password"}
          label={"Password"}
          name={"password"}
          error={form.touched.password && form.errors.password}
          {...form.getFieldProps("password")}
        />
        <button type="submit" className="btn btn-primary ">
          Log in
        </button>
      </form>
    </>
  );
};
export default LogIn;
