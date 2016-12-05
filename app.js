var ctx;
var canvas;

var shapes = ['square', 'circle', 'triangle'];

function init(){
    canvas = document.getElementById('app');
	ctx = canvas.getContext('2d');
    resizeCanvas();
    buildSnowflake(Math.random());
}

function buildSnowflake(seed){
    Math.seedrandom(seed);
    var numShapes = Math.random()*20 + 2;
    console.log(numShapes);
    
    for(var i = 0; i < numShapes; i++){
        shapes = shuffle(shapes);
        drawShapes(shapes[0])
    }
}

function drawShapes(shape){
    var xOffset = Math.random()*300;
    var yOffset = 0;
    var size = Math.random()*100 + 20;
    for(var i = 0; i < 6; i++){
        if(shape == 'square'){ 
            drawRotatedRect(-size/2 + xOffset,-size/2 + yOffset,size,size,i*60);
        } else if(shape == 'circle'){
            drawCircle(xOffset, yOffset, size/5, i*60);
        } else if(shape == 'triangle'){
            drawRotatedTri(xOffset, yOffset, size, i*60);
        }
    }
}

function drawRotatedRect(x,y,width,height,degrees){

    // first save the untranslated/unrotated context
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate( canvas.width/2, canvas.height/2 );
    // rotate the rect
    ctx.rotate(degrees*Math.PI/180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(x, y, width,height);

    ctx.fillStyle = "cornflowerblue";
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();

}

function drawRotatedTri(x, y, size, degrees){
    ctx.save();
    ctx.beginPath();
    ctx.translate( canvas.width/2, canvas.height/2 );
    // rotate the rect
    ctx.rotate(degrees*Math.PI/180);
    
    ctx.moveTo(x-0.5*size,y);
    ctx.lineTo(x+0.5*size,y+0.5*size);
    ctx.lineTo(x+0.5*size,y-0.5*size);
    ctx.fillStyle = "cornflowerblue";
    ctx.fill();
    ctx.restore();
}

function drawCircle(x,y, radius, degrees){
    ctx.save();
    
    ctx.beginPath();
    ctx.translate( canvas.width/2, canvas.height/2 );
    ctx.rotate(degrees*Math.PI/180);

    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "cornflowerblue";
    ctx.fill();
    ctx.restore();
}

function resizeCanvas(e) {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}