let data;
let maxDiameter;
let numCircles = 6; // nombre de cercles
let circleRadii = [400,500,900,600,700,800]; // rayons des cercles
let circleAngles = [0, 0,0,0,0,0]; // angles des cercles en orbite
let circleSpeeds = [0.005, 0.005, 0.005,0.005,0.005,0.005]; // vitesses de rotation des cercles en orbite

function preload() {
  // Charger le fichier CSV
  data = loadTable('risklist.csv', 'csv', 'header');
}

function setup() {
  // Créer un canvas de 1000x1000 pixels
  createCanvas(600, 600);

  // Fond gris
  background(200);

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

function draw() {
  // Effacer le canvas à chaque frame
  background(200);

  // Dessiner les cercles principaux
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < numCircles; i++) {
    let x = width/2;
    let y = height/2;
    ellipse(x, y, circleRadii[i]*2);
  }

  // Dessiner les cercles en orbite autour des cercles principaux
  noStroke();
  fill(0);
  for (let i = 0; i < data.getRowCount(); i++) {
    let diameter = data.getNum(i, 'Diameter');
    let radius = map(diameter, 0, maxDiameter, 10, 100);

    // Calculer la position en x et y du cercle sur l'orbite
    let circleIndex = i % numCircles; // index du cercle sur lequel le cercle doit être placé
    let circleRadius = circleRadii[circleIndex]; // rayon du cercle sur lequel le cercle doit être placé
    let angle = map(i, 0, data.getRowCount(), 0, TWO_PI); // angle sur l'orbite
    angle += circleAngles[circleIndex]; // ajouter l'angle de rotation du cercle en orbite
    let x = width/2 + circleRadius * cos(angle);
    let y = height/2 + circleRadius * sin(angle);

    // Dessiner le cercle
    ellipse(x, y, radius);
  }

  // Mettre à jour les angles de rotation des cercles en orbite
  for (let i = 0; i < numCircles; i++) {
    circleAngles[i] += circleSpeeds[i];
  }
}
