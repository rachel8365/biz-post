import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

//get all cards
export function getCards() {
    return axios.get(api)
}

export function getCardByUserId(id: string) {
    return axios.get(`${api}/by-userid/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

//get card by id
export function getCardByCardId(id: string) {
    return axios.get(`${api}/${id}`)
}

//post new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

//update card
export function updateCard(updateCard: Card, id: string) {
    return axios.put(`${api}/my-cards/update/${id}`, updateCard, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

//delet card
export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// get card details
export function getCardDetails(id: string) {
    return axios.get(`${api}/card-detailse/${id}`)
}

