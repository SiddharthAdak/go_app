import { motion } from 'framer-motion';
const Cardback = ({count}: {count: number}) => {
    const seasonsList: JSX.Element[] = [];

    for (let index = 0; index < count; index++) {
        seasonsList.push(
        <motion.div
            key={index + "back"}
            className={" card_back"}
            initial = {{
                left: 0
            }}
            animate = {{
                left: 12*index
            }}
        > 
        </motion.div>);
    }
    return (
        <>
            {seasonsList}
        </>
    )
}

export default Cardback