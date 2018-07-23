var stage;
var queue;

// player,enemy var
var plane,enemy,boss;

// background var
var background_1,background_2,tree,street_lamp,slide_1,slide_2;

//player bullets
var bullet_s_img;

//explosion
var ex_img;
//score var

var score_object,score,life,hits,score_text;

// enemy bullets
var lazer_img,stone_img;

//lives
var life;
var lives_container;
var upstopable_time=false;

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
        {id:"lives_plane",src:"images/lives_plane.png"},
        {id:"ufo",src:"images/ufo.png"},
        {id:"bang",src:"images/bang.png"},
        {id:"lazer",src:"images/lazer.png"},
        {id:"alien_baby",src:"images/alien_baby.png"},
        {id:"stone",src:"images/bullet_stone.png"}
    ]);
}

function loadComplete() {
    setupStage();
    setupBackground();
    setupEnimies();
    setupPlane();
    setupScore();
    setupLives();

    window.onkeydown= movePlane;
    window.onkeyup=keyUP;
    
}
function setupStage() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    //createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(60);
}
function setupBackground(){
    var img= queue.getResult("background");
    var img1= queue.getResult("tree");
    var img2= queue.getResult("street_lamp");
    var img3=queue.getResult("slide");

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
    slide_1.y=350;
    slide_2.x=400;
    slide_2.y=350;
    street_lamp.x=100;
    street_lamp.y=200;
    
 

    stage.addChild(background);
    stage.addChild(background_1);
    stage.addChild(background_2);



    stage.addChild(street_lamp);
    stage.addChild(tree);
    stage.addChild(slide_1);
    stage.addChild(slide_2);
    
    
    
    backgroundRoll();
    backgroundRollObject();
    window.setInterval(backgroundRoll,10000);
    window.setInterval(backgroundRollObject,20000);

    var pt,pt1,pt2,i;
    var hit=setInterval( 
        function(){
            pt = plane.localToLocal(75,35,tree);   
            if (tree.hitTest(pt.x,pt.y)) {
                if(!upstopable_time)
                {
                life=life-1;
                livesUpdate();
                plane.y=0;    
                }        
            }      
    },20); 
    var hit1=setInterval( 
        function(){
            pt1 = plane.localToLocal(75,35,street_lamp);   
            if (street_lamp.hitTest(pt1.x,pt1.y)) {
                if(!upstopable_time)
                {
                life=life-1;
                livesUpdate();
                plane.y=0;    
                }       
            }      
    },20); 
    var hit2=setInterval( 
        function(){
            pt2 = plane.localToLocal(75,35,slide_1);   
            if (slide_1.hitTest(pt2.x,pt2.y)) {
                if(!upstopable_time)
                {
                life=life-1;
                livesUpdate();
                plane.y=0;    
                }                
            }      

    },20); 
    var hit3=setInterval( 
        function(){
            pt3 = plane.localToLocal(75,35,slide_2);   
            if (slide_2.hitTest(pt3.x,pt3.y)) {
                if(!upstopable_time)
                {
                life=life-1;
                livesUpdate();
                plane.y=0;    
                }                              
            }      

    },20); 
}

function setupPlane(){
    var img = queue.getResult("plane");
    plane = new createjs.Bitmap(img);
    plane.x=50;
    plane.y=200;
    stage.addChild(plane);
    setInterval(moveDown,20);

}

function setupEnimies()
{
    stone_img=queue.getResult("stone");
    lazer_img=queue.getResult("lazer");
    var img=queue.getResult("ufo");
    var img1=queue.getResult("alien_baby");
    enemy = new createjs.Bitmap(img);
    enemy.x=700;
    enemy.y=100;
    stage.addChild(enemy);
    setInterval(enemyRandomMoveAndFire,1000);

    boss= new createjs.Bitmap(img1);
    boss.x=700;
    boss.y=400;
    setTimeout(function(){
        stage.addChild(boss);    
        createjs.Tween.get(boss).to({y:300}, 1000);
        setInterval(bossRandomMoveAndFire,2000);
    },2000);   
}

function setupScore(){
    score=0;
    score_text=new createjs.Text("Score:","30px Arial","#000000");
    score_object=new createjs.Text(score,"30px Arial","#000000");
    score_text.x=700;
    score_text.y=20;
    score_object.x=800;
    score_object.y=20;
    stage.addChild(score_text,score_object);
}
function setupLives(){
    var img=queue.getResult("lives_plane");   
    lives_container=new createjs.Container();
    life=3;

    for(i=0;i<life;i++){
        var lives_plane= new createjs.Bitmap(img);
        lives_plane.x=i*50+10;
        lives_plane.y=20;
        lives_container.addChild(lives_plane);
    }
    stage.addChild(lives_container);

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
            player_fire();
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
    
}

