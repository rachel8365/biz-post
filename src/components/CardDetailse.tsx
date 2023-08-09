import { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { object } from "yup";

interface CardDetailseProps {
  cards: Card[]
  setCards: Function
}

const CardDetailse: FunctionComponent<CardDetailseProps> = ({ cards, setCards }) => {
  let { id } = useParams()
  let findId: Card | undefined = cards.find(
    (s) => s.id == Number(id)
  )
  return (
    <>
      <div className="container col-md-6 text-center bgBlur p-4 mt-5">
        <img src={findId?.imageUrl} alt={findId?.imageAlt} style={{ height: "200px", width: "280px", objectPosition: "cover" }} />
        <h2 className="display-3 mb-4">{findId?.title}</h2>
        <h3 className="display-5 mb-4">{findId?.subtitle}</h3>
        <p className="display-6">{findId?.description}</p>
        <p><i className="fa-solid fa-location-dot"></i>{findId?.country} {findId?.city} {findId?.street} {findId?.houseNumber}</p>
        <p className="display-7">    <i className="fa-solid fa-envelope"></i> {findId?.email}</p>
        <p> <i className="fa-solid fa-phone"></i>  {findId?.phone}</p>

        <a href={findId?.web}>{findId?.web} </a>

      </div>

    </>
  )
}

export default CardDetailse;