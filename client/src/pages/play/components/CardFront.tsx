import CardSvg from "./CardSvg"
import { motion } from "framer-motion"
const CardFront = ({cardList} : {cardList: string[]}) => {
    
    return (
        <>
            {cardList.map((e: string, i: number) => {
                return (
                <motion.div key={e + i}
                    initial = {{
                        right: 300
                    }}
                    animate = {{
                        right: (cardList.length - i - 1)*12
                    }}
                    
                    className=" card_front"
                >
                    <CardSvg cardType={e} />
                </motion.div>)
            })}
        </>
    )
}

export default CardFront