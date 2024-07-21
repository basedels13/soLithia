//ドラッグ＆ドロップ　https://ics.media/tutorial-createjs/mouse_drag/
//next　設定　セーブ　など
//やるきあれば→EXに挙げたカードを降ろす, 破片強打
//リトライ、2週目に音量が大きくなる？
window.onload = function(){
main();
};

function main(){
function submitPass(){
  var T=Math.floor(Math.random()*10000)
  var Msg="狭間を開くパスワード："+T;
  cx3.clearRect(0,0,800,600);
  QR_main(canvas3,Msg)
  var qr_src=canvas3.toDataURL();
  var qr_src2 = new createjs.Bitmap(qr_src);
  field.addChild(qr_src2);
  qr_src2.alpha=0;
  cx3.clearRect(0,0,800,600);
}
	var canvas = document.getElementById("canvas0");//ベースレイヤ。背景、置物
  var canvas1 = document.getElementById("canvas1");//
  var canvas2 = document.getElementById("canvas2");//
	var canvas3 = document.getElementById("canvas3");//カーソル
  var canvas4 = document.getElementById("canvas4");//
  var canvas5 = document.getElementById("canvas5");//イベントキャッチ/カーソル/create
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var cx = canvas.getContext("2d");
  var cx1 = canvas1.getContext("2d");
  var cx2 = canvas2.getContext("2d");
  var cx3 = canvas3.getContext("2d");
  var cx4 = canvas4.getContext("2d");
  var cx5 = canvas5.getContext("2d");
var stage = new createjs.Stage("canvas5");//Stage

if (createjs.Touch.isSupported() == true) {
createjs.Touch.enable(stage);//タップに対応する
}
stage.enableMouseOver();
var graphics;
graphics=new createjs.Graphics();
graphics
  .beginRadialGradientFill(["white","orange"],[0.0,1.0],0,0,20,0,0,100)
  .drawPolyStar(0, 0, 50, 5, 0.4, -90);
var Cstar = new createjs.Shape(graphics);
  Cstar.x=100;
  Cstar.y=225;
var tweeNstar;
tweeNstar=createjs.Tween.get(Cstar, {loop: true})
.to({rotation:360},1200);
var Cnext = new createjs.Container();//コンテナ
var deckmap = new createjs.Container();
var field = new createjs.Container();//field
var clearBG = new createjs.Container();//clear
var yakumap = new createjs.Container();//ヒントボタン等
var Titleyard = new createjs.Container();//タイトル
var Backyard = new createjs.Container();//背景
var Configmap = new createjs.Container();//soundボタン・オプション等
var Loadmap = new createjs.Container();//ダイアログ
stage.addChild(Backyard);
stage.addChild(Titleyard);
stage.addChild(field);
stage.addChild(deckmap);
stage.addChild(clearBG);
stage.addChild(yakumap);
stage.addChild(Configmap);
stage.addChild(Loadmap);
//設定
var mouseX;
var mouseY;
//ドラッグアンドドロップ
var dragPointX;
var dragPointY;
var mute="ON"
var debugmode=false;//座標の表示を管理
var loadstate=0;
var cLock=true;//true->操作可能
var opLock=0;
var mLock=true;//deckめくっている最中falseに
var pagestate=-1;
var pagelength=1;
var pagetemp=-1;
var msgstate=1;
var msglength=2;
var msgtemp=1;
var gamestate=10;
var startT = 0;
var clearT = 0;
var hour = 0;
var min = 0;
var sec = 0;
var datet =0;
var key13=0;//enter
var key27=0;//esc
var key119=0;//F8
//オプション
var shape = new createjs.Shape();
shape.graphics.beginFill("#3b7353");
shape.graphics.drawRect(700, 0, 120, 50); // 長方形を描画
shape.alpha=0.8;
Configmap.addChild(shape); // 表示リストに追加
var t = new createjs.Text("SOUND", "20px serif", "white");
t.x=705;
t.y=0;
Configmap.addChild(t);
var muteshape = new createjs.Text(mute, "28px serif", "white");
muteshape.x=720;
muteshape.y=20;
Configmap.addChild(muteshape);
shape.addEventListener("click", {handleEvent:SoundConfig});
//たいとるがめん
var shape = new createjs.Shape();
shape.graphics.beginFill("#3b7353");
shape.graphics.drawRect(0, 0, 800, 600); // 長方形を描画
Titleyard.addChild(shape); // 表示リストに追加
var BG = new createjs.Bitmap("soL_back.png");
BG.alpha=0.4;
Titleyard.addChild(BG);
var t = new createjs.Text("ver0.991/Click Card to START", "24px serif", "white");
Titleyard.addChild(t);
var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car1.x=-20;
Car1.y=55;
Car1.scale=3;
Titleyard.addChild(Car1);
var Car2 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car2.x=450;
Car2.y=55;
Car2.scale=3;
Titleyard.addChild(Car2);
var Car3 = new createjs.Bitmap("Card_images/Spade12.png");
Car3.x=-20;
Car3.y=55;
Car3.scale=3;
Car3.alpha=0;
Titleyard.addChild(Car3);
var Car4 = new createjs.Bitmap("Card_images/Spade_M11.png");
Car4.x=450;
Car4.y=55;
Car4.scale=3;
Car4.alpha=0;
Titleyard.addChild(Car4);
var Car5 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car5.x=215;
Car5.y=55;
Car5.scale=3;
Titleyard.addChild(Car5);
var Car6 = new createjs.Bitmap("Card_images/Diamond01.png");
Car6.x=215;
Car6.y=55;
Car6.scale=3;
Car6.alpha=0;
Titleyard.addChild(Car6);
var Bt1 = new createjs.Bitmap("soL_rule_bt1.png");
Bt1.x=50;
Bt1.y=430;
Bt1.scale=2;
//Titleyard.addChild(Bt1);
var Bt3 = new createjs.Bitmap("soL_rule_bt3.png");
Bt3.x=450;
Bt3.y=430;
Bt3.scale=2;
//Titleyard.addChild(Bt3);
Car1.addEventListener("mouseover", {card:1,handleEvent:MouseOver});
Car1.addEventListener("mouseout", {card:2,handleEvent:MouseOver});
Car1.addEventListener("click", {card:1,handleEvent:GameReady});
Car2.addEventListener("mouseover", {card:3,handleEvent:MouseOver});
Car2.addEventListener("mouseout", {card:4,handleEvent:MouseOver});
Car2.addEventListener("click", {card:3,handleEvent:GameReady});
Car5.addEventListener("mouseover", {card:5,handleEvent:MouseOver});
Car5.addEventListener("mouseout", {card:6,handleEvent:MouseOver});
Car5.addEventListener("click", {card:2,handleEvent:GameReady});
submitPass();
function GameReady(){
  playMode[0]=this.card;
  load2();
}
function MouseOver(e){
  switch(this.card){
    case 1:
      Car3.alpha=1;
      break;
    case 2:
      Car3.alpha=0;
      break;
    case 3:
      Car4.alpha=1;
      break;
    case 4:
      Car4.alpha=0;
      break;
    case 5:
      Car6.alpha=1;
      break;
    case 6:
      Car6.alpha=0;
      break;
  }
};
var yakumap_hint = new createjs.Bitmap("soL_hint.png");
yakumap_hint.alpha=0;
yakumap_hint.scale=0.6;
yakumap_hint.x=720;
yakumap_hint.y=75;
var yakumap_undo = new createjs.Bitmap("soL_undo.png");
yakumap_undo.alpha=0;
yakumap_undo.scale=0.6;
yakumap_undo.x=720;
yakumap_undo.y=140;
var yakumap_reset = new createjs.Bitmap("soL_retry.png");
yakumap_reset.alpha=0
yakumap_reset.scale=0.6;
yakumap_reset.x=720;
yakumap_reset.y=205;
var yakumap_solve = new createjs.Bitmap("soL_new.png");
yakumap_solve.alpha=0
yakumap_solve.scale=0.6;
yakumap_solve.x=720;
yakumap_solve.y=270;
yakumap.addChild(yakumap_hint);
yakumap.addChild(yakumap_undo);
yakumap.addChild(yakumap_reset);
yakumap.addChild(yakumap_solve);
var yakumap_rule = new createjs.Bitmap("soL_rule1.png");
yakumap_rule.alpha=0;
yakumap.addChild(yakumap_rule)
var Msgwindow = new createjs.Bitmap("window_ds.png");
Msgwindow.scale=100/128;
var clear_1 = new createjs.Bitmap("soL_clear_1.png");
var clear_2 = new createjs.Bitmap("soL_clear_2.png");
clear_2.scale=600/768;
var clear_3 = new createjs.Bitmap("soL_clear_3.png");
var clear_4 = new createjs.Bitmap("soL_clear_4.png");
var retry_bt = new createjs.Bitmap("soL_retry_bt.png");
var retry_bt2 = new createjs.Bitmap("soL_retry_bt2.png");
var effect1 = {
  images : ["Card_images/Card_delete.png"],
  frames : {width:128, height:128, regX:64, regY:64},
  animations : {end:[20],walk:[0,19,"end",0.3]}
}
var SpriteSheet1 = new createjs.SpriteSheet(effect1);
var Sprite1 = new createjs.Sprite(SpriteSheet1);
yakumap.addChild(Sprite1);
Sprite1.gotoAndPlay('end');
//データベース
var Card_src= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Spade11.png','Card_images/Spade12.png','Card_images/Spade13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Heart11.png','Card_images/Heart12.png','Card_images/Heart13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Club11.png','Card_images/Club12.png','Card_images/Club13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png')
var Card_src_N= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Spade11.png','Card_images/Spade12.png','Card_images/Spade13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Heart11.png','Card_images/Heart12.png','Card_images/Heart13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Club11.png','Card_images/Club12.png','Card_images/Club13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png')
var Card_src_M= new Array('Card_images/BackColor_Closed.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade_M10.png','Card_images/Spade_M11.png','Card_images/Spade_M12.png','Card_images/Spade_M13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart_M10.png','Card_images/Heart_M11.png','Card_images/Heart_M12.png','Card_images/Heart_M13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club_M10.png','Card_images/Club_M11.png','Card_images/Club_M12.png','Card_images/Club_M13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond_M10.png','Card_images/Diamond_M11.png','Card_images/Diamond_M12.png','Card_images/Diamond_M13.png')
var Card_src_S= new Array('Card_images/BackColor_Black.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1101.png','Card_images/Spider1201.png','Card_images/Spider1301.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1102.png','Card_images/Spider1202.png','Card_images/Spider1302.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1103.png','Card_images/Spider1203.png','Card_images/Spider1303.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1104.png','Card_images/Spider1204.png','Card_images/Spider1304.png',)
var playMode=[1,'クロンダイク','スパイダー','エルドリッチ']
var cards = [];
var hands = [];
var decks = [];//裏向きになっている山札
var deckfaces = [];//表向きになっている山札
var decksNow=0;//触れる山札
var Extras=[0,13,26,39];
var attacker=[[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
var Cardlists=[];//create用の画像リスト
var Decklists=[];//デッキ用
var DeckFacelists=[];//デッキ
var Exlists=[[],[],[],[]];//クリア済み/モンスターカード
var Closed=[[],[],[],[]];
var Atklists=[[-1,-1],[-1,-1],[-1,-1],[-1,-1]];//アタッカー
var cardWidth=80;//トランプの横幅
var cardHeight=140;//トランプの縦幅
var cardgapY=20;//トランプを重ねる時の
var cardgapX=10;//行同士の隙間
var duelLog=[];//アンドゥ用
var handsLog=[];//リセット用
var retryswitch=0;
var undocount=0;
var score=0;
var Cbt=canvas2.toDataURL();
var Cbtlist=[];
var Cbutton = new createjs.Bitmap(Cbt);
field.addChild(Cbutton);
Cbtlist.push(Cbutton);
//qr_src2.alpha=0;
//ボタン描画用

yakumap_hint.addEventListener("click", {rule:playMode[0],handleEvent:ruleButton});
yakumap_reset.addEventListener("click", {rule:playMode[0],handleEvent:resetButton});
yakumap_undo.addEventListener("click", {rule:playMode[0],handleEvent:undoButton});
yakumap_solve.addEventListener("click", {rule:playMode[0],handleEvent:solveButton});
retry_bt.addEventListener("click", {rule:playMode[0],handleEvent:Gamestart});
retry_bt2.addEventListener("click", {rule:playMode[0],handleEvent:Gameend});
//アップデートする
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick",function(){
    stage.update();
});
  class Music extends Howl {
    constructor (data, debugStart=0) {
      const params = {
        src: [data.src],
        volume:[data.volume]*vBar,
        preload: false,
        // オーデイオスプライト設定
        sprite: {
          start: [debugStart, data.loopEnd-debugStart],
          loop: [data.loopStart, data.loopEnd - data.loopStart, true],
        },
      };
      super(params);
      this.load();
    }
    playMusic () {
      this.play("start");
      this.once('end', ()=> {
        console.log('bgm loop!');
        this.play("loop");
      });
    }
  }
//保存するデータ
var vBar=0.6;
var sBar=1;
var cleared=[[0,0,0],[0,0,0]];//ク/マ/エ クリア回数/ ク/マ/エ 挑戦回数の順
var highscore_1=[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
]
var highscore_2=[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
]
var UserData = {
  "Name":"SoL_ch",
  "Volume": vBar,
  "SEVolume": sBar,
  "cleaed":[0,0,0,0,0,0],
  "highscore_1":[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],
  "highscore_2":[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],
};
function saveDL(){
  try{
UserData = {
  "Name":"SoL_ch",
  "Volume": vBar,
  "SEVolume": sBar,
  "cleaed":[0,0,0,0,0,0],
};
console.log(UserData);
localStorage.setItem('UserData_SoL', JSON.stringify(UserData));
  }catch(e){
    console.log('ねこ')
  }
}
function saveUP(){
  try{
var getdata; // 読込むデータ
getdata = JSON.parse(localStorage.getItem('UserData_SoL'));
console.log('Userdata loaded');
vBar=getdata.Volume;
sBar=getdata.SEVolume;
SEbuffer();
  }catch(e){
    console.log('ねこ')
  }
}
function saveDel(){
  //デフォルト
vBar=1;
sBar=1;
cleaed=[0,0,0,0,0,0]
  try{
    localStorage.removeItem('UserData_SoL')
        console.log('localStorage cleared');
      }catch(e){
        console.log('ねこ')
    }
}
function SEbuffer(){
  se1.volume(0.2*sBar);
  se2.volume(0.4*sBar);
  se3.volume(0.3*sBar);
  se4.volume(0.4*sBar);
  se5.volume(0.07*sBar);
  se6.volume(0.25*sBar);
  se7.volume(0.3*sBar);
  se8.volume(0.1*sBar);
  se9.volume(0.16*sBar);
  se10.volume(0.4*sBar);
  se11.volume(0.4*sBar);
  se12.volume(0.4*sBar);
  se13.volume(0.12*sBar);
  se14.volume(0.3*sBar);
  se15.volume(0.2*sBar);
  se16.volume(0.2*sBar);
  se17.volume(0.4*sBar);
  se18.volume(0.4*sBar);
  se19.volume(0.4*sBar);
  se20.volume(0.5*sBar);
  }
//立ち絵
var se1 = new Howl({
  src:"card-flip.mp3",
      volume: 0.2,
    });
var se2 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
    });
