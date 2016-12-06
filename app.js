var ctx;
var canvas;

var ratio;

var currentOffset;

var shapes = ['square', 'circle', 'triangle'];

var colourPalette = ['#FFFFFF','#F4FFFF','#F8FFFF','#FBFFFF', '#EFFFFF']

function init(){
    canvas = document.getElementById('app');
	ctx = canvas.getContext('2d');
    resizeCanvas();
    ctx.fillStyle='#BFEFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(canvas.height > canvas.width){
        ratio = canvas.height/1200;
    } else {
        ratio = canvas.width/1200;
    }
    document.getElementById('downloadLink').style.display = 'none';
    Math.seedrandom(Math.random());
    buildSnowflake()
}



function buildSnowflake(){
    var numShapes = Math.random()*5 + 20;
//    console.log(numShapes);
//    numShapes =;
    currentOffset = 0;
    for(var i = 0; i < numShapes; i++){
        setTimeout(drawShapeFromArray, i*33);
        if(i> numShapes-2){
           setTimeout(updateLink, i*33 + 200);
        }
    }
}

function updateLink(){
    var link = document.getElementById('downloadLink');
    link.href = canvas.toDataURL();
    link.style.display = 'inline';
}

function drawShapeFromArray(){
    shapes = shuffle(shapes);
    drawShapes(shapes[0]);
}

function drawShapes(shape){
    var xOffset = currentOffset;
    var yOffset = 0;
    var size = (Math.random()*40 + 20) * ratio;
    var triSwitch = Math.random();
    shuffle(colourPalette);
    var colourToUse = colourPalette[0];
    for(var i = 0; i < 6; i++){
        if(shape == 'square'){ 
            drawRotatedRect(-size/2 + xOffset,-size/2 + yOffset,size,size,i*60, colourToUse);
        } else if(shape == 'circle'){
            drawCircle(xOffset, yOffset, size/5, i*60, colourToUse);
        } else if(shape == 'triangle'){
            drawRotatedTri(xOffset, yOffset, size, i*60, colourToUse, triSwitch);
        }
    }
    currentOffset+= (Math.random()*5+10) * ratio
}

function drawRotatedRect(x,y,width,height,degrees, colour){

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

    ctx.fillStyle = colour;
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();

}

function drawRotatedTri(x, y, size, degrees, colour, switched){
    ctx.save();
    ctx.beginPath();
    ctx.translate( canvas.width/2, canvas.height/2 );
    // rotate the rect
    ctx.rotate(degrees*Math.PI/180);
    
    
    if(switched > 0.5){
        ctx.moveTo(x-0.5*size,y);
        ctx.lineTo(x+0.5*size,y+0.5*size);
        ctx.lineTo(x+0.5*size,y-0.5*size);
    } else {
        ctx.moveTo(x+0.5*size,y);
        ctx.lineTo(x-0.5*size,y+0.5*size);
        ctx.lineTo(x-0.5*size,y-0.5*size);
    }
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
}

function drawCircle(x,y, radius, degrees, colour){
    ctx.save();
    
    ctx.beginPath();
    ctx.translate( canvas.width/2, canvas.height/2 );
    ctx.rotate(degrees*Math.PI/180);

    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
}

function resizeCanvas(e) {
	canvas.width = document.body.clientWidth*2;
	canvas.height = document.body.clientHeight*2;
    canvas.style.width = document.body.clientWidth;
    canvas.style.height = document.body.clientHeight;
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