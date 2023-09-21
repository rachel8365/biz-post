import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addCardToFav, getUserById, updateUser } from "../services/usersService";
import { getCardByCardId } from "../services/cardsService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbackService";


interface FavouritesProps {
    userInfo: any;
}

const Favourites: FunctionComponent<FavouritesProps> = ({ userInfo }) => {
    const [user, setUser] = useState<User | undefined>()
    useEffect(() => {
        if (userInfo.id === undefined) { return; }
        getUserById(userInfo.id)
            ?.then(res => setUser(res.data))
            .catch((err) => console.log(err))
    }, [userInfo.id]);

    let removeFavorits = (cardId: string | undefined) => {
        if (!userInfo?.id || !cardId) return
        if (user && user.favCards?.find(card => card._id === cardId)) {
            let cards = user.favCards
            let idx = user.favCards.findIndex(c => c._id === cardId)
            cards.splice(idx, 1)
            setUser({ ...user, favCards: cards } as any)
        }

        addCardToFav(userInfo.id!, cardId)
            .then((res) => {
                successMsg("Card removed from favorites");

            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <h1 className="display-3 text-center">FAVOURITS</h1>
            {user?.favCards?.length ? (
                <div className="container ">
                    <div className="row">
                        {user.favCards.map((card: Card) => (
                            <div key={card._id} className="card col-md-4 mx-3  mt-5 mb-5 border-raduse pt-2" style={{ width: "25rem" }} >
                                <img src={card.imageUrl} className="card-img-top" alt={card.imageAlt} />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.subtitle}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">phone: {card.phone}</li>
                                    <li className="list-group-item">Email: {card.email}</li>
                                </ul>
                                <i className="fa-solid fa-heart" onClick={() => removeFavorits(card._id)} style={{ color: "#ff0000" }}></i>
                            </div>
                        ))}
                    </div>
                </div >
            ) : (<p className="display-3 text-center mt-5">No favourites cards </p >)
            }
        </>
    )
}

export default Favourites;