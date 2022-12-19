import { useEffect, useState } from "react";
import { getCard } from "../services/cardService";

const useCardId = (id) => {
  const [card, setCard] = useState(null);
  useEffect(() => {
    const getId = async () => {
      const { data } = await getCard(id);
      setCard(data);
    };
    getId();
  }, []);
  return card;
};
export default useCardId;
