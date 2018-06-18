var stage;
var queue;
var plane,background_1,background_2,tree,street_lamp,slide_1,slide_2;
var upKeyDown,downKeyDown = false;
const KEY_UP = 38;
const KEY_DOWN = 40;


function init() {
    setQueue();
  
}

function setQueue() {
    queue = new createjs.LoadQueue();
   // queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", loadComplete);
    queue.loadManifest([
        {id:"background", src:"images/background.png"},
        {id:"plane", src:"images/plane.png"},
        {id:"bullet_s",src:"images/paper_bullet_single.png"},
        {id:"tree",src:"images/tree.png"},
        {id:"street_lamp",src:"images/street_lamp.png"},
        {id:"slide",src:"images/slide.png"},
        {id:"plane_s",src:"images/plane_s.png"}
    ]);
}

function loadComplete() {
    setupStage();
    setupBackground();
    setupPlane();
    window.onkeydown= movePlane;
    window.onkeyup=keyUP;
    window.setInterval(moveDown,20);
}
function setupStage() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
}
function setupBackground(){
    var img= queue.getResult("background");
    var img1= queue.getResult("tree");
    var img2= queue.getResult("street_lamp");
    var img3=queue.getResult("slide");
    var img4=queue.getResult("plane_s");
    var i;

    var background = new createjs.Bitmap(img);
  
    background_1 = new createjs.Bitmap(img);
    background_2 = new createjs.Bitmap(img);
    tree=new createjs.Bitmap(img1);
    street_lamp=new createjs.Bitmap(img2);
    slide_1 = new createjs.Bitmap(img3);
    slide_2 = new createjs.Bitmap(img3);



    background_1.x=0;
    background_2.x=1000;
    tree.x=300;
    tree.y=200;
    slide_1.x=400;
    slide_1.y=300;
    slide_2.x=400;
    slide_2.y=300;
    street_lamp.x=100;
    street_lamp.y=200;
    stage.addChild(background);
    stage.addChild(background_1);
    stage.addChild(background_2);
    for(i=0;i<3;i++){
     var plane_s= new createjs.Bitmap(img4);
     plane_s.x=i*50+10;
     plane_s.y=10;
     stage.addChild(plane_s);   
    }

    stage.addChild(street_lamp);
    stage.addChild(tree);
    stage.addChild(slide_1);
    stage.addChild(slide_2);
    
    
    
    backgroundRoll();
    backgroundRollObject();
    window.setInterval(backgroundRoll,10000);
    window.setInterval(backgroundRollObject,20000);
}

function setupPlane(){
    var img = queue.getResult("plane");
    plane = new createjs.Bitmap(img);
    plane.x=50;
    plane.y=0;
    stage.addChild(plane);

}
function movePlane(e) {
    e = !e ? window.event : e;;
    switch (e.keyCode) {
        case KEY_UP:
            upKeyDown = true;
            break;
    }
}
function keyUP(e) {
    e = !e ? window.event : e;
    switch (e.keyCode) {
        case KEY_UP:      
            upKeyDown = false;
            break;
        case KEY_DOWN:      
            fire();
            break;
    }
}

function moveUp() {
    var nextY = plane.y;
    if (upKeyDown) {
        nextY = plane.y - 10;
        if(nextY < 0){
            nextY = 0;
        }
    }
    plane.nextY = nextY;
}
function moveDown(){
    if(plane.y > stage.canvas.height - 40){
        plane.y = stage.canvas.height - 35;
    }
    else{
    plane.y = plane.y+5;
    }
    stage.update();
}
function fire(){
    var img= queue.getResult("bullet_s");
    var bullet_s = new createjs.Bitmap(img);
    bullet_s.x=150;
    bullet_s.y=plane.y;
    stage.addChild(bullet_s);
    window.setInterval(function(){
        bullet_s.x = bullet_s.x+10; 
        if(bullet_s.x>850){
            stage.removeChild(bullet_s);
        }
        stage.update();
    },20); 
}
function backgroundRoll()
{
   
    background_1.x=0;
    background_2.x=1000;
    slide_1.x=0;
    slide_2.x=1000;
    createjs.Tween.get(background_1).to({x:-1000}, 10000);
    createjs.Tween.get(background_2).to({x:0}, 10000);
    createjs.Tween.get(slide_1).to({x:-1000}, 10000);
    createjs.Tween.get(slide_2).to({x:0}, 10000);
  
}
function backgroundRollObject(){
    var treeX,street_lampX;
    var randomTreeX,randomStreet_LampX;
    randomTreeX = Math.floor(Math.random() * 1000)+1000;
    randomStreet_LampX=Math.floor(Math.random()*1000)+1000;
   
    street_lamp.x=randomStreet_LampX;
    
    tree.x=randomTreeX;
    treeX=tree.x-2000;
    street_lampX=street_lamp.x-2000;
  
    createjs.Tween.get(tree).to({x:treeX}, 20000);
    createjs.Tween.get(street_lamp).to({x:street_lampX}, 20000);
 
}
function render() {
    plane.y = plane.nextY;
}
function tick(e) {
    moveUp();
    render();
    stage.update();
   // alert('ouch');
}