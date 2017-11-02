var canvas = document.querySelector('.my-game');
var ctx = canvas.getContext('2d');


var points = 0;


// ths is the box used to catch the puppies

var catchBox = {
  x: 200,
  y: 350,
  width: 90,
  height: 50,
  draw: function() {
      ctx.fillStyle = 'burlywood';
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};


// this is a box that is beneath the visible canvas used for the losing mechanism

var loseBox = {
  x: 0,
  y: 440,
  width: 500,
  height: 50,
  draw: function() {
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
                             // random x spawn                                    random spawn y above
  new Puppies ((Math.floor(Math.random() * canvas.width)) - 40, (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  new Puppies ((Math.floor(Math.random() * canvas.width)) - 40, (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  new Puppies ((Math.floor(Math.random() * canvas.width)) - 40, (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
  new Puppies ((Math.floor(Math.random() * canvas.width)) - 40, (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40),
];


function makePuppies() {
  for (var i=0; i < 1; i++ ) {
  myPuppies.push(new Puppies((Math.floor(Math.random() * canvas.width)) - 40, (Math.floor(Math.random() * 300)) - 310, puppyBlack, false, 40, 40));
  console.log(myPuppies);
  }
}


function drawPuppies(){
  myPuppies.forEach(function (onePuppy) {
    onePuppy.y += 0.3;
    onePuppy.draw();

    // collision detection for catching box
    while (catchBox.x < onePuppy.x + onePuppy.width &&
      catchBox.x + catchBox.width > onePuppy.x &&
      catchBox.y < onePuppy.y + onePuppy.height &&
      catchBox.height + catchBox.y > onePuppy.y) {
        points+=1;
        //removes puppy from canvas without compromising score
        onePuppy.y += NaN;
        console.log('Points: '+ points);
      }

    // collision detection for losing box
    while (loseBox.x < onePuppy.x + onePuppy.width &&
      loseBox.x + loseBox.width > onePuppy.x &&
      loseBox.y < onePuppy.y + onePuppy.height &&
      loseBox.height + loseBox.y > onePuppy.y) {
        //removes puppy from canvas
        onePuppy.y += NaN;
        console.log('you lost a puppy :\(');
      }

    // change speed at certain points
    if (points >= 25) {
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
  });
}


setInterval(makePuppies, 3000);


// setInterval(makePuppies, 1000);
// clearInterval(makeMorePuppies);
// var intervalRate = 5000;
// function updateRate() {
//   if (points >= 25) {
//     intervalRate = 500;
//     }
//   // else if (points >= 20) {
//   //     intervalRate = 1000;
//   //   }
//   // else if (points >= 15) {
//   //     intervalRate = 500;
//   //   }
//   // else if (points >= 10) {
//   //     intervalRate = 1000;
//   //   }
//   // else if (points >= 5) {
//   //     intervalRate = 4000;
//   //   }
//   else if (points >= 0) {
//     intervalRate = 50000;
//   }
//   // return;
// }


// draw!

function draw () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPuppies();

  catchBox.draw(); //leave here so it is in front of puppies

    // checks catchBox collision with walls
    if (catchBox.x <= 0) {
        catchBox.x = 0;
        console.log('you\'re hitting the wall, dummy');
    }
    if (catchBox.x >= 430) {
        catchBox.x = 410;
        console.log('you\'re hitting the wall, dummy');
    }

  loseBox.draw();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);


// controls

document.addEventListener("keydown", function() {
  switch (event.keyCode) {
        case 37: //left arrow
        case 67: //a
          catchBox.x -= 30;
          break;
        case 39: //right arrow
        case 68: //d
          catchBox.x += 30;
          break;
  }
});
