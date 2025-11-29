let tStart;


let starPhase1, starPhase2, starPhase3, starPhase4, starPhase5;
let starPhase6, starPhase7, starPhase8, starPhase9, starPhase10;
let starPhase11, starPhase12, starPhase13, starPhase14, starPhase15;
let starPhase16, starPhase17;


let skyHueOffset;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  tStart = millis();

  starPhase1  = random(360);
  starPhase2  = random(360);
  starPhase3  = random(360);
  starPhase4  = random(360);
  starPhase5  = random(360);
  starPhase6  = random(360);
  starPhase7  = random(360);
  starPhase8  = random(360);
  starPhase9  = random(360);
  starPhase10 = random(360);
  starPhase11 = random(360);
  starPhase12 = random(360);
  starPhase13 = random(360);
  starPhase14 = random(360);
  starPhase15 = random(360);
  starPhase16 = random(360);
  starPhase17 = random(360);

  skyHueOffset = random(-20, 20);
}

function draw() {
  let t = (millis() - tStart) / 1000.0; 

  background(0);

  drawFilmHoles(t);

  drawSkyBackground(t);

  drawStars();

  drawMoon(t);

  drawClouds(t);

  drawMeteors(t);

  drawMeteorLines();
}


function drawFilmHoles(t) {
  noStroke();
  // 흰색 ~ 회색 사이로 깜빡
  let pulse = (sin(t * 60) + 1) / 2; // 0~1
  let c = 220 + 35 * pulse;
  fill(c);

  // 상단 구멍들
  for (let i = 0; i < 11; i++) {
    let x = 37.5 + i * 50;
    rect(x, 15, 25, 20);
  }

  // 하단 구멍들
  for (let i = 0; i < 11; i++) {
    let x = 37.5 + i * 50;
    rect(x, 365, 25, 20);
  }
}


function drawSkyBackground(t) {
  colorMode(HSB, 360, 100, 100, 100);

  let baseHueA = 230 + skyHueOffset;
  let baseHueB = 260 + skyHueOffset;

  let skyA = color(baseHueA, 80, 30); 
  let skyB = color(baseHueB, 60, 50); 

  let amt = (sin(t * 5) + 1) / 2;
  let skyColor = lerpColor(skyA, skyB, amt);

  noStroke();
  fill(skyColor);
  rect(75, 50, 450, 300); 

  let layer1 = color(hue(skyColor), 80, 80, 60);
  fill(layer1);
  rect(75, 50, 450, 150);

  let layer2 = color((hue(skyColor) + 20) % 360, 70, 60, 50);
  fill(layer2);
  rect(75, 100, 450, 200);

  colorMode(RGB, 255, 255, 255, 255);
}

function drawStar(x, y, baseSize, twinkle, type, hueVal) {
 
  let size = baseSize * (0.6 + 1.2 * twinkle);

  let sat, bri;
  if (type === 'white') {
    sat = 20 + 40 * twinkle;
    bri = 75 + 25 * twinkle;
  } else if (type === 'big') {
    sat = 70 + 25 * twinkle;
    bri = 80 + 20 * twinkle;
  } else {
    sat = 60 + 30 * twinkle;
    bri = 65 + 30 * twinkle;
  }

  let alpha = 20 + 80 * twinkle; 

  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  fill(hueVal, sat, bri, alpha);
  ellipse(x, y, size, size);

  if (twinkle > 0.6) {
    let coreSize = size * 0.4;
    fill(hueVal, sat + 10, 100, alpha);
    ellipse(x, y, coreSize, coreSize);

    stroke(hueVal, sat, bri + 10, alpha);
    strokeWeight(1);
    noFill();
    ellipse(x, y, size * 1.3, size * 1.3);
  }

  colorMode(RGB, 255, 255, 255, 255);
}


