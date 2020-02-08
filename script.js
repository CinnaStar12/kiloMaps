var divCounter = 0;

document.querySelector("#make-floor-plan").addEventListener("click", function(event){
    event.preventDefault();

    let newCanvas = document.createElement("canvas");
    newCanvas.classList.add("zdog-canvas");
    newCanvas.setAttribute("width", document.querySelector("#canvas-width").value);
    newCanvas.setAttribute("height", document.querySelector("#canvas-height").value);
    document.querySelector("#user-canvas").appendChild(newCanvas);
})

document.querySelector("#make-rect").addEventListener("click", function(event){
    event.preventDefault();

    let dragDiv = document.createElement("div");
    dragDiv.setAttribute("id", "draggable");
    dragDiv.setAttribute("style", "height:" + (parseInt(document.querySelector("#rect-height").value) + 10) + "px; width:" + (parseInt(document.querySelector("#rect-width").value) + 10) + "px; position:absolute; cursor:move");
    document.querySelector("body").appendChild(dragDiv);

    console.log(parseInt(document.querySelector("#rect-height").value) + 10);
    console.log(parseInt(document.querySelector("#rect-width").value) + 10);
    console.log(dragDiv.getAttribute("style"));
    console.log(dragDiv.getAttribute("id"));
    console.log(document.querySelector(("#draggable-" + divCounter)))

    let newIllElement = "canvas-child-" + divCounter;
    let newCanvas = document.createElement("canvas");
    newCanvas.classList.add(newIllElement);
    newCanvas.setAttribute("width", document.querySelector("#rect-width").value);
    newCanvas.setAttribute("height", document.querySelector("#rect-height").value);
    document.querySelector("#draggable").appendChild(newCanvas);
    
    console.log(newCanvas.getAttribute("class"));
    
    let userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 4,
        dragRotate: true,
    });
    
    let rect = new Zdog.Rect({
        addTo: userShape,
        width: document.querySelector("#rect-width").value,
        height: document.querySelector("#rect-height").value,
        translate: {z: 10},
        stroke: 1,
        color: '#E62',
        fill: true
    });

    //divCounter++;

    userShape.updateRenderGraph();
    dragElement(document.querySelector("#draggable"));
})

//Code taken from https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   if (document.querySelector("#draggable")) {
     // if present, the header is where you move the DIV from:
     document.querySelector("#draggable").onmousedown = dragMouseDown;
   }
   else {
     // otherwise, move the DIV from anywhere inside the DIV:
     elmnt.onmousedown = dragMouseDown;
   }

   function dragMouseDown(e) {
     e = e || window.event;
     e.preventDefault();
     // get the mouse cursor position at startup:
     pos3 = e.clientX;
     pos4 = e.clientY;
     document.onmouseup = closeDragElement;
     // call a function whenever the cursor moves:
     document.onmousemove = elementDrag;
    }

   function elementDrag(e) {
     e = e || window.event;
     e.preventDefault();
     // calculate the new cursor position:
     pos1 = pos3 - e.clientX;
     pos2 = pos4 - e.clientY;
     pos3 = e.clientX;
     pos4 = e.clientY;
     // set the element's new position:
     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
   }

   function closeDragElement() {
     // stop moving when mouse button is released:
     document.onmouseup = null;
     document.onmousemove = null;
   }
}