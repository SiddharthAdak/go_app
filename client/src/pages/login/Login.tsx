import Loginform from "./components/Loginform"

const Login = () => {

  return (
    <div className=' w-screen bg-gray-100 h-screen flex items-center justify-center'>
        
      <div className=' bg-white w-96 shadow-xl rounded-xl p-8 text-center'>
        <p className=' font-bold text-3xl mb-4 text-center'>Welcome</p>
        <div>
          <p className=' mb-4'>Login to your account</p>
          <div>
            <Loginform />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login