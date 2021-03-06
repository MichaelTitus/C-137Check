status = "";
video = "";
object = [];
function preload() {
    video = createVideo('video.mp4')
    video.hide()
}
function setup() {
    canvas = createCanvas(480, 380)
    canvas.center()

}
function draw() {
    image(video, 0, 0, 480, 380)
    console.log("video is live")
    if (status != "") {
        objectdetector.detect(video, gotresult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object(s) detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + object.length
            fill("turquoise")
            percent = floor(objects[i].confidence*100)
            text(object[i].label + " " + percent, object[i].x, object[i].y)
            noFill()
            stroke("red")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }
}

function start() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Object(s)"
}

function modelLoaded() {
    console.log("model is loaded")
    status = true;
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotresult(error, result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        object = result
    }
}