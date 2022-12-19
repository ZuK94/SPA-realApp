import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardService } from "../services/cardService";

const DeleteCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteCard = async () => {
      await cardService.deleteCard(id);
      navigate("/my-cards");
    };
    deleteCard();
  }, []);
  return null;
};
export default DeleteCard;
