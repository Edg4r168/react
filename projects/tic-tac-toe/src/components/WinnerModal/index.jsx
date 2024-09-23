import { removeItem } from "../../logic/removeItems";
import { Square } from "../Square/Square";

export const WinnerModal = ({ winner, resetGame }) => {
    if (winner === null) return null;
    const text = winner === false ? "Empate" : "Gano";

    Promise.all([removeItem("board"), removeItem("turn")])
    .then(results => {
        console.log(results[0]);
        console.log(results[1]);
    });
        
    return (
        <section className='winner'>
            <div className='text'>
                <h2>{text}</h2>
                {
                    winner && (
                        <header className='win'>
                            <Square>{winner}</Square>
                        </header>
                    )
                }
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}