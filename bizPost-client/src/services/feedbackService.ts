import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export function successMsg(massage: string) {
    toast.success(massage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
    })
}

export function errorMsg(massage: string) {
    toast.error(massage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
    })
}