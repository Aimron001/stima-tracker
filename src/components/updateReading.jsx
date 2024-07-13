import { useState } from 'react'
import {  } from "react-router-dom"

export default function UpdateReading(props){
    const [formData, setFormData] = useState({
        prevReading: props.data.prevReading,
        deficit:props.data.deficit,
        reading: props.data.reading,
        toBePaid: props.data.toBePaid,
        paid:props.data.paid,
        readingDate: props.data.readingDate,
        nextReadingDate: props.data.nextReadingDate,
        mpesaMessage: props.data.mpesaMessage
    })
    function handleSubmit(event){
      event.preventDefault()
      // console.log(formData,props.data.id)
      props.handleUpdate(formData,props.data.id)


    }
    
    function handleChange(event) {
      const { name, value } = event.target;
    
      if (value !== "") {  // Check if value is not empty
        setFormData((prevData) => {
          if (name === 'reading') {
            return {
              ...prevData,
              [name]: value,
              toBePaid: ((prevData.reading - prevData.prevReading) + prevData.deficit).toFixed(2),
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
            <label for="prev_reading">Previous Reading</label>
            <input type="number" step="any" id="prev_reading" placeholder="Preffilled, read only" readOnly value={formData.prevReading} name="prevReading" />
            <label for="deficit">Deficit</label>
            <input type="number" step="any" id="deficit" placeholder="prefilled read only" readOnly value={formData.deficit} name="deficit" />
            <label for="reading">Today's reading</label>
            <input type="number" step="any" id="reading" placeholder="today's reading" name="reading" value={formData.reading} onChange={handleChange}/>
            <label for="toBePaid">To be paid</label>
            <input type="number" step="any" id="toBePaid" name="toBePaid" placeholder="Units to be paid" readOnly value={formData.toBePaid} onChange={handleChange}/>
            <label for="paidUnits">Paid Units</label>
            <input type="number" step="any" id="paidUnits" name="paid"  value={formData.paid} onChange={handleChange}/>
            <label for="readingDate">Reading date</label>
            <input type="date"  id="readingDate" name="readingDate"   value={formData.readingDate} onChange={handleChange}/>
            <label for="nextReadingDate">Next Reading date</label>
            <input type="date"  id="nextReadingDate" name="nextReadingDate"   value={formData.nextReadingDate} onChange={handleChange}/>
            <label for="mpesaMessage">Mpesa Message</label>
            <textarea id="mpesaMessage" name="mpesaMessage" placeholder="paste mpesa message" value={formData.mpesaMessage} onChange={handleChange} />
            <button>Save</button>
        </form>
        </div>
    )
}