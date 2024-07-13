import { useEffect, useState } from "react";
import MyTenantsTable from "../components/MyTenantsTable";
import NewTenant from "../components/NewTenant";
import { requireAuth } from "../utils/requireAuth";
import { doc, setDoc, collection, getDocs, query, where} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLoaderData} from "react-router-dom"
import { toast } from "react-toastify";

export async function loader(){
    requireAuth()
    return null
}
export default function Account(){
    let ownerDetails = localStorage.getItem("owner")
    try {
        ownerDetails = ownerDetails && JSON.parse(ownerDetails)
    }catch(e){
        ownerDetails = null

    }
    const [ownerData, setOwnerData] = useState(ownerDetails || {fullName: "", businessName: "",})
    const [newTenant, setNewTenant] = useState(false)
    const [updateOwner, setUpdateOwner] = useState(false)
    const [tenantChange, setTenantChange] = useState(false)

    const [tenants, setTenants] = useState([])

    useEffect(() => {
        async function fetchTenants(){
            try {
                const tenantsRef = collection(db, 'tenants'); 
                const q = query(tenantsRef, where("ownerId","==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q); // Get all documents in the collection
            
                const tenants = [];
                querySnapshot.forEach((doc) => {
                  const tenantsData = doc.data(); // Extract document data
            
                  tenants.push({
                    id: doc.id, 
                    initialReading: Number(tenantsData.initialReading),
                    ownerId: tenantsData.ownerId,
                    startingDate: tenantsData.startingDate, 
                    tenantName: tenantsData.tenantName,
                  });
                });
        
                setTenants(tenants)
                localStorage.setItem('tenants', JSON.stringify(tenants));
              } catch (error) {
                console.error('Error fetching tenants:', error);
              }
        }
        fetchTenants()

    }, [newTenant, tenantChange])
    function handleOwnerChange(event){
        setOwnerData(prevData => {
            const newData = {
               ...prevData,
                [event.target.name]: event.target.value
            }
            localStorage.setItem("owner",JSON.stringify(newData))
            return newData
        })

    }
    async function handleOwnerSubmit(event){
        event.preventDefault()
        try{
            await setDoc(doc(db, "owners", auth.currentUser.uid), {businessName: ownerData.businessName,fullName: ownerData.fullName})
            toast.success(("Updated Successfully"))
        }catch(error){
            console.log(error)
        }
        setUpdateOwner(false)
    }
    return (
        <>
            <div className="account-container">
            <section>
                <h2>My Account</h2>
                <form className="owner-details" onSubmit={handleOwnerSubmit}>
                    <label for="fullName">Full Name: </label>
                    <input type="text" disabled={!updateOwner} name="fullName" id="fullName" value={ownerData.fullName} onChange={handleOwnerChange}/>
                    <label for="businessName">My Business name: </label>
                    <input type="text" disabled={!updateOwner} name="businessName" id="businessName" value={ownerData.businessName} onChange={handleOwnerChange}/>
                    {updateOwner && <button>Update</button> }
                </form>
                    {!updateOwner && <button type="button" className="edit" onClick={() => setUpdateOwner(true)}>Edit</button>}
            </section>
            <hr />
            <section>
                <h3>My Tenants</h3>
                <MyTenantsTable tenantsData={tenants} change={setTenantChange}/>
                <button onClick={()=>setNewTenant(prev=>!prev)}>Add tenant</button>
                {newTenant && <NewTenant tenantState={setNewTenant}/>}
            </section>
            </div>
        </>
    )
}