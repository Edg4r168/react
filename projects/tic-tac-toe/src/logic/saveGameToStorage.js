

export const saveGameToStorage = ({ board, turn }) => {
    Promise.all([
        window.localStorage.setItem("board", JSON.stringify(board)),
        window.localStorage.setItem("turn", turn)
    ]);
};

