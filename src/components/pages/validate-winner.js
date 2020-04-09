export const validateWinner = (tiles, player) => {
    if (validateRowWin(tiles, player) === true) {
        return true
    }
    if (validateColumnWin(tiles, player) === true) {
        return true
    }
    if (validateCrossWin(tiles, player) === true) {
        return true
    }

    return false;
}

const validateRowWin = (tiles, player) => {
    for (let i = 0; i <= 6; i+=3) {
        if (tiles[i] === player && tiles[(i+1)] === player && tiles[(i+2)] === player) {
            return true;
        };
    }
    return null;
}

const validateColumnWin = (tiles, player) => {
    for (let i = 0; i < 3; i++) {
        if (tiles[i] === player && tiles[(i+3)] === player && tiles[(i+6)] === player) {
            return true;
        }
    }
    return null;
}

const validateCrossWin = (tiles, player) => {
    if (tiles[4] === player) {
        if (tiles[0] === player && tiles[8] === player) {
            return true
        }
        if (tiles[2] === player && tiles[6] === player) {
            return true
        }
    }
    return null;
}