let charX = 300;
let charY = 200;
let jumpOffset = 0;
let isJumping = false;
let jumpSpeed = 0;

let zipperY = 290;
let zipperOpen = false;

let waveAngle = 0;
let isWaving = false;

// 바람 효과 변수들
let windParticles = [];
let windForce = 0;
let bgColor;

// 밤하늘 효과 변수들
let isNight = false;
let nightAngle = 0;
let stars = [];
let shootingStars = [];
let moonY = -100;

let eyeOffsetX = 0;
let eyeOffsetY = 0;

let mouthHappy = false;

function setup() {
  createCanvas(600, 400);
  bgColor = color(245, 245, 250); // 기본 배경색
}

function draw() {
  background(bgColor);
  
  // 밤하늘 효과
  if (isNight) {
    nightAngle += 0.02;
    
    // 배경을 밤하늘 색으로 전환
    bgColor = lerpColor(bgColor, color(20, 24, 82), 0.1);
    
    // 달 내려오기
    if (moonY < 80) {
      moonY += 2;
    }
    
    // 별 생성
    if (stars.length < 50 && frameCount % 5 === 0) {
      stars.push({
        x: random(width),
        y: random(height * 0.7),
        size: random(2, 4),
        twinkleSpeed: random(0.02, 0.05),
        twinkleOffset: random(TWO_PI)
      });
    }
    
    // 별똥별 생성
    if (frameCount % 60 === 0 && shootingStars.length < 3) {
      shootingStars.push({
        x: random(width * 0.5, width),
        y: random(50, 150),
        speed: random(5, 8),
        length: random(30, 60),
        alpha: 255
      });
    }
  } else {
    // 낮으로 돌아가기
    bgColor = lerpColor(bgColor, color(245, 245, 250), 0.05);
    if (moonY > -100) {
      moonY -= 2;
    }
    // 밤 효과 종료시 별들 제거
    if (stars.length > 0) {
      stars = [];
      shootingStars = [];
    }
  }
  
  // 달 그리기
  if (moonY > -50) {
    push();
    noStroke();
    fill(255, 255, 200, 230);
    circle(500, moonY, 60);
    // 달 크레이터
    fill(240, 240, 180, 150);
    circle(490, moonY - 10, 12);
    circle(505, moonY + 5, 8);
    circle(495, moonY + 10, 6);
    pop();
  }
  
  // 별 그리기
  for (let s of stars) {
    let brightness = abs(sin(nightAngle * s.twinkleSpeed + s.twinkleOffset)) * 200 + 55;
    push();
    noStroke();
    fill(255, 255, 255, brightness);
    circle(s.x, s.y, s.size);
    pop();
  }
  
  // 별똥별 그리기
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let ss = shootingStars[i];
    ss.x -= ss.speed;
    ss.y += ss.speed * 0.5;
    ss.alpha -= 5;
    
    push();
    stroke(255, 255, 255, ss.alpha);
    strokeWeight(2);
    line(ss.x, ss.y, ss.x + ss.length, ss.y - ss.length * 0.5);
    
    // 별똥별 꼬리 그라데이션
    for (let j = 0; j < 5; j++) {
      let tailAlpha = ss.alpha * (1 - j * 0.15);
      stroke(255, 255, 200, tailAlpha);
      strokeWeight(2 - j * 0.3);
      line(ss.x + j * 5, ss.y - j * 2.5, 
           ss.x + ss.length + j * 5, ss.y - ss.length * 0.5 - j * 2.5);
    }
    pop();
    
    if (ss.alpha <= 0 || ss.x < -100) {
      shootingStars.splice(i, 1);
    }
  }
  
  // 점프 처리
  if (isJumping) {
    jumpSpeed += 0.8;
    jumpOffset += jumpSpeed;
    if (jumpOffset >= 0) {
      jumpOffset = 0;
      jumpSpeed = 0;
      isJumping = false;
    }
  }
  
  // 지퍼 애니메이션
  if (zipperOpen && zipperY < 400) {
    zipperY += 5;
  } else if (!zipperOpen && zipperY > 290) {
    zipperY -= 5;
  }
  
  // 바람 효과 애니메이션
  if (isWaving) {
    waveAngle += 0.15;
    windForce = sin(waveAngle) * 30 + 30; // 0~60 사이 값
    
    // 배경색을 푸른 하늘색으로 전환
    bgColor = lerpColor(bgColor, color(135, 206, 250), 0.1);
    
    // 바람 파티클 생성
    if (frameCount % 3 === 0) {
      windParticles.push({
        x: 0,
        y: random(height),
        speed: random(3, 8),
        size: random(2, 5),
        alpha: 255
      });
    }
    
    if (waveAngle > TWO_PI) {
      waveAngle = 0;
      isWaving = false;
      windForce = 0;
      clouds = []; // 효과 끝나면 구름 바로 제거
    }
  } else {
    // 바람이 멈추면 원래 배경색으로 천천히 돌아가기
    bgColor = lerpColor(bgColor, color(245, 245, 250), 0.05);
  }
  
  // 바람 파티클 업데이트 및 그리기
  for (let i = windParticles.length - 1; i >= 0; i--) {
    let p = windParticles[i];
    p.x += p.speed;
    p.alpha -= 3;
    
    push();
    noStroke();
    fill(200, 220, 240, p.alpha);
    ellipse(p.x, p.y, p.size, p.size * 2);
    pop();
    
    if (p.x > width || p.alpha <= 0) {
      windParticles.splice(i, 1);
    }
  }
  
  // 마우스 따라 눈동자 움직이기
  let dx = mouseX - charX;
  let dy = mouseY - (charY + jumpOffset - 20);
  let distance = dist(mouseX, mouseY, charX, charY + jumpOffset - 20);
  let maxDist = 4;
  
  if (distance > 0) {
    eyeOffsetX = constrain((dx / distance) * maxDist, -maxDist, maxDist);
    eyeOffsetY = constrain((dy / distance) * maxDist, -maxDist, maxDist);
  }
  
  push();
  translate(0, jumpOffset);
  
  // 후드 모자
  noStroke();
  fill(15, 11, 21);
  ellipse(charX, charY + 90, 180, 120);
  
  // 후드 티
  fill(15, 11, 21);
  ellipse(charX, charY + 270, 370, 360);
  
  // 지퍼
  stroke(80, 80, 85);
  strokeWeight(8);
  line(charX, zipperY, charX, charY + 280);
  
  // 지퍼 손잡이
  fill(90, 90, 95);
  noStroke();
  rect(charX - 5, zipperY, 10, 20, 2);
  fill(60, 60, 65);
  circle(charX, zipperY + 15, 6);
  
  // 지퍼 이빨
  stroke(70, 70, 75);
  strokeWeight(3);
  for (let i = zipperY + 20; i < charY + 280; i += 10) {
    line(charX - 5, i, charX - 3, i + 5);
    line(charX + 5, i, charX + 3, i + 5);
  }
  
  // 후드 끈 - 왼쪽 (바람에 휘날림 효과)
  let leftWave = isWaving ? windForce : 0;
  stroke(200, 200, 205);
  strokeWeight(4);
  noFill();
  line(charX - 35, charY + 100, charX - 45 + leftWave, charY + 120);
  line(charX - 45 + leftWave, charY + 120, charX - 52 + leftWave * 1.2, charY + 145);
  line(charX - 52 + leftWave * 1.2, charY + 145, charX - 55 + leftWave * 1.5, charY + 160);
  
  // 후드 끈 - 오른쪽 (바람에 휘날림 효과)
  let rightWave = isWaving ? windForce : 0;
  line(charX + 35, charY + 100, charX + 45 + rightWave, charY + 120);
  line(charX + 45 + rightWave, charY + 120, charX + 52 + rightWave * 1.2, charY + 145);
  line(charX + 52 + rightWave * 1.2, charY + 145, charX + 55 + rightWave * 1.5, charY + 160);
  
  // 끈 끝부분
  fill(200, 200, 205);
  noStroke();
  circle(charX - 55 + leftWave * 1.5, charY + 160, 6);
  circle(charX + 55 + rightWave * 1.5, charY + 160, 6);
  
  // 주머니 - 왼쪽
  noFill();
  stroke(25, 21, 31);
  strokeWeight(2);
  arc(charX - 70, charY + 230, 80, 60, 0, PI);
  
  // 주머니 - 오른쪽
  arc(charX + 70, charY + 230, 80, 60, 0, PI);
  
  // 목 부분
  fill(255, 230, 210);
  noStroke();
  rect(charX - 30, charY + 50, 60, 50);
  
  // 머리
  fill(255, 235, 215);
  noStroke();
  ellipse(charX, charY - 30, 160, 180);
  
  fill(255, 230, 210);
  noStroke();
  // 왼쪽 귀
  arc(charX - 77, charY - 30, 30, 45, HALF_PI, PI + HALF_PI, OPEN);
  // 오른쪽 귀
  arc(charX + 77, charY - 30, 30, 45, -HALF_PI, HALF_PI, OPEN);
  
  // 귀 안쪽 디테일
  fill(240, 210, 190);
  arc(charX - 75, charY - 28, 15, 22, HALF_PI, PI + HALF_PI, OPEN);
  arc(charX + 75, charY - 28, 15, 22, -HALF_PI, HALF_PI, OPEN);
  
  // 안경
  noFill();
  stroke(30, 30, 30);
  strokeWeight(4);
  // 왼쪽 렌즈
  circle(charX - 30, charY - 20, 40);
  // 오른쪽 렌즈
  circle(charX + 30, charY - 20, 40);
  // 브릿지
  line(charX - 10, charY - 20, charX + 10, charY - 20);
  // 안경다리
  line(charX - 50, charY - 20, charX - 80, charY - 42);
  line(charX + 50, charY - 20, charX + 80, charY - 42);
  
  // 머리카락 - 뒷부분 전체
  fill(40, 30, 20);
  noStroke();
  arc(charX, charY - 55, 160, 150, PI, TWO_PI);
  
  // 가르마 - 왼쪽 머리
  fill(50, 35, 25);
  arc(charX - 18, charY - 40, 130, 170, PI, PI + HALF_PI);
  
  // 가르마 - 오른쪽 머리
  fill(45, 32, 22);
  arc(charX, charY - 40, 170, 170, PI + HALF_PI, TWO_PI);
  
  // 목 부분
  fill(255, 235, 215);
  rect(charX - 18, charY - 85, 20, 45);
  
  // 눈
  fill(255);
  noStroke();
  circle(charX - 30, charY - 20, 20);
  circle(charX + 30, charY - 20, 20);
  
  // 눈동자 (마우스 따라가기)
  fill(30, 30, 30);
  circle(charX - 30 + eyeOffsetX, charY - 20 + eyeOffsetY, 12);
  circle(charX + 30 + eyeOffsetX, charY - 20 + eyeOffsetY, 12);
  
  // 눈 하이라이트
  fill(255);
  circle(charX - 27 + eyeOffsetX, charY - 23 + eyeOffsetY, 5);
  circle(charX + 33 + eyeOffsetX, charY - 23 + eyeOffsetY, 5);
  
  // 코
  stroke(200, 180, 160);
  strokeWeight(2);
  line(charX, charY, charX + 1, charY + 5);
  
  // 입 (클릭하면 웃는 표정)
  noFill();
  stroke(200, 180, 160);
  strokeWeight(2);
  if (mouthHappy) {
    arc(charX, charY + 15, 40, 30, 0, PI);
  } else {
    arc(charX, charY + 20, 30, 20, 0, PI);
  }
  
  pop();
  
  // 조작 안내
  fill(isNight ? 255 : 0);
  textSize(12);
  text("방향키: 이동 | 스페이스: 점프 | Z: 지퍼 | W: 바람 | N: 밤하늘 | 클릭: 웃기", 10, 20);
}

function keyPressed() {
  // 화살표 키로 이동
  if (keyCode === LEFT_ARROW) {
    charX -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    charX += 20;
  } else if (keyCode === UP_ARROW) {
    charY -= 20;
  } else if (keyCode === DOWN_ARROW) {
    charY += 20;
  }
  
  // 스페이스바로 점프
  if (key === ' ' && !isJumping) {
    isJumping = true;
    jumpSpeed = -15;
  }
  
  // Z 키로 지퍼 열고 닫기
  if (key === 'z' || key === 'Z') {
    zipperOpen = !zipperOpen;
  }
  
  // W 키로 손 흔들기
  if (key === 'w' || key === 'W') {
    isWaving = true;
    waveAngle = 0;
  }
  
  // N 키로 밤하늘 효과
  if (key === 'n' || key === 'N') {
    isNight = !isNight;
  }
}

function mousePressed() {
  // 마우스 클릭하면 웃는 표정
  mouthHappy = !mouthHappy;
}