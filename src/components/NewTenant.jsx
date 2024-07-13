import { useState } from 'react'
import { collection, addDoc} from "firebase/firestore";
import { auth, db } from '../firebase';
import { toast } from 'react-toastify'

export default function NewTenant(props){
    const [formData, setFormData] = useState({
        tenantName: '',
        startingDate: '',
        initialReading: 0,
    })

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const doRef = await addDoc(collection(db, "tenants"),{...formData, ownerId: auth.currentUser.uid})
            props.tenantState(prev => !prev)
            toast.success("Added successfully")
        } catch(error){
            toast.error(error.message)
        }
    }

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
            
        })
    }
    return (
        <div className='new-tenant-container'>
        <form onSubmit={handleSubmit} className='new-tenant'>
            <label htmlFor="tenantName">Tenant Name</label>
            <input type="text" id="tenantName" name="tenantName" placeholder="Tenant Name" value={FormData.tenantName} onChange={handleChange} />
            <label htmlFor="startingDate">Starting Date</label>
            <input type="date" id="startingDate" name="startingDate" placeholder="Tenant Name" value={FormData.tenantName} onChange={handleChange} />
            <label htmlFor="initialReading">Initial Reading</label>
            <input type="number" step="any" id="initialReading" name="initialReading" placeholder="Initial Reading" value={FormData.tenantName} onChange={handleChange} />
            <button>Add</button>
        </form>
        </div>    
    )
}