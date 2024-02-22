import { useState } from "react";
import Cardback from "./components/Cardback";
import CardFront from "./components/CardFront";
import Modal from "../../components/Modal";
import ModalContent from "./components/ModalContent";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Redux/store";
import { reset } from "../../Redux/features/gameSlice";
import { selectFunction } from "./gameFunctions";
import { gameStates } from "./constants";
import { updateScoreApi } from "../../api/game";
import { updateScore } from "../../Redux/features/userSlice";
const Play = () => {
  const count = useSelector((state: RootState) => state.game.count);
  const cardList = useSelector((state: RootState) => state.game.cardList);
  const message = useSelector((state: RootState) => state.game.message);
  const defuse = useSelector((state: RootState) => state.game.defuse);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>(gameStates.CONTINUE);
  
  const closeModal = () => {
    if (modalType != gameStates.LOADING) {
      dispatch(reset());
      setShowModal(false);
      setModalType(gameStates.CONTINUE)
    }
    
  };
  const updateScoreFunc = async() => {
    setShowModal(true);
    setModalType(gameStates.LOADING);
    if (username) {
      const {data, error} = await updateScoreApi({username: username});
      if (error) {
        setModalType(gameStates.ERROR);
      }
      else{
        setModalType(gameStates.WIN);
        dispatch(updateScore(data.score))
      }
    }
  }
  const handleDeckClick = async() => {
    if (count > 0) {
      const gameState = selectFunction(dispatch, count, defuse);
      if (gameState != gameStates.CONTINUE) {
        if (gameState == gameStates.WIN) {
          await updateScoreFunc();
        }
        else{
          setShowModal(true);
          setModalType(gameState);
        }
        
        
      }
    }
  }
  

  return (
    <>
      <Modal showModal={showModal} backdropClick={closeModal}>
        <ModalContent modalType={modalType} closeModal={closeModal} />
      </Modal>
      <div className=" bg-gray-100 min-w-max w-screen h-screen flex items-center justify-center overflow-auto p-10">
        <div>
        <div className=" bg-yellow-100 text-yellow-700 h-max w-max rounded-md shadow-lg p-2 mb-3">
          {message}
        </div>
        <div className=" bg-back-image bg-cover h-max w-[800px] rounded-md shadow-lg p-10 ">
          <div className=" mb-5">
            <div className=" flex gap-2">
              <div className=" text-green-700 bg-green-100 px-5 rounded-md py-2">
                {count} cards to win
              </div>
              <div className=" text-blue-700 bg-blue-100 px-5 rounded-md py-2">
                {defuse} defuse cards
              </div>
            </div>
          </div>
          <div className=" flex justify-between">
            <div
              onClick={handleDeckClick}
              className=" relative h-64 cursor-pointer"
            >
              <Cardback count={count} />
            </div>
            {cardList.length !== 0 ? (
              <div className=" relative h-64">
                <CardFront cardList={cardList} />
              </div>
            ) : (
              <div className=" text-gray-200 text-lg font-semibold h-64 w-40 border-dashed border-4 border-gray-200 rounded-md grid place-items-center">
                <div>
                <p className=" text-center">no card</p>
                <p className=" text-center">revealed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Play;
