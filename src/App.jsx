import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, redirect } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Account, {loader as accountLoader} from './pages/Account'
import Register from './pages/Register'
import Login from './pages/Login'
import Home, { loader as homeLoader } from './pages/Home'
import Logs, { loader as logsLoader} from './pages/Logs'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase'

function userLoader() {
  if (auth.currentUser){
    throw redirect('/')
  }
  return null
}

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="logs" element={<Logs />} loader={logsLoader}/>
      <Route path="account" element={<Account />} loader={accountLoader} />
    </Route>
    <Route path='/register' element={<Register />} loader={userLoader} />
    <Route path='/login' element={<Login />} loader={userLoader}/>

    </>
  ))

  return (
    <>   
    <ToastContainer />
        <RouterProvider router={router} />
    </>
  )
}

export default App
