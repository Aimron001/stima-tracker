import { auth } from "../firebase"
import { redirect } from "react-router-dom"

export function requireAuth(){
    if (!auth.currentUser){
        throw redirect("/login?message=you must login first")
    }
}