var se3 = new Howl({
  src:"button32.mp3",
      volume: 0.3,
    });
var se4 = new Howl({
  src:"shufflecard2.mp3",
      volume: 0.4,
    });
var se5 = new Howl({
  src:"8bit_vanish.mp3",
      volume: 0.07,
    });
var se6 = new Howl({
  src:"Marimbaglissando1.mp3",
  volume: 0.25,
  });
var se7 = new Howl({
  src:"decision38.mp3",
  volume: 0.3,
  });
var se8 = new Howl({
  src:"Creature6.mp3",
      volume: 0.1,
  });
var se9 = new Howl({
  src:"rinbell.mp3",
  volume: 0.16,
  });
var se10 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se11 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se12 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se13 = new Howl({
    src:"Enter.mp3",
    volume: 0.12,
    });
var se14 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se15 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se16 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se17 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se18 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se19 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
  });
var se20 = new Howl({
  src:"kaiju_foot.mp3",
  volume: 0.5,
  });
const bgm1data ={
    src: "PerituneMaterial_EpicBattle_Deity_loop.mp3",
    loopStart: 0,
    loopEnd: 117660,
    volume: 0.1,
  };
  const bgm2data ={
    src: "PerituneMaterial_Lost_place5_loop.mp3",
    loopStart: 0,
    loopEnd: 132000,
    volume: 0.1,
  };
  const bgm3data ={
    src: "Peritune_Whistling_Winds_loop.mp3",
    loopStart: 0,
    loopEnd: 88040,
    volume: 0.1,
  };
  const bgm4data ={
    src: "PerituneMaterial_Soft_day2_loop.mp3",
    loopStart: 0,
    loopEnd: 98160,
    volume: 0.1,
  };
var Bgm=new Music(bgm1data);
var musicnum=0;
var loadmax;

function load2(){
  Titleyard.alpha=0;
  se6.play();
		cx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		cx.fillRect(710,0,90,510);
		cx.beginPath();
		cx.strokeStyle = "#ffffff";
		cx.fillStyle = "#ffffff";
		cx.font = "22px 'ＭＳ ゴシック'";
      cx1.fillStyle = "#ffffff";
      cx1.font = "40px 'Arial'"; 
var grad  = cx.createLinearGradient(0,510,0,600);
    grad.addColorStop(0, '#4FB8AB');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
	cx.beginPath();
  cx.fillStyle = grad;
	cx.fillRect(0,510,800,90);
  cx.fillStyle ='#4FB8AB';
  cx.fillRect(0,60,800,450);
  cx.fillStyle ='rgba(100, 100, 100, 1)';
	cx.fillRect(720,75,60,60);
  cx.fillRect(720,140,60,60);
  cx.fillRect(720,205,60,60);
  cx.fillStyle ='rgba(0, 0, 0, 1)'
  Gamestart();
}
//画像のロード
    // LoadQueueのインスタンスを作成
    var queue = new createjs.LoadQueue(),
        // manifestを定義
        manifest = [
          {src:'Card_images/BackColor_Closed.png'},{src:'Card_images/BackColor_Black.png'},{src:'Card_images/Spade01.png'},{src:'Card_images/Spade02.png'},{src:'Card_images/Spade03.png'},{src:'Card_images/Spade04.png'},{src:'Card_images/Spade05.png'},{src:'Card_images/Spade06.png'},{src:'Card_images/Spade07.png'},{src:'Card_images/Spade08.png'},{src:'Card_images/Spade09.png'},{src:'Card_images/Spade10.png'},{src:'Card_images/Spade11.png'},{src:'Card_images/Spade12.png'},{src:'Card_images/Spade13.png'},
          {src:'Card_images/Heart01.png'},{src:'Card_images/Heart02.png'},{src:'Card_images/Heart03.png'},{src:'Card_images/Heart04.png'},{src:'Card_images/Heart05.png'},{src:'Card_images/Heart06.png'},{src:'Card_images/Heart07.png'},{src:'Card_images/Heart08.png'},{src:'Card_images/Heart09.png'},{src:'Card_images/Heart10.png'},{src:'Card_images/Heart11.png'},{src:'Card_images/Heart12.png'},{src:'Card_images/Heart13.png'},
          {src:'Card_images/Club01.png'},{src:'Card_images/Club02.png'},{src:'Card_images/Club03.png'},{src:'Card_images/Club04.png'},{src:'Card_images/Club05.png'},{src:'Card_images/Club06.png'},{src:'Card_images/Club07.png'},{src:'Card_images/Club08.png'},{src:'Card_images/Club09.png'},{src:'Card_images/Club10.png'},{src:'Card_images/Club11.png'},{src:'Card_images/Club12.png'},{src:'Card_images/Club13.png'},
          {src:'Card_images/Diamond01.png'},{src:'Card_images/Diamond02.png'},{src:'Card_images/Diamond03.png'},{src:'Card_images/Diamond04.png'},{src:'Card_images/Diamond05.png'},{src:'Card_images/Diamond06.png'},{src:'Card_images/Diamond07.png'},{src:'Card_images/Diamond08.png'},{src:'Card_images/Diamond09.png'},{src:'Card_images/Diamond10.png'},{src:'Card_images/Diamond11.png'},{src:'Card_images/Diamond12.png'},{src:'Card_images/Diamond13.png'}
        ];
    // 同時接続数を設定
    queue.setMaxConnections(6);
// 読み込みの進行状況が変化した
queue.addEventListener("progress", handleProgress);
// 1つのファイルを読み込み終わったら
queue.addEventListener(
  "fileload",
  handleFileLoadComplete
);
// 全てのファイルを読み込み終わったら
queue.addEventListener("complete", handleComplete);

// 読み込み開始
queue.loadManifest(manifest);

function handleProgress(event) {
  // 読み込み率を0.0~1.0で取得
  var progress = event.progress;
}
function handleFileLoadComplete(event) {
  // 読み込んだファイル
  var result = event.result;
}
function handleComplete() {
  console.log("LOAD COMPLETE");
}

