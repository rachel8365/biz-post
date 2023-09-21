import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser, getTokenDetails } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {
    setUserInfo: Function
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required().email("Please enter valid email"),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            checkUser(values)
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
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));

                })
                .catch((err) => {
                    errorMsg("Wrong email or password!")
                    console.log(err)
                })
        },
    });
    return (
        <>
            <div className="container col-md-3 text-center">
                <h3 className="display-1">LOGIN</h3>
                <form className="formColor" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInput">Email *</label>
                        {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                    </div>
                    <div className="form-floating">
                        <input type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                    </div>

                    <button disabled={!formik.isValid || !formik.dirty} className="btn btn-success mt-3 w-100" type="submit">LOGIN</button>
                </form>
                <Link to="/register">New user? register here...</Link>
            </div>
        </>
    )
}

export default Login;