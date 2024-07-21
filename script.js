"use strict";

function startGame() {
    const initialHeap = +document.getElementById("initialHeap").value;
    const k = +document.getElementById("k").value;
    const turnOrder = document.getElementById("turnOrder").value;
    const currentPlayer = document.getElementById("currentPlayer")
    const dialog = document.getElementById("dialog");
    const dialogText = document.getElementById("dialogText");

    if (!Number.isInteger(initialHeap) || initialHeap < 1) {
        dialogText.innerHTML = "Invalid initial heap size";
        dialog.showModal();
        return;
    } else if (!Number.isInteger(k) || k < 1 || k > initialHeap) {
        dialogText.innerHTML = "Invalid k";
        dialog.showModal();
        return;
    }

    showAndHide("game", "paramInput");
    
    updateHeap(initialHeap);
    document.getElementById("maxPerMove").innerHTML = k;


    if (turnOrder == "twoHumans") {
        currentPlayer.innerHTML = "Player 1's";
        showAndHide("playerInput", "computerOutput");
    } else if (turnOrder == "humanFirst") {
        currentPlayer.innerHTML = "your";
        showAndHide("playerInput", "computerOutput");
    } else {
        computerTurn1(initialHeap, k);
    }
}

function playerTurn() {
    const currentPlayer = document.getElementById("currentPlayer");
    let currentHeap = +document.getElementById("currentHeap").innerHTML.replace(/\D/g, '');
    let maxPerMove = +document.getElementById("maxPerMove").innerHTML;
    const playerMove = +document.getElementById("playerMove").value;
    const dialog = document.getElementById("dialog");
    const dialogText = document.getElementById("dialogText");

    document.getElementById("playerMove").value = "";

    if (!Number.isInteger(playerMove) || playerMove < 1 || playerMove > maxPerMove) {
        dialogText.innerHTML = "Invalid move";
        dialog.showModal();
        return;
    }

    currentHeap -= playerMove;
    if (currentHeap == 0) {
        if (currentPlayer.innerHTML == "Player 1's") {
            dialogText.innerHTML = "Player 1 wins!";
        } else if (currentPlayer.innerHTML == "Player 2's") {
            dialogText.innerHTML = "Player 2 wins!";
        } else {
            dialogText.innerHTML = "You win! Well played.";
        }
        dialog.showModal();
        stopGame();
        return;
    }

    updateHeap(currentHeap);

    if (currentHeap < maxPerMove) {
        maxPerMove = currentHeap;
        document.getElementById("maxPerMove").innerHTML = maxPerMove;
    }

    if (currentPlayer.innerHTML == "Player 1's") {
        currentPlayer.innerHTML = "Player 2's";
    } else if (currentPlayer.innerHTML == "Player 2's") {
        currentPlayer.innerHTML = "Player 1's";
    } else {
        computerTurn1(currentHeap, maxPerMove);
    }
}

/* This function is in two parts so the player can see what the computer did before continuing. */
function computerTurn1(currentHeap, maxPerMove) {
    const currentPlayer = document.getElementById("currentPlayer");
    const computerMove = document.getElementById("computerMove");
    let bestMove;

    currentPlayer.innerHTML = "the computer's";
    showAndHide("computerOutput", "playerInput");

    if (currentHeap % (maxPerMove + 1) == 0) {
        /* This is a losing position, so we make a random legal move and hope the player makes a mistake. */
        bestMove = Math.floor(Math.random() * maxPerMove) + 1;
    } else {
        /* This is a winning position, so we put the player in a losing position. */
        bestMove = currentHeap % (maxPerMove + 1);
    }

    if (bestMove == 1) {
        computerMove.innerHTML = "1 object";
    } else {
        computerMove.innerHTML = `${bestMove} objects`;
    }
}

function computerTurn2() {
    const currentPlayer = document.getElementById("currentPlayer");
    let currentHeap = +document.getElementById("currentHeap").innerHTML.replace(/\D/g, '');
    let maxPerMove = +document.getElementById("maxPerMove").innerHTML;
    const computerMove = +document.getElementById("computerMove").innerHTML.replace(/\D/g, '');
    const dialog = document.getElementById("dialog");
    const dialogText = document.getElementById("dialogText");

    currentHeap -= computerMove;

    if (currentHeap == 0) {
        dialogText.innerHTML = "The computer wins! Better luck next time.";
        dialog.showModal();
        stopGame();
        return;
    }

    updateHeap(currentHeap);

    if (currentHeap < maxPerMove) {
        maxPerMove = currentHeap;
        document.getElementById("maxPerMove").innerHTML = maxPerMove;
    }

    currentPlayer.innerHTML = "your";
    showAndHide("playerInput", "computerOutput");
}

function closeDialog() {
    dialog.close();
}

function showAndHide(toShow, toHide) {
    document.getElementById(toShow).style.display = "block";
    document.getElementById(toHide).style.display = "none";
}

function updateHeap(newSize) {
    if (newSize == 1) {
        document.getElementById("currentHeap").innerHTML = "is 1 object";
    } else {
        document.getElementById("currentHeap").innerHTML = `are ${newSize} objects`;
    }
}

function stopGame() {
    document.getElementById("playerMove").value = "";

    showAndHide("paramInput", "game");
}
