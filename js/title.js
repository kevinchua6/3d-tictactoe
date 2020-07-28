
//gamestart var
let gameStartBool = false;

document.getElementById("newGameButton").addEventListener("click", function() {
    //new game
    document.getElementById("dialogDiv").style.display = 'none';
    for (var i=0;i<27;i++){
        groupCubes.children[i].selected = null;
        groupCubes.children[i].material.color.set(0xffffff);
    }
    stop = false;
});


document.getElementById("startGameButton").addEventListener("click", function() {
    gameStartBool = true;
    //Start game
    //Set everything up
    init()
    document.querySelector( '#startGameButton' ).remove();
    document.querySelector( '.centerTitle' ).remove();
});