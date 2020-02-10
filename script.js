var divCounter = 0;
var numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

//Creates the floor plan from the users inputs on the form
document.querySelector("#make-floor-plan").addEventListener("click", function(event){
    event.preventDefault();

    //For scaling, 1 foot = 48 pixels and 1 inch = 4 pixels
    let widthFeet = parseInt(document.querySelector("#canvas-width").value) * 48;
    let heightFeet = parseInt(document.querySelector("#canvas-height").value) * 48;
    let widthString = document.querySelector("#canvas-width").value;
    let heightString = document.querySelector("#canvas-height").value;
    var widthArray = widthString.split("");
    var heightArray = heightString.split("");
    var widthInches = "";
    var heightInches = "";

    for(i = 0; i < widthArray.length; i++){
      if(widthArray[i - 1] === "'" && numArray.indexOf(widthArray[i]) !== -1){
        widthInches += widthArray[i];
        if(numArray.indexOf(widthArray[i + 1]) !== -1){
          widthInches += widthArray[i + 1];
        }
      }
    }
    widthInches = parseInt(widthInches) * 4;

    for(i = 0; i < heightArray.length; i++){
      if(heightArray[i - 1] === "'" && numArray.indexOf(heightArray[i]) !== -1){
        heightInches += heightArray[i];
        if(numArray.indexOf(heightArray[i + 1]) !== -1){
          heightInches += heightArray[i + 1];
        }
      }
    }
    heightInches = parseInt(heightInches) * 4;

    console.log(widthFeet + widthInches, heightFeet + heightInches)

    let newCanvas = document.createElement("canvas");
    newCanvas.classList.add("zdog-canvas");
    newCanvas.setAttribute("width", widthFeet + widthInches);
    newCanvas.setAttribute("height", heightFeet + heightInches);
    document.querySelector("#user-canvas").appendChild(newCanvas);
})

//This event listener is only for the initial html web page we loaded
document.querySelector("#make-shape").addEventListener("click", function(event){
  event.preventDefault();

  //Calculations for feet and inches
  let widthFeet = parseInt(document.querySelector("#width").value) * 48;
  let lengthFeet = parseInt(document.querySelector("#length").value) * 48;
  let widthString = document.querySelector("#width").value;
  let lengthString = document.querySelector("#length").value;
  var widthArray = widthString.split("");
  var lengthArray = lengthString.split("");
  var widthInches = "";
  var lengthInches = "";

  for(i = 0; i < widthArray.length; i++){
    if(widthArray[i - 1] === "'" && numArray.indexOf(widthArray[i]) !== -1){
      widthInches += widthArray[i];
      if(numArray.indexOf(widthArray[i + 1]) !== -1){
        widthInches += widthArray[i + 1];
      }
    }
  }
  widthInches = parseInt(widthInches) * 4;

  for(i = 0; i < lengthArray.length; i++){
    if(lengthArray[i - 1] === "'" && numArray.indexOf(lengthArray[i]) !== -1){
      lengthInches += lengthArray[i];
      if(numArray.indexOf(lengthArray[i + 1]) !== -1){
        lengthInches += lengthArray[i + 1];
      }
    }
  }
  lengthInches = parseInt(lengthInches) * 4;

  var shape = document.querySelector("#shape-options").value;
  var userLength = lengthFeet + lengthInches;
  var userWidth = widthFeet + widthInches;
  var userColor = document.querySelector("#color").value;
  var userLabel = document.querySelector("#label").value;
  createShape(shape, userLength, userWidth, userColor, userLabel);
})