function drawStars() {
  let f = frameCount;

  let tw1  = (sin(f * 10 + starPhase1 ) + 1) / 2;
  let tw2  = (sin(f * 10 + starPhase2 ) + 1) / 2;
  let tw3  = (sin(f * 10 + starPhase3 ) + 1) / 2;
  let tw4  = (sin(f * 10 + starPhase4 ) + 1) / 2;
  let tw5  = (sin(f * 10 + starPhase5 ) + 1) / 2;
  let tw6  = (sin(f * 10 + starPhase6 ) + 1) / 2;
  let tw7  = (sin(f * 10 + starPhase7 ) + 1) / 2;
  let tw8  = (sin(f * 10 + starPhase8 ) + 1) / 2;
  let tw9  = (sin(f * 10 + starPhase9 ) + 1) / 2;
  let tw10 = (sin(f * 10 + starPhase10) + 1) / 2;
  let tw11 = (sin(f * 10 + starPhase11) + 1) / 2;
  let tw12 = (sin(f * 10 + starPhase12) + 1) / 2;
  let tw13 = (sin(f * 10 + starPhase13) + 1) / 2;
  let tw14 = (sin(f * 10 + starPhase14) + 1) / 2;
  let tw15 = (sin(f * 10 + starPhase15) + 1) / 2;
  let tw16 = (sin(f * 10 + starPhase16) + 1) / 2;
  let tw17 = (sin(f * 10 + starPhase17) + 1) / 2;
  
  let h1  = 70 + 30 * sin(f * 5 + starPhase1 );
  let h2  = 70 + 30 * sin(f * 5 + starPhase2 );
  let h3  = 70 + 30 * sin(f * 5 + starPhase3 );
  let h4  = 70 + 30 * sin(f * 5 + starPhase4 );
  let h5  = 70 + 30 * sin(f * 5 + starPhase5 );
  let h6  = 70 + 30 * sin(f * 5 + starPhase6 );
  let h7  = 70 + 30 * sin(f * 5 + starPhase7 );
  let h8  = 70 + 30 * sin(f * 5 + starPhase8 );
  let h9  = 70 + 30 * sin(f * 5 + starPhase9 );
  let h10 = 70 + 30 * sin(f * 5 + starPhase10);

  let h11 = 240 + 40 * sin(f * 4 + starPhase11);
  let h12 = 240 + 40 * sin(f * 4 + starPhase12);
  let h13 = 240 + 40 * sin(f * 4 + starPhase13);
  let h14 = 240 + 40 * sin(f * 4 + starPhase14);
  let h15 = 240 + 40 * sin(f * 4 + starPhase15);

  let h16 = 55 + 35 * sin(f * 4.5 + starPhase16);
  let h17 = 55 + 35 * sin(f * 4.5 + starPhase17);

  drawStar(150, 80, 3, tw1,  'yellow', h1);
  drawStar(200, 90, 2, tw2,  'yellow', h2);
  drawStar(350, 70, 4, tw3,  'yellow', h3);
  drawStar(480, 85, 2, tw4,  'yellow', h4);
  drawStar(120,120, 3, tw5,  'yellow', h5);
  drawStar(300,110, 2, tw6,  'yellow', h6);
  drawStar(450,130, 3, tw7,  'yellow', h7);
  drawStar(180,140, 2, tw8,  'yellow', h8);
  drawStar(380,100, 3, tw9,  'yellow', h9);
  drawStar(500,160, 2, tw10, 'yellow', h10);

  drawStar(250, 75, 3, tw11, 'white', h11);
  drawStar(400, 95, 2, tw12, 'white', h12);
  drawStar(160,160, 2, tw13, 'white', h13);
  drawStar(320,140, 3, tw14, 'white', h14);
  drawStar(470,110, 2, tw15, 'white', h15);

  drawStar(280, 85, 6, tw16, 'big', h16);
  drawStar(420,120, 5, tw17, 'big', h17);
}

function drawMoon(t) {
  let baseX = 450;
  let baseY = 150;

  let offsetY = 5 * sin(t * 20);
  let offsetX = 2 * cos(t * 15);

  let baseSize = 40;
  let sizePulse = 4 * sin(t * 15 + 30);
  let r = baseSize + sizePulse;

  fill(220, 220, 180);
  ellipse(baseX + offsetX, baseY + offsetY, r, r);

  fill(180, 180, 140);
  ellipse(baseX - 5 + offsetX, baseY - 5 + offsetY, 6, 6);
  ellipse(baseX + 5 + offsetX, baseY + 5 + offsetY, 4, 4);
  ellipse(baseX - 2 + offsetX, baseY + 8 + offsetY, 3, 3);
}

function drawClouds(t) {
  noStroke();

  let o1 = 5 * sin(t * 10);
  fill(60, 60, 80, 150);
  ellipse(150 + o1, 280 + o1 * 0.2, 80, 30);
  ellipse(180 + o1, 275 + o1 * 0.2, 60, 25);

  let o2 = 7 * sin(t * 8 + 40);
  fill(80, 80, 100, 120);
  ellipse(450 + o2, 290 + o2 * 0.2, 90, 35);
  ellipse(420 + o2, 285 + o2 * 0.2, 70, 28);

  let o3 = 10 * sin(t * 6 + 80);
  fill(100, 100, 120, 100);
  ellipse(300 + o3, 320 + o3 * 0.2, 100, 40);
  ellipse(280 + o3, 315 + o3 * 0.2, 80, 32);
}

