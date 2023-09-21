import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";
interface RegisterProps {
    setUserInfo: Function
}
const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
    let [roles, setRoles] = useState<boolean>(false);
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            phone: "",
            email: "",
            password: "",
            imageUrl: "",
            imageAlt: "",
            state: "",
            city: "",
            country: "",
            street: "",
            houseNumber: 0,
            zip: 0,
            role: "",
            favCards: []
        },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            middleName: yup.string(),
            phone: yup.string().required().min(9),
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
            imageUrl: yup.string(),
            imageAlt: yup.string(),
            state: yup.string(),
            city: yup.string().required().min(2),
            country: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required(),
            zip: yup.number(),
            role: yup.string(),
        }
        ),
        onSubmit: (values) => {
            let role = roles ? 'business' : 'regular'
            values = { ...values, role: role }
            addUser({ ...values, favCards: [] })
                .then((res) => {
                    navigate("/cards")
                    successMsg(`Hi ${values.email} The connection was made successfully`)
                    sessionStorage.setItem("token",
                        JSON.stringify({
                            token: res.data
                        })
                    )
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: (getTokenDetails() as any).email,
                        role: (getTokenDetails() as any).role,
                        id: (getTokenDetails() as any)._id
                    }))
                    setUserInfo(
                        JSON.parse(sessionStorage.getItem("userInfo") as string)
                    )
                })
                .catch((err) => {
                    errorMsg("Something is wrong, check the data again")
                    console.log(err)
                })
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
            <div className="container col-md-6 text-center mb-5">
                <h2 className="display-3 mb-5 text-center">Register</h2>
                <form className="row g-3 formColor" onSubmit={formik.handleSubmit} >
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="firstName"
                            value={formik.values.firstName}
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">First name *</label>
                        {formik.touched.firstName && formik.errors.firstName && (<p className="text-danger">{formik.errors.firstName}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="middleName"
                            value={formik.values.middleName}
                            name="middleName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Middle name</label>
                        {formik.touched.middleName && formik.errors.middleName && (<p className="text-danger">{formik.errors.middleName}</p>)}
                    </div>
                    <div className="form-floating col-md-6">
                        <input type="text" className="form-control" id="validationCustom01"
                            placeholder="lastName"
                            value={formik.values.lastName}
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Last name *</label>
                        {formik.touched.lastName && formik.errors.lastName && (<p className="text-danger">{formik.errors.lastName}</p>)}
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
                        <input type="password" className="form-control" id="validationCustom01"
                            placeholder="password"
                            value={formik.values.password}
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="validationCustom01" className="form-label">Password *</label>
                        {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                    </div>
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
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input position-absolute" type="checkbox" onChange={() => setRoles(!roles)} id="invalidCheck"
                                name="role"
                                value={formik.values.role} />
                            <label className="form-check-label " htmlFor="invalidCheck">Signup as business</label>
                        </div>
                    </div>
                    <button disabled={!formik.isValid || !formik.dirty} className="btn btn-success mb-4" type="submit">Submit</button>
                </form>
                <div className="justify-content-space-between">
                    <button className="btn btn-danger col-md-4" onClick={() => navigate(-1)}>CANCLE</button>
                    <button className="btn btn-success col-md-4 " onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
                </div>
                <Link to="/login">Already have user? Login here</Link>
            </div>
        </>
    )
}
export default Register;