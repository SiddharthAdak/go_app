import Signupform from './components/Signupform';

const Signup = () => {

  return (
    <div className=' w-screen bg-gray-100 h-screen flex items-center justify-center'>
        
      <div className=' bg-white w-96 shadow-xl rounded-xl p-8 text-center'>
        <p className=' font-bold text-3xl mb-4 text-center'>Welcome!</p>
        <div>
          <p className=' mb-4'>Create a new account</p>
          <div>
            <Signupform />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;