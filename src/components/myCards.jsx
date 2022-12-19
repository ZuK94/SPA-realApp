import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cardService } from "../services/cardService";

import PageHeader from "./common/pageHeader";
import UserCard from "./common/userCard";

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  const { getMyCards } = cardService;

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await getMyCards();
        setCards(response.data);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    };
    getCards();
  }, []);

  return (
    <>
      <div className=" d-flex flex-column flex-sm-row-reversed w-100 position-relative justify-content-center ">
        <div className="top-50 start-0 position-absolute">
          <button className="btn  btn-primary">
            <NavLink
              className={"text-decoration-none"}
              style={{ color: "white" }}
              to={"/card-creator"}
            >
              Create a card
            </NavLink>
          </button>
        </div>
        <div>
          <PageHeader
            title={"My Cards"}
            description={"here you'll see your personal cards"}
          />
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center row ">
        {cards.map((card) => {
          return (
            <UserCard
              key={card._id}
              id={card._id}
              name={card.bizName}
              description={card.bizDescription}
              address={card.bizAddress}
              phone={card.bizPhone}
              image={card.bizImage}
            />
          );
        })}
      </div>
    </>
  );
};
export default MyCards;
