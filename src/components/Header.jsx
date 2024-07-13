import { NavLink, redirect, useNavigate } from 'react-router-dom'
import '../index.css';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Header(){
    const navigate =  useNavigate()

    let businessName = localStorage.getItem("owner");
    try {
        businessName = JSON.parse(businessName)?.businessName
    } catch (err) {
        businessName = ""
    }
    async function handleLogout(){
        await signOut(auth)
        localStorage.clear()
        navigate("/")
    }
    return (
        <header>
            <h2>Stima Tracker {businessName && `- ${businessName}`}</h2>
            <nav>
                <NavLink to="/" >Home</NavLink>
                {auth.currentUser && (
                    <>                    
                    <NavLink to="/logs">Logs</NavLink>
                    <NavLink to="/account">Account</NavLink>
                    </>

                )}
                {auth.currentUser ? <button className="logoutBtn" onClick={handleLogout}>Log Out</button>: <NavLink to="/login">Login</NavLink>}
            </nav>
        </header>
    )
}