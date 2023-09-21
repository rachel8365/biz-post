import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { addCard } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface AddCardProps { }
const AddCard: FunctionComponent<AddCardProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            userId: 0,
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

        },
        validationSchema: yup.object({
            title: yup.string().required(),
            subtitle: yup.string().required(),
            description: yup.string().required().max(150),
            phone: yup.string().required().min(9),
            email: yup.string().required().email("Pleade enter invalid email"),
            web: yup.string(),
            imageUrl: yup.string(),
            imageAlt: yup.string().required(),
            state: yup.string(),
            city: yup.string().required(),
            country: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.number().required(),
            zip: yup.number(),
        }
        ),
        onSubmit: (values) => {
            let userId = JSON.parse(sessionStorage.getItem("userInfo") as string).id
            addCard({ ...values, userId })
                .then((res) => {
                    navigate("/cards")
                    successMsg("Added successfuly!")
                })
                .catch((err) => {
                    errorMsg("Something is wrong, check the data again")
                    console.log(err)
                }
                )
        }
    })
    useEffect(() => {
        formik.setFieldValue("houseNumber", "");
    }, []);

    useEffect(() => {
        formik.setFieldValue("zip", "");
    }, []);
    return (
        <>
            {<div className="container col-md-6 text-center">
                <h2 className="display-3 mb-5 text-center">Add new card</h2>
                <form className="row g-3 formColor" onSubmit={formik.handleSubmit} >
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="title"
                            value={formik.values.title}
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Title *</label>
                        {formik.touched.title && formik.errors.title && (<p className="text-danger">{formik.errors.title}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="subtitle"
                            value={formik.values.subtitle}
                            name="subtitle"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label"> Sub Title *</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (<p className="text-danger">{formik.errors.subtitle}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="description"
                            value={formik.values.description}
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Description *</label>
                        {formik.touched.description && formik.errors.description && (<p className="text-danger">{formik.errors.description}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="phone"
                            value={formik.values.phone}
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Phone *</label>
                        {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="email" className="form-control" id="validationCustom01"
                            placeholder="email"
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Email *</label>
                        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="web"
                            value={formik.values.web}
                            name="web"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Link to your web</label>
                        {formik.touched.web && formik.errors.web && (<p className="text-danger">{formik.errors.web}</p>)}
                    </div>
                    <div className="col-md-6 form-floating mb-3">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="imageUrl"
                            value={formik.values.imageUrl}
                            name="imageUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Choose image *</label>
                        {formik.touched.imageUrl && formik.errors.imageUrl && (<p className="text-danger">{formik.errors.imageUrl}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="imageAlt"
                            value={formik.values.imageAlt}
                            name="imageAlt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Image alt *</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (<p className="text-danger">{formik.errors.imageAlt}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="state"
                            value={formik.values.state}
                            name="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">State</label>
                        {formik.touched.state && formik.errors.state && (<p className="text-danger">{formik.errors.state}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="country"
                            value={formik.values.country}
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Country *</label>
                        {formik.touched.country && formik.errors.country && (<p className="text-danger">{formik.errors.country}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="city"
                            value={formik.values.city}
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">City *</label>
                        {formik.touched.city && formik.errors.city && (<p className="text-danger">{formik.errors.city}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="street"
                            value={formik.values.street}
                            name="street"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Street *</label>
                        {formik.touched.street && formik.errors.street && (<p className="text-danger">{formik.errors.street}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="houseNumber"
                            value={formik.values.houseNumber}
                            name="houseNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">House Number *</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (<p className="text-danger">{formik.errors.houseNumber}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="number" className="form-control" id="validationCustom01"
                            placeholder="zip"
                            value={formik.values.zip}
                            name="zip"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Zip</label>
                        {formik.touched.zip && formik.errors.zip && (<p className="text-danger">{formik.errors.zip}</p>)}
                    </div>
                    <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>CANCLE</button>
                    <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>

                    <button disabled={!formik.isValid || !formik.dirty} className="btn btn-primary" type="submit">Submit</button>
                </form>

            </div>}
        </>

    )
}

export default AddCard;