import { useState } from 'react'
import {  } from "react-router-dom"
import {data} from "../../data.js"
import { auth } from '../firebase.js'
import { toast } from 'react-toastify'
import { doc, setDoc,collection } from 'firebase/firestore'
import { db } from '../firebase.js'
export default function FirstTimeReading(props){
    const tenants = JSON.parse(localStorage.getItem('tenants'))
    const tenantOptions = tenants?.map(({tenantName}) => {
        return {value: tenantName, label: tenantName}
})

    const [formData, setFormData] = useState({
        prevReading: 0,
        reading: 0,
        toBePaid: 0,
        paid:0,
        readingDate: "",
        nextReadingDate: "",
        mpesaMessage: "",
        tenantName: "",
    })
    async function handleSubmit(event){
        event.preventDefault()
        const data = {...formData, ownerId: auth.currentUser.uid, deficit: Number(formData.toBePaid - formData.paid).toFixed(2)}
        try {
          await setDoc(doc(collection(db, "readings")), data)
          props.change()
            toast.success("Readings saved.")
        } catch (e) {
            toast.error(e.message)
        }

        

        // props.state(prev => !prev)

    }
    function handleChange(event) {
        const { name, value } = event.target;
        
        if (name === "tenantName"){
            const selectedTenant = tenants.filter(tenant => tenant.tenantName === event.target.value)
            setFormData((prevData) => {
                 return {
                    ...prevData,
                    tenantName: event.target.value,
                    prevReading: selectedTenant.length > 0 ? selectedTenant[0].initialReading : 0
                }
              });
        }else{
            setFormData((prevData) => {
              if (name === 'reading') {
                return {
                  ...prevData,
                  [name]: value,
                  toBePaid: (value - prevData.prevReading).toFixed(2),
                };
              } else {
                return {
                  ...prevData,
                  [name]: value,
                };
              }
            });
          }
        }
      
      

    return (
        <div className="read-form-container">
        <form className="read-form" onSubmit={handleSubmit}>
            <select value={formData.tenantName} onChange={handleChange} name="tenantName">
            <option value="">Select tenant</option>
            {tenantOptions?.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
            <label htmlFor="prev_reading">Initial Reading</label>
            <input type="number" step="any" id="prev_reading" placeholder="Preffilled, read only" readOnly value={formData.prevReading} name="prevReading" />
            {/* <label htmlFor="deficit">Deficit</label>
            <input type="number" step="any" id="deficit" placeholder="prefilled read only" readOnly value={formData.deficit} name="deficit" /> */}
            <label htmlFor="reading">Today's reading</label>
            <input type="number" step="any" id="reading" placeholder="today's reading" name="reading" value={formData.reading} onChange={handleChange}/>
            <label htmlFor="toBePaid">To be paid</label>
            <input type="number" step="any" id="toBePaid" name="toBePaid" placeholder="Units to be paid" readOnly value={formData.toBePaid} onChange={handleChange}/>
            <label htmlFor="paidUnits">Paid Units</label>
            <input type="number" step="any" id="paidUnits" name="paid"  value={formData.paid} onChange={handleChange}/>
            <label htmlFor="readingDate">Reading date</label>
            <input type="date"  id="readingDate" name="readingDate"   value={formData.readingDate} onChange={handleChange}/>
            <label htmlFor="nextReadingDate">Next Reading date</label>
            <input type="date"  id="nextReadingDate" name="nextReadingDate"   value={formData.nextReadingDate} onChange={handleChange}/>
            <label htmlFor="mpesaMessage">Mpesa Message</label>
            <textarea id="mpesaMessage" name="mpesaMessage" placeholder="paste mpesa message" value={formData.mpesaMessage} onChange={handleChange} />
            <button>Save</button>
        </form>
        </div>
    )
}