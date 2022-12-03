Status = "";
 objects= [];
babysong= "";
function preload(){
  babysong = loadSound("my_baby.mp3");
}
function setup(){
    canvas= createCanvas(400,300);
    canvas.center();
    objectDetector= ml5.objectDetector('cocoSSD', modelLoaded);
    video= createCapture(VIDEO);
    video.hide();
   
}

function DontStart(){

    document.getElementById('status').innerHTML= "Status: Detecting objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    Status = true;

}

function gotResult(error, results){
    if (error){
        console.error(error);
    }

    else{
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(video,0,0,400,300);

     if ( Status != "" && objects){
        r= random(50);
        g= random(50,200);
        b= random(100,250);

        objectDetector.detect(video, gotResult);
        for ( var i=0; i< objects.length; i++){
            document.getElementById('status').innerHTML= "Status: Object Detected";
            percent= Math.floor(objects[i].confidence * 100);
            stroke(r,g,b);
            text(objects[i].label + " " + percent + '%',objects[i].x, objects[i].y);
            stroke(r,g,b);
            fill(r,g,b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML= "Baby Found";
            }
            else{
                babysong.play();         }
            
        }
       
     }
}