createjs.Ticker.addEventListener("tick", UpdateParticles);
function UpdateParticles(event){
  updateParticles();
  if(gamestate==0){yakumap_hint.alpha=1}else{yakumap_hint.alpha=0};
  if(gamestate==0 && duelLog.length){yakumap_solve.alpha=1}else{yakumap_solve.alpha=0};
  if(gamestate==0 && duelLog.length>1 && (playMode[0]==1 || playMode[0]==2)){yakumap_undo.alpha=1;}else{yakumap_undo.alpha=0;}
  if(gamestate==0 && duelLog.length){yakumap_reset.alpha=1;}else{yakumap_reset.alpha=0;}
}
function MouseCursor(event){
  //カーソル
  Cursor.x = stage.mouseX;
  Cursor.y = stage.mouseY;
}
function MouseCircle(event){
  //クリックした場所を教える
  //create化する
  emitParticles();
  // パーティクルを更新
  updateParticles();
}
var count = 0; // tick イベントの回数
var MAX_LIFE = 20; // 寿命の最大値
var particles = [];
// パーティクルを発生させます
function emitParticles() {
  // パーティクルの生成
  for (var i = 0; i < 5; i++) {
    // カウントの更新
    count += 1;
    // オブジェクトの作成
    var particle = new createjs.Shape();
    particle.graphics
            .beginFill(createjs.Graphics.getHSL(count, 50, 50))
            .drawCircle(0, 0, 30 * Math.random());
    Configmap.addChild(particle);
    particle.compositeOperation = "lighter";
    particle.alpha=0.25;
    // パーティクルの発生場所
    particle.x = stage.mouseX*(1/stage.scaleX);
    particle.y = stage.mouseY*(1/stage.scaleY);
    // 動的にプロパティーを追加します。
    // 速度
    particle.vx = 6 * (Math.random() - 0.5);
    particle.vy = 6 * (Math.random() - 0.5);
    // 寿命
    particle.life = MAX_LIFE;
    particles.push(particle);
  }
}
// パーティクルを更新します
function updateParticles() {
  // パーティクルの計算を行う
  for (var i = 0; i < particles.length; i++) {
    // オブジェクトの作成
    var particle = particles[i];
    // 重力
    particle.vy += 0.2;
    // 摩擦
    particle.vx *= 0.96;
    particle.vy *= 0.96;
    // 速度を位置に適用
    particle.x += particle.vx;
    particle.y += particle.vy;
    // 地面
    if (particle.y > stage.canvas.height) {
      particle.y = stage.canvas.height; // 行き過ぎ補正
      particle.vy *= -1; // Y軸の速度を反転
    }
    // パーティクルのサイズをライフ依存にする
    var scale = particle.life / MAX_LIFE;
    particle.scaleX = particle.scaleY = scale;
    // 寿命を減らす
    particle.life -= 1;
    // 寿命の判定
    if (particle.life <= 0) {
      // ステージから削除
      Configmap.removeChild(particle);
      // 配列からも削除
      particles.splice(i, 1);
    }
  }
}
function ruleButton(event){
  if(cLock){
  //ルール画像を表示/格納
  cLock=false;
  switch(this.rule){
    default:
      if(opLock==0){
        createjs.Tween.get(yakumap_rule)
        .to({x:60,alpha:1},400, createjs.Ease.backOut)
        .call(step);
      }else{
        createjs.Tween.get(yakumap_rule)
        .to({x:800,alpha:0},400, createjs.Ease.backIn)
        .call(step);
      }
      break;
  }
function step(){
  if(opLock==0){opLock=1}else{opLock=0};
  cLock=true;
}
}};
function undoButton(event){
  if(cLock){
  cLock=false;
  switch(playMode[0]){
    case 1:
      if(duelLog.length<2){
        cLock=true;
        return false};
        se1.play();
      var Ary=duelLog.pop();
      console.log(Ary);
      console.log(Ary.card,Ary.card[0]);
      //-1 Deck 10- Ex
          for(var i=0;i<Ary.card.length;i++){
            var T=Ary.card[i];
            switch(Ary.from){
              case -2:
                //A-Kセット
                //終了後、もう一度undoする
                Extras[0]-=1;
                hands[to]=hands[to].concat(Ary.card);
                break;
              case -1:
                //カード配布
                  var newCard = new createjs.Bitmap(Card_src[0]);
                  newCard.x=50;
                  newCard.y=5;
                  deckmap.addChild(newCard);
                  Decklists.push(newCard); 
                  //オモテ
                  var newCard = new createjs.Bitmap(Card_src[T]);
                  decks.push(T)
                  deckmap.addChild(newCard);
                  DeckFacelists.push(newCard); 
                  var HashCard=-T;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  switch(Ary.to){
                    case 10:
                      case 11:
                        case 12:
                          case 13:
                  newCard.x=230+(Ary.to-10)*(cardWidth+cardgapX);
                  newCard.y=5;
                  newCard.alpha=1;
                  createjs.Tween.get(newCard)
                    .to({x:50,y:5},150)
                    .to({alpha:0},70)
                    .call(step);
                    break;
                    default:
                  newCard.x=50+(Ary.to)*(cardWidth+cardgapX);
                  newCard.y=150+(hands[Ary.to].length-1)*cardgapY;
                  createjs.Tween.get(newCard)
                  .to({x:50,y:5},150)
                  .to({alpha:0},70)
                  .call(step);
                  }
              break;
              case 10:
                case 11:
                  case 12:
                    case 13:
                      break;
              default:
                var newCard = new createjs.Bitmap(Card_src[T]);
                switch(Ary.to){
                  case 10:
                    case 11:
                      case 12:
                        case 13:
                newCard.x=230+(Ary.to-10)*(cardWidth+cardgapX);
                newCard.y=5;
                  break;
                  default:
                newCard.x=50+(Ary.to)*(cardWidth+cardgapX);
                newCard.y=150+(hands[Ary.to].length-1)*cardgapY;
                }
                field.addChild(newCard);
                hands[Ary.from].push(T);
                Cardlists[Ary.from].push(newCard);
                var HashCard=Ary.from*100+hands[Ary.from].length-1;
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                createjs.Tween.get(newCard)
                .to({x:50+Ary.from*(cardWidth+cardgapX),y:150+(hands[Ary.from].length-1)*cardgapY},70)
                console.log(hands[Ary.from]);
              break;
            }
            switch(Ary.to){
              case 10:
                case 11:
                  case 12:
                    case 13:
                      //Ex
                      var TX=Ary.to -10;
                        Extras[TX]-=1;
                        var T=Exlists[TX].pop();
                        field.removeChild(T);
                        step()
                      break;
              default:
                var T=Cardlists[Ary.to].pop();
                field.removeChild(T)
                hands[Ary.to].pop();
                step()
                break;
            }
          }
    break;
    case 2:
      if(duelLog.length<2){
        cLock=true;
        return false};
        se1.play();
      var Ary=duelLog.pop();
      console.log(Ary);
          for(var i=0;i<Ary.card.length;i++){
            switch(Ary.from){
              case -2:
                //undo of spiderset
                var T=Exlists[0].pop();
                var newCard = new createjs.Bitmap(Card_src[Ary.card[i]]);
                hands[Ary.to].push(Ary.card[i]);
                newCard.x=-20+Ary.to*(cardWidth+cardgapX)
                newCard.y=70+(hands[Ary.to].length-1)*cardgapY
                field.removeChild(T);
                field.addChild(newCard);
                Cardlists[Ary.to].push(newCard);
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                break;
              case -1:
                //カード配布は右からundoしていく
                var I=Ary.card.length-i-1;
                if(Ary.card[I]==0){
                var T=Cardlists[I].pop();
                var S=hands[I].pop();
                var newCard = new createjs.Bitmap(Card_src[0]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  field.removeChild(T);
                  decks.push(-S);
                  Decklists.push(newCard);
                  newCard.addEventListener("click", {handleEvent:SpiderDeal});
                  createjs.Tween.get(newCard)
                  .to({x:690,y:425-decks.length*0.5},120);
                }else{
                //移動後のcardturn, 終了後もう一度undoを呼び出す
                var T=Cardlists[Ary.to].pop();
                var S=Ary.card[i];
                var newCard = new createjs.Bitmap(Card_src[0]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  hands[Ary.to][hands[Ary.to].length-1]=-S;
                  field.addChild(newCard);
                  field.removeChild(T);
                  Cardlists[Ary.to].push(newCard);
                  cLock=true;
                  undoButton();
                  return true;
                }
              break;
              default:
                var T=Ary.card[i];
                var newCard = new createjs.Bitmap(Card_src[T]);
                switch(Ary.to){
                  default:
                newCard.x=-20+(Ary.to)*(cardWidth+cardgapX);
                newCard.y=70+(hands[Ary.to].length-1)*cardgapY;
                }
                field.addChild(newCard);
                hands[Ary.from].push(T);
                Cardlists[Ary.from].push(newCard);
                var HashCard=Ary.from*100+hands[Ary.from].length-1;
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                createjs.Tween.get(newCard)
                .to({x:-20+Ary.from*(cardWidth+cardgapX),y:70+(hands[Ary.from].length-1)*cardgapY},70)
                .call(step);
                var S=Cardlists[Ary.to].pop();
                field.removeChild(S)
                hands[Ary.to].pop();
              break;
            }
          }
            if(Ary.from==-2){
            Extras[0]-=1;
            cLock=true;
            undoButton();
            return true;
            }
          step();
    break;

  }
function step(){
  if(playMode[0]==1){
drawbuttom(10,50,decks.length,1,50,40);
  }
  undocount+=1;
  cLock=true;
}
}};

function resetButton(event){
  //解決する
  if(opLock==0){
    opLock=2;
    Dialogue("RESET GAME？","同じ盤面を最初からやり直します",3,-1);
  }
}
function solveButton(event){
  if(cLock){
  //new game;
  if(opLock==0){
    opLock=2;
    Dialogue("NEW GAME？","このゲームを諦めて新しいゲームを始めます",2,-1);
  }
}}
function DeckReset(p=0,point=0){
  console.log('deckreset',p,point)
  if(p!==0){
    p=this.point;
    if(!cLock || opLock!==0){return false};
  };
  cLock=false;
  switch(p){
  case 0:
    deckmap.removeAllChildren();
    decksNow=0;
    DeckFacelists=[];
    if(!decks.length){
    decks=deckfaces.concat();
    deckfaces=[];
    }
    for(var i=0;i<decks.length;i++){
      //ウラ
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=50;
      newCard.y=10-i*0.5;
      deckmap.addChild(newCard);
      Decklists.push(newCard); 
    }
    for(var i=0;i<decks.length;i++){
      //オモテ
      //山札のカードは負+カード数としてみる
      var newCard = new createjs.Bitmap(Card_src[decks[i]]);
      newCard.x=50;
      newCard.y=5;
      newCard.alpha=0;
      deckmap.addChild(newCard);
      DeckFacelists.push(newCard); 
      var HashCard=-decks[i];
      newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
    }
    drawbuttom(10,50,decks.length,1,50,40);
    cLock=true;
    break;
  default:
    //p枚だけめくる
    //decks->数字が格納された配列
    //decklists->createが格納された配列
    if(p>decks.length){
      se4.play();
      DeckReset(0);
      return false;
    }
    mLock=false;
    var TT=decks.shift();
    deckfaces.push(TT);
    var T=Decklists.pop();
    var S=DeckFacelists[decksNow];
    createjs.Tween.get(T)
    .to({x:105,y:-10,scaleX:0.05,scaleY:1.2},70)
    .to({alpha:0},10);
    createjs.Tween.get(S)
    .to({scaleX:0.05},70)
    .to({scaleX:1,alpha:1},70)
    .to({x:140},100)
    .call(step);
    function step(){
      point+=1;
      decksNow+=1;
      se2.play();
      if(point>=p){
        //end
        drawbuttom(10,50,decks.length,1,50,40);
        mLock=true;
        cLock=true;
        return true;
      }else{
        DeckReset(p,point);
      }
      //次のカードへ
    }
    break;
  }
  };
function CardTurn(p=0){
  //カードめくり@スパイダー
      for(var i=0;i<Cardlists.length;i++){
        if(hands[i][hands[i].length-1]<0){
          hands[i][hands[i].length-1]=-(hands[i][hands[i].length-1])
        var Ary=[hands[i][hands[i].length-1]];
        var T=Cardlists[i].pop();
        var newCard = new createjs.Bitmap(Card_src[hands[i][hands[i].length-1]]);
        newCard.x=T.x+15;
        newCard.y=T.y-10;
        field.addChild(newCard);
        Cardlists[i].push(newCard);
        var HashCard=i*100+hands[i].length-1;
        newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
        newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
        newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});;
        createjs.Tween.get(T)
        .to({x:T.x+35,y:T.y-20,scaleX:0.05,scaleY:1.2},150)
        .to({alpha:0},10);
        createjs.Tween.get(newCard)
        .to({scaleX:0.05,scaleY:1.2},70)
        .to({x:T.x,y:T.y,scaleX:1,scaleY:1,alpha:1},150)
        .call(step);
        if(p!==-1){
          duelLog.push({card:Ary,from:-1,to:i})
        }
      }}
  function step(){
    field.removeChild(T);
  }
}
function monsterMove(){
  //エルドリッチモード　最前列のモンスターカードを移動
  //cLock=false;
  console.log('battle')
  //モンスター破壊
  for(var i=0;i<4;i++){
    if(Extras[i]!==-1 && attacker[i][0]!==-1 && attacker[i][1]!==-1){
      //1 各数値を算出する
      var A=Extras[i]%13;
      var B=attacker[i][0]%13;
      var C=attacker[i][1]%13;
      if(A==0){A+=13}
      if(A==B+C){
        Destraction(i,A,B,C);
        return false;
      };
      //2 スートが同じエースは7としても扱う
      var AA=Math.floor((Extras[i]-1)/13);
      var BB=Math.floor((attacker[i][0]-1)/13);
      var CC=Math.floor((attacker[i][1]-1)/13);
      if(B ==1 && AA==BB && A==7+C){
          Destraction(i,A,7,C);
          return false;
        }
      if(C ==1 && AA==CC && A==7+B){
          Destraction(i,A,7,B);
          return false;
      }
    }
  };
  console.log('monstermove')
  for(var i=0;i<4;i++){
    //console.log(hands[i][hands[i].length-1],Efuda(hands[i][hands[i].length-1]));
    if(Efuda(hands[i][hands[i].length-1])){
      //移動する
      //移動先に追加する
      var Els=Extras.findIndex(value=>value==-1);
      if(Els==-1){
        //モンスターゾーンがすべて埋まっている
        console.log('game over')
        //簡単なアニメーション
        function endroll(){Gameover(1)};
        var T=Cardlists[i][hands[i].length-1];
        se8.play();
        var newCard = new createjs.Bitmap(Card_src[hands[i][hands[i].length-1]]);
        newCard.x=T.x;
        newCard.y=T.y;
        field.addChild(newCard);
        field.removeChild(T)
        createjs.Tween.get(newCard)
        .wait(100)
        .to({scale:2,x:75,y:150},50)
        .to({rotation:-5,x:68},50)
        .to({rotation:5,x:82},50)
        .to({rotation:-5,x:68},50)
        .to({rotation:5,x:82},50)
        .to({rotation:-5,x:68},50)
        .to({rotation:5,x:82},50)
        .to({rotation:0,x:75},50)
        .wait(100)
        .call(endroll);
        return false;
        }
      se1.play()
        var T=Cardlists[i][hands[i].length-1];
        var newCard = new createjs.Bitmap(Card_src[hands[i][hands[i].length-1]]);
        newCard.x=T.x;
        newCard.y=T.y;
        field.addChild(newCard);
        Extras[Els]=hands[i][hands[i].length-1];
        Exlists[Els].push(newCard)
        Cardlists[i].pop();
        hands[i].pop();
        field.removeChild(T)
        createjs.Tween.get(newCard)
        .to({x:50,y:5+Els*cardHeight},120)
        .wait(100)
        .call(monsterMove);
        var R=Closed[Els];
        createjs.Tween.get(R)
        .to({rotation:360},200)
        .to({alpha:0},50);
        break;
    }
  }
  //console.log('End of monstermove')
  var E=0;
  for (var i=0;i<Exlists.length;i++){
    if(Exlists[i].length){
      E+=1;
    }};
  drawbuttom(580,450,"Monster "+E+"/4",1,120,40);
  drawbuttom(580,500,"討伐数 "+Decklists.length+"/16",1,120,40);
  if((E==4 || E==16-Decklists.length)&& musicnum!==1){
    musicnum=1;
    console.log("climax");
    Bgm.stop();
    if(mute="ON"){
    Bgm=new Music(bgm1data);
    Bgm.playMusic();
    }
  };
  if(Decklists.length==16){
    Gameover();
    //Bgm.stop();
  }
  cLock=true;
};
function Efuda(p=0){
  //10,11,12,13ならtrueを返す
  const efuda=[10,11,12,13,23,24,25,26,36,37,38,39,49,50,51,52]
  var E=efuda.findIndex(value=>value==p);
  if(E!==-1){return true}else{return false};
}
function Destraction(i=0,A,B,C){
  var Card=Exlists[i][0];
  createjs.Tween.get(Card)
  .to({alpha:0},150);
  field.removeChild(Card);
  var Card=Atklists[i][0];
  field.removeChild(Card);
  var Card=Atklists[i][1];
  field.removeChild(Card);
  var R=Closed[i];
  Extras[i]=-1;
  attacker[i][0]=-1;
  attacker[i][1]=-1;
  Exlists[i]=[];
  Atklists[i][0]=-1;
  Atklists[i][1]=-1;
  var newCard = new createjs.Bitmap(Card_src_N[0]);
  newCard.x=50;
  newCard.y=5+140*i;
  field.addChild(newCard);
  Decklists.push(newCard);
  createjs.Tween.get(newCard)
  .to({x:680,y:425-Decklists.length*0.5},80)
  Sprite1.x=115;
  Sprite1.y=70+140*i;
  Sprite1.gotoAndPlay('walk');
  createjs.Tween.get(R)
  .to({alpha:0.7},50)
  .to({rotation:0},120)
  .wait(100)
  .call(monsterMove);
  se5.play();
  }
