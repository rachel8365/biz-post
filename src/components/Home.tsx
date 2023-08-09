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
    let [favoriteIds, setFavoriteIds] = useState<number[]>([])
    useEffect(() => {
        const promises = [
            getCards() as Promise<AxiosResponse<Card[], any>>,
            userInfo.id !== undefined ?
                getUserById(userInfo.id) as Promise<AxiosResponse<User[], any>> :
                undefined
        ] as const;
        Promise.all(promises).then(([cardsResponse, userResponse]) => {
            setFavoriteIds(() => userResponse?.data[0]?.favCards || [])
            setCards(cardsResponse.data)
        })
            .catch((err) => console.log(err)
            )
    }, [userInfo.id]);

    let addToFavorite = (card: Card) => {
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        if (card.id === undefined) { return }
        const cardId = card.id;
        if (favoriteIds.includes(cardId)) {
            successMsg("The card is already in favorites, You can remove in the fav - card tab")
            return;
        }
        addCardToFav(id, cardId)
            .then((res) => {
                setFavoriteIds(prev => [...prev, cardId])
                successMsg("Added to favorites");
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
                                <div key={card.id} className="card col-md-4 mx-3   mt-5 mb-5 border-raduse" style={{ width: "25rem" }} >
                                    <img src={card.imageUrl} className="card-img-top mt-3 h-50" alt={card.imageAlt} onClick={() => navigate(`card-detailse/${card.id}`)} />
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
                                                {!favoriteIds.includes(card.id ?? -1) ?
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
