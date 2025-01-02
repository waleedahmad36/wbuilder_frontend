import React, { useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import  userAtom  from './atoms/userAtom'
import { useRecoilValue , useSetRecoilState } from 'recoil'
import CreatePortfolio from './pages/CreatePortfolio'
import PortfolioPage from './pages/PortfolioPage'
import UpdatePage from './pages/UpdatePage'
import UserPage from './pages/UserPage'
import { rootUrl } from './constants'
import FeedBack from './pages/FeedBack'

const App = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const checkAuth = async ()=> {
   try {
    const res = await fetch(`${rootUrl}/api/v1/auth/authCheck`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    if(data.user){
      setUser(data.user);
    }
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <div   className='main w-full min-h-screen' >
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate  to={'/login'} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/create-portfolio" element={user ? <CreatePortfolio/> : <Navigate to='/login' />} />
        <Route
							path='/portfolio/:username'
							element={
								<PortfolioPage/>
							}
						/>
        <Route
							path='/update/:pid'
							element={ user ?
								<UpdatePage/> : <Navigate to='/login' />
							}
						/>
        <Route
							path='/dashboard'
							element={ user ?
								<UserPage/> : <Navigate to='/login' />
							}
						/>
        <Route
							path='/feedback'
							element={ user ?
								<FeedBack/> : <Navigate to='/login' />
							}
						/>
      </Routes>
    </div>
  )
}

export default App