function moveAllow(card=0){
  switch(playMode[0]){
    case 1:
      if(card<0){
        //デッキのカード
        var C=-(card);
        if(deckfaces[deckfaces.length-1]==C){
          return true;
        };
      }
      var I=Math.floor(card/100);
      var J=card%100;
      if(J < hands[I].length){
        //複数のカードを持っている
        for(var i=J;i<hands[I].length-1;i++){
          var A=hands[I][i]%13;
          var B=hands[I][i+1]%13;
          if(A==0){A+=13};
          if(B==0){B+=13};
          var C=Math.floor((hands[I][i]-1)/13);
          var D=Math.floor((hands[I][i+1]-1)/13);
          if(A-B!==1 || (C+D)%2==0){
            return false;
          }
        }
        return true;
      }else{
        //カード1枚のみ
        return true;
      }
      break;
      case 2:
        if(card<0){
          return false;
        }
        var I=Math.floor(card/100);
        var J=card%100;
        if(J < hands[I].length){
          for(var i=J;i<hands[I].length-1;i++){
            var A=hands[I][i]%13;
            var B=hands[I][i+1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};
            var C=Math.floor((hands[I][i]-1)/13);
            var D=Math.floor((hands[I][i+1]-1)/13);
            if(A-B!==1){
              return false;
            }
          }
          return true;
        }else{
          return true;
        }
        break;
        case 3:
          if(card<0){
            //アタックゾーン
            return true;
          }
          var I=Math.floor(card/100);
          var J=card%100;
          if(J < hands[I].length){
            var Arow=0;
            for(var i=J;i<hands[I].length-1;i++){
              var A=hands[I][i]%13;
              var B=hands[I][i+1]%13;
              if(A==0){A+=13};
              if(B==0){B+=13};
              var C=Math.floor((hands[I][i]-1)/13);
              var D=Math.floor((hands[I][i+1]-1)/13);
              if(A-B!==1){
                Arow=-1;
                break;
              }
            }
            if(Arow==0){return true;}
            Arow=0;
            for(var i=J;i<hands[I].length-1;i++){
              var A=hands[I][i]%13;
              var B=hands[I][i+1]%13;
              if(A==0){A+=13};
              if(B==0){B+=13};
              var C=Math.floor((hands[I][i]-1)/13);
              var D=Math.floor((hands[I][i+1]-1)/13);
              if(A-B!==-1){
                Arow=-1;
                break;
              }
            }
            if(Arow==0){return true;}
              }
        break;
  }
}
function handleDown(event) {
  if(cLock && mLock && opLock==0){
switch(playMode[0]){
  case 1:
        console.log(this.card,DeckFacelists);
        if(moveAllow(this.card)){
        if(this.card<0){
          //デッキのカード
          var T=DeckFacelists[decksNow-1];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          se1.play()
          return true;
          };
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        if(J < hands[I].length){
          se1.play()
          for(var i=J;i<hands[I].length;i++){
          var T=Cardlists[I][i];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          }
        }else{
          //最上段のカード
          se1.play()
          var T=Cardlists[I][J];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
        }
      }
    break;
  case 2:
      console.log(this.card);
      if(moveAllow(this.card)){
      var I=Math.floor(this.card/100);
      var J=this.card%100;
      if(J < hands[I].length-1){
        se1.play()
        for(var i=J;i<hands[I].length;i++){
        var T=Cardlists[I][i];
        dragPointX = stage.mouseX - T.x;
        dragPointY = stage.mouseY - T.y;
        T.alpha=0.5;
        }
      }else{
        //最上段のカード
        se1.play()
        var T=Cardlists[I][J];
        dragPointX = stage.mouseX - T.x;
        dragPointY = stage.mouseY - T.y;
        T.alpha=0.5;
      }
    }
  break;
  case 3:
    if(moveAllow(this.card)){
        if(this.card<0){
          //アタックゾーンは行と列が逆
          //-101 -102 [0][0] [0][1]
          //-201 -202 [1][0] [1][1]
          var C=-(this.card)
          var I=Math.floor(C/100)-1;
          var J=C%100 -1;
          var T=Atklists[I][J];
          console.log(attacker[I][J]);
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          se1.play()
          return true;
        }
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        console.log(hands[I][J]);
        if(J < hands[I].length){
          se1.play()
          for(var i=J;i<hands[I].length;i++){
          var T=Cardlists[I][i];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          return true;
          }
        }else{
          //最上段のカード
          se1.play()
          var T=Cardlists[I][J];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
        }
      }
    break;
      }
}};
function handleMove(event) {
  if(cLock && mLock && opLock==0){
    switch(playMode[0]){
      case 1:
        if(moveAllow(this.card)){
            if(this.card<0){
              //デッキのカード
                var T=DeckFacelists[decksNow-1]
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY;
              return true;
            }
            var I=Math.floor(this.card/100);
            var J=this.card%100;
            var T=Cardlists[I][J];
            if(J < hands[I].length){
              var X=1-hands[I].length+J;
              for(var i=J;i<hands[I].length;i++){
                var T=Cardlists[I][i];
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY+20*X;
                X+=1;
                }
              }else{
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY;
              }
            }
          break;
      case 2:
        if(moveAllow(this.card)){
          var I=Math.floor(this.card/100);
          var J=this.card%100;
          var T=Cardlists[I][J];
          if(J < hands[I].length){
            var X=1-hands[I].length+J;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              T.x = stage.mouseX-dragPointX;
              T.y = stage.mouseY-dragPointY+20*X;
              X+=1;
              }
            }else{
              T.x = stage.mouseX-dragPointX;
              T.y = stage.mouseY-dragPointY;
            }
          }
        break;
      case 3:
        if(moveAllow(this.card)){
        if(this.card<0){
          //アタックゾーン
          var C=-(this.card)
          var I=Math.floor(C/100)-1;
          var J=C%100 -1;
          var T=Atklists[I][J];
          T.x = stage.mouseX-dragPointX;
          T.y = stage.mouseY-dragPointY;
          return true;
        }
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        var T=Cardlists[I][J];
        if(J < hands[I].length){
            var X=1-hands[I].length+J;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              T.x = stage.mouseX-dragPointX;
              T.y = stage.mouseY-dragPointY+20*X;
              X+=1;
              }
          }else{
            T.x = stage.mouseX-dragPointX;
            T.y = stage.mouseY-dragPointY;
          }
        }
        break;
    }
}};
function handleUp(event) {
  if(cLock && mLock && opLock==0){
    switch(playMode[0]){
      case 1:
        if(moveAllow(this.card)){
        if(this.card<0){
          //デッキのカード
          se1.play()
          cLock=false;
          var X=-(this.card)
          var T=DeckFacelists[decksNow-1];
        //移動が許可されれば移動する
        //却下であれば元の位置へ
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=stage.mouseY;
        if(TY<140){
          //上
          TX-=3;
          //Exlists
          switch(TX){
            case -2:
              //自動的にUP
              TX=Math.floor((X-1)/13);
              if(X==Extras[TX]+1){
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[X]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                deckmap.removeChild(T);
                DeckFacelists.splice(decksNow-1,1);
                decksNow-=1;
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
                console.log(duelLog);
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard(-1);            
              };
              break;
            case 0:
              case 1:
                case 2:
                  case 3:
              if(X==Extras[TX]+1){
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[X]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                deckmap.removeChild(T);
                DeckFacelists.splice(decksNow-1,1);
                decksNow-=1;
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
                console.log(duelLog);
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard(-1);            
              };
              break;
              default:
                ExitCard(-1);
              break;
                  
          }
        }else{
          switch(TX){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            var A=X%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13}
            if(B==0){B+=13};
            var C=Math.floor((X-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            if((hands[TX].length==0 && A==13) || (B-A==1 && (C+D)%2==1)){
              //移動先に追加する
                  var newCard = new createjs.Bitmap(Card_src[X]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(X);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+TX*(cardWidth+cardgapX),y:150+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  deckmap.removeChild(T);
                  DeckFacelists.splice(decksNow-1,1);
                  decksNow-=1;
                  deckfaces.pop();
                  duelLog.push({card:[X],from:-1,to:TX});
            }else{
              ExitCard(-1);          
            }
            break;
          default:
            ExitCard(-1);
            }
          };
          return true;
        }
        //一般のカード
        cLock=false;
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        var T=Cardlists[I][J];
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=stage.mouseY;
        if(TY<140){
          //上
          TX-=3;
          //Exlists
          switch(TX){
            case 0:
              case 1:
                case 2:
                  case 3:
              if(hands[I][J]==Extras[TX]+1){
                se1.play()
                var C=hands[I][J];
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                field.removeChild(T);
                Cardlists[I].splice(J,1);
                hands[I].splice(J,1);
                duelLog.push({card:[C],from:I,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard();            
              };
              break;
              default:
                ExitCard();
              break;           
          }
        }else{
          switch(TX){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            if(I==TX && J==hands[I].length-1){
              //自動的にUP
              TX=Math.floor((hands[I][J]-1)/13);
              if(hands[I][J]==Extras[TX]+1){
                se1.play()
                var C=hands[I][J];
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                field.removeChild(T);
                Cardlists[I].splice(J,1);
                hands[I].splice(J,1);
                duelLog.push({card:[C],from:I,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
                break;
              }else{ExitCard();break;};
          }
            var A=hands[I][J]%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};//K裁定
            var C=Math.floor((hands[I][J]-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            //無のスペースならばKのみ許可する
            console.log(A,B,C,D);
            if((hands[TX].length==0 && A==13) || (B-A==1 && (C+D)%2==1)){
              //移動先に追加する
                se1.play()
                var X=0;
                for(var i=J;i<hands[I].length;i++){
                  var T=Cardlists[I][i];
                  var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(hands[I][i]);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+TX*(cardWidth+cardgapX),y:150+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T)
                  X+=1;
                  }
                  Cardlists[I].splice(J,X);
                  var Ary=hands[I].splice(J,X);
                  duelLog.push({card:Ary,from:I,to:TX});
                  console.log(duelLog);
            }else{
              ExitCard();          
            }
            break;
          default:
            ExitCard();
          }}
        };    
        break;
      case 2:
        if(moveAllow(this.card)){
        cLock=false;
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        var T=Cardlists[I][J];
        //移動が許可されれば移動する
        //却下であれば元の位置へ
        var TX=Math.floor((stage.mouseX-4)/90);
        var TY=stage.mouseY;
          switch(TX){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            var A=hands[I][J]%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};
            var C=Math.floor((hands[I][J]-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            if((hands[TX].length==0) || (B-A==1)){
              //移動先に追加する
                se1.play()
                var X=0;
                for(var i=J;i<hands[I].length;i++){
                  var T=Cardlists[I][i];
                  var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(hands[I][i]);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:-20+TX*(cardWidth+cardgapX),y:70+(hands[TX].length-1)*cardgapY},90)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T)
                  X+=1;
                  }
                  Cardlists[I].splice(J,X);
                  var Ary=hands[I].splice(J,X);
                  duelLog.push({card:Ary,from:I,to:TX});
                  //console.log(duelLog);
            }else{
              ExitCard();          
            }
            break;
          default:
            ExitCard();
        }};    
        break;  
      case 3:
        if(moveAllow(this.card)){
        if(this.card<0){
          //アタックゾーンのカード
          //attacker
          //Atklists
          se1.play()
          cLock=false;
          var C=-(this.card)
          var I=Math.floor(C/100)-1;
          var J=C%100 -1;
          var T=Atklists[I][J];
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=Math.floor((stage.mouseY-5)/140);
          TX-=3;
          console.log(T,attacker[I][J],TX,TY);
          switch(TX){
          case -1:
            switch(TY){
              case 0:
              case 1:
              case 2:
              case 3:
                if(Extras[TY]==-1 || attacker[TY][TX+2]!==-1){
                  //モンスターがいない場合には置けない
                  ExitCard(-2);
                  return false;
                }
                var newCard = new createjs.Bitmap(Card_src[attacker[I][J]]);
                newCard.x=T.x;
                newCard.y=T.y;
                field.addChild(newCard);
                attacker[TY][TX+2]=attacker[I][J];
                Atklists[TY][TX+2]=newCard;
                var HashCard=-1*((TY+1)*100+TX+3);
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+TY*cardHeight},70)
                .call(endPhase);
                //cardlistから消去
                field.removeChild(T);
                attacker[I][J]=-1;
                Atklists[I][J]=-1;
                //hands[I].pop();
                duelLog.push({card:[attacker[I][J]],from:this.card,to:HashCard});
              break;
              default:
                ExitCard(-2);
              break;
              };
              break;
          case -2:
            switch(TY){
              case 0:
              case 1:
              case 2:
              case 3:
                if(attacker[TY][TX+2]!==-1){
                  //既にカードがある場合には置けない
                  ExitCard(-2);
                  return false;
                }
                var newCard = new createjs.Bitmap(Card_src[attacker[I][J]]);
                newCard.x=T.x;
                newCard.y=T.y;
                field.addChild(newCard);
                attacker[TY][TX+2]=attacker[I][J];
                Atklists[TY][TX+2]=newCard;
                var HashCard=-1*((TY+1)*100+TX+3);
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+TY*cardHeight},70)
                .call(endPhase);
                //cardlistから消去
                field.removeChild(T);
                attacker[I][J]=-1;
                Atklists[I][J]=-1;
                //hands[I].pop();
                duelLog.push({card:[attacker[I][J]],from:this.card,to:HashCard});
                break;
                default:
                  ExitCard(-2);
                break;
            }
            break;
          case 0:
          case 1:
          case 2:
          case 3:
            //一般エリア
            var A=attacker[I][J]%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13}
            if(B==0){B+=13};
            var C=Math.floor((attacker[I][J]-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            var E=Math.abs(B-A);
            if((hands[TX].length==0) || (E==1)){
              //移動先に追加する
                  var newCard = new createjs.Bitmap(Card_src[attacker[I][J]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(attacker[I][J]);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T);
                  attacker[I][J]=-1;
                  Atklists[I][J]=-1;
                  duelLog.push({card:[attacker[I][J]],from:this.card,to:TX});
            }else{
              ExitCard(-2);          
            }
            break;
          default:
            ExitCard(-2);
            break;
          };
          return true;
        }
        //一般のカード
        cLock=false;
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        var T=Cardlists[I][J];
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=Math.floor((stage.mouseY-5)/140);
        TX-=3;
        console.log(hands[I][J],TX,TY);
          switch(TX){
            case -2:
              switch(TY){
                case 0:
                case 1:
                case 2:
                case 3:
                  console.log(Extras[TY],attacker[TY][TX+2],J,hands[I].length)
                  if(attacker[TY][TX+2]!==-1){
                    //既にカードがある場合には置けない
                    ExitCard();
                    return false;
                    }
                    if(J<hands[I].length-1){
                    //2枚以上持っている時にも置けない
                    ExitCard();
                    return false;
                    }
                  var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  attacker[TY][TX+2]=hands[I][J];
                  Atklists[TY][TX+2]=newCard;
                  var HashCard=-1*((TY+1)*100+TX+3);
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+TY*cardHeight},70)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T)
                  Cardlists[I].pop();
                  var Ary=hands[I].pop();
                  duelLog.push({card:Ary,from:I,to:HashCard});
                  break;
                  default:
                    ExitCard();
                  break;
              }
              break;
            case -1:
                switch(TY){
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                    console.log(Extras[TY],attacker[TY][TX+2],J,hands[I].length)
                    if(Extras[TY]==-1 || attacker[TY][TX+2]!==-1){
                      //モンスターがいない・既にカードがある場合には置けない
                      ExitCard();
                      return false;
                      }
                      if(J<hands[I].length-1){
                      //2枚以上持っている時にも置けない
                      ExitCard();
                      return false;
                      }
                    var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                    newCard.x=T.x;
                    newCard.y=T.y;
                    field.addChild(newCard);
                    attacker[TY][TX+2]=hands[I][J];
                    Atklists[TY][TX+2]=newCard;
                    var HashCard=-1*((TY+1)*100+TX+3);
                    newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                    newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                    newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                    createjs.Tween.get(newCard)
                    .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+TY*cardHeight},70)
                    .call(endPhase);
                    //cardlistから消去
                    field.removeChild(T)
                    Cardlists[I].pop();
                    var Ary=hands[I].pop();
                    duelLog.push({card:Ary,from:I,to:HashCard});
                    break;
                    default:
                      ExitCard();
                    break;
                }
                break;
          case 0:
          case 1:
          case 2:
          case 3:
            //同じレーンならexitする
            console.log(I,TX);
            if(I==TX){ExitCard();return false;}
            var A=hands[I][J]%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};
            var C=Math.floor((hands[I][J]-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            var E=Math.abs(B-A);
            if((hands[TX].length==0) || (E==1)){
              //移動先に追加する
                se1.play()
                var X=0;
                for(var i=J;i<hands[I].length;i++){
                  var T=Cardlists[I][i];
                  var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(hands[I][i]);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T)
                  X+=1;
                  }
                  Cardlists[I].splice(J,X);
                  var Ary=hands[I].splice(J,X);
                  duelLog.push({card:Ary,from:I,to:TX});
                  console.log(duelLog);
            }else{
              ExitCard();          
            }
          break;
          default:
            ExitCard();
          }}
        break;
    }
    //Yes
    function endPhase(){
      if(playMode[0]==3){
        monsterMove();
      }else if(playMode[0]==2){
        CardTurn();
        SpiderSet();
        cLock=true;        
      }else{
      cLock=true;
      }
    }
    //No
    function ExitCard(t=0){
      console.log(I,J)
      if(t==-2){
        //アタックゾーン
        var T=Atklists[I][J];
        createjs.Tween.get(T)
        .to({x:50+(J+1)*(cardWidth+cardgapX),y:5+I*cardHeight},90)
        .call(endPhase);
        T.alpha=1;  
        return true; 
      }
      if(t==-1){
        //山札
        var T=DeckFacelists[decksNow-1];
        createjs.Tween.get(T)
        .to({x:50+cardWidth+cardgapX,y:5},90)
        .call(endPhase);
        T.alpha=1;  
        return true; 
      }
      switch(playMode[0]){
        case 1:
          if(J < hands[I].length){
            var X=0;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              createjs.Tween.get(T)
              .to({x:50+I*(cardWidth+cardgapX),y:150+(J+X)*cardgapY},90)
              .call(endPhase);
              T.alpha=1;
              X+=1;
              }
        }else{
          createjs.Tween.get(T)
          .to({x:50+I*(cardWidth+cardgapX),y:150+J*cardgapY},90)
          .call(endPhase);
          T.alpha=1;    
          }
          break;
        case 2:
            if(J < hands[I].length){
              var X=0;
              for(var i=J;i<hands[I].length;i++){
                var T=Cardlists[I][i];
                createjs.Tween.get(T)
                .to({x:-20+I*(cardWidth+cardgapX),y:70+(J+X)*cardgapY},90)
                .call(endPhase);
                T.alpha=1;
                X+=1;
                }
          }else{
            createjs.Tween.get(T)
            .to({x:-20+I*(cardWidth+cardgapX),y:70+J*cardgapY},90)
            .call(endPhase);
            T.alpha=1;    
            }
            break;
         case 3:
          if(J < hands[I].length){
            var X=0;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              createjs.Tween.get(T)
              .to({x:50+(I+3)*(cardWidth+cardgapX),y:5+(J+X)*cardgapY},90)
              .call(endPhase);
              T.alpha=1;
              X+=1;
              }
        }else{
          createjs.Tween.get(T)
          .to({x:50+(I+3)*(cardWidth+cardgapX),y:5+J*cardgapY},90)
          .call(endPhase);
          T.alpha=1;    
          }
          break;
      }
    }
}};
function SoundConfig(){
  se1.volume(0);
  se2.volume(0);
  se3.volume(0);
  se4.volume(0);
  se5.volume(0);
  se6.volume(0);
  se7.volume(0);
  se8.volume(0);
  se9.volume(0);
  se10.volume(0);
  se11.volume(0);
  se12.volume(0);
  se13.volume(0);
  se14.volume(0);
  se15.volume(0);
  se16.volume(0);
  se17.volume(0);
  se18.volume(0);
  se19.volume(0);
  se20.volume(0);
  if(!cLock && debugmode){
    //for debug
    cLock=true;
  }
  //ミュートの切り替え
  if( mute=="OFF" ){
    SEbuffer();
    Bgm.mute(false);
    switch (musicnum){
      case 1:
        Bgm =new Music(bgm1data);
        Bgm.playMusic();
        break;
      case 2:
        Bgm =new Music(bgm2data);
        Bgm.playMusic();
        break;
      case 3:
        Bgm =new Music(bgm3data);
        Bgm.playMusic();
        break;
      case 4:
        Bgm =new Music(bgm4data);
        Bgm.playMusic();
        break;
      default:
        console.log(musicnum,'bgm error!')
        Bgm.stop();
        break;
    }
    mute="ON";
    }else{
    Bgm.mute(true);
    Bgm.stop();
    mute="OFF";
    console.log('bgm muted!')
}
Configmap.removeChild(muteshape);
muteshape = new createjs.Text(mute, "28px serif", "white");
muteshape.x=720;
muteshape.y=20;
Configmap.addChild(muteshape);
};
canvas5.onmousedown = mouseDownListener;
function mouseDownListener(e) {
  createjs.Ticker.addEventListener("tick", MouseCircle);
};
canvas5.onmouseup = mouseUpListener;
function mouseUpListener(e) {
  createjs.Ticker.removeEventListener("tick", MouseCircle);
};

