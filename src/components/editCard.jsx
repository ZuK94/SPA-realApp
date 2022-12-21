import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useCardId from "../hooks/useCardId";
import { cardService } from "../services/cardService";
import formikValidationUsingJoi from "../utils/formikValidationUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

const EditCard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateCard } = cardService;
  const { id } = useParams();
  const card = useCardId(id);

  useEffect(() => {
    if (!card) {
      return;
    }
    const { bizName, bizAddress, bizDescription, bizImage, bizPhone } = card;
    form.setValues({
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
    });
  }, [card]);

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
        .regex(/^0[2-9]\d{7,8}$/, { name: "legal phone number" })
        .required()
        .label("business phone"),
      bizImage: Joi.string()
        .regex(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
          { name: "legal image URL" }
        )
        .allow("")
        .min(11)
        .max(2048)
        .label("business logo"),
    }),
    async onSubmit(values) {
      setError("");
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }
        const response = await updateCard(id, body);
        if (response && response.status === 200) {
          toast("your card has been updated");
          return navigate("/SPA-realApp/my-cards");
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
        title={"Edit your card"}
        description={"personal cards editor HUB"}
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
          update card
        </button>
      </form>
    </>
  );
};
export default EditCard;
