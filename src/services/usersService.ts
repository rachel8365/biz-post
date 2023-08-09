import axios from "axios";
import User from "../interfaces/User";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/users`;

//login
export function checkUser(userToCheck: User) {
    return axios.get(`${api}?email=${userToCheck.email}&password=${userToCheck.password}`);
}

//register
export function addUser(newUser: User) {
    return axios.post(api, newUser);
}

//get card by user id
export function getUserById(id: number) {
    return axios.get(`${api}?id=${id}`)
}


//add to arrey fevorite
export async function addCardToFav(userId: number, cardId: number) {
    try {
        let res = await getUserById(userId);
        const favCards = res.data[0].favCards;
        if (!favCards.includes(cardId)) {
            favCards.push(cardId)
        }
        return axios.patch(`${api}/${res.data[0].id}`, {
            favCards
        });
    } catch (error) {
        console.log(error);
    }
}

//updateUser
export function updateUser(updateUser: User, id: number) {
    return axios.put(`${api}/${id}`, updateUser)
}