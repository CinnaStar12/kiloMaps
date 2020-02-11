var firebaseConfig = {
    apiKey: "AIzaSyD4W7E-gWwLPiTo2woj0j8DCr99hra7Om4",
    authDomain: "kilomaps.firebaseapp.com",
    databaseURL: "https://kilomaps.firebaseio.com",
    projectId: "kilomaps",
    storageBucket: "kilomaps.appspot.com",
    messagingSenderId: "827361118666",
    appId: "1:827361118666:web:a972c32132424305a36733",
    measurementId: "G-Z97P053SC9"
};


firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var rooms = db.collection("userRooms");
var roomList = [];

function grabRoom(){
    var itemsList = document.getElementsByClassName("draggable");
    var itemStore = [];
    for(i = 0; i <= itemsList.length; i++)
{
    var itemWidth = itemsList[i].querySelector("canvas").getAttribute("width");
    var itemHeight = itemsList[i].querySelector("canvas").getAttribute("height");
    var posTop = itemsList[i].getAttribute("top");
    var posLeft = itemsList[i].getAttribute("left");
    var itemLabel = itemsList[i].getAttribute("data-label");
    var itemColor = itemsList[i].getAttribute("data-color");
    var shape = itemsList[i].getAttribute("data-shape");
    if (shape === "polygon"){
        var itemRadius = itemsList
    }
    var itemSpec = {
        width: itemWidth,
        height: itemHeight,
        top: posTop,
        left: posLeft,
        label: itemLabel,
        color: itemColor
    };
    itemStore.push(itemSpec);
}

    var roomSpec = {
        items:itemStore,
        roomSize: [document.querySelector("z-dog-canvas").getAttribute("width"),document.querySelector("z-dog-canvas").getAttribute("height")],
        roomLabel: roomLabel
        
    };
    return roomSpec;

}

function storeRoom(roomSpec){
    rooms.doc(roomSpec.roomLabel).set(roomSpec)
    .then(function() {
        console.log("Document Saved!")
    })
    .catch(function(error) {
        console.error("Error writing documentL ", error)
    });

}

function retrieveRoom(roomLabel){
    rooms.doc(roomLabel).get().then(function(doc) {

    })
}

// function restoreRoom(doc) {
//     if(doc.exists){
//         for(var i = 0; i <=doc.items.length; i++) { 
        
//         }
//     }
// }

