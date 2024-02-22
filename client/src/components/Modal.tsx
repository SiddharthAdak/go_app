import { ReactNode } from 'react';
import { motion } from 'framer-motion';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  hidden: { y: "-100vh", opacity: 0,
  transition: {
    duration: 1
  }
 },
  visible: { 
    y: "100px", 
    opacity: 1,
    transition: { delay: 0.2 }
  },
}

const Modal: React.FC<{
        children: ReactNode, 
        showModal: boolean,
        backdropClick: () => void
    }> = ({
        children, 
        showModal,  
        backdropClick
    }) => {

    return (
      <div>
        { showModal && (
        <motion.div className=" fixed top-0 left-0 w-screen h-screen z-20 bg-black/50"
          onClick={backdropClick}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="max-w-[400px] m-auto p-10 bg-white rounded-md text-center"
            variants={modal}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
      </div>
  )
}
export default Modal;