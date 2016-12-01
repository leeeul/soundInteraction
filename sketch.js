var sound;

var soundP;
var gravityP;

var soundSlide;
var gravitySlide;

var ball;

var been;

var time = 0;

function Ball() {
  this.picked = false;

  this.x = width / 2;
  this.y = height / 2;

  this.yAcc = 0;
  this.yV = 0;

  this.xAcc = 0;
  this.xV = 0;

  this.r = 40;

  this.show = function() {
    // ellipse(this.x, this.y, this.r * 2, this.r * 2);
    push();
    translate(this.x, this.y);
    rotate(time);
    tint(map(this.y, this.r, height - this.r, 255, 0), map(this.y, this.r, height - this.r, 0, 255), 150);
    image(been, 0, 0, this.r * 2, this.r * 2);
    pop();
    if (!this.picked) {
      if (gravitySlide.value() < 0) {
        time = time - this.xV / 100;
      } else {
        time = time + this.xV / 100;
      }
    }
  };

  this.move = function() {
    this.yAcc = gravitySlide.value();
    this.yV += this.yAcc;
    this.y = constrain(this.y + this.yV, this.r, height - this.r);

    this.xV += this.xAcc;
    this.x = constrain(this.x + this.xV, this.r, width - this.r);
  };

  this.bound = function() {
    if (gravitySlide.value() >= 0) {
      if (this.y >= height - this.r) {
        this.yV *= -0.9;
        this.xV *= 0.7;
      }
      if (this.y <= this.r) {
        this.yV *= -0.9;
      }
    } else {
      if (this.y >= height - this.r) {
        this.yV *= -0.9;
      }
      if (this.y <= this.r) {
        this.yV *= -0.9;
        this.xV *= 0.7;
      }
    }


    if (this.x >= width - this.r) {
      this.xV *= -0.9;
    }
    if (this.x <= this.r) {
      this.xV *= -0.9;
    }
  };
}

function preload() {
  been = loadImage('asset/beenzino.png');
  sound = loadSound('asset/zino.mp3');

}

function setup() {

  createCanvas(640, 480);

  sound.loop();

  soundP = createP('sound : ');
  soundSlide = createSlider(0, 2, 0.5, 0.1);
  soundSlide.parent(soundP);

  gravityP = createP('gravity : ');
  gravitySlide = createSlider(-0.6, 0.6, 0.3, 0.1);
  gravitySlide.parent(gravityP);

  ball = new Ball();
  imageMode(CENTER);
}



function draw() {
  background(255);

  noFill();
  stroke(0);
  strokeWeight(3);
  rect(0, 0, width - 1, height - 1);


  noStroke();
  fill(0);
  if (!ball.picked) {
    ball.move();
    ball.bound();
  }

  ball.show();

  sound.setVolume(soundSlide.value());
  sound.rate(constrain(map(ball.y, 0, height, 2, 0.1), 0.1, 2));
  sound.pan(constrain(map(ball.x, 0, width, -2, 2), -1, 1));
}

function mousePressed() {
  if (dist(mouseX, mouseY, ball.x, ball.y) < ball.r) {
    ball.picked = true;
    ball.xV=0;
    ball.yV=0;
  }
  // if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
  //   sound.rate(constrain(map(ball.y, 0, height, 2, 0.1), 0.1, 2));
  //   sound.pan(constrain(map(ball.x, 0, width, -2, 2), -1, 1));
  // }
}

function mouseReleased() {
  ball.picked = false;
}

function mouseDragged() {
  if (ball.picked) {
    ball.x = constrain(mouseX, ball.r, width - ball.r);
    ball.y = constrain(mouseY, ball.r, height - ball.r);
  }
  // if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
  //   sound.rate(constrain(map(ball.y, 0, height, 2, 0.1), 0.1, 2));
  //   sound.pan(constrain(map(ball.x, 0, width, -2, 2), -1, 1));
  // }
}

function keyPressed() {
  if (key === ' ')
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  if (keyCode == UP_ARROW) {
    ball.yV = -20;
  } else if (keyCode == DOWN_ARROW) {
    ball.yV = 20;
  } else if (keyCode == LEFT_ARROW) {
    ball.xV = -10;
  } else if (keyCode == RIGHT_ARROW) {
    ball.xV = 10;
  }

}
