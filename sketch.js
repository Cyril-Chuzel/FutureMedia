let circleSizes = [];
let circleDangerLevels = [];

function setup() {
  createCanvas(700, 700);
  for (let i = 0; i < 40; i++) {
    circleSizes.push(random(5, 25)); // stocker les tailles générées aléatoirement
    circleDangerLevels.push(floor(random(6))); // stocker les niveaux de danger aléatoires (0-5)
  }
}

function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(2);
  
  // dessiner le cercle au centre
  ellipse(width/2, height/2, 100, 100);
  
  // dessiner les cercles concentriques
  for (let i = 1; i <= 5; i++) {
    let r = i * 40;
    noFill();
    stroke(0);
    strokeWeight(2);
    if (i == 1) { // si on est au premier cercle
      fill(0, 255, 0); // colorier en vert
      noStroke();
    }
    ellipse(width/2, height/2, r*2, r*2);
    
    // dessiner les cercles en orbite
    let numOrbit = i * 8;
    let orbitRadius = r + 10;
    let orbitSpeed = map(i, 1, 5, 0.05, 0.01);
    for (let j = 0; j < numOrbit; j++) {
      let x = width/2 + orbitRadius * cos(j * TWO_PI/numOrbit + millis() * orbitSpeed/1000);
      let y = height/2 + orbitRadius * sin(j * TWO_PI/numOrbit + millis() * orbitSpeed/1000);
      let dangerLevel = circleDangerLevels[j % circleDangerLevels.length]; // sélectionner un niveau de danger aléatoire dans le tableau
      if (dangerLevel == 0) {
        fill(0, 255, 0); // vert si sans danger
      } else if (dangerLevel == 1 || dangerLevel == 2) {
        fill(255, 165, 0); // orange si moyen danger
      } else {
        fill(255, 0, 0); // rouge si danger élevé
      }
      let size = circleSizes[j % circleSizes.length]; // sélectionner une taille aléatoire dans le tableau
      ellipse(x, y, size, size);
    }
  }
  
  // changer les tailles et les niveaux de danger aléatoirement
  if (frameCount  == 300) { // toutes les 60 frames
    for (let i = 0; i < circleSizes.length; i++) {
      circleSizes[i] = random(5, 25); // générer de nouvelles tailles aléatoires
      circleDangerLevels[i] = floor(random(6)); // générer de nouveaux niveaux de danger aléatoires (0-5)
    }
  }
  fullscreen();
}