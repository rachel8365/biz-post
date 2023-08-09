import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

//get all cards
export function getCards() {
    return axios.get(api)
}

//get specific card by id
export function getCardByUserId(id: number) {
    return axios.get(`${api}?userId=${id}`)
}

//get card by id
export function getCardByCardId(id: number) {
    return axios.get(`${api}/${id}`)
}

//post new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard)
}

//update card
export function updateCard(updateCard: Card, id: number) {
    return axios.put(`${api}/${id}`, updateCard)
}

//delet card
export function deleteCard(id: number) {
    return axios.delete(`${api}/${id}`)
}

