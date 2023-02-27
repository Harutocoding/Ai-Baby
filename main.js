img ="";
status ="";
object = [];
sound = "";

function preload(){
    img = loadImage("dog_cat.jpg");
    sound =loadSound("looney_toons.mp3");

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
   image(video, 0, 0, 380, 380);

   if(status !="")
   {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < object.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Object Detected ";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : "+ object.length;

        fill(r,g,b);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if (object[i].label == "person")
        {
            document.getElementById("status2").innerHTML = "Baby Found";
            sound.Stop();
        }
        else 
        {
            document.getElementById("status2").innerHTML = "Baby Not Found";
            sound.play();
        }
    }
    if (object.length == 0)
    {
        document.getElementById("status2").innerHTML = "Objects not Founded";
        sound.play();
    }
   }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}