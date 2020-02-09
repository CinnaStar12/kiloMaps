var divCounter = 0;

document.querySelector("#make-floor-plan").addEventListener("click", function(event){
    event.preventDefault();

    let newCanvas = document.createElement("canvas");
    newCanvas.classList.add("zdog-canvas");
    newCanvas.setAttribute("width", document.querySelector("#canvas-width").value);
    newCanvas.setAttribute("height", document.querySelector("#canvas-height").value);
    document.querySelector("#user-canvas").appendChild(newCanvas);
})

document.querySelector("#make-shape").addEventListener("click", function(event){
    event.preventDefault();

    var shapeChosen = document.querySelector("#shape-options");
    var shape = shapeChosen.value;
    var userHeight = parseInt(document.querySelector("#height").value);
    var userWidth = parseInt(document.querySelector("#width").value);
    var userColor = document.querySelector("#color").value;

    createShape(shape, userHeight, userWidth, userColor);
})

function createShape(shape, userHeight, userWidth, userColor){

  switch(shape){

    case "rectangle":

      var dragDiv = document.createElement("div");
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userHeight) + "px; width:" + (userWidth + 30) + "px");
      document.querySelector("#shape-list").appendChild(dragDiv);

      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", (userWidth + 20));
      newCanvas.setAttribute("height", (userHeight + 20));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
        dragRotate: true,
      });

      new Zdog.Rect({
        addTo: userShape,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      function animate() {
        userShape.updateRenderGraph();
        requestAnimationFrame( animate );
      }
      animate();
      break;

    case "ellipse":

      var dragDiv = document.createElement("div");
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userHeight) + "px; width:" + (userWidth + 15) + "px");
      document.querySelector("#shape-list").appendChild(dragDiv);

      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", parseInt(userWidth + 5));
      newCanvas.setAttribute("height", parseInt(userHeight + 5));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
        dragRotate: true,
      });

      new Zdog.Ellipse({
        addTo: userShape,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      function animate() {
        userShape.updateRenderGraph();
        requestAnimationFrame( animate );
      }
      animate();
      break;
  }

  divCounter++;

  userShape.updateRenderGraph();

  var dragClass = document.getElementsByClassName("draggable");

  for(var i = 0; i < dragClass.length; i++){
    dragElement(dragClass[i]);
  }

  animate(userShape);
}

function animate(userShape){
  userShape.updateRenderGraph();
  requestAnimationFrame( animate );
}

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