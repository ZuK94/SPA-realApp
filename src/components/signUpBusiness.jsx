import { useFormik } from "formik";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";

const SignUpBusiness = () => {
  const { user, createUser, loginUser: logIn } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: ``,
      email: ``,
      password: ``,
    },
    validate: formikValidationUsingJoi({
      name: Joi.string().min(2).max(15).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(150)
        .required(),
      password: Joi.string().min(8).max(20).required(),
    }),
    async onSubmit(values) {
      setError("");
      try {
        await createUser({ ...values, biz: true });
        toast("your business account is ready");
        await logIn({ email: values.email, password: values.password });
        navigate("/SPA-realApp/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to={"/SPA-realApp"} />;
  }
  return (
    <>
      <PageHeader
        title={"Sign up for a Business account"}
        description={`create your business account here`}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <form autoComplete="off" noValidate onSubmit={form.handleSubmit}>
        <Input
          type={"text"}
          label={"Name"}
          name={"name"}
          error={form.touched.name && form.errors.name}
          {...form.getFieldProps("name")}
        />
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
        <button type="submit" className="btn btn-warning btn-outline-secondary">
          Sign-Up Now
        </button>
      </form>
    </>
  );
};

export default SignUpBusiness;
