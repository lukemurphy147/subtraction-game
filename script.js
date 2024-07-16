"use strict";

function startGame() {
    var initialHeap = +document.getElementById("initialHeap").value;
    var k = +document.getElementById("k").value;

    if (!Number.isInteger(initialHeap) || initialHeap < 1) {
        alert("Invalid initial heap size");
        return;
    } else if (!Number.isInteger(k) || k < 1 || k > initialHeap) {
        alert("Invalid k");
        return;
    }

    document.getElementById("paramInput").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    document.getElementById("currentHeap").innerHTML = initialHeap;
    document.getElementById("maxPerMove").innerHTML = k;

    var turnOrder = document.getElementById("turnOrder").value;
    var currentPlayer = document.getElementById("currentPlayer")

    if (turnOrder == "twoHumans") {
        currentPlayer.innerHTML = "Player 1's";
    } else if (turnOrder == "humanFirst") {
        currentPlayer.innerHTML = "your";
    } else {
        currentPlayer.innerHTML = "your";
        computerMove(initialHeap, k);
    }
}

function stopGame() {
    document.getElementById("move").value = "";

    document.getElementById("game").style.display = "none";
    document.getElementById("paramInput").style.display = "block";
}

function playerMove() {
    var currentPlayer = document.getElementById("currentPlayer");
    var currentHeap = +document.getElementById("currentHeap").innerHTML;
    var maxPerMove = +document.getElementById("maxPerMove").innerHTML;
    var move = +document.getElementById("move").value;

    document.getElementById("move").value = "";

    if (!Number.isInteger(move) || move < 1 || move > maxPerMove) {
        alert("Invalid move");
        return;
    }

    currentHeap -= move;
    if (currentHeap == 0) {
        if (currentPlayer.innerHTML == "Player 1's") {
            alert("Player 1 wins!");
        } else if (currentPlayer.innerHTML == "Player 2's") {
            alert("Player 2 wins!");
        } else {
            alert("You win! Well played.");
        }
        stopGame();
        return;
    }

    document.getElementById("currentHeap").innerHTML = currentHeap;

    if (currentHeap < maxPerMove) {
        maxPerMove = currentHeap;
        document.getElementById("maxPerMove").innerHTML = maxPerMove;
    }

    if (currentPlayer.innerHTML == "Player 1's") {
        currentPlayer.innerHTML = "Player 2's";
    } else if (currentPlayer.innerHTML == "Player 2's") {
        currentPlayer.innerHTML = "Player 1's";
    } else {
        computerMove(currentHeap, maxPerMove);
    }
}

function computerMove(currentHeap, maxPerMove) {
    if (currentHeap % (maxPerMove + 1) == 0) {
        /* This is a losing position, so we make a random legal move and hope the player makes a mistake. */
        move = Math.floor(Math.random() * maxPerMove) + 1;
    } else {
        /* This is a winning position, so we put the player in a losing position. */
        move = currentHeap % (maxPerMove + 1);
    }

    currentHeap -= move;
    if (move == 1) {
        alert(`The computer removes 1 object from the heap.`);
    } else {
        alert(`The computer removes ${move} objects from the heap.`);
    }

    if (currentHeap == 0) {
        alert("The computer wins! Better luck next time.");
        stopGame();
        return;
    }

    document.getElementById("currentHeap").innerHTML = currentHeap;

    if (currentHeap < maxPerMove) {
        maxPerMove = currentHeap;
        document.getElementById("maxPerMove").innerHTML = maxPerMove;
    }
}
