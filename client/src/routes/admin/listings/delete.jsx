import { redirect } from "react-router-dom";
import { url } from "../../../utils/serverUrl";

export async function action({ params }) {
    const { id } = params 
    const token = localStorage.getItem('token')
    const fetchHeader = token
      ? {  'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
    try {
        const req = await fetch(url + `/listings/${id}`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeader
        })

        const response = await req.json() || await req.text()
        if (response.msg) return redirect("/listings/list/Residence")
        console.log(response.error)
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message)
    }
}