function drawMeteors(t) {
  let p1 = (t * 0.5) % 1.0;       // 유성 1
  let p2 = (t * 0.4 + 0.3) % 1.0; // 유성 2
  let p3 = (t * 0.7 + 0.6) % 1.0; // 유성 3

  noStroke();

  if (p1 > 0.0) {
    let a = map(p1, 0.0, 0.2, 0, 255, true);
    fill(255, 200, 200, a);
    ellipse(175, 155, 1, 2);
  }
  if (p1 > 0.15) {
    let a = map(p1, 0.15, 0.35, 0, 255, true);
    fill(255, 200, 200, a);
    ellipse(180, 160, 2, 3);
  }
  if (p1 > 0.3) {
    let a = map(p1, 0.3, 0.5, 0, 255, true);
    fill(255, 150, 150, a);
    ellipse(185, 165, 3, 4);
  }
  if (p1 > 0.45) {
    let a = map(p1, 0.45, 0.65, 0, 255, true);
    fill(255, 150, 150, a);
    ellipse(190, 170, 4, 6);
  }
  if (p1 > 0.6) {
    let a = map(p1, 0.6, 0.8, 0, 255, true);
    fill(255, 150, 150, a);
    ellipse(195, 175, 6, 8);
  }
  if (p1 > 0.75) {
    let a = map(p1, 0.75, 1.0, 0, 255, true);
    fill(255, 100, 100, a);
    ellipse(200, 180, 8, 12);
  }

  if (p2 > 0.0) {
    let a = map(p2, 0.0, 0.2, 0, 255, true);
    fill(200, 230, 255, a);
    ellipse(352, 172, 1, 2);
  }
  if (p2 > 0.15) {
    let a = map(p2, 0.15, 0.35, 0, 255, true);
    fill(200, 230, 255, a);
    ellipse(360, 180, 2, 3);
  }
  if (p2 > 0.3) {
    let a = map(p2, 0.3, 0.5, 0, 255, true);
    fill(150, 200, 255, a);
    ellipse(368, 188, 3, 4);
  }
  if (p2 > 0.45) {
    let a = map(p2, 0.45, 0.65, 0, 255, true);
    fill(150, 200, 255, a);
    ellipse(376, 196, 4, 6);
  }
  if (p2 > 0.6) {
    let a = map(p2, 0.6, 0.8, 0, 255, true);
    fill(150, 200, 255, a);
    ellipse(384, 204, 6, 9);
  }
  if (p2 > 0.7) {
    let a = map(p2, 0.7, 0.9, 0, 255, true);
    fill(150, 200, 255, a);
    ellipse(392, 212, 8, 12);
  }
  if (p2 > 0.8) {
    let a = map(p2, 0.8, 1.0, 0, 255, true);
    fill(100, 150, 255, a);
    ellipse(400, 220, 10, 15);
  }

  if (p3 > 0.0) {
    let a = map(p3, 0.0, 0.25, 0, 255, true);
    fill(255, 255, 150, a);
    ellipse(308, 148, 2, 3);
  }
  if (p3 > 0.2) {
    let a = map(p3, 0.2, 0.45, 0, 255, true);
    fill(255, 255, 150, a);
    ellipse(312, 152, 3, 4);
  }
  if (p3 > 0.4) {
    let a = map(p3, 0.4, 0.7, 0, 255, true);
    fill(255, 255, 150, a);
    ellipse(316, 156, 4, 6);
  }
  if (p3 > 0.65) {
    let a = map(p3, 0.65, 1.0, 0, 255, true);
    fill(255, 255, 100, a);
    ellipse(320, 160, 6, 8);
  }
}


function drawMeteorLines() {
  let tw1 = (sin(frameCount * 4 + 10) + 1) / 2;
  let tw2 = (sin(frameCount * 3 + 50) + 1) / 2;

  stroke(255, 200, 200, 100 + 80 * tw1);
  strokeWeight(2);
  line(250, 200, 245, 190);
  line(280, 220, 275, 210);
  line(350, 240, 345, 230);

  stroke(200, 200, 255, 80 + 70 * tw2);
  strokeWeight(1);
  line(180, 250, 176, 242);
  line(220, 260, 216, 252);
  line(410, 270, 406, 262);
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('film_meteor_animation', 10);
  }
}
