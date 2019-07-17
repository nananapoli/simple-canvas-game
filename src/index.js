import bgSrc from './Images/background.png';
import heroSrc from './Images/hero.png';
import monsterSrc from './Images/monster.png';

import './style.css';

// create canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;

// background image
let bgReady = false;
const bgImg = new Image();
bgImg.onload = () => {
  bgReady = true
};
bgImg.src = bgSrc;
// hero image
let heroReady = false;
const heroImg = new Image();
heroImg.onload = () => {
  heroReady = true
};
heroImg.src = heroSrc;
// monster image
let monsterReady = false;
const monsterImg = new Image();
monsterImg.onload = () => {
  monsterReady = true
};
monsterImg.src = monsterSrc;


// game objects
const hero = {
  speed: 256,
  x: 32,
  y: 32,
}
const monster = {
  x: 0,
  y: 0,
}
let monstersCaught = 0;

// handle keyborad controls
// store player's action
const keysDown = {};

addEventListener('keydown', (e) => {
  keysDown[e.keyCode] = true
}, false);

addEventListener('keyup', (e) => {
  delete keysDown[e.keyCode]
}, false);

// Reset the game when the player catches a monster
const reset = () => {
  //Or I could also set the player where they are by doing nothing
  //hero.x = canvas.width / 2;
  //hero.y = canvas.height / 2;

  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}

// Update object
const update = (modifier) => {// modifier is a time-based number
  if (38 in keysDown) {// up
    hero.y -= hero.y <= 32 ? 32 : hero.speed * modifier;
  }
  if (40 in keysDown) {// down
    hero.y += hero.y >= 448 ? 448 : hero.speed * modifier;
  }
  if (37 in keysDown) {// left
    hero.x -= hero.x <= 32 ? 32 : hero.speed * modifier;
  }
  if (39 in keysDown) {// right
    hero.x += hero.x >= 480 ? 480 : hero.speed * modifier;
  }

  // edge test
  if(hero.y <= 32) hero.y = 32;
  if(hero.y >= 448) hero.y = 448;
  if(hero.x <= 32) hero.x = 32;
  if(hero.x >= 448) hero.x = 448;


  // contact test
  if(hero.x -32 <= monster.x && monster.x <= hero.x + 32 && hero.y - 32 <= monster.y && monster.y <= hero.y + 32) {
    ++monstersCaught;
    reset();
  }
}

// Draw everything: bg, hero, monster, counts
const render = () => {
  if(bgReady) {
    ctx.drawImage(bgImg, 0, 0);
  }

  if(heroReady) {
    ctx.drawImage(heroImg, hero.x, hero.y);
  }

  if(monsterReady) {
    ctx.drawImage(monsterImg, monster.x, monster.y);
  }

  //score
  ctx.fillStyle = 'rbg(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monster Caught: ' + monstersCaught, 32, 32);
}

// The main game loop
const main = () => {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000); // refresh data: updating location, reset location 
  render(); // repaint everything according to the latest data

  then = now;
  requestAnimationFrame(main)
}

const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();

const root = document.getElementById('root');
root.appendChild(canvas);



/**
 * 纵观下来，流程其实挺清晰的：
 * 1.初始化操作: cavans，imgSrc(onload之后再draw), Objects(包含位置信息)，绑定事件监听
 * 
 * 2.更新数据 func1
 * 
 * 3.重绘界面 func2
 * 
 * 4.重复2、3步骤 func3
 * 
 * features：
 * 1.面向对象：对象身上存储自身的数据
 */