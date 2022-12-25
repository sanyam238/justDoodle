function setup(){
    canvas = createCanvas(360,360);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
    }

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
    console.log("MODEL LOADED!");
}

function draw(){
    strokeWeight(5);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clear_canvas(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }

        console.log(results);
        document.getElementById("label").innerHTML = "identified sketch: "+ results[0].label;
        document.getElementById("confidence").innerHTML = "confidence: "+ Math.round(results[0].confidence *100)+"%";
        
utter_this = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utter_this);
    
}