//This is the new form created when the user changes the shape options from the dropdown menu
document.querySelector("#shape-options").addEventListener("change", function(event){
  event.preventDefault();
  var shape = document.querySelector("#shape-options").value;

  if(shape === "rectangle" || shape === "ellipse"){
    createForm(shape);
      
    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();

      //Calculations for feet and inches
      let widthFeet = parseInt(document.querySelector("#width").value) * 48;
      let lengthFeet = parseInt(document.querySelector("#length").value) * 48;
      let widthString = document.querySelector("#width").value;
      let lengthString = document.querySelector("#length").value;
      var widthArray = widthString.split("");
      var lengthArray = lengthString.split("");
      var widthInches = "";
      var lengthInches = "";
    
      for(i = 0; i < widthArray.length; i++){
        if(widthArray[i - 1] === "'" && numArray.indexOf(widthArray[i]) !== -1){
          widthInches += widthArray[i];
          if(numArray.indexOf(widthArray[i + 1]) !== -1){
            widthInches += widthArray[i + 1];
          }
        }
      }
      widthInches = parseInt(widthInches) * 4;
    
      for(i = 0; i < lengthArray.length; i++){
        if(lengthArray[i - 1] === "'" && numArray.indexOf(lengthArray[i]) !== -1){
          lengthInches += lengthArray[i];
          if(numArray.indexOf(lengthArray[i + 1]) !== -1){
            lengthInches += lengthArray[i + 1];
          }
        }
      }
      lengthInches = parseInt(lengthInches) * 4;

      var userLength = lengthFeet + lengthInches;
      var userWidth = widthFeet + widthInches;
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createShape(shape, userLength, userWidth, userColor, userLabel);
    });
  }
  else if(shape === "triangle"){
    var numSides = 3;

    createForm(shape)

    document.querySelector("#create").addEventListener("click", function(event){
      event.preventDefault();

      //Calculations for feet and inches of the radius
      let radiusFeet = parseInt(document.querySelector("#radius").value) * 48;
      let radiusString = document.querySelector("#radius").value;
      var radiusArray = radiusString.split("");
      var radiusInches = "";
    
      for(i = 0; i < radiusArray.length; i++){
        if(radiusArray[i - 1] === "'" && numArray.indexOf(radiusArray[i]) !== -1){
          radiusInches += radiusArray[i];
          if(numArray.indexOf(radiusArray[i + 1]) !== -1){
            radiusInches += radiusArray[i + 1];
          }
        }
      }
      radiusInches = parseInt(radiusInches) * 4;

      var userRadius = radiusFeet + radiusInches;
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

      //Calculations for feet and inches of the radius
      let radiusFeet = parseInt(document.querySelector("#radius").value) * 48;
      let radiusString = document.querySelector("#radius").value;
      var radiusArray = radiusString.split("");
      var radiusInches = "";
    
      for(i = 0; i < radiusArray.length; i++){
        if(radiusArray[i - 1] === "'" && numArray.indexOf(radiusArray[i]) !== -1){
          radiusInches += radiusArray[i];
          if(numArray.indexOf(radiusArray[i + 1]) !== -1){
            radiusInches += radiusArray[i + 1];
          }
        }
      }
      radiusInches = parseInt(radiusInches) * 4;

      var userRadius = radiusFeet + radiusInches;
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

      //Calculations for feet and inches of the radius
      let radiusFeet = parseInt(document.querySelector("#radius").value) * 48;
      let radiusString = document.querySelector("#radius").value;
      var radiusArray = radiusString.split("");
      var radiusInches = "";
    
      for(i = 0; i < radiusArray.length; i++){
        if(radiusArray[i - 1] === "'" && numArray.indexOf(radiusArray[i]) !== -1){
          radiusInches += radiusArray[i];
          if(numArray.indexOf(radiusArray[i + 1]) !== -1){
            radiusInches += radiusArray[i + 1];
          }
        }
      }
      radiusInches = parseInt(radiusInches) * 4;

      var userRadius = radiusFeet + radiusInches;
      var userColor = document.querySelector("#color").value;
      var userLabel = document.querySelector("#label").value;
      createPolygon(numSides, userRadius, userColor, userLabel);
    });
  }
})

