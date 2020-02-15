// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

document.querySelector("#save-floor-plan").addEventListener("click", function (event) {
    event.preventDefault()

    var roomName = document.querySelector("#floor-plan-name").value;
    sendRoom(grabRoom(roomName));
    document.querySelector(".modal").setAttribute("class", "modal")

})
function grabRoom(roomName) {

    var itemList = document.getElementsByClassName("draggable")
    var roomItems = [];

    for (var i = 0; i < itemList.length; i++) {
        var itemLabel = itemList[i].getAttribute("data-label")
        var itemPosTop = itemList[i].style.top
        var itemPosLeft = itemList[i].style.left
        var itemColor = itemList[i].getAttribute("data-color");
        var itemShape = itemList[i].getAttribute("data-shape");
        var itemRotation = itemList[i].style.transform

        if (itemShape === "polygon") {
            var itemSides = itemList[i].getAttribute("data-sides");
            var itemRadius = itemList[i].getAttribute("data-radius");
            var itemSpec = {
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
        else {
            var itemWidth = itemList[i].getAttribute("data-width");
            var itemLength = itemList[i].getAttribute("data-length");
            var itemSpec = {
                label: itemLabel,
                top: itemPosTop,
                left: itemPosLeft,
                color: itemColor,
                shape: itemShape,
                length: itemLength,
                width: itemWidth,
                rotation: itemRotation
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

function sendRoom(roomSpec) {
    db.collection("userRooms").doc(roomSpec.roomName).set(roomSpec)
        .then(function () {
            console.log("Room Saved Sucessfully")
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        })
}

class Room {
    constructor(roomName, roomWidth, roomItems, roomHeight) {
        this.roomName = roomName;
        this.roomWidth = roomWidth;
        this.roomItems = roomItems;
        this.roomHeight = roomHeight;
    }
    toString() {
        return this.roomHeight, + ', ' + this.roomWidth + ', ' + this.roomItems + ', ' + this.roomName;

    }

}

roomConverter = {
    toFirestore: function (room) {
        return {
            roomName: room.roomName,
            roomHeight: room.roomHeight,
            roomItems: room.roomItems,
            roomWidth: room.roomWidth,
        }

    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Room(data.roomName, data.roomHeight, data.roomItems, data.roomWidth)
    }
}

$("#load-floor-plan").on("click", function(event)
{
    event.preventDefault();
    var roomGet = $("#floor-plan-name-load").val()
    db.collection("userRooms").doc(roomGet)
        .withConverter(roomConverter)
        .get().then(function (doc) {
            if (doc.exists) {
                room = doc.data()
                console.log(room);
                console.log(typeof room);
                console.log(room.roomName);
                console.log(room.roomHeight);
                console.log(room.roomItems);
                let newCanvas = document.createElement("canvas");
                newCanvas.classList.add("zdog-canvas"); //CLASS FOR THE MAIN FLOOR PLAN BODY
                newCanvas.setAttribute("width", room.roomWidth);
                newCanvas.setAttribute("height", room.roomWidth);
                document.querySelector("#user-canvas").appendChild(newCanvas);
                var items = room.roomItems
                console.log(items)
                for(var j = 0; j < items.length; j++){
                    if(items[j].shape == "polygon"){
                        createPolygon(items[j].polySides, items[j].polyRadius, items[j].color, items[j].label, items[j].label)
                        document.querySelector("#draggable-" + j).style.top = items[j].top;
                        document.querySelector("#draggable-" + j).style.left = items[j].left;
                        document.querySelector("#draggable-" + j).style.transform = items[j].rotation;
                    }
                    else{
                        var itemWidthParse = parseInt(items[j].width);
                        var itemLengthParse = parseInt(items[j].length);
                        console.log(itemWidthParse, itemLengthParse)

                        createShape(items[j].shape, itemLengthParse, itemWidthParse, items[j].color, items[j].label, items[j].label);
                        document.querySelector("#draggable-" + j).style.top = items[j].top;
                        document.querySelector("#draggable-" + j).style.left = items[j].left;
                        document.querySelector("#draggable-" + j).style.transform = items[j].rotation;
                    }
                    }
                }
            
            else {
                console.log("No room found")
            }}).catch(function (error) {
                console.log("error", error)
            });
})

    