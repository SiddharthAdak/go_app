import { MouseEvent, useState } from 'react'
import { useSignup } from '../../../hooks/authHooks';
import { LoadingSvg } from '../../../assets/Svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsername, updateScore } from '../../../Redux/features/userSlice';
const Signupform = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const {signup, loading, error} = useSignup();
    const dispatch = useDispatch();
    const handleSignup = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = await signup(user, password, confirmPassword);
        console.log(data);
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
                    type="email" 
                    name='email'
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
                    placeholder='password (min 8 chars)'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    type="password"
                    autoComplete='off'
                    name='password'
                />
            </div>
            <div className=' relative mb-2'>
                <input 
                    className=' w-full border-solid border-gray-300 border-2 rounded-md p-2 text-sm'
                    placeholder='confirm password'
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                    value={confirmPassword}
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
            <button onClick={handleSignup} className=' p-2 bg-black text-white w-full rounded-md'>Sign up</button>
        </div>
        :
        <div>
            <div className=' p-2 bg-gray-200 text-white w-full rounded-md'>
                <LoadingSvg className=' animate-spin w-6 m-auto' />
            </div>
        </div>
        }
        <div className=' mt-3'>
            <Link to="/login" className=' text-sm underline' >login to existing account</Link>
        </div>
    </div>
  )
}
export default Signupform;