import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCardByUserId } from "../services/cardsService";
import { successMsg } from "../services/feedbackService";
import { Link, useNavigate } from "react-router-dom";
import { userInfo } from "os";

interface MyCardsProps {
  userInfo: any
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo }) => {
  let navigate = useNavigate()
  let [cardsChange, setCardsChange] = useState<boolean>(false)
  let [addCard, setAddCard] = useState<Card[]>([])
  useEffect(() => {
    let userId: number = JSON.parse(sessionStorage.getItem("userInfo") as string).id
    getCardByUserId(userId)
      .then((res) => setAddCard(res.data))
      .catch((err) => console.log(err)
      )
  }, [cardsChange]);

  let render = () => {
    setCardsChange(!cardsChange)
  }

  let handelDelete = (id: number) => {
    if (window.confirm("Are you sure?"))
      deleteCard(id)
        .then((res) => {
          successMsg("card deleted successfuly")
          render()
        })
        .catch((err) => console.log(err)
        )
  }
  return (
    <>
      <h1 className="display-3 text-center">MY CARDS</h1>
      <h4 className="display-5 text-center">Here you can edit / delete / add in the cards you created</h4>
      {addCard.length ? (
        <div className="container ">
          <div className="row">
            {addCard.map((card: Card) => (
              <div key={card.id} className="card col-md-4 mx-3 mt-5 pt-2 mb-5 border-raduse" style={{ width: "25rem" }}>
                <img src={card.imageUrl} className="card-img-top" alt={card.imageAlt} onClick={() => navigate(`/cards/card-detailse/${card.id}`)} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.subtitle}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">phone: {card.phone}</li>
                  <li className="list-group-item mb-4">Email: {card.email}</li>
                </ul>
                {userInfo.role == "Admin" || userInfo.role == "business" ? (
                  <ul className="mt-3 d-flex crad">
                    
                    <Link to="" className="btn"><i className="fa-solid fa-trash crad" onClick={() => handelDelete(card.id as number)}></i></Link>
                    <Link to={`update/${card.id}`} className="btn"><i className="fa-solid fa-pen mx-3 crad"></i></Link>
                  </ul>
                ) : (null)}

              </div>
            ))}
          </div >
        </div >
      ) : (<p className="display-3 text-center mt-5">You don't have any cards you created yet</p >)
      }
    </>
  )
}

export default MyCards;