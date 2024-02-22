import React from "react";
import { gameStates } from "../constants";
import { LoadingSvg, ShuffleSvg } from "../../../assets/Svg";

const ModalContent: React.FC<{
  modalType: string;
  closeModal: () => void
}> = ({ modalType, closeModal }) => {
    
  return (
    <>
      {(modalType === gameStates.WIN) ? (
        <div>
          <div className=" text-xl font-semibold">Congrats! You won!</div>
          <img
            src="https://i.pinimg.com/originals/60/8f/cb/608fcb5878113362ae2ea6d9033f120a.gif"
            alt=""
          />
          <button 
          onClick={closeModal}
          className=" px-5 py-2 bg-black text-white rounded-md">
            close
          </button>
        </div>
      ) : 
      (modalType === gameStates.LOSE) ? (
        <div>
          <div className=" text-xl font-semibold text-red-600">
            You lost! The bomb was triggered
          </div>
          <img
            src="https://media1.tenor.com/m/APSSFvnUrdgAAAAC/sad-nuggie-gaming.gif"
            alt=""
          />
          <button 
          onClick={closeModal}
          className=" px-5 py-2 bg-black text-white rounded-md">
            close
          </button>
        </div>
      ): 
      (modalType === gameStates.RESTART) ? (
        <div>
          <div className=" text-xl font-semibold text-blue-600">
            Shuffle card was revealed.<br/>
            <div className=" text-black">
            The game will restart
            </div>
          </div>
          <div className=" w-max m-auto">
          <ShuffleSvg />
          </div>
          <button 
          onClick={closeModal}
          className=" px-5 py-2 bg-black text-white rounded-md">
            close
          </button>
        </div>
      ):(modalType === gameStates.ERROR) ? (
        <div>
          <div className=" text-xl font-semibold">Congrats! You won!</div>
          <div className=" text-lg font-semibold text-red-600">
            Error occured while updating score<br/>
          </div>
          <img
            src="https://i.pinimg.com/originals/60/8f/cb/608fcb5878113362ae2ea6d9033f120a.gif"
            alt=""
          />
          <button 
          onClick={closeModal}
          className=" px-5 py-2 bg-black text-white rounded-md">
            close
          </button>
        </div>
      ):(modalType === gameStates.LOADING) ? (
        <div>
          <div className=" text-lg font-semibold text-green-600">
            Please wait while updating score<br/>
          </div>
          <LoadingSvg className=' animate-spin w-6 m-auto mt-3' />
        </div>
      ): <div></div>
      }
    </>
  );
};

export default ModalContent;
