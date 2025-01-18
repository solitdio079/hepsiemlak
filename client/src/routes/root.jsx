//import { useEffect } from "react"
import Footer from "../components/footer"
import { userContext } from "../utils/contexts"
import Navbar from "../components/navbar"
import { Outlet, useLoaderData } from "react-router-dom"
import { url } from '../utils/serverUrl'
import { useCookies } from 'react-cookie'
export async function loader() {
    try {
        const req = await fetch(url + "/auth/login/status", {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const response = await req.json()
        alert(document.cookie)
        if(response.error) return null
        return response
    } catch (error) {
        return {error: error.message}
    }
}
export default function Root() {
    const [cookies, setCookie] = useCookies(['test'])
    function onChange(newName) {
        setCookie('test', newName, { path: '/', sameSite: true, httpOnly: true, domain: 'api.sahelimmo.info' });
        alert(cookies.test)
    }
    
    onChange('testCookie')
    const user = useLoaderData()
    //alert("user: "+ user)
    return (<userContext.Provider value={user}>
        <Navbar user={user} />
        <Outlet context={[cookies.test]} />
        <Footer/>
    </userContext.Provider>)
}