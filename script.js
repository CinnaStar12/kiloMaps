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
  var shape = document.querySelector("#shape-options").value;
  var userHeight = parseInt(document.querySelector("#height").value);
  var userWidth = parseInt(document.querySelector("#width").value);
  var userColor = document.querySelector("#color").value;
  var userLabel = document.querySelector("#label").value;
  createShape(shape, userHeight, userWidth, userColor, userLabel);
})

document.querySelector("#shape-options").addEventListener("change", function(event){
  event.preventDefault();
  var shape = document.querySelector("#shape-options").value;

  if(shape === "rectangle" || shape === "ellipse"){
    createForm(shape);
      
    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();
      var userHeight = parseInt(document.querySelector("#height").value);
      var userWidth = parseInt(document.querySelector("#width").value);
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createShape(shape, userHeight, userWidth, userColor, userLabel);
    });
  }
  else if(shape === "triangle"){
    var numSides = 3;

    createForm(shape)

    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();
      var userRadius = parseInt(document.querySelector("#radius").value);
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createPolygon(numSides, userRadius, userColor, userLabel);
    });
  }
  else if(shape === "pentagon"){
    var numSides = 5;

    createForm(shape)

    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();
      var userRadius = parseInt(document.querySelector("#radius").value);
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createPolygon(numSides, userRadius, userColor, userLabel);
    });
  }
  else if(shape === "hexagon"){
    var numSides = 6;

    createForm(shape)

    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();
      var userRadius = parseInt(document.querySelector("#radius").value);
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createPolygon(numSides, userRadius, userColor, userLabel);
    });
  }
})

function createForm(currentShape){
  var input = document.querySelector("#dimension-input");
  while(input.firstChild){
    input.removeChild(input.firstChild);
  }

  if(currentShape === "rectangle" || currentShape === "ellipse"){

    var height = document.createElement("input");
    height.setAttribute("type", "text");
    height.setAttribute("id", "height");
    height.setAttribute("placeholder", "Height");
    input.appendChild(height);

    var width = document.createElement("input");
    width.setAttribute("type", "text");
    width.setAttribute("id", "width");
    width.setAttribute("placeholder", "Width");
    input.appendChild(width);

    var color = document.createElement("input");
    color.setAttribute("type", "text");
    color.setAttribute("id", "color");
    color.setAttribute("placeholder", "Color");
    input.appendChild(color);

    var label = document.createElement("input");
    label.setAttribute("type", "text");
    label.setAttribute("id", "label");
    label.setAttribute("placeholder", "Label");
    input.appendChild(label);

    var create = document.createElement("input");
    create.setAttribute("type", "submit");
    create.setAttribute("id", "create");
    create.setAttribute("value", "Create Object");
    input.appendChild(create);
  }
  else if(currentShape === "triangle" || currentShape === "pentagon" || currentShape === "hexagon"){

    var radius = document.createElement("input");
    radius.setAttribute("type", "text");
    radius.setAttribute("id", "radius");
    radius.setAttribute("placeholder", "Radius");
    input.appendChild(radius);

    var color = document.createElement("input");
    color.setAttribute("type", "text");
    color.setAttribute("id", "color");
    color.setAttribute("placeholder", "Color");
    input.appendChild(color);

    var label = document.createElement("input");
    label.setAttribute("type", "text");
    label.setAttribute("id", "label");
    label.setAttribute("placeholder", "Label");
    input.appendChild(label);

    var create = document.createElement("input");
    create.setAttribute("type", "submit");
    create.setAttribute("id", "create");
    create.setAttribute("value", "Create Object");
    input.appendChild(create);
  }
}

