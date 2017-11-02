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
  this.x = x
  this.y = y
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
}

Puppies.prototype.draw = function () {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};


var myPuppies = [
              // random x spawn     spawn y above
  new Puppies ((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  // new Puppies ((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  // new Puppies ((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  // new Puppies ((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
];


function makePuppies() {

  for (var i=0; i < 1; i++ ) {
  myPuppies.push(new Puppies((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40));
  console.log(myPuppies);
  }

}


function drawPuppies(){
  myPuppies.forEach(function (onePuppy) {
    onePuppy.y += 0.3;
    onePuppy.draw();

    while (box.x < onePuppy.x + onePuppy.width &&
      box.x + box.width > onePuppy.x &&
      box.y < onePuppy.y + onePuppy.height &&
      box.height + box.y > onePuppy.y) {
        points+=1;
        //removes puppy from page without compromising score
        onePuppy.y += NaN;
        console.log('Points: '+ points);
      }
    if (test.x < onePuppy.x + onePuppy.width &&
      test.x + test.width > onePuppy.x &&
      test.y < onePuppy.y + onePuppy.height &&
      test.height + test.y > onePuppy.y) {
        onePuppy.y += NaN;
        console.log('you lost a puppy :\(');
        return 1;
        // alert('you lose :\(');
      }


      // change speed at y

      else if (points >= 25) {
        onePuppy.y += 12;
      }
      else if (points >= 20) {
        onePuppy.y += 9;
      }
      else if (points >= 15) {
        onePuppy.y += 6;
      }
      else if (points >= 10) {
        onePuppy.y += 3;
      }
      else if (points >= 5) {
          onePuppy.y += 1;
      }
      else {
      }
  });
}


var intervalRate = 5000;
if (points >= 25) {
  intervalRate = 500;
  }
else if (points >= 20) {
    intervalRate = 1000;
  }
else if (points >= 15) {
    intervalRate = 500;
  }
else if (points >= 10) {
    intervalRate = 1000;
  }
else if (points >= 5) {
    intervalRate = 4000;
  }
else {
  intervalRate = 5000;
}
setInterval(makePuppies, intervalRate);


// draw

function draw () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawPuppies();

  box.draw(); //leave here so it is in front of puppies
  test.draw();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);


// controls

document.addEventListener("keydown", function() {
  switch (event.keyCode) {
        case 37: //left arrow
        case 67: //a
          box.x -= 30;
          break;
        case 39: //right arrow
        case 68: //d
          box.x += 30;
          break;
  }
});
