  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  document.querySelector("#save-floor-plan").addEventListener("click", function(event){
    event.preventDefault()

    var roomName = document.querySelector("#floor-plan-name").value;
    sendRoom(grabRoom(roomName));
    
  })


  function grabRoom(roomName){
    
    var itemList = document.getElementsByClassName("draggable")
    var roomItems = [];

    for(var i = 0; i < itemList.length; i++){
        var itemLabel = itemList[i].getAttribute("data-label")
        var itemPosTop = itemList[i].style.top
        var itemPosLeft = itemList[i].style.left
        var itemColor = itemList[i].getAttribute("data-color");
        var itemShape = itemList[i].getAttribute("data-shape");
        var itemRotation = itemList[i].getAttribute("data-rotation");

        if(itemShape === "polygon"){
            var itemSides = itemList[i].getAttribute("data-sides");
            var itemRadius = itemList[i].getAttribute("data-radius");
            var itemSpec ={
                label: itemLabel,
                top: itemPosTop,
                left: itemPosLeft,
                color: itemColor,
                shape: itemShape,
                rotation: itemRotation,
                polySides: itemSides,
                polyRadius: itemRadius,
            }
            roomItems.push(itemSpec);
        }
        else{
            var itemWidth = itemList[i].getAttribute("data-width");
            var itemLength = itemList[i].getAttribute("data-length");
            var itemSpec ={
                label: itemLabel,
                top: itemPosTop,
                left: itemPosLeft,
                color: itemColor,
                shape: itemShape,
                length: itemLength,
                width: itemWidth
            }
            roomItems.push(itemSpec);
        }
    }
    
    var roomSpec = {
        roomHeight: document.querySelector(".zdog-canvas").getAttribute("height"),
        roomWidth: document.querySelector(".zdog-canvas").getAttribute("width"),
        roomItems: roomItems,
        roomName: roomName
      }
      return roomSpec;

  }

  function sendRoom(roomSpec){
    db.collection("userRooms").doc(roomSpec.roomName).set(roomSpec)
    .then(function(){
        console.log("Room Saved Sucessfully")
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  }

  function getRoom(roomName){
    db.collection("userRoom").doc(roomName).get()
    .then(function(doc) {
        if(doc.exists){
            console.log(doc)
            return doc;
        }
        else {
            console.log("Room not found")
        }
    })
    .catch(function(error) {
        console.log("Error getting room", error);
    })

  }
  function setRoom(roomSpec){
    makeFloorPlan(roomSpec.roomWidth, roomSpec.roomHeight)
  }
