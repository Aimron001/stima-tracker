

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { collection, doc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase"



export default function Owner(props){
    const [formData, setFormData] = useState({
        fullName:'',
        businessName:'',
    })

    function handleChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    const ownersRef = collection(db, "owners")
    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const owner = await setDoc(doc(ownersRef, auth.currentUser.uid), {fullName: formData.fullName, businessName: formData.businessName})
            localStorage.setItem("owner", JSON.stringify(formData))
            props.state(prev => !prev)
            toast.success("Details saved successfully")
            
        } catch(error){
            toast.error(error.message)
        }
    }
    return(
        <div className="user-form-container">
            <form onSubmit={handleSubmit} className="user-form">
            <h2>Landlord's Details</h2>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" value={FormData.fullName} onChange={handleChange} />
                <label htmlFor="businessName">Business Name</label>
                <input type="text" name="businessName" id="businessName" value={FormData.businessName} onChange={handleChange} />
                <button>Save My Details</button>
            </form>
        </div>
    )
}