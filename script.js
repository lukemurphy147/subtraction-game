function startGame() {
    var initialHeap = +document.getElementById("initialHeap").value;
    var k = +document.getElementById("k").value;

    if (!Number.isInteger(initialHeap) || initialHeap < 1) {
        alert("Invalid initial heap size");
        return;
    }
    if (!Number.isInteger(k) || k < 1 || k > initialHeap) {
        alert("Invalid k");
        return;
    }

    document.getElementById("paramInput").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    document.getElementById("currentHeap").innerHTML = initialHeap;
    document.getElementById("currentPlayer").innerHTML = "Player 1's";
    document.getElementById("maxPerMove").innerHTML = k;
}

function stopGame() {
    document.getElementById("move").value = "";

    document.getElementById("game").style.display = "none";
    document.getElementById("paramInput").style.display = "block";
}

function updateHeap() {
    var currentPlayer = document.getElementById("currentPlayer").innerHTML;
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
        if (currentPlayer == "Player 1's") {
            alert("Player 1 wins!");
        }
        else {
            alert("Player 2 wins!")
        }
        stopGame();
        return;
    }

    document.getElementById("currentHeap").innerHTML = currentHeap;

    if (currentHeap < maxPerMove) {
        maxPerMove = currentHeap;
        document.getElementById("maxPerMove").innerHTML = maxPerMove;
    }

    if (currentPlayer == "Player 1's") {
        document.getElementById("currentPlayer").innerHTML = "Player 2's";
    }
    else {
        document.getElementById("currentPlayer").innerHTML = "Player 1's";
    }
}
