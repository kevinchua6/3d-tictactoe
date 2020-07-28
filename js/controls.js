let mouseDraggingBool = false;

//vars to handle dragging controls
let previousX, previousY;
let rotationSensitivity = 0.003

// Controls
document.addEventListener("keydown", function(event) {
    event.preventDefault();
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    
    switch (key) { // change to event.key to key to use the above variable
        case "a":
        case "ArrowLeft":{ 
            // Left pressed
            isLeftKeyDown = true;
            break;
        }
        case "d":
        case "ArrowRight": {
            // Right pressed
            isRightKeyDown = true;
            break;
        }
        case "w":
        case "ArrowUp": {
            // Up pressed
            isUpKeyDown = true;
            break;
        }
        case "s":
        case "ArrowDown": {
            // Down pressed
            isDownKeyDown = true;
            break;
        }
    }
});

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    
    switch (key) { // change to event.key to key to use the above variable
        case "a":
        case "ArrowLeft":{ 
            // Left pressed
            isLeftKeyDown = false;
            break;
        }
        case "d":
        case "ArrowRight": {
            // Right pressed
            isRightKeyDown = false;
            break;
        }
        case "w":
        case "ArrowUp": {
            // Up pressed
            isUpKeyDown = false;
            break;
        }
        case "s":
        case "ArrowDown": {
            // Down pressed
            isDownKeyDown = false;
            break;
        }  
    }
});

function handleKeys() {
    if (isLeftKeyDown == true) {
        //Iterates through all the values of cubes dict
        groupCubes.rotation.y -= speed;
    }
    if (isRightKeyDown == true) {
        groupCubes.rotation.y += speed;
        
    }
    if (isUpKeyDown == true) {
        groupCubes.rotation.x -= speed;
        
    }
    if (isDownKeyDown == true) {
        groupCubes.rotation.x += speed;
        
    }
};

document.addEventListener('mousemove', function() {
    if (gameStartBool){
        //update wheel number
        wheelNumber = 0
        //Calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        update()


    }
}, false);

function update(){
    if (!mouseDraggingBool){
        //Update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        //Calculate objects intersecting the picking ray
        intersects = raycaster.intersectObjects( groupCubes.children );
        //If one or more intersections,
        if ( intersects.length > 0 ) {
            //If a closestIntersected obj (the prev selected obj) exists and its not selected
            //Restore previous intersection obejct to its original color
            if (closestIntersected && !closestIntersected.selected)
                closestIntersected.material.color.setHex(0xffffff);
            //Store reference to the closest obj as intersection obj
            closestIntersected = intersects[0].object;

            if (!closestIntersected.selected){
                //Store current color of closest intersection obj
                closestIntersected.currentHex = closestIntersected.material.color.getHex();
                //Make the closest object red						
                intersects[0].object.material.color.set(0xff0000);
            }
            
        }
        else {
            if (closestIntersected && !closestIntersected.selected)
                closestIntersected.material.color.setHex(0xffffff);
            //Remove previous reference
            closestIntersected = null;
            
        }
        
    }
}

//note: 0xff0000 red, 0xffffff white, 0x00ff00 green
document.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    //console.info(delta);
    if ( intersects.length > 1 && !stop){
        //If scrolling up
        if (delta == -1){
            //eg if intersects.length = 2, wheelNumber would only go up to 1
            if (wheelNumber < intersects.length - 1) {
                wheelNumber += 1;
                //If the selected one is white (not green), change the current block to red
                if (intersects[wheelNumber].object.material.color.getHexString() == 'ffffff'){
                    intersects[wheelNumber].object.material.color.set(0xff0000);
                }
                
                //Set current selected red back to its normal color and remove the previous reference
                if (closestIntersected && !closestIntersected.selected)
                    closestIntersected.material.color.setHex(0xffffff);
                //Store currently selected to closestIntersected 
                closestIntersected = intersects[wheelNumber].object;
                
            }
            else if (wheelNumber == intersects.length - 1){
                wheelNumber = 0;
                if (intersects[wheelNumber].object.material.color.getHexString() == 'ffffff'){
                    intersects[wheelNumber].object.material.color.set(0xff0000);
                }
                //Set current selected red back to its normal color and remove the previous reference
                if (closestIntersected && !closestIntersected.selected)
                    closestIntersected.material.color.setHex(0xffffff);
                closestIntersected = intersects[wheelNumber].object;
                
            }
        }
        //If scrolling down
        else if (delta == 1){
            if (wheelNumber > 0){
                wheelNumber -=1;
                if (intersects[wheelNumber].object.material.color.getHexString() == 'ffffff'){
                    intersects[wheelNumber].object.material.color.set(0xff0000);
                    
                }
                //Set current selected red back to its normal color and remove the previous reference
                if (closestIntersected && !closestIntersected.selected)
                    closestIntersected.material.color.setHex(0xffffff);
                closestIntersected = intersects[wheelNumber].object;
            }
            else if (wheelNumber == 0) {
                wheelNumber = intersects.length -1;
                if (intersects[wheelNumber].object.material.color.getHexString() == 'ffffff'){
                    intersects[wheelNumber].object.material.color.set(0xff0000);
                }
                //Set current selected red back to its normal color (white) and remove the previous reference
                if (closestIntersected && !closestIntersected.selected)
                    closestIntersected.material.color.setHex(0xffffff);
                closestIntersected = intersects[wheelNumber].object;
            }
        }
    }
});

let mousePositionDown = {x:0, y:0};
let mousePositionUp = {x:0, y:0};

//Code for dragging on mouse and Desktop (credit to shaun)
document.addEventListener("mousedown", event => {
    if (!mouseDraggingBool && gameStartBool){
        previousX = event.pageX;
        previousY = event.pageY;
        
        mousePositionDown.x = event.pageX;
        mousePositionDown.y = event.pageY;

        console.log("Down")
        console.log(mousePositionDown.x ,mousePositionDown.y)

        document.onmousemove = event => {
            mouseMoveFunction(event);
        }
    }


})

// For mobile
document.addEventListener("touchstart", event => {
    let touch = event.touches[0];
    previousX = touch.pageX;
    previousY = touch.pageY;
    document.ontouchmove = event => {
        mouseMoveFunction(event.touches[0]);
    }
})

document.addEventListener("touchend", e => {
    finalizeSelection()
    document.ontouchmove = null;
    mouseDraggingBool = false;
})

document.addEventListener("mouseup", event => {
    mousePositionUp.x = event.pageX;
    mousePositionUp.y = event.pageY;

    console.log ("up")
    console.log (mousePositionUp.x,mousePositionUp.y)
    console.log((Math.abs(mousePositionDown.x - mousePositionUp.x) < 10) &&  (Math.abs(mousePositionDown.y - mousePositionUp.y) < 10));

    // Create a condition so that if the diff is > than smth then enable this
    if ( (Math.abs(mousePositionDown.x - mousePositionUp.x) < 10) &&  (Math.abs(mousePositionDown.y - mousePositionUp.y) < 10) ){
        finalizeSelection()
    }
    document.onmousemove = null;
    mouseDraggingBool = false;
})



function mouseMoveFunction(event) {
    mouseDraggingBool = true;

    groupCubes.rotation.x += rotationSensitivity * (event.pageY - previousY);
    groupCubes.rotation.y += rotationSensitivity * (event.pageX - previousX);

    previousX = event.pageX;
    previousY = event.pageY;
}
