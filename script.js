var divCounter = 0;
var numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

//Creates the floor plan from the user's inputs on the form
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

    //Creates the floor plan on the DOM based on calculated inputs from user
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

  //Creates the rectangle if the user did not change the shape from the dropdown menu
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

  //Stores the value chosen into the 'shape' variable
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

      //Stores the calculated inputs and calls the createShape function
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

      //Calls the createPolygon function with the calculated inputs
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

      //Calls the createPolygon function with the calculated inputs
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

      //Calls the createPolygon function with the calculated inputs
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

  //Removes the previous form from the input div
  while(input.firstChild){
    input.removeChild(input.firstChild);
  }

  //Adds the form if shape chosen is rectangle or ellipse
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

  //Adds a different form for triangle, pentagon, and hexagon
  //Instead of length and width, we ask for radius
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

//Creates the shape(rectangle or ellipse) based on the user's inputs on the form
function createShape(shape, userLength, userWidth, userColor, userLabel){
  switch(shape){

    case "rectangle":

      //This is the div the canvas will append to and which the user will be able to drag from
      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)

      //Inserted some data labels to make the database storage simpler ~~~AB
      dragDiv.setAttribute("data-label", userLabel);
      dragDiv.setAttribute("data-color", userColor);
      dragDiv.setAttribute("data-shape", "rectangle");
      dragDiv.setAttribute("style", "height:" + (userLength) + "px; width:" + (userWidth + 20) + "px");
      dragDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#shape-list").appendChild(dragDiv);

      //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
      var rotateDiv = document.createElement("div");
      rotateDiv.setAttribute("id", "rotate-" + divCounter)
      rotateDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 20) + "px; margin-top:10px");
      document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

      var counter = 0;
      $("#rotate-" + divCounter).on("click", function(){
        if(counter !== 345){
          counter += 15;
          $(this).css("transform", "rotate(" + counter + "deg)");
        }
        else if(counter === 345){
          counter = 0;
          $(this).css("transform", "rotate(" + counter + "deg)");
        }
      })

      //Making the canvas which the created shape will be added to
      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", (userWidth + 20));
      newCanvas.setAttribute("height", (userLength + 20));
      document.querySelector("#rotate-" + divCounter).appendChild(newCanvas);
      divCounter++;

      //Creates the Illustration class from the ZDog API
      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
      });

      //Creates the shape from the ZDog API and adds it to our Illustration we created
      new Zdog.Rect({
        addTo: userShape,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the div again that will be added to the item-list div
      var listDiv = document.createElement("div");
      listDiv.innerHTML = userLabel;
      listDiv.setAttribute("id", "draggable-" + divCounter);
      listDiv.setAttribute("style", "height:" + (userLength + 40) + "px; width:" + (userWidth + 20) + "px; text-align:center");
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);

      //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
      var rotateDiv = document.createElement("div");
      rotateDiv.setAttribute("id", "rotate-" + divCounter)
      rotateDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 20) + "px");
      document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

      var listCounter = 0;
      $("#rotate-" + divCounter).on("click", function(){
        if(listCounter !== 345){
          listCounter += 15;
          $(this).css("transform", "rotate(" + listCounter + "deg)");
        }
        else if(listCounter === 345){
          listCounter = 0;
          $(this).css("transform", "rotate(" + listCounter + "deg)");
        }
      })
      
      //Making the canvas which the created shape will be added to
      var listCanvasElement = "canvas-child-" + divCounter;
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 20));
      newListCanvas.setAttribute("height", (userLength + 20));
      document.querySelector("#rotate-" + divCounter).appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
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

      //This is the div the canvas will append to and which the user will be able to drag from
      var dragDiv = document.createElement("div");
      dragDiv.innerHTML = userLabel;
      dragDiv.setAttribute("class", "draggable");
      dragDiv.setAttribute("id", "draggable-" + divCounter)

      //Inserted some data labels to make the database storage simpler ~~~AB
      dragDiv.setAttribute("data-label", userLabel);
      dragDiv.setAttribute("data-color", userColor);
      dragDiv.setAttribute("data-shape", "ellipse");
      dragDiv.setAttribute("style", "height:" + (userLength + 25) + "px; width:" + (userWidth + 25) + "px");
      dragDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#shape-list").appendChild(dragDiv);

      //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
      var rotateDiv = document.createElement("div");
      rotateDiv.setAttribute("id", "rotate-" + divCounter)
      rotateDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 20) + "px; margin-top:30px");
      document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

      var counter = 0;
      $("#rotate-" + divCounter).on("click", function(){
        if(counter !== 345){
          counter += 15;
          $(this).css("transform", "rotate(" + counter + "deg)");
        }
        else if(counter === 345){
          counter = 0;
          $(this).css("transform", "rotate(" + counter + "deg)");
        }
      })

      //Making the canvas which the created shape will be added to
      var newIllElement = "canvas-child-" + divCounter;
      var newCanvas = document.createElement("canvas");
      newCanvas.classList.add(newIllElement);
      newCanvas.setAttribute("width", parseInt(userWidth + 5));
      newCanvas.setAttribute("height", parseInt(userLength + 5));
      document.querySelector("#rotate-" + divCounter).appendChild(newCanvas);
      divCounter++;

      var userShape = new Zdog.Illustration({
        element: "." + newIllElement,
        zoom: 1,
      });

      new Zdog.Ellipse({
        addTo: userShape,
        width: userWidth,
        height: userLength,
        translate: {z: 10},
        color: userColor,
        fill: true
      });

      //Making the div again that will be added to the item-list div
      var listDiv = document.createElement("div");
      listDiv.innerHTML = userLabel;
      listDiv.setAttribute("id", "draggable-" + divCounter);
      listDiv.setAttribute("style", "height:" + (userLength + 55) + "px; width:" + (userWidth + 25) + "px; text-align:center");
      listDiv.addEventListener("contextmenu", function(event){
        event.preventDefault();
        $(this).remove();
        return false;
      })
      document.querySelector("#item-list").appendChild(listDiv);

      //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
      var rotateDiv = document.createElement("div");
      rotateDiv.setAttribute("id", "rotate-" + divCounter)
      rotateDiv.setAttribute("style", "height:" + (userLength + 20) + "px; width:" + (userWidth + 20) + "px; margin-top:20px");
      document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

      var listCounter = 0;
      $("#rotate-" + divCounter).on("click", function(){
        if(listCounter !== 345){
          listCounter += 15;
          $(this).css("transform", "rotate(" + listCounter + "deg)");
        }
        else if(listCounter === 345){
          listCounter = 0;
          $(this).css("transform", "rotate(" + listCounter + "deg)");
        }
      })

      //Making the canvas which the created shape will be added to
      var listCanvasElement = "canvas-child-" + divCounter;
      var newListCanvas = document.createElement("canvas");
      newListCanvas.classList.add(listCanvasElement);
      newListCanvas.setAttribute("width", (userWidth + 5));
      newListCanvas.setAttribute("height", (userLength + 5));
      document.querySelector("#rotate-" + divCounter).appendChild(newListCanvas);

      var listIll = new Zdog.Illustration({
        element: "." + listCanvasElement,
        zoom: 1,
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

  //Updates the illustrations to add the created shapes
  listIll.updateRenderGraph();
  userShape.updateRenderGraph();

  //The for-loop loops through the elements with the class of 'draggable' which allows for all elements to be able to be dragged
  var dragClass = document.getElementsByClassName("draggable");
  for(var i = 0; i < dragClass.length; i++){
    dragElement(dragClass[i]);
  }
}

//Creates the shape(triangle, pentagon, or hexagon) based on the user's inputs on the form
function createPolygon(numSides, userRadius, userColor, userLabel){

  //This is the div the canvas will append to and which the user will be able to drag from
  var dragDiv = document.createElement("div");
  dragDiv.innerHTML = userLabel;
  dragDiv.setAttribute("class", "draggable");
  dragDiv.setAttribute("id", "draggable-" + divCounter)

  //Inserted some data labels to make the database storage simpler ~~~AB
  dragDiv.setAttribute("data-label", userLabel);
  dragDiv.setAttribute("data-color", userColor);
  dragDiv.setAttribute("data-shape", "polygon");


  if(userRadius <= 92){
    dragDiv.setAttribute("style", "height:" + (userRadius + 100) + "px; width:" + (userRadius + 100) + "px");
  }
  else if(userRadius < 152){ //Any triangle more than 3'2" is too big for the canvas
    dragDiv.setAttribute("style", "height:" + (userRadius + 150) + "px; width:" + (userRadius + 150) + "px");
  }
  else{
    dragDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px");
 
  dragDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#shape-list").appendChild(dragDiv);

  //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
  var rotateDiv = document.createElement("div");
  rotateDiv.setAttribute("id", "rotate-" + divCounter)
  if(userRadius <= 92){
    rotateDiv.setAttribute("style", "height:" + (userRadius + 100) + "px; width:" + (userRadius + 100) + "px; margin-top:10px");
  }
  else if(userRadius < 152){
    rotateDiv.setAttribute("style", "height:" + (userRadius + 150) + "px; width:" + (userRadius + 150) + "px; margin-top:10px");
  }
  else{
    rotateDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px; margin-top:10px");
  }
  document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

  var counter = 0;
  $("#rotate-" + divCounter).on("click", function(){
    if(counter !== 345){
      counter += 15;
      $(this).css("transform", "rotate(" + counter + "deg)");
    }
    else if(counter === 345){
      counter = 0;
      $(this).css("transform", "rotate(" + counter + "deg)");
    }
  })

  //Making the canvas which the created shape will be added to
  var newIllElement = "canvas-child-" + divCounter;
  var newCanvas = document.createElement("canvas");
  newCanvas.classList.add(newIllElement);
  if(userRadius <= 92){
    newCanvas.setAttribute("width", parseInt(userRadius + 100));
    newCanvas.setAttribute("height", parseInt(userRadius + 100));
  }
  else if(userRadius < 152){
    newCanvas.setAttribute("width", parseInt(userRadius + 150));
    newCanvas.setAttribute("height", parseInt(userRadius + 150));
  }
  else{
    newCanvas.setAttribute("width", parseInt(userRadius + 200));
    newCanvas.setAttribute("height", parseInt(userRadius + 200));
  }
  document.querySelector("#rotate-" + divCounter).appendChild(newCanvas);
  divCounter++;

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

  //Making the div again that will be added to the item-list div
  var listDiv = document.createElement("div");
  listDiv.innerHTML = userLabel;
  listDiv.setAttribute("id", "draggable-" + divCounter);
  if(userRadius <= 92){
    listDiv.setAttribute("style", "height:" + (userRadius + 100) + "px; width:" + (userRadius + 100) + "px; text-align:center");
  }
  if(userRadius < 152){ //Any triangle more than 3'2" is too big for the canvas
    listDiv.setAttribute("style", "height:" + (userRadius + 150) + "px; width:" + (userRadius + 150) + "px; text-align:center");
  }
  else{
    listDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px; text-align:center");
  }
  listDiv.addEventListener("contextmenu", function(event){
    event.preventDefault();
    $(this).remove();
    return false;
  })
  document.querySelector("#item-list").appendChild(listDiv);

  //This creates another div that lets the user rotate the shape 15 degrees by clicking on it
  var rotateDiv = document.createElement("div");
  rotateDiv.setAttribute("id", "rotate-" + divCounter)
  if(userRadius <= 92){
    rotateDiv.setAttribute("style", "height:" + (userRadius + 100) + "px; width:" + (userRadius + 100) + "px; margin-top:10px; margin-bottom:20px");
  }
  else if(userRadius < 152){
    rotateDiv.setAttribute("style", "height:" + (userRadius + 150) + "px; width:" + (userRadius + 150) + "px; margin-top:10px; margin-bottom:20px");
  }
  else{
    rotateDiv.setAttribute("style", "height:" + (userRadius + 200) + "px; width:" + (userRadius + 200) + "px; margin-top:10px; margin-bottom:20px");
  }
  document.querySelector("#draggable-" + divCounter).appendChild(rotateDiv);

  var listCounter = 0;
  $("#rotate-" + divCounter).on("click", function(){
    if(listCounter !== 345){
      listCounter += 15;
      $(this).css("transform", "rotate(" + listCounter + "deg)");
    }
    else if(listCounter === 345){
      listCounter = 0;
      $(this).css("transform", "rotate(" + listCounter + "deg)");
    }
  })
  
  //Making the canvas which the created shape will be added to
  var listCanvasElement = "canvas-child-" + divCounter;
  var newListCanvas = document.createElement("canvas");
  newListCanvas.classList.add(listCanvasElement);
  if(userRadius <= 92){
    newListCanvas.setAttribute("width", parseInt(userRadius + 100));
    newListCanvas.setAttribute("height", parseInt(userRadius + 100));
  }
  else if(userRadius < 152){
    newListCanvas.setAttribute("width", parseInt(userRadius + 150));
    newListCanvas.setAttribute("height", parseInt(userRadius + 150));
  }
  else{
    newListCanvas.setAttribute("width", parseInt(userRadius + 200));
    newListCanvas.setAttribute("height", parseInt(userRadius + 200));
  }
  document.querySelector("#rotate-" + divCounter).appendChild(newListCanvas);

  var listIll = new Zdog.Illustration({
    element: "." + listCanvasElement,
    zoom: 1,
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

  listIll.updateRenderGraph();
  userShape.updateRenderGraph();

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