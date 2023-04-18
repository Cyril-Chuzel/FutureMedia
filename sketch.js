let data;
let maxDiameter;
let numCircles = 7; // nombre de cercles
let circleRadii = [1100,900,800,700,600,500,400,300,1000,1200]; // rayons des cercle
let circleAngles = [0,0,0,0,0,0,0,0,0,0,0]; // angles des cercles en orbite
let circleSpeeds = [0.0015,0.002,0.0025,0.003,0.0035,0.004,0.0045,0.005,0.0015,0.0015]; // vitesses de rotation des cercles en orbite
let stopButton;
let circlesStopped = false;
let moveCircle = false;

let addedX = 0;
let addedY = 0;


function preload() {
  // Charger le fichier CSV
  data = loadTable('risklist.csv', 'csv', 'header');
}

function setup() {
  // Créer un canvas de 1000x1000 pixels
  createCanvas(1800,1800);

  // Fond gris
  background(255);
  
  stopButton = createButton('Stop');
  stopButton.position(20, 20);             
  stopButton.mousePressed(toggleCircles);
  
  let button = createButton('Changer la vue ');
  button.position(40,40);
  button.mousePressed(modifyCircles);
 
  
  // Trouver la plus grande valeur dans la colonne "Diameter"
  maxDiameter = max(data.getColumn('Diameter'));

  // Dessiner les cercles
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < numCircles; i++) {
  ellipse(width/2, height/2, circleRadii[i]*2);
  }
}

function toggleCircles() {
  // Si les cercles sont en mouvement, les arrêter, sinon les redémarrer
  if (circlesStopped) {
    circleSpeeds = [0.0015, 0.002, 0.0025, 0.003, 0.0035, 0.004, 0.0045, 0.005, 0.0015, 0.0015];
    circlesStopped = false;
    stopButton.html('Stop'); // changer le texte du bouton
  } else {
    circleSpeeds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    circlesStopped = true;
    stopButton.html('Start'); // changer le texte du bouton
  }
}



function draw() {
  // Effacer le canvas à chaque frame
  background(50);

  textSize(40);
  textAlign(CENTER);
  fill(255);
  text("The end of world is not today",600,900);
  
  // Dessiner les cercles en orbite autour des cercles principaux
  for (let i = 0; i < data.getRowCount(); i++) {
    let diameter = data.getNum(i, 'Diameter');
    let radius = map(diameter, 0, maxDiameter,15, 90);

    // Calculer la position en x et y du cercle sur l'orbite
    let circleIndex = i % numCircles; // index du cercle sur lequel le cercle doit être placé
    let circleRadius = circleRadii[circleIndex]; // rayon du cercle sur lequel le cercle doit être placé
    let angle = map(i, 0, data.getRowCount(), 0, TWO_PI); // angle sur l'orbite
    angle += circleAngles[circleIndex]; // ajouter l'angle de rotation du cercle en orbite
      let x = width/2 + (circleRadius + addedX) * cos(angle)/(0.5 + addedX);
      let y = height/2 + (circleRadius + addedY) * sin(angle)/(1.5 - addedY);

    // Choisir la couleur en fonction de l'IP Max
    let ipMax = data.getNum(i, 'IP');
    if (ipMax >= 0.87) {
      fill(255, 20, 0); // Rouge
      strokeWeight(1)
      stroke(255);
    } else if (ipMax >= 0.39) {
      fill(255, 114, 0); // Orange
      strokeWeight(1)
      stroke(255);
    } else if (ipMax >= 0.1){
      fill(255,191,0); // Jaune
      strokeWeight(1)
      stroke(255);
    }
    else if (ipMax <0.1 && diameter >= 300){
      fill(255,255,0,180)
    }
   else{
     fill(255,255,0)
   }
       
      
    // Dessiner le cercle
    ellipse(x, y, radius);
  }

  // Mettre à jour les angles de rotation des cercles en orbite
  for (let i = 0; i < numCircles; i++) {
    circleAngles[i] += circleSpeeds[i];
  }
}

function modifyCircles() {
  // Si les cercles sont en mouvement, les arrêter, sinon les redémarrer
  if(addedX == 1){
    addedX -= 1
    moveCircle = false;
  }
  else{
    addedX += 0.5
    moveCircle = true;
  }
  }

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
