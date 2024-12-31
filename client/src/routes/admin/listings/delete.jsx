import { redirect } from "react-router-dom";
import { url } from "../../../utils/serverUrl";

export async function action({ params }) {
    const { id } = params 
    
    try {
        const req = await fetch(url + `/listings/${id}`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
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