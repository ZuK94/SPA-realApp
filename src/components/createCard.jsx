import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cardService, createCard } from "../services/cardService";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

const CreateCard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createCard: createUserCard } = cardService;
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: ``,
      bizDescription: ``,
      bizAddress: ``,
      bizPhone: ``,
      bizImage: ``,
    },
    validate: formikValidationUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("business name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("business description"),
      bizAddress: Joi.string()
        .min(2)
        .max(400)
        .required()
        .label("business address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .regex(/^0[2-9]\d{7,8}$/)
        .required()
        .label("business phone"),
      bizImage: Joi.string().allow("").min(11).max(1024).label("business logo"),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }
        const response = await createUserCard(body);
        if (response && response.status === 200) {
          toast("your card has been created");
          return navigate("/my-cards");
        }
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader
        title={"Card creator"}
        description={"personal cards creator HUB"}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <form noValidate onSubmit={form.handleSubmit} className="my-3">
        <Input
          type={"text"}
          label={"Business name"}
          name={"bizName"}
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps("bizName")}
        />
        <Input
          type={"text"}
          label={"Business description"}
          name={"bizDescription"}
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps("bizDescription")}
        />
        <Input
          type={"text"}
          label={"Business address"}
          name={"bizAddress"}
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps("bizAddress")}
        />
        <Input
          type={"tel"}
          label={"Business Phone number"}
          name={"bizPhone"}
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps("bizPhone")}
        />
        <Input
          type={"text"}
          label={"Business logo"}
          name={"bizImage"}
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps("bizImage")}
        />

        <button type="submit" className="btn btn-success">
          Create card
        </button>
      </form>
    </>
  );
};
export default CreateCard;
