import { Routes, Route, Navigate } from 'react-router-dom';
import Play from './pages/play/Play';
import Navbar from './components/Navbar';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "./Redux/store";
import { useEffect, useState } from 'react';
import { checkUserApi } from './api/auth';
import { setUsername, updateScore } from './Redux/features/userSlice';
import Rank from './pages/rank/Rank';
import { LoadingSvg } from './assets/Svg';
const App = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async() => {
      setLoading(true);
      const {data, error} = await checkUserApi();
      
      if (!error && data && data.username) {
        setLoading(false);
        dispatch(setUsername(data.username));
        dispatch(updateScore(data.score));
      }
      else{
        setLoading(false);
      }
    }
    checkUser();
  }, [])
  
  
  return(
    <>
      <Navbar />
      {(!loading) ? <Routes>
        <Route path='/' element = {(username ? <Play /> : (<Navigate to = "/login" />))} />
        <Route path='/rank' element = {(username ? <Rank /> : (<Navigate to = "/login" />))} />
        <Route path='/login' element = {(!username ? <Login /> : (<Navigate to = "/" />))} />
        <Route path='/signup' element = {(!username ? <Signup /> : (<Navigate to = "/" />))} />
      </Routes>:
      <div className=' pt-40'>
        <LoadingSvg className='animate-spin w-10 m-auto' />
      </div>
      }
    </>
  )
}

export default App
