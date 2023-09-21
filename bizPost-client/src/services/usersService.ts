import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode"

let api: string = `${process.env.REACT_APP_API}`;

//login
export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck);
}

//register
export function addUser(newUser: User) {
    return axios.post(`${api}/register`, newUser);
}

//get user by user id
export function getUserById(id: string) {
    return axios.get(`${api}/users/${id}`,
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// add card to array favorite
export async function addCardToFav(userId: string, cardId: string) {
    try {
        const token = JSON.parse(sessionStorage.getItem("token") as string).token
        return axios.put(`${api}/users/${userId}/${cardId}`, token, {
            headers: { "Authorization": token },

        });
    } catch (error) {
        console.log(error);
    }
}

//updateUser
export function updateUser(updateUser: User, id: string) {
    return axios.put(`${api}/${id}`, updateUser)
}

//get token details
export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwt_decode(token);
}