import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { object } from "yup";
import { getCardDetails } from "../services/cardsService";

interface CardDetailseProps {
  cards: Card[]
  setCards: Function
}

const CardDetailse: FunctionComponent<CardDetailseProps> = ({ cards, setCards }) => {
  let { id } = useParams()
  let [cardDetailse, setCardDetails] = useState<Card>()
  useEffect(() => {
    if (id === undefined) { return }
    getCardDetails(id)
      .then((res) => {
        setCardDetails(res.data)
      })
      .catch((err) => console.log(err)
      )
  }, []);

  return (
    <>
      <div className="container col-md-6 text-center bgBlur p-4 mt-5">
        <img src={cardDetailse?.imageUrl} alt={cardDetailse?.imageAlt} style={{ height: "200px", width: "280px", objectPosition: "cover" }} />
        <h2 className="display-3 mb-4">{cardDetailse?.title}</h2>
        <h3 className="display-5 mb-4">{cardDetailse?.subtitle}</h3>
        <p className="display-6">{cardDetailse?.description}</p>
        <p><i className="fa-solid fa-location-dot"></i>{cardDetailse?.country} {cardDetailse?.city} {cardDetailse?.street} {cardDetailse?.houseNumber}</p>
        <p className="display-7">    <i className="fa-solid fa-envelope"></i> {cardDetailse?.email}</p>
        <p> <i className="fa-solid fa-phone"></i>  {cardDetailse?.phone}</p>

        <a href={cardDetailse?.web}>{cardDetailse?.web} </a>

      </div>

    </>
  )
}

export default CardDetailse;