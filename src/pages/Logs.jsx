import LogsTable from "../components/LogsTable"
import { requireAuth } from "../utils/requireAuth";
import { collection, getDocs,query,where } from "firebase/firestore"
import { db,auth } from "../firebase";
import { useEffect, useState } from "react";
export async function loader(){
    requireAuth()
  
   
      return null
    }
export default function Logs(){
  const [logsChange, setLogsChange] = useState(false)
  const [logs, setLogs] = useState([])

  useEffect(()=> {
    async function getLogs(){
      try {
        // const readingsRef = collection(db, 'readings'); // Reference to the readings collection
    
        const q = query(collection(db, "readings"), where("ownerId", "==",auth.currentUser.uid)) // Get all documents in the collection
        const querySnapshot = await getDocs(q)
        const readings = [];
        querySnapshot.forEach((doc) => {
          const readingData = doc.data(); // Extract document data
    
          readings.push({
            id: doc.id, // Use document ID as unique identifier
            tenantName: readingData.tenantName,
            prevReading: readingData.prevReading,
            reading: readingData.reading, 
            toBePaid: readingData.toBePaid, // Assuming you have a calculateToBePaid function
            paid: readingData.paid,
            deficit: readingData.deficit, // Assuming you have a calculateDeficit function
            readingDate: readingData.readingDate, // Assuming you have a formatDate function
            nextReadingDate: readingData.nextReadingDate,
            mpesaMessage: readingData.mpesaMessage
          });
        });

        localStorage.setItem("readings", JSON.stringify(readings))
        setLogs(readings);
      } catch (error) {
        console.error('Error fetching readings:', error);
      }
    } 
    
    getLogs()
  }, [logsChange])
    return (
        <>
            <h1>Logs goes here...</h1>
            <LogsTable data={logs} change={setLogsChange}/>
        </>
    )
}