function createShape(shape, userHeight, userWidth, userColor, userLabel){
  switch(shape){

    case "rectangle":

      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userHeight + 20) + "px; width:" + (userWidth + 40) + "px");
      dragDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#shape-list").appendChild(dragDiv);

      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", (userWidth + 20));
      newCanvas.setAttribute("height", (userHeight + 20));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);
      divCounter++;

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
      });

      new Zdog.Rect({
        addTo: userShape,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the shape again and adding it to the list of items
      var listCanvasElement = "canvas-child-" + divCounter;
      var listDiv = document.createElement("div");
      listDiv.setAttribute("style", "height:" + (userHeight + 20) + "px; width:" + (userWidth + 40) + "px; text-align:center");
      listDiv.innerHTML = userLabel;
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 20));
      newListCanvas.setAttribute("height", (userHeight));
      listDiv.appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Rect({
        addTo: listIll,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      listIll.updateRenderGraph();
      
      function animate() {
        listIll.updateRenderGraph();
        requestAnimationFrame( animate );
      }
      animate();
      break;

    case "ellipse":

      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userHeight + 5) + "px; width:" + (userWidth + 25) + "px");
      dragDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#shape-list").appendChild(dragDiv);

      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", parseInt(userWidth + 5));
      newCanvas.setAttribute("height", parseInt(userHeight + 5));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);
      divCounter++;

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
      });

      new Zdog.Ellipse({
        addTo: userShape,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the shape again and adding it to the list of items
      var listCanvasElement = "canvas-child-" + divCounter;
      var listDiv = document.createElement("div");
      listDiv.setAttribute("style", "height:" + (userHeight + 25) + "px; width:" + (userWidth + 25) + "px; text-align:center");
      listDiv.innerHTML = userLabel;
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 5));
      newListCanvas.setAttribute("height", (userHeight + 5));
      listDiv.appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Ellipse({
        addTo: listIll,
        width: userWidth,
        height: userHeight,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      listIll.updateRenderGraph();

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
}

function createPolygon(numSides, userRadius, userColor, userLabel){
  var dragDiv = document.createElement("div");
  dragDiv.innerHTML = userLabel;
  dragDiv.setAttribute("class", "draggable");
  dragDiv.setAttribute("id", "draggable-" + divCounter)
  dragDiv.setAttribute("style", "height:" + (userRadius + 70) + "px; width:" + (userRadius + 70) + "px");
  dragDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#shape-list").appendChild(dragDiv);

  var newIllElement = "canvas-child-" + divCounter;
  var newCanvas = document.createElement("canvas");
  newCanvas.classList.add(newIllElement);
  newCanvas.setAttribute("width", parseInt(userRadius + 50));
  newCanvas.setAttribute("height", parseInt(userRadius + 50));
  document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);

  var userShape = new Zdog.Illustration({
    element: "." + newIllElement,
    zoom: 1,
  });

  new Zdog.Polygon({
    addTo: userShape,
    radius: userRadius,
    sides: numSides,
    translate: {z: 10},
    color: userColor,
    fill: true
  });

  //Making the shape again and adding it to the list of items
  var listCanvasElement = "canvas-child-" + divCounter;
  var listDiv = document.createElement("div");
  listDiv.setAttribute("style", "height:" + (userRadius + 70) + "px; width:" + (userRadius + 70) + "px; text-align:center");
  listDiv.innerHTML = userLabel;
  listDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#item-list").appendChild(listDiv);
  var newListCanvas = document.createElement("canvas");
  newListCanvas.classList.add(listCanvasElement);
  newListCanvas.setAttribute("width", (userRadius + 50));
  newListCanvas.setAttribute("height", (userRadius + 50));
  listDiv.appendChild(newListCanvas);

  var listIll = new Zdog.Illustration({
    element: "." + listCanvasElement,
    zoom: 1,
    dragRotate: true
  });

  new Zdog.Polygon({
    addTo: listIll,
    radius: userRadius,
    sides: numSides,
    translate: {z: 10},
    color: userColor,
    fill: true
  });

  listIll.updateRenderGraph();

  function animate() {
    userShape.updateRenderGraph();
    requestAnimationFrame( animate );
  }
  animate();

  divCounter++;

  userShape.updateRenderGraph();

  var dragClass = document.getElementsByClassName("draggable");
  for(var i = 0; i < dragClass.length; i++){
    dragElement(dragClass[i]);
  }
}

function addItem(userItem){
  var list = document.querySelector("#item-list");
  var item;
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