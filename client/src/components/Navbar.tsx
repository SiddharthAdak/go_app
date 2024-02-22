import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { useLogout } from "../hooks/authHooks";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, updateScore } from "../Redux/features/userSlice";
import { LoadingSvg } from "../assets/Svg";
import { RootState } from "../Redux/store";
const Navbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {logout, loading, error} = useLogout();
  const name = useSelector((state: RootState) => state.user.username)
  const score = useSelector((state: RootState) => state.user.score)
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
  };
  const logoutUser = async() => {
    const response = await logout();
    if (response) {
      dispatch(setUsername(null))
      dispatch(updateScore(0))
      setShowModal(false);
    }
  }
  return (
    <>
    <Modal showModal = {showModal} backdropClick={closeModal}>
      
        
        {(!loading) ? 
        <div>
          <div className=" font-semibold text-lg mb-2">Are you sure you want to logout</div>
          <div>
            {error && <div className=" text-red-500 text-sm ">*error ocurred while logging out</div>}
            <div className="mt-2">
              
              <button onClick={logoutUser} className=" px-5 py-1 m-1 rounded-md bg-primary font-semibold text-black">Yes</button>
              <button onClick={closeModal} className=" px-5 py-1 m-1 rounded-md bg-black font-semibold text-white">No</button>
            </div>
          </div>
        </div>:
        <div>
          <div className=" font-semibold text-lg mb-2">Logging out</div>
          <LoadingSvg className=' animate-spin w-6 m-auto' />
        </div>
        }
      
    </Modal>
    <div className=" z-10 m-auto fixed top-0 left-0 w-screen border-gray-300 border-b-2 flex justify-center px-5 py-4 items-center h-16 bg-white">
      <div className="  max-w-[1350px] flex justify-between w-screen items-center">
        
        <div className=" flex gap-5 items-center">
          <h2 className=" text-2xl font-semibold text-black">
            Exploding 
            <span className=" text-primary"> Kittens</span>
          </h2>
          {(name) && <><Link
            to="/"
            className=" underline text-lg py-1 px-2 rounded-md text-black bg-white font-semibold"
          >
            Play
          </Link>
          <Link
            to="/rank"
            className=" underline text-lg py-1 px-2 rounded-md text-black bg-white font-semibold"
          >
            Rank
          </Link></>}
        </div>
        {(name) && <div className=" flex gap-2 items-center">
        <div className="px-5 py-1 m-1 rounded-md bg-green-100 font-semibold text-green-700">name: {name}</div>
          <div className="px-5 py-1 m-1 rounded-md bg-yellow-100 font-semibold text-yellow-700">score: {score}</div>
          <button onClick={()=> setShowModal(true)} className="px-5 py-1 m-1 rounded-md bg-black font-semibold text-white">
            logout
          </button>
        </div>}
      </div>
    </div>
  </>
  );
};

export default Navbar;