canvas5.addEventListener('mouseout', onMouseOut, false);
function onMouseOut() {
 //console.log('mouseout')
};
  canvas5.addEventListener("click", clickHandler, false);
	function clickHandler(e) {
 		var rect = e.target.getBoundingClientRect();
 		mouseX =  Math.floor(e.clientX - rect.left);
		mouseY =  Math.floor(e.clientY - rect.top);
      console.log('clicked!',cLock)
		if(mouseX>710 && mouseX <790){
          if(mouseY>10 && mouseY<48){          
  cx3.clearRect(710, 10, 80, 38);
  cx3.font = "12px Arial";
  cx3.fillText("SOUND", 710, 22);
  cx3.font = "Bold 24px Arial";
  cx3.fillText( mute, 730, 42);
  return false;
        }};
  //タップ操作を有効にした場合クリックイベントが反応してくれなかったため削除

if(gamestate==10 && loadstate >=loadmax){
  //メニュー画面へ
  if(pagestate==-1){
  pagestate=0;
  msgstate=1;
  msgtemp=1;
  se6.play();
  Cnext.alpha=0;
  tweeNstar.paused=true;
  stage.removeChild(Cstar);
  Gamestart();
  }
}};
//キー入力受付
window.addEventListener("keyup", keyupHandler, false);
  function keyupHandler(e) {
  if(e.keyCode==13){
  key13=0;//enter
  }
  if(e.keyCode==27){
  key27=0;//esc
  }
  if(e.keyCode==119){
    key119=0;//F8
  }
  }

  window.addEventListener("keydown", keyDownHandler, false);
	function keyDownHandler(e) {
    console.log(e.keyCode,e.key,cLock);
    var code = e.keyCode;
    //keyはString.fromCharCode(code)で取得
    if(cLock==0 && code !==27){
      return false;
    }
    if(e.keyCode==13 && key13==0){
      key13=1;//enter
      }
    if(e.keyCode==27 && key27==0){
      key27=1;//esc
      if(gamestate==0 && cLock){
        //メニューに戻る
        if(opLock==0){
          opLock=2;
          Dialogue("QUIT GAME？","ゲームを終了してリザルト画面に移動します",1,-1);
        }
      }
    }
    if(e.keyCode==119 && key119==0){
      key119=1;//esc
      if(gamestate==0 && cLock){
          //new game;
          if(opLock==0 && duelLog.length){
            opLock=2;
            Dialogue("NEW GAME？","このゲームを諦めて新しいゲームを始めます",2,-1);
          }
        }
      if(gamestate==1 && cLock){
        //次のゲームへ
        Gamestart();
      }
    }
    };
    function Dialogue(word,detail="　",yes=1,no=-1){
      Loadmap.removeAllChildren();
      Loadmap.alpha=1;
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(20,20,20,0.7)");
      shape.graphics.drawRect(0, 0, 800, 600);
      Loadmap.addChild(shape);
      var DL= new createjs.Bitmap("soL_dialogue.png");
      DL.scale=1.7;
      DL.x=190;
      DL.y=180;
      Loadmap.addChild(DL);
      var t=new createjs.Text(word,"bold 26px 'メイリオ'","black");
      t.x=245;
      t.y=200;
      Loadmap.addChild(t);
      var t=new createjs.Text(detail,"bold 18px 'メイリオ'","black");
      t.x=210;
      t.y=260;
      Loadmap.addChild(t);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#ff3838");
      shape.graphics.drawRect(220, 300, 120, 60);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {card:yes,handleEvent:DialogueResult});
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#3898ff");
      shape.graphics.drawRect(460, 300, 120, 60);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {card:no,handleEvent:DialogueResult});
      var t=new createjs.Text("YES","bold 24px 'メイリオ'","white");
      t.x=250;
      t.y=320;
      Loadmap.addChild(t);
      var t=new createjs.Text("NO","bold 24px 'メイリオ'","white");
      t.x=500;
      t.y=320;
      Loadmap.addChild(t);
      function DialogueResult(e){
        switch(this.card){
          case 1:
            //game over
            Gameover(1);
            break;
          case 2:
            Gamestart();
            break;
          case 3:
            retryswitch+=1;
            Gameretry();
            break;
          default:
            //no
            console.log(this.card);
            break;
        }
        Loadmap.alpha=0;
        opLock=0;
      }}
