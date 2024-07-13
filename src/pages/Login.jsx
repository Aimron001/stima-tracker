import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { toast } from "react-toastify"


export default function Login(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    function handleChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const user = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            navigate("/")
            
        } catch(error){
        const errorMessage =
            error.code === "auth/invalid-email"
                ? "Invalid email address."
                : error.code === "auth/wrong-password"
                ? "Incorrect password."
                : error.code === "auth/missing-password" ? "Enter password" : error.code === "auth/invalid-credential" ? "Invalid credentials." : error.message; // Handle other errors with custom messages
        toast.error(errorMessage); 
        }
    }
    return(
        <div className="user-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={FormData.email} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={FormData.email} onChange={handleChange} />
                <Link to="/register">Don't have an acccount?</Link>
                <button>Login</button>
            </form>
        </div>
    )
}