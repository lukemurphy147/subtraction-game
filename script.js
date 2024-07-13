function validate() {
    var heapSize = +document.getElementById("heapSize").value;
    var k = +document.getElementById("k").value;

    if (!Number.isInteger(heapSize) || heapSize < 1 || heapSize > 100) {
        alert("Invalid heap size");
        return;
    }
    if (!Number.isInteger(k) || k < 1 || k > 10) {
        alert("Invalid k");
        return;
    }

    game(heapSize, k);
}

function game(heapSize, k) {
    var divInput = document.getElementById("input");
    var divGame = document.getElementById("game");
    divInput.style.display = "none";
    divGame.style.display = "block";
}
