import { CatSvg, BombSvg, DefuseSvg, ShuffleSvg } from '../../../assets/Svg';

const CardSvg = ({cardType}: {cardType: string}) => {
    switch (cardType) {
        case "cat":
            return <CatSvg />
            // break;
        case "bomb":
            return <BombSvg />
            // break;
        case "defuse":
            return <DefuseSvg />
        case "shuffle":
            return <ShuffleSvg />
        default:
            return <ShuffleSvg />
            // break;
    }
}

export default CardSvg