import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import * as yup from "yup";
import { useFormik } from "formik";
import { getCardByCardId, updateCard } from "../services/cardsService";
import { successMsg } from "../services/feedbackService";

interface UpdateCardProps { }
const UpdateCard: FunctionComponent<UpdateCardProps> = () => {
    let navigate = useNavigate()
    let { id } = useParams();
    useEffect(() => {
        getCardByCardId(Number(id))
            .then((res) => setCard(res.data))
            .catch((err) => console.log(err)
            )
    }, []);
    let [card, setCard] = useState<Card>({
        id: 0,
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        city: "",
        country: "",
        street: "",
        houseNumber: 0,
        zip: 0,
        userId: 0,
    })
    let formik = useFormik({
        initialValues: {
            id: card.id,
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            phone: card.phone,
            email: card.email,
            web: card.web,
            imageUrl: card.imageUrl,
            imageAlt: card.imageAlt,
            state: card.state,
            city: card.city,
            country: card.country,
            street: card.street,
            houseNumber: card.houseNumber,
            zip: card.zip,
            userId: card.userId,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            id: yup.number(),
            title: yup.string().required(),
            subtitle: yup.string().required(),
            description: yup.string().required().max(100),
            phone: yup.string().required().min(9),
            email: yup.string().required().email("Pleade enter invalid email"),
            web: yup.string(),
            imageUrl: yup.string(),
            imageAlt: yup.string(),
            state: yup.string(),
            city: yup.string().required(),
            country: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.number().required(),
            zip: yup.number(),
            userId: yup.number(),
        }),
        onSubmit: (values) => {
            updateCard(values, Number(id))
                .then((res) => {
                    navigate("/my-cards")
                    successMsg("Card updated successfully!")
                })
                .catch((err) => console.log(err))
        }
    })
    return (
        <>
            {<div className="container col-md-6 text-center">
                <h2 className="display-3 mb-5 text-center">Update Card</h2>
                <form className="row g-3 formColor" onSubmit={formik.handleSubmit} >
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="title"
                            value={formik.values.title}
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Title</label>
                        {formik.touched.title && formik.errors.title && (<p className="text-danger">{formik.errors.title}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="subtitle"
                            value={formik.values.subtitle}
                            name="subtitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label"> Sub Title</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (<p className="text-danger">{formik.errors.subtitle}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="description"
                            value={formik.values.description}
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Description</label>
                        {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="phone"
                            value={formik.values.phone}
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Phone</label>
                        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="email" className="form-control" id="validationCustom01"
                            placeholder="email"
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Email</label>
                        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="web"
                            value={formik.values.web}
                            name="web"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Link to your web</label>
                        {formik.touched.web && formik.errors.web && (<p className="text-danger">{formik.errors.web}</p>)}</div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="imageUrl"
                            value={formik.values.imageUrl}
                            name="imageUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Choose image</label>
                        {formik.touched.imageUrl && formik.errors.imageUrl && (<p className="text-danger">{formik.errors.imageUrl}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="imageAlt"
                            value={formik.values.imageAlt}
                            name="imageAlt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Image alt</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (<p className="text-danger">{formik.errors.imageAlt}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="state"
                            value={formik.values.state}
                            name="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">State</label>
                        {formik.touched.state && formik.errors.state && (<p className="text-danger">{formik.errors.state}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="country"
                            value={formik.values.country}
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Country</label>
                        {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="city"
                            value={formik.values.city}
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">City</label>
                        {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="street"
                            value={formik.values.street}
                            name="street"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Street</label>
                        {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="houseNumber"
                            value={formik.values.houseNumber}
                            name="houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">House Number</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}</div>
                    <div className="form-floating col-md-6">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="zip"
                            value={formik.values.zip}
                            name="zip"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Zip</label>
                        {formik.touched.zip && formik.errors.zip && (<p className="text-danger">{formik.errors.zip}</p>)}</div>
                    <button disabled={!formik.isValid || !formik.dirty} className="btn btn-primary" type="submit">Update</button>
                </form>
                <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>CANCLE</button>
            </div>}
        </>)
}
export default UpdateCard;