import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { Link, useNavigate } from "react-router-dom";
import { getCardByCardId, getCards } from "../services/cardsService";
import { addCardToFav, getUserById, updateUser } from "../services/usersService";
import { successMsg } from "../services/feedbackService";
import User from "../interfaces/User";
import { SiteTheme, UserInfo } from "../App";
import { AxiosResponse } from "axios";


interface HomeProps {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;

}

const Home: FunctionComponent<HomeProps> = ({ userInfo, setUserInfo, cards, setCards }) => {
    let theme = useContext(SiteTheme)
    let navigate = useNavigate()
    let [favoriteIds, setFavoriteIds] = useState<string[]>([])
    const [user, setUser] = useState<User | undefined>()
    useEffect(() => {
        if (sessionStorage.getItem("token") === null || userInfo.id === undefined) {
            getCards()
                .then(response => setCards(response.data));
            return;
        }

        const promises = [
            getCards() as Promise<AxiosResponse<Card[], any>>,
            getUserById(userInfo.id) as Promise<AxiosResponse<User, any>>
        ] as const;
        Promise.all(promises)
            .then(([cardsResponse, userResponse]) => {
                setUser(userResponse.data)
                setCards(cardsResponse.data)
            })
            .catch(err => console.log(err))
    }, [userInfo.id]);


    const isFavorite = (someCardId: string | undefined) => {
        if (!someCardId) return false
        const userCards = user?.favCards as Card[] ?? []
        return userCards.findIndex(card => card._id === someCardId) !== -1
    }

    let addToFavorite = (card: Card) => {
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        if (card._id === undefined) { return }
        const cardId = card._id;
        let removed = false
        if (user && user.favCards?.find(card => card._id === cardId)) {
            removed = true
            let cards = user.favCards
            let idx = user.favCards.findIndex(c => c._id === cardId)
            cards.splice(idx, 1)
            setUser({ ...user, favCards: cards } as any)
        } else {
            setUser({ ...user, favCards: [...user?.favCards as any, card] } as any)

        }

        addCardToFav(id, cardId)
            .then((res) => {
                successMsg(removed ? "Card removed from favorites" : "Card added favorite");
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={`container mt-3 homeColor ${theme}`}>
                <h1 className="display-2 text-center fw-bold" >Find your next favorite business</h1>
                <h4 className="display-6 text-center">Here you can find all the information about the businesses you like, you can mark favorites by clicking on the heart and remove them in the fav-cards tab.
                </h4>
                <h5 className="display-6 text-center mb-5"><Link to={"/login"} >Log in to bookmark/post</Link></h5>
                <div className="container">
                    {userInfo.role == "Admin" || userInfo.role == "business" ? (
                        <Link to="new" className="btn btn-danger btn-lg shadow position-relative pt-3 " style={{ borderRadius: "500px", height: "80px", width: "80px" }}><i className="fa-solid fa-plus"></i>  </Link>) : (null)}

                    {cards.length ? (
                        <div className="row">
                            {cards.map((card: Card) => (
                                <div key={card._id} className="card col-md-4 mx-3   mt-5 mb-5 border-raduse" style={{ width: "25rem" }} >
                                    <img src={card.imageUrl} className="card-img-top mt-3 h-50" alt={card.imageAlt} onClick={() => navigate(`card-detailse/${card._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.subtitle}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><i className="fa-solid fa-phone"></i>  {card.phone}</li>
                                        <li className="list-group-item"><i className="fa-solid fa-envelope"></i>  {card.email}</li>
                                    </ul>
                                    <div className="card-body">
                                        {userInfo.email && (<>
                                            <div onClick={() => addToFavorite(card)}>
                                                {!isFavorite(card._id) ?
                                                    (<i className="fa-solid fa-heart"></i>)
                                                    :
                                                    (<i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>)}
                                            </div>
                                        </>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<p className="display-3 text-center mt-5">No cards yet...</p>)}


                </div>
            </div>
        </>
    )
}

export default Home;
