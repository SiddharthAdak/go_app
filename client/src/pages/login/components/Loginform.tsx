import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../../../hooks/authHooks';
import { LoadingSvg } from '../../../assets/Svg';
import { useDispatch } from 'react-redux';
import { setUsername, updateScore } from '../../../Redux/features/userSlice';
const Loginform = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    
    const {login, loading, error} = useLogin();
    const dispatch = useDispatch();
    const handleLogin = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = await login(user, password);
        // console.log(data);
        if (data && data.username) {
            dispatch(setUsername(data.username));
            dispatch(updateScore(data.score));
        }
    }
  return (
    <div>
        <div>
            <div className='mb-2'>
                <input 
                    className=' w-full border-solid border-gray-300 border-2 rounded-md p-2 text-sm'
                    placeholder='username'
                    autoComplete='off'
                    value={user}
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                />
            </div>
            <div className=' relative mb-2'>
                <input 
                    className=' w-full border-solid border-gray-300 border-2 rounded-md p-2 text-sm'
                    placeholder='Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    type="password"
                    autoComplete='off'
                    name='password'
                />
            </div>
            {error && <div className=' text-red-500 text-sm mb-2'>
                *{error}
            </div>}
            
        </div>
        {(!loading) ? <div>
            <button onClick={handleLogin} className=' p-2 bg-black text-white w-full rounded-md'>Login</button>
            
        </div>
        :
        <div>
            <div className=' p-2 bg-gray-200 text-white w-full rounded-md'>
                <LoadingSvg className=' animate-spin w-6 m-auto' />
            </div>
        </div>
        }
        <div className=' mt-3'>
            <Link to="/signup" className=' text-sm underline' >create a new account</Link>
        </div>
    </div>
  )
}
export default Loginform