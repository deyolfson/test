var sound;
var amp;
var freq;
var ftt;
var bass = 0;
var rings = [];
var r;
var level = 1;

function preload(){
    sound = loadSound("audio/music.mp3");
}

function setup(){
    createCanvas( windowWidth, windowHeight );
    
    sound.play();
    amp = new p5.Amplitude( .5 );
    amp.setInput(sound);

    
    fft = new p5.FFT( .5, 16)

    r = random();
   
   
  }



function draw() {

    freq = fft.analyze();
    bass = fft.getEnergy(16);
    level = amp.getLevel();

    background( 255 );


    if(bass > 254 && rings.length < 15){
      rings.push( new Ring());
    };

    for( var i = 0; i < rings.length; i++ ){
    //rings[i].update();
    rings[i].draw();
    rings[i].update();
  }
   print(bass);
   print(level);
   print(rings.length);
   }

  function Ring( ){
     
      this.pa = createVector( 0, height/2  );
      this.pb = createVector( width, height/2 );
      this.pc = createVector( width/2, 0 );
      this.pd = createVector( width/2, height );


      this.va = createVector( 25, 0);
      this.vb =createVector( 25, 0 );
      this.vc =createVector(0,25);
      this.vd =createVector(0,25);

      this.radius = 50;
      this.r = random(1, 30);
      //if (true) {};
    }

Ring.prototype.update = function(){
  this.checkEdges();
   this.pa.add( this.va );
   this.pb.sub( this.vb );
   this.pc.add( this.vc );
   this.pd.sub( this.vd );

  this.radius = (this.r * level * 200);
}

Ring.prototype.draw = function(){
  noFill();
  stroke(153);
  strokeWeight(10);  
  ellipse(this.pa.x, this.pa.y, this.radius, this.radius); 
  ellipse(this.pb.x, this.pb.y, this.radius, this.radius);
  ellipse(this.pc.x, this.pc.y, this.radius, this.radius); 
  ellipse(this.pd.x, this.pd.y, this.radius, this.radius);  
}

Ring.prototype.checkEdges = function(){
  if( this.pa.x > width || this.pa.y > height){
    rings.shift(5);
  }
}