function Gameend(){
  //go to title;
  gamestate=10;
  Titleyard.alpha=1;
  clearBG.removeAllChildren();
  field.removeAllChildren();
  cx.clearRect(0,0,800,600)
  deckmap.removeAllChildren();
  if(mute="ON"){Bgm.stop();};
  musicnum=0;
}
function Gamestart(){
    gamestate=0;
    retryswitch=0;
    undocount=0;
    cLock=false;
    clearBG.removeAllChildren();
    field.removeAllChildren();
    cx.clearRect(0,0,800,600)
    cx2.clearRect(0,0,800,600)
    cx3.clearRect(0,0,800,600)
    startT = Date.now();
    yakumap.removeChild(yakumap_rule);
    switch(playMode[0]){
      case 1:
      //クロンダイク
      Card_src=Card_src_N.concat();
      yakumap_rule = new createjs.Bitmap("soL_rule1.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      Backyard.removeAllChildren();
      BG = new createjs.Bitmap("Don_bg2.png");
      BG.alpha=0.7;
      Backyard.addChild(BG);
      Backyard.alpha=1;
      cx.fillStyle='black';
      cx.fillRect(0,0,800,600);
      cards = new Array(52);
      for (var i = 0;  i < cards.length;  i++  ) {cards[i]=i+1}
      shuffle();
      //console.log(cards[0],cards[51]);
      duelLog=[];
      Cardlists=[[],[],[],[],[],[],[]]
      handsLog=cards.concat();
      hands = [
        cards.splice(0, 1),
        cards.splice(0, 2),
        cards.splice(0, 3),
        cards.splice(0, 4),
        cards.splice(0, 5),
        cards.splice(0, 6),
        cards.splice(0, 7),
      ]
      decks = cards.concat();
      Extras=[0,13,26,39];
      Exlists=[[],[],[],[]]
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
      newCard.x=50;
      newCard.y=5;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      //アニメーションを用意しておく
      //i列目のj行目でアクセスする
      var HashCard=i*100+j;
      newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
      }
    };
        break;
      case 2:
        //スパイダー
      Card_src=Card_src_S.concat();
      yakumap_rule = new createjs.Bitmap("soL_rule2.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      Backyard.removeAllChildren();
      BG = new createjs.Bitmap("Don_bg4.png");
      BG.alpha=0.7;
      Backyard.addChild(BG);
      Backyard.alpha=1;
      cx.fillStyle='black';
      cx.fillRect(0,0,800,600);
        cards = new Array(65);
        for (var i = 0;  i < cards.length;  i++  ) {
        //cards[i]=39+i%13+1;
        //裏側のカードは負にする
        cards[i]=-(i+1);
        };
        shuffle();
      duelLog=[];
      Cardlists=[[],[],[],[],[],[],[],[]]
      handsLog=cards.concat();
      hands = [
        cards.splice(0, 5),
        cards.splice(0, 5),
        cards.splice(0, 5),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 3),
        cards.splice(0, 3),
      ]
      decks = cards.concat();
      Extras=[0,0,0,0];
      Exlists=[[],[],[],[]]
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=690;
      newCard.y=407;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      }
    };
        break;
      case 3:
      //エルドリッチ
      Card_src=Card_src_M.concat();
      yakumap_rule = new createjs.Bitmap("soL_rule3.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      Backyard.removeAllChildren();
      BG = new createjs.Bitmap("Don_bg3.png");
      BG.alpha=0.7;
      Backyard.addChild(BG);
      Backyard.alpha=0.9;
      cx.fillStyle='black';
      cx.fillRect(0,0,800,600);
      cards = new Array(52);
      for (var i = 0;  i < cards.length;  i++  ) {cards[i]=i+1}
      shuffle();
      duelLog=[];
      Cardlists=[[],[],[],[]]
      Extras=[-1,-1,-1,-1];
      decks = [];
      Exlists=[[],[],[],[]];
      attacker=[[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
      Decklists=[];
      handsLog=cards.concat();
      hands = [
        cards.splice(0, 13),
        cards.splice(0, 13),
        cards.splice(0, 13),
        cards.splice(0, 13),
      ]
      //なるべく初手ゲームオーバーをなくすために最前,2列目に現れるモンスターは4体以下にしておく
      var T=0;
      for(var i=0;i<4;i++){
        if(Efuda(hands[i][hands[i].length-1])){
          T+=1;
        }
        if(Efuda(hands[i][hands[i].length-2])){
          T+=1;
        }
      }
      if(T>4){
        for(var i=0;i<4;i++){
        if(Efuda(hands[i][hands[i].length-1]) || Efuda(hands[i][hands[i].length-2])){
        var M=hands[i].findIndex(value=>!Efuda(value))
        if(M!==-1){
          var MM=hands[i].splice(M, 1)
          hands[i].splice(0, 0, MM[0])
          T-=1;
        }}
      }
      if(T<=4){break;}
      }
      for(var i=0;i<hands.length;i++){
        for(var j=0;j<hands[i].length;j++){
        var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
        newCard.x=680;
        newCard.y=425;
        field.addChild(newCard);
        Cardlists[i].push(newCard);
        //アニメーションを用意しておく
        //i列目のj行目でアクセスする
        var HashCard=i*100+j;
        if(!Efuda(hands[i][j])){
        newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
        newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
        newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
        }}
      };
        break;
    }
    printView();
    console.log('デュエル開始')  
  };
function Gameretry(){
  cLock=false;
  field.removeAllChildren();
  switch(playMode[0]){
    case 1:
    //クロンダイク
    Card_src=Card_src_N.concat();
    cards =handsLog.concat();
    duelLog=[];
    Cardlists=[[],[],[],[],[],[],[]]
    //handsLog=cards.concat();
    hands = [
      cards.splice(0, 1),
      cards.splice(0, 2),
      cards.splice(0, 3),
      cards.splice(0, 4),
      cards.splice(0, 5),
      cards.splice(0, 6),
      cards.splice(0, 7),
    ]
    decks = cards.concat();
    Extras=[0,13,26,39];
  for(var i=0;i<hands.length;i++){
    for(var j=0;j<hands[i].length;j++){
    var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
    newCard.x=50;
    newCard.y=5;
    field.addChild(newCard);
    Cardlists[i].push(newCard);
    //アニメーションを用意しておく
    //i列目のj行目でアクセスする
    var HashCard=i*100+j;
    newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
    newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
    newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
    }
  };
      break;
      case 2:
        //スパイダー
      Card_src=Card_src_S.concat();
      cards =handsLog.concat();
      duelLog=[];
      Cardlists=[[],[],[],[],[],[],[],[]]
      handsLog=cards.concat();
      hands = [
        cards.splice(0, 5),
        cards.splice(0, 5),
        cards.splice(0, 5),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 3),
        cards.splice(0, 3),
      ]
      decks = cards.concat();
      Extras=[0,0,0,0];
      Exlists=[[],[],[],[]];
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=690;
      newCard.y=425;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      //アニメーションを用意しておく
      //i列目のj行目でアクセスする
      var HashCard=i*100+j;
      newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
      }
    };
        break;
    case 3:
    //エルドリッチ
    Card_src=Card_src_M.concat();
    cards = handsLog.concat();
    duelLog=[];
    Cardlists=[[],[],[],[]]
    Extras=[-1,-1,-1,-1];
    decks = [];
    Exlists=[[],[],[],[]];
    attacker=[[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
    Decklists=[];
    handsLog=cards.concat();
    hands = [
      cards.splice(0, 13),
      cards.splice(0, 13),
      cards.splice(0, 13),
      cards.splice(0, 13),
    ]
    //なるべく初手ゲームオーバーをなくすために最前,2列目に現れるモンスターは4体以下にしておく
    var T=0;
    for(var i=0;i<4;i++){
      if(Efuda(hands[i][hands[i].length-1])){
        T+=1;
      }
      if(Efuda(hands[i][hands[i].length-2])){
        T+=1;
      }
    }
    if(T>4){
      for(var i=0;i<4;i++){
      if(Efuda(hands[i][hands[i].length-1]) || Efuda(hands[i][hands[i].length-2])){
      var M=hands[i].findIndex(value=>!Efuda(value))
      if(M!==-1){
        var MM=hands[i].splice(M, 1)
        hands[i].splice(0, 0, MM[0])
        T-=1;
      }}
    }
    if(T<=4){break;}
    }
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
      newCard.x=680;
      newCard.y=425;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      //アニメーションを用意しておく
      //i列目のj行目でアクセスする
      var HashCard=i*100+j;
      if(!Efuda(hands[i][j])){
      newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
      }}
    };
      break;
  }
  printView();
  console.log('デュエル開始')  
};
  function printView(){
    //シャッフルして描画するまで
    switch(playMode[0]){
      case 1:
        if(musicnum!==3){
          Bgm.stop();
          musicnum=3;
          if(mute="ON"){
          Bgm=new Music(bgm3data);
          Bgm.playMusic();
          }}
        cx.strokeStyle="white";
        for(var i=0;i<6;i++){
          if(i!==2){
          createRoundRect(74+90*i,5,80,128,5,cx);
          cx.stroke();
          }};
        for(var i=0;i<7;i++){
        createRoundRect(74+90*i,150,80,128,5,cx);
        cx.stroke();
        }
        var newCard = new createjs.Bitmap(Card_src[0]);
        newCard.x=50
        newCard.y=5
        newCard.alpha=0.3;
        newCard.addEventListener("click", {point:1,handleEvent:DeckReset});
        field.addChild(newCard);
        //deck
        var newCard = new createjs.Bitmap(Card_src[1]);
        newCard.x=50+3*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[14]);
        newCard.x=50+4*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[27]);
        newCard.x=50+5*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[40]);
        newCard.x=50+6*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        DeckReset();
        FirstAnimation();
        break;
        case 2:
          if(musicnum!==4){
            Bgm.stop();
            musicnum=4;
            if(mute="ON"){
            Bgm=new Music(bgm4data);
            Bgm.playMusic();
            }}
          cx.strokeStyle="white";
          for(var i=0;i<8;i++){
          createRoundRect(4+90*i,70,80,128,5,cx);
          cx.stroke();
          }
          var newCard = new createjs.Bitmap(Card_src[0]);
          newCard.x=690;
          newCard.y=425;
          newCard.alpha=0.3;
          //newCard.addEventListener("click", {point:1,handleEvent:DeckReset});
          field.addChild(newCard);
          for(var k=0;k<decks.length;k++){
            console.log(decks.length);
            var newCard = new createjs.Bitmap(Card_src[0]);
            newCard.x=690;
            newCard.y=425-k*0.5;
            field.addChild(newCard);
            Decklists.push(newCard); 
            newCard.addEventListener("click", {handleEvent:SpiderDeal});
          }
          FirstAnimation();
          break;  
        case 3:
        if(musicnum!==2){
        Bgm.stop();
        musicnum=2;
        if(mute="ON"){
        Bgm=new Music(bgm2data);
        Bgm.playMusic();
        }}
        cx.strokeStyle="white";
          for(var j=0;j<4;j++){
            createRoundRect(344+90*j,5,80,128,5,cx);
            cx.stroke();
            for(var i=0;i<3;i++){
          createRoundRect(74+90*i,5+140*j,80,128,5,cx);
          cx.stroke();
          }}
        var newCard = new createjs.Bitmap(Card_src_N[0]);
        newCard.x=680;
        newCard.y=425;
        newCard.alpha=0.7;
        field.addChild(newCard);
        for (var i=0;i<4;i++){
          var newCard = new createjs.Bitmap(Card_src_N[0]);
          newCard.x=50;
          newCard.y=5+140*i;
          newCard.alpha=0.7;
          field.addChild(newCard);
        }
        for (var i=0;i<4;i++){
          var newCard = new createjs.Bitmap(Card_src[0]);
          //uncaughtと出る？？
          newCard.alpha=0.7;
          newCard.x=230;
          newCard.y=5+140*i
          field.addChild(newCard);
          Closed[i]=newCard;
        }
        setTimeout(FirstAnimation,100);
        var E=0;
        for (var i=0;i<Exlists.length;i++){
          if(Exlists[i].length){
            E+=1;
          }
        }
        drawbuttom(580,450,"Monster "+E+"/4",1,120,40);
        drawbuttom(580,500,"討伐数 "+decks.length+"/16",1,120,40);
        break;
    }
  };
  function FirstAnimation(i=0,j=0){
    //console.log('first animation')
    //カードを配るように見せる
    switch(playMode[0]){
      case 1:
        var T = Cardlists[i][j];
      createjs.Tween.get(T)
      .to({x:50+i*(cardWidth+cardgapX),y:150+j*cardgapY,alpha:1},80)
      .call(nextcard);
        break;
      case 2:
        var T = Cardlists[i][j];
      createjs.Tween.get(T)
      .to({x:-20+i*(cardWidth+cardgapX),y:70+j*cardgapY,alpha:1},80)
      .call(nextcard);
        break;
      case 3:
        var T = Cardlists[i][j];
      createjs.Tween.get(T)
      .to({x:50+(i+3)*(cardWidth+cardgapX),y:5+j*cardgapY,alpha:1},80)
      .call(nextcard);
        break;
    }
    function nextcard(){
      switch(playMode[0]){
        case 1:
          se1.play();
          i+=1;
          if(i>6){
            j+=1;
            if(j>6){
              cLock=true;
              duelLog.push("start");
              return false;
            };
            i=j};
          FirstAnimation(i,j);
          break;
        case 2:
          se1.play();
          i+=1;
          if(j<3 && i>7){
            i=0;
            j+=1;
          }
          if(j==3 && i>5){
            i=0;
            j+=1;
          }
          if(j>3 && i>2){
              cLock=true;
              duelLog.push("start");
              CardTurn(-1);
              return false;
          }
          FirstAnimation(i,j);
          break;
        case 3:
          se1.play();
          i+=1;
          if(i>3){
            i=0;
            j+=1;
            if(j>12){
              //cLock=true;
              for (var k=0;k<4;k++){
                var T=Closed[k];
                var X = T.getBounds().width / 2;
                var Y = T.getBounds().height / 2;
                T.x=X+230;
                T.y=Y+5+140*k;
                T.regX = X;
                T.regY = Y;
              }
              setTimeout(monsterMove,300);
              duelLog.push("start");
              return false;
            }};
          FirstAnimation(i,j);
          break;
      }
    }
    };
  function SpiderDeal(event,i=0){
    if(i==0){
      if(!cLock){return false};
      cLock=false;
    };
    //配る
    //console.log('spiderdeal',i,hands[i]);
    if(!Decklists.length){
      cLock=true;
      var Ary=new Array(i).fill(0)
      duelLog.push({card:Ary,from:-1,to:i});
      CardTurn(-1);
      return false;
    };
    var T = Decklists.pop();
    var S = decks.pop();
    createjs.Tween.get(T)
    .to({x:-20+i*(cardWidth+cardgapX),y:70+(hands[i].length-1)*cardgapY,alpha:1},80)
    .call(Next);
    function Next(){
      field.removeChild(T);
      hands[i].push(S);
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=-20+i*(cardWidth+cardgapX);
      newCard.y=70+(hands[i].length-1)*cardgapY;
      field.addChild(newCard);
      Cardlists[i].push(newCard); 
      se1.play();
      i+=1;
      if(i>7){
        cLock=true;
        var Ary=new Array(i).fill(0)
        duelLog.push({card:Ary,from:-1,to:i});
        CardTurn(-1);
        return false;
    }
    SpiderDeal(event,i);
    }
  }
  function SpiderSet(){
    //A-Kまで揃ったら左下へ移動する
    var TM=0;
    var TR=-1;
    for(var i=0;i<hands.length;i++){
      if(hands[i].length>12){
        //少なくとも13枚以上ある列だけ評価の対象にする
        if(hands[i][hands[i].length-1]%13==1){
          TM=0;
      for(var j=hands[i].length-2;j>=0;j--){
        var A=hands[i][j]%13
        var B=hands[i][j+1]%13;
        if(A==0){A+=13};
        if(B==0){B+=13};
        if(A-B!==1){
          break;
        }
        TM+=1;
        }
      if(TM==12){
        TR=i;
        break;
      }
      }}
    }
    console.log(TM,TR);
      if(TR>=0){
        var TN=13;
        var Ary=hands[TR].slice(hands[TR].length-13,hands[TR].length);
        Cut();
      function Cut(){
      var T=Cardlists[TR].pop();
      hands[TR].pop();
      createjs.Tween.get(T)
      .to({x:-20+Extras[0]*(cardWidth+cardgapX),y:425},80)
      .call(Next);
      function Next(){
        field.removeChild(T);
        var newCard = new createjs.Bitmap(Card_src[0]);
        newCard.scale=0.9;
        newCard.x=-15+Extras[0]*(cardWidth+cardgapX);
        newCard.y=455+TN*0.5;
        TN-=1;
        field.addChild(newCard);
        Exlists[0].push(newCard);
        if(TN==0){
          Extras[0]+=1;
          CardTurn();
          duelLog.push({card:Ary,from:-2,to:TR})
          if(Extras[0]==5){
            Gameover();
          }
        }else{
          Cut();
        }
          return true;
      }};
    }
  };
  function disp(){
      clearT =Date.now();
    datet = parseInt((clearT - startT )/ 1000);
	hour = parseInt(datet / 3600);
	min = parseInt((datet / 60) % 60);
	sec = datet % 60;
	if(hour >99){hour =99}
    }
