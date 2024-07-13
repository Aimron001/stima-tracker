// import { useEffect, useState } from "react"
// import {data} from "../../data.js"
// import Read from "../components/Reading.jsx"
// import TenantOverview from "../components/TenantOverview.jsx"
// import { auth, db } from "../firebase.js"
// import { signOut } from "firebase/auth"
// import { Link, redirect, useLoaderData } from "react-router-dom"
// import { requireAuth } from "../utils/requireAuth.js"
// import { collection, query, where, doc, getDoc, getDocs,orderBy,limit, setDoc } from "firebase/firestore"
// import Owner from "../components/Owner"
// import { getLatestReadings } from "../utils/getLatestReadings.js"
// import meterPhoto from "../assets/meter.png"
// import FirstTimeReading from "../components/FirstTimeReading.jsx"
// import { ToastContainer } from "react-toastify"
// export async function loader(){
//     // requireAuth()
    
//     return null
// }
// export default function Home() {
//     const [newOwner, setNewOwner] = useState(false)
//     const [readState, setReadState] = useState(false)
//     const [firstTimeReading, setFirstTimeReading] = useState(false)
//     const [clickedTenant, setClickedTenant] = useState()
//     const [latestReadings, setLatestReadings] = useState([])
//     const [newReadings, setNewReadings] = useState([])
//     const [owner, setOwner] = useState(false)
//     // alert(firstTimeReading)

//     useEffect(()=>{
//         async function getCurrentReadings() {
//             console.log("GETTING");

//             if (!owner) {
//             // If there is no owner, fetch owner
//                 const owner = await getDoc(doc(db, "owners",auth.currentUser.uid))
//                 if ( owner.exists()){
//                     localStorage.setItem("owner",JSON.stringify(owner.data()))
//                     setOwner(owner.data())
//                 }
//             }
//             const q = query(collection(db, "readings"), where("ownerId", "==",auth.currentUser.uid)) // Get all documents in the collection
//             const querySnapshot = await getDocs(q)
//             const readings=[]
//             querySnapshot.forEach((doc) => {
//                 readings.push({...doc.data(), id: doc.id});
//             })
//             localStorage.setItem("readings", JSON.stringify(readings))
//             console.log("SETTING", readings);
//             setNewReadings(readings)
        
        
//     }
    
//     if (localStorage.getItem("owner")) {
//         alert("Calling the get current async useEffect function...")
//         getCurrentReadings()
//         console.log("after getCurrentReadings")
//         // alert("Got latest readings")
//         // let newReadings
//         console.log(newReadings);
//         try {
//             console.log("PASSING: ", newReadings);
//             const ltReadings = getLatestReadings(newReadings)
//             console.log("NEW NEW: ",ltReadings);
//             // alert("Reloading new")
//             // console.log("NEW LT: ",newReadings);
//             setLatestReadings(ltReadings)
//             }catch(e) {
//             }
//         }
//     },[firstTimeReading, readState])
//     const tenants = latestReadings?.map(reading => {
//         return(
//             <TenantOverview reading={reading} handleClick={setClickedTenant} state={setReadState} key={reading.id}/>
//         )
//     })
//     async function handleFirstTimeReading(){
//         // alert(firstTimeReading);
//         setFirstTimeReading(prev => !prev)
//         // alert(firstTimeReading);
//         const tenants=[]
//         if (!localStorage.getItem("tenants")){
//             const querySnapshot = await where(collection(db, "tenants"), "ownerId", "==",auth.currentUser.uid).getDocs()
//             querySnapshot.forEach((doc) => {
//                 tenants.push({...doc.data()});
//             })
//             localStorage.setItem("tenants", JSON.stringify(tenants))
//         }
//         // alert("about")
//         // setMyTenants(tenants)
        
        
        
//     }
//     // async function addReading(data){
//     //     try {
//     //         // await setDoc(doc(collection(db, "readings")), data)
//     //         alert("Saving reading")
//     //         setFirstTimeReading(prev => !prev)
//     //         toast.success("Readings saved.")
//     //       } catch (e) {
//     //           ToastContainer.error(e.message)
//     //       }
         
//     // }
    
//     return (
//         <>
//         <div className="home-container">
//             <section>
//                 <div className="app-intro">
//                     <img src={meterPhoto} alt="a photo of KPLC token meter" />
//                     <div>
//                     <p>Say Goodbye to Lost Records and Frustrating Calculations: Introducing Stima Tracker, Your Digital Solution for Sub Meter Readings!</p>
//                     <p>Are you a landlord struggling with manual sub meter readings? Do you dread the hassle of keeping track of readings in a physical book, only to risk losing valuable records? Stima Tracker is here to revolutionize the way you manage your electricity sub meters and tenant billing</p>

//                     </div>
//                 </div>
//             </section>
//             <section className="tutorial">
//                 <div className="intro">
//                     <h3>Getting started</h3>
//                     <ol>
//                         <li><Link to="/register">Create an account</Link></li>
//                         <li>Go to <Link to="/account">account</Link></li>
//                         <li>Click new tenant button to add your tenants</li>
//                     </ol>
//                 </div>
//                 <div className="recording">
//                     <h3>Recording meter readings</h3>
//                     <p>For first time readings, click the button below</p>
//                     <button onClick={handleFirstTimeReading}>First time reading</button>
//                     <p>For members with previous readings recordings, click the read button of the specific tenant displayed below.</p>

//                 </div>
//             </section>
//             {latestReadings &&
//             ( <div className="tenants-container">
//                 {tenants}
//             </div>) }
//             {readState && <Read prevData={clickedTenant} readState={setReadState}/>}

//             </div>
//             {auth.currentUser && !owner  ? <Owner state={setOwner}/> : null}
//             {firstTimeReading && <FirstTimeReading change={setFirstTimeReading} />}
//         </>
//     )
// }


