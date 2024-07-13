import { useState } from 'react'
import {  } from "react-router-dom"
import {data} from "../../data.js"
import { doc, setDoc, collection } from "firebase/firestore"
import { auth, db } from '../firebase.js'
import { toast } from 'react-toastify'

export default function Read(props){
    const [formData, setFormData] = useState({
        prevReading: props.prevData.reading,
        deficit:props.prevData.deficit,
        reading: 0,
        toBePaid: 0,
        paid:0,
        readingDate: "",
        nextReadingDate: "",
        mpesaMessage: ""
    })
    async function handleSubmit(event){
        event.preventDefault()
        const newReadingData = {...props.prevData,...formData, prevReading:props.prevData.reading, deficit: Number(formData.toBePaid - formData.paid).toFixed(2), ownerId: auth.currentUser.uid}
        try {
            await setDoc(doc(collection(db, "readings")), newReadingData)
            toast.success("Readings saved.")
            props.readState(prev => !prev)
        } catch (e) {
            toast.error(e.message)
        }


    }
    
    function handleChange(event){
        setFormData((prevData) => { 
            const newReading = event.target.name === "reading" ? Number(event.target.value) : formData.reading
            return {
                ...prevData, 
                [event.target.name]: event.target.value,
                toBePaid: Number((newReading - prevData.prevReading) + Number(formData.deficit)).toFixed(2)
            }
        })
    }


    return (
        <div className="read-form-container">
        <form className="read-form" onSubmit={handleSubmit}>
            <label htmlFor="prev_reading">Previous Reading</label>
            <input type="number" step="any" id="prev_reading" placeholder="Preffilled, read only" readOnly value={formData.prevReading} name="prevReading" />
            <label htmlFor="deficit">Deficit</label>
            <input type="number" step="any" id="deficit" placeholder="prefilled read only" readOnly value={formData.deficit} name="deficit" />
            <label htmlFor="reading">Today's reading</label>
            <input type="number" step="any" id="reading" placeholder="today's reading" name="reading" value={formData.reading} onChange={handleChange}/>
            <label htmlFor="toBePaid">To be paid</label>
            <input type="number"  step="any"  id="toBePaid" name="toBePaid" placeholder="Units to be paid" readOnly value={formData.toBePaid} onChange={handleChange}/>
            <label htmlFor="paidUnits">Paid Units</label>
            <input type="number"  step="any"  id="paidUnits" name="paid"  value={formData.paid} onChange={handleChange}/>
            <label htmlFor="readingDate">Reading date</label>
            <input type="date" id="readingDate" name="readingDate"   value={formData.readingDate} onChange={handleChange}/>
            <label htmlFor="nextReadingDate">Next Reading date</label>
            <input type="date" id="nextReadingDate" name="nextReadingDate"   value={formData.nextReadingDate} onChange={handleChange}/>
            <label htmlFor="mpesaMessage">Mpesa Message</label>
            <textarea id="mpesaMessage" name="mpesaMessage" placeholder="paste mpesa message" value={formData.mpesaMessage} onChange={handleChange} />
            <button>Save</button>
        </form>
        </div>
    )
}