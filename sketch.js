  
// Variáveis para as barras e a bola
let leftBar, rightBar;
let ball;

// Variáveis para o placar
let leftScore = 0;
let rightScore = 0;

// Variáveis para o controle do jogo
let gameStarted = false;

function setup() {
  createCanvas(800, 400);
  
  // Inicializa as barras e a bola
  leftBar = new Bar(20, height / 2 - 60);
  rightBar = new Bar(width - 40, height / 2 - 60);
  ball = new Ball(width / 2, height / 2);
  
  // Define o texto do placar
  textSize(50);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  
  // Desenha o placar
  fill(255);
  text(leftScore + " | " + rightScore, width / 2, 50);
  
  // Verifica se o jogo começou
  if (!gameStarted) {
    fill(255);
    textSize(30);
    text("Pressione ESPAÇO para iniciar", width / 2, height / 2);
  } else {
    // Atualiza e desenha as barras
    leftBar.update();
    rightBar.update();
    leftBar.show();
    rightBar.show();
    
    // Atualiza e desenha a bola
    ball.update();
    ball.show();
    
    // Verifica colisões entre a bola e as barras
    if (ball.hits(leftBar) || ball.hits(rightBar)) {
      ball.bounce();
    }
    
    // Verifica se a bola saiu da tela (ponto marcado)
    if (ball.outOfBounds()) {
      if (ball.xSpeed < 0) {
        rightScore++;
      } else {
        leftScore++;
      }
      ball.reset();
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rightBar.move(-10);
  } else if (keyCode === DOWN_ARROW) {
    rightBar.move(10);
  } else if (keyCode === 87) { // tecla 'w'
    leftBar.move(-10);
  } else if (keyCode === 83) { // tecla 's'
    leftBar.move(10);
  } else if (keyCode === 32) { // tecla espaço para iniciar o jogo
    gameStarted = true;
  }
}

function keyReleased() {
  if ((keyCode === UP_ARROW) || (keyCode === DOWN_ARROW)) {
    rightBar.move(0);
  } else if ((keyCode === 87) || (keyCode === 83)) {
    leftBar.move(0);
  }
}

// Classe Bar representa as barras dos jogadores
class Bar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 120;
    this.speed = 10;
  }
  
  update() {
    this.y = constrain(this.y, 0, height - this.height);
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  move(step) {
    this.y += step;
  }
}

// Classe Ball representa a bola do jogo
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random([-5, 5]);
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Verifica colisão com as paredes superior e inferior
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.ySpeed *= -1;
    }
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
  
  bounce() {
    this.xSpeed *= -1;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random([-5, 5]);
    gameStarted = false;
  }
  
  outOfBounds() {
    return this.x - this.size / 2 < 0 || this.x + this.size / 2 > width;
  }
  
  hits(bar) {
    return this.x - this.size / 2 < bar.x + bar.width &&
           this.x + this.size / 2 > bar.x &&
           this.y - this.size / 2 < bar.y + bar.height &&
           this.y + this.size / 2 > bar.y;
  }
}
