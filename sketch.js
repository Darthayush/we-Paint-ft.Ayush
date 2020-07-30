var canvas;
var database;

var drawing = []
var currentPath=[];
var isDrawing=false;
function setup() {
    canvas = createCanvas(400, 400);
    canvas.mousePressed(startPath);

    canvas.parent('canvascontainer');
    database = firebase.database()
    background(51)
    var clearbutton = select('#clearbutton');
    var save = select('#Save');
save.mousePressed(saveDrawing);
    if(clearbutton.mousePressed(clearDrawing)){
        clearDrawing
    }

}

var db_drawing = []

function mouseDragged() {
if(isDrawing){
    var point = {
        x: mouseX,
        y: mouseY
    }
    currentPath.push(point);
    var drawingRef = database.ref('drawing')
}drawingRef.set({
        "d": drawing
    })
}
   
function startPath(){
    isDrawing=true;
    currentPath=[]
    drawing.push(currentPath);
}

function endPath (){
    isDrawing=false;
}

function draw() {
    background("black");
    readData()
    
    stroke(255);
    strokeWeight(4);
 
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        var path=drawing [i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
    
        vertex(path[j].x, path[j].y);
        }
endShape();
}
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

 function clearDrawing() {
     db_drawing = []
     var drawingRef = database.ref('drawing')
     drawingRef.set({
         "d": []
     })
 }

function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}

function saveDrawing(){
    var ref= database.ref('drawings')
    var data = {
        name:"Ayush",
        drawing:drawing
    } 
    var result=ref.push(data);
    console.log(result.key)
}

//function dataSent(status){
    //console.log(status)}
