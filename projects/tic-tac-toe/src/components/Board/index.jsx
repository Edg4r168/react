import { TURNS } from '../../constants';
import { Square } from '../Square/Square';

export const Board = ({ board, turn}) => {

  const updateBoard = (index) => {
    // si hay algo en esa posicion no hacer nada
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      confetti();

    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const checkEndGame = (newBoard) => {
    // Ver si no hay espacios vacíos
    return newBoard.every(square => square !== null);
  };

  return <>
        {
          board.map((square, index) => {
            return (
             <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
             >
              {square}
             </Square>
            )
          })

        }
    </>
}