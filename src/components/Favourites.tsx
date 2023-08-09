import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getUserById, updateUser } from "../services/usersService";
import { getCardByCardId } from "../services/cardsService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbackService";


interface FavouritesProps {
    userInfo: any;
}


const Favourites: FunctionComponent<FavouritesProps> = ({ userInfo }) => {
    const loadFavCards = (favCardIds: number[]) => {
        return Promise.all(
            favCardIds.map(cardId => getCardByCardId(cardId))
        )
            .then(res => setFavCards(res.map(cardId => cardId.data)))
    }

    let userId: number = JSON.parse(sessionStorage.getItem("userInfo") as string).id;

    let [favCards, setFavCards] = useState<Card[]>([])

    useEffect(() => {
        getUserById(userId)
            .then(res => loadFavCards(res.data[0].favCards as number[]))
            .catch((err) => console.log(err))
    }, [userId]);

    let removeFavorits = (cardId: number | undefined) => {
        let user: User;
        getUserById(userInfo.id)
            .then(res => {
                user = res.data[0] as User
                if (user.id === undefined) { return; }
                user.favCards = user.favCards?.filter(x => x !== cardId)
                return (updateUser(user, user.id), successMsg("Removed from favorites"))

            })
            .then(() => loadFavCards(user.favCards || []))
    }

    return (
        <>
            <h1 className="display-3 text-center">FAVOURITS</h1>
            {favCards.length ? (
                <div className="container ">
                    <div className="row">
                        {favCards.map((card: Card) => (
                            <div key={card.id} className="card col-md-4 mx-3  mt-5 mb-5 border-raduse pt-2" style={{ width: "25rem" }} >
                                <img src={card.imageUrl} className="card-img-top" alt={card.imageAlt} />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.subtitle}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">phone: {card.phone}</li>
                                    <li className="list-group-item">Email: {card.email}</li>
                                </ul>
                                <i className="fa-solid fa-heart" onClick={() => removeFavorits(card.id)}></i>
                            </div>
                        ))}
                    </div>
                </div >
            ) : (<p className="display-3 text-center mt-5">No favourites cards :)</p >)
            }
        </>
    )
}

export default Favourites;