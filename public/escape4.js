//next　脱出
//やるきあれば→EXに挙げたカードを降ろす, 破片強打
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
var deckmap = new createjs.Container();
var field = new createjs.Container();//field
var clearBG = new createjs.Container();//clear画面
var yakumap = new createjs.Container();//ヒントボタン等
var Titleyard = new createjs.Container();//タイトル
var Roomyard = new createjs.Container();//おへや
var Itemyard = new createjs.Container();//インベントリ
var Backyard = new createjs.Container();//背景
var Configmap = new createjs.Container();//soundボタン・オプション等
var Loadmap = new createjs.Container();//ダイアログ
stage.addChild(Backyard);
stage.addChild(Roomyard);
stage.addChild(Itemyard);
stage.addChild(Titleyard);
stage.addChild(field);
stage.addChild(deckmap);
stage.addChild(clearBG);
stage.addChild(yakumap);
stage.addChild(Configmap);
stage.addChild(Loadmap);
Itemyard.x=100;
var tweeNroom=createjs.Tween.get(Roomyard,{loop:true})
.to({x:-6,y:-2,scale:1.01,alpha:1},2100)
.to({x:0,y:0,scale:1,alpha:1},2100);
tweeNroom.paused=true;
var Invcursor = new createjs.Shape();
Invcursor.graphics.beginStroke("#db4f37");
Invcursor.graphics.setStrokeStyle(3);
Invcursor.graphics.drawRect(0,0,64,64);
Invcursor.alpha=0;
//設定
var dragPointX;
var dragPointY;
var mute="ON"
var debugmode=true;//出荷時にfalseにする
var cLock=true;//true->操作可能
var opLock=0;
var mLock=true;//deckめくっている最中falseに
var pagestate=-1;
var pagelength=1;
var pagetemp=-1;
var msgstate=1;
var msglength=2;
var msgtemp=1;
var gamestate=-1;//-1:load中 10:title 11:title/2回目以降 100:menu 0:now playing 1:game over
var GamestartT = 0;//総プレイ時間計算用
var startT = 0;
var clearT = 0;
var hour = 0;
var min = 0;
var sec = 0;
var datet =0;
var key13=0;//enter
var key27=0;//esc
var key119=0;//F8
var muteshape;
//たいとるがめん待機
var shape = new createjs.Shape();
shape.graphics.beginFill("#3b7353");
shape.graphics.drawRect(0, 0, 800, 600); // 長方形を描画
Titleyard.addChild(shape); // 表示リストに追加
var BG = new createjs.Bitmap("soL_back.png");
BG.alpha=0.3;
Titleyard.addChild(BG);
//たいとるがめん
function Title(){
loadLocal();
var circle1 = new createjs.Shape();
circle1.graphics.beginFill("#2c4a3f")
.drawCircle(0, 0, 80);
circle1.x=230;
circle1.y=165;
Titleyard.addChild(circle1);
var circle2 = new createjs.Shape()
circle2.graphics.beginFill("#2c4a3f")
.drawCircle(0, 0, 80)
circle2.x=520;
circle2.y=165;
Titleyard.addChild(circle2);
var circle3 = new createjs.Shape();
circle3.graphics.beginFill("#4cb58b")
.drawCircle(0, 0, 80)
circle3.x=230;
circle3.y=165;
circle3.alpha=1;
Titleyard.addChild(circle3);
var circle4 = new createjs.Shape()
circle4.graphics.beginFill("#4cb58b")
.drawCircle(0, 0, 80)
circle4.x=520;
circle4.y=165;
circle4.alpha=1;
Titleyard.addChild(circle4);
if(mute=="OFF"){circle3.alpha=0;}else{circle4.alpha=0;};
var sound1 = new createjs.Bitmap("soL_sound1.png");
sound1.x=180;
sound1.y=120;
sound1.scale=1;
Titleyard.addChild(sound1);
var sound2 = new createjs.Bitmap("soL_sound2.png");
sound2.x=470;
sound2.y=120;
sound2.scale=1;
Titleyard.addChild(sound2);
var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car1.x=250;
Car1.y=280;
Car1.scale=2;
Titleyard.addChild(Car1);
var Car2list=[];
circle1.addEventListener("mouseover", {card:3,handleEvent:Soundcircle});
circle1.addEventListener("mouseout", {card:4,handleEvent:Soundcircle});
circle2.addEventListener("mouseover", {card:5,handleEvent:Soundcircle});
circle2.addEventListener("mouseout", {card:6,handleEvent:Soundcircle});
circle1.addEventListener("click", {card:1,handleEvent:Soundcircle});
circle2.addEventListener("click", {card:2,handleEvent:Soundcircle});
Car1.addEventListener("click", {card:0,handleEvent:GameReady});
titleCardTurn(0);
submitPass();
function Soundcircle(){
  switch(this.card){
    case 3:
      if(mute=="OFF"){
    circle3.alpha=0.3;
      }
      break;
    case 4:
      if(mute=="OFF"){
    circle3.alpha=0;
      }
    break;
    case 5:
      if(mute=="ON"){
    circle4.alpha=0.3;
      }
      break;
    case 6:
      if(mute=="ON"){
    circle4.alpha=0;
      }
    break;
    case 1:
      //soundをonにする
    if(mute=="OFF"){
    mute="ON";
    circle3.alpha=1;
    circle4.alpha=0;
    SEbuffer();
    Bgm.mute(false);
    se7.play();
    }
    break;
    case 2:
    //soundをoffにする
    if(mute=="ON"){
    mute="OFF";
    circle3.alpha=0;
    circle4.alpha=1;
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
    Bgm.mute(true);
    Bgm.stop();
    mute="OFF";
    }
    break;
  } 
}
function titleCardTurn(card){
  //カードめくる
  if(gamestate!==10 && gamestate!==11){
    return false;
  }
  if(card==0){
        if(Car2list){
          for(var i=0;i<Car2list.length;i++){
            var F=Car2list[i];
            Titleyard.removeChild(F); 
          }
        }
        var R=Math.floor(Math.random()*(Card_src_N.length-2))+1;
        var Car2 = new createjs.Bitmap(Card_src_N[R]);
        Car2.x=320;
        Car2.y=250;
        Car2.scale=2;
        Car2.alpha=0;
        Titleyard.addChild(Car2);
        Car2list.push(Car2);
        Car2.addEventListener("click", {card:0,handleEvent:GameReady});
        createjs.Tween.get(Car1)
        .to({y:290},50)
        .to({x:320,y:250,scaleX:0.05,scaleY:2.4},220)
        .to({alpha:0},10);
        createjs.Tween.get(Car2)
        .wait(50)
        .to({scaleX:0.05,scaleY:2.2},90)
        .to({x:250,y:280,scaleX:2,scaleY:2,alpha:1},220)
        .wait(2000)
        .call(titleCardTurn1);
  }else if(card==1){
    var Car2=Car2list.pop();
    createjs.Tween.get(Car1)
    .wait(50)
    .to({scaleX:0.05,scaleY:2.2},90)
    .to({x:250,y:280,scaleX:2,scaleY:2,alpha:1},220)
    .wait(2000)
    .call(titleCardTurn0);
    createjs.Tween.get(Car2)
    .to({y:290},50)
    .to({x:320,y:250,scaleX:0.05,scaleY:2.4},220)
    .to({alpha:0},10)
    .call(step);
    function step(){
      Titleyard.removeChild(Car2);
    }
  }
  function titleCardTurn0(){
    titleCardTurn(0);
  }
  function titleCardTurn1(){
    titleCardTurn(1);
  }
}
};
function SoLmap(){
  if(opLock==0){
    field.removeAllChildren();
    opLock=5;
    se11.play();
//ソリティア開始前の画面
var BG1 = new createjs.Bitmap("Don_bg2.png");
BG1.alpha=0;
field.addChild(BG1);
var BG2 = new createjs.Bitmap("Don_bg3.png");
BG2.alpha=0;
field.addChild(BG2);
var BG3 = new createjs.Bitmap("Don_bg4.png");
BG3.alpha=0;
field.addChild(BG3);
var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car1.x=-200;
Car1.y=100;
Car1.scale=3;
Car1.alpha=0.8;
field.addChild(Car1);
if(cleared[0][0]==0 || cleared[0][1]==0){
  var Car2 = new createjs.Bitmap("Card_images/BackColor_Closed.png");
}else{
  var Car2 = new createjs.Bitmap("Card_images/BackColor_Black.png");
}
Car2.x=-200;
Car2.y=100;
Car2.scale=3;
Car2.alpha=0.8;
field.addChild(Car2);
var Car3 = new createjs.Bitmap("Card_images/Spade12.png");
Car3.x=-20;
Car3.y=100;
Car3.scale=3;
Car3.alpha=0;
field.addChild(Car3);
var Car4 = new createjs.Bitmap("Card_images/Spade_M11.png");
Car4.x=450;
Car4.y=100;
Car4.scale=3;
Car4.alpha=0;
field.addChild(Car4);
var Car5 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car5.x=-200;
Car5.y=100;
Car5.scale=3;
Car5.alpha=0.8;
field.addChild(Car5);
var Car6 = new createjs.Bitmap("Card_images/Diamond01.png");
Car6.x=215;
Car6.y=100;
Car6.scale=3;
Car6.alpha=0;
field.addChild(Car6);
var Bt1 = new createjs.Bitmap("soL_rule_bt1.png");
Bt1.x=70;
Bt1.y=475;
Bt1.scale=1.2;
Bt1.alpha=0;
field.addChild(Bt1);
var Bt2 = new createjs.Bitmap("soL_rule_bt2.png");
Bt2.x=310;
Bt2.y=475;
Bt2.scale=1.2;
Bt2.alpha=0;
field.addChild(Bt2);
var Bt3 = new createjs.Bitmap("soL_rule_bt3.png");
Bt3.x=540;
Bt3.y=475;
Bt3.scale=1.2;
Bt3.alpha=0;
field.addChild(Bt3);
createjs.Tween.get(Car1)
.to({x:-20},400, createjs.Ease.backOut);
createjs.Tween.get(Car5)
.to({x:215},600, createjs.Ease.backOut);
createjs.Tween.get(Car2)
.to({x:450},800, createjs.Ease.backOut)
.call(SoLkey);
function SoLkey(){
Car1.addEventListener("mouseover", {card:1,handleEvent:MouseOver});
Car1.addEventListener("mouseout", {card:2,handleEvent:MouseOver});
Car1.addEventListener("click", {card:1,handleEvent:GameReady});
if(cleared[0][0]>0 && cleared[0][1]>0){
Car2.addEventListener("mouseover", {card:3,handleEvent:MouseOver});
Car2.addEventListener("mouseout", {card:4,handleEvent:MouseOver});
Car2.addEventListener("click", {card:3,handleEvent:GameReady});
}
Car5.addEventListener("mouseover", {card:5,handleEvent:MouseOver});
Car5.addEventListener("mouseout", {card:6,handleEvent:MouseOver});
Car5.addEventListener("click", {card:2,handleEvent:GameReady});
createjs.Tween.get(Bt1)
.to({alpha:1},200);
createjs.Tween.get(Bt2)
.to({alpha:1},200);
createjs.Tween.get(Bt3)
.to({alpha:1},200);
var option_bt5 = new createjs.Bitmap('soL_batu.png');
  option_bt5.x=700;
  option_bt5.y=60;
  option_bt5.scale=0.5;
  field.addChild(option_bt5)
  option_bt5.addEventListener("click", {card:10,handleEvent:GameReady});
  var shapeMask3 = new createjs.Shape();
shapeMask3.graphics
      .beginFill("gold")
      .drawRect(30, 53, 730, 480);
field.mask = shapeMask3;
createjs.Tween.get(BG1)
.to({alpha:0.8},60);
}
function MouseOver(e){
  switch(this.card){
    case 1:
      Car3.alpha=1;
      createjs.Tween.get(BG1)
      .to({alpha:0.8},200);
      createjs.Tween.get(BG2)
      .to({alpha:0},200);
      createjs.Tween.get(BG3)
      .to({alpha:0},200);
      break;
    case 2:
      Car3.alpha=0;
      break;
    case 3:
      Car4.alpha=1;
      createjs.Tween.get(BG1)
      .to({alpha:0},200);
      createjs.Tween.get(BG2)
      .to({alpha:0.8},200);
      createjs.Tween.get(BG3)
      .to({alpha:0},200);
      break;
    case 4:
      Car4.alpha=0;
      break;
    case 5:
      Car6.alpha=1;
      createjs.Tween.get(BG1)
      .to({alpha:0},200);
      createjs.Tween.get(BG2)
      .to({alpha:0},200);
      createjs.Tween.get(BG3)
      .to({alpha:0.8},200);
      break;
    case 6:
      Car6.alpha=0;
      break;
  }
};
}};
function SoLchara(){
  if(opLock==0){
    field.removeAllChildren();
    opLock=4;
    se11.play();
//プレイデータを参照する
var shapeMask3 = new createjs.Shape();
shapeMask3.graphics
      .beginFill("gold")
      .drawRect(0, 0, 800, 600);
field.mask = shapeMask3;
var BG2 = new createjs.Bitmap("Don_bg4.png");
BG2.alpha=0.9;
field.addChild(BG2);
var shape = new createjs.Shape();
shape.graphics
     .beginFill("black")
     .drawRect(30, 53, 730, 510);
shape.alpha=0.4;
field.addChild(shape);
var BG1 = new createjs.Bitmap("SoL_header2.png");
BG1.y=-8;
field.addChild(BG1);
var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car1.x=60;
Car1.y=230;
Car1.scale=2;
Car1.alpha=1;
Car1.rotation=8;
field.addChild(Car1);
var Car6 = new createjs.Bitmap("Card_images/Diamond01.png");
Car6.x=-20;
Car6.y=270;
Car6.scale=2;
Car6.alpha=1;
Car6.rotation=-8;
field.addChild(Car6);
createjs.Tween.get(Car1)
var option_bt5 = new createjs.Bitmap('soL_batu.png');
  option_bt5.x=700;
  option_bt5.y=60;
  option_bt5.scale=0.5;
  field.addChild(option_bt5)
  option_bt5.addEventListener("click", {card:10,handleEvent:GameReady});
//
var t = new createjs.Text("プレイデータ", "36px serif", "white");
t.x=360;
t.y=60;
field.addChild(t);
//var cleared=[[0,0,0,0,0,0],[0,0,0,0,0,0]];//ク/マ/エ クリア回数/ ク/マ/エ 挑戦回数の順 3-5番目は予備
var t = new createjs.Text("クロンダイク　"+cleared[0][0]+"回クリア/挑戦回数"+cleared[1][0]+"回", "24px serif", "white");
t.x=730;
t.y=120;
t.textAlign = "end";
field.addChild(t);
var t = new createjs.Text("マグマンタ　"+cleared[0][1]+"回クリア/挑戦回数"+cleared[1][1]+"回", "24px serif", "white");
t.x=730;
t.y=160;
t.textAlign = "end";
field.addChild(t);
var t = new createjs.Text("エリアノド防衛戦　"+cleared[0][2]+"回クリア/挑戦回数"+cleared[1][2]+"回", "24px serif", "white");
t.x=730;
t.y=200;
t.textAlign = "end";
field.addChild(t);
disp(GamestartT);
if(hour<10){hour="0"+hour};
if(min<10){min="0"+min};
var t = new createjs.Text("総プレイ時間　"+hour+"："+min, "24px serif", "white");
t.x=360;
t.y=240;
field.addChild(t);
var t = new createjs.Text("("+totalcardmove+")", "18px serif", "white");
t.x=110;
t.y=80;
field.addChild(t);
var T=achieve.filter(value=>value.cleared>0);
var t = new createjs.Text("実績", "24px serif", "white");
t.x=360;
t.y=280;
field.addChild(t);
var t = new createjs.Text("（"+T.length+"/"+achieve.length+"）", "20px serif", "white");
t.x=350;
t.y=310;
field.addChild(t);
for (var i=0;i<achieve.length;i++){
  var shape = new createjs.Shape();
shape.graphics
     .beginFill("black")
     .drawRect(430, 280+i*25, 300, 24);
shape.alpha=0.5;
field.addChild(shape);
  if(achieve[i].cleared==1){
var t = new createjs.Text(achieve[i].name, "20px serif", "white");
shape.addEventListener("mouseover", {card:i,handleEvent:AchieveDetail});
  }else{
var t = new createjs.Text("？？？", "20px serif", "white");
  }
t.x=440;
t.y=280+i*25;
field.addChild(t);
}};
var achieveAry=[];
function AchieveDetail(){
  switch(achieveAry.length){
    case 0:
    //テキストを追加する
    var t = new createjs.Text(achieve[this.card].name+"/"+achieve[this.card].sub, "20px serif", "white");
    t.x=80;
    t.y=540;
    field.addChild(t);
    achieveAry.push(t);
    break;
    case 1:
    //古いテキストを削除してテキストを追加する
    var T=achieveAry[0];
    field.removeChild(T);
    achieveAry=[];
  var t = new createjs.Text(achieve[this.card].name+"/"+achieve[this.card].sub, "20px serif", "white");
  t.x=80;
  t.y=540;
  field.addChild(t);
  achieveAry.push(t);
  break;
  default:
    return false;
    break;
}}
}
function GameReady(){
  if(this.card==0){
    console.log('go to main menu')
    menu(0);
    return true;
  }
  if(this.card==10){
    console.log('go to main menu')
    se11.play();
    field.removeAllChildren();
    opLock=0;
    Titleyard.alpha=1;
    return true;
  }
  playMode[0]=this.card;
  load2();
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
var Card_src_M= new Array('Card_images/BackColor_Closed.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade_M10.png','Card_images/Spade_M11.png','Card_images/Spade_M12.png','Card_images/Spade_M13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart_M10.png','Card_images/Heart_M11.png','Card_images/Heart_M12.png','Card_images/Heart_M13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club_M10.png','Card_images/Club_M11.png','Card_images/Club_M12.png','Card_images/Club_M13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond_M10.png','Card_images/Diamond_M11.png','Card_images/Diamond_M12.png','Card_images/Diamond_M13.png','Card_images/melon3.png')
var Card_src_S= new Array('Card_images/BackColor_Black.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1101.png','Card_images/Spider1201.png','Card_images/Spider1301.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1102.png','Card_images/Spider1202.png','Card_images/Spider1302.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1103.png','Card_images/Spider1203.png','Card_images/Spider1303.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1104.png','Card_images/Spider1204.png','Card_images/Spider1304.png',)
var Path_src=new Array("Card_images/soL_room_path9.png","Card_images/soL_room_path1.png","Card_images/soL_room_path2.png","Card_images/soL_room_path3.png","Card_images/soL_room_path4.png","Card_images/soL_room_path5.png","Card_images/soL_room_path6.png","Card_images/soL_room_path7.png","Card_images/soL_room_path8.png")
var Item_src=new Array("Card_images/BackColor_Black.png","Card_images/soL_coin.png","Card_images/soL_tomato.png","Card_images/soL_melon.png","Card_images/soL_pan.png","Card_images/soL_desert.png");
var ItemAry=[0];
var PathAry=[];
var playMode=[1,0];//[1]->additional option
var cards = [];
var hands = [];
var decks = [];//裏向きになっている山札
var deckfaces = [];//表向きになっている山札
var decksNow=0;//触れる山札
var decksNow2=0;//n枚めくった時の変化用
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
var achievetemp=[];//実績解放用
var melonList=[0,0];//[1]->0 1->マグマンタに出現 2->エリアノドに出現 
var achieve_Ten=0;
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
var cleared=[[0,0,0,0,0,0],[0,0,0,0,0,0]];//ク/マ/エ クリア回数/ ク/マ/エ 挑戦回数の順 3-5番目は予備
var highscore=[[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
]]
//実績
var achieve=[
  {name:"ファインダー",sub:"ソリティアをいずれかのモードで1回プレイする"},
  {name:"一件解決！",sub:"ソリティアをいずれかのモードで1回クリアする"},
  {name:"七転八起",sub:"いずれかのモードで7回以上リトライしてクリアする"},
  {name:"トレジャーハンター",sub:"「クロンダイク」を20回クリアする"},
  {name:"スーパーソニック",sub:"「クロンダイク」を2分30秒以内にクリアする"},
  {name:"極地のクモ",sub:"「マグマンタ」を10回クリアする"},
  {name:"迅速の英雄",sub:"「マグマンタ」を3分以内にクリアする"},
  {name:"エリアノド守護者",sub:"「エリアノド防衛戦」を5回クリアする"},
  {name:"天元突破",sub:"「エリアノド防衛戦」を山札間の移動回数3回以下でクリアする"},
  {name:"市街地保安官",sub:"「エリアノド防衛戦」でモンスターを150体以上討伐する"},
];
for(var i=0; i<achieve.length;i++){
  achieve[i].id=i;
  achieve[i].cleared=0;
}
//アイテム cleared -1->使用後, 1~所持数
var inventory=[
  {name:"トランプ",sub:"孤独なリティアのために狭間がつくってくれた、絵札に色々なキャラクターが描かれたトランプ。（ソリティアをプレイすることができる）"},
  {name:"勝負師のコイン",sub:"金色に光るコイン。"},
  {name:"キュアトマト",sub:"ジョイが育てていたトマト。"},
  {name:"極上メロン",sub:"洞窟で採れるメロン。"},
  {name:"冬の森の鍋",sub:"ジョイが使っていた調理用のお鍋。"},
  {name:"スイートポンチ",sub:"身体の抵抗力を上げる効果があるデザート。"},
  {name:"ピッケル-プロトver.",sub:"狭間からの脱出に成功した証。（装備すると、追加ルールでソリティアをプレイすることができる）"},
];
for(var i=0; i<inventory.length;i++){
  inventory[i].id=i;
  inventory[i].cleared=0;
}
inventory[0].cleared=1;
var equipeditem=-1;
var playtime=0;
var totalcardmove=0;
var defeatedmonster=0;
var UserData_SoL = {
  "Name":"SoL_ch",
  "Mute":mute,
  "Volume": vBar,
  "SEVolume": sBar,
  "cleared":[[0,0,0,0,0,0],[0,0,0,0,0,0]],
  "Achieve":achieve,
  "Inventory":inventory,
  "Playtime":playtime,
  "Monster":defeatedmonster,
  "Totalcardmove":totalcardmove,
  "highscore":[[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ],[
    {time:-1,score:-1},
    {time:-1,score:-1},
    {time:-1,score:-1},
  ]]
};
function saveLocal(){
  //セーブする
  try{
playtime+=Date.now()-GamestartT;
UserData_SoL = {
  "Name":"SoL_ch",
  "Mute":mute,
  "Volume": vBar,
  "SEVolume": sBar,
  "Cleared":cleared,
  "Highscore":highscore,
  "Achieve":achieve,
  "Inventory":inventory,
  "Playtime":playtime,
  "Totalcardmove":totalcardmove,
  "Monster":defeatedmonster,
};
console.log(UserData_SoL);
PopAnm("セーブしました");
localStorage.setItem('UserData_SoL', JSON.stringify(UserData_SoL));
  }catch(e){
    console.log('ねこ')
  }
}
function loadLocal(){
  //ロードする
  try{
var getdata; // 読込むデータ
getdata = JSON.parse(localStorage.getItem('UserData_SoL'));
vBar=getdata.Volume;
sBar=getdata.SEVolume;
cleared=getdata.Cleared.concat();
playtime=getdata.Playtime;
totalcardmove=getdata.Totalcardmove;
defeatedmonster=getdata.Monster;
//追加データ部分　undefinedなら初期値にしておく
//if (mpVelocity === void 0) {mpVelocity=1;}
for(var i=0; i<getdata.Achieve.length; i++){
  var A=achieve.findIndex(value=>value.name==getdata.Achieve[i].name);
  if(A!==-1){
    achieve[A].cleared=getdata.Achieve[i].cleared;
  }
}
for(var i=0; i<getdata.Inventory.length; i++){
  var A=inventory.findIndex(value=>value.name==getdata.Inventory[i].name);
  if(A!==-1){
    inventory[A].cleared=getdata.Inventory[i].cleared;
  }
}
highscore=getdata.Highscore.concat();
SEbuffer();
PopAnm("データロード完了",800,200);
  }catch(e){
    console.log('ねこ')
  }
}
function saveDel(){
  //デフォルトに戻す
vBar=1;
sBar=1;
cleared=[[0,0,0,0,0,0],[0,0,0,0,0,0]];
highscore=[[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
],[
  {time:-1,score:-1},
  {time:-1,score:-1},
  {time:-1,score:-1},
]]
for(var i=0; i<achieve.length;i++){
  achieve[i].cleared=0;
}
GamestartT=0;
//shut down
Bgm.stop();
musicnum=0;
Titleyard.removeAllChildren();
Configmap.removeAllChildren();
Titleyard.addChild(t);
var shape = new createjs.Shape();
shape.graphics.beginFill("#3b7353");
shape.graphics.drawRect(0, 0, 800, 600); // 長方形を描画
Titleyard.addChild(shape); // 表示リストに追加
var BG = new createjs.Bitmap("soL_back.png");
BG.alpha=0.3;
Titleyard.addChild(BG);
var t = new createjs.Text("Click Card to START", "24px serif", "white");
Titleyard.addChild(t);
gamestate=10;
  try{
    localStorage.removeItem('UserData_SoL')
    console.log('localStorage cleared');
    Title();
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
  se10.volume(0.2*sBar);
  se11.volume(0.4*sBar);
  se12.volume(0.2*sBar);
  se13.volume(0.12*sBar);
  se14.volume(0.3*sBar);
  se15.volume(0.2*sBar);
  se16.volume(0.4*sBar);
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
  src:"006_se_kira6.mp3",
      volume: 0.2,
  });
var se11 = new Howl({
  src:"count_single.mp3",
      volume: 0.4,
  });
var se12 = new Howl({
  src:"004_se_kira4.mp3",
      volume: 0.2,
  });
var se13 = new Howl({
    src:"Enter.mp3",
    volume: 0.12,
    });
var se14 = new Howl({
  src:"button25.mp3",
      volume: 0.3,
  });
var se15 = new Howl({
  src:"unlocking-1.mp3",
      volume: 0.2,
  });
var se16 = new Howl({
  src:"door-close.mp3",
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
  const bgm5data ={
    src: "PerituneMaterial_Daybreak.mp3",
    loopStart: 0,
    loopEnd: 96500,
    volume: 0.1,
  };
var Bgm=new Music(bgm1data);
var musicnum=0;
var Barlist=[];//soundconfigで使用
function menu(state=0){
  //メイン画面
  if(musicnum!==5){
    Bgm.stop();
    musicnum=5;
    if(mute=="ON"){
    Bgm=new Music(bgm5data);
    Bgm.playMusic();
    }}
  switch(state){
    case 0:
      //タイトルから訪れた時はここ
      opLock=2;
      Titleyard.removeAllChildren();
      Roomyard.removeAllChildren();
      se6.play();
      if(playtime!==0){gamestate=11};
      GamestartT=Date.now();
      if(gamestate==10 || gamestate==11){
      gamestate+=89;
      };
      //オプションボタン
      SoundConfig(0,-1);
      //部屋
      var BG = new createjs.Bitmap("Don_bg2.png");
      BG.alpha=0.7;
      Roomyard.addChild(BG);
      var Room = new createjs.Bitmap("Card_images/soL_room.png");
      Roomyard.addChild(Room);
      var Table = new createjs.Bitmap("Card_images/soL_room_table.png");
      Roomyard.addChild(Table);
      var Path = new createjs.Bitmap("Card_images/soL_room_path.png");
      Path.x=-80;
      Path.y=-67;
      Roomyard.addChild(Path);
      var Letter = new createjs.Bitmap("Card_images/soL_room_letter.png");
      Letter.scale=600/768;
      Letter.y=-50;
      Letter.alpha=0;
      Roomyard.addChild(Letter);
      var Map = new createjs.Bitmap("Card_images/soL_room_map.png");
      Map.scale=600/768;
      Roomyard.addChild(Map);
      var Vase = new createjs.Bitmap("Card_images/soL_room_kabin.png");
      Vase.scale=600/768;
      Roomyard.addChild(Vase);
      var Box = new createjs.Bitmap("Card_images/soL_room_box.png");
      Box.scale=600/768;
      Roomyard.addChild(Box);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(0,0,0,0.7)");
      shape.graphics.drawRect(0, 0, 800, 600);
      Roomyard.addChild(shape);
      var MapA = new createjs.Bitmap("Card_images/soL_room_mapA.png");
      MapA.scale=600/768;
      MapA.alpha=0;
      Roomyard.addChild(MapA);
      var TableA = new createjs.Bitmap("Card_images/soL_room_tableA.png");
      TableA.scale=600/768;
      TableA.alpha=0;
      Roomyard.addChild(TableA);
      var VaseA = new createjs.Bitmap("Card_images/soL_room_kabinA.png");
      VaseA.scale=600/768;
      VaseA.alpha=0;
      Roomyard.addChild(VaseA);
      var BoxA = new createjs.Bitmap("Card_images/soL_room_boxA.png");
      BoxA.scale=600/768;
      BoxA.alpha=0;
      Roomyard.addChild(BoxA);
      for(var i=0;i<Path_src.length;i++){
        var P = new createjs.Bitmap(Path_src[i]);
        P.x=-80;
        P.y=-67;
        PathAry.push(P)
        Roomyard.addChild(P);
      }
      var Header1 = new createjs.Bitmap("soL_header1.png");
      Header1.x=480;
      Header1.scale=0.7;
      Titleyard.addChild(Header1);
      var Header2 = new createjs.Bitmap("soL_header2.png");
      Header2.y=-8;
      Titleyard.addChild(Header2);
      var Opicon = new createjs.Bitmap("soL_opicon.png");
      Opicon.x=730;
      Opicon.y=540;
      Titleyard.addChild(Opicon);
      var Opicon2 = new createjs.Bitmap("soL_opicon2.png");
      Opicon2.x=670;
      Opicon2.y=540;
      Titleyard.addChild(Opicon2);
      if(gamestate==99){
        Room.x=-40;
        Room.y=-30;
        Table.x=-40;
        Table.y=-30;
        createjs.Tween.get(shape)
        .to({alpha:0.3},2000);
        createjs.Tween.get(Letter)
        .to({alpha:1},2000);
        createjs.Tween.get(Room)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut);
        createjs.Tween.get(Table)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        .call(mainstep)  
        }else{
        opLock=0;
        Room.x=-60;
        Room.y=-40;
        Room.scale=630/768;
        Table.x=-60;
        Table.y=-40;
        Table.scale=630/768;
        createjs.Tween.get(shape)
        .to({alpha:0.3},500);
        createjs.Tween.get(Letter)
        .to({alpha:1},500);
        createjs.Tween.get(Room)
        .to({x:0,y:0,scale:600/768,alpha:1},600, createjs.Ease.backOut);
        createjs.Tween.get(Table)
        .to({x:0,y:0,scale:600/768,alpha:1},600, createjs.Ease.backOut)
        .call(mainstep)    
        };
      createjs.Tween.get(Path,{loop:true})
      .to({x:-83,y:-64,alpha:0.7},3000, createjs.Ease.backInOut)
      .to({x:-85,y:-68,alpha:0.9},3000, createjs.Ease.backInOut)
      .to({x:-83,y:-70,alpha:0.7},3000, createjs.Ease.backInOut)
      .to({x:-80,y:-67,alpha:1},3000);
      for(var i=0;i<PathAry.length;i++){
        var P = PathAry[i];
        if(totalcardmove>=(100+25*i)*i){P.alpha=1}else{P.alpha=0};
        createjs.Tween.get(P,{loop:true})
        .to({x:-83,y:-64,alpha:0.8*P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-85,y:-68,alpha:P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-83,y:-70,alpha:0.7*P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-80,y:-67,alpha:P.alpha},3000);
      };
      function mainstep(){
      InvConfig(0);
      tweeNroom.paused=false;
      Titleyard.addChild(Letter);
      createjs.Tween.get(Letter,{loop:true})
      .to({x:0,y:-54,alpha:0.9},2100)
      .to({x:0,y:-50,alpha:1},2100);
      Table.addEventListener("mouseover", {card:1,handleEvent:Tablecross});
      TableA.addEventListener("mouseout", {card:2,handleEvent:Tablecross});
      Table.addEventListener("click", {handleEvent:SoLmap});
      TableA.addEventListener("click", {handleEvent:SoLmap});
      Map.addEventListener("mouseover", {card:1,handleEvent:Mapcross});
      MapA.addEventListener("mouseout", {card:2,handleEvent:Mapcross});
      Map.addEventListener("click", {card:3,handleEvent:Mapcross});
      MapA.addEventListener("click", {card:3,handleEvent:Mapcross});
      Vase.addEventListener("mouseover", {card:1,handleEvent:Vasecross});
      VaseA.addEventListener("mouseout", {card:2,handleEvent:Vasecross});
      Vase.addEventListener("click", {card:3,handleEvent:Vasecross});
      VaseA.addEventListener("click", {card:3,handleEvent:Vasecross});
      Box.addEventListener("mouseover", {card:1,handleEvent:Boxcross});
      BoxA.addEventListener("mouseout", {card:2,handleEvent:Boxcross});
      Box.addEventListener("click", {card:3,handleEvent:Boxcross});
      BoxA.addEventListener("click", {card:3,handleEvent:Boxcross});
      Opicon.addEventListener("click", {handleEvent:OptionConfig});
      Opicon2.addEventListener("click", {handleEvent:InvConfig});
      Header2.addEventListener("click", {handleEvent:SoLchara})
      if(gamestate==99){
        Dialogue("遊び方","テーブルをクリックしてソリティアを始める",-1,-1,0);
        };
      gamestate=100;
      function Tablecross(){
        if(this.card==1){TableA.alpha=1;
          }else{TableA.alpha=0;
        }};
      function Mapcross(){
        switch(this.card){
         case 1:
           MapA.alpha=1;
          break;
         case 2:
          MapA.alpha=0;
          break;
          case 3:
            if(opLock==0){
          opLock=6;
          se11.play();
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          var Map2 = new createjs.Bitmap("Card_images/soL_room_map2.png");
          Map2.scale=0.684;
          //Map2.x=0;
          Map2.y=25;
          field.addChild(Map2);
          var option_bt5 = new createjs.Bitmap('soL_batu.png');
          option_bt5.x=660;
          option_bt5.y=50;
          option_bt5.scale=0.4;
          field.addChild(option_bt5);
          option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
            }
            break;
          case 4:
            opLock=0;
            se11.play();
            field.removeAllChildren();
            break;
        }
      }
      function Boxcross(){
        switch(this.card){
         case 1:
          BoxA.alpha=1;
          break;
         case 2:
          BoxA.alpha=0;
          break;
          case 3:
          if(opLock==0){
          opLock=6;
          se11.play();
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          var Box2 = new createjs.Bitmap("Card_images/soL_room_box2.png");
          Box2.scale=0.8;
          field.addChild(Box2);
          Box2.addEventListener("click", {card:5,handleEvent:Boxcross});
          var option_bt5 = new createjs.Bitmap('soL_batu.png');
          option_bt5.x=660;
          option_bt5.y=50;
          option_bt5.scale=0.4;
          field.addChild(option_bt5);
          option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
            break;
          case 4:
            opLock=0;
            se11.play();
            field.removeAllChildren();
            break;
          case 5:
            if(equipeditem==1 || inventory[1].cleared==-1){
            equipeditem=-1;
            inventory[1].cleared=-1;
            InvConfig(0);
            se15.play();
            field.removeAllChildren();
            var Box4 = new createjs.Bitmap("Card_images/soL_room_box4.png");
            Box4.scale=0.8;
            field.addChild(Box4);
            if(inventory[4].cleared==0){
              var Box3 = new createjs.Bitmap("Card_images/soL_room_box3.png");
              Box3.scale=0.8;
              field.addChild(Box3);
              Box3.addEventListener("click", {card:6,handleEvent:Boxcross});
            }
            var option_bt5 = new createjs.Bitmap('soL_batu.png');
            option_bt5.x=700;
            option_bt5.y=50;
            option_bt5.scale=0.4;
            field.addChild(option_bt5);
            option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
            return false;
            }
            if(inventory[4].cleared!==0){
              field.removeAllChildren();
              se15.play();
              var Box4 = new createjs.Bitmap("Card_images/soL_room_box4.png");
              Box4.scale=0.8;
              field.addChild(Box4);
              var option_bt5 = new createjs.Bitmap('soL_batu.png');
              option_bt5.x=660;
              option_bt5.y=50;
              option_bt5.scale=0.4;
              field.addChild(option_bt5);
              option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
            }else{
              se16.play();
            }
            break;
            case 6:
            if(inventory[4].cleared==0){
            IK('冬の森の鍋')
            field.removeAllChildren();
            var Box4 = new createjs.Bitmap("Card_images/soL_room_box4.png");
            Box4.scale=0.8;
            field.addChild(Box4);
            var option_bt5 = new createjs.Bitmap('soL_batu.png');
            option_bt5.x=660;
            option_bt5.y=50;
            option_bt5.scale=0.4;
            field.addChild(option_bt5);
            option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
            }
            break;
        }
      }
      function Vasecross(){
        switch(this.card){
         case 1:
           VaseA.alpha=1;
          break;
         case 2:
          VaseA.alpha=0;
          break;
          case 3:
            if(opLock==0){
          IK('キュアトマト')}
            break;
        }
      }
      };
      break;
      case 1:
      //ゲーム終了後はここ
      Roomyard.alpha=1;
      tweeNroom.paused=false;
      if(cleared[0][2]==0){
        totalcardmove=0;
        }
        //実績解放
        var A=cleared[1].findIndex(value=>value>0);
        if(A!==-1){
          AK("ファインダー");
        };
        var A=cleared[0].findIndex(value=>value>0);
        if(A!==-1){
          AK("一件解決！");
        };
        if(cleared[0][0]>=20){
          AK("トレジャーハンター");
        };
        if(cleared[0][1]>=10){
          AK("極地のクモ");
        };
        if(cleared[0][2]>=5){
          AK("エリアノド守護者");
        };
        if(achievetemp.length){
        for (var i=0;i<achievetemp.length;i++){
            AK(achievetemp[i]);
          };
          achievetemp=[];
        };
        for(var i=0;i<PathAry.length;i++){
          var P = PathAry[i];
          if(totalcardmove>=(100+25*i)*i){P.alpha=1}else{P.alpha=0};
        };
        saveLocal();
        break;
  }
};
function load2(){
  if(opLock!==5){return false;}
  Titleyard.alpha=0;
  tweeNroom.paused=true;
  Roomyard.alpha=0;
  if(ItemAry[0]==1){
  createjs.Tween.get(Itemyard)
  .to({x:100},150, createjs.Ease.backOut)
  ItemAry[0]=0;
  }
  var shapeMask3 = new createjs.Shape();
  shapeMask3.graphics
        .beginFill("gold")
        .drawRect(0, 0, 800, 600);
  field.mask = shapeMask3;
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
  opLock=0;
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
        {src:'Card_images/Diamond01.png'},{src:'Card_images/Diamond02.png'},{src:'Card_images/Diamond03.png'},{src:'Card_images/Diamond04.png'},{src:'Card_images/Diamond05.png'},{src:'Card_images/Diamond06.png'},{src:'Card_images/Diamond07.png'},{src:'Card_images/Diamond08.png'},{src:'Card_images/Diamond09.png'},{src:'Card_images/Diamond10.png'},{src:'Card_images/Diamond11.png'},{src:'Card_images/Diamond12.png'},{src:'Card_images/Diamond13.png'},
        {src:'Card_images/Spider1101.png'},{src:'Card_images/Spider1201.png'},{src:'Card_images/Spider1301.png'},{src:'Card_images/Spider1102.png'},{src:'Card_images/Spider1202.png'},{src:'Card_images/Spider1302.png'},{src:'Card_images/Spider1103.png'},{src:'Card_images/Spider1203.png'},{src:'Card_images/Spider1303.png'},{src:'Card_images/Spider1104.png'},{src:'Card_images/Spider1204.png'},{src:'Card_images/Spider1304.png'},
        {src:'Card_images/Card_Spore.png'},{src:'Card_images/Spade_M10.png'},{src:'Card_images/Spade_M11.png'},{src:'Card_images/Spade_M12.png'},{src:'Card_images/Spade_M13.png'},{src:'Card_images/Heart_M10.png'},{src:'Card_images/Heart_M11.png'},{src:'Card_images/Heart_M12.png'},{src:'Card_images/Heart_M13.png'},{src:'Card_images/Club_M10.png'},{src:'Card_images/Club_M11.png'},{src:'Card_images/Club_M12.png'},{src:'Card_images/Club_M13.png'},{src:'Card_images/Diamond_M10.png'},{src:'Card_images/Diamond_M11.png'},{src:'Card_images/Diamond_M12.png'},{src:'Card_images/Diamond_M13.png'},
        {src:'soL_back.png'},{src:'Don_bg2.png'},{src:'Don_bg3.png'},{src:'Don_bg4.png'},{src:'soL_dialogue.png'},{src:'soL_chara1.png'},{src:'soL_chara2.png'},
        {src:'Card_images/soL_room.png'},{src:'Card_images/soL_room_path.png'},{src:'Card_images/soL_room_table.png'},{src:'Card_images/soL_room_map2.png'},{src:'Card_images/soL_room_Path9.png'},
        {src:'soL_rule1.png'},{src:'soL_rule2.png'},{src:'soL_rule3.png'},{src:'soL_rule3_2.png'},{src:'soL_rule2.png'},{src:'soL_rule3.png'},{src:'soL_rule3_2.png'},
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
  Loadmap.removeAllChildren();
  var Rate=Math.floor(progress*100);
  var load = new createjs.Text("Now loading..."+Rate+"%", "24px serif", "white");
  load.y=30;
  Loadmap.addChild(load);
}
function handleFileLoadComplete(event) {
  // 読み込んだファイル
  var result = event.result;
}
function handleComplete() {
  console.log("LOAD COMPLETE");
  Loadmap.removeAllChildren();
  var t = new createjs.Text("ver0.994/Click Card to START", "24px serif", "white");
  Titleyard.addChild(t);
  var t = new createjs.Text("音の設定ができます。（あとから変更可能）", "24px serif", "white");
  t.y=30;
  Titleyard.addChild(t);
  gamestate=10;
  Title();
}

createjs.Ticker.addEventListener("tick", UpdateParticles);
function UpdateParticles(event){
  updateParticles();
  if(gamestate==0){yakumap_hint.alpha=1}else{yakumap_hint.alpha=0};
  if(gamestate==0 && duelLog.length){yakumap_solve.alpha=1}else{yakumap_solve.alpha=0};
  if(gamestate==0 && duelLog.length>1 && (playMode[0]==1 || (playMode[0]==2 && playMode[1]==0))){yakumap_undo.alpha=1;}else{yakumap_undo.alpha=0;}
  if(gamestate==0 && duelLog.length){yakumap_reset.alpha=1;}else{yakumap_reset.alpha=0;}
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
  se11.play();
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
      if(debugmode){
        console.log(Ary);
        console.log(Ary.card,Ary.card[0]);
      }
      //-1 Deck 10- Ex
          for(var i=0;i<Ary.card.length;i++){
            var T=Ary.card[i];
            switch(Ary.from){
              case -2:
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
                break;
              case -1:
                  //ウラ
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
                  if(S==-100){
                    decks.push(S)
                  }else{
                  decks.push(-S);
                  };
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
                if(playMode[1]==1 && T==-100){
                  var newCard = new createjs.Bitmap('Card_images/Card_Spore.png');
                }else{
                var newCard = new createjs.Bitmap(Card_src[T]);
                }
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
    se11.play();
    Dialogue("RETRY？","同じ盤面を最初からやり直します",3,-1);
  }
}
function solveButton(event){
  if(cLock){
  //new game;
  if(opLock==0){
    opLock=2;
    se11.play();
    Dialogue("NEW GAME？","この盤面を放棄して新しいゲームを始めます",1,-1);
  }
}}
function DeckReset(p=0,point=0,X=0){
  console.log('deckreset',decks[0],p,point)
  if(p!==0 && X==0){
    //pがクリックイベントの場合
    p=this.point;
    decksNow2=0;
    if(!cLock || opLock!==0){return false};
  };
  cLock=false;
  switch(p){
  case 0:
    deckmap.removeAllChildren();
    decksNow=0;
    decksNow2=0;
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
      //山札のカードは負+カード数とする
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
    if(!decks.length){
      if(deckfaces.length){
      se4.play();
      DeckReset(0);
      }
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
    .to({x:140+point*15},100)
    .call(step);
    function step(){
      point+=1;
      decksNow+=1;
      decksNow2+=1;
      se2.play();
      console.log(p);
      if(point>=p || !decks.length){
        //end
        drawbuttom(10,50,decks.length,1,50,40);
        mLock=true;
        cLock=true;
        return true;
      }else{
        cLock=true;
        DeckReset(p,point,1);
      }
      //次のカードへ
    }
    break;
  }
  };
function CardTurn(p=0){
  //カードめくり@スパイダー
      for(var i=0;i<Cardlists.length;i++){
        if(hands[i][hands[i].length-1]<0 && hands[i][hands[i].length-1]!==-100){
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
          if(playMode[0]==1){
          duelLog.push({card:Ary,from:-2,to:i})
          }else if(playMode[0]==2){
          duelLog.push({card:Ary,from:-1,to:i})
          }
        }
      }}
  function step(){
    field.removeChild(T);
  }
}
function monsterMove(){
  //エルドリッチモード　最前列のモンスターカードを移動
  //cLock=false;
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
  for(var i=0;i<4;i++){
    //console.log(hands[i][hands[i].length-1],Efuda(hands[i][hands[i].length-1]));
    if(Efuda(hands[i][hands[i].length-1])){
      //移動する
      //移動先に追加する
      var Els=Extras.findIndex(value=>value==-1);
      if(Els==-1){
        //モンスターゾーンがすべて埋まっている
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
  var E=0;
  for (var i=0;i<Exlists.length;i++){
    if(Exlists[i].length){
      E+=1;
    }};
  drawbuttom(580,450,"Monster "+E+"/4",1,120,40);
  drawbuttom(580,500,"討伐数 "+Decklists.length+"/16",1,120,40);
  if((E==4 || E==16-Decklists.length)&& musicnum!==1){
    musicnum=1;
    Bgm.stop();
    if(mute=="ON"){
    Bgm=new Music(bgm1data);
    Bgm.playMusic();
    }
  };
  if(Decklists.length==16){
    //残ったカードにボーナスアニメーション
    for(var i=0;i<4;i++){
      if(attacker[i][0]!==-1){
        var T=Atklists[i][0];
        var A=attacker[i][0]%13;
        if(A==0){A+=13}
        if(A==1){A+=15};
        var t = new createjs.Text("+"+A*50, "20px bold serif", "orange");
        t.x=T.x+15;
        t.y=T.y+40;
        t.alpha=0;
        field.addChild(t);
        createjs.Tween.get(t)
        .wait(i*50)
        .to({y:T.y-10,alpha:1},100, createjs.Ease.backOut)
      }
      if(attacker[i][1]!==-1){
        var T=Atklists[i][1];
        var A=attacker[i][1]%13;
        if(A==0){A+=13}
        if(A==1){A+=15};
        var t = new createjs.Text("+"+A*50, "20px bold serif", "orange");
        t.x=T.x+15;
        t.y=T.y+40;
        t.alpha=0;
        field.addChild(t);
        createjs.Tween.get(t)
        .wait(i*50)
        .to({y:T.y-10,alpha:1},100, createjs.Ease.backOut)
      }
    };
    for(var i=0;i<4;i++){
      if(hands[i].length){
        for(var j=0;j<hands[i].length;j++){
          var T=Cardlists[i][j];
        var A=hands[i][j]%13;
        if(A==0){A+=13}
        if(A==1){A+=15};
        var t = new createjs.Text("+"+A*50, "20px bold serif", "orange");
        t.x=T.x+15;
        t.y=T.y+40;
        t.alpha=0;
        field.addChild(t);
        createjs.Tween.get(t)
        .wait(i*50)
        .to({y:T.y-10,alpha:1},100, createjs.Ease.backOut)
        }
      }
    };
    var t = new createjs.Text("　", "20px serif", "orange");
    t.alpha=0;
    field.addChild(t);
    createjs.Tween.get(t)
    .wait(700)
    .call(Gameover);
    se10.play();
    //Gameover();
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
  if(debugmode){console.log(card)};
  switch(playMode[0]){
    case 1:
      if(card<0){
        //デッキのカード
        var C=-(card);
        if(deckfaces[deckfaces.length-1]==C){
          return true;
        }else{
          return false;
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
        if(playMode[1]==1 && hands[I][J]==-100){
          return false;}
        if(J < hands[I].length){
          for(var i=J;i<hands[I].length-1;i++){
            var A=hands[I][i]%13;
            var B=hands[I][i+1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};
            var C=Math.floor((hands[I][i]-1)/13);
            var D=Math.floor((hands[I][i+1]-1)/13);
            if(A-B!==1){
              //その下がスポアなら移動可
              if(playMode[1]==1){
                for(var k=i+1;k<hands[I].length;k++){
                  if(hands[I][k]!==-100){
                    return false;
                  }
                }
                return true;
            }else{
              return false;
            }};
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
      if(moveAllow(this.card)){
      var I=Math.floor(this.card/100);
      var J=this.card%100;
      if(hands[I].length>=J-1 && playMode[1]==1){
        if(hands[I][J-1]==-100){J-=1};
      };
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
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          se1.play()
          return true;
        }
        var I=Math.floor(this.card/100);
        var J=this.card%100;
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
          if(hands[I].length>=J-1 && playMode[1]==1){
            if(hands[I][J-1]==-100){J-=1};
          };
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
                se12.play();
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
                decksNow2-=1;
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
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
                se12.play();
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
                decksNow2-=1
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
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
                  decksNow2-=1
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
                se12.play();
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
                se12.play();
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
        if(hands[I].length>=J-1 && playMode[1]==1){
          if(hands[I][J-1]==-100){J-=1};
        };
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
          if(playMode[1]==1){
            if(hands[I][J]==-100 && I!==TX){
              //移動先に追加する
              se1.play()
              var X=0;
              for(var i=J;i<hands[I].length;i++){
                var T=Cardlists[I][i];
                if(hands[I][i]==-100){
                var newCard = new createjs.Bitmap('Card_images/Card_Spore.png');
                }else{
                var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                };
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
              return true;
            }else{
            if(hands[TX][hands[TX].length-1]==-100){
              ExitCard();
              return false;
            }};
            }
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
                  if(hands[I][i]==-100){
                    var newCard = new createjs.Bitmap('Card_images/Card_Spore.png');
                    }else{
                    var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                    };
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
          switch(TX){
            case -2:
              switch(TY){
                case 0:
                case 1:
                case 2:
                case 3:
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
                  achieve_Ten+=1;
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
      switch(playMode[0]){
        case 1:
          if(playMode[0]==1 && inventory[1].cleared==0){
            //expected 50,37,13,26
            if(hands[0][hands[0].length-1]==50 && hands[2][hands[2].length-1]==37 && hands[4][hands[4].length-1]==13 && hands[6][hands[6].length-1]==26){
              if(hands[1].length==0 && hands[3].length==0 && hands[5].length==0){
                Coin();
                return false;
              function Coin(){
              var A=Cardlists[0][Cardlists[0].length-1];
              se12.play();
              createjs.Tween.get(A)
              .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
              .to({x:A.x,y:A.y,scale:1,alpha:1},150)
              .call(Coin2);
              }
              function Coin2(){
                var A=Cardlists[2][Cardlists[2].length-1];
                se12.play();
                createjs.Tween.get(A)
                .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                .call(Coin3);
                }
              function Coin3(){
                var A=Cardlists[4][Cardlists[4].length-1];
                se12.play();
                createjs.Tween.get(A)
                .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                .call(Coin4);
                }
              function Coin4(){
                var A=Cardlists[6][Cardlists[6].length-1];
                se12.play();
                createjs.Tween.get(A)
                .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                .call(Coin5);
                }
              function Coin5(){
                var A=new createjs.Bitmap("Card_images/soL_coin.png")
                A.x=220;
                A.y=90;
                A.alpha=0;
                field.addChild(A);
                createjs.Tween.get(A)
                .to({y:A.y-80,scaleX:1,alpha:0.8},90)
                .to({x:A.x+64,scaleX:0},120)
                .to({x:A.x,scaleX:1},120)
                .to({x:A.x+64,scaleX:0},120)
                .to({x:A.x,scaleX:1},120)
                .wait(400)
                .to({scaleX:1.2,scaleY:1.2},60)
                .to({x:700,y:600,scaleX:1,scaleY:1,alpha:0},200, createjs.Ease.backInOut)
                .call(Coin6);
                }
              function Coin6(){
                IK('勝負師のコイン')
                cLock=true;
                }
            }}
          }
          if(playMode[1]==1){CardTurn();};
          cLock=true;
          break;
        case 2:
          CardTurn();
          SpiderSet();
          cLock=true;  
          break;
        case 3:
          monsterMove();
          break;
      }
    };
    //No
    function ExitCard(t=0){
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
        if(playMode[0]==1 && playMode[1]==1){
        var Pt=(decksNow2+2)%3
        }else{
        var Pt=0;
        }
        createjs.Tween.get(T)
        .to({x:50+cardWidth+cardgapX+Pt*15,y:5},90)
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
function SoundConfig(event,p=0){
  console.log('soundconfig',p)
  if(p!==0){
    //sound on/offボタンを作成する
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#3b7353");
  shape.graphics.drawRect(700, 0, 120, 50); // 長方形を描画
  shape.alpha=0.8;
  Configmap.addChild(shape); // 表示リストに追加
  var t = new createjs.Text("SOUND", "20px serif", "white");
  t.x=705;
  t.y=0;
  Configmap.addChild(t);
  muteshape = new createjs.Text(mute, "28px serif", "white");
  muteshape.x=720;
  muteshape.y=20;
  Configmap.addChild(muteshape);
  shape.addEventListener("click", {handleEvent:SoundConfig});
  return false;
  }
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
      case 5:
        Bgm =new Music(bgm5data);
        Bgm.playMusic();
        break;
      default:
        console.log(musicnum,'bgm error!')
        Bgm.stop();
        break;
    }
    se11.play();
    mute="ON";
    }else{
    Bgm.mute(true);
    Bgm.stop();
    mute="OFF";
}
Configmap.removeChild(muteshape);
muteshape = new createjs.Text(mute, "28px serif", "white");
muteshape.x=720;
muteshape.y=20;
Configmap.addChild(muteshape);
};
function OptionConfig(){
  if(opLock==0){
  opLock=3;
  se11.play();
  Configmap.removeAllChildren();
  var shape = new createjs.Shape();
  shape.graphics.beginFill("black");
  shape.graphics.drawRect(300, 200, 220, 250);
  shape.alpha=0.7;
  Configmap.addChild(shape);
  var option_bt1 = new createjs.Bitmap('soL_option_bt1.png');
  option_bt1.x=310;
  option_bt1.y=250;
  option_bt1.scale=1.2;
  Configmap.addChild(option_bt1)
  var option_bt2 = new createjs.Bitmap('soL_option_bt2.png');
  option_bt2.x=310;
  option_bt2.y=300;
  option_bt2.scale=1.2;
  Configmap.addChild(option_bt2)
  var option_bt3 = new createjs.Bitmap('soL_option_bt3.png');
  option_bt3.x=310;
  option_bt3.y=350;
  option_bt3.scale=1.2;
  Configmap.addChild(option_bt3)
  var option_bt4 = new createjs.Bitmap('soL_option_bt4.png');
  option_bt4.x=310;
  option_bt4.y=400;
  option_bt4.scale=1.2;
  Configmap.addChild(option_bt4)
  var option_bt5 = new createjs.Bitmap('soL_batu.png');
  option_bt5.x=475;
  option_bt5.y=200;
  option_bt5.scale=0.4;
  Configmap.addChild(option_bt5)
  option_bt1.addEventListener("click", {card:1,handleEvent:OptionConfig});
  option_bt2.addEventListener("click", {card:2,handleEvent:OptionConfig});
  option_bt3.addEventListener("click", {card:3,handleEvent:OptionConfig});
  option_bt4.addEventListener("click", {card:4,handleEvent:OptionConfig});
  option_bt5.addEventListener("click", {card:5,handleEvent:OptionConfig});
  return false;
  }
  if(opLock==3){
    switch(this.card){
      case 1:
        Configmap.removeAllChildren();
        SoundConfig(0,-1);
        //opLock=2;
        se11.play();
        Dialogue("EXIT？","狭間に別れを告げてタイトルに戻ります",4,-1);
        break;
      case 2:
          //音量の設定
          se7.play();
          Configmap.removeAllChildren();
          var shape = new createjs.Shape();
          shape.graphics.beginFill("black");
          shape.graphics.drawRect(150, 110, 500, 250);
          shape.alpha=0.7;
          Configmap.addChild(shape);
          var option_bt5 = new createjs.Bitmap('soL_batu.png');
          option_bt5.x=610;
          option_bt5.y=110;
          option_bt5.scale=0.4;
          Configmap.addChild(option_bt5)
          option_bt5.addEventListener("click", {card:7,handleEvent:OptionConfig});
          Barlist=[];
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgb(244,177,131)");
          shape.graphics.beginStroke("rgb(237,125,50)");
          shape.graphics.setStrokeStyle(3);
          shape.graphics.drawRect(310, 175, 180*vBar, 30);
          Configmap.addChild(shape);
          Barlist.push(shape);      
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgb(244,177,131)");
          shape.graphics.beginStroke("rgb(237,125,50)");
          shape.graphics.setStrokeStyle(3);
          shape.graphics.drawRect(310, 225, 180*sBar, 30);
          Configmap.addChild(shape);
          Barlist.push(shape);       
          var t=new createjs.Text("音楽","bold 32px 'メイリオ'","white");
          t.x=160;
          t.y=172;
          Configmap.addChild(t);
          var t=new createjs.Text("効果音","bold 32px 'メイリオ'","white");
          t.x=160;
          t.y=222;
          Configmap.addChild(t);
          var option_arrow = new createjs.Bitmap('Winedom_arrowleft.png');
          option_arrow.x=270;
          option_arrow.y=170;
          option_arrow.scale=0.4;
          Configmap.addChild(option_arrow)
          option_arrow.addEventListener("click", {card:1,handleEvent:SoundBar});
          var option_arrow = new createjs.Bitmap('Winedom_arrowleft.png');
          option_arrow.x=270;
          option_arrow.y=220;
          option_arrow.scale=0.4;
          Configmap.addChild(option_arrow)
          option_arrow.addEventListener("click", {card:3,handleEvent:SoundBar});
          var option_arrow = new createjs.Bitmap('Winedom_arrowright.png');
          option_arrow.x=570;
          option_arrow.y=170;
          option_arrow.scale=0.4;
          Configmap.addChild(option_arrow)
          option_arrow.addEventListener("click", {card:2,handleEvent:SoundBar});
          var option_arrow = new createjs.Bitmap('Winedom_arrowright.png');
          option_arrow.x=570;
          option_arrow.y=220;
          option_arrow.scale=0.4;
          Configmap.addChild(option_arrow)
          option_arrow.addEventListener("click", {card:4,handleEvent:SoundBar});
        break;
      case 3:
          //クレジット
          se7.play();
          Configmap.removeAllChildren();
          var option_bt = new createjs.Bitmap('soL_cregit.png');
          option_bt.x=152;
          option_bt.y=690;
          Configmap.addChild(option_bt)
          var option_bt5 = new createjs.Bitmap('soL_batu.png');
          option_bt5.x=612;
          option_bt5.y=698;
          option_bt5.scale=0.4;
          Configmap.addChild(option_bt5)
          option_bt5.addEventListener("click", {card:6,handleEvent:OptionConfig});
          createjs.Tween.get(option_bt)
          .to({x:152,y:90},500, createjs.Ease.backOut);
          createjs.Tween.get(option_bt5)
          .to({x:612,y:98},500, createjs.Ease.backOut);
        break;
      case 4:
          //データ初期化
          se11.play();
          Configmap.removeAllChildren();
          if(JSON.parse(localStorage.getItem('UserData_SoL')) === null){
            Dialogue("No save data","ローカルストレージにデータがありません。",-1,-1,1);
          }else{
            Dialogue("Delete save data?","ローカルストレージのデータを消去します！&（この操作は取り消しできません）",5,-1);
          }
        break;
      case 5:
        se7.play();
        Configmap.removeAllChildren();
        SoundConfig(0,-1);
        opLock=0;
        break;
      case 6:
        //se7.play();
        Configmap.removeAllChildren();
        opLock=0;
        OptionConfig();
      break;
      case 7:
        saveLocal();
        Configmap.removeAllChildren();
        opLock=0;
        OptionConfig();
      break;
    }
  }
  function SoundBar(){
    switch(this.card){
      case 1:
        if(vBar<=0.2){vBar=0}else{vBar-=0.2}
        se11.play();
        Bgm.volume(0.1*vBar);
        var B=Barlist[0];
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgb(244,177,131)");
          shape.graphics.beginStroke("rgb(237,125,50)");
          shape.graphics.setStrokeStyle(3);
          shape.graphics.drawRect(310, 175, 180*vBar, 30);
          Configmap.addChild(shape);
          Configmap.removeChild(B);
          Barlist[0]=shape;
        break;
      case 2:
        if(vBar>=1.4){vBar=1.4}else{vBar+=0.2}
        se11.play();
        Bgm.volume(0.1*vBar);
        var B=Barlist[0];
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgb(244,177,131)");
        shape.graphics.beginStroke("rgb(237,125,50)");
        shape.graphics.setStrokeStyle(3);
        shape.graphics.drawRect(310, 175, 180*vBar, 30);
        Configmap.addChild(shape);
        Configmap.removeChild(B);
        Barlist[0]=shape;
        break;
      case 3:
        if(sBar<=0.2){sBar=0}else{sBar-=0.2}
          SEbuffer();
          se11.play();
          var B=Barlist[1];
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgb(244,177,131)");
          shape.graphics.beginStroke("rgb(237,125,50)");
          shape.graphics.setStrokeStyle(3);
          shape.graphics.drawRect(310, 225, 180*sBar, 30);
          Configmap.addChild(shape);
          Configmap.removeChild(B);
          Barlist[1]=shape;
        break;
      case 4:
        if(sBar>=1.4){sBar=1.4}else{sBar+=0.2}
        SEbuffer();
        se11.play();
        var B=Barlist[1];
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgb(244,177,131)");
        shape.graphics.beginStroke("rgb(237,125,50)");
        shape.graphics.setStrokeStyle(3);
        shape.graphics.drawRect(310, 225, 180*sBar, 30);
        Configmap.addChild(shape);
        Configmap.removeChild(B);
        Barlist[1]=shape;
        break;
    }
  }
}
function InvConfig(p=-1){
//itemyard
if(p==0){
  //入手時には描画する
  Itemyard.removeAllChildren();
  var shape = new createjs.Shape();
          shape.graphics.beginFill("black");
          shape.graphics.drawRect(700, 55, 100, 480);
          shape.alpha=0.5;
    Itemyard.addChild(shape);
  for(var i=0;i<inventory.length;i++){
    if(inventory[i].cleared !==0){
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(710, 60+(66*i), 64, 64);
    Itemyard.addChild(shape);
    shape.addEventListener("click", {card:i,handleEvent:Equipitem});
    var T =new createjs.Bitmap(Item_src[i]);
    T.x=710;
    T.y=60+(66*i);
    T.scale=0.5;
    Itemyard.addChild(T);
    if(inventory[i].cleared ==-1){
    var shape = new createjs.Shape();
      shape.graphics.beginFill("black");
      shape.graphics.drawRect(710, 60+(66*i), 64, 64);
      shape.alpha=0.7;
      Itemyard.addChild(shape);
    }}else{
      var shape = new createjs.Shape();
      shape.graphics.beginFill("black");
      shape.graphics.drawRect(710, 60+(66*i), 64, 64);
      shape.alpha=0.7;
      Itemyard.addChild(shape);
    }}
  Itemyard.addChild(Invcursor);
  if(equipeditem>=0){
    Invcursor.x=710;
    Invcursor.y=60+(66*equipeditem);
    Invcursor.alpha=1;
  }else{
    Invcursor.alpha=0; 
  }
  return true;
}
if(ItemAry[0]==0){
  ItemAry[0]=1;
  se11.play();
  createjs.Tween.get(Itemyard)
  .to({x:10},150, createjs.Ease.backOut)
}else{
  se11.play();
  createjs.Tween.get(Itemyard)
  .to({x:100},150, createjs.Ease.backOut)
  ItemAry[0]=0;
}
function Equipitem(){
    if(equipeditem!==this.card){
      if(inventory[this.card].cleared >0){
      se11.play();
      equipeditem=this.card;
        Invcursor.x=710;
        Invcursor.y=60+(66*equipeditem);
        Invcursor.alpha=1;
      }
    }else{
      se11.play();
      equipeditem=-1;
      Invcursor.alpha=0;
    }
}
};
canvas5.onmousedown = mouseDownListener;
function mouseDownListener(e) {
  createjs.Ticker.addEventListener("tick", MouseCircle);
};
canvas5.onmouseup = mouseUpListener;
function mouseUpListener(e) {
  createjs.Ticker.removeEventListener("tick", MouseCircle);
};
//タップ操作を有効にした場合クリックイベントが反応してくれなかったため削除
canvas5.addEventListener("click", clickHandler, false);
function clickHandler(e) {
  if(debugmode){console.log('clicked!',cLock,opLock)};
};
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
          se11.play();
          Dialogue("QUIT GAME？","この盤面を途中で終了します",1,-1);
        }
      }
      if(gamestate==100 && cLock){
        //メニューに戻る
        if(opLock==0){
          opLock=2;
          se11.play();
          Dialogue("EXIT？","狭間に別れを告げてタイトルに戻ります",4,-1);
        }
      }
    }
    if(e.keyCode==119 && key119==0){
      key119=1;//F8
      if(gamestate==0 && cLock){
          //new game;
          if(opLock==0 && duelLog.length){
            opLock=2;
            se11.play();
            Dialogue("NEW GAME？","この盤面を放棄して新しいゲームを始めます",2,-1);
          }
        }
      if(gamestate==1 && cLock){
        //次のゲームへ
        Gamestart();
      }
    }
    };
    function Dialogue(word,detail="　",yes=1,no=-1,ok=-1){
      //ok 0->OKボタンにする
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
      for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
        var line = lines[i] ;
        var t=new createjs.Text(line,"bold 18px 'メイリオ'","black");
        t.x=210;
        t.y=260+i*20;
        Loadmap.addChild(t);
      };
      if(ok==-1){
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
      }else{
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#ff3838");
      shape.graphics.drawRect(345, 300, 105, 60);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {card:yes,handleEvent:DialogueResult});
      var t=new createjs.Text("OK","bold 24px 'メイリオ'","white");
      t.x=375;
      t.y=320;
      Loadmap.addChild(t); 
      }
      function DialogueResult(e){
        se7.play();
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
          case 4:
            //shut down
              Bgm.stop();
              musicnum=0;
              //mute="ON";
            Titleyard.removeAllChildren();
            tweeNroom.paused=true;
            Configmap.removeAllChildren();
            Titleyard.addChild(t);
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#3b7353");
            shape.graphics.drawRect(0, 0, 800, 600); // 長方形を描画
            Titleyard.addChild(shape); // 表示リストに追加
            var BG = new createjs.Bitmap("soL_back.png");
            BG.alpha=0.3;
            Titleyard.addChild(BG);
            var t = new createjs.Text("Click Card to START", "24px serif", "white");
            Titleyard.addChild(t);
            gamestate=11;
            Title();
            break;
          case 5:
            //ローカルストレージのデータを削除
            saveDel();
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
  //gamestate=10;
  Titleyard.alpha=1;
  cx.clearRect(0,0,800,600)
  clearBG.removeAllChildren();
  field.removeAllChildren();
  deckmap.removeAllChildren();
  Backyard.removeAllChildren();
  menu(1);
}
function Gamestart(){
    gamestate=0;
    retryswitch=0;
    cLock=false;
    clearBG.removeAllChildren();
    field.removeAllChildren();
    cx.clearRect(0,0,800,600)
    cx2.clearRect(0,0,800,600)
    cx3.clearRect(0,0,800,600)
    yakumap.removeChild(yakumap_rule);
    switch(playMode[0]){
      case 1:
      //クロンダイク
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
      for (var i = 0;  i < cards.length;  i++  ) {
        cards[i]=i+1;
      if(playMode[1]==1){
        cards[i]=-(i+1);
      }}
      shuffle();
        break;
      case 2:
        //スパイダー
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
        break;
      case 3:
      //エルドリッチ
      function rulepage(){
        if(opLock==1){
        switch(this.point){
          case 0:
            se11.play()
            yakumap.removeChild(yakumap_rule);
            yakumap_rule = new createjs.Bitmap("soL_rule3_2.png");
            yakumap_rule.x=60;
            yakumap_rule.y=70;
            yakumap_rule.addEventListener("click", {point:1,handleEvent:rulepage});
            yakumap.addChild(yakumap_rule);
            break;
          case 1:
            se11.play()
            yakumap.removeChild(yakumap_rule);
            yakumap_rule = new createjs.Bitmap("soL_rule3.png");
            yakumap_rule.x=60;
            yakumap_rule.y=70;
            yakumap_rule.addEventListener("click", {point:0,handleEvent:rulepage});
            yakumap.addChild(yakumap_rule);
            break;
        }}
      };
      yakumap_rule = new createjs.Bitmap("soL_rule3.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap_rule.addEventListener("click", {point:0,handleEvent:rulepage});
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
        break;
    }
    handsLog=cards.concat();
    Gameretry(1);
  };
function Gameretry(t=0){
  cLock=false;
  field.removeAllChildren();
  undocount=0;
  score=0;
  startT = Date.now();
  if(t==0){cards =handsLog.concat()};
  switch(playMode[0]){
    case 1:
    //クロンダイク
    Card_src=Card_src_N.concat();
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
    if(playMode[1]==1){
      for (var i=0;i<decks.length;i++){
        decks[i]=-decks[i];
      }}
    deckfaces=[];
    Extras=[0,13,26,39];
  for(var i=0;i<hands.length;i++){
    for(var j=0;j<hands[i].length;j++){
    if(playMode[1]==0){
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
    }else if(playMode[1]==1){
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=50;
      newCard.y=5;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
    }
    }
  };
      break;
      case 2:
        //スパイダー
      melonList[0]=0;
      Card_src=Card_src_S.concat();
      duelLog=[];
      Cardlists=[[],[],[],[],[],[],[],[]]
      //handsLog=cards.concat();
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
      if(playMode[1]==1){
      for(var i =0;i<12;i++){
        var R=Math.floor(Math.random()*(decks.length-1));
        decks.splice(R,0,-100);
      }}
      Extras=[0,0,0,0];
      Exlists=[[],[],[],[]];
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=690;
      newCard.y=425;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      }
    };
        break;
    case 3:
    //エルドリッチ
    achieve_Ten=0;
    Card_src=Card_src_M.concat();
    duelLog=[];
    Cardlists=[[],[],[],[]]
    Extras=[-1,-1,-1,-1];
    decks = [];
    Exlists=[[],[],[],[]];
    attacker=[[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
    Decklists=[];
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
          if(mute=="ON"){
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
        if(playMode[1]==0){
        newCard.addEventListener("click", {point:1,handleEvent:DeckReset});
        }else{
        newCard.addEventListener("click", {point:3,handleEvent:DeckReset});
        }
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
            if(mute=="ON"){
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
            var newCard = new createjs.Bitmap(Card_src[0]);
            newCard.x=690;
            newCard.y=425-k*0.5;
            field.addChild(newCard);
            Decklists.push(newCard); 
            newCard.addEventListener("click", {handleEvent:SpiderDeal});
          }
          if(cleared[1][1]>0 && cleared[1][1]%5==0 && melonList[1]==0){
          var T = new createjs.Bitmap('Card_images/melon1.png');
          T.x=-20+2*(cardWidth+cardgapX)
          T.y=70
          T.addEventListener("click", {handleEvent:MelonDeal});
          melonList[0]=T;
          createjs.Tween.get(T)
          .wait(200)
          .to({alpha:1},50);
          }
          FirstAnimation();
          break;  
        case 3:
        if(musicnum!==2){
        Bgm.stop();
        musicnum=2;
        if(mute=="ON"){
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
              if(playMode[1]==1){CardTurn(-1);}
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
      if(playMode[1]==1 && S==-100){
        var newCard = new createjs.Bitmap('Card_images/Card_Spore.png');
        var HashCard=i*100+hands[i].length-1;
        newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
        newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
        newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});;     
      }else{
      var newCard = new createjs.Bitmap(Card_src[0]);
      }
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
    //スポア
    var SpT=0;
    for(var i=0;i<hands.length;i++){
      var Sp=hands[i].indexOf(-100);
      if(Sp!==-1){
        for(var j=Sp;j<hands[i].length;j++){
          if(hands[i][j]==-100){
            SpT+=1;
          }else{
            break;
          }}
          console.log(Sp,SpT);
          if(SpT>=2){
            DestractionS(i,Sp,SpT);
            return false;
          }else{
            SpT=0;
          }
        }
    }
    function DestractionS(A,B,C){
      //hands A のB番目からC個のスポアを消す
      for(var i=0;i<C;i++){
        var Card=Cardlists[A][i+B];
        field.removeChild(Card);
      }
      se5.play();
      hands[A].splice(B,C);
      Cardlists[A].splice(B,C);
      for(var i=B;i<hands[A].length;i++){
        var T=Cardlists[A][i];
        if(hands[A][i]==-100){
        var newCard = new createjs.Bitmap('Card_images/Card_Spore.png');
        }else{
        var newCard= new createjs.Bitmap(Card_src[hands[A][i]]);
        }
        newCard.x=T.x;
        newCard.y=T.y;
        field.removeChild(T);
        field.addChild(newCard);
        Cardlists[A].splice(i,1,newCard);
        var HashCard=A*100+i;
        console.log(HashCard);
        newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
        newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
        newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
      createjs.Tween.get(newCard)
      .to({y:newCard.y-cardgapY*C},80);
      SpiderSet();
    }
      }
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
    //console.log(TM,TR);
      if(TR>=0){
        var TN=13;
        var Ary=hands[TR].slice(hands[TR].length-13,hands[TR].length);
        se10.play();
        Cut();
      function Cut(){
      var T=Cardlists[TR].pop();
      var S=hands[TR].pop();
      createjs.Tween.get(T)
      .to({x:-20+Extras[0]*(cardWidth+cardgapX),y:425},80)
      .call(Next);
      function Next(){
        field.removeChild(T);
        if(TN==1){
          var newCard = new createjs.Bitmap(Card_src[S]);
        }else{
        var newCard = new createjs.Bitmap(Card_src[0]);
        }
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
  function MelonDeal(){
    //メロンのアクション
            var T=melonList[0];
            var newCard = new createjs.Bitmap('Card_images/melon2.png');
            newCard.x=T.x+15;
            newCard.y=T.y-10;
            field.addChild(newCard);
            createjs.Tween.get(T)
            .to({x:T.x+35,y:T.y-20,scaleX:0.05,scaleY:1.2},150)
            .to({alpha:0},10);
            createjs.Tween.get(newCard)
            .to({scaleX:0.05,scaleY:1.2},70)
            .to({x:T.x,y:T.y,scaleX:1,scaleY:1,alpha:1},150)
            .wait(200)
            .to({x:-100},500, createjs.Ease.backOut)
            .call(step);
      function step(){
        field.removeChild(T);
        field.removeChild(newCard);
        melonList[1]=1;
        PopAnm("メロンはポールに盗まれてしまった！",800,300,35,30,95);
      };
  }
  function disp(when=0){
  clearT =Date.now();
  if(when==0){
    datet = parseInt((clearT - startT )/ 1000);
  }else{
    datet = parseInt((playtime + clearT - when )/ 1000);
  }
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
    function PopAnm(word=0,delay=800,width=150,height=35,x=30,y=60){
      //少しの時間だけ情報を表示する
    var C= new createjs.Shape();
    C.graphics.beginFill("black").drawRect(0,0,width,height);
    C.x=x-60;
    C.y=y;
    C.alpha=0;
    stage.addChild(C);
    var D= new createjs.Text(word, "bold 16px Arial", "white");
    D.x=x-60;
    D.y=y+10;
    D.alpha=0;
    stage.addChild(D);
    createjs.Tween.get(C)
    .to({x:x-30,alpha:0.7},200)
    .wait(delay)
    .to({alpha:0},200)
    .call(CDend);
    createjs.Tween.get(D)
    .to({x:30,alpha:1},200)
    .wait(delay)
    .to({alpha:0},200);
      function CDend (){
        stage.removeChild(C);
        stage.removeChild(D);
      }
    }
    function AK(name){
      //実績
        var A=achieve.findIndex(value=>value.name==name);
        if(A!==-1){
          if(achieve[A].cleared==0){
            achieve[A].cleared=1;
            PopAnm("実績を開放しました",800,220,35,30,95);
          }
        }
      }
    function IK(name){
      //アイテム
      var A=inventory.findIndex(value=>value.name==name);
      if(A!==-1){
        if(inventory[A].cleared==0){
          inventory[A].cleared=1;
          se14.play();
          PopAnm(name+"を獲得しました！",800,220,35,30,95);
          InvConfig(0);
        }
      }
    }
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
        clear_1.x=800;
        clear_1.y=0;
        clearBG.addChild(clear_1);
        createjs.Tween.get(clear_1)
        .to({x:0,alpha:1},300);
        Cstar.x=580;
        Cstar.y=50;
        Cstar.rotation=15;
        Cstar.scale=0.7
        tweeNstar.paused=true;
        clearBG.addChild(Cstar);
        totalcardmove+=duelLog.length-1;
        var Rank="F";
        disp();
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
            .wait(1000)
            .call(nextgame)            
            switch(playMode[0]){
              case 1:
            cleared[1][playMode[0]-1]+=1;
            //score
            score=50*(duelLog.length-1);
            for(var i=0;i<Extras.length;i++){
              score+=100*Math.floor(Extras[i]/(i+1));
            }
            var TB=500-(hour*3600+min*60+sec);
            score+=TB;
            score-=(undocount-2)*50;
            score-=(retryswitch-1)*100;
            var t=new createjs.Text("card move","22px メイリオ","white");
            t.x=600;
            t.y=150;
            clearBG.addChild(t);
            var t=new createjs.Text(duelLog.length-1,"36px メイリオ","white");
            t.x=610;
            t.y=175;
            clearBG.addChild(t);
            break;
            case 2:
              cleared[1][playMode[0]-1]+=1;
              //score
              score=50*(duelLog.length-1);
              for(var i=0;i<Extras.length;i++){
                score+=100*Extras[0];
              }
              var TB=500-(hour*3600+min*60+sec);
              score+=TB;
              score-=(undocount-2)*50;
              score-=(retryswitch-1)*100;
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
              //score
              score=50*(duelLog.length-1);
              for(var i=0;i<Extras.length;i++){
                score+=150*Decklists.length;
              }
              var TB=800-(hour*3600+min*60+sec);
              score+=TB;
              score-=(undocount-2)*50;
              score-=(retryswitch-1)*100;
              defeatedmonster+=Decklists.length;
              if(defeatedmonster>=150){
                achievetemp.push("市街地保安官");
              }
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
            var t=new createjs.Text("time","22px メイリオ","white");
            t.x=600;
            t.y=80;
            clearBG.addChild(t);
            if(min<10){min="0"+min};
            if(sec<10){sec="0"+sec};
            var Time=hour+":"+min+":"+sec;
            var t=new createjs.Text(Time,"36px メイリオ","white");
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
            var t=new createjs.Text("score "+score,"22px メイリオ","white");
            t.x=600;
            t.y=280;
            clearBG.addChild(t);
            var t=new createjs.Text(Rank,"bold 64px  メイリオ","#d14d4d");
            t.x=610;
            t.y=305;
            clearBG.addChild(t);
            clear_4.x=-20;
            clear_4.y=-20;
            clear_4.alpha=0;
            clearBG.addChild(clear_4);
            createjs.Tween.get(clear_4)
            .wait(450)
            .to({x:20,alpha:1},300)
            break;
          default:
            clear_2.x=-100;
            clear_2.y=0;
            clear_2.alpha=0;
            clearBG.addChild(clear_2);
            createjs.Tween.get(clear_2)
            .to({x:0,alpha:1},300)
            .wait(1000)
            .call(nextgame)
            switch(playMode[0]){
              case 1:
            cleared[0][playMode[0]-1]+=1;
            cleared[1][playMode[0]-1]+=1;
            //score
            score=50*(duelLog.length-1);
            for(var i=0;i<Extras.length;i++){
              score+=100*Math.floor(Extras[i]/(i+1));
            }
            if(score>=10000){
              Rank="SS";
            }else if(score>=9000){
              Rank="S";
            }else if(score>=8000){
              Rank="A";
            }else if(score>=6000){
              Rank="B";
            }else{
              Rank="C";
            }
            var TB=500-(hour*3600+min*60+sec);
            score+=TB;
            score-=(undocount-2)*50;
            score-=(retryswitch-1)*100;
            if(hour==0 && min*60+sec<=150){
              achievetemp.push("スーパーソニック")
            }
            var t=new createjs.Text("card move","22px メイリオ","white");
            t.x=600;
            t.y=150;
            clearBG.addChild(t);
            var t=new createjs.Text(duelLog.length-1,"36px メイリオ","white");
            t.x=610;
            t.y=175;
            clearBG.addChild(t);
            break;
            case 2:
            cleared[0][playMode[0]-1]+=1;
            cleared[1][playMode[0]-1]+=1;
            //score
            score=50*(duelLog.length-1);
            for(var i=0;i<Extras.length;i++){
              score+=100*Extras[0];
            }
            var TB=500-(hour*3600+min*60+sec);
            score+=TB;
            score-=(undocount-2)*50;
            score-=(retryswitch-1)*100;
            if(score>=8000){
              Rank="SS";
            }else if(score>=7500){
              Rank="S";
            }else if(score>=7000){
              Rank="A";
            }else if(score>=6500){
              Rank="B";
            }else{
              Rank="C";
            }
            if(hour==0 && min*60+sec<=180){
              achievetemp.push("迅速の英雄")
            }
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
              //score
              score=50*(duelLog.length-1);
              score+=150*Decklists.length;
              var TB=800-(hour*3600+min*60+sec);
              score+=TB;
              score-=(undocount-2)*50;
              score-=(retryswitch-1)*100;
              var Bonus=0;
              for(var i=0;i<4;i++){
                if(attacker[i][0]!==-1){
                  var A=attacker[i][0]%13;
                  if(A==0){A+=13}
                  if(A==1){A+=15};
                  Bonus+=A*50;
                }
                if(attacker[i][1]!==-1){
                  var A=attacker[i][1]%13;
                  if(A==0){A+=13}
                  if(A==1){A+=15};
                  Bonus+=A*50;
                }
              };
              for(var i=0;i<4;i++){
                if(hands[i].length){
                  for(var j=0;j<hands[i].length;j++){
                  var A=hands[i][j]%13;
                  if(A==0){A+=13}
                  if(A==1){A+=15};
                  Bonus+=A*50;
                  }
                }
              };
              score+=Bonus;
              var t=new createjs.Text("(bonus + "+Bonus+")","22px メイリオ","orange");
              t.x=610;
              t.y=305;
              clearBG.addChild(t);
              if(score>=7000){
                Rank="SS";
              }else if(score>=6500){
                Rank="S";
              }else if(score>=6000){
                Rank="A";
              }else if(score>=5500){
                Rank="B";
              }else{
                Rank="C";
              }
              defeatedmonster+=16;
              if(achieve_Ten<=3){
                achievetemp.push("天元突破");
              }
              if(defeatedmonster>=150){
                achievetemp.push("市街地保安官");
              }
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
            var t=new createjs.Text("clear time","22px メイリオ","white");
            t.x=600;
            t.y=80;
            clearBG.addChild(t);
            if(min<10){min="0"+min};
            if(sec<10){sec="0"+sec};
            var Time=hour+":"+min+":"+sec;
            var t=new createjs.Text(Time,"36px メイリオ","white");
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
            if(retryswitch>=7){
              achievetemp.push("七転八起");
            }};
            var t=new createjs.Text("score "+score,"22px メイリオ","white");
            t.x=600;
            t.y=280;
            clearBG.addChild(t);
            var t=new createjs.Text(Rank,"bold 64px  メイリオ","#d14d4d");
            t.x=610;
            t.y=330;
            clearBG.addChild(t);
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
        retry_bt.y=420;
        clearBG.addChild(retry_bt);
        retry_bt2.x=600;
        retry_bt2.y=480;
        clearBG.addChild(retry_bt2);
      cLock=true;
      }
    }};
};
