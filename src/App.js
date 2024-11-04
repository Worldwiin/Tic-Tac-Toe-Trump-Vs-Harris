import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "./components/Button";
import Square from "./components/Square";

function App() {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);

    const checkEndTheGame = () => {
        for (let square of squares) {
            if (!square) return false;
        }
        return true;
    };

    const checkWinner = (squares) => {
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of combos) {
            const [a, b, c] = combo;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const updateSquares = (ind) => {
        if (squares[ind] || winner) {
            return;
        }
        const s = squares.slice(); // Ensure a new array is created
        s[ind] = turn;
        setSquares(s);
        const W = checkWinner(s);
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame()) {
            setWinner("x | o");
        } else {
            setTurn(turn === "x" ? "o" : "x");
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

    const getWinningMessage = () => {
        if (winner === "x") {
            return `Donald Trump Wins<br />Make America Great Again🇺🇸`;
        } else if (winner === "o") {
            return `Kamala Harris Wins<br />Stop The Count😂`;
        } else {
            return "No Winner :/";
        }
    };

    return (
        <div className="tic-tac-toe">
            <h1>TIC-TAC-TOE</h1><br/>
            <h1>TRUMP VS. HARRIS</h1>
            <Button resetGame={resetGame}/>
            <div className="game">
                {Array.from("012345678").map((ind) => (
                    <Square
                        key={ind}
                        ind={ind}
                        updateSquares={updateSquares}
                        clsName={squares[ind]}
                    />
                ))}
            </div>
            <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                <Square clsName="x"/>
                <Square clsName="o"/>
            </div>
            <AnimatePresence>
                {winner && (
                    <motion.div
                        key={"parent-box"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="winner"
                    >
                        <motion.div
                            key={"child-box"}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0, opacity: 0}}
                            className="text"
                        >
                            <motion.h2
                                initial={{scale: 0, y: 100}}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: {delay: 0.7},
                                        duration: 0.7,
                                    },
                                }}
                                dangerouslySetInnerHTML={{__html: getWinningMessage()}}
                            />
                            <motion.div
                                initial={{scale: 0}}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                {winner === "x | o" ? (
                                    <>
                                        <Square clsName="x"/>
                                        <Square clsName="o"/>
                                    </>
                                ) : (
                                    <>
                                        <Square clsName={winner}/>
                                    </>
                                )}
                            </motion.div>
                            <motion.div
                                initial={{scale: 0}}
                                animate={{
                                    scale: 1,
                                    transition: {delay: 1.5, duration: 0.3},
                                }}
                            >
                                <Button resetGame={resetGame}/>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
