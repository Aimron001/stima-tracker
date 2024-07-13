import { useState } from 'react'
import { collection, addDoc} from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify'

export default function UpdateTenant(props){
    const [formData, setFormData] = useState({
        tenantName: props.tenant.tenantName,
        startingDate: props.tenant.startingDate,
        initialReading: props.tenant.initialReading,
    })

    

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
            
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        const newData = {...props.tenant, ...formData}
        props.handleUpdate(newData, props.tenant.id)
    }
    return (
        <div className='new-tenant-container'>
        <form onSubmit={handleSubmit} className='new-tenant'>
            <label htmlFor="tenantName">Tenant Name</label>
            <input type="text" id="tenantName" name="tenantName" placeholder="Tenant Name" value={formData.tenantName} onChange={handleChange} />
            <label htmlFor="startingDate">Starting Date</label>
            <input type="date" id="startingDate" name="startingDate" placeholder="Tenant Name" value={formData.startingDate} onChange={handleChange} />
            <label htmlFor="initialReading">Initial Reading</label>
            <input type="number" step="any" id="initialReading" name="initialReading" placeholder="Initial Reading" value={formData.initialReading} onChange={handleChange} />
            <button>Add</button>
        </form>
        </div>    
    )
}