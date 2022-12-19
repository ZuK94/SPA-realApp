import { httpService } from "./httpService";

export const createCard = (card) => {
  return httpService.post("/cards", card);
};
export const updateCard = (id, card) => {
  return httpService.put(`/cards/${id}`, card);
};
export const getCard = (id) => {
  return httpService.get(`/cards/${id}`);
};
export const deleteCard = (id) => {
  return httpService.delete(`/cards/${id}`);
};
export const getMyCards = () => {
  return httpService.get(`/cards/my-cards`);
};

export const cardService = {
  createCard,
  updateCard,
  getCard,
  deleteCard,
  getMyCards,
};
