let data;
let maxDiameter;
let numCircles = 10; // nombre d'orbites
let circleRadii = [100,150,200,250,300,350,400,450,500,550,600]; // rayons des orbites
let circleAngles = [0,0,0,0,0,0,0,0,0,0,0,0]; // angles des bulles sur les orbites
let circleSpeeds = [0.005, 0.0035, 0.0025, 0.002, 0.0015, 0.001, 0.0008, 0.0006, 0.0004,0.0003]; // vitesses de rotation des bulles en orbite
let circlesStopped = false;
let moveCircle = false;

let addedX = 0;
let addedY = 0;

let img;

function preload() {
  // Charger le fichier CSV
  data = loadTable('risklist.csv', 'csv', 'header');
  // Créer l'image de légende
  img = createImg('Legende.png', 'légende du graphique');
}

function setup() {
  // Créer un canvas de la taille de l'écran
  createCanvas(windowWidth, 1500);
  
  stopButton = createButton('Stop');
  stopButton.position(20, 20);             
  stopButton.mousePressed(toggleCircles);
  stopButton.style('background-color', '#0281F8'); // couleur de fond bleu foncé
  stopButton.style('color', '#ffff'); // texte blanc
  stopButton.style('padding', '10px 20px'); // espacement interne du texte
  stopButton.style('border', 'none'); // pas de bordure
  stopButton.style('border-radius', '4px'); // bordure arrondie
  stopButton.style('font-family', 'Inter'); // police d'écriture
  stopButton.style('font-size', '16px'); // taille de police
  stopButton.style('cursor', 'pointer');
  
  let button = createButton('Changer vue graphique');
  button.position(20,80);
  button.mousePressed(modifyCircles);
  button.style('background-color', '#0281F8'); // couleur de fond bleu foncé
  button.style('color', '#ffff'); // texte blanc
  button.style('padding', '10px 20px'); // espacement interne du texte
  button.style('border', 'none'); // pas de bordure
  button.style('border-radius', '4px'); // bordure arrondie
  button.style('font-family', 'Inter'); // police d'écriture
  button.style('font-size', '16px'); // taille de police
  button.style('cursor', 'pointer');
  
  // Trouver la plus grande valeur dans la colonne "Diameter"
  maxDiameter = max(data.getColumn('Diameter'));

function toggleCircles() {
  // Si les bulles sont en mouvement, les arrêter, sinon les redémarrer
  if (circlesStopped) {
    circlesStopped = false;
    stopButton.html('Stop'); // changer le texte du bouton
  } else {
    circleSpeeds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    circlesStopped = true;
    stopButton.html('Start'); // changer le texte du bouton
  }
}

function draw() {
  
   // Placer l'image de légende
   img.position(20,150); 
   img.size(200,248);

    // Relance le mouvement des bulles à chaque frames s'il n'est pas actuellement bloqué
    if (circlesStopped != true) {
      circleSpeeds = [0.005, 0.0035, 0.0025, 0.002, 0.0015, 0.001, 0.0008, 0.0006, 0.0004,0.0003]; 
    } 

    background(50);

    //Afficher le titre
    textSize(40);
    textAlign(CENTER);
    fill(255);
    text("The end of the world is not today",700,300);


    // Dessiner les bulles sur les orbites
    for (let i = 0; i < data.getRowCount(); i++) {
      let diameter = data.getNum(i, 'Diameter');
      let radius = map(diameter, 0, maxDiameter,10,30);

      // Calculer la position en x et y du cercle sur l'orbite
      let circleIndex = i % numCircles; // index du cercle sur lequel le cercle doit être placé
      let circleRadius = circleRadii[circleIndex]; // rayon du cercle sur lequel le cercle doit être placé
      let angle = map(i, 0, data.getRowCount(), 0, TWO_PI); // angle sur l'orbite
      angle += circleAngles[circleIndex]; // ajouter l'angle de rotation du cercle en orbite
      let x = width/2 + (circleRadius + addedX) * cos(angle)/(0.5 + addedX);
      let y = height/2 + (circleRadius + addedY) * sin(angle)/(1.5 - addedY);

      // Définir la couleur en fonction de l'IP Max
      let ipMax = data.getNum(i, 'IP');
      if (ipMax >= 0.75) {                                // Elevé = rouge
        if (diameter >= 150){ fill(231, 125, 125, 180); }
        else { fill(231, 125, 125); }
        }
        else if (ipMax >= 0.5) {                         // Moyen = orange
            if (diameter >=150) { fill(248, 193, 129, 180); }
            else { fill(248, 193, 129); }
        }
        else if (ipMax >= 0.25  || ipMax >= 0.01) {      // Faible = jaune
            if (diameter >= 150) { fill(243, 230, 105, 180); }
            else { fill(243, 230, 105); }
        }
        else if (ipMax <0.01){                           // Très faible = vert
            if (diameter >= 150) { fill(181, 244, 179,180); }
            else { fill(181, 244, 179); } 
        }
  
      // Animation lorsque la souris passe sur une bulle
      let d = dist(x, y, mouseX, mouseY);
      if (d < radius/2) {
        // Modifier la couleur de la bulle
        fill(51, 204, 255);
        circleSpeeds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
     }
      // Afficher les bulles
      ellipse(x, y, radius);

      // Anime la rotation des bulles sur l'orbite
      for (let i = 0; i < numCircles; i++) {
        circleAngles[i] += circleSpeeds[i];
      }
    }
}

function cercleHover(cercle){    //Mettre en surbrillance les cercles hovered
  asteroid.fill(51, 204, 255);
  circlesStopped(true);
}

function modifyCircles() {
  // Modifie l'angle de vue du graphique
  if(addedX == 1){
    addedX -= 1
    moveCircle = false;
  }
  else{
    addedX += 1
    moveCircle = true;
  }
}
