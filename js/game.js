var canvas = document.querySelector('.my-game');
var ctx = canvas.getContext('2d');


var points = 0;


// catching box

var box = {
  x: 200,
  y: 350,
  width: 90,
  height: 50,
  draw: function() {
      ctx.fillStyle = 'burlywood';
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var test = {
  x: 0,
  y: 440,
  width: 500,
  height: 50,
  draw: function() {
      ctx.fillStyle = 'burlywood';
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};


// puppies

var puppyBlack = new Image();
puppyBlack.src = './images/puppyImage.svg';

function Puppies (x, y, image, isLoaded, width, height) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
}

Puppies.prototype.draw = function () {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

var myPuppies = [
  //                      random x spawn     spawn y above
  new Puppies ((Math.floor(Math.random() * 460)), -10, puppyBlack, false, 40, 40),
];


// makePuppies function

function makePuppies(){
  myPuppies.forEach(function (onePuppy) {
    onePuppy.y += 2;
    onePuppy.draw();

    // collision detection
    if (box.x < myPuppies[0].x + myPuppies[0].width &&
        box.x + box.width > myPuppies[0].x &&
        box.y < myPuppies[0].y + myPuppies[0].height &&
        box.height + box.y > myPuppies[0].y) {
          points+=1;
          //removes puppy from page without compromising score
          onePuppy.y += NaN;
          console.log('Points: '+ points);
        }
    else if (test.x < myPuppies[0].x + myPuppies[0].width &&
          test.x + test.width > myPuppies[0].x &&
          test.y < myPuppies[0].y + myPuppies[0].height &&
          test.height + test.y > myPuppies[0].y) {
            console.log('you lost a puppy :\(');
            onePuppy.y += NaN;
            alert('you lose :\(');
          }
    });
}


// draw

function draw () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  makePuppies();

  box.draw(); //leave here so it is in front of puppies
  test.draw();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);


// function drawPuppies() {
//   if (score < 5) {
//     //draw
//   }
//   else if (score < 10) {
//     //draw
//   }
//
//   else if (score < 15) {
//     //draw
//   }
//   else if (score < 20) {
//     //draw
//   }
//   else {
//     //draw
//   }
// }


// controls

document.addEventListener("keydown", function() {
  switch (event.keyCode) {
        case 37: //left arrow
        case 67: //a
          box.x -= 10;
          break;
        case 39: //right arrow
        case 68: //d
          box.x += 10;
          break;
  }
});