//Creates the form on the DOM when the user selects a certain shape from the dropdown menu
function createForm(currentShape){
  var input = document.querySelector("#dimension-input");
  while(input.firstChild){
    input.removeChild(input.firstChild);
  }

  if(currentShape === "rectangle" || currentShape === "ellipse"){

    var length = document.createElement("input");
    length.setAttribute("type", "text");
    length.setAttribute("id", "length");
    length.setAttribute("placeholder", "Length");
    input.appendChild(length);

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

//Creates the shape(rectangle or ellipse) based on the users inputs on the form
function createShape(shape, userLength, userWidth, userColor, userLabel){
  switch(shape){

    case "rectangle":

      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 40) + "px");
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
      newCanvas.setAttribute("height", (userLength + 20));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);
      divCounter++;

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Rect({
        addTo: userShape,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the shape again and adding it to the list of items
      var listDiv = document.createElement("div");
      listDiv.innerHTML = userLabel;
      listDiv.setAttribute("id", "draggable-" + divCounter);
      listDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 40) + "px; text-align:center");
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);
      
      var listCanvasElement = "canvas-child-" + divCounter;
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 20));
      newListCanvas.setAttribute("height", (userLength));
      document.querySelector("#draggable-" + divCounter).appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Rect({
        addTo: listIll,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });
      break;

    case "ellipse":

      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)
      dragDiv.setAttribute("style", "height:" + (userLength + 5) + "px; width:" + (userWidth + 25) + "px");
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
      newCanvas.setAttribute("height", parseInt(userLength + 5));
      document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);
      divCounter++;

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Ellipse({
        addTo: userShape,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the shape again and adding it to the list of items
      var listDiv = document.createElement("div");
      listDiv.innerHTML = userLabel;
      listDiv.setAttribute("id", "draggable-" + divCounter);
      listDiv.setAttribute("style", "height:" + (userLength + 25) + "px; width:" + (userWidth + 25) + "px; text-align:center");
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);

      var listCanvasElement = "canvas-child-" + divCounter;
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 5));
      newListCanvas.setAttribute("height", (userLength + 5));
      document.querySelector("#draggable-" + divCounter).appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
        dragRotate: true
      });

      new Zdog.Ellipse({
        addTo: listIll,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });
      break;
  }

  divCounter++;

  animate();
      
  function animate() {
    listIll.updateRenderGraph();
    userShape.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  var dragClass = document.getElementsByClassName("draggable");
  for(var i = 0; i < dragClass.length; i++){
    dragElement(dragClass[i]);
  }
}

//Creates the shape(triangle, pentagon, or hexagon) based on the users inputs on the form
function createPolygon(numSides, userRadius, userColor, userLabel){
  var dragDiv = document.createElement("div");
  dragDiv.innerHTML = userLabel;
  dragDiv.setAttribute("class", "draggable");
  dragDiv.setAttribute("id", "draggable-" + divCounter)
  dragDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px");
  dragDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#shape-list").appendChild(dragDiv);

  var newIllElement = "canvas-child-" + divCounter;
  var newCanvas = document.createElement("canvas");
  newCanvas.classList.add(newIllElement);
  newCanvas.setAttribute("width", parseInt(userRadius + 200));
  newCanvas.setAttribute("height", parseInt(userRadius + 200));
  document.querySelector("#draggable-" + divCounter).appendChild(newCanvas);
  divCounter++;

  var userShape = new Zdog.Illustration({
    element: "." + newIllElement,
    zoom: 1,
    dragRotate: true
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
  var listDiv = document.createElement("div");
  listDiv.innerHTML = userLabel;
  listDiv.setAttribute("id", "draggable-" + divCounter);
  listDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px; text-align:center");
  listDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#item-list").appendChild(listDiv);
  
  var listCanvasElement = "canvas-child-" + divCounter;
  var newListCanvas = document.createElement("canvas");
  newListCanvas.classList.add(listCanvasElement);
  newListCanvas.setAttribute("width", (userRadius + 200));
  newListCanvas.setAttribute("height", (userRadius + 200));
  document.querySelector("#draggable-" + divCounter).appendChild(newListCanvas);

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

  divCounter++;

  animate();
  
  function animate() {
    listIll.updateRenderGraph();
    userShape.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  var dragClass = document.getElementsByClassName("draggable");
  for(var i = 0; i < dragClass.length; i++){
    dragElement(dragClass[i]);
  }
}

//Code taken from https://www.w3schools.com/howto/howto_js_draggable.asp
//Allows the user to drag their created items onto the floor plan
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