function enemyRandomMoveAndFire(){
    var i=Math.floor(Math.random() * 10)*50-38;
    var ii=Math.floor(Math.random()*10)*20+650;
    //console.log(i+','+ii);
    createjs.Tween.get(enemy).to({y:i,x:ii}, 1000);
    enemy_fire();
}
function bossRandomMoveAndFire(){
    var ii=Math.floor(Math.random()*10)*20+650;
    //console.log(i+','+ii);
    createjs.Tween.get(boss).to({x:ii}, 1000);
    setTimeout(boss_fire,1000);
}
function player_fire(){
    bullet_s_img= queue.getResult("bullet_s");
    var bullet_s = new createjs.Bitmap(bullet_s_img);
    var pt;
    var i=0;  
    bullet_s.x=plane.x+100;
    bullet_s.y=plane.y;
    stage.addChild(bullet_s);  
    var hit=setInterval( 
        function(){
        
            bullet_s.x = bullet_s.x+10; 
            pt = bullet_s.localToLocal(25,0,enemy); 
        
            if (enemy.hitTest(pt.x,pt.y)) { 
                stage.removeChild(bullet_s);
                i=1;
               
            }  
            if(i==1){
                score=score+10;
                score_object.text=score;
                console.log(score); 
                explosion(enemy.x,enemy.y);
                i=0;
                clearInterval(hit);
            }
            if(bullet_s.x>900){
                stage.removeChild(bullet_s);
                clearInterval(hit);        
            }        
    },20); 
}
function enemy_fire(){
    var lazer =new createjs.Bitmap(lazer_img);
    var i=0;
    lazer.x=enemy.x-50;
    lazer.y=enemy.y;
    //console.log("enemy fire!");
    stage.addChild(lazer);
    var hit=setInterval( 
        function(){
        
            lazer.x = lazer.x-10; 
            pt = lazer.localToLocal(0,0,plane); 
        
            if (plane.hitTest(pt.x,pt.y)) { 
                stage.removeChild(lazer);
                i=1;
               
            }  
            if(i==1){
                i=0;
                if(!upstopable_time){
                life=life-1;
                livesUpdate();
                }
                clearInterval(hit);
            }
            if(lazer.x<0){
                stage.removeChild(lazer);
                clearInterval(hit);        
            }        
    },20); 
}
function boss_fire(){
    var stone_1= new createjs.Bitmap(stone_img);
    var stone_2=new createjs.Bitmap(stone_img);
    var i_1=0;
    var i_2=0;
    var pt1,pt2;
    stone_1.x=boss.x+100;
    stone_1.y=420;

    stone_2.x=boss.x-10;
    stone_2.y=420;

    stage.addChild(stone_1,stone_2);

    createjs.Tween.get(stone_1).to({y:350}, 1000);
    createjs.Tween.get(stone_2).to({y:350}, 1000);

    setTimeout(function(){
    createjs.Tween.get(stone_1).to({x:-100,y:plane.y}, 1000);
    var hit1=setInterval( 
        function(){      
            pt1= stone_1.localToLocal(0,0,plane);         
            if (plane.hitTest(pt1.x,pt1.y)) { 
                stage.removeChild(stone_1);
                i=1;
               
            }  
            if(i==1){
                i=0;
                if(!upstopable_time){
                life=life-1;
                livesUpdate();             
                }
                clearInterval(hit1);
            }
            if(stone_1.x<0||stone_1.y<0||stone_1.y>400){
                stage.removeChild(stone_1);
                clearInterval(hit1);     

            }        
    },20); },1000);

    setTimeout(function(){
        createjs.Tween.get(stone_2).to({x:-100,y:plane.y}, 1000);
        var hit2=setInterval( 
            function(){    
                pt2= stone_1.localToLocal(0,0,plane);         
                if (plane.hitTest(pt2.x,pt2.y)) { 
                    stage.removeChild(stone_2);
                    i=1;
                   
                }  
                if(i==1){
                    i=0;
                    if(!upstopable_time){
                    life=life-1;
                    livesUpdate();             
                    }
                    clearInterval(hit2);
                }                 
                if(stone_2.x<0||stone_2.y<0||stone_2.y>400){
                    stage.removeChild(stone_2);
                    clearInterval(hit2);        
                }        
        },20); },1000);
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
    randomTreeX = Math.floor(Math.random() * 500)+1000;
    randomStreet_LampX=Math.floor(Math.random()*500)+1000;
   
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
function changeImage(bitmap,img){
    bitmap.image= img;
}
function explosion(x,y){
    ex_img=queue.getResult("bang");
    var explosion_img=new createjs.Bitmap(ex_img);
    explosion_img.x=x;
    explosion_img.y=y;
    stage.addChild(explosion_img);
    enemy.alpha=0.5;
    setTimeout(function(){
        stage.removeChild(explosion_img);
        enemy.alpha=1;
    },500);
}
function livesUpdate(){
    var img=queue.getResult("lives_plane"); 
    lives_container.removeAllChildren(); 
    stage.removeChild(lives_container);
    plane_flashing();
    if(life==0){
        stage.alpha=0.5;
        var game_over_text=new createjs.Text("Game Over","50PX Arial","#000000");
        game_over_text.textAlign = 'center';
        game_over_text.textBaseline = 'middle';
        game_over_text.x=450;
        game_over_text.y=200;
        stage.addChild(game_over_text);
    }
    for(i=0;i<life;i++){
        var lives_plane= new createjs.Bitmap(img);
        lives_plane.x=i*50+10;
        lives_plane.y=20;
        lives_container.addChild(lives_plane);
        console.log(life);
    }
    stage.addChild(lives_container);
    upstopable_time=true;
    setTimeout(function(){
        upstopable_time=false;
    },2000);
    
}
function plane_flashing(){
    setTimeout(function(){
        plane.alpha=0.5;
    },200);
    setTimeout(function(){
        plane.alpha=1;
    },400);
    setTimeout(function(){
    plane.alpha=0.5;     
    },600);
    setTimeout(function(){
    plane.alpha=1;     
    },800);
    setTimeout(function(){
        plane.alpha=0.5;
    },1000);
    setTimeout(function(){
        plane.alpha=1;
    },1200);
    setTimeout(function(){
    plane.alpha=0.5;     
    },1400);
    setTimeout(function(){
    plane.alpha=1;     
    },1600);
}
function tick() {
	//console.log(stage.mouseX+","+stage.mouseY)
     moveUp();
     render();
    stage.update();  
   // 
}