function shuffle(){
  for(var i =cards.length-1; i>0 ; i--){
  var r =Math.floor(Math.random()*(i+1));
  var temp = cards[i];
  cards[i] = cards[r]
  cards[r] = temp
}};
function compareFunc(a,b){return a-b;}
    function drawbuttom(x,y,word,type=0,w=80,z=40,R=1){
      //type->活性化時 Rを大きくすると文字の大きさを小さくします
      cx2.lineWidth = 2;
      if(type==0){
      cx2.strokeStyle="#68ceed";//水色
      cx2.fillStyle="#0080ff"//蒼
      }else{
      cx2.strokeStyle="#233237";
      cx2.fillStyle="#043342";
      }
      cx2.beginPath();
      cx2.moveTo(x+1,y+1);
      cx2.lineTo(x+w-2, y+1);
      cx2.lineTo(x+w-2, y+z-2);
      cx2.lineTo(x+1,y+z-2);
      cx2.lineTo(x+1,y+1);
      cx2.fill();
      cx2.fillStyle="#68ceed";
      cx2.stroke();
      cx2.beginPath();
      cx2.moveTo(x+1,y+1);
      cx2.lineTo(x+31, y+1);
      cx2.lineTo(x+1, y+11);
      cx2.lineTo(x+1,y+1);
      cx2.fill();
      cx2.fillStyle = "#ffffff";
      if(R==0){
        cx2.font = "28px 'メイリオ'";
        cx2.fillText(word,x+20,y+35)
        }else if(R==1){
      cx2.font = "16px 'メイリオ'";
      cx2.fillText(word,x+10,y+25)
        }
      //create
      Cbt=canvas2.toDataURL();
      Cbutton = new createjs.Bitmap(Cbt);
      field.addChild(Cbutton);
      var T=Cbtlist.pop();
      Cbtlist.push(Cbutton);
      createjs.Tween.get(T)
      .to({x:0,alpha:0},120)
      .call(TX);
      function TX(){field.removeChild(T);}
      }
    function createRoundRect(x, y, width, height, radius,context){
          context.beginPath();
          context.moveTo(x + radius, y);
          context.lineTo(x + width - radius, y);
          context.arcTo(x + width, y, x + width, y + radius, radius);
          context.lineTo(x + width, y + height - radius);
          context.arcTo(x + width, y + height, x + width - radius , y + height, radius);
          context.lineTo(x + radius, y + height); 
          context.arcTo(x, y + height, x, y + height - radius, radius);
          context.lineTo(x, y + radius);
          context.arcTo(x, y, x + radius, y, radius);
          context.closePath();
    };
    function Gameover(A=0){
      console.log('gameover');
      if(gamestate==0){
        cLock=false;
        gamestate=1;
        cx2.clearRect(0,0,800,600);
        field.removeChild(Cbutton)
        Cbt=canvas2.toDataURL();
        Cbutton = new createjs.Bitmap(Cbt);
        field.addChild(Cbutton);
        Cbtlist=[];
        Cbtlist.push(Cbutton);
        switch(A){
          case 1:
            //failed...
            var shape = new createjs.Shape();
            shape.graphics.beginFill("black");
            shape.graphics.drawRect(0, 0, 800, 600);
            shape.alpha=0;
            clearBG.addChild(shape);
            createjs.Tween.get(shape)
            .to({x:0,alpha:0.3},900)
            .wait(1000);
            clear_1.x=800;
            clear_1.y=0;
            clearBG.addChild(clear_1);
            createjs.Tween.get(clear_1)
            .to({x:0,alpha:1},300)
            .wait(1000)
            .call(nextgame)
            disp();
            Cstar.x=580;
            Cstar.y=50;
            Cstar.rotation=15;
            Cstar.scale=0.7
            tweeNstar.paused=true;
            clearBG.addChild(Cstar);
            var t=new createjs.Text("タイム","22px メイリオ","white");
            t.x=600;
            t.y=80;
            clearBG.addChild(t);
            var t=new createjs.Text(hour+":"+min+":"+sec,"36px メイリオ","white");
            t.x=610;
            t.y=105;
            clearBG.addChild(t);
            var t=new createjs.Text("undo "+undocount,"22px メイリオ","white");
            t.x=600;
            t.y=220;
            clearBG.addChild(t);
            if(retryswitch>0){
            var t=new createjs.Text("retry "+retryswitch,"22px メイリオ","white");
            t.x=600;
            t.y=250;
            clearBG.addChild(t);
            }
            switch(playMode[0]){
              case 1:
            cleared[1][playMode[0]-1]+=1;
            var t=new createjs.Text("card move","22px メイリオ","white");
            t.x=600;
            t.y=150;
            clearBG.addChild(t);
            var t=new createjs.Text(duelLog.length,"36px メイリオ","white");
            t.x=610;
            t.y=175;
            clearBG.addChild(t);
            break;
            case 2:
              cleared[1][playMode[0]-1]+=1;
              var t=new createjs.Text("set collection","22px メイリオ","white");
              t.x=600;
              t.y=150;
              clearBG.addChild(t);
              var t=new createjs.Text(Extras[0]+"/5","36px メイリオ","white");
              t.x=610;
              t.y=175;
              clearBG.addChild(t);
              break;
            case 3:
              cleared[1][playMode[0]-1]+=1;
              var t=new createjs.Text("enemy","22px メイリオ","white");
              t.x=600;
              t.y=150;
              clearBG.addChild(t);
              var t=new createjs.Text(Decklists.length+"/16","36px メイリオ","white");
              t.x=610;
              t.y=175;
              clearBG.addChild(t);
              break;
            }
            clear_4.x=-20;
            clear_4.y=-20;
            clear_4.alpha=0;
            clearBG.addChild(clear_4);
            createjs.Tween.get(clear_4)
            .wait(450)
            .to({x:20,alpha:1},300)
      
            break;
          default:
            clear_1.x=800;
            clear_1.y=0;
            clearBG.addChild(clear_1);
            createjs.Tween.get(clear_1)
            .to({x:0,alpha:1},300)
            clear_2.x=-100;
            clear_2.y=0;
            clear_2.alpha=0;
            clearBG.addChild(clear_2);
            createjs.Tween.get(clear_2)
            .to({x:0,alpha:1},300)
            .wait(1000)
            .call(nextgame)
            disp();
            Cstar.x=580;
            Cstar.y=50;
            Cstar.rotation=15;
            Cstar.scale=0.7
            tweeNstar.paused=true;
            clearBG.addChild(Cstar);
            var t=new createjs.Text("clear time","22px メイリオ","white");
            t.x=600;
            t.y=80;
            clearBG.addChild(t);
            var t=new createjs.Text(hour+":"+min+":"+sec,"36px メイリオ","white");
            t.x=610;
            t.y=105;
            clearBG.addChild(t);
            switch(playMode[0]){
              case 1:
                cleared[0][playMode[0]-1]+=1;
                cleared[1][playMode[0]-1]+=1;
            var t=new createjs.Text("card move","22px メイリオ","white");
            t.x=600;
            t.y=150;
            clearBG.addChild(t);
            var t=new createjs.Text(duelLog.length,"36px メイリオ","white");
            t.x=610;
            t.y=175;
            clearBG.addChild(t);
            break;
            case 2:
            var t=new createjs.Text("set collection","22px メイリオ","white");
            t.x=600;
            t.y=150;
            clearBG.addChild(t);
            var t=new createjs.Text(Extras[0]+"/5","36px メイリオ","white");
            t.x=610;
            t.y=175;
            clearBG.addChild(t);
            break;
            case 3:
              cleared[0][playMode[0]-1]+=1;
              cleared[1][playMode[0]-1]+=1;
              var t=new createjs.Text("enemy","22px メイリオ","white");
              t.x=600;
              t.y=150;
              clearBG.addChild(t);
              var t=new createjs.Text(Decklists.length+"/16","36px メイリオ","white");
              t.x=610;
              t.y=175;
              clearBG.addChild(t);
              break;
            }
            clear_3.x=0;
            clear_3.y=-20;
            clear_3.alpha=0;
            clearBG.addChild(clear_3);
            createjs.Tween.get(clear_3)
            .wait(450)
            .to({x:50,alpha:1},300)
            break;
        }
      function nextgame(){
        retry_bt.x=600;
        retry_bt.y=350;
        clearBG.addChild(retry_bt);
        retry_bt2.x=600;
        retry_bt2.y=400;
        clearBG.addChild(retry_bt2);
      cLock=true;
      }
    }};
};
