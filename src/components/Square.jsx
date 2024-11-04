import "./Square.scss";
import { motion } from "framer-motion";
import trumpImage from '../images/trump.jpg'; // Adjust the path as needed
import kamalaImage from '../images/kamala.jpg'; // Adjust the path as needed

const Square = ({ ind, updateSquares, clsName }) => {
    const handleClick = () => {
        updateSquares(ind);
    };

    const renderContent = () => {
        if (clsName === 'x') {
            return <img src={trumpImage} alt="Trump" className="image" />;
        } else if (clsName === 'o') {
            return <img src={kamalaImage} alt="Kamala" className="image" />;
        } else {
            return null;
        }
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="square"
            onClick={handleClick}
        >
            {renderContent()}
        </motion.div>
    );
};

export default Square;
