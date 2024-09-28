// ver 1.03 上に上げたカードを降ろせるように
// スポア-山札の枚数が増える？
// やっぱりやる気あれば→採取地ごとに判明しやすいレシピの追加、レシピ判明のヒント
// 敵のドロップアイテム数を増やす？
window.onload = function(){
main();
};

function main(){
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
var graphics;
graphics=new createjs.Graphics();
graphics
  .beginRadialGradientFill(["white","orange"],[0.0,1.0],0,0,20,0,0,100)
  .drawPolyStar(0, 0, 50, 5, 0.4, -90);
var Cstar = new createjs.Shape(graphics);
  Cstar.x=100;
  Cstar.y=225;
var deckmap = new createjs.Container();
var field = new createjs.Container();//メイン
var clearBG = new createjs.Container();//clear画面
var yakumap = new createjs.Container();//ヒントボタン等
var Titleyard = new createjs.Container();//タイトル
var Roomyard = new createjs.Container();//おへや
var Itemyard = new createjs.Container();//インベントリ
var Backyard = new createjs.Container();//背景
var Configmap = new createjs.Container();//soundボタン・オプション等
var Loadmap = new createjs.Container();//ダイアログ
var battlefield = new createjs.Container();//
var Ct = new createjs.Container();//錬成時バッファ的レイヤ
stage.addChild(Backyard);
stage.addChild(Roomyard);
stage.addChild(Titleyard);
stage.addChild(field);
stage.addChild(deckmap);
stage.addChild(yakumap);
stage.addChild(Itemyard);
stage.addChild(clearBG);
stage.addChild(Configmap);
stage.addChild(Loadmap);
Itemyard.x=110;
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
var debugmode=false;//出荷時にfalseにする
var titletext="v1.03/Click Card to START";
var cLock=true;//true->操作可能
var opLock=0;//漫然と使っている -1->gamestartまで 10->×ボタンを禁止する　その他いろいろ
var mLock=true;//deckめくっている最中falseとする
var gamestate=-1;//-1:load中 10:title 11:title/2回目以降 100:menu 0:now playing 1:game over 2-3:in battle 5:採取エリア
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
TitleGrh();
function TitleGrh(){
var shape = new createjs.Shape();
shape.graphics.beginFill("#3b7353");
shape.graphics.drawRect(0, 0, 800, 600); // 長方形を描画
Titleyard.addChild(shape); // 表示リストに追加
var BG = new createjs.Bitmap("soL_back2.png");
BG.alpha=0.8;
Titleyard.addChild(BG);
var obj = new createjs.Shape();
obj.graphics.beginFill("rgba(20,20,20,0.7)");
obj.graphics.moveTo(0, 0);
obj.graphics.lineTo(0, 60);
obj.graphics.lineTo(800, 0);
Titleyard.addChild(obj);
var obj = new createjs.Shape();
obj.graphics.beginFill("rgba(20,20,20,0.7)");
obj.graphics.moveTo(0, 600);
obj.graphics.lineTo(800, 540);
obj.graphics.lineTo(800, 600);
Titleyard.addChild(obj);
var t = new createjs.Text("追い求めた狭間の向こう側は、空虚な空間だった。", "16px serif", "white");
t.textAlign = "end";
t.x=800;
t.y=555;
Titleyard.addChild(t);
var t = new createjs.Text("狭間に閉じ込められた彼女は、亀裂がくれたトランプで遊ぶことにした。", "16px serif", "white");
t.textAlign = "end";
t.x=800;
t.y=575;
Titleyard.addChild(t);
}
//たいとるがめん
function Title(){
loadLocal();
if(debugmode){saveUP()};
var circle1 = new createjs.Shape();
circle1.graphics.beginFill("#2c4a3f")
.drawCircle(0, 0, 80);
circle1.x=480;
circle1.y=165;
Titleyard.addChild(circle1);
var circle2 = new createjs.Shape()
circle2.graphics.beginFill("#2c4a3f")
.drawCircle(0, 0, 80)
circle2.x=680;
circle2.y=165;
Titleyard.addChild(circle2);
var circle3 = new createjs.Shape();
circle3.graphics.beginFill("#4cb58b")
.drawCircle(0, 0, 80)
circle3.x=480;
circle3.y=165;
circle3.alpha=1;
Titleyard.addChild(circle3);
var circle4 = new createjs.Shape()
circle4.graphics.beginFill("#4cb58b")
.drawCircle(0, 0, 80)
circle4.x=680;
circle4.y=165;
circle4.alpha=1;
Titleyard.addChild(circle4);
if(mute=="OFF"){circle3.alpha=0;}else{circle4.alpha=0;};
var sound1 = new createjs.Bitmap("soL_sound1.png");
sound1.x=430;
sound1.y=120;
sound1.scale=1;
Titleyard.addChild(sound1);
var sound2 = new createjs.Bitmap("soL_sound2.png");
sound2.x=630;
sound2.y=120;
sound2.scale=1;
Titleyard.addChild(sound2);
var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
Car1.x=450;
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
Letterbox=[];
if(InvID(0)>=4){
Letterbox.push(["不明","no title","ありません","qr_src2"])
};
if(UserLibrary[62]>0){
Letterbox.push(["提供","クリア記念品","ここまでのプレイ、&ありがとうございます！&脱出を記念して、装備すると&クロンダイク・マグマンタを&通常と少し異なるルールで&遊べるアイテムを贈呈します。","ピッケル"]);
}
function Soundcircle(){
  switch(this.card){
    case 3:
      if(mute=="OFF"){
    circle3.alpha=0.6;
      }
      break;
    case 4:
      if(mute=="OFF"){
    circle3.alpha=0;
      }
    break;
    case 5:
      if(mute=="ON"){
    circle4.alpha=0.6;
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
    SEbuffer(-1)
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
          Car2.x=520;
          Car2.y=250;
          Car2.scale=2;
          Car2.alpha=0;
          Titleyard.addChild(Car2);
          Car2list.push(Car2);
          Car2.addEventListener("click", {card:0,handleEvent:GameReady});
          createjs.Tween.get(Car1)
          .to({y:290},50)
          .to({x:520,y:250,scaleX:0.05,scaleY:2.4},220)
          .to({alpha:0},10);
          createjs.Tween.get(Car2)
          .wait(50)
          .to({scaleX:0.05,scaleY:2.2},90)
          .to({x:450,y:280,scaleX:2,scaleY:2,alpha:1},220)
          .wait(2000)
          .call(titleCardTurn1);
    }else if(card==1){
      var Car2=Car2list.pop();
      createjs.Tween.get(Car1)
      .wait(50)
      .to({scaleX:0.05,scaleY:2.2},90)
      .to({x:450,y:280,scaleX:2,scaleY:2,alpha:1},220)
      .wait(2000)
      .call(titleCardTurn0);
      createjs.Tween.get(Car2)
      .to({y:290},50)
      .to({x:520,y:250,scaleX:0.05,scaleY:2.4},220)
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
var Clvup = new createjs.Bitmap("Don_fever.png");
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
var yakumap_giveup = new createjs.Bitmap("soL_giveup.png");
yakumap_giveup.alpha=0
yakumap_giveup.scale=0.6;
yakumap_giveup.x=720;
yakumap_giveup.y=335;
yakumap.addChild(yakumap_hint);
yakumap.addChild(yakumap_undo);
yakumap.addChild(yakumap_reset);
yakumap.addChild(yakumap_solve);
yakumap.addChild(yakumap_giveup);
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
var retry_bt3 = new createjs.Bitmap("soL_retry_bt3.png");
var retry_bt2 = new createjs.Bitmap("soL_retry_bt2.png");
var effect1 = {
  images : ["Card_images/Card_delete.png"],
  frames : {width:128, height:128, regX:64, regY:64},
  animations : {end:[20],walk:[0,19,"end",0.3]}
}
var SpriteSheet1 = new createjs.SpriteSheet(effect1);
var Sprite1 = new createjs.Sprite(SpriteSheet1);
yakumap.addChild(Sprite1);

var effect2 = {
  images : ["Card_images/Duel_Chain.png"],
  frames : {width:262.4, height:302, regX:131.2, regY:151},
  animations : {end:[20],walk:[0,19,"end",0.5]}
}
var SpriteSheet2 = new createjs.SpriteSheet(effect2);
var Sprite2 = new createjs.Sprite(SpriteSheet2);
Sprite2.x=400;
Sprite2.y=300;
Sprite2.scaleX=3.2;
Sprite2.scaleY=3;
yakumap.addChild(Sprite2);
Sprite1.gotoAndPlay('end');
Sprite2.gotoAndPlay('end');
//データベース
var Card_src= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Spade11.png','Card_images/Spade12.png','Card_images/Spade13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Heart11.png','Card_images/Heart12.png','Card_images/Heart13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Club11.png','Card_images/Club12.png','Card_images/Club13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png')
var Card_src_N= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Spade11.png','Card_images/Spade12.png','Card_images/Spade13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Heart11.png','Card_images/Heart12.png','Card_images/Heart13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Club11.png','Card_images/Club12.png','Card_images/Club13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png')
var Card_src_M= new Array('Card_images/BackColor_Closed.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade_M10.png','Card_images/Spade_M11.png','Card_images/Spade_M12.png','Card_images/Spade_M13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart_M10.png','Card_images/Heart_M11.png','Card_images/Heart_M12.png','Card_images/Heart_M13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club_M10.png','Card_images/Club_M11.png','Card_images/Club_M12.png','Card_images/Club_M13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond_M10.png','Card_images/Diamond_M11.png','Card_images/Diamond_M12.png','Card_images/Diamond_M13.png','Card_images/melon3.png')
var Card_src_S= new Array('Card_images/BackColor_Black.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1101.png','Card_images/Spider1201.png','Card_images/Spider1301.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1102.png','Card_images/Spider1202.png','Card_images/Spider1302.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1103.png','Card_images/Spider1203.png','Card_images/Spider1303.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Spider1104.png','Card_images/Spider1204.png','Card_images/Spider1304.png',)
var Card_src_H= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png')
var Path_src=new Array("Card_images/soL_room_path9.png","Card_images/soL_room_path1.png","Card_images/soL_room_path2.png","Card_images/soL_room_path3.png","Card_images/soL_room_path4.png","Card_images/soL_room_path5.png","Card_images/soL_room_path6.png","Card_images/soL_room_path7.png","Card_images/soL_room_path8.png")
var Item_src=new Array("Card_images/BackColor_Black.png","Card_images/soL_elbook.png","Card_images/soL_wand.png","Card_images/soL_desert.png","Card_images/soL_coin.png","Card_images/soL_tomato.png","Card_images/soL_melon.png","Card_images/soL_stone.png","Card_images/soL_pan.png");
var SoLbg_src=new Array("soL_bg1.png","soL_bg2.png","soL_bg3.png","soL_bg4.png","soL_bg5.png","soL_bg6.png","soL_bg7.png","soL_bg9.png","soL_bg8.png");
var Chara_src=new Array("soL_chara1.png","soL_chara2.png");
var Itemswitch=0;
var PathAry=[];
var MessageText=[[],[],[],[-2],[]];//0->テキストのcreate 1->キャラ名, キャラグラ 2->▼ 3->キャラの数字 4->予備 背景等
var MsgAry=[];
var playMode=[1,0,0];//[1]->additional option [2]->numpw
var Modename=["クロンダイク","マグマンタ","エリアノド防衛戦","クロンダイク：クラシック","マグマンタ：スポア"];
var qr_src2;//QR
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
var achieve_SS=[0,0,0];
var score=0;
var Cbt=canvas2.toDataURL();
var Cbtlist=[];
var Cbutton = new createjs.Bitmap(Cbt);
var Letterbox=[];
var HenirPathT=[];//選択中のヘニルパスを格納
var HenirPathS=[];
var Fever=0;
var EvAry=[];
var PathTextnum=-1;
var PathTextAry=[];
field.addChild(Cbutton);
Cbtlist.push(Cbutton);
//ボタン描画用
yakumap_hint.addEventListener("click", {rule:playMode[0],handleEvent:ruleButton});
yakumap_reset.addEventListener("click", {rule:playMode[0],handleEvent:resetButton});
yakumap_undo.addEventListener("click", {rule:playMode[0],handleEvent:undoButton});
yakumap_solve.addEventListener("click", {rule:playMode[0],handleEvent:solveButton});
yakumap_giveup.addEventListener("click", {rule:playMode[0],handleEvent:giveupButton});
retry_bt.addEventListener("click", {rule:playMode[0],handleEvent:Gamestart});
retry_bt2.addEventListener("click", {rule:playMode[0],handleEvent:Gameend});
retry_bt3.addEventListener("click", {rule:playMode[0],handleEvent:ToGameretry});
//保存するデータ
var vBar=0.6;
var sBar=1;
var cleared=[[0,0,0,0,0,0],[0,0,0,0,0,0]];//ク/マ/エ クリア回数/ ク/マ/エ 挑戦回数の順 3-5番目は予備
var highscore=[
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
]
//実績
var achieve=[
  {name:"ファインダー",sub:"ソリティアをいずれかのモードで1回プレイする"},
  {name:"一件解決！",sub:"ソリティアをいずれかのモードで1回クリアする"},
  {name:"情熱のペイ",sub:"ソリティアを合計100回プレイする"},
  {name:"七転八起",sub:"いずれかのモードで7回以上リトライしてクリアする"},
  {name:"トレジャーハンター",sub:"「クロンダイク」を20回クリアする"},
  {name:"スーパーソニック",sub:"「クロンダイク」を2分30秒以内にクリアする"},
  {name:"極地のクモ",sub:"「マグマンタ」を10回クリアする"},
  {name:"迅速の英雄",sub:"「マグマンタ」を3分以内にクリアする"},
  {name:"エリアノド守護者",sub:"「エリアノド防衛戦」を5回クリアする"},
  {name:"天元突破",sub:"「エリアノド防衛戦」を山札間の移動回数3回以下でクリアする"},
  {name:"市街地保安官",sub:"「エリアノド防衛戦」でモンスターを150体以上討伐する"},
  {name:"SS魂",sub:"3つのモードをSSランクでクリアする"},
  {name:"フォーヘニル",sub:"狭間から脱出する"},
  {name:"ソリティア・ベリル",sub:"ヘニルの時空を突破する"},
  {name:"究極の真理",sub:"アイテム図鑑をコンプリートする"},
];
for(var i=0; i<achieve.length;i++){
  achieve[i].id=i;
  achieve[i].cleared=0;
}
//アイテム cleared -1->使用後, 1~所持数
var inventory=[
  {id:0,name:"トランプ",sub:"孤独なリティアのために狭間がつくってくれた、&絵札に色々なキャラクターが描かれたトランプ。&（ソリティアをプレイすることができる）"},
  {id:8,name:"エル・コレクション・ブック",sub:"エル捜索隊について、&各メンバーの顔写真とインタビューつきでまとめられた本。&（装備すると、狭間との会話の内容が変化する）"},
  {id:7,name:"ピッケル-プロトタイプ",sub:"狭間からの脱出に成功した証。&（装備すると、クロンダイク・マグマンタを&　通常と少し異なるルールでプレイすることができる）"},
  {id:6,name:"スイートポンチ",sub:"身体の抵抗力を上げる効果があるデザート。"},
  {id:1,name:"勝負師のコイン",sub:"金色に光るコイン。"},
  {id:2,name:"ジョイのトマト",sub:"ジョイが育てていたトマト。&どんな病も治してくれる。"},
  {id:3,name:"極上メロン",sub:"洞窟で採れるメロン。"},
  {id:5,name:"氷のクリソナ",sub:"波のような模様が特徴的なクリソナ。&一部の地域ではアイスレートと呼ばれ、燃料になる。"},
  {id:4,name:"冬の森の鍋",sub:"ジョイが使っていた調理用のお鍋。"},
];
for(var i=0; i<inventory.length;i++){
  inventory[i].cleared=0;
}
inventory[0].cleared=1;
//素材 price->で並び替えるため表示の時はidを参照する
var itemA=[
  {name:"ホワイトベリル",price:-1,class:"クリソナ",detail:"不純物がほとんど混ざっていない&無色透明なクリソナ。&あらゆる錬成で使用でき、必ず成功する。"},
  {name:"グリーンベリル",price:1,class:"クリソナ",detail:"クリソナを精製して作った緑色に輝く宝石。&2種類の素材を使った錬成に使用すると&必ず錬成が成功する。"},
  {name:"ブルーベリル",price:2,class:"クリソナ",detail:"クリソナを精製して作った青色に輝く宝石。&3種類以下の素材を使った錬成に使用すると&必ず錬成が成功する。"},
  {name:"イエローベリル",price:3,class:"クリソナ",detail:"クリソナを精製して作った黄色に輝く宝石。&4種類以下の素材を使った錬成に使用すると&必ず錬成が成功する。"},
  {name:"レッドベリル",price:4,class:"クリソナ",detail:"クリソナを精製して作った赤色に輝く宝石。&5種類以下の素材を使った錬成に使用すると&必ず錬成が成功する。"},
  {name:"ルーブ草",price:5,class:"植物資源",detail:"果物の香りがする水分豊富な植物。&どこでもよく育つ。&エルの樹の麓などでたくさん採れる。"},
  {name:"枯れルーブ草",price:6,class:"植物資源",detail:"水気を失い枯れてしまった茶色のルーブ草。&ルーブ草を分解すると手に入る。"},
  {name:"ルーブ繊維",price:113,class:"植物資源",detail:"ルーブ草から繊維を取り出したもの。&寄り合わせて糸や布ができる。"},
  {name:"ルーブ糸",price:114,class:"製造",detail:"ルーブ繊維から作った丈夫な糸。&　"},
  {name:"ルベニアン包帯",price:128,class:"製造",detail:"ルーブ繊維をより合わせて作った包帯。&戦闘中に使うとHPを30回復する。"},
  {name:"清浄水",price:7,class:"その他資源",detail:"様々な用途に使えるきれいな水。&ルーブ草を分解すると手に入る。"},
  {name:"エルの清水",price:8,class:"その他資源",detail:"エル濃度の高い水。&飲み水には適さない。"},
  {name:"火炎草",price:31,class:"植物資源",detail:"燃えるような真紅色をした植物。&竜の道で採れる。"},
  {name:"魔力草",price:32,class:"植物資源",detail:"紫色の草で、解毒作用を持つ。&ディシオン採掘場で採れる。"},
  {name:"トレーモン木",price:25,class:"植物資源",detail:"短期間で加工に適した大きさに成長する木。&修行台にされることも多い。エルの樹の麓で採れる。"},
  {name:"木材",price:112,class:"植物資源",detail:"手ごろな大きさに加工した丈夫な木材。&トレーモン木を加工すると手に入る。"},
  {name:"ワルド樹脂",price:27,class:"植物資源",detail:"高地で育つ木からとれる、&ガムのような粘り気が特徴的な樹脂。&天上の岐路でたまに採れる。"},
  {name:"ピンクコーラル",price:34,class:"植物資源",detail:"綺麗な色をした珊瑚。炭酸水に使われることがある。&トロッシュの巣で採れる。"},
  {name:"ラリネスの花",price:36,class:"植物資源",detail:"特定の場所にしか咲かない、青く光る花。&影の鉱脈で採れる。"},
  {name:"アルテラシアの花",price:35,class:"植物資源",detail:"ナソードに寄生し、その機能を停止させる&ために開発された花。&アルテラ平原で採れる。"},
  {name:"銀秤草",price:37,class:"植物資源",detail:"インクなどに使われる花。毒がある。&高価で取引されるという。&ザヤ山でたまに採れる。"},
  {name:"フォルギネイの果実",price:38,class:"植物資源",detail:"魔界の植物からとれる実。&強力な精神刺激作用を持つ。&ディシオン採掘場でたまに手に入る。"},
  {name:"エルドラシルの葉",price:12,class:"植物資源",detail:"ハーブとしても親しまれる、エルドラシルの貴重な葉。&エルの樹の麓でたまに採れる。"},
  {name:"エルダーベリー",price:11,class:"植物資源",detail:"エルドラシルが青紫色の実をつけたもの。&食べるとHPが約7回復する。&エルの樹の麓で採れる。"},
  {name:"ウィリアムりんご",price:13,class:"植物資源",detail:"ポールが育てているりんご。&様々な霊薬を錬成する材料になる。&食べるとHPが約10回復する。エルの樹の麓の敵から手に入る。"},
  {name:"もりもりニンジン",price:14,class:"植物資源",detail:"苦みが少なく生でも美味しいニンジン。&食べるとHPが約20回復する。&アルテラ平原で採れる。"},
  {name:"マンドラタマネギ",price:15,class:"植物資源",detail:"火を噴きそうになるほど辛いタマネギ。&食べると少し攻撃力が上昇する。&竜の道で採れる。"},
  {name:"スノークリスタル",price:23,class:"植物資源",detail:"断面が雪の結晶のように見える木の実。&たまに実が星形になる品種もあるらしい。&天上の岐路で手に入る。"},
  {name:"クロライトシード",price:24,class:"製造",detail:"しょっぱい味のする変わった種。&金属の製錬に使われる。"},
  {name:"キュアトマト",price:16,class:"植物資源",detail:"森に自生する真っ赤なミニトマト。&戦闘中に使うと中毒を回復する。&エルの樹の麓で採れる。"},
  {name:"砂漠サツマイモ",price:17,class:"植物資源",detail:"砂漠でも育つ太くて硬いサツマイモ。&戦闘中に使うと敵に小ダメージを与える。&ザヤ山で採れる。"},
  {name:"エルライム",price:18,class:"植物資源",detail:"暖かい地域で育つライムの実。&食べるとHPが約15回復する。&トロッシュの巣で採れる。"},
  {name:"スターフルーツ",price:21,class:"植物資源",detail:"輪切りにすると断面が星形に見える果実。&種子はココアの材料になる。&天上の岐路で採れる。"},
  {name:"エルダー小麦",price:9,class:"植物資源",detail:"寒さに強い小麦。&挽いて粉にして使うほか、植物性ミルクの材料にもなる。&エルの樹の麓などで採れる。"},
  {name:"ファルマン竹",price:28,class:"植物資源",detail:"武具にも使われる丈夫な竹。&ザヤ山で採れる。"},
  {name:"霜雪イチゴ",price:19,class:"植物資源",detail:"寒い地域で育つ野イチゴ。&食べるとHPが15回復する。&トロッシュの巣で採れる。"},
  {name:"天桃ライチ",price:20,class:"植物資源",detail:"甘酸っぱさがたまらない桃色のフルーツ。&食べるとHPが15回復する。&天上の岐路で採れる。"},
  {name:"クォークサボテン",price:30,class:"植物資源",detail:"高山で育つサボテン。刺激に反応して&冷気を発する。&天上の岐路でたまに採れる。"},
  {name:"オーガニックコア",price:78,class:"その他資源",detail:"黒い金属質の殻の中に赤い核を持つ、&まるで何かの部品のような奇妙な物質。&天上の岐路の敵から手に入る。"},
  {name:"ハーピィの羽根",price:79,class:"その他資源",detail:"鳥の魔物から舞い落ちた羽根。&竜の道の敵から手に入る。"},
  {name:"グリッターの歯",price:80,class:"その他資源",detail:"魔族から手に入る鋭い歯。&回復薬の材料になる。&アルテラ平原の敵から手に入る。"},
  {name:"うに",price:39,class:"その他資源",detail:"なぜか山で採れるうに。&戦闘で相手に小ダメージを与える。&ザヤ山で採れる。"},
  {name:"リザードバス",price:72,class:"その他資源",detail:"頭部の4本の角が特徴的なバス。&トロッシュの巣で採れる。"},
  {name:"ロブスターの抜け殻",price:73,class:"その他資源",detail:"金色の輝きを放つという&幻のロブスターの抜け殻。&トロッシュの巣で採れる。"},
  {name:"黄金ロブスター",price:74,class:"その他資源",detail:"金色の輝きを放つ、&生きた幻のロブスター。&トロッシュの巣でたまに採れる。"},
  {name:"獣肉",price:69,class:"その他資源",detail:"動物からとれた獣肉。&このままでは食べられない。&エルの樹の麓などの敵から手に入る。"},
  {name:"生肉",price:70,class:"その他資源",detail:"獣肉を加工した生肉。野生の味。&HPを回復するが中毒に危険。&獣肉を分解すると手に入る。"},
  {name:"獣の皮",price:71,class:"その他資源",detail:"動物の皮。なめして革にする。&獣肉を分解すると手に入る。"},
  {name:"質のよい革",price:116,class:"製造",detail:"本や防具の加工に適した上質な革。&　"},
  {name:"ベタベタしたエキス",price:77,class:"その他資源",detail:"動物からとれる、鼻を刺すような臭いがするエキス。&好んで集める人もいる。&竜の道の敵から手に入る。"},
  {name:"穀物粉",price:10,class:"その他資源",detail:"エルダー小麦から作られる穀物粉。&様々な料理に使われる。&エルダー小麦を分解すると手に入る。"},
  {name:"パピリオ蜜",price:68,class:"その他資源",detail:"蝶々が集めてくる花の蜜。&罪悪感を感じるほどの甘さ。&エルの樹の麓の敵から手に入る。"},
  {name:"炎鷹卵",price:76,class:"その他資源",detail:"炎熱地帯の鷹が大切そうに持っている球。&高熱を発し続けている。&ザヤ山の敵が持っている。"},
  {name:"トロッシュの粉",price:81,class:"その他資源",detail:"トロッシュの羽根から舞い落ちた緑の粉。&使い道はあまりなさそうだ。&トロッシュの巣で採れる。"},
  {name:"星屑",price:40,class:"鉱物資源",detail:"キラキラ光る乾燥した砂。&ガラス細工に用いられる。&エルの樹の麓などで採れる。"},
  {name:"ナソードメモリー",price:87,class:"その他資源",detail:"ナソードに組み込まれていた&メモリーチップの部品。わずかに帯電している。&アルテラ平原で採れる。"},
  {name:"エルティアの欠片",price:41,class:"鉱物資源",detail:"エルの涙と呼ばれる、鉱石にエルの力が宿ってできた美しい石。&天上の岐路で採れる。"},
  {name:"エルティアの粉",price:42,class:"鉱物資源",detail:"エルティアの欠片を砕いたもの。&エルティアの欠片を分解すると手に入る。"},
  {name:"ベスマ鉱石",price:46,class:"鉱物資源",detail:"渓谷で産出される鉱石。&特殊な加工によって成分を抽出できる。&竜の道でたまに採れる。"},
  {name:"ベスバイト",price:47,class:"鉱物資源",detail:"ベスマ鉱石に秘密結界の力を加えて抽出した物質。&金属の製錬に用いる。&　"},
  {name:"ムーンストーン",price:54,class:"鉱物資源",detail:"暗所で紫色に光る壊れやすい石。&ガラスの成分となる。&影の鉱脈で採れる。"},
  {name:"結界の欠片",price:44,class:"鉱物資源",detail:"何かを守っていた結界の欠片。&天上の岐路で採れる。"},
  {name:"虹霓球",price:60,class:"その他資源",detail:"虹色に光る不思議な球体。&（ヘニルの時空クリア記念アイテム）"},
  {name:"ディシオン鉱石",price:48,class:"鉱物資源",detail:"アトラス地域で採れる青い鉱石。&ディシティウムを豊富に含んでいる。&ディシオン採掘場でたまに採れる。"},
  {name:"ディシティウム",price:49,class:"鉱物資源",detail:"ディシオン鉱石の青色のもととなる金属。&軽くて丈夫なため、業種を問わず重宝される。"},
  {name:"輝霜錬石",price:50,class:"鉱物資源",detail:"極北の地域で採れる白い鉱石。&ディシオン採掘場でたまに採れる。"},
  {name:"グラキエース",price:51,class:"鉱物資源",detail:"古代の言語で氷という意味を持つ、&波模様が特徴的なひんやり冷たい鉱石。&ザヤ山でたまに採れる。"},
  {name:"アイスレート",price:52,class:"鉱物資源",detail:"グラキエースから精製される&氷の板のような金属。燃料になる。"},
  {name:"ヒートストーン",price:55,class:"鉱物資源",detail:"熱を帯びた石。&ワルド樹脂が年月を経て化石化したもの。"},
  {name:"緑柱石",price:56,class:"鉱物資源",detail:"大地の破片とも呼ばれる、翠色に輝く石。&わずかにクリソナ成分を含んでいる。&エルの樹の麓でたまに採れる。"},
  {name:"紫水晶",price:57,class:"鉱物資源",detail:"追憶の邪念とも呼ばれる、紫色に輝く石。&わずかにクリソナ成分を含んでいる。&ザヤ山でたまに採れる。"},
  {name:"閃雷石",price:58,class:"鉱物資源",detail:"連なりの雷とも呼ばれる、黄色に輝く石。&わずかにクリソナ成分を含んでいる。&アルテラ平原でたまに採れる。"},
  {name:"魔力石",price:59,class:"鉱物資源",detail:"三原色の輝きを放つ変わった石。&影の鉱脈で採れる。"},
  {name:"クリソナの欠片",price:61,class:"鉱物資源",detail:"クリソナを含んだ小さな欠片。&集めればクリソナを作れそうだ。"},
  {name:"低純度クリソナ",price:62,class:"クリソナ",detail:"不純物が混ざったクリソナ。&錬成に必要。&クリソナ原石を加工すると手に入る。"},
  {name:"高純度クリソナ",price:63,class:"クリソナ",detail:"純度の高いクリソナ。錬成に必要。"},
  {name:"最高純度クリソナ",price:64,class:"クリソナ",detail:"純度99.5%以上の非常に純度の高いクリソナ。&錬成に必要。"},
  {name:"クリソナ原石",price:65,class:"鉱物資源",detail:"自然の中にわずかに存在する、&クリソナの詰まった原石。&加工するとクリソナが手に入る。"},
  {name:"ミスリル結晶",price:122,class:"鉱物資源",detail:"銀色に輝く金属の結晶。&自然界では滅多に産出されず、幻の金属と呼ばれる。"},
  {name:"古代銀貨",price:66,class:"鉱物資源",detail:"古代エリオン王国で使用されていた銀貨。&トロッシュの巣で採れる。"},
  {name:"古代金貨",price:67,class:"鉱物資源",detail:"古代エリオン王国で使用されていた金貨。&トロッシュの巣で採れる。"},
  {name:"空っぽの水晶玉",price:97,class:"製造",detail:"ガラスでできた水晶玉。&入れ物や瓶として使える。"},
  {name:"たる",price:124,class:"製造",detail:"木材をうまく組み合わせて作ったた～る。&アイテムの最大所持数が増える。"},
  {name:"竹かご",price:125,class:"製造",detail:"ファルマン竹を編み込んで作ったかご。&アイテムの最大所持数が増える。"},
  {name:"疾風のりんご",price:90,class:"製造",detail:"食べるとたちまち体が軽くなるりんご。&探索開始前に使用すると、&次の採取中、戦闘から逃走した時も素材を獲得できる。"},
  {name:"超人のりんご",price:91,class:"製造",detail:"食べるとたちまち力がみなぎるりんご。&探索開始前に使用すると、&次の採取中、連鎖カウントがたまに2倍になる。"},
  {name:"石のりんご",price:92,class:"製造",detail:"食べるとたちまち気配が消えてしまうりんご。&探索開始前に使用すると、&次の採取中のエンカウント率が低下する。"},
  {name:"デニフの氷球",price:96,class:"製造",detail:"水のマスターの名を冠する霊薬。&飲むと基礎防御力を5上げる。"},
  {name:"ロッソの火炎輪",price:95,class:"製造",detail:"火のマスターの名を冠する霊薬。&飲むと基礎攻撃力を5上げる。"},
  {name:"炎の水晶玉",price:98,class:"製造",detail:"炎の力が込められた水晶玉。&投げると破裂して辺りを火の海にする。&戦闘で使うと敵を火傷状態にする。"},
  {name:"氷の水晶玉",price:99,class:"製造",detail:"氷の力が込められた水晶玉。&投げると破裂して強烈な冷気が発生する。&戦闘で使うと敵を凍結状態にする。"},
  {name:"自然の水晶玉",price:100,class:"製造",detail:"自然の力が込められた水晶玉。&投げると破裂して毒霧を散布する。&戦闘で使うと敵を中毒状態にする。"},
  {name:"光の水晶玉",price:101,class:"製造",detail:"光の力が込められた水晶玉。&投げると持続的な回復エリアを作り出す。&戦闘で使うと、行動後にHPが少し回復する。"},
  {name:"闇の水晶玉",price:102,class:"製造",detail:"闇の力が込められた水晶玉。&投げると持続的に力を奪う結界を作り出す。&戦闘で使うと、敵の攻撃力を下げる。"},
  {name:"風の水晶玉",price:103,class:"製造",detail:"風の力が込められた水晶玉。&投げると弾けて辺り一帯に風塵をばら撒く。&戦闘で使うと、敵の防御力を下げる。"},
  {name:"木の槍",price:104,class:"製造",detail:"木でできた槍。&敵に小ダメージを与える。&たまに相手をひるませる効果がある。"},
  {name:"光の槍",price:105,class:"製造",detail:"光のエルの力を宿した槍。&敵に中ダメージを与え、たまにひるませる。&グリッター系に特攻ダメージを与える。"},
  {name:"シュティルレンツェ",price:106,class:"製造",detail:"神聖なエルの力を宿した沈黙の槍。&敵に中ダメージを与え、たまにひるませる。&シャドウ系に特攻ダメージを与える。"},
  {name:"チャージドボルト",price:107,class:"製造",detail:"強力に帯電したうに。&敵に中ダメージを与える。&水棲系に特攻ダメージを与える。"},
  {name:"イラスティックボム",price:108,class:"製造",detail:"投擲用の小型爆弾。&敵に中ダメージを与える。&ナソード系に特攻ダメージを与える。"},
  {name:"ホーネットスティング",price:109,class:"製造",detail:"護身用の爆竹。&戦闘中に使うと大ダメージを与える。"},
  {name:"浮遊石",price:120,class:"製造",detail:"魔法に反応して浮力を発生させる石。&飛行船の動力源にも使われる。"},
  {name:"ネンヤ竹炭",price:118,class:"製造",detail:"ファルマン竹を原料として作られる炭。&燃料だけでなく、消臭剤にもなる。"},
  {name:"デボラ縫合糸",price:115,class:"製造",detail:"ルーブ糸に動物性線維を練りこみ、&伸縮性に優れた糸。"},
  {name:"スポア軟膏",price:129,class:"製造",detail:"アルテラシアの花からとれる&成分を使った塗り薬。&HPが64回復する。"},
  {name:"闘魂ドリンク",price:154,class:"製造",detail:"短時間だが効力のある精力剤。&味はゲロマズ。&戦闘中に使うと攻撃力が大きく上昇する。"},
  {name:"ナソードアーマー",price:155,class:"製造",detail:"スイッチを入れると一時的に&シールドを展開するナソードギア。&戦闘中に使うと防御力が上昇する。"},
  {name:"ＱＰエルゼリー",price:156,class:"製造",detail:"栄養の詰まったペット用のゼリー。&戦闘で使用すると、&モンスターと仲良くなれるかもしれない。"},
  {name:"ガッツポトフ",price:146,class:"製造",detail:"色んな野菜が入った栄養満点のポトフ。&戦闘中に使うと食いしばり効果を付与する。"},
  {name:"ボルケーノトルテ",price:149,class:"製造",detail:"火炎草を生地に混ぜ込んだ&トルティーヤ。病みつきになる味。&爆発攻撃が出やすくなる。"},
  {name:"竜牙爆砕丸",price:93,class:"製造",detail:"陽の気を高める効果がある丸薬。&HPの最大値を50増やす。"},
  {name:"回光返照丸",price:94,class:"製造",detail:"陰の気を高める効果がある丸薬。&クリソナ精製時の純度を1%増やす。"},
  {name:"デブリアンココア",price:131,class:"製造",detail:"エルダー麦から作られるカフェラテ。&カフェインゼロで子供も飲みやすい。&HPを45回復する。"},
  {name:"スッキリ茶",price:132,class:"製造",detail:"一口飲むだけで気分が浄化されるお茶。&火傷・中毒・氷結状態を回復する。"},
  {name:"エルファイテール",price:133,class:"製造",detail:"エルライム香る炭酸ジュース。&HPが50回復する。"},
  {name:"アセラシェイク",price:134,class:"製造",detail:"霜雪イチゴを使った冷たいかき氷。&夏にぴったり。&HPが50回復し、火傷も治す。"},
  {name:"スパイシーサラダ",price:150,class:"製造",detail:"野菜たっぷりのスパイシーサラダ。&HPが60回復する。"},
  {name:"活力ポーション",price:137,class:"製造",detail:"冒険者御用達のポーション。&慣れた冒険者は頭から浴びて使用する。&HPが30％回復する。"},
  {name:"上級活力ポーション",price:138,class:"製造",detail:"より効力を高めた活力のポーション。使用法は同じ。&HPが50％回復する。"},
  {name:"エルダー麦パン",price:139,class:"製造",detail:"エルダー小麦を使った麦パン。&HPが55回復する。"},
  {name:"ポールクッキー",price:140,class:"製造",detail:"ポールの形をしたかわいいお菓子。&HPが45回復する。"},
  {name:"星果クッキー",price:141,class:"製造",detail:"スターフルーツがほんのり香るクッキー。&HPが50回復する。"},
  {name:"MIXベリーケーキ",price:142,class:"製造",detail:"野イチゴとエルダーベリーを使ったケーキ。&HPが100回復する。"},
  {name:"フライドチキン",price:143,class:"製造",detail:"塩味の木の実で軽く味付けしたフライドチキン。&HPが80回復する。"},
  {name:"ウィンドミルポテト",price:144,class:"製造",detail:"砂漠サツマイモを渦巻き状に&スラッシュ＆フライしたポテト。&HPが100回復する。"},
  {name:"塩焼き魚",price:145,class:"製造",detail:"リザードバスを塩焼きにしたもの。&HPが120回復する。"},
  {name:"甘辛スキュアー",price:151,class:"製造",detail:"ピリ辛の串料理。スタミナ抜群。&HPが85回復し、攻撃力も上昇する。"},
  {name:"竹の葉餃子",price:147,class:"製造",detail:"北部地域でよく食べられる、&穀物粉の生地に肉などを包んだ料理。&HPが130回復する。"},
  {name:"特選タコスランチ",price:152,class:"製造",detail:"肉や野菜をトルティーヤに包んだ&タコスランチ。攻撃力が上昇し、&HPが最大値を超えて300回復する。"},
  {name:"黄金海鮮三昧",price:153,class:"製造",detail:"海の幸を贅沢に詰め込んだ海鮮料理。&戦闘中に使うとHPを全回復する。"},
  {name:"共存の祝祭パイ",price:148,class:"製造",detail:"共存の祝祭の間食べられるアップルパイ。&HPが70回復する。"},
  {name:"魔法のスクロール",price:117,class:"製造",detail:"破るとランダムな位置にワープするスクロール。&　"},
  {name:"ベリル式精製炉",price:126,class:"製造",detail:"鉱石からクリソナ成分を効率よく取り出せる炉。&所持していると、クリソナ原石から&より高純度なクリソナが加工できるようになる。"},
  {name:"ベリル式錬成陣",price:127,class:"製造",detail:"リティアが発明した、&クリソナを介することなく宝石を生み出す魔法陣。&鉱石を直接ジェムストーンに加工できるようになる。"},
  {name:"がらくた",price:157,class:"製造",detail:"がらくたとしか呼びようがない、&こまごまとした金属。&投げつけるくらいしか使い道は無さそうだ。"},
  {name:"エナジーディスク",price:123,class:"製造",detail:"とてつもない力を秘めた&薄い円盤状の物質。"},
  {name:"岩花の実",price:33,class:"鉱物資源",detail:"まるで岩のように硬い実。&竜の道でたまに採れる。"},
  {name:"イースの鱗",price:82,class:"その他資源",detail:"水の精霊からこぼれおちた鱗。&天上の岐路の敵が持っている。"},
  {name:"精霊の涙",price:83,class:"その他資源",detail:"水の精霊からこぼれおちた涙。&トロッシュの巣の敵が持っている。"},
  {name:"絡みあう元素欠片",price:45,class:"鉱物資源",detail:"わずかに3元素の魔力が残った欠片。&影の鉱脈で採れる。"},
  {name:"ゴーレムの核",price:85,class:"その他資源",detail:"ゴーレムの動力となっていた魔核。&　"},
  {name:"ウィンドストーン",price:53,class:"鉱物資源",detail:"風の力を発生させる効果のある軽い石。&　"},
  {name:"ルベニアンの精気",price:43,class:"その他資源",detail:"エルの気が目に見えるほど&高濃度に結晶化したもの。&エルティアの欠片を加工すると手に入る。"},
  {name:"ダークネスコア",price:89,class:"その他資源",detail:"魔気が結集した球体。&影の鉱脈の敵が持っている。"},
  {name:"リティア電気石",price:121,class:"鉱物資源",detail:"熱すると電気を帯びる性質を持つ、&黄緑色の結晶。&　"},
  {name:"エルダーミルク",price:100,class:"製造",detail:"麦を原料につくった植物性のミルク。&つい腰に手を当てて飲んでしまう。&HPが40回復する。"},
  {name:"イワトレーモン木",price:26,class:"植物資源",detail:"高所でより硬く育ったトレーモンの木。&樹脂を含んでいる。&天上の岐路でたまに採れる。"},
  {name:"マジックスリング",price:110,class:"製造",detail:"リティアお得意の、伸び縮みするスリング。&使用ターン中、攻撃を必ず回避する。"},
  {name:"トゥラックランタン",price:119,class:"製造",detail:"竹炭を燃料に明かりをつくり出すランタン。&どんな闇も明るく照らしてくれそうだ。"},
  {name:"凝縮したマナ",price:86,class:"その他資源",detail:"マナが詰まった球体。&ディシオン採掘場などの敵から手に入る。"},
  {name:"コモドのしっぽ",price:84,class:"その他資源",detail:"渓谷地帯に生息するトカゲのしっぽ。&竜の道の敵が持っている。"},
  {name:"チェインパウダー",price:22,class:"その他資源",detail:"スターフルーツをすりつぶした粉。&ほんのりチョコの香りがする。"},
  {name:"ファルマン筍",price:29,class:"植物資源",detail:"ファルマン竹が育つ山岳地帯で&たまに見つかる大きなタケノコ。&ザヤ山でたまに手に入る。"},
  {name:"TYPE-Cコア",price:88,class:"その他資源",detail:"第三世代のナソードコア。&ディシオン採掘場の敵から手に入る。"},
  {name:"魔力草のジュース",price:135,class:"製造",detail:"魔力草を煮詰めて作ったジュース。&効能はその時の運次第。&HPをランダムに回復する。"},
  {name:"炎のスムージー",price:136,class:"製造",detail:"燃えるような赤色のジュース。&使うと凍結状態を回復する。"},
  {name:"貪欲のメダル",price:111,class:"製造",detail:"持っているだけで&素材が集まってくる魔法のメダル。&持っているとアイテムドロップが2倍になる（自動消費）"},
  {name:"茹でロブスター",price:75,class:"製造",detail:"茹で上がった金色ロブスター。&食べるのがもったいないほどの高級感だ。&HPが70回復する。"},
  {name:"アポカリプスピッケル",price:158,class:"製造",detail:"無限のエネルギーを秘めた武器。&持っていると攻撃力がアップする。"},
]
  for(var i=0; i<itemA.length;i++){
    itemA[i].id=i;
  }
  itemA.sort(compareFuncID);
var itemClassAry=[1,"素材（全て）","素材（植物資源）","素材（鉱物資源）","素材（その他）","クリソナ","製造","戦闘","強化・探索準備"]
var battleLog=[];//メッセージ格納
var UserStatus=[100,100,100,0,0];//HP,ATK,DEF,純度plus,りんご
var StatusP=[100,100,100];//HP,ATK,DEF
var StatusE_df=[30,30,30,0];//default
var StatusE=[30,30,30,0];//3->type
var EscapeRate=[0,50];//0->逃走試行回数 1->逃走確率
var Pbuff=[];
var Ebuff=[];
var HPtrigger_li=[0,0,0,0,0];
var Bturn=1;//経過ターン
var OPname;
var Enemylist=[
  {name:"ポール",St:[50,50,50,0],Dropitem:[24],HPtrigger:[],route:[0,14]},
  {name:"グリピグ",St:[75,120,50,0],Dropitem:[45],HPtrigger:[],route:[15]},
  {name:"ソソ",St:[60,60,60,0],Dropitem:[20],HPtrigger:[],route:[0,17,37]},
  {name:"火山の炎鷹",St:[150,120,60,0],Dropitem:[52],HPtrigger:[],route:[0,16]},
  {name:"プリンチュ",St:[120,90,60,0],Dropitem:[26],HPtrigger:[],route:[0,41]},
  {name:"パピリオ",St:[100,150,80,0],Dropitem:[51],HPtrigger:[],route:[0,0,37]},
  {name:"ガルファイハーピィ",St:[100,150,80,0],Dropitem:[39],HPtrigger:[],route:[0,17,17,37]},
  {name:"ヘルナオーブ",St:[170,90,100,4],Dropitem:[55],HPtrigger:[],route:[0,18]},
  {name:"アルポコピュリタ",St:[190,160,60,4],Dropitem:[153],HPtrigger:[],route:[0,19]},
  {name:"コマンドオーガニックコア",St:[140,110,70,4],Dropitem:[38],HPtrigger:[],route:[0,35]},
  {name:"グリッターランサー",St:[180,170,75,1],Dropitem:[40],HPtrigger:[],route:[0,15]},
  {name:"グリッターアーチャー",St:[130,180,55,1],Dropitem:[40],HPtrigger:[],route:[0,42,43]},
  {name:"マーマン",St:[120,160,60,3],Dropitem:[42],HPtrigger:[],route:[0,14,45]},
  {name:"ラグズ",St:[145,120,120,3],Dropitem:[138],HPtrigger:[],route:[0,26,32]},
  {name:"イース",St:[160,135,60,3],Dropitem:[137],HPtrigger:[],route:[0,33]},
  {name:"ファイアコモド",St:[160,120,110,0],Dropitem:[150],HPtrigger:[],route:[0,20]},
  {name:"シャドウドリラー",St:[240,200,60,2],Dropitem:[143],HPtrigger:[],route:[0,15,40]},
  {name:"シャドウガード",St:[210,120,130,2],Dropitem:[143],HPtrigger:[],route:[0,22,44]},
  {name:"アルロン",St:[75,120,80,0],Dropitem:[49],HPtrigger:[],route:[0,40,18]},
  {name:"マナイーター",St:[80,120,160,0],Dropitem:[81],HPtrigger:[],route:[0]},
  {name:"ストーンゴーレム",St:[250,70,170,0],Dropitem:[140],HPtrigger:[],route:[0,21,22,34]},
  {name:"トロッシュ",St:[260,180,130,3],Dropitem:[53],HPtrigger:[130],route:[0,26,26,23]},
  {name:"ドラバキ",St:[300,220,65,3],Dropitem:[143],HPtrigger:[100],route:[20,25,28,36]},
  {name:"オベザール",St:[900,250,150,0],Dropitem:[],HPtrigger:[810,630,540,450,360,270,180,90],route:[27,28,29]},
]
var Skilllist=[
  {sp:0,name:"通常攻撃（弱）",detail:"　",power:30,PP:0,hitrate:100},
  {sp:0,name:"通常攻撃（中）",detail:"　",power:40,PP:0,hitrate:100},
  {sp:0,name:"通常攻撃（強）",detail:"　",power:60,PP:0,hitrate:100},
  {sp:0,name:"通常攻撃（クリティカル）",detail:"　",power:80,PP:0,hitrate:100},
  {sp:0,name:"うに",detail:"　",power:40,PP:0,hitrate:100},
  {sp:0,name:"砂漠サツマイモ",detail:"　",power:50,PP:0,hitrate:70},
  {sp:0,name:"がらくた",detail:"　",power:20,PP:0,hitrate:70},
  {sp:0,name:"がらくた爆発",detail:"　",power:200,PP:0,hitrate:90},
  {sp:0,name:"木の槍",detail:"　",power:35,PP:0,hitrate:90},
  {sp:1,name:"光の槍",detail:"　",power:55,PP:0,hitrate:100},
  {sp:2,name:"シュティルレンツェ",detail:"　",power:95,PP:0,hitrate:100},
  {sp:3,name:"チャージドボルト",detail:"　",power:80,PP:0,hitrate:100},
  {sp:4,name:"イラスティックボム",detail:"　",power:90,PP:0,hitrate:100},
  {sp:0,name:"ホーネットスティング",detail:"　",power:120,PP:0,hitrate:100},
  {sp:0,name:"遠くを見ている",detail:"は&遠くを見ている・・・",power:-1,PP:0,hitrate:100},//14
  {sp:0,name:"突進攻撃",detail:"は&突進してきた！",power:45,PP:0,hitrate:80},
  {sp:0,name:"ブレイズウィング",detail:"の&ブレイズウィング！",power:65,PP:0,hitrate:90},
  {sp:0,name:"つつく攻撃",detail:"の&つっつき攻撃だ！",power:40,PP:0,hitrate:90},
  {sp:0,name:"回転",detail:"は&くるくるまわってる・・・",power:-1,PP:0,hitrate:100},//18
  {sp:0,name:"エレクトロンブースター",detail:"の&エレクトロンブースター！",power:85,PP:0,hitrate:65},
  {sp:0,name:"ブレス",detail:"はブレスを吐いた！",power:45,PP:0,hitrate:80},
  {sp:0,name:"がちゃがちゃ",detail:"は&ガチャガチャ音を鳴らしている！",power:-1,PP:0,hitrate:100},//21
  {sp:0,name:"ボディプレス",detail:"の押しつぶし攻撃！",power:60,PP:0,hitrate:75},
  {sp:0,name:"サークルエレメンタル",detail:"の&サークルエレメンタル！",power:50,PP:0,hitrate:100},
  {sp:0,name:"ソーンズオーラ",detail:"は&ソーンズオーラをまとった！",power:0,PP:0,hitrate:100},
  {sp:0,name:"かみつく",detail:"の&かみつき攻撃だ！",power:60,PP:0,hitrate:90},
  {sp:0,name:"水玉",detail:"は&水球を飛ばしてきた！",power:20,PP:0,hitrate:90},
  {sp:0,name:"アッパーカット",detail:"の&アッパーカットだ！",power:50,PP:0,hitrate:90},
  {sp:0,name:"ブルータルスウィング",detail:"の&ブルータルスウィング！",power:75,PP:0,hitrate:90},
  {sp:0,name:"放電",detail:"は&電撃をまき散らした！",power:30,PP:0,hitrate:100},
  {sp:0,name:"分身雷撃",detail:"の&五連雷撃タックル！",power:260,PP:0,hitrate:100},
  {sp:0,name:"ダウン",detail:"は&攻撃の反動で動けない！",power:0,PP:0,hitrate:70},//31
  {sp:0,name:"凍える冷気",detail:"の&凍える冷気！",power:20,PP:0,hitrate:90},
  {sp:0,name:"呪いの呪文",detail:"は&呪いの呪文をつぶやいた！",power:20,PP:0,hitrate:90},
  {sp:0,name:"岩投げ",detail:"の&岩投げアタック！",power:60,PP:0,hitrate:60},
  {sp:0,name:"老化攻撃",detail:"は&気持ち悪い球体を放ってきた！",power:45,PP:0,hitrate:80},
  {sp:0,name:"とぐろ",detail:"は&とぐろを巻いている！",power:0,PP:0,hitrate:70},//36
  {sp:0,name:"はばたき",detail:"は&羽をパタパタさせている・・",power:0,PP:0,hitrate:70},//37
  {sp:0,name:"サンドストーム",detail:"の&サンドストーム！",power:20,PP:0,hitrate:80},
  {sp:0,name:"ひるみ",detail:"は&ひるんで動けない！",power:0,PP:0,hitrate:70},//39
  {sp:0,name:"ローリング",detail:"の&ローリングタックルだ！",power:80,PP:0,hitrate:90},
  {sp:0,name:"葉っぱカッター",detail:"は&葉っぱを振り回した！",power:60,PP:0,hitrate:90},
  {sp:0,name:"アークショット",detail:"の&弓矢の連続攻撃だ！",power:60,PP:0,hitrate:90},
  {sp:0,name:"ポイズンアロー",detail:"は&弓矢を放った！",power:35,PP:0,hitrate:90},
  {sp:0,name:"ワンダーウォール",detail:"は&闇の防壁をまとった！",power:60,PP:0,hitrate:90},
  {sp:0,name:"リザードショット",detail:"は&魚を投げつけた！",power:60,PP:0,hitrate:85},
]
var Bufflist=[
  //t -1->表示しない
  {name:"闘魂ドリンク",detail:"攻撃↑↑",t:0},
  {name:"やけど",detail:"持続ダメージ",t:1},
  {name:"中毒",detail:"持続ダメージ",t:1},
  {name:"凍結",detail:"行動不能",t:1},
  {name:"ナソードアーマー",detail:"防御↑",t:0},
  {name:"マンドラタマネギ",detail:"攻撃↑",t:0},
  {name:"甘辛スキュアー",detail:"攻撃↑",t:0},
  {name:"風の水晶玉",detail:"防御↓",t:1},
  {name:"闇の水晶玉",detail:"攻撃↓",t:1},
  {name:"光の水晶玉",detail:"持続回復",t:0},
  {name:"ボルケーノトルテ",detail:"爆発力↑",t:0},
  {name:"スリング",detail:"回避",t:0},
  {name:"ガッツポトフ",detail:"食いしばり付与",t:0},
  {name:"ジョイフルライト",detail:"全能力↑↑　食いしばり付与",t:0},
  {name:"雷分身",detail:"チャージ",t:0},
  {name:"レイジモード",detail:"攻撃↑",t:0},
  {name:"呪い",detail:"反射ダメージ",t:1},
  {name:"盲目",detail:"命中率↓",t:1},
  {name:"スタン",detail:"行動不可",t:1},
  {name:"反動",detail:"行動不可",t:1},
  {name:"ワンダーウォール",detail:"防御↑",t:0},
  {name:"満身創痍",detail:"満身創痍",t:-1},
]
//sp 1->グリッター 2->シャドゥ 3->水棲 4->ナソード
var userPet=[];
//レシピから作る
//素材を選んでつくる
//分解、錬成フィルター用
const disassemble=new Array(5,14,15,17,32,33,38,44,45,56,63,65,69,70,71,72,73,77,146)
const assembleA=new Array(1,2,3,4,7,8,9,11,12,13,16,17,28,48,59,61,64,65,67,68,72,74,78,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,135,143,144,145,147,148,149,154,155,156,158)
//戦闘
const consumptionA=new Array(9,23,24,25,26,29,30,31,35,36,41,46,89,90,91,92,93,94,95,96,97,98,99,100,104,105,106,107,108,109,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,134,145,147,154,155,157);
const medicineA=new Array(84,85,86,87,88,110,111);
var vpronum=0;
var vmatnameA=[]
var vmatnumA=[]
//思いついた・覚えたレシピを随時追加
var userRecipe=[1,11,81,82,113];
//錬成補助
var AsmAry=[];
var AsmAry2=[];
var crisonaA=[];
var successRate=0;
//item[0]伐採 [1]採掘 cleared -1->未判明 0->メニューに？？？と表示
var henirarea=[
  {name:"エルの樹の麓",Nitem:[[5,5,29],[54]],Ritem:[[14,23],[73]],SRitem:[[22],[69]],Monster:["パピリオ","ポール","グリピグ"]},
  {name:"天上の岐路",Nitem:[[27,36],[60]],Ritem:[[37,32],[56]],SRitem:[[146],[61]],Monster:["ヘルナオーブ","コマンドオーガニックコア","イース"]},
  {name:"アルテラ平原",Nitem:[[33],[25]],Ritem:[[12],[141]],SRitem:[[19],[71]],Monster:["グリッターランサー","アルロン","グリピグ","グリッターアーチャー"]},
  {name:"ディシオン採掘場",Nitem:[[32],[54,55]],Ritem:[[13],[63]],SRitem:[[21],[65]],Monster:["プリンチュ","アルポコピュリタ","マナイーター"]},
  {name:"ザヤ山",Nitem:[[5,34,34],[26,30]],Ritem:[[41],[66,60]],SRitem:[[20],[152]],Monster:["ソソ","火山の炎鷹","パピリオ","マナイーター"]},
  {name:"トロッシュの巣",Nitem:[[10,17],[53,66]],Ritem:[[43,35],[66,79]],SRitem:[[44],[80]],Monster:["ラグズ","マーマン","トロッシュ","マナイーター"]},
  {name:"影の鉱脈",Nitem:[[5,13,36],[60]],Ritem:[[27],[70,139]],SRitem:[[18],[72]],Monster:["ストーンゴーレム","シャドウドリラー","シャドウガード","マナイーター"]},
  {name:"竜の道",Nitem:[[12],[26]],Ritem:[[31,49],[58]],SRitem:[[136],[68]],Monster:["アルロン","ポール","ガルファイハーピィ","ファイアコモド"]},
  {name:"ヘニルの時空-最表層",Nitem:[[],[]],Ritem:[[],[]],SRitem:[[],[]]},
];
for(var i=0; i<henirarea.length;i++){
  henirarea[i].cleared=-1;
  henirarea[i].id=i;
}
henirarea[0].cleared=0;
var UserItem=new Array(160);
UserItem.fill(0);//採取インベントリ
var Crisona=[];//クリソナは固有インベ
var UserLibrary=new Array(160);
UserLibrary.fill(0);//採取インベントリ
var itemMax=[1,30,50,99];//インベ所持Max
var itemAry=[0];//インベントリ
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
  "UserItem":UserItem,
  "Crisona":Crisona,
  "UserLibrary":UserLibrary,
  "Recipe":userRecipe,
  "Pet":userPet,
  "Area":henirarea,
  "Status":UserStatus,
  "Playtime":playtime,
  "Monster":defeatedmonster,
  "Melon":melonList,
  "SS":achieve_SS,
  "Totalcardmove":totalcardmove,
  "highscore":[
    {time:[324000,324000,324000],score:[-1,-1,-1]},
    {time:[324000,324000,324000],score:[-1,-1,-1]},
    {time:[324000,324000,324000],score:[-1,-1,-1]},
    {time:[324000,324000,324000],score:[-1,-1,-1]},
    {time:[324000,324000,324000],score:[-1,-1,-1]},
    {time:[324000,324000,324000],score:[-1,-1,-1]},
  ]
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
  "UserItem":UserItem,
  "Crisona":Crisona,
  "UserLibrary":UserLibrary,
  "Recipe":userRecipe,
  "Pet":userPet,
  "Area":henirarea,
  "Status":UserStatus,
  "Playtime":playtime,
  "Totalcardmove":totalcardmove,
  "Monster":defeatedmonster,
  "Melon":melonList,
  "SS":achieve_SS,
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
melonList=getdata.Melon.concat()
achieve_SS=getdata.SS.concat();
UserItem=getdata.UserItem.concat();
Crisona=getdata.Crisona.concat();
userRecipe=getdata.Recipe.concat();
userPet=getdata.Pet.concat();
UserLibrary=getdata.UserLibrary.concat();
UserStatus=getdata.Status.concat();
defeatedmonster=getdata.Monster;
UserLibrary[0]=0;
UserLibrary[76]=0;
//追加データ部分　undefinedなら初期値にしておく
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
for(var i=0; i<getdata.Area.length; i++){
  var A=henirarea.findIndex(value=>value.name==getdata.Area[i].name);
  if(A!==-1){
    henirarea[A].cleared=getdata.Area[i].cleared;
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
highscore=[
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
  {time:[324000,324000,324000],score:[-1,-1,-1]},
]
for(var i=0; i<achieve.length;i++){
  achieve[i].cleared=0;
}
for(var i=0; i<inventory.length;i++){
  inventory[i].cleared=0;
}
inventory[0].cleared=1;
for(var i=0; i<henirarea.length;i++){
  henirarea[i].cleared=-1;
}
henirarea[0].cleared=0;
UserItem=new Array(160);
UserItem.fill(0);
UserLibrary=new Array(160);
UserLibrary.fill(0);
Crisona=[];
userRecipe=[1,11,81,82,113];
userPet=[];
GamestartT=0;
defeatedmonster=0;
melonList=[0,0];
achieve_SS=[0,0,0];
UserStatus=[100,100,100,0,0];
//shut down
Bgm.stop();
musicnum=0;
Titleyard.removeAllChildren();
Configmap.removeAllChildren();
Titleyard.addChild(t);
TitleGrh();
var t = new createjs.Text(titletext, "24px serif", "white");
  t.textAlign = "end";
  t.x=790;
  Titleyard.addChild(t);
  var t = new createjs.Text("音の設定ができます。（あとから変更可能）", "24px serif", "white");
  t.textAlign = "end";
  t.x=800;
  t.y=30;
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
function saveDL(){
    var json_obj = {
      "Title": "this is save data from SoLithia",
      "Volume":vBar,
      "SEVolume":sBar,
      "Mute":mute,
      "Volume": vBar,
      "SEVolume": sBar,
      "Cleared":cleared,
      "Highscore":highscore,
      "Achieve":achieve,
      "Inventory":inventory,
      "UserItem":UserItem,
      "Crisona":Crisona,
      "UserLibrary":UserLibrary,
      "Recipe":userRecipe,
      "Pet":userPet,
      "Area":henirarea,
      "Status":UserStatus,
      "Playtime":playtime,
      "Totalcardmove":totalcardmove,
      "Monster":defeatedmonster,
      "Melon":melonList,
      "SS":achieve_SS,
    }
    console.log(json_obj)
    var write_json=JSON.stringify(json_obj);
    var blob=new Blob([write_json],{type: 'application/json'});
    var a =document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download='solithia_save.json';
    a.click();
    URL.revokeObjectURL(a.href);
    alert("【セーブデータ】\nファイル名／「solithia_save.json」\n保存方法／ファイルの中身や拡張子は変更しないでください。\n※セーブデータを読み込む際は、メニュー画面の状態で、画面枠外下部に記載の『ファイル選択』ボタンから、ダウンロードしたファイルを選んでくださいね。");
}
function saveUP(){
  var getdata; // 読込むデータ
  var button_read=document.createElement('input');
  button_read.setAttribute('type', 'file');
  // 参照要素を取得
  var sp2 = document.getElementById("child")
  // 親要素を取得
  var parentDiv = sp2.parentNode
  // 新しい要素を sp2 の手前に挿入
  parentDiv.insertBefore(button_read, sp2)
  //ボタン追加ここまで
  button_read.addEventListener("change" , function(){
      if(!(button_read.value)) return; // ファイルが選択されない場合
      var file_list=button_read.files;
      if(!file_list) return; // ファイルリストが選択されない場合
      var file=file_list[0];
      if(!file) return; // ファイルが無い場合
      if(JSON.parse(localStorage.getItem('UserData_SoL')) !== null){
        var result = window.confirm('現在プレイ中のデータが上書きされますがよろしいですか？');
      if(!result) {
        console.log('upload cancelled');
        button_read.value = "";
        return;
          }
        }
      var file_reader=new FileReader();
      file_reader.readAsText(file);
      file_reader.onload=function(){
      if(file_reader.result.slice(1, 41)=='"Title":"this is save data from SoLithia'){
      // .jsonの確認
  getdata=JSON.parse(file_reader.result); // 読込んでdataを上書き
  sp2.innerHTML = "<h1>Welcome Back!</h1>"
  //各々グローバル変数に代入していく
  vBar=getdata.Volume;
  sBar=getdata.SEVolume;
  cleared=getdata.Cleared.concat();
  playtime=getdata.Playtime;
  totalcardmove=getdata.Totalcardmove;
  melonList=getdata.Melon.concat()
  achieve_SS=getdata.SS.concat();
  UserItem=getdata.UserItem.concat();
  Crisona=getdata.Crisona.concat();
  UserLibrary=getdata.UserLibrary.concat();
  UserStatus=getdata.Status.concat();
  userRecipe=getdata.Recipe.concat();
  userPet=getdata.Pet.concat();
  defeatedmonster=getdata.Monster;
  UserLibrary[0]=0;
  UserLibrary[76]=0;
  //追加データ部分　undefinedなら初期値にしておく
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
  for(var i=0; i<getdata.Area.length; i++){
    var A=henirarea.findIndex(value=>value.name==getdata.Area[i].name);
    if(A!==-1){
      henirarea[A].cleared=getdata.Area[i].cleared;
    }
  }
  highscore=getdata.Highscore.concat();
  SEbuffer();
  PopAnm("✅セーブデータを読み込みました",1200,300,35,30,95);
  saveLocal();
  }  
  else{
      alert("❌　ファイルが異なります。");
      button_read.value = "";
  }}});
  }
function SEbuffer(p=0){
if(p!==0){
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
  se21.volume(0);
  se22.volume(0);
  se23.volume(0);
  se24.volume(0);
  se25.volume(0);
  se26.volume(0);
  se27.volume(0);
  se28.volume(0);
  se29.volume(0);
  se30.volume(0);
  se31.volume(0);
  se32.volume(0);
  jingle.volume(0);
}else{
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
  se13.volume(0.4*sBar);
  se14.volume(0.3*sBar);
  se15.volume(0.2*sBar);
  se16.volume(0.4*sBar);
  se17.volume(0.2*sBar);
  se18.volume(0.3*sBar);
  se19.volume(0.2*sBar);
  se20.volume(0.5*sBar);
  se21.volume(0.4*sBar);
  se22.volume(0.4*sBar);
  se23.volume(0.4*sBar);
  se24.volume(0.2*sBar);
  se25.volume(0.2*sBar);
  se26.volume(0.3*sBar);
  se27.volume(0.2*sBar);
  se28.volume(0.3*sBar);
  se29.volume(0.3*sBar);
  se30.volume(0.3*sBar);
  se31.volume(0.3*sBar);
  se32.volume(0.3*sBar);
  jingle.volume(0.1*sBar);
  }
}
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
  src:"decision3.mp3",
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
    src:"put_bucket.mp3",
    volume: 0.4,
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
  src:"escape_comical.mp3",
      volume: 0.2,
  });
var se18 = new Howl({
  src:"Cyber20.mp3",
      volume: 0.3,
  });
var se19 = new Howl({
  src:"Impact04-3.mp3",
      volume: 0.2,
  });
var se20 = new Howl({
  src:"kaiju_foot.mp3",
  volume: 0.5,
  });
var se21 = new Howl({
  src:"throw_knife.mp3",
  volume: 0.4,
  });
var se22 = new Howl({
  src:"hitSE6.mp3",
  volume: 0.4,
  });
var se23 = new Howl({
  src:"maou_se_battle18.mp3",
  volume: 0.4,
  });
var se24 = new Howl({
  src:"maou_se_battle19.mp3",
  volume: 0.15,
  });
var se25 = new Howl({
  src:"Negative02.mp3",
  volume: 0.2,
  });
var se26 = new Howl({
  src:"recovery2.mp3",
  volume: 0.3,
  });
var se27 = new Howl({
  src:"free_sound1.mp3",
  volume: 0.2,
  });
var se28 = new Howl({
  src:"glissando2.mp3",
  volume: 0.3,
  });
var se29 = new Howl({
  src:"chain.mp3",
  volume: 0.3,
  });
var se30 = new Howl({
  src:"swing.mp3",
  volume: 0.3,
  });
var se31 = new Howl({
  src:"crush3.mp3",
  volume: 0.3,
  });
var se32 = new Howl({
  src:"tukkomi1.mp3",
  volume: 0.3,
  });
var jingle = new Howl({
  src:"INSOMNIA.mp3",
  volume: 0.15,
})
const bgm1data ={
    src: "PerituneMaterial_EpicBattle_Deity_loop.mp3",
    loopStart: 0,
    loopEnd: 117660,
    volume: 0.08,
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
    src: "PerituneMaterial_Soft_Day2_loop.mp3",
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
  const bgm6data ={
    src: "PerituneMaterial_Foreboding_loop.mp3",
    loopStart: 0,
    loopEnd: 129870,
    volume: 0.1,
  };
  const bgm7data ={
    src: "Stage_Noahs.mp3",
    loopStart: 340,
    loopEnd: 50710,
    volume: 0.6,
  };
  const bgm8data ={
    src: "soL_milestone_inst.mp3",
    loopStart: 22300,
    loopEnd: 148500,
    volume: 0.55,
  };
  const bgm9data ={
    src: "soL_elision.mp3",
    loopStart: 100,
    loopEnd: 112100,
    volume: 0.4,
  };
  const bgm10data ={
    src: "Lunadom_plain.mp3",
    loopStart: 100,
    loopEnd: 88910,
    volume: 0.6,
  };
  const bgm11data ={
    src: "Stage_Trosh.mp3",
    loopStart: 8590,
    loopEnd: 95830,
    volume: 0.6,
  };
  const bgm12data ={
    src: "Stage_feiterA_li.mp3",
    loopStart: 10040,
    loopEnd: 95370,
    volume: 0.6,
  };
  //採掘場bgmは暫定
const bgm13data ={
  src: "Sortie_Rena.mp3",
  loopStart: 3630,
  loopEnd: 72950,
  volume: 0.6,
};
const bgm14data ={
  src: "Stage_Bethma.mp3",
  loopStart: 1150,
  loopEnd: 98610,
  volume: 0.25,
};
const bgm15data ={
  src: "PerituneMaterial_Irregular_loop.mp3",
  loopStart: 0,
  loopEnd: 196370,
  volume: 0.07,
};
const bgm16data ={
  src: "Stage_Altera.mp3",
  loopStart: 370,
  loopEnd: 167160,
  volume: 0.3,
};
const bgm17data ={
  src: "pichon.mp3",
  loopStart: 0,
  loopEnd: 8000,
  volume: 0.25,
};
const bgm18data ={
  src: "Unrest_KBF_li.mp3",
  loopStart: 14250,
  loopEnd: 173120,
  volume: 0.5,
};
const bgm19data ={
  src: "Unrest_Secluded_li.mp3",
  loopStart: 4250,
  loopEnd: 92200,
  volume: 0.7,
};
const bgm20data ={
  src: "Scene_Climax.mp3",
  loopStart: 80,
  loopEnd: 108250,
  volume: 0.7,
};
const bgm21data ={
  src: "Studio_Title.mp3",
  loopStart: 63910,
  loopEnd: 122830,
  volume: 0.7,
};
var Bgm=new Music(bgm1data);
var musicnum=0;
var Barlist=[];//soundconfigで使用
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
        {src:'soL_back.png'},{src:'Don_bg2.png'},{src:'Don_bg3.png'},{src:'Don_bg4.png'},{src:'Don_bg5.png'},{src:'soL_dialogue.png'},{src:'soL_chara1.png'},{src:'soL_chara2.png'},
        {src:'Card_images/soL_room.png'},{src:'Card_images/soL_room_path.png'},{src:'Card_images/soL_room_table.png'},{src:'Card_images/soL_room_map2.png'},{src:'Card_images/soL_room_path9.png'},{src:'Card_images/soL_room_kit4.png'},{src:'Card_images/soL_room_kit1.png'},{src:'Card_images/soL_room_kit2.png'},{src:'Card_images/soL_room_kit3.png'},{src:'Card_images/soL_room_picture2.png'},
        {src:'Card_images/melon1.png'},{src:'Card_images/melon2.png'},{src:'Card_images/melon3.png'},
        {src:'soL_rule1.png'},{src:'soL_rule2.png'},{src:'soL_rule3.png'},{src:'soL_rule3_2.png'},{src:'soL_rule2.png'},{src:'soL_rule3.png'},{src:'soL_rule3_2.png'},
        {src:'soL_bg1.png'},{src:'soL_bg2.png'},{src:'soL_bg3.png'},{src:'soL_bg4.png'},{src:'soL_bg5.png'},{src:'soL_bg6.png'},{src:'soL_bg7.png'},{src:'soL_bg9.png'},{src:'soL_bg8.png'},
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
  var t = new createjs.Text(titletext, "24px serif", "white");
  t.textAlign = "end";
  t.x=790;
  Titleyard.addChild(t);
  var t = new createjs.Text("音の設定ができます。（あとから変更可能）", "24px serif", "white");
  t.textAlign = "end";
  t.x=800;
  t.y=30;
  Titleyard.addChild(t);
  gamestate=10;
  Title();
}

createjs.Ticker.addEventListener("tick", UpdateParticles);
function UpdateParticles(event){
  updateParticles();
  if(gamestate==0){yakumap_hint.alpha=1}else{yakumap_hint.alpha=0};
  if(gamestate==0 && duelLog.length>1 && (playMode[0]==1 || (playMode[0]==2 && playMode[1]==0))){yakumap_undo.alpha=1;}else{yakumap_undo.alpha=0;}
  if(gamestate==0 && duelLog.length && playMode[0]!==4){yakumap_reset.alpha=1;}else{yakumap_reset.alpha=0;}
  if(gamestate==0 && duelLog.length && playMode[0]!==4){yakumap_solve.alpha=1}else{yakumap_solve.alpha=0};
  if(gamestate==0 && duelLog.length && playMode[0]!==4){yakumap_giveup.alpha=1}else if(gamestate==0 && duelLog.length && playMode[0]==4 && henirarea[0].cleared>1){yakumap_giveup.alpha=1}else{yakumap_giveup.alpha=0};
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
function menu(state=0,area=0){
  //メイン画面
  console.log('menu',state,area,opLock,gamestate);
  if(area>0){
    //ヘニルエントランス
    opLock=0;
    Titleyard.removeAllChildren();
    Roomyard.removeAllChildren();    
    switch(area){
      case 1:
        if(musicnum!==6){
          Bgm.stop();
          musicnum=6;
          if(mute=="ON"){
          Bgm=new Music(bgm6data);
          Bgm.playMusic();
          }}
        //オプションボタン
      SoundConfig(0,-1);
      var BG = new createjs.Bitmap("Don_bg5.png");
      BG.alpha=0.7;
      Roomyard.addChild(BG);
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.7;
      Roomyard.addChild(Room);
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
      if(UserLibrary.indexOf(1)!==-1){
        var Opicon3 = new createjs.Bitmap("soL_opicon3.png");
        Opicon3.x=610;
        Opicon3.y=540;
        Titleyard.addChild(Opicon3);
        }
      var undo = new createjs.Bitmap("soL_undo.png");
      undo.scale=0.5;
      undo.x=10;
      undo.y=540;
      Titleyard.addChild(undo);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(0,0,0,0.7)");
      shape.graphics.drawRect(0, 0, 800, 600);
      Roomyard.addChild(shape);
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.7;
      RoomA.alpha=0;
      Titleyard.addChild(RoomA);
      if(InvID(6)==-1){
        Roomyard.removeChild(Room);
        RoomA.alpha=1;
      }
      InvConfig(0);
      createjs.Tween.get(shape)
      .to({alpha:0.3},800);
      createjs.Tween.get(Room,{loop:true})
      .to({x:0,y:-5,alpha:0.9},2100)
      .to({x:0,y:-0,alpha:1},2100);
      createjs.Tween.get(RoomA,{loop:true})
      .to({x:0,y:-5},2100)
      .to({x:0,y:-0},2100);
      Room.addEventListener("click", {card:-1,handleEvent:HenirPath});
      if(henirarea[0].cleared==0){
        RoomA.addEventListener("click", {card:1,handleEvent:HenirPath});
      }else{
        RoomA.addEventListener("click", {card:0,handleEvent:HenirPath});
      }
      undo.addEventListener("click", {handleEvent:returnmenu});
      Opicon.addEventListener("click", {handleEvent:OptionConfig});
      Opicon2.addEventListener("click", {handleEvent:InvConfig});
      Header2.addEventListener("click", {type:1,handleEvent:SoLchara})
      if(UserLibrary.indexOf(1)!==-1){
      Opicon3.addEventListener("click", {handleEvent:AsmConfig});
      }
      if(InvID(0)==6){
        MsgAry.push(["　","――ヘニルの時空",-1,-2,3,1])
        MsgAry.push(["リティア","……どうなってるわけ。",0,-2]);
        MsgAry.push(["リティア","せっかく扉が開いたから外に出られたと思ったのに、&また変な空間だよ。",0,-2]);
        MsgAry.push(["男の声","驚いたな。&まさかパスワードを解読して入ってくるとは。",2]);
        MsgAry.push(["リティア","誰よ。",0,-2]);
        MsgAry.push(["　","気味の悪い笑い声が響く。",2]);
        MsgAry.push(["男の声","私のことよりも自分のことを考えたほうがいいだろう。",2]);
        MsgAry.push(["男の声","ここはヘニルの時空。&扉を開いて私の管轄範囲内に入って来られたとはいえ、&一歩道を外れれば永遠に虚無空間を彷徨うことになるぞ。",2]);
        MsgAry.push(["男の声","ポータルをこじ開けて貴様をエリオスに&連れ出してやることもできるが、今は距離が遠すぎる。&そこから出たければ、もう少し「こちら側」まで来ることだ。",2]);
        MsgAry.push(["リティア","はぁ？　&あんた、あたしのことを出してくれるのか、&出したくないのか、どっちなのよ。",0,-2]);
        MsgAry.push(["男の声","クックック。&せいぜいあがいてみろ。",2]);
        MsgAry.push(["　","再び、空間に男の笑い声が響きわたった。&これ以上、呼びかけても返事はないようだ。",-1,-2]);
        MsgAry.push(["henirmenu"]);
        cLock=true;
        MsgNext(-1);
        InvID(0,7);
        return true;
      }
        break;
    }
    function returnmenu(){
      menu();
    }
    function HenirPath(){
      //console.log(opLock);
      switch(this.card){
        case -1:
          if((equipeditem==6 && InvID(6)==1) || debugmode){
            equipeditem=-1;
            InvID(6,-1);
            InvConfig(0);
            se19.play();
            Roomyard.removeChild(Room);
            RoomA.alpha=1;
            createjs.Tween.get(RoomA)
          .to({x:800,rotation:180},200)
          .to({x:0,rotation:360},100);
          }else{
          Dialogue("Required Item","・抵抗力を上げるアイテム（"+InvID(6)+"/1）",-1,-1,"OK",350,330,80,40);
          }
          break;
        case 0:
            if(opLock==0){
              field.removeAllChildren();
              opLock=5;
              se11.play();
          //入場開始前の画面
          var BG = new createjs.Bitmap("Don_bg5.png");
          BG.alpha=0;
          field.addChild(BG);
          var BG1 = new createjs.Bitmap(SoLbg_src[0]);
          BG1.alpha=0;
          field.addChild(BG1);
          var BG2 = new createjs.Bitmap(SoLbg_src[1]);
          BG2.alpha=0;
          field.addChild(BG2);
          var BG3 = new createjs.Bitmap(SoLbg_src[2]);
          BG3.alpha=0;
          field.addChild(BG3);
          var BG4 = new createjs.Bitmap(SoLbg_src[3]);
          BG4.alpha=0;
          field.addChild(BG4);
          var BG5 = new createjs.Bitmap(SoLbg_src[4]);
          BG5.alpha=0;
          field.addChild(BG5);
          var BG6 = new createjs.Bitmap(SoLbg_src[5]);
          BG6.alpha=0;
          field.addChild(BG6);
          var BG7 = new createjs.Bitmap(SoLbg_src[6]);
          BG7.alpha=0;
          field.addChild(BG7);
          var BG8 = new createjs.Bitmap(SoLbg_src[7]);
          BG8.alpha=0;
          field.addChild(BG8);
          var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car1.x=-200;
          Car1.y=55;
          Car1.scale=1.5;
          if(henirarea[0].cleared>=0){
          Car1.alpha=0.8;
          }else{
          Car1.alpha=0;
          }
          field.addChild(Car1);
          var Car2 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car2.x=-200;
          Car2.y=55;
          Car2.scale=1.5;
          if(henirarea[1].cleared>=0){
            Car2.alpha=0.8;
            }else{
            Car2.alpha=0;
            }
          field.addChild(Car2);
          var Car3 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car3.x=-200;
          Car3.y=55;
          Car3.scale=1.5;
          if(henirarea[2].cleared>=0){
            Car3.alpha=0.8;
            }else{
            Car3.alpha=0;
            }
          field.addChild(Car3);
          var Car4 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car4.x=-200;
          Car4.y=55;
          Car4.scale=1.5;
          if(henirarea[3].cleared>=0){
            Car4.alpha=0.8;
            }else{
            Car4.alpha=0;
            }
          field.addChild(Car4);
          var Car5 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car5.x=-200;
          Car5.y=240;
          Car5.scale=1.5;
          if(henirarea[4].cleared>=0){
            Car5.alpha=0.8;
            }else{
            Car5.alpha=0;
            }
          field.addChild(Car5);
          var Car6 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car6.x=-200;
          Car6.y=240;
          Car6.scale=1.5;
          if(henirarea[5].cleared>=0){
            Car6.alpha=0.8;
            }else{
            Car6.alpha=0;
            }
          field.addChild(Car6);
          var Car7 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car7.x=-200;
          Car7.y=240;
          Car7.scale=1.5;
          if(henirarea[6].cleared>=0){
            Car7.alpha=0.8;
            }else{
            Car7.alpha=0;
            }
          field.addChild(Car7);
          var Car8 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car8.x=-200;
          Car8.y=240;
          Car8.scale=1.5;
          if(henirarea[7].cleared>=0){
            Car8.alpha=0.8;
            }else{
            Car8.alpha=0;
            }
            field.addChild(Car8);
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#bae0c3");
          shape.graphics.beginStroke("#617d68");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(35, 440, 362, 35);
          field.addChild(shape);
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#bae0c3");
          shape.graphics.beginStroke("#617d68");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(35, 480, 262, 35);
          field.addChild(shape);
          var S=new createjs.Text("　","24px serif","#46574a");
          S.x=40;
          S.y=443;
          field.addChild(S);
            switch(UserStatus[4]){
              case 84:
                S.text=itemA[itemID(UserStatus[4])].name+"/逃走時素材獲得";
                break;
              case 85:
                S.text=itemA[itemID(UserStatus[4])].name+"/連鎖カウント2倍";
                break;
              case 86:
                S.text=itemA[itemID(UserStatus[4])].name+"/エンカウント率↓";
                break;
              default:
                S.text="　";
                break;
            };
          if(userPet.length){
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#bae0c3");
          shape.graphics.beginStroke("#617d68");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(400, 440, 362, 35);
          field.addChild(shape);
          var S=new createjs.Text("　","24px serif","#46574a");
          S.x=405;
          S.y=443;
          field.addChild(S);
          switch(userPet[0]){
            case "ポール":
              S.text=userPet[0]+"/採取サポート-りんご";
            break;
            case "グリピグ":
              S.text=userPet[0]+"/戦闘サポート-突撃";
            break;
            case "ソソ":
              S.text=userPet[0]+"/採取サポート-銀秤草";
            break;
            case "火山の炎鷹":
              S.text=userPet[0]+"/戦闘サポート-炎";
            break;
            case "プリンチュ":
              S.text=userPet[0]+"/採取サポート-ライチ";
            break;
            case "パピリオ":
              S.text=userPet[0]+"/採取サポート-密";
            break;
            case "ガルファイハーピィ":
              S.text="ハーピィ/戦闘サポート-回避";
            break;
            case "ヘルナオーブ":
              S.text=userPet[0]+"/戦闘サポート-守";
            break;
            case "アルポコピュリタ":
              S.text="アルポコ/戦闘サポート-ブースター";
            break;
            case "コマンドオーガニックコア":
              S.text="オーガニック/戦闘サポート-老化";
            break;
            case "グリッターランサー":
            case "グリッターアーチャー":
              S.text="グリッター/戦闘サポート-突撃";
            break;
            case "マーマン":
              S.text=userPet[0]+"/採取サポート-バス";
            break;
            case "ラグズ":
              S.text=userPet[0]+"/戦闘サポート-冷気";
            break;
            case "イース":
              S.text=userPet[0]+"/戦闘サポート-呪い";
            break;
            case "ファイアコモド":
              S.text="コモド/採取サポート-しっぽ";
            break;
            case "シャドウドリラー":
            case "シャドウガード":
              S.text="シャドウ/戦闘サポート-守";
            break;
            case "アルロン":
              S.text=userPet[0]+"/採取サポート-ベタ液";
            break;
            case "マナイーター":
              S.text=userPet[0]+"/採取サポート-マナ";
            break;
            case "ストーンゴーレム":
              S.text="ゴーレム/戦闘サポート-守";
            break;
            default:
              S.text="　";
              break;
          }};
          var T=new createjs.Text("　","24px serif","#46574a");
          T.x=40;
          T.y=483;
          field.addChild(T);
          createjs.Tween.get(Car1)
          .to({x:0},400, createjs.Ease.backOut)
          .call(SoLkey);
          createjs.Tween.get(Car2)
          .to({x:170},600, createjs.Ease.backOut);
          createjs.Tween.get(Car3)
          .to({x:340},800, createjs.Ease.backOut)
          createjs.Tween.get(Car4)
          .to({x:510},900, createjs.Ease.backOut)
          createjs.Tween.get(Car5)
          .to({x:590},930, createjs.Ease.backOut);
          createjs.Tween.get(Car6)
          .to({x:80},430, createjs.Ease.backOut)
          createjs.Tween.get(Car7)
          .to({x:250},630, createjs.Ease.backOut)
          createjs.Tween.get(Car8)
          .to({x:420},830, createjs.Ease.backOut)
          function SoLkey(){
          Car1.addEventListener("mouseover", {card:1,handleEvent:MouseOver});
          Car1.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car2.addEventListener("mouseover", {card:2,handleEvent:MouseOver});
          Car2.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car3.addEventListener("mouseover", {card:3,handleEvent:MouseOver});
          Car3.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car4.addEventListener("mouseover", {card:4,handleEvent:MouseOver});
          Car4.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car5.addEventListener("mouseover", {card:5,handleEvent:MouseOver});
          Car5.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car6.addEventListener("mouseover", {card:6,handleEvent:MouseOver});
          Car6.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car7.addEventListener("mouseover", {card:7,handleEvent:MouseOver});
          Car7.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car8.addEventListener("mouseover", {card:8,handleEvent:MouseOver});
          Car8.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car1.addEventListener("click", {card:1,handleEvent:HenirPath});
          Car2.addEventListener("click", {card:2,handleEvent:HenirPath});
          Car3.addEventListener("click", {card:3,handleEvent:HenirPath});
          Car4.addEventListener("click", {card:4,handleEvent:HenirPath});
          Car5.addEventListener("click", {card:5,handleEvent:HenirPath});
          Car6.addEventListener("click", {card:6,handleEvent:HenirPath});
          Car7.addEventListener("click", {card:7,handleEvent:HenirPath});
          Car8.addEventListener("click", {card:8,handleEvent:HenirPath});
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
          createjs.Tween.get(BG)
          .to({alpha:0.8},100);
          }
          function MouseOver(e){
            switch(this.card){
              case 0:
                BG1.alpha=0;
                BG2.alpha=0;
                BG3.alpha=0;
                BG4.alpha=0;
                BG5.alpha=0;
                BG6.alpha=0;
                BG7.alpha=0;
                BG8.alpha=0;
                createjs.Tween.get(BG).to({alpha:0.8},80);
                break;
              case 1:
                createjs.Tween.get(BG1).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 2:
                createjs.Tween.get(BG2).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 3:
                createjs.Tween.get(BG3).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 4:
                createjs.Tween.get(BG4).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 5:
                createjs.Tween.get(BG5).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 6:
                createjs.Tween.get(BG6).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
              case 7:
                if(henirarea[6].cleared>2){
                createjs.Tween.get(BG7).to({alpha:0.8},80);
                }
                T.text=henirarea[this.card-1].name;
                break;
              case 8:
                createjs.Tween.get(BG8).to({alpha:0.8},80);
                T.text=henirarea[this.card-1].name;
                break;
            }
          };
          };
          break;
          default:
          //各地域へ入場
        if(opLock!==12){
          opLock=0;
          field.removeAllChildren();
          playMode[1]=this.card-1;
          createjs.Tween.get(RoomA)
          .to({x:-1700,y:-1300,scale:4,alpha:0.1},500, createjs.Ease.backIn);
          var shape = new createjs.Shape();
          shape.graphics.beginFill("white");
          shape.graphics.drawRect(0, 0, 800, 600);
          shape.alpha=0;
          Roomyard.addChild(shape);
          createjs.Tween.get(shape)
          .to({alpha:1},500)
          .wait(80)
          .call(ToHenir);
          function ToHenir(){
          Titleyard.alpha=0;
          Roomyard.alpha=0;
          RoomA.x=0;
          RoomA.y=0;
          RoomA.scale=0.7;
          RoomA.alpha=1;
          Roomyard.removeChild(shape);
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          Henirmap(playMode[1],henirarea[playMode[1]].cleared);
          };
        }
          break;
      }
    }
    return false;
  }
  if(playMode[0]==4 && musicnum!==6){
    Bgm.stop();
    musicnum=6;
    if(mute=="ON"){
    Bgm=new Music(bgm6data);
    Bgm.playMusic();
    }}else if(musicnum!==5){
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
      Path.x=-100;
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
      if(InvID(0)>5){
        var Door = new createjs.Bitmap("Card_images/soL_room_door2.png");
        }else{
        var Door = new createjs.Bitmap("Card_images/soL_room_door.png");
      }
      Door.scale=600/768;
      Roomyard.addChild(Door);
      var Book = new createjs.Bitmap("Card_images/soL_room_book.png");
      Book.scale=600/768;
      Roomyard.addChild(Book);
      var Picture = new createjs.Bitmap("Card_images/soL_room_picture.png");
      Picture.scale=600/768;
      Roomyard.addChild(Picture);
      var Kit = new createjs.Bitmap("Card_images/soL_room_kit.png");
      Kit.scale=600/768;
      Roomyard.addChild(Kit);
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
      if(InvID(0)>5){
        var DoorA = new createjs.Bitmap("Card_images/soL_room_door2.png");
        }else{
      var DoorA = new createjs.Bitmap("Card_images/soL_room_doorA.png");
        }
      DoorA.scale=600/768;
      DoorA.alpha=0;
      Roomyard.addChild(DoorA);
      var BookA = new createjs.Bitmap("Card_images/soL_room_bookA.png");
      BookA.scale=600/768;
      BookA.alpha=0;
      Roomyard.addChild(BookA);
      var PictureA = new createjs.Bitmap("Card_images/soL_room_pictureA.png");
      PictureA.scale=600/768;
      PictureA.alpha=0;
      Roomyard.addChild(PictureA);
      var KitA = new createjs.Bitmap("Card_images/soL_room_kitA.png");
      KitA.scale=600/768;
      KitA.alpha=0;
      Roomyard.addChild(KitA);
      var LetterA = new createjs.Bitmap("Card_images/soL_room_letterA.png");
      LetterA.scale=600/768;
      LetterA.y=-50;
      LetterA.alpha=0;
      Roomyard.addChild(LetterA);
      var PathA = new createjs.Bitmap("Card_images/soL_room_pathA.png");
      PathA.x=-100;
      PathA.y=-67;
      PathA.alpha=0;
      Roomyard.addChild(PathA);
      PathAry=[];
      for(var i=0;i<Path_src.length;i++){
        var P = new createjs.Bitmap(Path_src[i]);
        P.x=-100;
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
      if(UserLibrary.indexOf(1)!==-1){
      var Opicon3 = new createjs.Bitmap("soL_opicon3.png");
      Opicon3.x=610;
      Opicon3.y=540;
      Titleyard.addChild(Opicon3);
      }
      if(gamestate==99){
        Room.x=-40;
        Room.y=-30;
        createjs.Tween.get(shape)
        .to({alpha:0.3},2000);
        createjs.Tween.get(Letter)
        .to({alpha:1},2000);
        createjs.Tween.get(Room)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut);
        createjs.Tween.get(Table)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        .call(mainstep)
        createjs.Tween.get(Vase)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Box)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Map)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Door)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Book)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Picture)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
        createjs.Tween.get(Kit)
        .to({x:-40,y:-30,scale:1,alpha:1},2, createjs.Ease.backOut)
        .to({x:0,y:0,scale:600/768,alpha:1},3000, createjs.Ease.backOut)
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
      .to({x:-103,y:-64,alpha:0.7},3000, createjs.Ease.backInOut)
      .to({x:-105,y:-68,alpha:0.9},3000, createjs.Ease.backInOut)
      .to({x:-103,y:-70,alpha:0.7},3000, createjs.Ease.backInOut)
      .to({x:-100,y:-67,alpha:1},3000);
      createjs.Tween.get(PathA,{loop:true})
      .to({x:-103,y:-64},3000, createjs.Ease.backInOut)
      .to({x:-105,y:-68},3000, createjs.Ease.backInOut)
      .to({x:-103,y:-70},3000, createjs.Ease.backInOut)
      .to({x:-100,y:-67},3000);
      for(var i=0;i<PathAry.length;i++){
        var P = PathAry[i];
        if(totalcardmove>=(100+25*i)*i){P.alpha=1}else{P.alpha=0};
        createjs.Tween.get(P,{loop:true})
        .to({x:-103,y:-64,alpha:0.8*P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-105,y:-68,alpha:P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-103,y:-70,alpha:0.7*P.alpha},3000, createjs.Ease.backInOut)
        .to({x:-100,y:-67,alpha:P.alpha},3000);
      };
      function mainstep(){
      InvConfig(0);
      tweeNroom.paused=false;
      createjs.Tween.get(Letter,{loop:true})
      .to({x:0,y:-54,alpha:0.9},2100)
      .to({x:0,y:-50,alpha:1},2100);
      createjs.Tween.get(LetterA,{loop:true})
      .to({x:0,y:-54},2100)
      .to({x:0,y:-50},2100);
      Table.addEventListener("mouseover", {card:1,handleEvent:Tablecross});
      TableA.addEventListener("mouseout", {card:2,handleEvent:Tablecross});
      Map.addEventListener("mouseover", {card:3,handleEvent:Tablecross});
      MapA.addEventListener("mouseout", {card:4,handleEvent:Tablecross});
      Vase.addEventListener("mouseover", {card:5,handleEvent:Tablecross});
      VaseA.addEventListener("mouseout", {card:6,handleEvent:Tablecross});
      Box.addEventListener("mouseover", {card:7,handleEvent:Tablecross});
      BoxA.addEventListener("mouseout", {card:8,handleEvent:Tablecross});
      Door.addEventListener("mouseover", {card:9,handleEvent:Tablecross});
      DoorA.addEventListener("mouseout", {card:10,handleEvent:Tablecross});
      Letter.addEventListener("mouseover", {card:11,handleEvent:Tablecross});
      LetterA.addEventListener("mouseout", {card:12,handleEvent:Tablecross});
      Path.addEventListener("mouseover", {card:13,handleEvent:Tablecross});
      PathA.addEventListener("mouseout", {card:14,handleEvent:Tablecross});
      Book.addEventListener("mouseover", {card:15,handleEvent:Tablecross});
      BookA.addEventListener("mouseout", {card:16,handleEvent:Tablecross});
      Picture.addEventListener("mouseover", {card:17,handleEvent:Tablecross});
      PictureA.addEventListener("mouseout", {card:18,handleEvent:Tablecross});
      Kit.addEventListener("mouseover", {card:19,handleEvent:Tablecross});
      KitA.addEventListener("mouseout", {card:20,handleEvent:Tablecross});
      Table.addEventListener("click", {handleEvent:SoLmap});
      TableA.addEventListener("click", {handleEvent:SoLmap});
      Map.addEventListener("click", {card:3,handleEvent:Mapcross});
      MapA.addEventListener("click", {card:3,handleEvent:Mapcross});
      Vase.addEventListener("click", {card:3,handleEvent:Vasecross});
      VaseA.addEventListener("click", {card:3,handleEvent:Vasecross});
      Box.addEventListener("click", {card:3,handleEvent:Boxcross});
      BoxA.addEventListener("click", {card:3,handleEvent:Boxcross});
      Door.addEventListener("click", {card:3,handleEvent:Doorcross});
      DoorA.addEventListener("click", {card:3,handleEvent:Doorcross});
      Letter.addEventListener("click", {card:3,handleEvent:Lettercross});
      LetterA.addEventListener("click", {card:3,handleEvent:Lettercross});
      Book.addEventListener("click", {card:3,handleEvent:Bookcross});
      BookA.addEventListener("click", {card:3,handleEvent:Bookcross});
      Picture.addEventListener("click", {card:3,handleEvent:Picturecross});
      PictureA.addEventListener("click", {card:3,handleEvent:Picturecross});
      Kit.addEventListener("click", {card:3,handleEvent:Kitcross});
      KitA.addEventListener("click", {card:3,handleEvent:Kitcross});
      Path.addEventListener("click", {card:3,handleEvent:PathText});
      PathA.addEventListener("click", {card:3,handleEvent:PathText});
      Opicon.addEventListener("click", {handleEvent:OptionConfig});
      Opicon2.addEventListener("click", {handleEvent:InvConfig});
      if(UserLibrary.indexOf(1)!==-1){
        Opicon3.addEventListener("click", {handleEvent:AsmConfig});
      }
      Header2.addEventListener("click", {type:0,handleEvent:SoLchara})
      if(gamestate==99){
        MsgAry.push(["　","――狭間の向こう",-1,0,3,1])
        MsgAry.push(["bg5","start",-1])
        MsgAry.push(["リティア","……あ。/また外の世界だ。"]);
        MsgAry.push(["リティア","おーい、誰かいませんかー！&ここに、狭間に閉じ込められている人がいますよー！"]);
        MsgAry.push(["bg5","end",-1])
        MsgAry.push(["リティア","……やっぱり気づいてくれないよね…/…/。&また外の世界がちょっとだけ見えたのに。"]);
        MsgAry.push(["リティア","あーあ。&暇だしお腹も空かないし、どうしようかな。"]);
        MsgAry.push(["狭間","トランプはどう？&机の上に置いてあるよ。",1]);
        MsgAry.push(["リティア","トランプねぇ。"]);
        MsgAry.push(["solithia"]);
        MsgNext(-1);
        };
      gamestate=100;
      if(playMode[0]==4){
        PathTalk();
        };
      function Tablecross(){
        //家具のオンカーソル表示
        if(opLock==0){
        TableA.alpha=0;
        MapA.alpha=0;
        VaseA.alpha=0;
        BoxA.alpha=0;
        DoorA.alpha=0;
        LetterA.alpha=0;
        PathA.alpha=0;
        BookA.alpha=0;
        PictureA.alpha=0;
        KitA.alpha=0;
        switch(this.card){
          case 1:
            TableA.alpha=1;
            break;
          case 3:
            MapA.alpha=1;
            break;
          case 5:
            VaseA.alpha=1;
            break;
          case 7:
            BoxA.alpha=1;
            break;
          case 9:
            DoorA.alpha=1;
            break;
          case 11:
            LetterA.alpha=1;
            break;
          case 13:
            PathA.alpha=1;
            break;
          case 15:
            BookA.alpha=1;
            break;
          case 17:
            PictureA.alpha=1;
            break;
          case 19:
            KitA.alpha=1;
            break;
          default:
            break;
          }
        }
      };
      function Mapcross(){
        switch(this.card){
          case 3:
            if(opLock==0){
          opLock=6;
          se11.play();
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgba(20,20,20,0.7)");
          shape.graphics.drawRect(0, 40, 710, 500);
          field.addChild(shape);
          var Map2 = new createjs.Bitmap("Card_images/soL_room_map2.png");
          Map2.scale=0.69;
          Map2.y=20;
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
          case 3:
          if(opLock==0){
          opLock=6;
          se11.play();
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgba(20,20,20,0.7)");
          shape.graphics.drawRect(100, 40, 610, 550);
          field.addChild(shape);
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
          case 5:
            if(equipeditem==1 || InvID(1)==-1){
            equipeditem=-1;
            InvID(1,-1)
            InvConfig(0);
            se15.play();
            field.removeAllChildren();
            var shape = new createjs.Shape();
            shape.graphics.beginFill("rgba(20,20,20,0.7)");
            shape.graphics.drawRect(100, 40, 610, 550);
            field.addChild(shape);
            var Box4 = new createjs.Bitmap("Card_images/soL_room_box4.png");
            Box4.scale=0.8;
            field.addChild(Box4);
            if(InvID(4)==0){
              var Box3 = new createjs.Bitmap("Card_images/soL_room_box3.png");
              Box3.scale=0.8;
              field.addChild(Box3);
              Box3.addEventListener("click", {card:6,handleEvent:Boxcross});
            }
            var option_bt5 = new createjs.Bitmap('soL_batu.png');
            option_bt5.x=660;
            option_bt5.y=50;
            option_bt5.scale=0.4;
            field.addChild(option_bt5);
            option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
            return false;
            }
            if(InvID(1)!==0){
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
            if(InvID(4)==0){
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
      var KitAry=[];
      function Kitcross(){
        switch(this.card){
          case 3:
          if(opLock==0){
          KitAry=[];
          opLock=6;
          se11.play();
          var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(0, 0, 800, 600);
          field.mask = shapeMask3;
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgba(20,20,20,0.7)");
          shape.graphics.drawRect(100, 40, 610, 550);
          field.addChild(shape);
          var Box2 = new createjs.Bitmap("Card_images/soL_room_kit1.png");
          Box2.addEventListener("click", {card:5,handleEvent:Kitcross});
          Box2.scale=0.75;
          Box2.x=50;
          Box2.y=30;
          field.addChild(Box2);
          if(InvID(4)<0){
            switch(InvID(4)){
              //-1->コンロに置いている状態 -2->ポンチ作成済 -3→ポンチ回収済
              case -1:
                var Box2 = new createjs.Bitmap("Card_images/soL_room_kit2.png");
                Box2.scale=0.75;
                Box2.x=50;
                Box2.y=30;
                field.addChild(Box2);
                KitAry.push(Box2);
                Box2.addEventListener("click", {card:6,handleEvent:Kitcross});
                break;
              case -2:
                var Box2 = new createjs.Bitmap("Card_images/soL_room_kit3.png");
                Box2.scale=0.75;
                Box2.x=50;
                Box2.y=30;
                field.addChild(Box2);
                KitAry.push(Box2);
                Box2.addEventListener("click", {card:7,handleEvent:Kitcross});
                break;
              case -3:
                var Box2 = new createjs.Bitmap("Card_images/soL_room_kit4.png");
                Box2.scale=0.75;
                Box2.x=50;
                Box2.y=30;
                field.addChild(Box2);
                KitAry.push(Box2);
                break;
            }
            if(InvID(2)==-1 && InvID(4)!==-3){
              var obj = new createjs.Shape();
              obj.graphics.beginFill("rgba(20,20,20,0.7)");
              obj.graphics.moveTo(190, 220);
              obj.graphics.lineTo(280, 220);
              obj.graphics.lineTo(280, 310);
              obj.graphics.lineTo(260, 310);
              obj.graphics.lineTo(260, 330);
              obj.graphics.lineTo(240, 310);
              obj.graphics.lineTo(190, 310);
              obj.graphics.lineTo(190, 220);
              obj.graphics.drawRect(190, 220, 90, 90);
              obj.x-=5;
              field.addChild(obj);
              var option_bt5 = new createjs.Bitmap('Card_images/soL_tomato.png');
              option_bt5.x=170;
              option_bt5.y=210;
              option_bt5.scale=0.9;
              field.addChild(option_bt5);
              KitAry.push(obj);
              KitAry.push(option_bt5)
            }
            if(InvID(3)==-1 && InvID(4)!==-3){
              var obj = new createjs.Shape();
              obj.graphics.beginFill("rgba(20,20,20,0.7)");
              obj.graphics.moveTo(190, 220);
              obj.graphics.lineTo(280, 220);
              obj.graphics.lineTo(280, 310);
              obj.graphics.lineTo(260, 310);
              obj.graphics.lineTo(250, 330);
              obj.graphics.lineTo(240, 310);
              obj.graphics.lineTo(190, 310);
              obj.graphics.lineTo(190, 220);
              obj.x+=90;
              obj.y-=25;
              field.addChild(obj);
              var option_bt5 = new createjs.Bitmap('Card_images/soL_melon.png');
              option_bt5.x=260;
              option_bt5.y=180;
              option_bt5.scale=0.9;
              field.addChild(option_bt5);
              KitAry.push(obj);
              KitAry.push(option_bt5)
            }
          if(InvID(5)==-1 && InvID(4)!==-3){
            var obj = new createjs.Shape();
            obj.graphics.beginFill("rgba(20,20,20,0.7)");
            obj.graphics.moveTo(190, 220);
            obj.graphics.lineTo(280, 220);
            obj.graphics.lineTo(280, 310);
            obj.graphics.lineTo(260, 310);
            obj.graphics.lineTo(230, 330);
            obj.graphics.lineTo(240, 310);
            obj.graphics.lineTo(190, 310);
            obj.graphics.lineTo(190, 220);
            obj.x+=185;
            field.addChild(obj);
            var option_bt5 = new createjs.Bitmap('Card_images/soL_stone.png');
            option_bt5.x=360;
            option_bt5.y=200;
            option_bt5.scale=0.9;
            field.addChild(option_bt5);
            KitAry.push(obj);
            KitAry.push(option_bt5)
          }
          }
          var option_bt5 = new createjs.Bitmap('soL_batu.png');
          option_bt5.x=660;
          option_bt5.y=50;
          option_bt5.scale=0.4;
          field.addChild(option_bt5);
          option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
            break;
          case 5:
            if(equipeditem==4 && InvID(4)==1){
            equipeditem=-1;
            InvID(4,-1);
            InvConfig(0);
            se15.play();
            var Box4 = new createjs.Bitmap("Card_images/soL_room_kit2.png");
            Box4.scale=0.75;
            Box4.x=50;
            Box4.y=30;
            Box4.addEventListener("click", {card:6,handleEvent:Kitcross});
            field.addChild(Box4);
            KitAry.push(Box4);
            return false;
            }
            break;
            case 7:
              if(InvID(6)==0){
                //s
                IK("スイートポンチ");
                var ID=inventory.findIndex(value=>value.id==4);
                InvID(4,-3)
                for(var i=0;i<KitAry.length;i++){
                  field.removeChild(KitAry[i]);
                };
                KitAry=[];
                var Box2 = new createjs.Bitmap("Card_images/soL_room_kit4.png");
                Box2.scale=0.75;
                Box2.x=50;
                Box2.y=30;
                field.addChild(Box2);
              }
              break;
            case 6:
            //アイテムを鍋に投下
            if(equipeditem==2 && InvID(2)==1){
              InvID(2,-1);
              equipeditem=-1;
              InvConfig(0);
              se13.play();
              var obj = new createjs.Shape();
              obj.graphics.beginFill("rgba(20,20,20,0.7)");
              obj.graphics.moveTo(190, 220);
              obj.graphics.lineTo(280, 220);
              obj.graphics.lineTo(280, 310);
              obj.graphics.lineTo(260, 310);
              obj.graphics.lineTo(260, 330);
              obj.graphics.lineTo(240, 310);
              obj.graphics.lineTo(190, 310);
              obj.graphics.lineTo(190, 220);
              obj.graphics.drawRect(190, 220, 90, 90);
              obj.x-=5;
              field.addChild(obj);
              var option_bt5 = new createjs.Bitmap('Card_images/soL_tomato.png');
              option_bt5.x=170;
              option_bt5.y=210;
              option_bt5.scale=0.9;
              field.addChild(option_bt5);
              KitAry.push(obj);
              KitAry.push(option_bt5)
              }
            if(equipeditem==3 && InvID(3)==1){
              InvID(3,-1)
              equipeditem=-1;
              InvConfig(0);
              se13.play();
              var obj = new createjs.Shape();
              obj.graphics.beginFill("rgba(20,20,20,0.7)");
              obj.graphics.moveTo(190, 220);
              obj.graphics.lineTo(280, 220);
              obj.graphics.lineTo(280, 310);
              obj.graphics.lineTo(260, 310);
              obj.graphics.lineTo(250, 330);
              obj.graphics.lineTo(240, 310);
              obj.graphics.lineTo(190, 310);
              obj.graphics.lineTo(190, 220);
              obj.x+=90;
              obj.y-=25;
              field.addChild(obj);
              var option_bt5 = new createjs.Bitmap('Card_images/soL_melon.png');
              option_bt5.x=260;
              option_bt5.y=180;
              option_bt5.scale=0.9;
              field.addChild(option_bt5);
              KitAry.push(obj);
              KitAry.push(option_bt5)
              }
              if(equipeditem==5 && InvID(5)==1){
                InvID(5,-1);
                equipeditem=-1;
                InvConfig(0);
                se13.play();
                var obj = new createjs.Shape();
                obj.graphics.beginFill("rgba(20,20,20,0.7)");
                obj.graphics.moveTo(190, 220);
                obj.graphics.lineTo(280, 220);
                obj.graphics.lineTo(280, 310);
                obj.graphics.lineTo(230, 310);
                obj.graphics.lineTo(205, 330);
                obj.graphics.lineTo(210, 310);
                obj.graphics.lineTo(190, 310);
                obj.graphics.lineTo(190, 220);
                obj.x+=185;
                field.addChild(obj);
                var option_bt5 = new createjs.Bitmap('Card_images/soL_stone.png');
                option_bt5.x=360;
                option_bt5.y=200;
                option_bt5.scale=0.9;
                field.addChild(option_bt5);
                KitAry.push(obj);
                KitAry.push(option_bt5)
                }
            Pants();
            break;
        }
        //ポンチ作成
        //アイテムが揃っていれば勝手に調理
        function Pants(){
          if(InvID(2)==-1 && InvID(3)==-1 && InvID(5)==-1){
            if(InvID(4)==-1){
              //s
              cLock=false;
              se9.play();
              for(var i=0;i<KitAry.length;i++){
                field.removeChild(KitAry[i]);
              };
              KitAry=[];
              var Box2 = new createjs.Bitmap("Card_images/soL_room_kit2.png");
              Box2.scale=0.75;
              Box2.x=50;
              Box2.y=30;
              field.addChild(Box2);
              KitAry.push(Box2);
              createjs.Tween.get(Box2,{loop:true})
              .to({y:Box2.y-14},40)
              .to({y:Box2.y},100)
              .wait(300)
              var DL= new createjs.Bitmap("soL_dialogue.png");
              DL.scale=1.7;
              DL.x=900;
              DL.y=180;
              field.addChild(DL);
              KitAry.push(DL);
              createjs.Tween.get(DL)
              .to({x:190},150)
              .call(cookready);
              function cookready(){
              var t=new createjs.Text("調理中...","bold 26px 'メイリオ'","black");
              t.x=245;
              t.y=200;
              field.addChild(t);
              KitAry.push(t);
              var shape = new createjs.Shape();
              shape.graphics.beginFill("black");
              shape.graphics.drawRect(250, 365, 300, 10);
              shape.alpha=0.7;
              KitAry.push(shape)
              field.addChild(shape);
              var Box2 = new createjs.Bitmap("Card_images/soL_SDicon.png");
              Box2.x=340;
              Box2.y=255;
              Box2.scale=0.9
              field.addChild(Box2);
              KitAry.push(Box2);
              createjs.Tween.get(Box2,{loop:true})
              .to({y:Box2.y-10},5)
              .wait(800)
              .to({y:Box2.y},5)
              .wait(800)
              window.requestAnimationFrame((ts)=>Cook(ts));
              }
              function Cook(ts,tflame=0,sf=0){
                tflame+=1;
                if(tflame>20){
                  var shape = new createjs.Shape();
                  shape.graphics.beginFill("rgb(244,177,131)");
                  shape.graphics.drawRect(250+30*sf, 365, 30, 10);
                  KitAry.push(shape)
                  field.addChild(shape);
                  sf+=1;
                  tflame=0;
                }
                if(sf>10){
                  for(var i=0;i<KitAry.length;i++){
                    field.removeChild(KitAry[i]);
                  };
                  KitAry=[];
                  InvID(4,-2);
                  se10.play();
                  var Box2 = new createjs.Bitmap("Card_images/soL_room_kit3.png");
                  Box2.scale=0.75;
                  Box2.x=50;
                  Box2.y=30;
                  field.addChild(Box2);
                  KitAry.push(Box2);
                  Box2.addEventListener("click", {card:7,handleEvent:Kitcross});
                  cLock=true;
                }else{
                window.requestAnimationFrame((ts)=>Cook(ts,tflame,sf));
                }
              }
        }}}      
      }
      function Vasecross(){
        switch(this.card){
          case 3:
            if(opLock==0){
          IK('ジョイのトマト')}
            break;
        }
      }
      function Lettercross(){
        switch(this.card){
          case 3:
            if(opLock==0){
              se11.play();
              opLock=6;
              var shape = new createjs.Shape();
              shape.graphics.beginFill("rgba(20,20,20,0.5)");
              shape.graphics.drawRect(100, 40, 610, 450);
              field.addChild(shape);
              if(Letterbox.length){
              for(var i=0;i<Letterbox.length;i++){
              var shape = new createjs.Shape();
              shape.graphics.beginFill("rgba(250,250,250,0.7)");
              shape.graphics.drawRoundRect(0, 0, 260, 50, 6, 6);
              shape.x=110;
              shape.y=130+55*i
              field.addChild(shape);
              shape.addEventListener("click", {card:i,handleEvent:Letterdetail});
              var t = new createjs.Text("from："+Letterbox[i][0], "22px serif", "black");
              t.x=120;
              t.y=130+55*i
              field.addChild(t);
              var t = new createjs.Text("件名："+Letterbox[i][1], "22px serif", "black");
              t.x=120;
              t.y=155+55*i
              field.addChild(t);
                }
              }else{
                var passtext = new createjs.Text("手紙は　ありません", "24px serif", "orange");
                passtext.x=425;
                passtext.y=103;
                passtext.textAlign = "center";
                field.addChild(passtext);
              }
              var option_bt5 = new createjs.Bitmap('soL_batu.png');
              option_bt5.x=660;
              option_bt5.y=50;
              option_bt5.scale=0.4;
              field.addChild(option_bt5);
              option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
        }
      var Ary=[];
      function Letterdetail(){
        if(this.card==-3){
          if(InvID(7)==0){
          var shape = new createjs.Shape();
          shape.graphics.beginFill("black");
          shape.graphics.drawRect(580, 394, 64, 64);
          shape.alpha=0.5;
          field.addChild(shape);
          IK('ピッケル-プロトタイプ')
          }
        }else if(this.card==-2){
          if(Ary.length){
            for(var i=0;i<Ary.length;i++){
            field.removeChild(Ary[i])
            }
            Ary=[]
          };
          var T=new createjs.Bitmap("soL_postcard_1.png");
          T.x=330;
          T.y=100;
          T.scale=3;
          field.addChild(T);
          T.addEventListener("click", {card:-1,handleEvent:Letterdetail});
          Ary.push(T);
        }else if(this.card==-1){
          if(Ary.length){
            for(var i=0;i<Ary.length;i++){
            field.removeChild(Ary[i])
            }
            Ary=[]
          };
          var T=new createjs.Bitmap("soL_postcard_2.png");
          T.x=330;
          T.y=100;
          T.scale=3;
          field.addChild(T);
          T.addEventListener("click", {card:-2,handleEvent:Letterdetail});
          qr_src2.alpha=1;
          qr_src2.x=430;
          qr_src2.y=200;
          qr_src2.scale=1.7;
          field.addChild(qr_src2);
          Ary.push(T);
        }
        if(Letterbox[this.card][3]=="ピッケル"){
          if(Ary.length){
            for(var i=0;i<Ary.length;i++){
            field.removeChild(Ary[i])
            }
            Ary=[]
          };
          var T=new createjs.Bitmap("soL_postcard_3.png");
          T.x=330;
          T.y=100;
          T.scale=3;
          field.addChild(T);
          Ary=[];
          Ary.push(T);
          T.addEventListener("click", {card:-3,handleEvent:Letterdetail});
          var passtext = new createjs.Text("from："+Letterbox[this.card][0], "20px serif", "black");
          passtext.x=460;
          passtext.y=153;
          field.addChild(passtext);
          Ary.push(passtext)
          var passtext = new createjs.Text("title："+Letterbox[this.card][1], "20px serif", "black");
          passtext.x=460;
          passtext.y=183;
          field.addChild(passtext);
          Ary.push(passtext)
          var detail=Letterbox[this.card][2];
          for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
            var line = lines[i];
            var t=new createjs.Text(line,"bold 18px 'メイリオ'","black");
            t.x=405;
            t.y=210+i*20;
            field.addChild(t);
            Ary.push(t)
          };
          //
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#bae0c3");
          shape.graphics.beginStroke("#617d68");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(580, 394, 64, 64);
          field.addChild(shape);
          shape.addEventListener("click", {card:-3,handleEvent:Letterdetail});
          var T =new createjs.Bitmap(Item_src[2]);
          T.x=580;
          T.y=394;
          T.scale=0.5;
          field.addChild(T);
          if(InvID(7)==1){
          var shape = new createjs.Shape();
            shape.graphics.beginFill("black");
            shape.graphics.drawRect(580, 394, 64, 64);
            shape.alpha=0.5;
            field.addChild(shape);
          }
        }else if(Letterbox[this.card][3]=="qr_src2"){
          if(Ary.length){
            for(var i=0;i<Ary.length;i++){
            field.removeChild(Ary[i])
            }
            Ary=[]
          };
          var T=new createjs.Bitmap("soL_postcard_1.png");
          T.x=330;
          T.y=100;
          T.scale=3;
          field.addChild(T);
          Ary=[];
          Ary.push(T);
          T.addEventListener("click", {card:-1,handleEvent:Letterdetail});
        }
      }
      };
      function Bookcross(){
        switch(this.card){
          case 3:
            if(opLock==0){
              se11.play();
              opLock=6;
              var shape = new createjs.Shape();
              shape.graphics.beginFill("rgba(20,20,20,0.5)");
              shape.graphics.drawRect(80, 40, 620, 450);
              field.addChild(shape);
              var passtext = new createjs.Text("「洞窟に眠る果実を求めて」", "24px serif", "orange");
                passtext.x=350;
                passtext.y=103;
                passtext.textAlign = "center";
                field.addChild(passtext);
                var detail="ハーメルの秘境には最高級の果実が眠っているという。&その噂を探るべく、我々は『マグマンタの洞窟』へと向かった。&　&洞窟内の探索は、クモの巣や魔物に阻まれ、困難を極めた。&1週間の調査期間終了まで残された時間も僅かとなった頃、&ついに、洞窟の行き止まりでひっそりと光り輝く甜瓜が&目に飛び込んできた。&　&これに違いない。噂は本当だったのだ。&我々はついにやり遂げたのだ。&　&素晴らしく美味しい、まさに極上の味だ。&なぜこれほどまでに甘みが強く、美味しいのか。&その謎を探るべく、我々は古代遺跡の奥地へと向かった――";
              for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
                var line = lines[i];
                var t=new createjs.Text(line,"20px serif","white");
                t.x=85;
                t.y=150+i*20;
                field.addChild(t);
              };
              var option_bt5 = new createjs.Bitmap('soL_batu.png');
              option_bt5.x=660;
              option_bt5.y=50;
              option_bt5.scale=0.4;
              field.addChild(option_bt5);
              option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
        }
      };
      function Picturecross(){
        switch(this.card){
          case 3:
            if(opLock==0){
              se11.play();
              opLock=6;
              var shape = new createjs.Shape();
              shape.graphics.beginFill("rgba(20,20,20,0.5)");
              shape.graphics.drawRect(80, 40, 620, 450);
              field.addChild(shape);
              var T=new createjs.Bitmap("Card_images/soL_room_picture2.png");
              T.x=70;
              T.y=50;
              T.scale=0.6
              field.addChild(T);
              var option_bt5 = new createjs.Bitmap('soL_batu.png');
              option_bt5.x=660;
              option_bt5.y=50;
              option_bt5.scale=0.4;
              field.addChild(option_bt5);
              option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
        }
      };
      function Doorcross(){
        switch(this.card){
          case 3:
            if(opLock==0){
              if(InvID(0)>5){menu(0,1);return false};
              opLock=6;
            //ログインPW
            var numPW=[];
            var textL=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("rgba(20,20,20,0.5)");
            shape.graphics.drawRect(100, 40, 610, 450);
            field.addChild(shape);
            var shape = new createjs.Shape();
                shape.graphics.beginFill("black");
                shape.graphics.beginStroke("rgb(125,125,125)");
                shape.graphics.setStrokeStyle(2);
                shape.graphics.drawRect(340, 100, 195, 30);
                shape.alpha=0.7;
                field.addChild(shape);
            var passtext = new createjs.Text("　", "24px serif", "orange");
            passtext.x=425;
            passtext.y=103;
            passtext.textAlign = "center";
            field.addChild(passtext);
            textL[0]=passtext;
            for(var i=0;i<4;i++){
              for(var j=0;j<3;j++){
                var shape = new createjs.Shape();
                shape.graphics.beginFill("black");
                shape.graphics.beginStroke("rgb(125,125,125)");
                shape.graphics.setStrokeStyle(2);
                shape.graphics.drawRect(340+j*65, 130+i*65, 65, 65);
                shape.alpha=0.5;
                field.addChild(shape);
                shape.addEventListener("click", {card:i*3+j+1,handleEvent:Numcross});
                if(i*3+j+1<=9){
                var shape = new createjs.Text(i*3+j+1, "28px serif", "white");
                shape.x=360+j*65;
                shape.y=150+i*65;
                field.addChild(shape);
                }
              }
            }
            var shape = new createjs.Text(0, "28px serif", "white");
            shape.x=360+65;
            shape.y=150+3*65;
            field.addChild(shape);
            var Icon = new createjs.Bitmap("Card_images/soL_SDicon.png");
            Icon.scale=0.5;
            Icon.x=340;
            Icon.y=130+65*3;
            field.addChild(Icon);
            var Icon = new createjs.Bitmap("soL_undo.png");
            Icon.scale=0.64;
            Icon.x=340+65*2;
            Icon.y=130+65*3;
            field.addChild(Icon);
            var Icon = new createjs.Bitmap("soL_option_bt5.png");
            Icon.x=370;
            Icon.y=130+65*4;
            field.addChild(Icon);
            Icon.addEventListener("click", {card:-1,handleEvent:Numcross});
            var option_bt5 = new createjs.Bitmap('soL_batu.png');
            option_bt5.x=660;
            option_bt5.y=50;
            option_bt5.scale=0.4;
            field.addChild(option_bt5);
            option_bt5.addEventListener("click", {card:4,handleEvent:Mapcross});
          }
          break;
        }
        function Numcross(){
          se11.play();
          switch (this.card){
            case 10:
              //リティア
              numPW=[];
              break;
            case 11:
              if(numPW.length>10){return false;}
              numPW.push(0);
              break;
            case 12:
              numPW.pop();
              break;
            case -1:
              var T=textL[0];
              T.text="　";
              for(var i=0;i<numPW.length;i++){
                T.text+=numPW[i];
              };
              if(T.text==playMode[2]){
                opLock=0;
                se10.play();
                field.removeAllChildren();
                InvID(0,5);
                PathTalk();
                return true;
              }
              numPW=[];
              break;
            default:
              if(numPW.length>10){return false;}
              numPW.push(this.card);
              break;
          }
          var T=textL[0];
          T.text="　";
          for(var i=0;i<numPW.length;i++){
            T.text+=numPW[i];
          };
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
        var A=userRecipe.findIndex(value=>value<0);
        if(A!==-1){
          userRecipe[A]=-userRecipe[A];
          PopAnm("新しいレシピを記録しました！",800,280,35,30,130)
        }
        var A=cleared[1].findIndex(value=>value>0);
        if(A!==-1){
          AK("ファインダー");
        };
        var A=cleared[1][0]+cleared[1][1]+cleared[1][2];
        if(A>=100){
          AK("情熱のペイ");
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
        if(cleared[0][2]>=7){
          AK("エリアノド守護者");
        };
        if(achieve_SS[0]>0 && achieve_SS[1]>0 && achieve_SS[2]>0){
          AK("SS魂");
        }
        if(henirarea[0].cleared>0){
          AK("フォーヘニル");
        }
        if(UserLibrary[62]>0){
          AK("ソリティア・ベリル");
        }
        var U=UserLibrary.filter(value=>value>0);
        if(U.length>=157){
          AK("究極の真理");
        }
        if(cleared[0][0]>0 && cleared[0][1]>0 && cleared[0][2]>0 && totalcardmove>=1500){
          IK("エル・コレクション・ブック");
        }
        if(InvID(7)==0 && UserLibrary[62]>0){
          PopAnm("手紙が届いています",800,220,35,30,165);
        }
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
        if(playMode[0]==4){
        PathTalk(1);
        }else{
        PathTalk();
        }
        break;
  }
};
function Henirmap(p,map=0){
  //各地域の描画 map:最初に訪れた際はイベント終了後に描画
  console.log('henirmap',p,map);
  HenirPathT=[];
  playMode[0]=4;
  gamestate=5;
  var BG1 = new createjs.Bitmap(SoLbg_src[p]);
  BG1.alpha=0.8;
  field.addChild(BG1);
  if(playMode[1]==6){
    if(henirarea[6].cleared<=2){
      var obj = new createjs.Shape();
      obj.graphics.beginFill("black");
      obj.graphics.drawRect(0,0,800,600);
      obj.alpha=0.9;
      field.addChild(obj);
      HenirPathT.push(obj);
  }}
  var Header1 = new createjs.Bitmap("soL_header1.png");
  Header1.x=480;
  Header1.scale=0.7;
  field.addChild(Header1);
  var Header2 = new createjs.Bitmap("soL_header2.png");
  Header2.y=-8;
  field.addChild(Header2);
  var Opicon2 = new createjs.Bitmap("soL_opicon2.png");
  Opicon2.x=670;
  Opicon2.y=540;
  field.addChild(Opicon2);
  var obj = new createjs.Shape();
  obj.graphics.beginFill("#bae0c3");
  obj.graphics.beginStroke("#617d68");
  obj.graphics.setStrokeStyle(2);
  obj.graphics.drawRect(15, 135, 262, 35);
  field.addChild(obj);
  if(playMode[1]==8){
  var T=new createjs.Text("進む","24px serif","#46574a");
  }else if(playMode[1]==6){
    if(UserItem[148]==0){
      var T=new createjs.Text("暗くて採取できない！","24px serif","#46574a");
    }else{
      if(henirarea[0].cleared>=3){
        var T=new createjs.Text("採取スタート","24px serif","#46574a");
      }else{
      var T=new createjs.Text("明かりをつける","24px serif","#46574a");
      }
    }
  }else{
  var T=new createjs.Text("採取スタート","24px serif","#46574a");
  }
  T.x=20;
  T.y=138;
  field.addChild(T);
  var obj2 = new createjs.Shape();
  obj2.graphics.beginFill("#bae0c3");
  obj2.graphics.beginStroke("#617d68");
  obj2.graphics.setStrokeStyle(2);
  obj2.graphics.drawRect(15, 170, 262, 35);
  if(henirarea[0].cleared>1){
  field.addChild(obj2);
  }
  var T=new createjs.Text("入口に戻る","24px serif","#46574a");
  T.x=20;
  T.y=173;
  if(henirarea[0].cleared>1){
  field.addChild(T);
  }
  Opicon2.addEventListener("click", {handleEvent:InvConfig_Item});
  if(playMode[1]==8){
    //ラストバトル
    obj.addEventListener("click", {card:4,handleEvent:Lastbattle});
  }else{
  if(playMode[1]==5){
    if(henirarea[5].cleared<=2){
      obj.addEventListener("click", {card:4,handleEvent:Battle5});
      function Battle5(){
      if(henirarea[5].cleared==0){return false}
      if(henirarea[5].cleared==2){
      MsgAry.push(["リティア","この……コソ泥モンスター！&大事なペンダント、返してもらうよ！",0,-2,3,1]);
      }else if(henirarea[5].cleared==1){
      MsgAry.push(["リティア","よーし、採取しようっと……。",0,-2,3,1]);
      MsgAry.push(["リティア","！？",0,-2]);
      MsgAry.push(["リティア","ない！&あたしのペンダントがない！",0,-2]);
      MsgAry.push(["リティア","あーっ！　それ！&あたしのペンダント！&いつの間に……。",0,-2]);
      MsgAry.push(["リティア","こら、逃げるな！&返しなさーい！",0,-2]);
      henirarea[5].cleared=2;
      }
      MsgAry.push(["battle_6"]);
      Roomyard.alpha=0;
      cLock=true;
      MsgNext(-1);
      }
    }else{
    obj.addEventListener("click", {card:4,handleEvent:GameReady});
    }
  }else if(playMode[1]==6){
    if(UserItem[148]>0){
    //明かりをつける
    if(henirarea[6].cleared>=0 && henirarea[6].cleared<=2){
    obj.addEventListener("click", {card:4,handleEvent:Rumos});
    }else{
    obj.addEventListener("click", {card:4,handleEvent:GameReady});
    }
    }
  }else{
    obj.addEventListener("click", {card:4,handleEvent:GameReady});
    }
  }
  obj2.addEventListener("click", {rule:playMode[0],handleEvent:Gameend});
  function Rumos(){
    //明かりをつける
    if(henirarea[5].cleared==0){return false}
    if(henirarea[6].cleared==2){
      MsgAry.push(["リティア","明かりをつけたら、&またあれが襲ってくるかな……",0,-2,3,1]);
      MsgAry.push(["rumos"]);
      MsgAry.push(["リティア","う……&やっぱり、来たよっ！",0,-2]);
      }else if(henirarea[6].cleared==1){
    MsgAry.push(["リティア","ランタンを使って明かりをつけてみるよ……！",0,-2,3,1])
    MsgAry.push(["rumos"]);
    MsgAry.push(["リティア","わぁ！　こんなに広い洞窟だったんだ！&宝石がいっぱい/…/…！",0,-2]);
    MsgAry.push(["リティア","な、なに……この振動は……？",0,-2]);
    MsgAry.push(["リティア","なにか、来る！",0,-2]);
    henirarea[6].cleared=2;
      }
    MsgAry.push(["battle_6"]);
    Roomyard.alpha=0;
    cLock=true;
    MsgNext(-1);
  }
  function Lastbattle(){
    if(henirarea[5].cleared==0){return false}
  if(henirarea[8].cleared==1){
    //会話
    MsgAry.push(["リティア","……。",0,-2,3,1])
    MsgAry.push(["リティア","なんだろう、この立方体……&すごいエネルギーを感じる……。",0,-2]);
    MsgAry.push(["Cut_1"]);
    MsgAry.push(["男の声","クク……まさかここまで辿り着くとはな。",-10]);
    MsgAry.push(["リティア","その声……。&ようやく姿を現したね。",-10]);
    MsgAry.push(["Cut_2"]);
    MsgAry.push(["仮面の男","隠れていたわけでもないのだが。&まあいいだろう。",-10]);
    MsgAry.push(["仮面の男","さて……見ての通り、出口がそこにあるわけだが。",-10]);
    MsgAry.push(["仮面の男","こちらはこちらで少々厄介なことが起こっているのだ。",-10]);
    MsgAry.push(["仮面の男","その箱には、ある魔物が封印されているのだが……&長年の時間で封印が弱まっている。",-10]);
    MsgAry.push(["仮面の男","いつ封印が破られて、暴れ出すかわからん状態だ。",-10]);
    MsgAry.push(["リティア","ちっ！　そういうことね……。",-10]);
    MsgAry.push(["リティア","あたしと取引をしようっていうんでしょ？&あたしがその魔物を倒して、もう一回封印できたら、&代わりにあたしをここから出してくれる、そんなところ？",-10]);
    MsgAry.push(["リティア","じゃなきゃ、あたしのために&わざわざ手間をかけるメリットがない。",-10]);
    MsgAry.push(["仮面の男","フン、少しは頭が切れると思ったが、&やはり子供だな。",-10]);
    MsgAry.push(["リティア","どういうこと？",-10]);
    MsgAry.push(["仮面の男","貴様をここから出す程度、大したことはない。&ポータルを開いたタイミングで、&貴様以外の出入りが発生する可能性が問題なのだ。",-10]);
    MsgAry.push(["仮面の男","ヘニルの管理者という手前、&ヘニルの魔物をエリオスに&解き放つわけにはいかないのでな。",-10]);
    MsgAry.push(["リティア","いちいち馬鹿にして……。&あたしがその魔物を倒したら、出してくれるんでしょ。&理由は何であれ、結論は変わらないじゃん。",-10]);
    MsgAry.push(["Cut_reset"]);
    MsgAry.push(["music_stop"])
    MsgAry.push(["仮面の男","……少し話しすぎたようだ。",2]);
    MsgAry.push(["リティア","立方体に……ヒビが……。",0,-2]);
    MsgAry.push(["仮面の男","ここまで来られたのなら、少しは戦えるだろう。&見せてもらおうか。",2]);
    MsgAry.push(["リティア","封印が……解き放たれる！",0,-2]);
    MsgAry.push(["battle_6"]);
    Roomyard.alpha=0;
    cLock=true;
    MsgNext(-1);
  }
  };
  HenirPathS=[];
  switch(p){
    case 0:
      //エルの樹
      if(musicnum!==7){
        Bgm.stop();
        musicnum=7;
        if(mute=="ON"){
        Bgm=new Music(bgm7data);
        Bgm.playMusic();
        }}
      if(map>0){
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.5;
      Room.x=100;
      Room.y=200;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:1,num:1,tp:0,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.5;
      RoomA.x=100;
      RoomA.y=200;
      if(henirarea[1].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      RoomA.addEventListener("click", {card:2,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      }
      if(map==0){
        //初入場時のイベント
            cLock=false;
            var Ary=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
            var t=new createjs.Text(henirarea[p].name,"64px serif","white");
            t.x=400;
            t.y=250;
            t.textAlign="center"
            t.alpha=0;
            field.addChild(t);
            Ary.push(t);
            createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
            shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
            MsgAry.push(["リティア","ここは……森？&でもこの感覚、まだ狭間の中にいるみたい。",0,-2,3,1])
            MsgAry.push(["リティア","まさかフルーツポンチで扉が開くなんてね……。",0,-2]);
            MsgAry.push(["リティア","クリソナには狭間を開く力がある……。&もしかしたら、氷のクリソナを使ったことが関係したのかな。",0,-2])
            MsgAry.push(["リティア","さっきのおじさんは、&ここから出たければもっとエリオス側に来いって&言ってたけど……。",0,-2]);
            MsgAry.push(["リティア","助ける気があるなら、&もっと具体的に教えてくれればいいのに。",0,-2]);
            MsgAry.push(["リティア","あーもう、考えてても始まらない！&このあたりをいろいろ調べてみよう！",0,-2]);
            MsgAry.push(["リティア","もしかしたら、&思いがけない宝物があるかもしれないし！",0,-2]);
            MsgAry.push(["collection"]);
        }
      break;
    case 1:
      //天空
      if(musicnum!==9){
        Bgm.stop();
        musicnum=9;
        if(mute=="ON"){
        Bgm=new Music(bgm9data);
        Bgm.playMusic();
        }}
      if(map>0){
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.4;
      Room.x=100;
      Room.y=200;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:2,num:1,tp:0,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.4;
      RoomA.x=100;
      RoomA.y=200;
      if(henirarea[2].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      RoomA.addEventListener("click", {card:3,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.4;
      Room.x=400;
      Room.y=200;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:67,num:1,tp:1,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.4;
      RoomA.x=400;
      RoomA.y=200;
      if(henirarea[5].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      RoomA.addEventListener("click", {card:6,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      //ベ
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.4;
      Room.x=250;
      Room.y=50;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:45},2100)
      .to({y:50},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:107,num:1,tp:2,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.4;
      RoomA.x=250;
      RoomA.y=50;
      if(henirarea[7].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:45},2100)
      .to({y:50},2100);
      RoomA.addEventListener("click", {card:8,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      }
      if(map==0){
        //初入場時のイベント
            cLock=false;
            var Ary=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
            var t=new createjs.Text(henirarea[p].name,"64px serif","white");
            t.x=400;
            t.y=250;
            t.textAlign="center"
            t.alpha=0;
            field.addChild(t);
            Ary.push(t);
            createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
            shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
            MsgAry.push(["リティア","……ふー、すごい風。&ここは……。",0,-2,3,1])
            MsgAry.push(["リティア","うわ！　空の上だ！&……それに人工物とナソードの姿も見える……。",0,-2]);
            MsgAry.push(["リティア","「……ナソードの父は、エリオスを離れ、&別次元の天空にナソードのための理想郷&『エリシオン』を築き上げた……」だっけ。",0,-2]);
            MsgAry.push(["リティア","マティが見たら、&伝説は本当だったんだ！　とか言って&大喜びしそうな風景ね。",0,-2]);
            MsgAry.push(["リティア","……とにかく、立ち止まっちゃいられないよね！",0,-2]);
            MsgAry.push(["リティア","あの人の話ぶりからは、&まだまだ次のエリアに進まないと&いけない気がする。",0,-2])
            MsgAry.push(["リティア","このピッケルで素材を採取して、&魔法も使って！&道を開いて行こう！",0,-2]);
            MsgAry.push(["collect_nonev"]);
      }
      break;
    case 2:
      //平原
      if(musicnum!==10){
        Bgm.stop();
        musicnum=10;
        if(mute=="ON"){
        Bgm=new Music(bgm10data);
        Bgm.playMusic();
        }}
      if(map>0){
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.4;
      Room.x=70;
      Room.y=200;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:112,num:1,tp:0,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.4;
      RoomA.x=70;
      RoomA.y=200;
      if(henirarea[3].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:195},2100)
      .to({y:200},2100);
      RoomA.addEventListener("click", {card:4,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.4;
      Room.x=400;
      Room.y=160;
      Room.alpha=0.6;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:155},2100)
      .to({y:160},2100);
      HenirPathT.push(Room);
      Room.addEventListener("click", {card:3,num:1,tp:1,handleEvent:HenirKey});
      var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
      RoomA.scale=0.4;
      RoomA.x=400;
      RoomA.y=160;
      if(henirarea[4].cleared==-1){
      RoomA.alpha=0;
      }else{
      Room.alpha=0;
      RoomA.alpha=1;
      }
      field.addChild(RoomA);
      createjs.Tween.get(RoomA,{loop:true})
      .to({y:155},2100)
      .to({y:160},2100);
      RoomA.addEventListener("click", {card:5,tp:0,handleEvent:HenirPathTo});
      HenirPathS.push(RoomA);
      }
      if(map==0){
        //初入場時のイベント
            cLock=false;
            var Ary=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
            var t=new createjs.Text(henirarea[p].name,"64px serif","white");
            t.x=400;
            t.y=250;
            t.textAlign="center"
            t.alpha=0;
            field.addChild(t);
            Ary.push(t);
            createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
            shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
            MsgAry.push(["リティア","ぅわあああ！",0,-2,3,1])
            MsgAry.push(["リティア","いたた……。&雲の中に飛び込んだと思ったら、今度は草原？",0,-2]);
            MsgAry.push(["リティア","すー……。はー……。",0,-2]);
            MsgAry.push(["リティア","青い空、広がる草原、麦の匂い。&何もなければ、ずっと寝そべっていたいなぁ。&けど、ここも作られた空間なんだよね。",0,-2]);
            MsgAry.push(["リティア","このエリアもかなり広そう。",0,-2]);
            MsgAry.push(["リティア","レシピに詰まったら、&ソリティアを遊びに戻るのも&気分転換にいいかもしれない。",0,-2]);
            MsgAry.push(["リティア","さてと！　いつまでも寝てられないよね。",0,-2]);
            MsgAry.push(["collect_nonev"]);
      }
      break;
    case 3:
        //採掘場
        if(musicnum!==16){
          Bgm.stop();
          musicnum=16;
          if(mute=="ON"){
          Bgm=new Music(bgm16data);
          Bgm.playMusic();
          }}
        if(map==0){
          //初入場時のイベント
              cLock=false;
              var Ary=[];
              var shape = new createjs.Shape();
              shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
              field.addChild(shape);
              shape.alpha=0;
              Ary.push(shape);
              createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
              var t=new createjs.Text(henirarea[p].name,"64px serif","white");
              t.x=400;
              t.y=250;
              t.textAlign="center"
              t.alpha=0;
              field.addChild(t);
              Ary.push(t);
              createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
              shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
              field.addChild(shape);
              shape.alpha=0;
              Ary.push(shape);
              createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
              MsgAry.push(["リティア","ここは行き止まりみたい。",0,-2,3,1])
              MsgAry.push(["リティア","熱帯植物に、青く光る鉱石。",0,-2]);
              MsgAry.push(["リティア","ここは……面白そうだ！&変わった素材が手に入るかもしれない！",0,-2]);
              MsgAry.push(["collect_nonev"]);
        }
        break;
    case 4:
          //ザヤ山
          if(musicnum!==14){
            Bgm.stop();
            musicnum=14;
            if(mute=="ON"){
            Bgm=new Music(bgm14data);
            Bgm.playMusic();
            }}
            if(map>0){
              var Room = new createjs.Bitmap("Card_images/soL_henir.png");
              Room.scale=0.5;
              Room.x=100;
              Room.y=200;
              Room.alpha=0.6;
              field.addChild(Room);
              createjs.Tween.get(Room,{loop:true})
              .to({y:195},2100)
              .to({y:200},2100);
              HenirPathT.push(Room);
              Room.addEventListener("click", {card:4,num:1,tp:0,handleEvent:HenirKey});
              var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
              RoomA.scale=0.5;
              RoomA.x=100;
              RoomA.y=200;
              if(henirarea[8].cleared==-1){
              RoomA.alpha=0;
              }else{
              Room.alpha=0;
              RoomA.alpha=1;
              }
              field.addChild(RoomA);
              createjs.Tween.get(RoomA,{loop:true})
              .to({y:195},2100)
              .to({y:200},2100);
              RoomA.addEventListener("click", {card:9,tp:0,handleEvent:HenirPathTo});
              HenirPathS.push(RoomA);
              }
          if(map==0){
            //初入場時のイベント
                cLock=false;
                var Ary=[];
                var shape = new createjs.Shape();
                shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
                field.addChild(shape);
                shape.alpha=0;
                Ary.push(shape);
                createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
                var t=new createjs.Text(henirarea[p].name,"64px serif","white");
                t.x=400;
                t.y=250;
                t.textAlign="center"
                t.alpha=0;
                field.addChild(t);
                Ary.push(t);
                createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
                shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
                field.addChild(shape);
                shape.alpha=0;
                Ary.push(shape);
                createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
                MsgAry.push(["リティア","見慣れた山道に出たな……。",0,-2,3,1])
                MsgAry.push(["リティア","そうだ……ザヤ山だ！&ついにあたしが行ったことある場所に出た！",0,-2]);
                MsgAry.push(["リティア","ゴールが近づいてるってことなのかな。",0,-2]);
                MsgAry.push(["リティア","銀秤草もあるといいな。",0,-2]);
                MsgAry.push(["collect_nonev"]);
          }
          break;
    case 5:
          //トロッシュ
          if(musicnum!==11){
            Bgm.stop();
            musicnum=11;
            if(mute=="ON"){
            Bgm=new Music(bgm11data);
            Bgm.playMusic();
            }}
          if(map==0){
            //初入場時のイベント
                cLock=false;
                var Ary=[];
                var shape = new createjs.Shape();
                shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
                field.addChild(shape);
                shape.alpha=0;
                Ary.push(shape);
                createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
                var t=new createjs.Text(henirarea[p].name,"64px serif","white");
                t.x=400;
                t.y=250;
                t.textAlign="center"
                t.alpha=0;
                field.addChild(t);
                Ary.push(t);
                createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
                shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
                field.addChild(shape);
                shape.alpha=0;
                Ary.push(shape);
                createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
                MsgAry.push(["リティア","ごぼぼぼぼ！",0,-2,3,1])
                MsgAry.push(["リティア","あれ……。&息が……できる！",0,-2]);
                MsgAry.push(["リティア","なるほど、海底に空気の層ができてるってわけね。&全く……空の上から水の中に突っ込むなんて。&ひどい目にあったよ。",0,-2]);
                MsgAry.push(["リティア","見たことないものがいっぱいある。&どれも気になる！&もちろん、気をつけて進まなきゃね。",0,-2]);
                MsgAry.push(["collect_nonev"]);
          }
          break;
    case 6:
          //鉱脈
          if(henirarea[6].cleared>2){
            if(musicnum!==12){
              Bgm.stop();
              musicnum=12;
              if(mute=="ON"){
              Bgm=new Music(bgm12data);
              Bgm.playMusic();
              }}
            }else{
              if(musicnum!==17){
                Bgm.stop();
                musicnum=17;
                if(mute=="ON"){
                Bgm=new Music(bgm17data);
                Bgm.playMusic();
                }}
            }
            if(map==0){
              //初入場時のイベント
              //ランタン
                  cLock=false;
                  var Ary=[];
                  var shape = new createjs.Shape();
                  shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
                  field.addChild(shape);
                  shape.alpha=0;
                  Ary.push(shape);
                  createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
                  var t=new createjs.Text(henirarea[p].name,"64px serif","white");
                  t.x=400;
                  t.y=250;
                  t.textAlign="center"
                  t.alpha=0;
                  field.addChild(t);
                  Ary.push(t);
                  createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
                  shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
                  field.addChild(shape);
                  shape.alpha=0;
                  Ary.push(shape);
                  createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
                  MsgAry.push(["リティア","ここは……？&洞窟か何かの中みたいだけど、暗すぎて何も見えないや。",0,-2,3,1])
                  MsgAry.push(["リティア","ひっ！",0,-2]);
                  MsgAry.push(["リティア","……なぁんだ、水滴が落ちてきただけか。",0,-2]);
                  MsgAry.push(["リティア","ここで採取をするには、&何か明かりになるものが&あった方がよさそう。",0,-2]);
                  MsgAry.push(["collect_nonev"]);
            }
            break;
    case 7:
      //竜の道
      if(musicnum!==13){
        Bgm.stop();
        musicnum=13;
        if(mute=="ON"){
        Bgm=new Music(bgm13data);
        Bgm.playMusic();
        }}
        if(map>0){
          var Room = new createjs.Bitmap("Card_images/soL_henir.png");
          Room.scale=0.5;
          Room.x=100;
          Room.y=200;
          Room.alpha=0.6;
          field.addChild(Room);
          createjs.Tween.get(Room,{loop:true})
          .to({y:195},2100)
          .to({y:200},2100);
          HenirPathT.push(Room);
          Room.addEventListener("click", {card:135,num:1,tp:0,handleEvent:HenirKey});
          var RoomA = new createjs.Bitmap("Card_images/soL_henirA.png");
          RoomA.scale=0.5;
          RoomA.x=100;
          RoomA.y=200;
          if(henirarea[6].cleared==-1){
          RoomA.alpha=0;
          }else{
          Room.alpha=0;
          RoomA.alpha=1;
          }
          field.addChild(RoomA);
          createjs.Tween.get(RoomA,{loop:true})
          .to({y:195},2100)
          .to({y:200},2100);
          RoomA.addEventListener("click", {card:7,tp:0,handleEvent:HenirPathTo});
          HenirPathS.push(RoomA);
          }
      if(map==0){
        //初入場時のイベント
            cLock=false;
            var Ary=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
            var t=new createjs.Text(henirarea[p].name,"64px serif","white");
            t.x=400;
            t.y=250;
            t.textAlign="center"
            t.alpha=0;
            field.addChild(t);
            Ary.push(t);
            createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
            shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
            MsgAry.push(["リティア","ん……。",0,-2,3,1])
            MsgAry.push(["リティア","あっつい！　今度は砂漠地帯？",0,-2]);
            MsgAry.push(["リティア","前もって注意書きしてほしいよね。&この扉の向こうは砂まみれでとても暑いです！&とかさ。",0,-2]);
            MsgAry.push(["リティア","このリティア様みたいに適応力がなかったら、&良い子は風邪ひいちゃうじゃん。",0,-2]);
            MsgAry.push(["リティア","あと、どれくらい進めばゴールなのかは&分からないけど、進み続けるしかないんだよね。",0,-2]);
            MsgAry.push(["リティア","行こっか！",0,-2]);
            MsgAry.push(["collect_nonev"]);
      }
      break;
    case 8:
    //オベザール
    if(musicnum!==21){
      Bgm.stop();
      musicnum=21;
      if(mute=="ON"){
      Bgm=new Music(bgm21data);
      Bgm.playMusic();
      }}
    if(map>=0){
      var Room = new createjs.Bitmap("Card_images/soL_henir2.png");
      Room.scale=0.7;
      Room.x=80;
      Room.y=40;
      Room.alpha=0.8;
      field.addChild(Room);
      createjs.Tween.get(Room,{loop:true})
      .to({y:45},2100)
      .to({y:40},2100);
      HenirPathT.push(Room);
    }
    if(map==0){
      //初入場時のイベント
          cLock=false;
          var Ary=[];
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
          field.addChild(shape);
          shape.alpha=0;
          Ary.push(shape);
          createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
          var t=new createjs.Text(henirarea[p].name,"64px serif","white");
          t.x=400;
          t.y=250;
          t.textAlign="center"
          t.alpha=0;
          field.addChild(t);
          Ary.push(t);
          createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
          shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
          field.addChild(shape);
          shape.alpha=0;
          Ary.push(shape);
          createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
          MsgAry.push(["リティア","ここは……最初の狭間みたいな場所だ。",0,-2,3,1])
          MsgAry.push(["リティア","遠くに見えるのは……ああっ！&ま、ま、まさか、エルの塔？",0,-2]);
          MsgAry.push(["リティア","「こちら側からもエリオスが見える場所」……。&ここが出口に違いない！",0,-2]);
          MsgAry.push(["リティア","だけどなんだか……やばい雰囲気を感じるよ。",0,-2]);
          MsgAry.push(["リティア","進むか引き返すか。&今決めなきゃ。",0,-2]);
          MsgAry.push(["collect_nonev"]);
    }
    break;
    }
  function firstEv(){
    for(var i=0;i<Ary.length;i++){
      field.removeChild(Ary[i]);
    }
    cLock=true;
    MsgNext(-1);
    henirarea[p].cleared=1;
  }
  function HenirPathTo(){
        //各地域へ入場部分だけコピペ
        field.removeAllChildren();
        playMode[1]=this.card-1;
        createjs.Tween.get(HenirPathS[this.tp])
        .to({x:-1700,y:-1300,scale:4,alpha:0.1},500, createjs.Ease.backIn);
        var shape = new createjs.Shape();
        shape.graphics.beginFill("white");
        shape.graphics.drawRect(0, 0, 800, 600);
        shape.alpha=0;
        Roomyard.alpha=1;
        Roomyard.addChild(shape);
        createjs.Tween.get(shape)
        .to({alpha:1},500)
        .wait(80)
        .call(ToHenir);
        function ToHenir(){
        Roomyard.alpha=0;
        Roomyard.removeChild(shape);
        var shapeMask3 = new createjs.Shape();
        shapeMask3.graphics
          .beginFill("gold")
          .drawRect(0, 0, 800, 600);
        field.mask = shapeMask3;
        Henirmap(playMode[1],henirarea[playMode[1]].cleared);
        }
      };
}
function HenirKey(){
  //this.card:id this.num:num
    if(equipeditem==this.card && InvID(6)==1){
      equipeditem=-1;
      InvID(6,-1);
      InvConfig(0);
      se19.play();
      Roomyard.removeChild(Room);
      RoomA.alpha=1;
      createjs.Tween.get(RoomA)
    .to({x:800,rotation:180},200)
    .to({x:0,rotation:360},100);
    }else{
      if(UserLibrary[this.card]==0){
        Dialogue("Required Item","？？？ ×"+this.num+"（所持数"+UserItem[this.card]+"）&"+itemA[itemID(this.card)].detail,-1,-1,"OK",350,340,80,35);
      }else{
        if(UserItem[this.card]>=this.num){
          //無言で解放
          PopAnm(itemA[itemID(this.card)].name+"を"+this.num+"個使用しました！",900,350);
          UserItem[this.card]-=this.num;
          se19.play();
          field.removeChild(HenirPathT[this.tp]);
          HenirPathS[this.tp].alpha=1;
          createjs.Tween.get(HenirPathS[this.tp])
          .to({x:HenirPathS[this.tp].x+800,rotation:180},200)
          .to({x:HenirPathS[this.tp].x,rotation:360},100);
          //TK 
          switch(playMode[1]){
            case 0:
            henirarea[1].cleared=0;
            break;
            case 1:
              if(this.tp==0){
                henirarea[2].cleared=0;
              }else if(this.tp==1){
                henirarea[5].cleared=0;
              }else if(this.tp==2){
                henirarea[7].cleared=0;
              }
            break;
            case 2:
              if(this.tp==0){
                henirarea[3].cleared=0;
              }else if(this.tp==1){
                henirarea[4].cleared=0;
              }
            break;
            case 4:
            henirarea[8].cleared=0;
            break;
            case 7:
            henirarea[6].cleared=0;
            break;
          }
        }else{
        Dialogue("Required Item",itemA[itemID(this.card)].name+"×"+this.num+"&"+itemA[itemID(this.card)].detail,-1,-1,"OK",350,330,80,40);
      }}
}};
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
//錬成編
function SoLchara(){
  if(opLock==0 || opLock==4){
    field.removeAllChildren();
    opLock=4;
    se11.play();
    if(Itemswitch==1){
      createjs.Tween.get(Itemyard)
      .to({x:100},150, createjs.Ease.backOut)
      Itemswitch=0;
      }
//プレイデータを参照する
//共通部分
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
var BG1 = new createjs.Bitmap("soL_header2.png");
BG1.y=-8;
field.addChild(BG1);
var option_bt5 = new createjs.Bitmap('soL_batu.png');
  option_bt5.x=700;
  option_bt5.y=60;
  option_bt5.scale=0.5;
  field.addChild(option_bt5)
  option_bt5.addEventListener("click", {card:10,handleEvent:GameReady});
var t = new createjs.Text("プレイデータ", "36px serif", "white");
t.x=360;
t.y=60;
field.addChild(t);
var t = new createjs.Text("("+Math.floor(totalcardmove/10)+")", "18px serif", "white");
t.x=110;
t.y=80;
field.addChild(t);
//0-1
if(this.type==0){
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
  if(UserLibrary.indexOf(1)!==-1){
  Car1.addEventListener("click", {type:1,handleEvent:SoLchara});
  Car6.addEventListener("click", {type:1,handleEvent:SoLchara});
  }
  disp(GamestartT);
  if(hour<10){hour="0"+hour};
  if(min<10){min="0"+min};
  var t = new createjs.Text("総プレイ時間　"+hour+"："+min, "24px serif", "white");
  t.x=360;
  t.y=240;
  field.addChild(t);
  var achieveAry=[];
  var achieveAry2=[];
  var scoreAry2=[];
  var achievepage=[0,0,0,0];
  var T=achieve.filter(value=>value.cleared>0);
  var t = new createjs.Text("実績", "24px serif", "white");
  t.x=360;
  t.y=280;
  field.addChild(t);
  var t = new createjs.Text("（"+T.length+"/"+achieve.length+"）", "20px serif", "white");
  t.x=350;
  t.y=310;
  field.addChild(t);
  var option_arrow = new createjs.Bitmap('Winedom_arrowleft.png');
  option_arrow.x=640;
  option_arrow.y=505;
  option_arrow.scale=0.2;
  field.addChild(option_arrow)
  var t = new createjs.Text((achievepage[0]+1)+"/"+(1+Math.floor((achieve.length-1)/10)), "20px serif", "white");
  t.x=670;
  t.y=505;
  field.addChild(t);
  achievepage[3]=t;
  option_arrow.addEventListener("click", {card:1,handleEvent:achieveListMove});
  var option_arrow = new createjs.Bitmap('Winedom_arrowright.png');
  option_arrow.x=710;
  option_arrow.y=505;
  option_arrow.scale=0.2;
  field.addChild(option_arrow)
  option_arrow.addEventListener("click", {card:3,handleEvent:achieveListMove});
  if(InvID(7)==1){
  var option_arrow = new createjs.Bitmap('Winedom_arrowleft.png');
  option_arrow.x=640;
  option_arrow.y=240;
  option_arrow.scale=0.2;
  field.addChild(option_arrow)
  var t = new createjs.Text((achievepage[2]+1)+"/2", "20px serif", "white");
  t.x=670;
  t.y=240;
  field.addChild(t);
  achievepage[1]=t;
  option_arrow.addEventListener("click", {card:2,handleEvent:achieveListMove});
  var option_arrow = new createjs.Bitmap('Winedom_arrowright.png');
  option_arrow.x=710;
  option_arrow.y=240;
  option_arrow.scale=0.2;
  field.addChild(option_arrow)
  option_arrow.addEventListener("click", {card:4,handleEvent:achieveListMove});
  };
  achieveList();
  function ScoreDetail(){
    function dispR(time){
      if(time==324000 || time==-1){
        return "--:--:--"
      }
      var Hr=Math.floor(time/3600);
      var Min=Math.floor((time-3600*Hr)/60);
      var Sec=Math.floor(time-3600*Hr-60*Min);
      if(Min<10){Min="0"+Min};
      if(Sec<10){Sec="0"+Sec}
      return Hr+":"+Min+":"+Sec;
    }
    function ScoreDisp(score){
      if(score==-1){
        return "------"
      }else{
        return score
      }
    }
    var T="　　　タイム　　　　　　スコア&"+"1st　"+dispR(highscore[this.card].time[0])+"　　　1st　"+ScoreDisp(highscore[this.card].score[0])
    T+="&2nd　"+dispR(highscore[this.card].time[1])+"　　 2nd　"+ScoreDisp(highscore[this.card].score[1])
    T+="&3rd　"+dispR(highscore[this.card].time[2])+"　　  3rd　"+ScoreDisp(highscore[this.card].score[2])
    Dialogue(Modename[this.card],T,-4,-1,"OK",520,330,80,40);
    opLock=10;
  }
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
  function achieveListMove(){
    se11.play();
    switch(this.card){
      case 1:
        achievepage[0]-=1;
        if(achievepage[0]<0){achievepage[0]=Math.floor(achieve.length/9)};
        break;
      case 3:
        achievepage[0]+=1;
        if(achievepage[0]>Math.floor(achieve.length/9)){achievepage[0]=0};
        break;
      case 2:
        achievepage[2]+=1;
        if(achievepage[2]>=2){achievepage[2]=0};
        break;
      case 4:
        achievepage[2]-=1;
        if(achievepage[2]<0){achievepage[2]=1};
        break;
    }
    achieveList();
  }
  function achieveList(){
    if(scoreAry2.length){
      for(var i=0;i<scoreAry2.length;i++){
        var I=scoreAry2[i];
        field.removeChild(I)
      }
    };
    if(achievepage[2]==0){
      for(var i=0;i<3;i++){
        var t = new createjs.Text(Modename[i]+"　"+cleared[0][i]+"回クリア/挑戦回数"+cleared[1][i]+"回", "24px serif", "white");
        t.x=700;
        t.y=120+40*i;
        t.textAlign = "end";
        field.addChild(t);
        var Z = new createjs.Bitmap('zoom650.png');
        Z.x=705;
        Z.y=120+40*i
        Z.scale=0.3;
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgb(244,177,131)");
        shape.graphics.beginStroke("rgb(237,125,50)");
        shape.graphics.setStrokeStyle(3);
        shape.graphics.drawRect(705, 120+40*i, 30, 30);
        field.addChild(shape);
        field.addChild(Z);
        shape.addEventListener("click", {card:i,handleEvent:ScoreDetail});  
        scoreAry2.push(shape);
        scoreAry2.push(t);
        scoreAry2.push(Z);
      }
    }else{
      for(var i=0;i<2;i++){
        var t = new createjs.Text(Modename[i+3]+"　"+cleared[0][i+3]+"回クリア/挑戦回数"+cleared[1][i+3]+"回", "24px serif", "white");
        t.x=700;
        t.y=120+40*i;
        t.textAlign = "end";
        field.addChild(t);
        var Z = new createjs.Bitmap('zoom650.png');
        Z.x=705;
        Z.y=120+40*i
        Z.scale=0.3;
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgb(244,177,131)");
        shape.graphics.beginStroke("rgb(237,125,50)");
        shape.graphics.setStrokeStyle(3);
        shape.graphics.drawRect(705, 120+40*i, 30, 30);
        field.addChild(shape);
        field.addChild(Z);
        shape.addEventListener("click", {card:i+3,handleEvent:ScoreDetail});  
        scoreAry2.push(shape);
        scoreAry2.push(t);
        scoreAry2.push(Z);
      }
    };
  if(achieveAry2.length){
    for(var i=0;i<achieveAry2.length;i++){
      var I=achieveAry2[i];
      field.removeChild(I)
    }
  };
  for (var i=0;i<9;i++){
    var A=achievepage[0]*9;
  if(A+i>=achieve.length){break;};
  var shape = new createjs.Shape();
  shape.graphics
      .beginFill("black")
      .drawRect(430, 280+i*25, 300, 24);
  shape.alpha=0.5;
  field.addChild(shape);
    if(achieve[A+i].cleared==1){
  var t = new createjs.Text(achieve[A+i].name, "20px serif", "white");
  shape.addEventListener("mouseover", {card:A+i,handleEvent:AchieveDetail});
    }else{
  var t = new createjs.Text("？？？", "20px serif", "white");
    }
  t.x=440;
  t.y=280+i*25;
  field.addChild(t);
  achieveAry2.push(shape);
  achieveAry2.push(t);
  var T=achievepage[1];
  T.text=(achievepage[2]+1)+"/2";
  if(InvID(7)==1){
  var T=achievepage[3];
  T.text=(achievepage[0]+1)+"/"+(1+Math.floor((achieve.length-1)/9));
  }
  }};
}else if(this.type==1){
  var Car6 = new createjs.Bitmap("Card_images/BackColor_Black.png");
  Car6.x=-20;
  Car6.y=270;
  Car6.scale=2;
  Car6.alpha=1;
  Car6.rotation=-8;
  field.addChild(Car6);
  var Car1 = new createjs.Bitmap("Card_images/Spade12.png");
  Car1.x=60;
  Car1.y=230;
  Car1.scale=2;
  Car1.alpha=1;
  Car1.rotation=8;
  field.addChild(Car1);
  Car1.addEventListener("click", {type:0,handleEvent:SoLchara});
  Car6.addEventListener("click", {type:0,handleEvent:SoLchara});
  var shape = new createjs.Shape();
  shape.graphics
      .beginFill("black")
      .drawRect(330, 115, 370, 160);
  shape.alpha=0.7;
  field.addChild(shape);
  var shape = new createjs.Shape();
  shape.graphics
      .beginFill("black")
      .drawRect(330, 288, 370, 250);
  shape.alpha=0.7;
  field.addChild(shape);
  var Ary=[];
  var t = new createjs.Text("ステータス　　HP："+UserStatus[0]+"（+"+(UserStatus[0]-100)+"）", "24px serif", "white");
  Ary.push(t);
  var t = new createjs.Text("ATK："+UserStatus[1]+"（+"+(UserStatus[1]-100)+"）", "24px serif", "white");
  Ary.push(t);
  var t = new createjs.Text("DEF："+UserStatus[2]+"（+"+(UserStatus[2]-100)+"）", "24px serif", "white");
  Ary.push(t);
  var t = new createjs.Text("クリソナ精製純度　+"+UserStatus[3]+"%　", "24px serif", "white");
  Ary.push(t);
  var T=itemA.filter(value=>value.class=="植物資源");
  var U=0;
  for(var i=0;i<T.length;i++){U+=UserLibrary[T[i].id];};
  var t = new createjs.Text("図鑑　　　植物資源："+U+"/"+T.length, "24px serif", "white");
  Ary.push(t);
  var T=itemA.filter(value=>value.class=="鉱物資源");
  var U=0;
  for(var i=0;i<T.length;i++){U+=UserLibrary[T[i].id];};
  var t = new createjs.Text("鉱物資源："+U+"/"+T.length, "24px serif", "white");
  Ary.push(t);
  var T=itemA.filter(value=>value.class=="その他資源");
  var U=0;
  for(var i=0;i<T.length;i++){U+=UserLibrary[T[i].id];};
  var t = new createjs.Text("その他資源："+U+"/"+T.length, "24px serif", "white");
  Ary.push(t);
  var T=itemA.filter(value=>value.class=="クリソナ");
  var U=0;
  for(var i=1;i<T.length;i++){U+=UserLibrary[T[i].id];};
  var t = new createjs.Text("クリソナ： "+U+"/"+(T.length-2)+"　", "24px serif", "white");
  Ary.push(t);
  var T=itemA.filter(value=>value.class=="製造");
  var U=0;
  for(var i=0;i<T.length;i++){
      U+=UserLibrary[T[i].id];};
  var t = new createjs.Text("製造："+U+"/"+T.length, "24px serif", "white");
  Ary.push(t);
  var U=UserLibrary.filter(value=>value>0);
  var t = new createjs.Text("全体："+U.length+"/"+(itemA.length-2)+" ("+(100*U.length/(itemA.length-2)).toFixed(1)+"％)　", "26px serif", "white");
  Ary.push(t);
  for(var i=0;i<Ary.length;i++){
    Ary[i].x=700;
    Ary[i].y=120+40*i;
    if(i>=4 && i<=8){Ary[i].x-=45}
    if(i>=4){Ary[i].y+=12};
    Ary[i].textAlign = "end";
    field.addChild(Ary[i]);
  }
  window.requestAnimationFrame((ts)=>counterI(ts,U.length));
  function counterI(ts,tflame,A=0,delay=0){
    //1文字ずつ描画 A->文字送りの速さ
    if(opLock!==4){
      Ary[Ary.length-1].text="全体："+tflame+"/"+(itemA.length-2)+" ("+(100*tflame/(itemA.length-2)).toFixed(1)+"％)　"
      return false;
    }
    A+=Math.floor(tflame/50);
    Ary[Ary.length-1].text="全体："+A+"/"+(itemA.length-2)+" ("+(100*A/(itemA.length-2)).toFixed(1)+"％)　"
    if(A>tflame){
      A=U.length;
      Ary[Ary.length-1].text="全体："+A+"/"+(itemA.length-2)+" ("+(100*A/(itemA.length-2)).toFixed(1)+"％)　"
    }else{
    window.requestAnimationFrame((ts)=>counterI(ts,tflame,A));
    }
  }
}
}
};
function submitPass(){
  var T=10000+Math.floor(Math.random()*90000)
  var Msg="ヘニルの時空への入場パスワード："+T;
  playMode[2]=T;
  if(debugmode){console.log(T)};
  cx3.clearRect(0,0,800,600);
  QR_main(canvas3,Msg)
  var qr_src=canvas3.toDataURL();
  qr_src2 = new createjs.Bitmap(qr_src);
  qr_src2.alpha=0;
  cx3.clearRect(0,0,800,600);
}
function GameReady(){
  if(this.card==0){
    console.log('go to main menu')
    menu(0);
    return true;
  }
  if(this.card==10){
    if(opLock==10){return false};
    console.log('go to main menu')
    se11.play();
    field.removeAllChildren();
    opLock=0;
    Titleyard.alpha=1;
    return true;
  }
  if(this.card==4){
    if(henirarea[playMode[1]].cleared==0){return false}
  }
  playMode[0]=this.card;
  load2();
};
function load2(){
  if(opLock!==5 && playMode[0]!==4){return false;}
  Titleyard.alpha=0;
  tweeNroom.paused=true;
  Roomyard.alpha=0;
  if(Itemswitch==1){
  createjs.Tween.get(Itemyard)
  .to({x:100},150, createjs.Ease.backOut)
  Itemswitch=0;
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
              //再度上へ上げる
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[T]);
                newCard.x=50+(Ary.to)*(cardWidth+cardgapX);
                newCard.y=150+(hands[Ary.to].length-1)*cardgapY;
                field.addChild(newCard);
                createjs.Tween.get(newCard)
                .to({x:50+(Ary.from-7)*(cardWidth+cardgapX),y:5},70);
                Exlists[Ary.from-10].push(newCard);
                newCard.addEventListener("mousedown", {card:Ary.from,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:Ary.from,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:Ary.from,handleEvent:handleUp});
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
                var HashCard=Ary.to*100+hands[Ary.to].length-1;
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
            Exlists[1].pop();
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
  if(opLock==0){
    opLock=2;
    se11.play();
    Dialogue("RETRY？","同じ盤面を最初からやり直します",3,-1);
  }
}
function solveButton(event=-1){
  if(cLock){
  if(opLock==0){
    opLock=2;
    se11.play();
    Dialogue("NEW GAME？","この盤面を放棄して新しいゲームを始めます",2,-1);
  }
}}
function giveupButton(event=-1){
  if(cLock){
  if(opLock==0){
    opLock=2;
    se11.play();
    if(playMode[0]==4){
      Dialogue("QUIT GAME？","採取を途中で終了します",0,-1);      
    }else{
    Dialogue("QUIT GAME？","この盤面を途中で終了します",1,-1);
    }
  }
}}
function DeckReset(p=0,point=0,X=0){
  //console.log('deckreset',decks[0],p,point)
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
      return true;
      }
      cLock=true;
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
      //console.log(p);
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
function DeckReset_H(p=0,point=0,X=0){
  //ヘニル
  if(Extras[0]<0){return false};
  if(p!==0 && X==0){
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
      newCard.x=275;
      newCard.y=280-i*0.5;
      deckmap.addChild(newCard);
      Decklists.push(newCard); 
    }
    drawbuttom(240,330,decks.length,1,50,40);
    DeckReset_H(-1,1,1);
    cLock=true;
    break;
  default:
    if(!decks.length){
      cLock=true;
      return false;
    }
    mLock=false;
    var TT=decks.shift();
    deckfaces.push(TT);
    var A=Math.floor((TT-1)/10);
    if(A==0 || A==2){
      Extras[1]=1;
      Exlists[0].text="系統：ドリル"
    }else{
      Extras[1]=0;
      Exlists[0].text="系統：カッター"
    }
    var T=Decklists.pop();
    if(TT==-100){
    var S = new createjs.Bitmap('Card_images/Card_Monster.png');
    Extras[0]=-1;
    }else{
    var S=new createjs.Bitmap(Card_src[TT]);
    }
    S.x=275;
    S.y=280;
    S.alpha=0;
    deckmap.addChild(S);
    DeckFacelists.push(S); 
    createjs.Tween.get(T)
    .to({x:295,y:260,scaleX:0.05,scaleY:1.2},70)
    .to({alpha:0},10);
    createjs.Tween.get(S)
    .to({scaleX:0.05},70)
    .to({scaleX:1,alpha:1},70)
    .to({x:370},100)
    .call(step);
    function step(){
      if(Extras[0]>=0){
      if(deckfaces.length==1){
        if(userPet.length){
        pickMsg(userPet[0]+"と一緒に&採取スタート！")
        }else{
        pickMsg("採取スタート！&　")
        }
      }else{
        var R=Math.floor(Math.random()*3);
        if(userPet.length){
          switch(userPet[0]){
            case "火山の炎鷹":
            case "ガルファイハーピィ":
            case "アルポコピュリタ":
              pickMsg(userPet[0]+"は周囲を警戒している…&　")
            break;
            case "グリッターランサー":
            case "グリッターアーチャー":
              pickMsg(userPet[0]+"は&辺りを駆け回ってる！")
              break;
            case "ストーンゴーレム":
                pickMsg(userPet[0]+"は&がちゃがちゃ言っている…")
              break;
            case "コマンドオーガニックコア":
              pickMsg(userPet[0]+"は&ふわふわ浮いてる…")
            break;
            case "ヘルナオーブ":
              pickMsg(userPet[0]+"はくるくる回ってる…&　")
            break;
            case "ラグズ":
            case "イース":
              pickMsg(userPet[0]+"は歌を歌っている…&　")
            break;
            case "シャドウドリラー":
            case "シャドウガード":
              pickMsg(userPet[0]+"は日陰で涼んでる…&　")
            break;
            case "グリピグ":
              pickMsg(userPet[0]+"は走り回っている！&　")
            break;
            case "ポール":
              if(R==0){
                pickMsg(userPet[0]+"は辺りを駆け回ってる！&　")
              }else if(R==1){
                pickMsg(userPet[0]+"は寝そべってる！&　")
              }else{
              userPet[1]-=7+Math.floor(Math.random()*5);
              Exlists[3].push(24);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"がウィリアムりんごをくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"がウィリアムりんごをくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "ソソ":
              if(R==0){
                pickMsg(userPet[0]+"は辺りを駆け回ってる！&　")
              }else if(R==1){
                pickMsg(userPet[0]+"は毛づくろいをしてる！&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(20);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"が銀秤草を見つけてくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"が銀秤草を見つけてくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "プリンチュ":
              if(R==0){
                pickMsg(userPet[0]+"は跳ねている！&　")
              }else if(R==1){
                pickMsg(userPet[0]+"は地面に潜ってしまった。&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(36);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"が天桃ライチをくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"が天桃ライチをくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "パピリオ":
              if(R==0){
                pickMsg(userPet[0]+"は飛びまわってる！&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(51);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"がパピリオ密をくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"がパピリオ密をくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "マーマン":
              if(R==0){
                pickMsg(userPet[0]+"は魚で遊んでる！&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(42);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"がリザードバスをくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"がリザードバスをくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "アルロン":
              if(R==0){
                pickMsg(userPet[0]+"は丸くなった！&　")
              }else if(R==1){
                pickMsg(userPet[0]+"は寝そべってる！&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(49);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"がベタベタするエキスをくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"がベタベタするエキスをくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "ファイアコモド":
              if(R==0){
                pickMsg(userPet[0]+"はのそのそしてる！&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(150);
              se10.play();
              if(userPet[1]>0){
                pickMsg("ファイアコモドのしっぽが切れた！&コモドのしっぽを拾ったよ！")
              }else{
                pickMsg("コモドのしっぽを拾ったよ！&コモドはどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            case "マナイーター":
              if(R==0){
                pickMsg(userPet[0]+"は走り回ってる！&　")
              }else if(R==1){
                pickMsg(userPet[0]+"がこっちを見てる…&　")
              }else{
              userPet[1]-=10+Math.floor(Math.random()*5);
              Exlists[3].push(149);
              se10.play();
              if(userPet[1]>0){
                pickMsg(userPet[0]+"が凝縮したマナをくれたよ！&　")
              }else{
                pickMsg(userPet[0]+"が凝縮したマナをくれたよ！&"+userPet[0]+"はどこかへ行っちゃった…");
                userPet=[];
              }}
            break;
            default:
              //('no pet')
              switch(R){
                case 0:
                  pickMsg("他の所で採取してみよー！&　");
                  break;
                case 1:
                  pickMsg("次に行こー！&　");
                  break;
                case 2:
                  pickMsg("面白いもの落ちてないかな？&　");
                  break;
                }
              break;
          }
        }else{
        if(Extras[0]>0){
        switch(R){
        case 0:
          pickMsg("他の所で採取してみよー！&　");
          break;
        case 1:
          pickMsg("次に行こー！&　");
          break;
        case 2:
          pickMsg("面白いもの落ちてないかな？&　");
          break;
        }}
        }
        if(Extras[0]>0){Extras[0]=0};
      };
      }else if(Extras[0]<0){
        se8.play();
        pickMsg("モンスターだ！&　");
        Battle();
        createjs.Tween.get(S)
        .wait(200)
        .to({x:340,y:170,scale:2},120)
      }
      point+=1;
      decksNow+=1;
      decksNow2+=1;
      se2.play();
      Exlists[1].text="連鎖：0";
      if(point>=p || !decks.length){
        //end
        drawbuttom(240,330,decks.length,1,50,40);
        mLock=true;
        cLock=true;
    if(!decks.length){
    var N=0;
    var TT=deckfaces[deckfaces.length-1]
    for(var i=0;i<6;i++){
      if(hands[i].length){
        var A=hands[i][hands[i].length-1]%10;
        var B=TT%10;
        if(A==0){A+=10};
        if(B==0){B+=10};
        var E=Math.abs(B-A);
        if(E==1 || E==9){
          N+=1;
        }
      }
    }
    if(N==0){
      Gameover();
    }}
        return true;
      }else{
        cLock=true;
        DeckReset_H(p,point,1);
      }
    }
    break;
  }
  };
function pickMsg(word,t=0){
  //console.log(word);
  if(t==0){
  for( var lines=word.split( "&" ), i=0, l=lines.length; l>i; i++ ){
    Exlists[4][i].text=lines[i];
  };
  return true;
  }
  MessageText[2][1].alpha=0;
  cLock=false;
  for(var lines=word.split( "&" ), i=0, l=lines.length; 3>i; i++){
    Exlists[4][i].text="";
  };
  var texti=0;
  var line=lines[0]
  var Tx=Exlists[4][0];
  window.requestAnimationFrame((ts)=>MsgSplit(ts,1));
  function MsgSplit(ts,tflame=1,A=0,delay=0){
    //1文字ずつ描画 A->文字送りの速さ
    A+=1;
    if(A>delay){
    delay=0;
    if(line == ''){
    texti+=1;
    if(texti >= lines.length){
    MessageText[2][1].alpha=1;
      cLock=true;
      return false;
    }
    line=lines[texti]
    Tx=Exlists[4][texti];
    delay=18;
    }
    if(line.slice(0,1)=="/"){
    line = line.slice(1);
    delay=15;
    }
    if(A>tflame){
      var c = line.slice(0,1);
      line = line.slice(1);
      Tx.text+=c;
      A=0;
    }}
      window.requestAnimationFrame((ts)=>MsgSplit(ts,tflame,A,delay));
  }
  }
function Battle(Ev=-1){
  //バトル各種ボタン初期化
  //ev ボスモンスターのid
  if(gamestate==0){
  //モンスターとステータスコピー
  gamestate=2;
  Bturn=1;
  battleLog=[];
  MessageText[1]=[];
  MessageText[2]=[];
  var M;
  if(Ev>=0){
  M=Ev;
  }else{
  var R=Math.floor(Math.random()*henirarea[playMode[1]].Monster.length);
  M=Enemylist.findIndex(value=>value.name==henirarea[playMode[1]].Monster[R]);
  }
  //console.log(M);
  StatusP=UserStatus.concat();
  StatusE_df=Enemylist[M].St.concat();
  StatusE=Enemylist[M].St.concat();
  OPname=Enemylist[M].name;
  EscapeRate=[0,50];
  Pbuff=[];
  Ebuff=[];
  HPtrigger_li=[0,0,0,0,0];
  var obj = new createjs.Shape();
  obj.graphics.beginFill("rgba(20,20,20,0.7)");
  obj.graphics.moveTo(220, 230);
  obj.graphics.lineTo(250, 220);
  obj.graphics.lineTo(350, 218);
  obj.graphics.lineTo(370, 220);
  obj.graphics.lineTo(368, 250);
  obj.graphics.lineTo(350, 275);
  obj.graphics.lineTo(260, 285);
  obj.graphics.lineTo(220, 270);
  obj.graphics.lineTo(220, 260);
  obj.graphics.lineTo(200, 270);
  obj.graphics.lineTo(220, 240);
  obj.graphics.lineTo(220, 230);
  obj.x-=5;
  battlefield.addChild(obj);
  var hp = new createjs.Shape();
  hp.graphics.beginFill("black");
  hp.graphics.moveTo(226, 234);
  hp.graphics.lineTo(229, 245);
  hp.graphics.lineTo(352, 234);
  hp.graphics.lineTo(358, 222);
  battlefield.addChild(hp);
  var hp = new createjs.Shape();
  hp.graphics.beginFill("rgba(242,40,10)");
  hp.graphics.moveTo(226, 234);
  hp.graphics.lineTo(229, 245);
  hp.graphics.lineTo(352, 234);
  hp.graphics.lineTo(358, 222);
  battlefield.addChild(hp);
  MessageText[1][0]=hp;
  var t = new createjs.Text("HP "+StatusP[0]+"/"+UserStatus[0], "20px serif", "white");
  t.x=230;
  t.y=250;
  battlefield.addChild(t);
  MessageText[1][1]=t;
  stage.addChild(battlefield);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("rgba(200,200,200,0.5)");
  shape.graphics.drawRect(0, 0, 700, 600);
  shape.alpha=0;
  battlefield.addChild(shape);
  createjs.Tween.get(shape).to({alpha:1},150);
  createjs.Tween.get(shape).to({alpha:0.2},150);
  shape.addEventListener("click", {card:-1,handleEvent:Battle});
  var shape = new createjs.Shape();
  shape.graphics.beginFill("rgba(10,10,10,0.8)");
  shape.graphics.drawRect(700, 50, 100, 550);
  battlefield.addChild(shape);
  shape.addEventListener("click", {card:-1,handleEvent:Battle});
  battlefield.x=800;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#fc4e42");
  shape.graphics.beginStroke("#e3e3e3");
  shape.graphics.setStrokeStyle(3);
  shape.graphics.drawRect(30, 50, 214, 110);
  battlefield.addChild(shape);
  shape.addEventListener("click", {card:1,handleEvent:Battle});
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#60a2f7");
  shape.graphics.beginStroke("#e3e3e3");
  shape.graphics.setStrokeStyle(3);
  shape.graphics.drawRect(244, 50, 214, 110);
  battlefield.addChild(shape);
  shape.addEventListener("click", {card:2,handleEvent:Battle});
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#3cb564");
  shape.graphics.beginStroke("#e3e3e3");
  shape.graphics.setStrokeStyle(3);
  shape.graphics.drawRect(458, 50, 214, 110);
  battlefield.addChild(shape);
  shape.addEventListener("click", {card:3,handleEvent:Battle});
  var t = new createjs.Text("たたかう", "36px serif", "white");
  t.x=40;
  t.y=60;
  battlefield.addChild(t);
  var t = new createjs.Text("ATTACK", "32px serif", "white");
  t.x=40;
  t.y=110;
  battlefield.addChild(t);
  var t = new createjs.Text("アイテム", "36px serif", "white");
  t.x=254;
  t.y=60;
  battlefield.addChild(t);
  var t = new createjs.Text("ITEM", "32px serif", "white");
  t.x=254;
  t.y=110;
  battlefield.addChild(t);
  var t = new createjs.Text("にげる", "36px serif", "white");
  t.x=468;
  t.y=60;
  battlefield.addChild(t);
  var t = new createjs.Text("ESCAPE", "32px serif", "white");
  t.x=468;
  t.y=110;
  battlefield.addChild(t);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("rgba(10,10,10,0.8)");
  shape.graphics.drawRect(0, 0, 700, 162);
  shape.x=-30;
  battlefield.addChild(shape);
  MessageText[2][0]=shape;
  createjs.Tween.get(shape)
  .to({x:0,y:-130},150);
  createjs.Tween.get(battlefield)
  .to({x:0},150);
  var t=new createjs.Text("▼","bold 18px 'メイリオ'","white");
  t.x=620;
  t.y=555;
  t.alpha=0;
  battlefield.addChild(t);
  MessageText[2][1]=t;
  createjs.Tween.get(t, {loop: true})
  .to({y:550},30)
  .wait(270)
  .to({y:555},30)
  .wait(270);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#1e7861");
  shape.graphics.beginStroke("#e3e3e3");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(0, 0, 140, 40);
  battlefield.addChild(shape);
  var t = new createjs.Text("TURN "+Bturn, "26px serif", "white");
  t.x=5;
  t.y=5;
  battlefield.addChild(t);
  MessageText[1][2]=t;
  pickMsg("モンスターだ！&"+OPname+"が出現！");
  // アイテム欄を更新する
  stage.addChild(Ct);
  battleItem();
  if(henirarea[8].cleared==2){
  var A=Bufflist.findIndex(value=>value.name=="ジョイフルライト");
  Pbuff.push(A);
  }
};
  if(gamestate==2 || gamestate==3){
    switch(this.card){
      case -1:
        //メッセージ
        if(cLock){
        //console.log("battle!")
        if(battleLog.length){
          battleLogNext();
        }
      };
        break;
      case 1:
        //たたかう
        Ct.alpha=0;
        Ct.y=-100;
        if(gamestate==3 && cLock){
          if(battleLog.length){
            battleLogNext();
          }
        };
        if(gamestate==2){
      gamestate=3;
      createjs.Tween.get(MessageText[2][0])
      .to({y:0},50);
      var A=Bufflist.findIndex(value=>value.name=="凍結");
      if(Pbuff.indexOf(A)!==-1){
        battleLog.push("凍ってしまって&動けないよ！");  
      }else{
        var Ary=["これでもくらえ！","ババババーン！","ドカーン！","爆発しろー！"]
        var R=Math.floor(Math.random()*Ary.length);
        var B=Bufflist.findIndex(value=>value.name=="ボルケーノトルテ")
        if(Pbuff.indexOf(B)!==-1){
          var RR=Math.floor(Math.random()*3);
          if(R==RR){R=3};
          var RR=Math.floor(Math.random()*3);
          if(R==RR){R=3};
        };
        battleLog.push("attack");
        battleLog.push("リティア様の攻撃！&"+Ary[R]);
        var D=Damage(0,R);
        if(D==-1){
        battleLog.push("kaihi");
        battleLog.push("空振りー！&　");
        }else{
        StatusE[0]-=D;
        battleLog.push("damage");
        battleLog.push(OPname+"に&"+D+"のダメージ！");
        var B=Bufflist.findIndex(value=>value.name=="満身創痍")
        if(Ebuff.indexOf(B)!==-1){    
        battleLog.push(OPname+"は膝をついた！");
        battleLog.push("end of battle");
        battleLogNext();
        return false;
        }    
        var B=Bufflist.findIndex(value=>value.name=="呪い")
        if(Pbuff.indexOf(B)!==-1){
        battleLog.push("shake");
        var E=Math.floor(D/2)
        StatusP[0]-=E;
        battleLog.push("いたい！&"+E+"の反射ダメージ！&　"); 
        if(StatusP[0]<=0){
          battleLog.push("やられちゃった…。&　");
          battleLog.push("gameover"); 
          return false;           
        }};
        }
      };
        if(StatusE[0]<0){
        Defeat()
        }else{
        Enemyturn();
        }
        battleLogNext();
        }
        break;
      case 2:
        if(gamestate==3 && cLock){
          if(battleLog.length){
            battleLogNext();
          }
        };
        //戦闘で使用できるアイテムを表示する
        if(gamestate==2){
        if(equipeditem==-2){
          equipeditem=-1;
        createjs.Tween.get(Ct)
        .to({y:0,alpha:1},50);
        }else{
          equipeditem=-2;
        createjs.Tween.get(Ct)
        .to({y:-100,alpha:0},50);
        }
        //アイテム使用は他部のボタンで
        };
        break;
      case 3:
        if(gamestate==3 && cLock){
          if(battleLog.length){
            battleLogNext();
          }
        };
        if(gamestate==2){
        if(Extras[0]==-2){
          pickMsg("この戦いからは逃げられないよ！&　");
          return false;  
          }
        gamestate=3;
        createjs.Tween.get(MessageText[2][0])
        .to({y:0},50);
        Ct.alpha=0;
        se24.play();
        var E=UserLibrary.filter(value=>value>0);
        EscapeRate[1]=15*EscapeRate[0]+50*(StatusP[0]/StatusE[0])+(E.length/2);
        var R=100*Math.random();
        if(R>EscapeRate[1]){
        EscapeRate[0]+=1;
        battleLog.push("あーもう！&にげられないよ！");
        Enemyturn();
        battleLogNext();
        }else{
        if(UserStatus[4]==84){
        var M=Enemylist.findIndex(value=>value.name==OPname);
        if(UserItem[156]>0){
        var R=Enemylist[M].Dropitem[0]
        Exlists[3]=Exlists[3].concat([R,R]);
        pickMsg(itemA[itemID(Enemylist[M].Dropitem[0])].name+"を2つ奪って&逃げたよ！");  
        }else{
        Exlists[3]=Exlists[3].concat(Enemylist[M].Dropitem[0]);
        pickMsg(itemA[itemID(Enemylist[M].Dropitem[0])].name+"を奪って&逃げたよ！");  
          }        
        }else{
        pickMsg("にげたよー！&　");
        }
        stage.removeChild(battlefield);
        stage.removeChild(Ct);
        battlefield.removeAllChildren();
        Ct.removeAllChildren();
        deckmap.removeChild(DeckFacelists[DeckFacelists.length-1]); 
        deckfaces.pop();
        gamestate=0;
        Extras[0]=0;
        }
        }
        break;
    };
  }
  function battleLogNext(){
    var B=battleLog.shift();
    switch(B){
      case "attack":
        se21.play();
        battleLogNext();
        break;
      case "defeat":
        se5.play();
        var T=DeckFacelists[DeckFacelists.length-1]; 
        createjs.Tween.get(T)
        .to({alpha:0},100)
        Sprite1.scale=2;
        if(Extras[0]==-2){Sprite1.x=450}else{Sprite1.x=470};
        Sprite1.y=300;
        Sprite1.gotoAndPlay('walk');
        //.to({x:340,y:170,scale:2},120)
        battleLogNext();
        break;
      case "result":
        se12.play();
        battleLogNext();
        break;
      case "se_14":
        se14.play();
        battleLogNext();
        break;
      case "kaihi":
        se30.play();
        battleLogNext();
        break;
      case "crush3":
        se31.play();
        battleLogNext();
        break;
      case "HPrecSE":
        se26.play();
        battleLogNext();
        break;
      case "tukkomi":
        se32.play();
        battleLogNext();
        break;
      case "turnend":
        var M=Enemylist.findIndex(value=>value.name==OPname);
        if(Enemylist[M].HPtrigger.length){
          for (var i=0;i<Enemylist[M].HPtrigger.length;i++){
            if(StatusE[0]<Enemylist[M].HPtrigger[i] && HPtrigger_li[i]==0){
              HPtrigger_li[i]=1;
              //console.log('hptrigger',i);
              break;
            }
          };
          for(var i=0;i<HPtrigger_li.length;i++){
            if(HPtrigger_li[i]==1){
              //トリガー行動
              switch(OPname){
                case "トロッシュ":
                  se8.play();
                  battleLog.push(OPname+"はソーンズオーラをまとった！"); 
                  var A=Bufflist.findIndex(value=>value.name=="呪い")
                  var Ary=[A,A,A,A];
                  Pbuff=Pbuff.concat(Ary);
                  break;
                case "ドラバキ":
                  se8.play();
                  var A=Bufflist.findIndex(value=>value.name=="凍結")
                  if(Ebuff.indexOf(A)!==-1){
                  Ebuff=Ebuff.filter(value=>value!==A);
                  battleLog.push(OPname+"の氷が解けた！"); 
                  }
                  battleLog.push(OPname+"はレイジモードに移行した！"); 
                  var A=Bufflist.findIndex(value=>value.name=="レイジモード")
                  var Ary=[A,A,A,A,A,A];
                  Ebuff=Ebuff.concat(Ary);
                  break;
                case "オベザール":
                  if(i==3 && henirarea[8].cleared<=1){
                    var A=Bufflist.findIndex(value=>value.name=="満身創痍")
                    var Ary=[A,A];
                    Ebuff=Ebuff.concat(Ary);
                  //イベントバトル終了へ
                  }else{
                  se8.play();
                  var A=Bufflist.findIndex(value=>value.name=="凍結")
                  if(Ebuff.indexOf(A)!==-1){
                  Ebuff=Ebuff.filter(value=>value!==A);
                  battleLog.push(OPname+"の氷が解けた！"); 
                  }
                  battleLog.push(OPname+"は雷分身を生み出した！&危険な攻撃の予感がする！"); 
                  var A=Bufflist.findIndex(value=>value.name=="雷分身")
                  var Ary=[A,A];
                  Ebuff=Ebuff.concat(Ary);
                  }
                  break;
                default:
                  break;
              }
              HPtrigger_li[i]=2;
              break;
            }
          }
        }
        //状態異常を反映
        var D=Bufflist.findIndex(value=>value.name=="光の水晶玉");
        var A=Pbuff.indexOf(D);
        if(A!==-1){
          var H=Math.floor(UserStatus[0]/15)
        StatusP[0]+=H;
        battleLog.push("光の水晶玉で　HPが少し回復"); 
        }
        var D=Bufflist.findIndex(value=>value.name=="やけど");
        var A=Pbuff.indexOf(D);
        if(A!==-1){
          var H=Math.floor(UserStatus[0]/16)
        battleLog.push("shake");
        StatusP[0]-=H;
        battleLog.push("火傷ダメージ！"); 
        if(StatusP[0]<=0){
          battleLog.push("やられちゃった…。&　");
          battleLog.push("gameover"); 
          return false;           
        }
        var B=Pbuff.filter(value=>value==D);
        if(B.length==1){
          battleLog.push("火傷はもう治ったよ。"); 
        }
      };
        var A=Ebuff.indexOf(D);
        if(A!==-1){
          var H=Math.floor(StatusE_df[0]/16)
        battleLog.push("shake");
        StatusE[0]-=H;
        battleLog.push(OPname+"は&火傷で"+H+"のダメージを受けている！"); 
        if(StatusE[0]<=0){
          Defeat()
          return false;
        }
        var B=Ebuff.filter(value=>value==D);
        if(B.length==1){
          battleLog.push(OPname+"の火傷は&もう治ったみたい。"); 
        }
      };
        var D=Bufflist.findIndex(value=>value.name=="中毒");
        var A=Pbuff.indexOf(D);
        if(A!==-1){
          var H=Math.floor(UserStatus[0]/16)
        battleLog.push("shake");
        StatusP[0]-=H;
        battleLog.push("中毒ダメージ！"); 
        if(StatusP[0]<=0){
          battleLog.push("やられちゃった…。&　");
          battleLog.push("gameover"); 
          return false;           
        }
        var B=Pbuff.filter(value=>value==D);
        if(B.length==1){
          battleLog.push("毒はもう気にならなくなったよ。"); 
        }
      };
        var A=Ebuff.indexOf(D);
        if(A!==-1){
          var H=Math.floor(StatusE_df[0]/16)
        battleLog.push("shake");
        StatusE[0]-=H;
        battleLog.push(OPname+"は&中毒で"+H+"のダメージを受けている！"); 
        var B=Ebuff.filter(value=>value==D);
        if(B.length==1){
          battleLog.push(OPname+"の毒は&回復したようだ。"); 
        }
        if(StatusE[0]<=0){
          Defeat();
          return false;
        }};
        //バフを反映
        var A=Bufflist.findIndex(value=>value.name=="ジョイフルライト");
        if(Pbuff.indexOf(A)>=0){Pbuff.push(A)};
        var A=Bufflist.findIndex(value=>value.name=="満身創痍");
        if(Ebuff.indexOf(A)>=0){Ebuff.push(A)};
        var A=Bufflist.findIndex(value=>value.name=="凍結");
        var B=Pbuff.filter(value=>value==A);
        if(B.length==1){
          battleLog.push("やっと氷が解けた！　動けるよー！"); 
        }
        var B=Ebuff.filter(value=>value==A);
        if(B.length==1){
          battleLog.push(OPname+"の氷が解けた！"); 
        }
        for (var i=0;i<Bufflist.length;i++){
          var A=Ebuff.indexOf(i)
          var B=Pbuff.indexOf(i)
          if(A!==-1){Ebuff.splice(A,1);}
          if(B!==-1){Pbuff.splice(B,1);}
        };
        battleLog.push("endphase");
        battleLogNext();
        break;
      case "endphase":
        battleItem();
        MessageText[2][1].alpha=0;
        Bturn+=1;
        createjs.Tween.get(MessageText[2][0])
        .to({y:-130},50)
        .call(state2);
        pickMsg("どうする？&　");
        MessageText[1][2].text="TURN "+Bturn;
        function state2(){gamestate=2};
        break;
      case "damage":
        se22.play();
        var T=DeckFacelists[DeckFacelists.length-1]; 
        createjs.Tween.get(T)
        .to({alpha:0},100)
        .to({alpha:1},100)
        .to({alpha:0},100)
        .to({alpha:1},100)
        battleLogNext();
        break;
      case "shake":
        se23.play();
        createjs.Tween.get(field)
        .to({x:-5,y:-15},12)
        .to({x:5,y:12},12)
        .to({x:-1.5,y:-4.2},6)
        .to({x:1.2,y:3.1},6)
        .to({x:0,y:0},6);
        Hpdraw(-1);
        battleLogNext();
        break;
      case "escapeSE":
        se24.play();
        battleLogNext();
        break;
      case "end of battle":
        if(Extras[0]==-1){
        equipeditem=-1;
        pickMsg("採取にもどろ！&　");
        stage.removeChild(battlefield);
        battlefield.removeAllChildren();
        stage.removeChild(Ct);
        Ct.removeAllChildren();
        deckmap.removeChild(DeckFacelists[DeckFacelists.length-1]); 
        deckfaces.pop();
        gamestate=0;
        Extras[0]=0;
        }else if(Extras[0]==-2){
        //イベントへ
        equipeditem=-1;
        stage.removeChild(battlefield);
        battlefield.removeAllChildren();
        stage.removeChild(Ct);
        Ct.removeAllChildren();
        deckmap.removeChild(DeckFacelists[DeckFacelists.length-1]); 
        deckfaces.pop();
        gamestate=5;
        Extras[0]=0;
        MsgNext(-1);
        }
        break;
      case "gameover":
        equipeditem=-1;
        stage.removeChild(battlefield);
        battlefield.removeAllChildren();
        stage.removeChild(Ct);
        Ct.removeAllChildren();
        deckmap.removeChild(DeckFacelists[DeckFacelists.length-1]); 
        deckfaces.pop();
        gamestate=0;
        Extras[0]=0;
        Extras[3]=[];
        Gameover(1);
        break;
      case "HPrec":
        se26.play();
        var Rp=battleLog.shift();
        Hpdraw(Rp);
        battleLogNext();
        break;
      default:
        pickMsg(B,1);
        //MessageText[2][1].alpha=1;
        break;
    }};
    function Enemyturn(){
      //petattack
      var Mon=-1;
      if(userPet.length){
        switch(userPet[0]){
          case "グリピグ":
          case "グリッターランサー":
          Mon=15;
          break;
          case "グリッターアーチャー":
          if(Bturn%2==1){Mon=42}else{Mon=43};
          break;
          case "シャドウガード":
          if(Bturn%4==1){Mon=44};
          break;
          case "火山の炎鷹":
          if(Bturn%3==1){Mon=16}else{Mon=17};
          break;
          case "アルポコピュリタ":
          Mon=19;
          break;
          case "コマンドオーガニックコア":
          if(Bturn%2==1){Mon=35}else{Mon=0};
          break;
          case "ラグズ":
          if(Bturn%3==1){Mon=32}else{Mon=0};
          break;
          case "イース":
          if(Bturn%3==1){Mon=33}else{Mon=0};
          break;
          case "ガルファイハーピィ":
          if(Bturn%3==1){Mon=38}else{Mon=0};
          break;
        };
      if(Mon==44){
        battleLog.push(userPet[0]+"の&"+Skilllist[Mon].name+"！");
        var A=Bufflist.findIndex(value=>value.name=="ワンダーウォール")
        var Ary=[A,A,A,A];
          Pbuff=Pbuff.concat(Ary);
          battleLog.push("防御力がアップした！&　");
          userPet[1]-=15;
          }else{
        if(Mon>=0){
          var M=Enemylist.findIndex(value=>value.name==userPet[0])
          var atk=Enemylist[M].St[1];
          var D=Damage(0,Mon,atk);
          battleLog.push("attack");
          if(Mon==0){
            battleLog.push(userPet[0]+"の攻撃だ！&　");            
            }else{
            battleLog.push(userPet[0]+"の攻撃！&"+Skilllist[Mon].name+"！");
          }
          if(D==-1){
          userPet[1]-=15;
          battleLog.push("kaihi");
          battleLog.push("攻撃は外れちゃった！&　");
          }else{
          StatusE[0]-=D;
          userPet[1]-=Math.floor(D/2);
          battleLog.push("damage");
          battleLog.push(OPname+"に&"+D+"のダメージ！");
          switch(Mon){
            case 16:
              var A=Bufflist.findIndex(value=>value.name=="やけど")
            var rate=0.7;
            var Ary=[A,A,A];
            if(rate>Math.random()){
              Ebuff=Ebuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push(OPname+"は&やけどを負った！");
            }
              break;
            case 19:
              var A=Bufflist.findIndex(value=>value.name=="スタン")
              var Ary=[A];
                Ebuff=Ebuff.concat(Ary);
              break;
            case 32:
            var A=Bufflist.findIndex(value=>value.name=="凍結")
            var rate=0.6;
            var Ary=[A,A,A];
            if(rate>Math.random()){
              Ebuff=Ebuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push(OPname+"は&凍結した！");
            }
              break;
            case 33:
              var A=Bufflist.findIndex(value=>value.name=="呪い")
            var rate=0.6;
            var Ary=[A,A,A];
            if(rate>Math.random()){
              Ebuff=Ebuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push(OPname+"は&呪われた！");
            }
              break;
            case 35:
              var A=Bufflist.findIndex(value=>value.name=="闇の水晶玉")
            var rate=0.7;
            var Ary=[A,A,A];
            if(rate>Math.random()){
              Ebuff=Ebuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push(OPname+"は&老化して攻撃力ダウン！");
            }
              break;
            case 38:
              var A=Bufflist.findIndex(value=>value.name=="盲目")
            var rate=0.7;
            var Ary=[A,A,A,A];
            if(rate>Math.random()){
              Ebuff=Ebuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push(OPname+"の&命中率が下がった！");
            }
              break;
          }
          }
        }
      }
        if(userPet[1]<=0){
        battleLog.push(userPet[0]+"はどこかへ逃げてしまった…"); 
        userPet=[];
        }
      };
      //ここから敵のターン
      //氷結
      var A=Bufflist.findIndex(value=>value.name=="凍結");
      if(Ebuff.indexOf(A)!==-1){
        battleLog.push(OPname+"は&凍ってしまって動けない！");  
        battleLog.push("turnend"); 
        return false;
      }
      var A=Bufflist.findIndex(value=>value.name=="スタン");
      if(Ebuff.indexOf(A)!==-1){
        battleLog.push(OPname+"は&ひるんで動けない！");  
        battleLog.push("turnend"); 
        return false;
      }
      var A=Bufflist.findIndex(value=>value.name=="反動");
      if(Ebuff.indexOf(A)!==-1){
        battleLog.push(OPname+"は&攻撃の反動で動けない！");  
        battleLog.push("turnend"); 
        return false;
      }
      if(OPname=="マナイーター"){
        var R=Bturn/5+Math.random();
        if(R>1.3){
          battleLog.push("escapeSE")
          battleLog.push(OPname+"は逃げ出した！&　");       
          battleLog.push("end of battle");    
          return false;
        }
      }
      //enemylist
      var M=Enemylist.findIndex(value=>value.name==OPname);
      var Cd=Math.floor(Math.random()*Enemylist[M].route.length);
      var Command=Enemylist[M].route[Cd];
      //特殊裁定
      if(OPname=="オベザール"){
        Command=Enemylist[M].route[(Bturn+2)%3];
      }
      var EE=Bufflist.findIndex(value=>value.name=="雷分身")
      var E=Ebuff.indexOf(EE)
      if(E!==-1){
        Command=30;
        var EE=Bufflist.findIndex(value=>value.name=="反動")
        Ebuff.push(EE,EE)
      };
      if(Command==0){
      battleLog.push(OPname+"の攻撃だ！&　");
      }else{
        if(Command==36){
          var EE=Bufflist.findIndex(value=>value.name=="レイジモード")
          if(Ebuff.indexOf(EE)!==-1){Command=32};
        }
      battleLog.push(OPname+Skilllist[Command].detail+"&　");
      }
      switch(Command){
        case 14:
          case 18:
            case 21:
              case 31:
                case 36:
                  case 37:
                    case 39:
                //無行動
                battleLog.push("turnend"); 
        return false;
         case 44:
          var A=Bufflist.findIndex(value=>value.name=="ワンダーウォール")
          var Ary=[A,A,A,A];
            Ebuff=Ebuff.concat(Ary);
            battleLog.push(OPname+"の防御力が上がった！"); 
            battleLog.push("turnend"); 
        return false;
            }
      var D=Damage(1,Command);
      if(D==-1){
        //スリング
        battleLog.push("kaihi");
        var B=Bufflist.findIndex(value=>value.name=="スリング")
          if(Pbuff.indexOf(B)!==-1){
          battleLog.push("スリングで回避したよ！&　");
          }else{
          battleLog.push("よけたよー！&　");
          }
        }else{
      //ガード持ち
      if(userPet.length){
        switch(userPet[0]){
          case "シャドウガード":
            if(Bturn%4!==1){
            battleLog.push("shake");
            battleLog.push(userPet[0]+"が攻撃をかばって&"+D+"のダメージを受けた！"); 
            userPet[1]-=D;
            if(userPet[1]<=0){
            battleLog.push(userPet[0]+"はどこかへ逃げてしまった…"); 
            userPet=[];
            }
            battleLog.push("turnend");
            return false;
          }
          break;
          case "ヘルナオーブ":
            case "シャドウドリラー":
              case "ストーンゴーレム":
          battleLog.push("shake");
          battleLog.push(userPet[0]+"が攻撃をかばって&"+D+"のダメージを受けた！"); 
          userPet[1]-=D;
          if(userPet[1]<=0){
          battleLog.push(userPet[0]+"はどこかへ逃げてしまった…"); 
          userPet=[];
          }
          battleLog.push("turnend");
          return false;
        }};
      battleLog.push("shake");
      StatusP[0]-=D;
      if(StatusP[0]<=0){
        battleLog.push("むちゃくちゃいたい！&"+D+"のダメージ！"); 
        var D=Bufflist.findIndex(value=>value.name=="ガッツポトフ");
        var A=Pbuff.indexOf(D);
        if(A!==-1){
          StatusP[0]=1;
          battleLog.push("気合でなんとか耐えたよ！"); 
          Pbuff=Pbuff.filter(value=>value!==A);
          battleLog.push("turnend");
          return false;
        }
        var D=Bufflist.findIndex(value=>value.name=="ジョイフルライト");
        var A=Pbuff.indexOf(D);
        if(A!==-1){
          StatusP[0]=1;
          battleLog.push("こんなところで　終われない！&　"); 
          battleLog.push("turnend");
          return false;
        }
        battleLog.push("やられちゃった…。&　");
        battleLog.push("gameover");            
      }else{
      if(StatusP[0]<UserStatus[0]/10){
        battleLog.push("むちゃくちゃいたい！&"+D+"のダメージ！");             
        }else{
        battleLog.push("いたっ！&"+D+"のダメージ！"); 
        }
      }
      //反射
      var A=Bufflist.findIndex(value=>value.name=="呪い")
      if(Ebuff.indexOf(A)!==-1){
        var E=Math.floor(D/2)
        StatusE[0]-=E;
        battleLog.push("damage");
        battleLog.push(OPname+"に&"+E+"の反射ダメージ！");
        if(StatusE[0]<0){
          Defeat();
          return false;
        }
      }
      //追加効果
      switch(Command){
        case 16:
          var A=Bufflist.findIndex(value=>value.name=="やけど")
          var rate=0.7;
          var Ary=[A,A,A];
          if(rate>Math.random()){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("あっつい！　やけどしちゃった！"); 
            }
          break;
        case 20:
          var A=Bufflist.findIndex(value=>value.name=="やけど")
          var rate=0.5;
          var Ary=[A,A,A];
          if(rate>Math.random()){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("あっつい！　やけどしちゃった！"); 
            }
          break;
        case 24:
          var A=Bufflist.findIndex(value=>value.name=="呪い")
          var Ary=[A,A,A,A];
            Pbuff=Pbuff.concat(Ary);
          break;
        case 26:
          var A=Bufflist.findIndex(value=>value.name=="凍結")
          var rate=0.3;
          var Ary=[A,A];
          if(rate>Math.random() && Pbuff.indexOf(A)==-1){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("凍っちゃった！"); 
            }
          break;
        case 32:
          var A=Bufflist.findIndex(value=>value.name=="凍結")
          var rate=0.5;
          var Ary=[A,A,A];
          if(rate>Math.random() && Pbuff.indexOf(A)==-1){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("凍っちゃった！"); 
            }
          break;
        case 33:
          var A=Bufflist.findIndex(value=>value.name=="呪い")
          var rate=0.8;
          var Ary=[A,A,A];
          if(rate>Math.random()){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("呪われちゃった！"); 
            }
          break;
        case 35:
          var A=Bufflist.findIndex(value=>value.name=="闇の水晶玉")
          var rate=0.8;
          var Ary=[A,A,A,A];
          if(rate>Math.random()){
            Pbuff=Pbuff.concat(Ary);
            battleLog.push("tukkomi");
            battleLog.push("老化で攻撃力が下がっちゃった！"); 
            }
          break;
          case 43:
            var A=Bufflist.findIndex(value=>value.name=="中毒")
            var rate=0.6;
            var Ary=[A,A,A];
            if(rate>Math.random()){
              Pbuff=Pbuff.concat(Ary);
              battleLog.push("tukkomi");
              battleLog.push("矢の毒を受けてしまった！"); 
              }
            break;
      }
      }
      battleLog.push("turnend"); 
      };
    function Defeat(){
      var M=Enemylist.findIndex(value=>value.name==OPname);
      battleLog.push("defeat")
      if(Extras[0]==-2){
      battleLog.push(OPname+"を倒したよ！！");
      }else{
      battleLog.push(OPname+"を倒したよ！&何か落ちてる…。");
      battleLog.push("result")
      if(UserItem[156]>0){
        var R=Enemylist[M].Dropitem[0]
        Exlists[3]=Exlists[3].concat([R,R]);
        battleLog.push(itemA[itemID(R)].name+"を2つゲットしたよ！");  
        }else{
        Exlists[3]=Exlists[3].concat(Enemylist[M].Dropitem[0]);
        battleLog.push(itemA[itemID(Enemylist[M].Dropitem[0])].name+"をゲットしたよ！&　");
        }
      }
      battleLog.push("end of battle"); 
    }
    function Hpdraw(h=-1){
      if(h==-1){h=StatusP[0]};
    var Hprate=h/UserStatus[0]
    if(Hprate<0){Hprate=0};
    if(Hprate>1){Hprate=1};
    var hp = new createjs.Shape();
    hp.graphics.beginFill("rgba(242,40,10)");
    hp.graphics.moveTo(226, 234);
    hp.graphics.lineTo(229, 245);
    hp.graphics.lineTo(229+(352-229)*Hprate, 245+(234-245)*Hprate);
    hp.graphics.lineTo(226+(358-226)*Hprate, 234+(222-234)*Hprate);
    battlefield.addChild(hp);
    battlefield.removeChild(MessageText[1][0]);
    MessageText[1][0]=hp;
    MessageText[1][1].text="HP "+h+"/"+UserStatus[0]
    }
    function battleItem(){
      Ct.removeAllChildren();
      var Materialmap = new createjs.Container();
      Ct.alpha=0;
      Ct.x=0;
      Ct.y=-100;
      equipeditem=-2;
      var Matbar = new createjs.Shape();
      Matbar.graphics.beginFill("black");
      Matbar.graphics.drawRect(244, 160, 262, 286);
      Matbar.alpha=0.5;
      Ct.addChild(Matbar);
      Ct.addChild(Materialmap);
      var shapeMask3 = new createjs.Shape();
              shapeMask3.graphics
                    .beginFill("gold")
                    .drawRect(244, 160, 262, 286);
      Materialmap.mask = shapeMask3;
      var H=[];
      var H2=[];
      var itemS=[];
      var cursorT=[];
      for(var i=0;i<consumptionA.length;i++){
        itemS.push(itemA[itemID(consumptionA[i])]);
      }
      itemS.sort(compareFuncID)
      for(var i=0;i<itemS.length;i++){
        H.push(UserItem[itemS[i].id]);
      }
      H2=H.filter(value=>value>0);
      var Hash=H2.length*26;
      var I=0;
      Matbar.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
      Matbar.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
      var t = new createjs.Shape();
      t.graphics.beginStroke("#60a2f7");
      t.graphics.beginFill("#d4f8ff");
      t.graphics.setStrokeStyle(3);
      t.graphics.drawRect(246, 0, 260, 26);
      t.alpha=0;
      Materialmap.addChild(t);
      cursorT.push(t);
      var t = new createjs.Shape();
      t.graphics.beginStroke("#60a2f7");
      t.graphics.beginFill("#d4f8ff");
      t.graphics.setStrokeStyle(3);
      t.graphics.drawRect(246+260, 0, 110, 40);
      t.alpha=0;
      Ct.addChild(t);
      cursorT.push(t);
      t.addEventListener("click", {handleEvent:useBattleItem});
      var T=new createjs.Text("使う","36px serif","#60a2f7");
      T.x=246+285;
      T.y=260;
      T.alpha=0;
      Ct.addChild(T);
      cursorT.push(T);
    for(var i=0;i<H.length;i++){
      if(i<itemA.length){
      var L=itemS[i].id
      if(H[i]>0){
        var t = new createjs.Shape();
        t.graphics.beginFill("black");
        t.graphics.drawRect(246, 160+26*I, 260, 26);
        t.alpha=0.6;
        Materialmap.addChild(t);
        var T=new createjs.Text(itemS[i].name,"24px serif","white");
        T.x=246;
        T.y=160+26*I;
        Materialmap.addChild(T);
        var T=new createjs.Text(" ×"+H[i],"24px serif","white");
        T.x=246+200;
        T.y=160+26*I;
        Materialmap.addChild(T);
        t.addEventListener("click", {height:I,card:L,handleEvent:Equipitem});
        t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
        t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
        t.addEventListener("mouseover", {card:L,handleEvent:MatDetail_1});
        t.addEventListener("mouseout", {card:-1,handleEvent:MatDetail_1});
        I+=1;
      }};
    }
    function MatDown(){
      dragPointX = stage.mouseX - Materialmap.x;
      dragPointY = stage.mouseY - Materialmap.y;
    }
    function MatMove(){
      Materialmap.y = stage.mouseY-dragPointY;
      if(Materialmap.y>0){Materialmap.y=0};
      if(this.hash<260 && Materialmap.y<0){Materialmap.y=0};
      if(this.hash>=260 && Materialmap.y<-(this.hash-260)){Materialmap.y=-(this.hash-260)};
    }
    function Equipitem(){
      se11.play();
      if(equipeditem==this.card){
        equipeditem=-1;
        for(var i=0;i<cursorT.length;i++){
        cursorT[i].alpha=0;
        }
      }else{
        equipeditem=this.card;
        for(var i=0;i<cursorT.length;i++){
          cursorT[i].alpha=1;
          cursorT[i].y=160+26*this.height;
          }
      };
      cursorT[cursorT.length-2].y+=Materialmap.y;
      cursorT[cursorT.length-1].y+=Materialmap.y;
    }
    function useBattleItem(){
      if(gamestate==2 && equipeditem>=0){
        //アイテム別の効果
        if(equipeditem!==155 && equipeditem!==113){
        var A=Bufflist.findIndex(value=>value.name=="凍結");
        if(Pbuff.indexOf(A)!==-1){
          gamestate=3;
          createjs.Tween.get(MessageText[2][0])
          .to({y:0},50);
          createjs.Tween.get(Ct)
          .to({y:-100,alpha:0},50);
          battleLog.push("凍ってしまって&動けないよ！");  
          Enemyturn();
          battleLogNext();
          return false;
        }}
        switch(equipeditem){
          //回復アイテム
          case 9:
            HPrec(30);
          break;
          case 23:
            HPrec(8,5);
          break;
          case 24:
            HPrec(10,6);
          break;
          case 25:
            HPrec(17,7);
          break;
          case 31:
            HPrec(12,6);
          break;
          case 35:
            HPrec(15,6);
          break;
          case 36:
            HPrec(13,6);
          break;
          case 46:
            HPrec(25,5);
          break;
          case 104:
            HPrec(64);
          break;
          case 112:
            HPrec(45);
          break;
          case 114:
            HPrec(50);
          break;
          case 115:
            HPrec(50);
          break;
          case 116:
            HPrec(60);
          break;
          case 117:
            var Rate=10*Math.floor(UserStatus[0]/30)
            HPrec(Rate);
          break;
          case 118:
            var Rate=10*Math.floor(UserStatus[0]/50)
            HPrec(Rate);
          break;
          case 119:
            HPrec(55);
          break;
          case 120:
            HPrec(45);
          break;
          case 121:
            HPrec(50);
          break;
          case 122:
            HPrec(100);
          break;
          case 123:
            HPrec(80);
          break;
          case 124:
            HPrec(100);
          break;
          case 125:
            HPrec(120);
          break;
          case 126:
            HPrec(85);
          break;
          case 127:
            HPrec(130);
          break;
          case 128:
            HPrec(300,0,1);
          break;
          case 129:
            HPrec(300);
          break;
          case 130:
            HPrec(70,5);
          break;
          case 145:
            HPrec(40);
          break;
          case 154:
            HPrec(25,60);
          break;
          case 157:
            HPrec(70);
          break;
          //投擲
          case 30:
          case 41:
          case 95:
          case 96:
          case 97:
          case 98:
          case 99:
          case 100:
          case 134:
            Shoot();
            break;
          case 29:
          case 113:
          case 155:
            Cure();
            break;
          //バフ・デバフ
          case 26:
            var A=Bufflist.findIndex(value=>value.name=="マンドラタマネギ")
            Buff([A,A,A,A],"激辛パワーで力が湧いてくる！&　");
            break;
          case 105:
            var A=Bufflist.findIndex(value=>value.name=="闘魂ドリンク")
            Buff([A,A,A,A],"闘魂一発、パワー全開！&　");
            break;
          case 106:
            var A=Bufflist.findIndex(value=>value.name=="ナソードアーマー")
            Buff([A,A,A,A],"ナソードアーマー　展開！&　");
            break;
          case 108:
            var A=Bufflist.findIndex(value=>value.name=="ガッツポトフ")
            Buff([A,A,A,A],"ガッツがみなぎる！&　");
            break;
          case 109:
            var A=Bufflist.findIndex(value=>value.name=="ボルケーノトルテ")
            Buff([A,A,A,A],"ピッケルの爆発力が上がってきた！&　");
            break;
          case 147:
            var A=Bufflist.findIndex(value=>value.name=="スリング")
            Buff([A],"このターンの攻撃は必ず回避するよ！&　");
            break;
          case 89:
            var A=Bufflist.findIndex(value=>value.name=="やけど")
            battleLog.push("crush3");
            Buff([A,A,A,A],OPname+"は火傷を負ったよ！&　",1,0.7);
            break;
          case 90:
            var A=Bufflist.findIndex(value=>value.name=="凍結")
            battleLog.push("crush3");
            Buff([A,A,A,A],OPname+"を氷漬けにしてやったよ！&　",1,0.5);
            break;
          case 91:
            var A=Bufflist.findIndex(value=>value.name=="中毒")
            battleLog.push("crush3");
            Buff([A,A,A,A],OPname+"を中毒状態にしたよ！&　",1,0.7);
            break;
          case 92:
            var A=Bufflist.findIndex(value=>value.name=="光の水晶玉")
            Buff([A,A,A,A],"力がみなぎってくる！&　");
            break;
          case 93:
            var A=Bufflist.findIndex(value=>value.name=="闇の水晶玉")
            battleLog.push("crush3");
            Buff([A,A,A,A,A,A],OPname+"の攻撃力が下がったよ！&　",1);
            break;
          case 94:
            var A=Bufflist.findIndex(value=>value.name=="風の水晶玉")
            battleLog.push("crush3");
            Buff([A,A,A,A,A,A],OPname+"の防御力が下がったよ！&　",1);
            break;
          //エルゼリー
          case 107:
            gamestate=3;
          createjs.Tween.get(MessageText[2][0])
          .to({y:0},50);
          createjs.Tween.get(Ct)
          .to({y:-100,alpha:0},50);
          UserItem[equipeditem]-=1;
          battleLog.push("attack");
          battleLog.push(itemA[itemID(equipeditem)].name+"を使うよ！&　");
          if(Extras[0]==-2){
            battleLog.push(OPname+"はエルゼリーに&見向きもしなかった・・");
            Enemyturn();
            battleLogNext();
          }else{
          var M=Enemylist.findIndex(value=>value.name==OPname);
          var rate=Math.floor(250*50/Enemylist[M].St[0]);//捕獲率 1/5 ~ 1/25 くらい
          var rate_2=10+((Enemylist[M].St[0]*3-StatusE[0]*2)*rate*1.5)/(Enemylist[M].St[0]*3);
          if(debugmode){console.log(rate,rate_2)};
          if(rate_2>127){rate_2=127};
          var R=Math.random()*127
          if(rate_2>R){
            //捕獲成功
            battleLog.push(OPname+"はエルゼリーに&食いついた！　気に入ったみたい！");
            battleLog.push("se_14");
            battleLog.push(OPname+"が&しばらく採取についてくるようになった！");
            userPet=[OPname,Enemylist[M].St[0]];
            battleLog.push(OPname+"との戦いは&平和的に終わった！&　");
            battleLog.push("result")
            battleLog.push(itemA[itemID(Enemylist[M].Dropitem[0])].name+"をゲットしたよ！&　");
            battleLog.push("end of battle"); 
            Exlists[3]=Exlists[3].concat(Enemylist[M].Dropitem[0]);
            battleLogNext();
            return false;
          }else{
            battleLog.push(OPname+"はエルゼリーに&見向きもしなかった・・");
            Enemyturn();
            battleLogNext();
          }
          };
          break;
        }
        function Cure(){
          //n->状態異常回復 p->0 自分 1相手 rate->付与確率
          gamestate=3;
          createjs.Tween.get(MessageText[2][0])
          .to({y:0},50);
          createjs.Tween.get(Ct)
          .to({y:-100,alpha:0},50);
          UserItem[equipeditem]-=1;
          battleLog.push("attack");
          battleLog.push(itemA[itemID(equipeditem)].name+"を使うよ！&　");
          switch(itemA[itemID(equipeditem)].name){
            case "キュアトマト":
          var A=Bufflist.findIndex(value=>value.name=="中毒");
          if(Pbuff.indexOf(A)!==-1){
            battleLog.push("中毒状態を回復したよ！&　");
          Pbuff=Pbuff.filter(value=>value !==A);
          }else{
            battleLog.push("おいしい！&　");
          }
          break;
          case "炎のスムージー":
            var A=Bufflist.findIndex(value=>value.name=="凍結");
            if(Pbuff.indexOf(A)!==-1){
              battleLog.push("凍結状態を回復したよ！&　");
            Pbuff=Pbuff.filter(value=>value !==A);
            }else{
              battleLog.push("おいしい！&　");
            }
            break;
          case "スッキリ茶":
            var A=Bufflist.findIndex(value=>value.name=="中毒");
            var B=Bufflist.findIndex(value=>value.name=="やけど");
            var C=Bufflist.findIndex(value=>value.name=="凍結");
            if(Pbuff.indexOf(A)!==-1 || Pbuff.indexOf(B)!==-1 || Pbuff.indexOf(C)!==-1){
              if(Pbuff.indexOf(A)!==-1){
                battleLog.push("中毒状態を回復したよ！&　");
              Pbuff=Pbuff.filter(value=>value !==A);
              }
              if(Pbuff.indexOf(B)!==-1){
                battleLog.push("やけど状態を回復したよ！&　");
              Pbuff=Pbuff.filter(value=>value !==B);
              }
              if(Pbuff.indexOf(C)!==-1){
                battleLog.push("凍結状態を回復したよ！&　");
              Pbuff=Pbuff.filter(value=>value !==C);
              }
            }else{
              battleLog.push("おいしい！&　");
            }
            break;
          };
          Enemyturn();
          battleLogNext();
      }
        function Buff(Ary,word=-1,p=0,rate=1){
            //n->buffにpushする配列 p->0 自分 1相手 rate->付与確率
            gamestate=3;
            createjs.Tween.get(MessageText[2][0])
            .to({y:0},50);
            createjs.Tween.get(Ct)
            .to({y:-100,alpha:0},50);
            UserItem[equipeditem]-=1;
            battleLog.push("attack");
            battleLog.push(itemA[itemID(equipeditem)].name+"を使うよ！&　");
            if(rate>Math.random()){
            if(word!==-1){
              if(p==0){
                battleLog.push("HPrecSE");
              }else if(p==1){
                battleLog.push("tukkomi");
              }
              battleLog.push(word)};
            if(p==0){
            Pbuff=Pbuff.concat(Ary);
            }else if(p==1){
            Ebuff=Ebuff.concat(Ary);
            }
            }else{
            battleLog.push("効果がなかったみたいだよ…。&　");
            }
            Enemyturn();
            battleLogNext();
        }
        function Shoot(){
          //相手にダメージを与えるアイテム
          gamestate=3;
          createjs.Tween.get(MessageText[2][0])
          .to({y:0},50);
          createjs.Tween.get(Ct)
          .to({y:-100,alpha:0},50);
          UserItem[equipeditem]-=1;
          battleLog.push("attack");
          battleLog.push(itemA[itemID(equipeditem)].name+"を使うよ！&　");
          var R=Skilllist.findIndex(value=>value.name==itemA[itemID(equipeditem)].name);
          if(R==-1){console.log('item error!');R=0};
          if(equipeditem==134){
            //1割で爆発
            var Rx=100*Math.random();
            if(Rx<10){
            battleLog.push("うわ！&がらくたが爆発した！　");
            R+=1;
            }
          }
          var D=Damage(0,R);
          if(D==-1){
            battleLog.push("kaihi");
            battleLog.push("外れちゃったー！");  
          }else{
          StatusE[0]-=D;
          battleLog.push("damage");
          if(Skilllist[R].sp>0 && Skilllist[R].sp==StatusE[3]){
            battleLog.push("効果はバツグンだ！");            
          };
          battleLog.push(OPname+"に&"+D+"のダメージ！");
          //スタン判定
          switch(R){
            case 8:
              if(Math.random()>0.8){
                var A=Bufflist.findIndex(value=>value.name=="スタン")
                Ebuff.push(A);
              }
              break;
            case 9:
              if(Math.random()>0.6){
                var A=Bufflist.findIndex(value=>value.name=="スタン")
                Ebuff.push(A);
              }
              break;
            case 10:
              if(Math.random()>0.4){
                var A=Bufflist.findIndex(value=>value.name=="スタン")
                Ebuff.push(A);
              }
              break;
          }};
          if(StatusE[0]<0){
            Defeat()
          }else{
            Enemyturn();
          }
          battleLogNext();
        }
        function HPrec(num,Mod=0,overrun=0){
          //HPマンタンの時は使用できない Mod->回復のブレ over->最大値を超えて回復
        if(StatusP[0]>=UserStatus[0] && overrun==0){
          pickMsg("今は使っても意味がなさそう。&　");
          return false;
        }
        gamestate=3;
        createjs.Tween.get(MessageText[2][0])
        .to({y:0},50);
        createjs.Tween.get(Ct)
        .to({y:-100,alpha:0},50);
        UserItem[equipeditem]-=1;
        battleLog.push("attack");
        battleLog.push(itemA[itemID(equipeditem)].name+"を使うよ！&　");
        var plus=Math.floor(Mod*Math.random());
        num+=plus;
        StatusP[0]+=num;
        if(StatusP[0]>UserStatus[0] && overrun==0){StatusP[0]=UserStatus[0]};
        var Temp=StatusP[0]
        battleLog.push("HPrec",Temp);
        battleLog.push("HPが　"+num+"回復したよ！");
        //生肉判定
        if(equipeditem==46){
          var R=Math.random()*3
          var EE=Bufflist.findIndex(value=>value.name=="ジョイフルライト")
          var E=Pbuff.indexOf(EE)
        if(E!==-1 && R<1){
        battleLog.push("うっ！　お腹壊したかも……。");
        var D=Bufflist.findIndex(value=>value.name=="中毒");
        Pbuff.push(D,D,D);
        }};
        //スキュアー
        if(equipeditem==126 || equipeditem==128){
          var A=Bufflist.findIndex(value=>value.name=="甘辛スキュアー")
          var Ary=[A,A,A,A]
          battleLog.push("激辛パワーで力が湧いてくる！&　");
          Pbuff=Pbuff.concat(Ary);
        }
        //シェイク
        if(equipeditem==114){
        var B=Bufflist.findIndex(value=>value.name=="やけど");
          if(Pbuff.indexOf(B)!==-1){
          battleLog.push("やけど状態を回復したよ！&　");
          Pbuff=Pbuff.filter(value=>value !==B);
          }
        }
        Enemyturn();
        battleLogNext();
        }
    }
  };
    function MatDetail_1(){
    switch(this.card){
      case -1:
      pickMsg("　&　&　");
        break;
      default:
      pickMsg(itemA[itemID(this.card)].detail);
        break;
    }
    }
  };
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
    if(Extras[i]==Card_src.length-1){
      //melon裁定
      if(attacker[i][0]%13==1 && attacker[i][1]%13==-1){
        Destraction(i,-1);
        return false;
      }
    }
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
  if(opLock==-1){opLock=0};
};
function Efuda(p=0){
  //10,11,12,13ならtrueを返す
  const efuda=[10,11,12,13,23,24,25,26,36,37,38,39,49,50,51,52]
  var E=efuda.findIndex(value=>value==p);
  if(E!==-1){return true}else{return false};
}
function Destraction(i=0,A,B,C){
  if(A==-1){
    //melon裁定
  se5.play();
  var Card=Exlists[i][0];
  createjs.Tween.get(Card)
  .to({alpha:0},150)
  .wait(100)
  .call(Melon1);
  field.removeChild(Card);
  var Card=Atklists[i][0];
  field.removeChild(Card);
  var Card=Atklists[i][1];
  field.removeChild(Card);
  Extras[i]=-1;
  attacker[i][0]=-1;
  Exlists[i]=[];
  Atklists[i][0]=-1;
  Sprite1.scale=1;
  Sprite1.x=115;
  Sprite1.y=70+140*i;
  Sprite1.gotoAndPlay('walk');
  function Melon1(){
    var T=melonList[0];
    createjs.Tween.get(T)
    .to({alpha:0},90);   
    var A=new createjs.Bitmap("Card_images/soL_melon.png")
    A.x=52;
    A.y=20;
    A.alpha=0;
    field.addChild(A);
    createjs.Tween.get(A)
    .to({alpha:0.8},150)
    .to({alpha:0},90)
    .to({alpha:0.8},90)
    .to({alpha:0},90)
    .to({alpha:1},90)
    .wait(400)
    .to({scale:1.2},60)
    .to({x:700,y:600,scale:1,alpha:0},300, createjs.Ease.backInOut)
    .call(Melon2);
    }
  function Melon2(){
    IK('極上メロン')
    monsterMove();
    }
  return false;
  }
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
      }else if(this.card>=10 && this.card<=13){
        //クリア済みのカード
        return true;
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
          }else if(this.card>=10 && this.card<=13){
            //クリア済みのカード
            var T=Exlists[this.card-10][Exlists[this.card-10].length-1];
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
            }else if(this.card>=10 && this.card<=13){
              //クリア済みのカード
              var T=Exlists[this.card-10][Exlists[this.card-10].length-1];
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
                UpCard(0);
              }else{
                ExitCard(-1);            
              };
              break;
            case 0:
              case 1:
                case 2:
                  case 3:
              if(X==Extras[TX]+1){
                UpCard(0)
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
        }else if(this.card>=10 && this.card<=13){
          //クリア済みのカード
          se1.play()
          cLock=false;
          var T=Exlists[this.card-10][Exlists[this.card-10].length-1];
          var TX=Math.floor((stage.mouseX-70)/90);
          var TY=stage.mouseY;
          var X=Extras[this.card-10];
          if(debugmode){console.log(this.card,X,TX,TY)};
        if(TY<140){
          ExitCard(this.card);
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
                  //listから消去
                  field.removeChild(T);
                  Exlists[this.card-10].pop();
                  Extras[this.card-10]-=1;
                  duelLog.push({card:[X],from:this.card,to:TX});
            }else{
              ExitCard(this.card);
            }
            break;
          default:
            ExitCard(this.card);
            }}
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
                UpCard(1);
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
                UpCard(1);
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
                if(Extras[TY]==Card_src.length-1){
                  //melon
                  ExitCard(-2);
                  return false;                  
                }
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
                    if(Extras[TY]==Card_src.length-1){
                      //melon
                      ExitCard();
                      return false;                  
                    }
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
          if(playMode[0]==1 && InvID(1)==0){
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
          if(t>=10){
            //クリア済みのカード
            var T=Exlists[t-10][Exlists[t-10].length-1];
            createjs.Tween.get(T)
            .to({x:50+(t-7)*(cardWidth+cardgapX),y:5},90)
            .call(endPhase);
            T.alpha=1;  
            return true; 
          }
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
    //右上へのアップ@クロンダイク
    function UpCard(from=0){
      se12.play();
      Extras[TX]+=1;
      if(from==0){
        //デッキからのアップ
        var newCard = new createjs.Bitmap(Card_src[X]);
      }else{
        //場からのアップ
        var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
      }
      newCard.x=T.x
      newCard.y=T.y
      field.addChild(newCard);
      //extraへ追加
      createjs.Tween.get(newCard)
      .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
      .call(endPhase);
      Exlists[TX].push(newCard);
      newCard.addEventListener("mousedown", {card:10+TX,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:10+TX,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:10+TX,handleEvent:handleUp});
      if(from==0){
        //cardlistから消去
        deckmap.removeChild(T);
        DeckFacelists.splice(decksNow-1,1);
        decksNow-=1;
        decksNow2-=1
        deckfaces.pop();
        duelLog.push({card:[X],from:-1,to:10+TX});
      }else{
        //cardlistから消去
        field.removeChild(T);
        Cardlists[I].splice(J,1);
        hands[I].splice(J,1);
        duelLog.push({card:[C],from:I,to:10+TX});
      }
      //クリア条件
      if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
        Gameover();
      }
      }
}};
function handleClick(event){
  //モンスター出現中
  if(Extras[0]<0){return false}
  //ヘニル　山札の数とプラスマイナス1なら移動する
  //1は11としても扱える
  var Getcard;
  if(cLock && mLock && opLock==0){
    var I=Math.floor(this.card/100);
    var J=this.card%100;
    if(J==hands[I].length-1){
      var TT=deckfaces[deckfaces.length-1]
      Getcard=hands[I][J];
      var A=hands[I][J]%10;
      var B=TT%10;
      if(A==0){A+=10};
      if(B==0){B+=10};
      //1-10,11-20...
      var E=Math.abs(B-A);
      if(E==1 || E==9 || Fever>0){
        if(Extras[0]>=7){se10.play();}else{se12.play();}   
        var T=Cardlists[I][J];
        var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
        newCard.x=T.x;
        newCard.y=T.y;
        deckmap.addChild(newCard);
        createjs.Tween.get(newCard)
        .to({x:370,y:280},80)
        .call(endPhase);
        field.removeChild(T)
        Extras[0]+=1;
        if(UserStatus[4]==85){if(Math.random()>0.6){Extras[0]+=1}};
        deckfaces.push(hands[I][J]);
        hands[I].pop();
        duelLog.push({card:hands[I][J],from:I,to:-1});
      }
    }
  };
  function endPhase(){
    Exlists[1].text="連鎖："+Extras[0];
    var A;
    var B;
    if(Fever>0){
      Fever-=1;
      if(Fever==0){field.removeChild(Clvup)};
      };
    switch(Extras[0]){
    case 1:
    case 2:
      var R=Math.floor(Math.random()*henirarea[playMode[1]].Nitem[Extras[1]].length);
      A=henirarea[playMode[1]].Nitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*1.5)
      break;
    case 3:
      var Rate=Math.random()*3
      if(Rate<=2){
      var R=Math.floor(Math.random()*henirarea[playMode[1]].Nitem[Extras[1]].length);
      A=henirarea[playMode[1]].Nitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*2.5)
      }else{
        var R=Math.floor(Math.random()*henirarea[playMode[1]].Ritem[Extras[1]].length);
        A=henirarea[playMode[1]].Ritem[Extras[1]][R];
        B=1+Math.floor(Math.random()*1.1)
      }
      break;
    case 4:
    case 5:
      var R=Math.floor(Math.random()*henirarea[playMode[1]].Ritem[Extras[1]].length);
      A=henirarea[playMode[1]].Ritem[Extras[1]][R];
      B=1+Math.floor(Math.random()*1.2)
      break;
    case 6:
    case 7:
      var Rate=Math.random()*3
      if(Rate<=2){
      var R=Math.floor(Math.random()*henirarea[playMode[1]].Ritem[Extras[1]].length);
      A=henirarea[playMode[1]].Ritem[Extras[1]][R];
      B=1+Math.floor(Math.random()*1.8)
      }else{
      var R=Math.floor(Math.random()*henirarea[playMode[1]].SRitem[Extras[1]].length);
      A=henirarea[playMode[1]].SRitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*1.1)
      }
      break;
    default:
      var R=Math.floor(Math.random()*henirarea[playMode[1]].SRitem[Extras[1]].length);
      A=henirarea[playMode[1]].SRitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*Extras[0]/8)
      break;
    }
    if(UserItem[156]>0){B+=1};
    //itemA.findIndex(value=>value.id==A);
    Extras[1].text=itemA[itemID(A)].name;
    //Aを取ったらイベント
    if(Getcard%10==1){
      var R=Math.floor(EvAry.length*Math.random());
      pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&"+EvAry[R].word);
      switch(EvAry[R].id){
        case 0:
          se28.play();
          for(var i=0;i<3;i++){
            if(Exlists[3].length){
            var I=Math.floor(Math.random()*(Exlists[3].length-1));
            Exlists[3].splice(I,1);
            }
          }
          break;
        case 1:
          if(Extras[1]==0){
          Extras[1]=1;
          Exlists[0].text="系統：ドリル"
        }else{
          Extras[1]=0;
          Exlists[0].text="系統：カッター"
        }
          break;
        case 2:
          Fever=3;
          Clvup.alpha=0;
          field.addChild(Clvup);
          Clvup.x=-400;
          Clvup.y=0;
          Clvup.scale=1;
          se27.play();
          var shape = new createjs.Shape();
          shape.graphics.beginFill("rgba(255,255,255,0.7)");
          shape.graphics.drawRect(0, 0, 800, 600);
          stage.addChild(shape);
          createjs.Tween.get(shape)
          .to({alpha:0.5},200)
          .to({alpha:0},120)
          .to({alpha:0.3},100)
          .to({alpha:0},200);
          createjs.Tween.get(Clvup)
          .to({x:50,alpha:1},200)
          .to({x:48,alpha:0},300)
          .to({x:46,alpha:1},300)
          .to({x:44,alpha:0},100)
          .to({x:40,alpha:1},100)
          .to({alpha:0},100)
          .to({x:800,y:0,alpha:1},200,createjs.Ease.cubicIn)
          .call(feverTime);
          function feverTime (){
            stage.removeChild(shape);
            Clvup.scale=0.3;
            Clvup.x=-30;
            Clvup.y=-50;
          }
          break;
          case 3:
          for(var i=0;i<3;i++){
            if(Exlists[3].length){
            var I=Math.floor(Math.random()*(Exlists[3].length-1));
            Exlists[3].push(Exlists[3][I]);
            }
          }
          break;
      }
      EvAry.splice(R,1);
    }else{
      if(Extras[0]>=7){
        if(Extras[1]==0){
          pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&カッターが止まらない！");
        }else{
          pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&ドリルが止まらない！");
        }
      }else if(Extras[0]>=5){
      pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&これ、珍しそう！");
      }else if(Extras[0]>=3){
      pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&あれもこれも、ぜーんぶあたしのもの！");
      }else if(Extras[0]>=2){
      pickMsg("これももーらいっ！&"+itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！");
      }else{
      pickMsg(itemA[itemID(A)].name+"を"+B+"個ゲットしたよ！&　");
      }
    }
    var Ary=Array(B);
    Ary.fill(A);
    Exlists[3]=Exlists[3].concat(Ary);
    if(debugmode){console.log(Exlists[3])};
    cLock=true;
    //end判定
    var M=0;
    var N=0;
    var TT=deckfaces[deckfaces.length-1]
    for(var i=0;i<6;i++){
      if(hands[i].length){
        M+=1;
        var A=hands[i][hands[i].length-1]%10;
        var B=TT%10;
        if(A==0){A+=10};
        if(B==0){B+=10};
        var E=Math.abs(B-A);
        if(E==1 || E==9){
          N+=1;
        }
      }
    }
    if(M==0 || (N==0 && !decks.length)){
      Fever=0;
      Gameover();
    }
    return true;
  }
}
function SoundConfig(event,p=0){
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
  SEbuffer(-1)
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
      case 6:
        Bgm =new Music(bgm6data);
        Bgm.playMusic();
        break;
      case 7:
        Bgm =new Music(bgm7data);
        Bgm.playMusic();
        break;
      case 8:
        Bgm =new Music(bgm8data);
        Bgm.playMusic();
        break;
      case 9:
        Bgm =new Music(bgm9data);
        Bgm.playMusic();
        break;
      case 10:
        Bgm =new Music(bgm10data);
        Bgm.playMusic();
        break;
      case 11:
        Bgm =new Music(bgm11data);
        Bgm.playMusic();
        break;
      case 12:
        Bgm =new Music(bgm12data);
        Bgm.playMusic();
        break;
      case 13:
        Bgm =new Music(bgm13data);
        Bgm.playMusic();
        break;
      case 14:
        Bgm =new Music(bgm14data);
        Bgm.playMusic();
        break;
      case 15:
        Bgm =new Music(bgm15data);
        Bgm.playMusic();
        break;
      case 16:
        Bgm =new Music(bgm16data);
        Bgm.playMusic();
        break;
      case 17:
        Bgm =new Music(bgm17data);
        Bgm.playMusic();
        break;
      case 18:
        Bgm =new Music(bgm18data);
        Bgm.playMusic();
        break;
      case 19:
        Bgm =new Music(bgm19data);
        Bgm.playMusic();
        break;
      case 20:
        Bgm =new Music(bgm20data);
        Bgm.playMusic();
        break;
      case 21:
        Bgm =new Music(bgm21data);
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
          if(debugmode){
          option_bt.addEventListener("click", {handleEvent:saveDLcomfirm});
          }
          function saveDLcomfirm(){
          var result = window.confirm('セーブファイルをダウンロードします！');
          if( result) {
          console.log('save');
          saveDL();
              }else{
          console.log('save cancelled');
              }
          }
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
function InvConfig_Item(){
  InvConfig(0,1);
  InvConfig(-1,1)
};
function InvConfig(p=-1,layer=0){
  //layer 1->インベのみfieldに 2->消費インベのみかつbattlefieldへ
if(p==0){
  //入手時には描画する
  Itemyard.removeAllChildren();
  if(layer==0){
  var Invbar = new createjs.Shape();
  Invbar.graphics.beginFill("black");
  Invbar.graphics.drawRect(690, 55, 110, 460);
  Invbar.alpha=0.5;
  Itemyard.addChild(Invbar);
  if(UserLibrary.indexOf(1)!==-1){
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(690, 55, 108, 35);
  Itemyard.addChild(shape);
  var T=new createjs.Text("特殊","24px serif","#46574a");
  T.x=715;
  }else{
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(690, 55, 98, 35);
  Itemyard.addChild(shape);
  var T=new createjs.Text("アイテム","24px serif","#46574a");
  T.x=690;
  }
  T.y=58;
  Itemyard.addChild(T);
  var Hash=inventory.filter(value=>value.cleared!==0);
  Invbar.addEventListener("mousedown", {hash:Hash.length,handleEvent:itemDown});
  Invbar.addEventListener("pressmove", {hash:Hash.length,handleEvent:itemMove});
  var Itemmap = new createjs.Container();
  Itemyard.addChild(Itemmap);
  var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(700, 90, 100, 425);
  Itemmap.mask = shapeMask3;
  function itemDown(){
    dragPointX = stage.mouseX - Itemmap.x;
    dragPointY = stage.mouseY - Itemmap.y;
  }
  function itemMove(){
    Itemmap.y = stage.mouseY-dragPointY;
    if(Itemmap.y>0){Itemmap.y=0};
    if(this.hash<7 && Itemmap.y<0){Itemmap.y=0};
    if(this.hash>=7 && Itemmap.y<-(this.hash*66-415)){Itemmap.y=-(this.hash*66-415)};
  }
for(var i=0;i<6;i++){
    var shape = new createjs.Shape();
    shape.graphics.beginFill("white");
    shape.graphics.drawRect(710, 95+(66*i), 64, 64);
    shape.alpha=0.7;
    Itemmap.addChild(shape);
  }
itemAry=[];
for(var i=0;i<inventory.length;i++){
  if(inventory[i].cleared !==0){
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(710, 95+(66*itemAry.length), 64, 64);
  Itemmap.addChild(shape);
  shape.addEventListener("click", {card:i,handleEvent:Equipitem});
  shape.addEventListener("mouseover", {card:i,handleEvent:ItemDetail});
  shape.addEventListener("mouseout", {card:-1,handleEvent:ItemDetail});
  shape.addEventListener("mousedown", {hash:Hash.length,handleEvent:itemDown});
  shape.addEventListener("pressmove", {hash:Hash.length,handleEvent:itemMove});
  var T =new createjs.Bitmap(Item_src[i]);
  T.x=710;
  T.y=95+(66*itemAry.length);
  T.scale=0.5;
  Itemmap.addChild(T);
  if(inventory[i].cleared <=-1){
  var shape = new createjs.Shape();
    shape.graphics.beginFill("black");
    shape.graphics.drawRect(710, 95+(66*itemAry.length), 64, 64);
    shape.alpha=0.7;
    Itemmap.addChild(shape);
  }
  itemAry.push(i);
  }}
  Itemmap.addChild(Invcursor);
if(equipeditem>=0){
  var E=itemAry.indexOf(equipeditem)
  Invcursor.x=710;
  Invcursor.y=90+(66*E);
  Invcursor.alpha=1;
}else{
  Invcursor.alpha=0; 
}
  };//アイテムここまで
  //インベントリ
  var Materialmap = new createjs.Container();
    itemMax[0]=1;
    if(UserItem[82]>0){itemMax[0]+=1;}
    if(UserItem[83]>0){itemMax[0]+=1;}
  var IDtextbg = new createjs.Shape();
  IDtextbg.graphics.beginFill("black");
  IDtextbg.graphics.drawRect(20, 520, 600, 70);
  IDtextbg.alpha=0;
  Itemyard.addChild(IDtextbg);
  var IDtext=[];
  for (var i=0;i<3;i++){
  var T=new createjs.Text("　","20px serif","white");
  if(UserLibrary.indexOf(1)!==-1){
  T.x=310;
  }else{
  T.x=30;
  }
  T.y=521+22*i;
  Itemyard.addChild(T);
  IDtext.push(T);
  }
  if(UserLibrary.indexOf(1)!==-1){
    console.log('MatConfig');
    IDtextbg.x+=250;
    var Matbar = new createjs.Shape();
    Matbar.graphics.beginFill("black");
    Matbar.graphics.drawRect(805, 55, 262, 460);
    Matbar.alpha=0.5;
    Itemyard.addChild(Matbar);
    Itemyard.addChild(Materialmap);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.drawRect(805, 55, 131, 35);
    shape.addEventListener("click", {t:-1,handleEvent:itemClassF});
    Itemyard.addChild(shape);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.drawRect(936, 55, 131, 35);
    shape.addEventListener("click", {t:1,handleEvent:itemClassF});
    Itemyard.addChild(shape);
    var shape = new createjs.Shape();
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(805, 55, 262, 35);
    Itemyard.addChild(shape);
    function itemClassF(){
      //絞り込み機能を追加したい
      se11.play();
      if(this.t==-1){
      itemClassAry[0]-=1;
      if(itemClassAry[0]==0){itemClassAry[0]=itemClassAry.length-1};
      }else if(this.t==1){
      itemClassAry[0]+=1;
      if(itemClassAry[0]==itemClassAry.length){itemClassAry[0]=1};
    }
      InvConfig(0,layer)
    };
    var T=new createjs.Text("◀ "+itemClassAry[itemClassAry[0]]+" ▶","24px serif","#46574a");
    T.x=940;
    T.y=58;
    T.textAlign="center";
    Itemyard.addChild(T);
    var shapeMask3 = new createjs.Shape();
            shapeMask3.graphics
                  .beginFill("gold")
                  .drawRect(800, 55, 280, 460);
    Materialmap.mask = shapeMask3;
    var itemS=[];
    var H=[];
    var H2=[];
    switch(itemClassAry[0]){
      case 1:
      itemS=itemA.concat();
      for(var i=0;i<itemS.length;i++){
        H.push(UserItem[itemS[i].id]);
      }
      H2=H.filter(value=>value>0);
      break;
      case 2:
        var itemS=itemA.filter(value=>value.class=="植物資源")
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 3:
        var itemS=itemA.filter(value=>value.class=="鉱物資源")
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 4:
        var itemS=itemA.filter(value=>value.class=="その他資源")
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 5:
        var itemS=itemA.filter(value=>value.class=="クリソナ")
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 6:
        var itemS=itemA.filter(value=>value.class=="製造")
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 7:
        var itemS=[];
        for(var i=0;i<consumptionA.length;i++){
          itemS.push(itemA[itemID(consumptionA[i])]);
        }
        itemS.sort(compareFuncID);
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
      case 8:
        var itemS=[];
        for(var i=0;i<medicineA.length;i++){
          itemS.push(itemA[itemID(medicineA[i])]);
        }
        itemS.sort(compareFuncID);
        for(var i=0;i<itemS.length;i++){
          H.push(UserItem[itemS[i].id]);
        }
        break;
    }
    H2=H.filter(value=>value>0);
    var Hash=H2.length*25;
    var I=0;
    if(itemClassAry[0]==1 || itemClassAry[0]==5){
    Hash+=Crisona.length*25;
  for(var i=0;i<Crisona.length;i++){
    var C;
    if(Crisona[i]>=70 && Crisona[i]<80){
      C=74;
    }else if(Crisona[i]<90){
      C=75;
    }else{
      C=76;
    }
    var t = new createjs.Shape();
    t.graphics.beginFill("black");
    t.graphics.drawRect(815, 100+25*I, 245, 25);
    t.alpha=0.6;
    Materialmap.addChild(t);
    var T=new createjs.Text(itemA[itemID(C)].name,"20px serif","white");
    T.x=815;
    T.y=100+25*I;
    Materialmap.addChild(T);
    var T=new createjs.Text(" ×1","20px serif","white");
    T.x=1000;
    T.y=100+25*I;
    Materialmap.addChild(T);
    t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
    t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
    t.addEventListener("mouseover", {card:C,jundo:Crisona[i],handleEvent:MatDetail_1});
    t.addEventListener("mouseout", {card:-1,handleEvent:MatDetail_1});
    I+=1;
  }
    }
    Matbar.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
    Matbar.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
  for(var i=0;i<H.length;i++){
    if(i<itemA.length){
    var L=itemS[i].id;
    if(L<74 || L>76){
    if(H[i]>0){
      var t = new createjs.Shape();
      t.graphics.beginFill("black");
      t.graphics.drawRect(815, 100+25*I, 245, 25);
      t.alpha=0.6;
      Materialmap.addChild(t);
      var T=new createjs.Text(itemS[i].name,"20px serif","white");
      T.x=815;
      T.y=100+25*I;
      Materialmap.addChild(T);
      var T=new createjs.Text(" ×"+H[i],"20px serif","white");
      T.x=1000;
      T.y=100+25*I;
      Materialmap.addChild(T);
      t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
      t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
      t.addEventListener("mouseover", {card:L,handleEvent:MatDetail_1});
      t.addEventListener("mouseout", {card:-1,handleEvent:MatDetail_1});
      if(itemClassAry[0]==8){
        t.addEventListener("click", {t:L,handleEvent:Poweritem});
        function Poweritem(){
          if(opLock==0){
            opLock=2;
            se11.play();
            Dialogue("アイテム使用",itemA[itemID(this.t)].name+"を使いますか？",7,-1,-1,this.t);
          }
        }
      }
      I+=1;
    }}}};
  function MatDown(){
    dragPointX = stage.mouseX - Materialmap.x;
    dragPointY = stage.mouseY - Materialmap.y;
  }
  function MatMove(){
    Materialmap.y = stage.mouseY-dragPointY;
    if(Materialmap.y>0){Materialmap.y=0};
    if(this.hash<400 && Materialmap.y<0){Materialmap.y=0};
    if(this.hash>=400 && Materialmap.y<-(this.hash-400)){Materialmap.y=-(this.hash-400)};
  }
  }
  return true;
}
if(opLock!==4){
if(Itemswitch==0){
  Itemswitch=1;
  se11.play();
    if(UserLibrary.indexOf(1)!==-1){
      createjs.Tween.get(Itemyard)
      .to({x:-270},250, createjs.Ease.backOut)
      }else{
      createjs.Tween.get(Itemyard)
      .to({x:10},150, createjs.Ease.backOut)
    }
  }else{
  se11.play();
    if(UserLibrary.indexOf(1)!==-1){
      createjs.Tween.get(Itemyard)
      .to({x:110},250, createjs.Ease.backOut)
      }else{
      createjs.Tween.get(Itemyard)
      .to({x:110},150, createjs.Ease.backOut)
  }
  Itemswitch=0;
}};
function ItemDetail(){
  switch(this.card){
    case -1:
      IDtextbg.alpha=0;
      for(var i=0;i<3;i++){IDtext[i].text="　"}
      break;
    default:
      IDtextbg.alpha=0.5;
      var detail=inventory[this.card].name+"："+inventory[this.card].sub
      for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
        if(i>=3){break};
        var line = lines[i];
        IDtext[i].text=line;
      };
      break;
  }
}
function MatDetail_1(){
  switch(this.card){
    case -1:
      IDtextbg.alpha=0;
      for(var i=0;i<3;i++){IDtext[i].text="　"}
      break;
    default:
      IDtextbg.alpha=0.5;
      if(this.card==74 || this.card==75 || this.card==76){
        var detail=itemA[itemID(this.card)].name+"（純度"+this.jundo+"%）："+itemA[itemID(this.card)].detail
      }else{
      var detail=itemA[itemID(this.card)].name+"："+itemA[itemID(this.card)].detail
      }
      for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
        if(i>=3){break};
        var line = lines[i];
        IDtext[i].text=line;
      };
      break;
  }
}
function Equipitem(){
    if(equipeditem!==this.card){
      if(inventory[this.card].cleared >0){
      se11.play();
      var ID=inventory[this.card].id;
      equipeditem=ID;
      var E=itemAry.indexOf(this.card);
      Invcursor.x=710;
      Invcursor.y=95+(66*E);
      Invcursor.alpha=1;
      }
    }else{
      se11.play();
      equipeditem=-1;
      Invcursor.alpha=0;
    }
}
};
function AsmConfig(){
if(AsmAry.length){
  for(var i=0;i<AsmAry.length;i++){
    field.removeChild(AsmAry[i])
  }
};
AsmAry=[];
AsmAry2=[];
crisonaA=[]
successRate=0;
if(opLock==0){
field.removeAllChildren();
opLock=12;
se11.play();
var BG = new createjs.Bitmap("Don_bg4.png");
BG.alpha=0;
field.addChild(BG);
var shape = new createjs.Shape();
shape.graphics.beginFill("#bae0c3");
shape.graphics.beginStroke("#617d68");
shape.graphics.setStrokeStyle(2);
shape.graphics.drawRect(50, 280, 200, 35);
field.addChild(shape);
AsmAry.push(shape);
var shape = new createjs.Shape();
shape.graphics.beginFill("#bae0c3");
shape.graphics.beginStroke("#617d68");
shape.graphics.setStrokeStyle(2);
shape.graphics.drawRect(270, 280, 200, 35);
field.addChild(shape);
AsmAry.push(shape);
var shape = new createjs.Shape();
shape.graphics.beginFill("#bae0c3");
shape.graphics.beginStroke("#617d68");
shape.graphics.setStrokeStyle(2);
shape.graphics.drawRect(490, 280, 200, 35);
field.addChild(shape);
AsmAry.push(shape);
var T=new createjs.Text("分解・加工","24px serif","#46574a");
T.x=55;
T.y=283;
field.addChild(T);
AsmAry.push(T);
var T=new createjs.Text("レシピから錬成","24px serif","#46574a");
T.x=275;
T.y=283;
field.addChild(T);
AsmAry.push(T);
var T=new createjs.Text("選んで錬成","24px serif","#46574a");
T.x=495;
T.y=283;
field.addChild(T);
AsmAry.push(T);
var shape = new createjs.Shape();
shape.graphics.beginFill("black");
shape.graphics.drawRect(50, 480, 600, 35);
shape.alpha=0.7
field.addChild(shape);
var DetailText=new createjs.Text("　","24px serif","white");
DetailText.x=55;
DetailText.y=483;
field.addChild(DetailText);
AsmAry.push(shape)
AsmAry.push(DetailText);
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
createjs.Tween.get(BG)
.to({alpha:0.8},100);
AsmAry[0].addEventListener("click", {card:1,handleEvent:Assemble});
AsmAry[0].addEventListener("mouseover", {card:1,handleEvent:Asmdetail});
if(henirarea[0].cleared>2){
  AsmAry[1].addEventListener("click", {card:2,handleEvent:Assemble});
  AsmAry[1].addEventListener("mouseover", {card:2,handleEvent:Asmdetail});
}else{
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#324537");
  shape.graphics.drawRect(272, 282, 196, 31);
  field.addChild(shape);
  AsmAry.push(shape)
};
if(henirarea[1].cleared>1){
  AsmAry[2].addEventListener("click", {card:3,handleEvent:Assemble});
  AsmAry[2].addEventListener("mouseover", {card:3,handleEvent:Asmdetail});
}else{
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#324537");
  shape.graphics.drawRect(492, 282, 196, 31);
  field.addChild(shape);
  AsmAry.push(shape)
};
}else{
  console.log('go to main menu')
  se11.play();
  field.removeAllChildren();
  opLock=0;
  Titleyard.alpha=1;
}
function Asmdetail(){
  switch(this.card){
    case 1:
      DetailText.text="加工/1つの材料を選んで分解や加工を行います。"
      break;
    case 2:
      DetailText.text="レシピから錬成/思いついたレシピをもとに錬成します。"
      break;
    case 3:
      DetailText.text="選んで錬成/自分で材料を選んで錬成します。"
      break;
  }
}
};
function Assemble(){
  Ct.removeAllChildren();
  Ct.x=0;
  se11.play();
  opLock=12;
  if(AsmAry.length){
    for(var i=0;i<AsmAry.length;i++){
      field.removeChild(AsmAry[i])
    }
  };
  AsmAry=[];
  var Materialmap = new createjs.Container();
    var Matbar = new createjs.Shape();
    Matbar.graphics.beginFill("black");
    Matbar.graphics.drawRect(55, 80, 262, 380);
    Matbar.alpha=0.5;
    field.addChild(Matbar);
    field.addChild(Materialmap);
    AsmAry.push(Matbar);
    AsmAry.push(Materialmap);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(55, 60, 262, 35);
    field.addChild(shape);
    var shapeMask3 = new createjs.Shape();
    shapeMask3.graphics
          .beginFill("gold")
          .drawRect(55, 80, 262, 380);
    Materialmap.mask = shapeMask3;
    var Ary=[0,"加工","レシピから錬成","選んで錬成"]
    var T=new createjs.Text(Ary[this.card],"24px serif","#46574a");
    T.x=60;
    T.y=64;
    field.addChild(T);
    AsmAry.push(shape);
    AsmAry.push(T);
  switch(this.card){
    case 1:
      //加工
        var Hash=disassemble.length*25;
        var I=0;
      for(var i=0;i<disassemble.length;i++){
        if(UserItem[disassemble[i]]>0){
          var t = new createjs.Shape();
          t.graphics.beginFill("black");
          t.graphics.drawRect(55, 100+25*I, 265, 25);
          t.alpha=0.6;
          Materialmap.addChild(t);
          var T=new createjs.Text(itemA[itemID(disassemble[i])].name,"20px serif","white");
          T.x=65;
          T.y=102+25*I;
          Materialmap.addChild(T);
          var T=new createjs.Text(" ×"+UserItem[disassemble[i]],"20px serif","white");
          T.x=260;
          T.y=102+25*I;
          Materialmap.addChild(T);
          t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
          t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
          t.addEventListener("mouseover", {card:disassemble[i],handleEvent:Matdetail});
          t.addEventListener("click", {type:0,product:disassemble[i],loop:1,handleEvent:Alchemyset});
          I+=1;
        }}
      break;
    case 2:
        //錬成
          var Hash=25+userRecipe.length*25;
          //知っているレシピをぜんぶ表示
          userRecipe.sort(compareFunc);
        for(var i=0;i<userRecipe.length;i++){
            var t = new createjs.Shape();
            t.graphics.beginFill("black");
            t.graphics.drawRect(55, 100+25*i, 265, 25);
            t.alpha=0.6;
            Materialmap.addChild(t);
            var T=new createjs.Text(itemA[itemID(userRecipe[i])].name,"20px serif","white");
            if(UserLibrary[userRecipe[i]]==0){T.color="#eddb66"}
            T.x=65;
            T.y=102+25*i;
            Materialmap.addChild(T);
            t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
            t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
            t.addEventListener("mouseover", {card:userRecipe[i],handleEvent:Matdetail});
            t.addEventListener("click", {type:1,product:userRecipe[i],loop:1,handleEvent:Alchemyset});
            //材料が足りない物は色を変える
          }
        break;  
        case 3:
          //えらんで錬成
            var H=UserItem.filter(value=>value>0 && value !==74 && value !==75 && value !==76);
            var Hash=H.length*25;
            var I=0;
          for(var i=0;i<itemA.length;i++){
            //id順に表示したい
            if(UserItem[itemA[i].id]>0){
              if(itemA[i].id<74 || itemA[i].id>76){
              var t = new createjs.Shape();
              t.graphics.beginFill("black");
              t.graphics.drawRect(55, 100+25*I, 265, 25);
              t.alpha=0.6;
              Materialmap.addChild(t);
              var T=new createjs.Text(itemA[i].name+"×"+UserItem[itemA[i].id],"20px serif","white");
              T.x=65;
              T.y=102+25*I;
              I+=1;
              Materialmap.addChild(T);
              t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
              t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
              t.addEventListener("mouseover", {card:itemA[i].id,handleEvent:Matdetail});
              t.addEventListener("click", {type:1,product:itemA[i].id,handleEvent:Formula});
            }};
          }
          Ct.removeAllChildren();
          vpronum=0
          vmatnameA=[]
          vmatnumA=[]
          break;    
  }
  Matbar.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
  Matbar.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
  function MatDown(){
    dragPointX = stage.mouseX - Materialmap.x;
    dragPointY = stage.mouseY - Materialmap.y;
  }
  function MatMove(){
    Materialmap.y = stage.mouseY-dragPointY;
    if(Materialmap.y>0){Materialmap.y=0};
    if(this.hash<370 && Materialmap.y<0){Materialmap.y=0};
    if(this.hash>=370 && Materialmap.y<-(this.hash-370)){Materialmap.y=-(this.hash-370)};
  }
  var shape = new createjs.Shape();
  shape.graphics.beginFill("black");
  shape.graphics.drawRect(55, 482, 600, 50);
  shape.alpha=0.7
  field.addChild(shape);
  AsmAry.push(shape);
  var DetailText=new createjs.Text("　","19px serif","white");
  DetailText.x=55;
  DetailText.y=484;
  field.addChild(DetailText);
  AsmAry.push(DetailText);
  var DetailText=new createjs.Text("　","19px serif","white");
  DetailText.x=55;
  DetailText.y=508;
  field.addChild(DetailText);
  AsmAry.push(DetailText);
  field.addChild(Ct);
};
function Matdetail(){
  var detail=itemA[itemID(this.card)].detail;
  var lines=detail.split( "&" );
  AsmAry[AsmAry.length-2].text=lines[0]+lines[1];
  AsmAry[AsmAry.length-1].text=lines[2];  
};
function Alchemyset(e,type,product,loop=1){
  //ALchemyへのつなぎ,type0,1=>プレビュー画面表示 2,3=>実行,loop=>実行回数
  if(opLock==10){return false};
  if(opLock==13){
    if(this.type<2){return false};
    if((this.type==3 || this.type==4 )&& successRate==0){return false};
  }
  se11.play();
  Ct.alpha=1;
  Ct.y=0;
  Ct.removeAllChildren();
  type=this.type;
  product=this.product;
  loop=this.loop;
  var vproname=product
  vpronum=0
  vmatnameA=[]
  vmatnumA=[]
    //調合レシピ登録関連
    if(type==4){
      if(product!==134 && product>0 && userRecipe.indexOf(product)==-1){
        //成功例
        userRecipe.push(-product);
      };
      if(product<0 && userRecipe.indexOf(-product)==-1){
        //レシピのみ成功例
        var N=-product;
        product=134;
        userRecipe.push(-N);
      }
    type=3;
   }
  if(type==0 || type==2){//分解プレビュー
  if(loop<=0){loop=1}
  if(loop>UserItem[vproname]){loop=UserItem[vproname]};
  switch (product){
    case 5:
    vmatnameA.push(10,6);
    vmatnumA.push(2,1);
    if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
    break;
    case 14:
      vmatnameA.push(15);
      vmatnumA.push(2);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 15:
      vmatnameA.push(95);
      vmatnumA.push(2);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 17:
      vmatnameA.push(54);
      vmatnumA.push(5);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 32:
      vmatnameA.push(151);
      vmatnumA.push(3);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 33:
      vmatnameA.push(50);
      vmatnumA.push(3);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 38:
      vmatnameA.push(55,73);
      vmatnumA.push(3,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 44:
      vmatnameA.push(157,43,49);
      vmatnumA.push(1,3,2);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 45:
      vmatnameA.push(46,47);
      vmatnumA.push(2,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 56:
      vmatnameA.push(57,142,73);
      vmatnumA.push(3,1,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 63:
      vmatnameA.push(64,73);
      vmatnumA.push(3,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 65:
      vmatnameA.push(64,56,69);
      vmatnumA.push(1,2,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 69:
      vmatnameA.push(54,73);
      vmatnumA.push(2,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 70:
      vmatnameA.push(60,73);
      vmatnumA.push(2,3);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 71:
      vmatnameA.push(54,141,73);
      vmatnumA.push(2,1,2);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 72:
      vmatnameA.push(69,70,71);
      vmatnumA.push(1,1,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 73:
      vmatnameA.push(74);
      vmatnumA.push(1);
      if(type==2){Alchemy(0,[product],[7],vmatnameA,vmatnumA,loop);return true;};
      break;
    case 77:
      if(UserItem[132]>0){
        vmatnameA.push(75);
        vmatnumA.push(3);       
      }else{
      vmatnameA.push(74);
      vmatnumA.push(3);
      };
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;}; 
      break;
    case 146:
      vmatnameA.push(15,16);
      vmatnumA.push(1,1);
      if(type==2){Alchemy(0,[product],[1],vmatnameA,vmatnumA,loop);return true;};
      break;
   default:
  return false;
  }
  //描画と分解可否判定
    vpronum=loop;
    if(product==73){vpronum=7*loop};
    for(var i=0;i<vmatnumA.length;i++){
      vmatnumA[i]*=loop;
      }
    var shape = new createjs.Shape();
    shape.graphics.beginFill("black");
    shape.graphics.drawRect(350, 80, 320, 380);
    shape.alpha=0.7
    Ct.addChild(shape);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 60, 320, 40);
    Ct.addChild(shape);
    var T=new createjs.Text("いくつ加工する？","24px serif","#46574a");
    T.x=360;
    T.y=65;
    Ct.addChild(T);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 370, 160, 50);
    Ct.addChild(shape);
    shape.addEventListener("click", {type:type,product:product,loop:loop-1,handleEvent:Alchemyset});
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(510, 370, 160, 50);
    Ct.addChild(shape);
    shape.addEventListener("click", {type:type,product:product,loop:loop+1,handleEvent:Alchemyset});
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 420, 320, 40);
    Ct.addChild(shape);
    if(vpronum<=UserItem[vproname]){
    shape.addEventListener("click", {type:2,product:product,loop:loop,handleEvent:Alchemyset});
    }else{
      shape.graphics.beginFill("black");
      shape.graphics.drawRect(350, 420, 320, 40);
      shape.alpha=0.7;
      Ct.addChild(shape);
    }
    var T=new createjs.Text("OK","26px serif","#46574a");
    T.x=490;
    T.y=422;
    Ct.addChild(T);
    var S = new createjs.Bitmap('Winedom_arrowleft.png');
    S.scale=0.4;
    S.x=400;
    S.y=373;
    Ct.addChild(S);
    var S = new createjs.Bitmap('Winedom_arrowright.png');
    S.scale=0.4;
    S.x=580;
    S.y=373;
    Ct.addChild(S);
    var T=new createjs.Text(itemA[itemID(vproname)].name,"24px serif","white");
    T.x=360;
    T.y=120;
    Ct.addChild(T);
    var T=new createjs.Text(" ×"+vpronum+"/"+UserItem[vproname],"24px serif","white");
    T.x=360+220;
    T.y=120;
    Ct.addChild(T);
    var S = new createjs.Bitmap('Winedom_arrowdown.png');
    S.scale=0.3;
    S.x=490;
    S.y=160;
    Ct.addChild(S);
    for(var i=0;i<vmatnameA.length;i++){
      var T=new createjs.Text("　","24px serif","white");
      T.x=360;
      T.y=210+30*i;
      Ct.addChild(T);
      var P=UserLibrary[vmatnameA[i]]
      if(P==0){
      T.text="？？？";
      T.color="#eddb66";
      }else{
      T.text=itemA[itemID(vmatnameA[i])].name;
      }
      var T=new createjs.Text("×"+vmatnumA[i],"24px serif","white");
      T.x=360+220
      T.y=210+30*i;
      Ct.addChild(T); 
    }
  };
  if(type==1 || type==3){//錬成プレビュー
    //錬成は選んで錬成の関係で下記
    AssemCompare(product,type,loop);
    if(type==3){return true};
    //描画と錬成可否判定
    if(loop>0){
    var loopT;
    for(var i=0;i<vmatnameA.length;i++){
      //現在最大限回せるループ数
        loopT=Math.floor(UserItem[vmatnameA[i]]/vmatnumA[i]);
        if(loop>loopT){loop=loopT};
      }
      };
    if(loop<=0){loop=1}
    vpronum=vpronum*loop;
      for(var i=0;i<vmatnumA.length;i++){
        vmatnumA[i]*=loop;
        }
      var shape = new createjs.Shape();
      shape.graphics.beginFill("black");
      shape.graphics.drawRect(350, 80, 320, 380);
      shape.alpha=0.7
      Ct.addChild(shape);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#bae0c3");
      shape.graphics.beginStroke("#617d68");
      shape.graphics.setStrokeStyle(2);
      shape.graphics.drawRect(350, 60, 320, 40);
      Ct.addChild(shape);
      var T=new createjs.Text("いくつ錬成する？","24px serif","#46574a");
      T.x=360;
      T.y=65;
      Ct.addChild(T);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#bae0c3");
      shape.graphics.beginStroke("#617d68");
      shape.graphics.setStrokeStyle(2);
      shape.graphics.drawRect(350, 370, 160, 50);
      Ct.addChild(shape);
      shape.addEventListener("click", {type:type,product:product,loop:loop-1,handleEvent:Alchemyset});
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#bae0c3");
      shape.graphics.beginStroke("#617d68");
      shape.graphics.setStrokeStyle(2);
      shape.graphics.drawRect(510, 370, 160, 50);
      Ct.addChild(shape);
      shape.addEventListener("click", {type:type,product:product,loop:loop+1,handleEvent:Alchemyset});
      var S = new createjs.Bitmap('Winedom_arrowleft.png');
      S.scale=0.4;
      S.x=400;
      S.y=373;
      Ct.addChild(S);
      var S = new createjs.Bitmap('Winedom_arrowright.png');
      S.scale=0.4;
      S.x=580;
      S.y=373;
      Ct.addChild(S);
      var Y=120;
      var Can=0;
      for(var i=0;i<vmatnameA.length;i++){
        if(UserLibrary[vmatnameA[i]]==0){
          Can+=1;
          var T=new createjs.Text("　","24px serif","#ff3f38");
          T.x=360;
          T.y=Y;
          Ct.addChild(T);
          var TT=new createjs.Text("　","24px serif","#ff3f38");
          TT.x=360+220;
          TT.y=Y;
          Ct.addChild(TT);     
        }else if(vmatnumA[i]>UserItem[vmatnameA[i]]){
          Can+=1;
          var T=new createjs.Text("　","24px serif","#3898ff");
          T.x=360;
          T.y=Y;
          Ct.addChild(T);
          var TT=new createjs.Text("　","24px serif","#3898ff");
          TT.x=360+220;
          TT.y=Y;
          Ct.addChild(TT);        
        }else{
          var T=new createjs.Text("　","24px serif","white");
          T.x=360;
          T.y=Y;
          Ct.addChild(T);
          var TT=new createjs.Text("　","24px serif","white");
          TT.x=360+220;
          TT.y=Y;
          Ct.addChild(TT);     
        }
         T.text=itemA[itemID(vmatnameA[i])].name;
         TT.text="×"+vmatnumA[i]+"/"+UserItem[vmatnameA[i]]
        Y+=30;
      };
      Y+=10;
      var S = new createjs.Bitmap('Winedom_arrowdown.png');
      S.scale=0.3;
      S.x=490;
      S.y=Y;
      Ct.addChild(S);
      Y+=50;
      var T=new createjs.Text(itemA[itemID(vproname)].name,"24px serif","white");
      T.x=360;
      T.y=Y;
      Ct.addChild(T);
      var T=new createjs.Text("×"+vpronum+"/"+UserItem[vproname],"24px serif","white");
      T.x=360+220;
      T.y=Y;
      Ct.addChild(T);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#bae0c3");
      shape.graphics.beginStroke("#617d68");
      shape.graphics.setStrokeStyle(2);
      shape.graphics.drawRect(350, 420, 320, 40);
      Ct.addChild(shape);
      if(Can==0){
      shape.addEventListener("click", {type:3,product:product,loop:loop,handleEvent:Crisonaset});
      }else{
        shape.graphics.beginFill("black");
        shape.graphics.drawRect(350, 420, 320, 40);
        shape.alpha=0.7;
        Ct.addChild(shape);
      }
      var T=new createjs.Text("OK","26px serif","#46574a");
      T.x=490;
      T.y=422;
      Ct.addChild(T);
  }
};
function AssemCompare(product,type,loop){
  //type 0の時はその際代入されたvmatnameA,vmatnumAとの比較を行う
  //type -1の時はuseritem内に所持している要素があるかどうか レシピ閃きに必要
  var arr1=[];
  var arr2=[];
  vpronum=1;
  switch (product){
    case 1:
      if(UserItem[133]>0){
      arr1.push(69);
      arr2.push(1);
      }else{
      arr1.push(69,10,51);
      arr2.push(3,8,2);
      }
      break;
    case 2:
      if(UserItem[133]>0){
        arr1.push(70);
        arr2.push(1);
        }else{
      arr1.push(1,11,27,37);
      arr2.push(1,3,10,4);
        }
      break;
    case 3:
      if(UserItem[133]>0){
        arr1.push(71);
        arr2.push(1);
        }else{
      arr1.push(1,11,32,144);
      arr2.push(1,3,10,4);
        }
      break;
    case 4:
      if(UserItem[133]>0){
        arr1.push(72);
        arr2.push(1);
        }else{
      arr1.push(1,88,38,143);
      arr2.push(1,3,1,3);
        }
      break;
    case 7:
      arr1.push(6,37);
      arr2.push(6,2);
      break;
    case 8:
      arr1.push(7,141);
      arr2.push(2,1);
      vpronum=4;
      break;
    case 9:
      arr1.push(7,8);
      arr2.push(3,4);
      break;
    case 11:
      arr1.push(10,57);
      arr2.push(1,3);
      break;  
    case 28:
      arr1.push(27,17,136);
      arr2.push(4,5,8);
      break;
    case 48:
      arr1.push(47,16);
      arr2.push(1,3);
      break;
    case 59:
      arr1.push(58,61);
      arr2.push(3,1);
      break;  
    case 67:
      arr1.push(66,59,68);
      arr2.push(3,1,1);
      break;  
    case 68:
      arr1.push(16,141);
      arr2.push(3,1);
      break;  
    case 78:
      arr1.push(79,64,67,28,11);
      arr2.push(3,3,2,1,8);
      break;  
    case 81:
      arr1.push(60,54);
      arr2.push(1,15);
      break;
    case 82:
      arr1.push(15,136);
      arr2.push(10,1);
      break;
    case 83:
      arr1.push(34,8);
      arr2.push(16,4);
      break;
    case 84:
      arr1.push(24,25,10);
      arr2.push(1,2,2);
      break;
    case 85:
      arr1.push(24,26,10);
      arr2.push(1,2,2);
      break;
    case 86:
      arr1.push(24,30,10);
      arr2.push(1,1,2);
      break;
    case 87:
      arr1.push(11,137,53);
      arr2.push(3,1,2);
      break;
    case 88:
      arr1.push(11,52,36);
      arr2.push(3,1,2);
      break;
      //水晶玉
    case 89:
      arr1.push(81,6,12);
      arr2.push(1,2,3);
      break;
    case 90:
      arr1.push(81,67,37);
      arr2.push(1,1,3);
      break;
    case 91:
      arr1.push(81,40,19);
      arr2.push(1,2,3);
      break;
    case 92:
      arr1.push(81,142,43);
      arr2.push(1,2,3);
      break;
    case 93:
      arr1.push(81,18,13);
      arr2.push(1,2,3);
      break;
    case 94:
      arr1.push(81,41,39);
      arr2.push(1,2,3);
      break;
    case 96:
      arr1.push(95,142);
      arr2.push(1,3);
      break;
    case 97:
      arr1.push(96,139,37);
      arr2.push(1,3,2);
      break;
    case 98:
      vpronum=3;
      arr1.push(41,12,71);
      arr2.push(3,4,1);
      break;
    case 99:
      vpronum=3;
      arr1.push(16,64,151);
      arr2.push(2,3,5);
      break;
    case 100:
      arr1.push(34,99,103);
      arr2.push(5,1,2);
      break;
    case 101:
      arr1.push(141,59,64);
      arr2.push(3,1,2);
      break;
    case 102:
      arr1.push(50,34,6);
      arr2.push(3,2,3);
      break;
    case 103:
      arr1.push(8,43);
      arr2.push(1,3);
      break;
    case 104:
      arr1.push(19,30);
      arr2.push(3,1);
      break;
    case 105:
      vpronum=2;
      arr1.push(22,25,29,152);
      arr2.push(3,2,5,1);
      break;
    case 106:
      arr1.push(55,61,64);
      arr2.push(6,3,1);
      break;
    case 107:
      arr1.push(49,30);
      arr2.push(1,2);
      break;
    case 108:
      vpronum=3;
      arr1.push(30,25,26);
      arr2.push(4,5,6);
      break;
    case 109:
      arr1.push(50,36);
      arr2.push(3,1);
      break;
    case 110:
      //竜牙爆砕
      arr1.push(23,150,36,10);
      arr2.push(3,1,2,1);
      break;
    case 111:
      //回向返照
      arr1.push(26,53,21,10);
      arr2.push(3,2,1,1);
      break;
    case 112:
      arr1.push(145,151);
      arr2.push(1,3);
      break;
    case 113:
      vpronum=3;
      arr1.push(10,22,5);
      arr2.push(3,2,1);
      break;
    case 114:
      vpronum=3;
      arr1.push(10,31,17);
      arr2.push(3,5,1);
      break;
    case 115:
      arr1.push(145,35);
      arr2.push(1,3);
      break;
    case 116:
      arr1.push(32,29,31);
      arr2.push(2,3,2);
      break;
    case 117:
      vpronum=3;
      arr1.push(40,10,138);
      arr2.push(5,1,2);
      break;
    case 118:
      arr1.push(117,143,18);
      arr2.push(1,2,3);
      break;
    case 119:
      vpronum=3;
      arr1.push(10,50,27);
      arr2.push(2,3,1);
      break;
    case 120:
      vpronum=3;
      arr1.push(145,50,51);
      arr2.push(2,3,1);
      break;
    case 121:
      vpronum=3;
      arr1.push(145,50,151);
      arr2.push(2,3,1);
      break;
    case 122:
      arr1.push(145,50,35,23);
      arr2.push(1,4,2,3);
      break;
    case 123:
      arr1.push(46,13);
      arr2.push(3,1);
      break;
    case 124:
      arr1.push(30,27,141);
      arr2.push(1,1,1);
      break;
    case 125:
      arr1.push(42,27,12);
      arr2.push(1,2,1);
      break;
    case 126:
      arr1.push(46,26,36);
      arr2.push(1,3,2);
      break;
    case 127:
      vpronum=3;
      arr1.push(50,46,152,10);
      arr2.push(5,3,2,3);
      break;
    case 128:
      arr1.push(109,116,126);
      arr2.push(1,1,1);
      break;
    case 129:
      arr1.push(41,42,157);
      arr2.push(2,3,1);
      break;
    case 130:
      vpronum=5;
      arr1.push(50,145,24,51);
      arr2.push(8,5,2,1);
      break;
    case 131:
      arr1.push(48,39,20);
      arr2.push(10,1,3);
      break;
    case 132:
      arr1.push(68,64,102,52);
      arr2.push(5,3,2,2);
      break;
    case 133:
      arr1.push(131,149,144);
      arr2.push(1,1,2);
      break;
    case 135:
      arr1.push(78,153,144);
      arr2.push(1,2,4);
      break;
    case 144:
      vpronum=2;
      arr1.push(71,55);
      arr2.push(1,3);
      break;
    case 145:
      vpronum=3;
      arr1.push(33,51,10,141);
      arr2.push(4,2,3,1);
      break;
    case 147:
      vpronum=2;
      arr1.push(101,103);
      arr2.push(1,3);
      break;
    case 148:
      arr1.push(60,102,92);
      arr2.push(5,3,1);
      break;
    case 149:
      arr1.push(138,142,72);
      arr2.push(1,2,1);
      break;
    case 154:
      vpronum=3;
      arr1.push(13,10);
      arr2.push(2,3);
      break;
    case 155:
      vpronum=3;
      arr1.push(12,10);
      arr2.push(2,3);
      break;
    case 156:
      arr1.push(140,80,70);
      arr2.push(1,2,3);
      break;
    case 158:
      arr1.push(135,147,62);
      arr2.push(1,1,1);
      break;
    case 134:
      //がらくた
      arr1=vmatnameA.concat();
      arr2=vmatnumA.concat();
      break;
   default:
  return false;
  }
  if(type==-1){
    for(var i=0;i<arr1.length;i++){
      if(UserItem[arr1[i]]>0){
        return true;
      }
    }
    return false;
  }
  if(type==0){
    return vmatNumCompare(arr1,vmatnameA,arr2,vmatnumA)
  }
    vmatnameA=arr1.concat();
    vmatnumA=arr2.concat();
  if(type==3){Alchemy(1,[product],vpronum,vmatnameA,vmatnumA,loop);};
}
  function Alchemy(type=0,product,pnum,materialA,mnumA,loop=1){
  //type0=>product to materials, type1=>materials to product
  //結果画面描画用意
  var KitAry=[];
  if(type==0){
  //ドン
  opLock=10;
  cookready(3+loop,"加工中・・・");
  UserItem[product]-=pnum*loop;
  var J=0;
  for(var i=0;i<materialA.length;i++){
    UserItem[materialA[i]]+=mnumA[i]*loop;
    if(UserLibrary[materialA[i]]==0){
      UserLibrary[materialA[i]]=1};
    if(UserItem[materialA[i]]>itemMax[itemMax[0]]){UserItem[materialA[i]]=itemMax[itemMax[0]]};
    if(materialA[i]==74 || materialA[i]==75 || materialA[i]==76){
      //クリソナ特殊裁定
      for(var j=0;j<mnumA[i]*loop;j++){
      var A=(70+(materialA[i]-74)*10+(Math.random()*100)/10).toFixed(1)+UserStatus[3];
      if(A<90){A=Math.floor(A)};
      if(A>99.9){A=99.9};
      Crisona.push(A);
      if(j==6){
        var t=new createjs.Text("ほか合計"+mnumA[i]*loop+"つのアイテムを獲得しました","20px serif","white");
        t.x=230;
        t.y=150+30*i+30*j;
        Ct.addChild(t);
      }else if(j<6){
      var t=new createjs.Text(itemA[itemID(materialA[i])].name+"（純度"+A+"%) ×1","24px serif","white");
      t.x=230;
      t.y=150+30*i+30*j;
      Ct.addChild(t);
      }
      }
      J+=mnumA;
    }else{
    if(UserLibrary[materialA[i]]==0){
      UserLibrary[materialA[i]]=1;
      var t=new createjs.Text("new item!!","20px serif","white");
      t.x=220;
      t.y=150+30*i+30*J;
      Ct.addChild(t);
      }
    var t=new createjs.Text(itemA[itemID(materialA[i])].name+"×"+mnumA[i]*loop,"24px serif","white");
    t.x=330;
    t.y=150+30*i+30*J;
    Ct.addChild(t);
    }
    InvConfig(0);
    if(!debugmode){saveLocal();}
  }
  Ct.removeAllChildren();
  Ct.alpha=0;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("black");
  shape.graphics.beginStroke("white");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(200, 60, 400, 400);
  shape.alpha=0.7;
  Ct.addChild(shape);
  Cstar.x=270;
  Cstar.y=90;
  Cstar.rotation=-15;
  Cstar.scale=0.7
  Ct.addChild(Cstar);
  var t=new createjs.Text("RESULT","32px serif","orange");
  t.x=320;
  t.y=90;
  Ct.addChild(t);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#f06787");
  shape.graphics.drawRect(330, 350, 105, 60);
  Ct.addChild(shape);
  if(Crisona.length && henirarea[0].cleared==2){
  shape.addEventListener("click", {card:1,handleEvent:AssembleTurt});
  function AssembleTurt(){
    se11.play();
    field.removeAllChildren();
    opLock=0;
    Titleyard.alpha=1;
    henirarea[0].cleared=3;
    PathTalk(1);
  }
  }else{
  shape.addEventListener("click", {card:1,handleEvent:Assemble});
  }
  var t=new createjs.Text("OK","bold 24px 'メイリオ'","white");
  t.x=360;
  t.y=365;
  Ct.addChild(t); 
  };
  if(type==1){
  //カッ
  opLock=10;
  //錬成には成功率が関与
  Ct.x=0;
  Ct.removeAllChildren();
  Ct.alpha=0;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("black");
  shape.graphics.beginStroke("white");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(200, 60, 400, 400);
  shape.alpha=0.7;
  Ct.addChild(shape);
  var R=Math.random()*100;
  if(debugmode){console.log(R,successRate)}
  if(R>successRate){
    //失敗
    cookready(5+loop,"錬成中・・・",false);
    product=73;
    pnum=1;
    var t=new createjs.Text("錬成失敗……","24px serif","white");
    t.x=330;
    t.y=140;
    Ct.addChild(t);
    }else{
    cookready(5+loop,"錬成中・・・");
    if(product==134){
    var t=new createjs.Text("調合失敗！","24px serif","white");
    }else{
    var t=new createjs.Text("錬成成功！","24px serif","white");
    }
    t.x=330;
    t.y=140;
    Ct.addChild(t);
    }
    var N=userRecipe.findIndex(value=>value<0);
    if(N!==-1){
    userRecipe[N]=-userRecipe[N];
    var t=new createjs.Text("「"+itemA[itemID(userRecipe[N])].name+"」の","24px serif","white");
    t.x=220;
    t.y=295;
    Ct.addChild(t);
    var t=new createjs.Text("レシピを記録しました！","24px serif","white");
    t.x=220;
    t.y=320;
    Ct.addChild(t);
  }
  Cstar.x=270;
  Cstar.y=90;
  Cstar.rotation=-15;
  Cstar.scale=0.7
  Ct.addChild(Cstar);
  var t=new createjs.Text("RESULT","32px serif","orange");
  t.x=320;
  t.y=90;
  Ct.addChild(t);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#f06787");
  shape.graphics.drawRect(330, 350, 105, 60);
  Ct.addChild(shape);
  shape.addEventListener("click", {card:2,handleEvent:Assemble});
  var t=new createjs.Text("OK","bold 24px 'メイリオ'","white");
  t.x=360;
  t.y=365;
  Ct.addChild(t);
  //クリソナを消費
  if(crisonaA[0]==2){
    UserItem[crisonaA[1]]-=1;
  }else{
    UserItem[crisonaA[0]]-=1;
    var A=Crisona.indexOf(crisonaA[1]);
    Crisona.splice(A,1);
  }
  UserItem[product]+=pnum*loop;
  if(UserItem[product]>itemMax[itemMax[0]]){UserItem[product]=itemMax[itemMax[0]]};
  if(product==74 || product==75 || product==76){
    //クリソナ特殊裁定
    for(var j=0;j<pnum*loop;j++){
    var A=(70+(product-74)*10+(Math.random()*100)/10).toFixed(1)+UserStatus[3];
    if(A<90){A=Math.floor(A)};
    if(A>99.9){A=99.9};
    Crisona.push(A);
    var t=new createjs.Text(itemA[itemID(product)].name+"（純度"+A+"%) ×1","24px serif","white");
    t.x=330;
    t.y=180+30*i+30*j;
    Ct.addChild(t);
    }
  }else{
  var t=new createjs.Text(itemA[itemID(product)].name+"×"+pnum*loop,"24px serif","white");
  t.x=330;
  t.y=180;
  Ct.addChild(t);
  }
  if(UserLibrary[product]==0){
    UserLibrary[product]=1;
    var t=new createjs.Text("new item!!","20px serif","white");
    t.x=220;
    t.y=180;
    Ct.addChild(t);
    }
  if(R>successRate || product==134){
    var t=new createjs.Text("素材は返還されます。","24px serif","white");
    t.x=260;
    t.y=270;
    Ct.addChild(t);
  }else{
    for(var i=0;i<materialA.length;i++){
      UserItem[materialA[i]]-=mnumA[i]*loop;
    }
  }
  InvConfig(0);
  if(!debugmode){saveLocal();}
  }
  function cookready(length=20,word="加工中・・・",success=true){
    var DL= new createjs.Bitmap("soL_dialogue.png");
    DL.scale=1.7;
    DL.x=200;
    DL.y=180;
    field.addChild(DL);
    KitAry.push(DL);
    createjs.Tween.get(DL)
    var t=new createjs.Text(word,"bold 26px 'メイリオ'","black");
    t.x=245;
    t.y=200;
    field.addChild(t);
    KitAry.push(t);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("black");
    shape.graphics.drawRect(250, 365, 300, 10);
    shape.alpha=0.7;
    KitAry.push(shape)
    field.addChild(shape);
    var Box2 = new createjs.Bitmap("Card_images/soL_SDicon.png");
    Box2.x=340;
    Box2.y=255;
    Box2.scale=0.9
    field.addChild(Box2);
    KitAry.push(Box2);
    createjs.Tween.get(Box2,{loop:true})
    .to({y:Box2.y-10},5)
    .wait(800)
    .to({y:Box2.y},5)
    .wait(800)
    window.requestAnimationFrame((ts)=>Cook(ts,length,0,0,success));
    }
  function Cook(ts,length=20,tflame=0,sf=0,success){
    tflame+=1;
    if(tflame>length){
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgb(244,177,131)");
      shape.graphics.drawRect(250+30*sf, 365, 30, 10);
      KitAry.push(shape)
      field.addChild(shape);
      sf+=1;
      tflame=0;
    }
    if(sf>10){
      for(var i=0;i<KitAry.length;i++){
        field.removeChild(KitAry[i]);
      };
      KitAry=[];
      if(success){se10.play()}else{se25.play()};
      Ct.alpha=1;
      cLock=true;
    }else{
    window.requestAnimationFrame((ts)=>Cook(ts,length,tflame,sf,success));
    }
  }
  };
function Formula(e,type,product){
  //調合レシピと照合する
  //ALchemyへのつなぎ,type0=>プレビュー画面表示 1->+1 -1->-1 2=>実行
  if(opLock==10 || opLock==13){return false};
  se11.play();
  type=this.type;
  product=this.product;
  var Dex=134;//錬成産物代入用
  //グローバル変数を利用
  //vpronum=0
  //vmatnameA=[]
  //vmatnumA=[]
    vpronum=1;
    var A=vmatnameA.indexOf(product)
  if(type==1){
    if(A==-1){
      if(vmatnameA.length>=6){return false};
      vmatnameA.push(product);
      vmatnumA.push(1);
    }else{
      if(UserItem[product]<=vmatnumA[A]){return false};
      vmatnumA[A]+=1;
    }
  }else if(type==-1){
    if(A==-1){
      return false;
    }else{
      vmatnumA[A]-=1;
      if(vmatnumA[A]==0){
        vmatnameA.splice(A,1);
        vmatnumA.splice(A,1);
      }
    }
  }
    Ct.alpha=1;
    Ct.y=0;
    Ct.removeAllChildren();
    var shape = new createjs.Shape();
    shape.graphics.beginFill("black");
    shape.graphics.drawRect(350, 80, 320, 380);
    shape.alpha=0.7
    Ct.addChild(shape);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 60, 320, 40);
    Ct.addChild(shape);
    var T=new createjs.Text("調合アイテム選択","24px serif","#46574a");
    T.x=360;
    T.y=65;
    Ct.addChild(T);
    var Y=120;
    for(var i=0;i<vmatnameA.length;i++){
        var T=new createjs.Text("　","24px serif","white");
        T.x=360;
        T.y=Y;
        Ct.addChild(T);
        var TT=new createjs.Text("　","24px serif","white");
        TT.x=360+205;
        TT.y=Y;
        Ct.addChild(TT);     
        T.text=itemA[itemID(vmatnameA[i])].name;
        TT.text="×"+vmatnumA[i];
        var S = new createjs.Bitmap('icon_plus.png');
        S.scale=0.4;
        S.x=360+283;
        S.y=Y;
        Ct.addChild(S);
        S.addEventListener("click", {type:1,product:vmatnameA[i],handleEvent:Formula});
        var S = new createjs.Bitmap('icon_minus.png');
        S.scale=0.4;
        S.x=360+255;
        S.y=Y;
        Ct.addChild(S);
        S.addEventListener("click", {type:-1,product:vmatnameA[i],handleEvent:Formula});
        Y+=30;
    }
    Y+=10;
    var S = new createjs.Bitmap('Winedom_arrowdown.png');
    S.scale=0.3;
    S.x=490;
    S.y=Y;
    Ct.addChild(S);
    Y+=50;
    //レシピにあうものか判定
    var T=new createjs.Text("・・・","24px serif","white");
    T.x=360;
    T.y=Y;
    for(var i=0;i<assembleA.length;i++){
      //console.log(assembleA[i],AssemCompare(assembleA[i],0));
      if(assembleA[i]!==134){
      if(AssemCompare(assembleA[i],0)==-1){
        Dex=assembleA[i];
        if(userRecipe.indexOf(assembleA[i])!==-1){
        T.text=itemA[itemID(assembleA[i])].name;
        T.color="#66eda7"
        }else{
        T.text="？？？のレシピ"
        T.color="#eddb66"
        }
        se14.play();
        break;
      }else if(AssemCompare(assembleA[i],0)>0){
        //1->不足 2->過多 3->数は正しいが割合が合っていない
        //レシピ開発としては成功とする
        Dex=-assembleA[i];
        if(userRecipe.indexOf(assembleA[i])==-1){
        se14.play();
        T.text="？？？のレシピ"
        }
        break;
      }
    };
    }
    Ct.addChild(T);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 420, 320, 40);
    Ct.addChild(shape);
    if(vmatnumA.length>=2){
    shape.addEventListener("click", {type:4,product:Dex,loop:1,handleEvent:Crisonaset});
    }else{
      shape.graphics.beginFill("black");
      shape.graphics.drawRect(350, 420, 320, 40);
      shape.alpha=0.7;
      Ct.addChild(shape);
    }
    var T=new createjs.Text("OK","26px serif","#46574a");
    T.x=490;
    T.y=422;
    Ct.addChild(T);
  };
function Crisonaset(){
  if(opLock==12){
  opLock=13;
  se11.play();
  //Alchemysetプレビュー->Crisonaset->Alchemyset本番->Alchemy
  //type4->調合（組み合わせがOKならレシピを追加、組成も正しければ産物獲得）
  //錬成・選んで錬成→クリソナ選択→錬成実行まで
  createjs.Tween.get(Ct)
  .to({x:-260},100);
  for(var i=0;i<AsmAry.length;i++){
    AsmAry[i].alpha=0;
  }
    var Materialmap = new createjs.Container();
    var Matbar = new createjs.Shape();
    Matbar.graphics.beginFill("black");
    Matbar.graphics.drawRect(680, 80, 262, 380);
    Matbar.alpha=0.5;
    Ct.addChild(Matbar);
    Ct.addChild(Materialmap);
    AsmAry2.push(Matbar);
    AsmAry2.push(Materialmap);
    var H=UserItem.slice(0,4);
    var HH=H.filter(value=>value>0);
    var Hash=(HH.length+Crisona.length)*25;
    function MatDown(){
      dragPointX = stage.mouseX - Materialmap.x;
      dragPointY = stage.mouseY - Materialmap.y;
    }
    function MatMove(){
      Materialmap.y = stage.mouseY-dragPointY;
      if(Materialmap.y>0){Materialmap.y=0};
      if(this.hash<370 && Materialmap.y<0){Materialmap.y=0};
      if(this.hash>=370 && Materialmap.y<-(this.hash-370)){Materialmap.y=-(this.hash-370)};
    }
    Matbar.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
    Matbar.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(680, 60, 262, 35);
    Ct.addChild(shape);
    AsmAry2.push(shape);
    AsmAry2.push(T);
    var shapeMask3 = new createjs.Shape();
            shapeMask3.graphics
                  .beginFill("gold")
                  .drawRect(680, 80, 262, 400);
    Materialmap.mask = shapeMask3;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(350, 370, 320, 50);
  Ct.addChild(shape);
  AsmAry2.push(shape);
  AsmAry2.push(T);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(350, 420, 320, 40);
  Ct.addChild(shape);
  AsmAry2.push(shape);
  shape.addEventListener("click", {type:4,product:this.product,loop:this.loop,handleEvent:Alchemyset});
  var T=new createjs.Text("OK","26px serif","#46574a");
  T.x=490;
  T.y=422;
  Ct.addChild(T);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(680, 370, 262, 35);
  Ct.addChild(shape);
  AsmAry2.push(shape);
  AsmAry2.push(T);
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#bae0c3");
  shape.graphics.beginStroke("#617d68");
  shape.graphics.setStrokeStyle(2);
  shape.graphics.drawRect(680, 405, 262, 55);
  Ct.addChild(shape);
  AsmAry2.push(shape);
  AsmAry2.push(T);
  var T=new createjs.Text("クリソナ選択","24px serif","#46574a");
    T.x=685;
    T.y=64;
    Ct.addChild(T);
    AsmAry2.push(T);
  var I=0;
    for(var i=0;i<Crisona.length;i++){
        var t = new createjs.Shape();
        t.graphics.beginFill("black");
        t.graphics.drawRect(680, 100+25*i, 265, 25);
        t.alpha=0.6;
        Materialmap.addChild(t);
        AsmAry2.push(t);
        var C;
        if(Crisona[i]>=70 && Crisona[i]<80){
          C=74;
        }else if(Crisona[i]<90){
          C=75;
        }else{
          C=76;
        }
        var T=new createjs.Text(itemA[itemID(C)].name+"（純度"+Crisona[i]+"%）","20px serif","white");
        T.x=688;
        T.y=102+25*i;
        Materialmap.addChild(T);
        AsmAry2.push(T);
        t.addEventListener("click", {type:C,product:Crisona[i],handleEvent:Crisonaset_this});
        t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
        t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
        I+=1;
      }
      for(var i=0;i<4;i++){
        if(UserItem[i]>0){
          var t = new createjs.Shape();
          t.graphics.beginFill("black");
          t.graphics.drawRect(680, 100+25*I, 265, 25);
          t.alpha=0.6;
          Materialmap.addChild(t);
          AsmAry2.push(t);
          var T=new createjs.Text(itemA[itemID(i)].name+"　×"+UserItem[i],"20px serif","white");
          T.x=688;
          T.y=102+25*I;
          Materialmap.addChild(T);
          AsmAry2.push(T);
          t.addEventListener("click", {type:2,product:i,handleEvent:Crisonaset_this});
          t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
          t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
          I+=1;
        }
      }
      var T=new createjs.Text("選択中のクリソナ：","24px serif","#46574a");
      T.x=688;
      T.y=374;
      Ct.addChild(T);
      AsmAry2.push(T);
      var T=new createjs.Text("---","20px serif","#46574a");
      T.x=688;
      T.y=418;
      Ct.addChild(T);
      AsmAry2.push(T);
      var T=new createjs.Text("錬成成功率：---%","32px serif","#46574a");
      T.x=352;
      T.y=372;
      Ct.addChild(T);
      AsmAry2.push(T);
    function Crisonaset_this(){
      se11.play();
      if(this.type==2){
      AsmAry2[AsmAry2.length-2].text=itemA[itemID(this.product)].name;
      //成功率は素材数に応じて100
      successRate=75-5*vmatnameA.length+(this.product)*5;
      switch(this.product){
        case 0:
          successRate=100;
          break;
        case 1:
          if(vmatnameA.length<=2){successRate=100};
          break;
        case 2:
          if(vmatnameA.length<=3){successRate=100};
          break;
        case 3:
          if(vmatnameA.length<=4){successRate=100};
          break;
        case 4:
          if(vmatnameA.length<=5){successRate=100};
          break;
      }
      }else{
      AsmAry2[AsmAry2.length-2].text=itemA[itemID(this.type)].name+"（純度"+this.product+"%）";
      //成功率は(75-5*素材数)+(純度-70)*2
      successRate=75-5*vmatnameA.length+(this.product-70)*2
      if(successRate>100){successRate=100};
      }
      crisonaA=[this.type,this.product];
      AsmAry2[AsmAry2.length-1].text="錬成成功率："+successRate+"%"
    }
  }
};
  function Damage(P=0,Sid=0,subatk=0,subpow=0){
    //P 0->こっちの攻撃　1->あいての攻撃 id->スキルid subpow->入力されている場合は威力欄でこちらを参照する
    //命中判定
    //var StatusP=[100,100,100];//HP,ATK,DEF
    //var StatusE=[30,30,30,0];
    var ATK=1;
    var DEF=1;//攻撃・防御補正
    var X=22;//基本変数
    var result=0
  //ダメージ=攻撃側のレベル×2÷5+2→きりすて×威力×攻撃/防御　きりすて /50 +2 きりすて ×0.85-1.0の乱数　きりすて
  if(P==0){
      var R=Math.random()*100;
      var EE=Bufflist.findIndex(value=>value.name=="盲目")
      if(Pbuff.indexOf(EE)!==-1){
        R=Math.random()*70;
      }
      var Pow=Skilllist[Sid].power;
      if(UserItem[158]>0){Pow*=1.5};
      if(subpow>0){Pow=subpow};
      if(Skilllist[Sid].sp>0 && Skilllist[Sid].sp==StatusE[3]){
        //特攻判定 必中
        Pow*=2;
        R=0;
      }
      if(Skilllist[Sid].hitrate<R){
        result=-1;
        return result;
      }
    var EE=Bufflist.findIndex(value=>value.name=="闘魂ドリンク")
    var E=Pbuff.indexOf(EE)
    if(E!==-1){ATK=ATK*1.5};
    var EE=Bufflist.findIndex(value=>value.name=="マンドラタマネギ")
    var E=Pbuff.indexOf(EE)
    if(E!==-1){ATK=ATK*1.2};
    var EE=Bufflist.findIndex(value=>value.name=="闇の水晶玉")
    var E=Pbuff.indexOf(EE)
    if(E!==-1){ATK=ATK*0.7};
    var EE=Bufflist.findIndex(value=>value.name=="ジョイフルライト")
    var E=Pbuff.indexOf(EE)
    if(E!==-1){ATK=ATK*1.2;DEF=DEF*0.8};
    var EE=Bufflist.findIndex(value=>value.name=="風の水晶玉")
    var E=Ebuff.indexOf(EE)
    if(E!==-1){DEF=DEF*0.7};
  var RR=(85+Math.floor(Math.random()*16))/100
  if(subatk>0){
    result=Math.floor(RR*Math.floor(Math.floor(X*Pow*(subatk*ATK)/(StatusE[2]*DEF))/50+2));
  }else{
  result=Math.floor(RR*Math.floor(Math.floor(X*Pow*(StatusP[1]*ATK)/(StatusE[2]*DEF))/50+2));
  }
  if(debugmode){console.log('damage',P,Sid,result)};
  return result;
}else{
    var R=Math.random()*100;
    var EE=Bufflist.findIndex(value=>value.name=="盲目")
    if(Pbuff.indexOf(EE)!==-1){
      R=Math.random()*70;
    }
    if(Skilllist[Sid].hitrate<R){
      result=-1;
      return result;
    }
  var B=Bufflist.findIndex(value=>value.name=="スリング")
  if(Pbuff.indexOf(B)!==-1){
    result=-1;
    return result;
  };
  var Pow=Skilllist[Sid].power;
  var EE=Bufflist.findIndex(value=>value.name=="ナソードアーマー")
  var E=Pbuff.indexOf(EE)
  if(E!==-1){DEF=DEF*1.4};
  var EE=Bufflist.findIndex(value=>value.name=="ジョイフルライト")
  var E=Pbuff.indexOf(EE)
  if(E!==-1){DEF=DEF*1.8};
  var EE=Bufflist.findIndex(value=>value.name=="闇の水晶玉")
  var E=Ebuff.indexOf(EE)
  if(E!==-1){ATK=ATK*0.7};
  var EE=Bufflist.findIndex(value=>value.name=="レイジモード")
  var E=Ebuff.indexOf(EE)
  if(E!==-1){ATK=ATK*1.25};
  var RR=(85+Math.floor(Math.random()*16))/100
  result=Math.floor(RR*Math.floor(Math.floor(X*Pow*(StatusE[1]*ATK)/(StatusP[2]*DEF))/50+2));
  if(debugmode){console.log('damage',P,Sid,result)};
  return result;  
}
 }
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
    if(debugmode){console.log(e.keyCode,e.key,cLock)};
    var code = e.keyCode;
    //keyはString.fromCharCode(code)で取得
    if(cLock==0 && code !==27){
      return false;
    }
    if(e.keyCode==13 && key13==0){
      key13=1;//enter
      if(opLock==11 && cLock){
        MsgNext();
      }
      }
    if(e.keyCode==27 && key27==0){
      key27=1;//esc
      if(gamestate==0 && cLock){
        //メニューに戻る
        if(opLock==0){
          opLock=2;
          se11.play();
          if(playMode[0]==4){
            if(henirarea[0].cleared>1){
            Dialogue("QUIT GAME？","採取を途中で終了します",0,-1);     
            }       
          }else{
          Dialogue("QUIT GAME？","この盤面を途中で終了します",1,-1);
          }
        }
      }
      if(gamestate==5 && cLock){
        //メニューに戻る
        if(opLock==0){
          opLock=2;
          se11.play();
          Dialogue("EXIT？","ヘニルの時空の入り口に戻ります",6,-1);
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
      if(opLock==11 && cLock){
        MsgAry.splice(0,MsgAry.length-1);
        MsgNext();
      }
    }
    if(e.keyCode==119 && key119==0){
      key119=1;//F8
      if(gamestate==0 && cLock){
          //new game;
          if(opLock==0 && duelLog.length){
            if(playMode[0]!==4){
            opLock=2;
            se11.play();
            Dialogue("NEW GAME？","この盤面を放棄して新しいゲームを始めます",2,-1);
            }
          }
        }
      if(gamestate==1 && cLock){
        //次のゲームへ
        Gamestart();
      }
    }
    };
  function Dialogue(word,detail="　",yes=1,no=-1,ok=-1,okx=345,oky=300,okw=105,okh=60,ok2=-1,ok2x=345,ok2y=300,ok2w=105,ok2h=60){
    //ok 0->OKボタンにする
    Loadmap.removeAllChildren();
    Loadmap.alpha=1;
    Loadmap.x=800;
    var shape = new createjs.Shape();
    shape.graphics.beginFill("rgba(20,20,20,0.7)");
    shape.graphics.drawRect(0, 0, 800, 600);
    shape.alpha=0;
    Loadmap.addChild(shape);
    createjs.Tween.get(shape)
    .wait(120)
    .to({alpha:1},500);
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
    shape.graphics.drawRect(okx, oky, okw, okh);
    Loadmap.addChild(shape);
    shape.addEventListener("click", {card:yes,handleEvent:DialogueResult});
    var t=new createjs.Text(ok,"bold 24px 'メイリオ'","white");
    t.x=okx+okw/4;
    t.y=oky+okh/4;
    Loadmap.addChild(t); 
      if(ok2 !==-1){
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#ff3838");
      shape.graphics.drawRect(ok2x, ok2y, ok2w, ok2h);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {card:no,handleEvent:DialogueResult});
      var t=new createjs.Text(ok2,"bold 24px 'メイリオ'","white");
      t.x=ok2x+ok2w/4;
      t.y=ok2y+ok2h/4;
      Loadmap.addChild(t);
      }
    }
    createjs.Tween.get(Loadmap)
    .to({x:0},150);
    function DialogueResult(e){
      se7.play();
      switch(this.card){
        case 0:
          //game over for debug/henir
          Gameover();
          break;
        case 1:
          //game over
          Gameover(1);
          break;
        case 2:
          if(playMode[1]==1 && playMode[0]!==3){
            cleared[1][playMode[0]+2]+=1;              
            }else{
          cleared[1][playMode[0]-1]+=1;
            }
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
          TitleGrh();
          var t = new createjs.Text(titletext, "24px serif", "white");
          t.textAlign = "end";
          t.x=790;
          Titleyard.addChild(t);
          var t = new createjs.Text("音の設定ができます。（あとから変更可能）", "24px serif", "white");
          t.textAlign = "end";
          t.x=800;
          t.y=30;
          Titleyard.addChild(t);
          gamestate=11;
          Title();
          break;
        case 5:
          //ローカルストレージのデータを削除
          saveDel();
          break;
        case 6:
          Gameend();
          break;
        case 7:
          //アイテム消費
          //okxに臨時
          UserItem[okx]-=1;
          se10.play();
          switch(okx){
            case 84:
              UserStatus[4]=okx;
              PopAnm("次回採取で逃走時素材ゲット！",800,280,35,30,130);
            break;
            case 85:
              UserStatus[4]=okx;
              PopAnm("次回採取で連鎖カウント2倍！",800,280,35,30,130);
            break;
            case 86:
              UserStatus[4]=okx;
              PopAnm("次回採取でエンカウント率低下！",800,280,35,30,130);
            break;
            case 87:
              UserStatus[2]+=5;
              if(UserStatus[2]>=255){UserStatus[2]=255};
              PopAnm("防御力が5上がりました！",800,280,35,30,130);
              break;
            case 88:
              UserStatus[1]+=5;
              if(UserStatus[1]>=255){UserStatus[1]=255};
              PopAnm("攻撃力が5上がりました！",800,280,35,30,130);
              break;
            case 110:
              UserStatus[0]+=50;
              if(UserStatus[0]>=1000){UserStatus[0]=999};
              PopAnm("最大HPが50増加しました！",800,280,35,30,130);
              break;
            case 111:
              UserStatus[3]+=1;
              if(UserStatus[3]>20){UserStatus[3]=20};
              PopAnm("生成されるクリソナの純度が1%上昇します！",800,330,35,30,130);
              break;
          };
          InvConfig(0);
          saveLocal();
          break;
        default:
          //no
          if(this.card<-1){
            Loadmap.alpha=0;
            opLock=-this.card;
            return true;
          }
          break;
      }
      Loadmap.alpha=0;
      opLock=0;
    }}
  function MsgNext(p=-1){
  if(cLock){
  if(MsgAry.length){
    if(p!==-1){se7.play()};
    var Ary=MsgAry.shift();
    if(MsgAry.length && MsgAry[0][0]=="end"){MsgAry.shift()};
    switch(Ary.length){
    case 1:
      Message(Ary[0]);
      break;
    case 2:
      Message(Ary[0],Ary[1]);
      break;
    case 3:
      Message(Ary[0],Ary[1],Ary[2]);
      break;
    case 4:
      Message(Ary[0],Ary[1],Ary[2],Ary[3]);
      break;
    case 5:
      Message(Ary[0],Ary[1],Ary[2],Ary[3],Ary[4]);
      break;
    case 6:
      Message(Ary[0],Ary[1],Ary[2],Ary[3],Ary[4],Ary[5]);
      break;
    }
  }else{
    Loadmap.removeAllChildren();
    opLock=0;
  }}};
  function Message(word,detail="　",chr=0,chrop=0,textspeed=3,first=0){
    //chrop->差分グラフィックあれば -1->alpha 0
    cLock=false;
    if(first==1){
      opLock=11;
      Loadmap.removeAllChildren();
      Loadmap.alpha=1;
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(20,20,20,0.7)");
      shape.graphics.drawRect(0, 0, 800, 600);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {handleEvent:MsgNext});
      var t=new createjs.Bitmap("Esc_enter.png");
      t.scale=0.7;
      Loadmap.addChild(t);
      if(MessageText[1].length){
        for(var i=0;i<MessageText[1].length;i++){
          Loadmap.removeChild(MessageText[1][i]);
        }
        MessageText[1]=[];
      };
      var DL= new createjs.Bitmap(Chara_src[0]);
      DL.scale=600/768;
      DL.alpha=0;
      DL.x=-30;
      DL.y=5;
      Loadmap.addChild(DL);
      MessageText[1].push(DL);
      var DL= new createjs.Bitmap(Chara_src[1]);
      DL.scale=600/768;
      DL.alpha=0;
      DL.x=400;
      DL.y=5;
      Loadmap.addChild(DL);
      MessageText[1].push(DL);
      MessageText[3]=-2;
      }
    if(detail=="end"){
      if(MessageText[4].length){
        for(var i=0;i<MessageText[4].length;i++){
          createjs.Tween.get(MessageText[4][i])
          .to({alpha:0},300)
          .call(next)
          function next(){
          Loadmap.removeChild(MessageText[4][i]);
          }
        }
        MessageText[4]=[];
        word="　";
        detail="（空間の亀裂は再び閉じてしまった）";
      };
    }
    switch(word){
      case "henir":
        Loadmap.removeAllChildren();
        opLock=0;
        menu(0,1);
        cLock=true;
        return false;
      case "henirmenu":
        Loadmap.removeAllChildren();
        Dialogue("ヘニルの時空","特定のアイテムを使いポータルを活性化すると&ヘニルの時空へ飛び込むことができます。",-1,-1,"OK");
        cLock=true;
        return false;
      case "assem":
        Loadmap.removeAllChildren();
        Dialogue("錬金術が解放されました","手に入れた素材を加工したり、錬成して、&新しいアイテムを生み出しましょう。",-1,-1,"OK",350,340,80,35);
        var Opicon3 = new createjs.Bitmap("soL_opicon3.png");
        Opicon3.x=610;
        Opicon3.y=540;
        Titleyard.addChild(Opicon3);
        if(UserLibrary.indexOf(1)!==-1){
          Opicon3.addEventListener("click", {handleEvent:AsmConfig});
        }
        cLock=true;
        return false;
      case "recip":
        Loadmap.removeAllChildren();
        Dialogue("レシピからの錬成","素材とクリソナを使って錬成が行えます。&レシピはソリティアをプレイしているうちに&判明することがあります。",-1,-1,"OK",350,340,80,35);
        var Opicon3 = new createjs.Bitmap("soL_opicon3.png");
        Opicon3.x=610;
        Opicon3.y=540;
        Titleyard.addChild(Opicon3);
        cLock=true;
        return false;
      case "recip2":
        Loadmap.removeAllChildren();
        Dialogue("選んで錬成","素材と自由に選んで錬成が行えます。&素材の組み合わせ次第で、&新たなレシピを生み出せるでしょう。",-1,-1,"OK",350,340,80,35);
        var Opicon3 = new createjs.Bitmap("soL_opicon3.png");
        Opicon3.x=610;
        Opicon3.y=540;
        Titleyard.addChild(Opicon3);
        cLock=true;
        return false;
      case "end":
        Loadmap.removeAllChildren();
        opLock=0;
        cLock=true;
        return false;
      case "book":
        word="　";
        detail="　";
        var shape = new createjs.Shape();
          shape.graphics.beginStroke("white");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(290,90,245,245);
          Loadmap.addChild(shape);
        var T=new createjs.Bitmap("Card_images/soL_elbook.png");
          T.x=300;
          T.y=100;
          T.alpha=0;
          T.scale=2;
          createjs.Tween.get(T)
          .to({alpha:1},300);
          Loadmap.addChild(T);
        break;
      case "bg5":
        if(detail=="start"){
          word="　";
          detail="……";
          var shape = new createjs.Shape();
          shape.graphics.beginStroke("white");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(290,90,245,245);
          Loadmap.addChild(shape);
          MessageText[4].push(shape);
          var T=new createjs.Bitmap("Don_bg5.png");
          T.sourceRect = {x: 150,y: 50,width : 450,height: 450}
          T.x=300;
          T.y=100;
          T.alpha=0;
          T.scale=0.5;
          createjs.Tween.get(T)
          .to({alpha:1},300);
          Loadmap.addChild(T);
          MessageText[4].push(T);
        }
        break;
      case "Cut_1":
        //背景を表示
        if(musicnum!==20){
          Bgm.stop();
          musicnum=20;
          if(mute=="ON"){
          Bgm=new Music(bgm20data);
          Bgm.playMusic();
          }}
        var T=new createjs.Bitmap("Card_images/soL_scene1.png");
          T.alpha=0;
          T.scale=0.75;
          T.x=40;
          createjs.Tween.get(T)
          .to({alpha:1},800);
          Loadmap.addChild(T);
          MessageText[4].push(T);
          cLock=true;
          MsgNext();
          return false;
        case "Cut_2":
          //背景を表示
          var T=new createjs.Bitmap("Card_images/soL_scene2.png");
            T.alpha=0;
            T.scale=0.75;
            T.x=40;
            createjs.Tween.get(T)
            .to({alpha:1},800);
            Loadmap.addChild(T);
            MessageText[4].push(T);
            cLock=true;
            MsgNext();
            return false;
          case "Cut_3":
            //背景を表示
            if(musicnum!==8){
              Bgm.stop();
              musicnum=8;
              if(mute=="ON"){
              Bgm=new Music(bgm8data);
              Bgm.playMusic();
              }}
            var T=new createjs.Bitmap("Card_images/soL_scene3.png");
              T.alpha=0;
              T.scale=800/1024;
              createjs.Tween.get(T)
              .to({alpha:1},800);
              Loadmap.addChild(T);
              MessageText[4].push(T);
              cLock=true;
              MsgNext();
              return false;
            case "Cut_5":
              var T=new createjs.Bitmap("Card_images/soL_clearBG.png");
                T.alpha=0;
                T.scale=960/1024;
                createjs.Tween.get(T)
                .to({scale:800/1024,alpha:1},1200);
                Loadmap.addChild(T);
                MessageText[4].push(T);
                cLock=true;
                MsgNext();
                return false;
            case "Cut_4":
          //クリア画面
          var T = new createjs.Shape();
          T.graphics.beginFill("rgba(255,255,255,1)");
          T.graphics.drawRect(0, 0, 800, 600);
          T.alpha=0;
          createjs.Tween.get(T)
          .to({alpha:1},800)
            cLock=true;
            MsgNext();
            return false;
            case "game_over":
          var T = new createjs.Shape();
          T.graphics.beginFill("rgba(255,255,255,1)");
          T.graphics.drawRect(0, 0, 800, 600);
          T.alpha=1;
          field.addChild(T);
          Loadmap.removeAllChildren();
          opLock=0;
          //failed...
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
          clearBG.addChild(Cstar);
          var shape = new createjs.Shape();
          shape.graphics.beginFill("black");
          shape.graphics.drawRect(0, 0, 800, 600);
          shape.alpha=0;
          clearBG.addChild(shape);
          createjs.Tween.get(shape)
          .to({x:0,alpha:0.3},900)
          .wait(1000)
          .call(Next)  
          var t=new createjs.Text("F","bold 64px  メイリオ","#d14d4d");
          t.x=610;
          t.y=305;
          clearBG.addChild(t);    
          clearBG.addChild(t);
          clear_4.x=-20;
          clear_4.y=-20;
          clear_4.alpha=0;
          clearBG.addChild(clear_4);
          createjs.Tween.get(clear_4)
          .wait(450)
          .to({x:20,alpha:1},300)
          function Next(){
          retry_bt2.x=600;
          retry_bt2.y=520;
          clearBG.addChild(retry_bt2);
          cLock=true;
          }
          return false;
          case "white_out":
        //背景を表示
        var T = new createjs.Shape();
          T.graphics.beginFill("rgba(255,255,255,1)");
          T.graphics.drawRect(0, 0, 800, 600);
          T.alpha=0;
          createjs.Tween.get(T)
          .to({alpha:1},800);
          Loadmap.addChild(T);
          MessageText[4].push(T);
          cLock=true;
          MsgNext();
        return false;
        case "black_out":
          //背景を表示
          var T = new createjs.Shape();
            T.graphics.beginFill("rgba(0,0,0,1)");
            T.graphics.drawRect(0, 0, 800, 600);
            T.alpha=0;
            createjs.Tween.get(T)
            .to({alpha:1},800)
            .call(Nex)
            Loadmap.addChild(T);
            MessageText[4].push(T);
            function Nex(){
            if(musicnum!==3){
              Bgm.stop();
              musicnum=3;
              if(mute=="ON"){
              Bgm=new Music(bgm3data);
              Bgm.playMusic();
              }}
            cLock=true;
            MsgNext();
            };
          return false;
          case "end of log":
            //メッセージ枠を削除
            Loadmap.removeAllChildren();
            opLock=0;
            var T=new createjs.Bitmap("Card_images/soL_clear.png");
            T.alpha=0;
            T.scale=800/1024;
            createjs.Tween.get(T)
            .to({alpha:1},400)
            clearBG.addChild(T);
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
                .to({x:0,alpha:1},300)
                .wait(1000)
                .call(nextgame)
                var Rank="SS";
                    var t=new createjs.Text("Get item","24px メイリオ","white");
                    t.x=600;
                    t.y=100;
                    clearBG.addChild(t);
                    var A=itemA.findIndex(value=>value.name=="虹霓球")
                    t= new createjs.Text(itemA[A].name+"×1", "bold 20px 'メイリオ'", "#f06787");
                    t.x=580;
                    t.y=130;
                    clearBG.addChild(t);
                    UserItem[itemA[A].id]+=1;
                    if(UserItem[itemA[A].id]>itemMax[itemMax[0]]){UserItem[itemA[A].id]=itemMax[itemMax[0]]};
                    if(UserLibrary[itemA[A].id]==0){UserLibrary[itemA[A].id]=1};
                    InvConfig(0);
                    var t=new createjs.Text(Rank,"bold 64px  メイリオ","#d14d4d");
                    t.x=610;
                    t.y=330;
                    clearBG.addChild(t);
                    clear_3.x=0;
                    clear_3.y=-20;
                    clear_3.alpha=0;
                    Letterbox.push(["提供","クリア記念品","ここまでのプレイ、&ありがとうございます！&脱出を記念して、装備すると&クロンダイク・マグマンタを&通常と少し異なるルールで&遊べるアイテムを贈呈します。","ピッケル"]);                      
                    if(Exlists.length>4){
                      createjs.Tween.get(Exlists[5])
                      .to({x:-200,alpha:0},300)
                      .call(ex5);
                    }
                    function ex5(){
                    field.removeChild(Exlists[5])
                    }
              function nextgame(){
                var RT=new createjs.Bitmap("soL_option_bt5.png");
                RT.x=600;
                RT.y=520;
                clearBG.addChild(RT);
                RT.addEventListener("click", {handleEvent:Ending});
                cLock=true;
              };
            //
            function Ending(){
              //えんどろーる
            cLock=false;
            stage.addChild(Ct);
            Ct.removeAllChildren();
            Ct.x=0;
            Ct.y=0;
            Ct.alpha=1;
            var T = new createjs.Shape();
            T.graphics.beginFill("rgba(0,0,0,1)");
            T.graphics.drawRect(0, 0, 800, 5700);
            T.alpha=0;
            Ct.addChild(T);
            createjs.Tween.get(T)
            .to({alpha:1},1000)
            .wait(100)
            .call(rem);
            function rem(){
              field.removeAllChildren();
              clearBG.removeAllChildren();
              if(musicnum!==0){
                Bgm.stop();
                musicnum=0;
                };
              jingle.play();
              createjs.Tween.get(Ct)
              .to({y:-5100},70000)
              .wait(1500)
              .call(returnBt);
            }
            function returnBt(){
              var RTB = new createjs.Bitmap("soL_retry_bt2.png");
              RTB.scale=1.5;
              RTB.x=300;
              RTB.y=5500;
              Ct.addChild(RTB);
              RTB.addEventListener("click", {handleEvent:End});
            }
            function End(){
              stage.removeChild(Ct);
              Gameend();
            }
            var Ary=[];
            var t=new createjs.Text("リティアのソリティア","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("原作","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("Elsword　KOG Studios","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("音楽","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("PeriTune.com","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Whistling_Winds」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Daybreak」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Soft_Day2」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Foreboding」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「EpicBattle_Deity」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Lost_place5」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「Irregular」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("From Elsword music","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「エルの樹」「天上の岐路」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「アルテラ平原」「ディシオン採掘場」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「トロッシュの巣」「影の鉱脈」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("-該当ステージbgm","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「ザヤ山」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("-ベスマ湖 ステージbgm","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("<耳コピアレンジ>/提供","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("リティアテーマソング「Milestone」","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("<耳コピアレンジ>/提供","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("効果音","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("Springin' Sound Stock","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("効果音ラボ","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("くらげ工匠","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("魔王魂","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("キラキラ効果音工房","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("背景","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("Pixabay.com","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("エンディング曲","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("「INSOMNIA」龍崎一","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("（Short Ver）","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　from DOVA-SYNDROME","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("環境","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("javascript","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("ライブラリ","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("Howler.js","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("createjs.js","32px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("　","36px メイリオ","white");
            Ary.push(t);
            var t=new createjs.Text("製作　提供","36px メイリオ","white");
            Ary.push(t);
            var Y=5;
            for(var i=0;i<Ary.length;i++){
              Ary[i].x=200;
              Ary[i].y=400+40*Y;
              Ct.addChild(Ary[i])
              Y+=1;
              if(Ary[i].text=="　"){Y+=8};
            }
          };
            return false;
          case "Cut_reset":
            //背景を消去
            for(var i=0;i<MessageText[4].length;i++){
              Loadmap.removeChild(MessageText[4][i]);
            }
            MessageText[4]=[];
            cLock=true;
            MsgNext();
            return false;
      case "solithia":
        Loadmap.removeAllChildren();
        Dialogue("遊び方","テーブルをクリックしてソリティアを始める",-1,-1,"OK");
        cLock=true;
        return false;
      case "collection":
        Loadmap.removeAllChildren();
        Dialogue("採取","ヘニルの時空のエリアでは、&採取をして素材を集めることができます。",-1,-1,"OK");
        Henirmap(0,1)
        cLock=true;
        return false;
      case "collect_nonev":
        Loadmap.removeAllChildren();
        Henirmap(playMode[1],1)
        cLock=true;
        return false;
      case "rumos":
        if(musicnum!==12){
          Bgm.stop();
          musicnum=12;
          if(mute=="ON"){
          Bgm=new Music(bgm12data);
          Bgm.playMusic();
          }}
          field.removeChild(HenirPathT[0]);
          var s = new createjs.Bitmap(SoLbg_src[playMode[1]]);
          s.alpha=0;
          field.addChild(s);
          createjs.Tween.get(s)
          .to({alpha:0.7},200)
          .call(rem);
          function rem(){
            HenirPathT=[];
            cLock=true;
          };
          return false;
      case "music_stop":
        if(musicnum!==0){
          Bgm.stop();
          musicnum=0;
        }
        cLock=true;
        MsgNext();
        return false;
        break;
      case "music_default":
        switch(playMode[1]){
          case 5:
            if(musicnum!==11){
              Bgm.stop();
              musicnum=11;
              if(mute=="ON"){
              Bgm=new Music(bgm11data);
              Bgm.playMusic();
              }}
          break;
          case 6:
            if(musicnum!==12){
              Bgm.stop();
              musicnum=12;
              if(mute=="ON"){
              Bgm=new Music(bgm12data);
              Bgm.playMusic();
              }}
          break;
          case 8:
            if(henirarea[8].cleared<=1){
              field.removeChild(Exlists[5]);
              for(var i=0;i<Exlists[4].length;i++){
              field.removeChild(Exlists[4][i]);
              }
              henirarea[8].cleared=2;
              se5.play();
              if(musicnum!==21){
                Bgm.stop();
                musicnum=21;
                if(mute=="ON"){
                Bgm=new Music(bgm21data);
                Bgm.playMusic();
                }}
            }else if(henirarea[8].cleared==2){
              se29.play();
              if(musicnum!==0){
                Bgm.stop();
                musicnum=0;
              }
            }
            break;
          }
          cLock=true;
          MsgNext();
          return false;
      case "music_1":
        if(musicnum!==1){
          Bgm.stop();
          musicnum=1;
          if(mute=="ON"){
          Bgm=new Music(bgm1data);
          Bgm.playMusic();
          }}
          cLock=true;
          MsgNext();
          return false;
      case "goto_stage":
        switch(playMode[1]){
          case 5:
          if(henirarea[5].cleared<=2){
            henirarea[5].cleared=3;
          }
          break;
          case 6:
            if(henirarea[6].cleared<=2){
              henirarea[6].cleared=3;
            }
          break;
        }
        Loadmap.removeAllChildren();
        field.removeAllChildren();
        Henirmap(playMode[1],henirarea[playMode[1]].cleared);
        cLock=true;
        return false;
      case "battle_6":
        field.removeAllChildren();
        Loadmap.removeAllChildren();
        var s = new createjs.Bitmap(SoLbg_src[playMode[1]]);
        s.alpha=0.7;
        field.addChild(s);
        field.alpha=1;
        Extras=[-1,0,0,0];
        Exlists=[[],[],[],[],[],[]];
        Extras[0]=-2;//バトル終了時
        var DL= new createjs.Bitmap(Chara_src[0]);
          DL.scale=0.6;
          DL.alpha=1;
          DL.x=-30;
          DL.y=150;
          field.addChild(DL);
          Exlists[5]=DL;
          var shape = new createjs.Shape();
          shape.graphics
          .beginLinearGradientFill(["white","black"],[0.0,1.0],0,0,0,600)
          .drawRect(5, 460, 660, 110);
          shape.alpha=0.6;
          field.addChild(shape);
          for( var i=0;i<3; i++ ){
          var t=new createjs.Text("　","bold 26px 'メイリオ'","white");
          t.x=180;
          t.y=470+i*32;
          field.addChild(t);
          Exlists[4].push(t);
          };
            switch(playMode[1]){
              case 5:
                if(musicnum!==18){
                  Bgm.stop();
                  musicnum=18;
                  if(mute=="ON"){
                  Bgm=new Music(bgm18data);
                  Bgm.playMusic();
                  }}
                var M=Enemylist.findIndex(value=>value.name=="トロッシュ")
                var T=new createjs.Bitmap("Card_images/Boss_2.png");
                deckmap.addChild(T);
                DeckFacelists.push(T); 
                T.x=320;
                T.y=170;
                T.alpha=0;
                T.scale=2;
                var S=new createjs.Bitmap("Card_images/BackColor_Black.png");
                deckmap.addChild(S);
                S.x=800;
                S.y=120;
                S.alpha=0;
                S.scale=3;
                createjs.Tween.get(S)
                .to({alpha:1},100)
                .to({x:320,y:170,scale:2},200)
                .wait(200)
                .to({alpha:0},100);
                createjs.Tween.get(T)
                .wait(450)
                .to({alpha:1},50)
                .to({x:240,y:120,scale:3},150, createjs.Ease.backOut)
                .to({x:320,y:170,scale:2},150, createjs.Ease.backOut)
                .call(BtM);
                MsgAry.push(["music_default"]);
                MsgAry.push(["リティア","ふぅ、手間取ったけど……&ペンダントが無事でよかった。",0,-2,3,1]);
                MsgAry.push(["リティア","これで心置きなく採取ができる！",0,-2]);
                MsgAry.push(["リティア","絶対にここから出て、&あの気味の悪い声のヤツに&顔を拝ませてやるんだから！",0,-2]);
                MsgAry.push(["goto_stage"]);
              break;
              case 6:
              if(musicnum!==19){
                Bgm.stop();
                musicnum=19;
                if(mute=="ON"){
                Bgm=new Music(bgm19data);
                Bgm.playMusic();
                }}
              var M=Enemylist.findIndex(value=>value.name=="ドラバキ")
              var T=new createjs.Bitmap("Card_images/Boss_3.png");
              deckmap.addChild(T);
              DeckFacelists.push(T); 
              T.x=800;
              T.y=170;
              T.alpha=0;
              T.scale=2;
              var S=new createjs.Bitmap("Card_images/BackColor_Black.png");
              deckmap.addChild(S);
              S.x=800;
              S.y=120;
              S.alpha=0;
              S.scale=3;
              createjs.Tween.get(S)
              .to({alpha:1},100)
              .to({x:320,y:170,scale:2},200)
              .wait(200)
              .to({alpha:0},100);
              createjs.Tween.get(T)
              .wait(450)
              .to({alpha:1},50)
              .to({x:240,y:120,scale:3},150, createjs.Ease.backOut)
              .to({x:320,y:170,scale:2},150, createjs.Ease.backOut)
              .call(BtM);
              MsgAry.push(["music_default"]);
              MsgAry.push(["リティア","びっくりした……&こんなに大きな魔物が潜んでたなんて。",0,-2,3,1]);
              MsgAry.push(["リティア","この洞窟、他にも危険な魔物がいるかもしれない。",0,-2]);
              MsgAry.push(["リティア","まあ！　このリティア様にかかれば&大したことないけどね！",0,-2]);
              MsgAry.push(["リティア","それよりも！　うへへ！&キラキラ光る鉱石ちゃん達を採掘しに行こ！",0,-2]);
              MsgAry.push(["goto_stage"]);
            break;
            case 8:
              if(henirarea[8].cleared==2){
              if(musicnum!==8){
                Bgm.stop();
                musicnum=8;
                if(mute=="ON"){
                Bgm=new Music(bgm8data);
                Bgm.playMusic();
                }}
              }else{
              if(musicnum!==15){
                Bgm.stop();
                musicnum=15;
                if(mute=="ON"){
                Bgm=new Music(bgm15data);
                Bgm.playMusic();
                }}
              }
                Sprite2.gotoAndPlay('walk');
                var M=Enemylist.findIndex(value=>value.name=="オベザール")
                var T=new createjs.Bitmap("Card_images/Boss_1.png");
                deckmap.addChild(T);
                DeckFacelists.push(T); 
                T.x=240;
                T.y=120;
                T.alpha=0;
                T.scale=3;
                var S=new createjs.Bitmap("Card_images/BackColor_Black.png");
                deckmap.addChild(S);
                S.x=240;
                S.y=120;
                S.alpha=0;
                S.scale=3;
                createjs.Tween.get(S)
                .to({alpha:1},100)
                .to({x:210,y:80,scale:3.5},200)
                .wait(260)
                .to({alpha:0},100);
                createjs.Tween.get(T)
                .wait(200)
                .to({alpha:1},600)
                .to({x:320,y:170,scale:2},150, createjs.Ease.backOut)
                .call(BtM);
                if(henirarea[8].cleared==2){
                  MsgAry.push(["music_default"]);
                  MsgAry.push(["リティア","鎖が……！",0,-2,3,1]);
                  MsgAry.push(["オベザール","グオオオオオオォォ！",2]);
                  MsgAry.push(["リティア","やっ……た……。&はは……動けないや。",0,-2]);
                  MsgAry.push(["white_out"]);
                  MsgAry.push(["リティア","……。",2]);
                  MsgAry.push(["仮面の男","気を失ったか。",-10]);
                  MsgAry.push(["仮面の男","今頃になってベリル家の名を再び聞くことになるとは。&あの事件から、完全に廃れたものと思っていたんだがな。",2]);
                  MsgAry.push(["仮面の男","……やれやれ。&その名に免じて、身柄は預かっておいてやろう。",2]);
                  MsgAry.push(["","……。&…………。",2]);
                  MsgAry.push(["black_out"]);
                  MsgAry.push(["リティア","……あたしが目を覚ましたのは、&それからしばらく経ってからだった。",-10]);
                  MsgAry.push(["リティア","エリアノドにいるマスターや巫女たちが、&あたしを保護して看病してくれたよ。",-10]);
                  MsgAry.push(["リティア","仮面の男……グレイヴっていう名前らしいけど……&その人がマスターにあたしのことを知らせてくれたらしい。",-10]);
                  MsgAry.push(["リティア","まぁ……マスターの人たちは、&ヘニル教団の容疑者として&あたしの身柄を確保する目的もあったみたいだけど。",-10]);
                  MsgAry.push(["リティア","意外だったのは、&気が遠くなるほど長い間あの空間に居たはずなのに、&実際にはそんなに時間が経っていないことだった。",-10]);
                  MsgAry.push(["リティア","狭間の中の時間の進み具合は、現実と違うんだろうね。",-10]);
                  MsgAry.push(["Cut_5"]);
                  MsgAry.push(["リティア","ベリル家の名声を取り戻すこと。&ジョイが完成させられなかった研究の完成。&そして…/…/。",-10]);
                  MsgAry.push(["リティア","狭間に意識だけ取り残されたあんたを助け出すこと。",-10]);
                  MsgAry.push(["リティア","散々あたしの妄想のフリをして……&絶対助け出してやるんだから、覚悟して待ってなさいよね。",-10]);
                  MsgAry.push(["　","……。",-10]);
                  MsgAry.push(["black_out"]);
                  MsgAry.push(["商人","いらっしゃい！　何をお求めですか？",-10]);
                  MsgAry.push(["リティア","あの……トランプをください！",-10]);
                  MsgAry.push(["商人","まいどあり！",-10]);
                  MsgAry.push(["リティア","……へへ。&たまには買いたいものを買わなきゃね。",-10])
                  MsgAry.push(["リティア","これも、これから始まる&リティア・ベリルの伝説への布石！",-10]);
                  MsgAry.push(["　","To be continued in& game epic &[Lithia] Ep 10.",-10]);
                  MsgAry.push(["end of log"])
                }
                if(henirarea[8].cleared<=1){
                MsgAry.push(["music_default"]);
                MsgAry.push(["リティア","はぁ……はぁ……。&おーい、終わったよ！",0,-2,3,1]);
                MsgAry.push(["仮面の男","まだだ。",2]);
                MsgAry.push(["music_1"]);
                MsgAry.push(["オベザール","グオオオオオ！",2]);
                MsgAry.push(["リティア","いっ…たい！！",0,-2]);
                MsgAry.push(["リティア","やば……モロに食らっちゃった……。",0,-2]);
                MsgAry.push(["オベザール","バリバリバリバリ！！",2]);
                MsgAry.push(["リティア","パワーアップした！？&む、むちゃくちゃだ！",0,-2]);
                MsgAry.push(["リティア","ねぇ！　さっさとあれ封印してよ！",0,-2]);
                MsgAry.push(["仮面の男","無理だ。&抵抗する力がなくなれば&自動的に封印される仕組みになっている。",2]);
                MsgAry.push(["リティア","じゃーせめてあんたも戦ったら！",0,-2]);
                MsgAry.push(["仮面の男","私に戦闘能力があると思うか？",2]);
                MsgAry.push(["リティア","こ、この……！",0,-2]);
                MsgAry.push(["オベザール","グオオォォ！",2]);
                MsgAry.push(["music_stop"]);
                var U=UserLibrary.filter(value=>value>0);
                var I=100*U.length/(itemA.length-1)
                if(I>=80){
                MsgAry.push(["リティア","ここで…/…/終わり？",0,-2]);
                MsgAry.push(["リティア","ベリル家もここでおしまい…/…/？&このままジョイにも会えないまま…/…/？",2]);
                MsgAry.push(["white_out"]);
                MsgAry.push(["ジョイ","リティア。忘れないで。",-10]);
                MsgAry.push(["ジョイ","私はいつもリティアのそばにいるから。",-10]);
                MsgAry.push(["リティア","…/…/。&……/……/。",-10]);
                MsgAry.push(["リティア","いや！　終われない！",0,-2]);
                MsgAry.push(["Cut_3"]);
                MsgAry.push(["リティア","あたしにはまだまだやることがいっぱいあるんだ！&こんなところで終われない！！",-10]);
                MsgAry.push(["リティア","何度だってやってやる！！",-10]);
                MsgAry.push(["battle_6"]);
                }else{
                MsgAry.push(["white_out"]);
                MsgAry.push(["リティア","ここで…/…/終わり？",0,-2]);
                MsgAry.push(["game_over"]);
                }
                };
            break;
            }
          se8.play();
          function BtM(){
          deckmap.removeChild(S)
          pickMsg("モンスターだ！&　");
          // console.log(gamestate);//expected 5
          gamestate=0;
          Battle(M);
          cLock=true;
          }
        return false;
      break;
    }
    //テキストを消す
    if(MessageText[0].length){
      for(var i=0;i<MessageText[0].length;i++){
        Loadmap.removeChild(MessageText[0][i]);
      }
      MessageText[0]=[];
    };
    if(MessageText[2].length){
      for(var i=0;i<MessageText[2].length;i++){
        Loadmap.removeChild(MessageText[2][i]);
      }
      MessageText[2]=[];
    };
    if(chr!==MessageText[3]){
    switch(chr){
      case 1:
      //狭間は右側
      Loadmap.removeChild(MessageText[1][1]);
      var DL= new createjs.Bitmap(Chara_src[chr]);
      DL.scale=600/768;
      DL.alpha=0;
      DL.x=400;
      DL.y=5;
      Loadmap.addChild(DL);
      MessageText[1][1]=DL;
      if(chrop!==-2){
      MessageText[1][0].alpha=0.5;
      };
      MessageText[1][1].alpha=0.5;
      var T=MessageText[1][chr]
      createjs.Tween.get(T)
      .to({x:T.x-5,y:T.y-5,alpha:1},150);
      MessageText[3]=chr;
        break;
      case -1:
        if(chrop!==-2){
        MessageText[1][0].alpha=0.5;
        MessageText[1][1].alpha=0.5;
        };
        MessageText[3]=chr;
        break;
      case 2:
        var T=MessageText[1][0];
        createjs.Tween.get(T)
        .to({x:T.x-5,y:T.y+5,alpha:0.5},100);
        MessageText[3]=chr;
        break;
      case -10:
        //グラフィックを表示しない
        MessageText[1][0].alpha=0;
        MessageText[1][1].alpha=0;   
        break;
      default:
        Loadmap.removeChild(MessageText[1][0]);
        var DL= new createjs.Bitmap(Chara_src[chr]);
        DL.scale=600/768;
        DL.alpha=0;
        DL.x=-30;
        DL.y=5;
        Loadmap.addChild(DL);
        MessageText[1][0]=DL;
        MessageText[1][0].alpha=0.5;
        if(chrop!==-2){
          MessageText[1][1].alpha=0.5;
          };
        var T=MessageText[1][chr]
        createjs.Tween.get(T)
        .to({x:T.x+5,y:T.y-5,alpha:1},150);
        MessageText[3]=chr;
        break;
    }
      }
    if(chrop==-1){
      var T=MessageText[1][chr];
      createjs.Tween.get(T)
      .to({x:T.x-5,y:T.y+5,alpha:0},150);
    }
    var DL= new createjs.Bitmap("window_ds.png");
    DL.scale=600/768;
    DL.y=0;
    Loadmap.addChild(DL);
    if(first==1){
      DL.y=200;
      createjs.Tween.get(DL)
      .to({y:0},150)
    }
    MessageText[0].push(DL)
    var t=new createjs.Text(word,"bold 26px 'メイリオ'","white");
    t.x=80;
    t.y=385;
    t.textAlign='center';
    Loadmap.addChild(t);
    MessageText[2][0]=t;
    var t=new createjs.Text("▼","bold 18px 'メイリオ'","white");
    t.x=770;
    t.y=580;
    t.alpha=0;
    Loadmap.addChild(t);
    MessageText[2][1]=t;
    createjs.Tween.get(t, {loop: true})
    .to({y:570},300)
    .to({y:580},150);
    for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ){
      var t=new createjs.Text("　","bold 26px 'メイリオ'","white");
      t.x=5;
      t.y=450+i*32;
      Loadmap.addChild(t);
      MessageText[0].push(t);
    };
    var texti=0;
    var line=lines[0]
    var Tx=MessageText[0][1];
    window.requestAnimationFrame((ts)=>MsgSplit(ts,1,textspeed));
    function MsgSplit(ts,tflame=1,A=0,B=0,delay=0){
      //1文字ずつ描画 A->文字送りの速さ
      A+=1;
      if(A>delay){
      delay=0;
      if(line == ''){
      texti+=1;
      if(texti >= lines.length){
      MessageText[2][1].alpha=1;
        cLock=true;
        return false;
      }
      line=lines[texti]
      Tx=MessageText[0][texti+1];
      delay=18;
      }
      if(line.slice(0,1)=="/"){
      line = line.slice(1);
      delay=15;
      }
      if(A>tflame){
        var c = line.slice(0,1);
        line = line.slice(1);
        Tx.text+=c;
        A=0;
        B+=1;
        if(B>=2){
        B=0;
        se18.play();
        }
      }}
        window.requestAnimationFrame((ts)=>MsgSplit(ts,tflame,A,B,delay));
    }
  };
function ToGameretry(){
  //gameover画面からのリトライは挑戦回数を-1しておく
  clearBG.removeAllChildren();
  field.removeAllChildren();
  if(playMode[1]==1 && playMode[0]!==3){
    cleared[1][playMode[0]+2]-=1;              
    }else{
  cleared[1][playMode[0]-1]-=1;
    }
  gamestate=0;
  retryswitch+=1;
  yakumap.removeChild(yakumap_rule);
  switch(playMode[0]){
    case 1:
    //クロンダイク
    yakumap_rule = new createjs.Bitmap("soL_rule1.png");
    yakumap_rule.alpha=0;
    yakumap_rule.x=800;
    yakumap_rule.y=70;
    yakumap.addChild(yakumap_rule);
      break;
    case 2:
      //スパイダー
    yakumap_rule = new createjs.Bitmap("soL_rule2.png");
    yakumap_rule.alpha=0;
    yakumap_rule.x=800;
    yakumap_rule.y=70;
    yakumap.addChild(yakumap_rule);
      break;
    case 3:
    //エルドリッチ
    yakumap_rule = new createjs.Bitmap("soL_rule3.png");
    yakumap_rule.alpha=0;
    yakumap_rule.x=800;
    yakumap_rule.y=70;
    yakumap_rule.addEventListener("click", {point:0,handleEvent:rulepage});
    yakumap.addChild(yakumap_rule);
      break;
    case 4:
      //ヘニル
    yakumap_rule = new createjs.Bitmap("soL_rule4.png");
    yakumap_rule.alpha=0;
    yakumap_rule.x=800;
    yakumap_rule.y=70;
    yakumap.addChild(yakumap_rule);
    break;
  }
  Gameretry();
}
function Gameend(){
  //go to title;
  //gamestate=10;
  Titleyard.alpha=1;
  cx.clearRect(0,0,800,600)
  clearBG.removeAllChildren();
  field.removeAllChildren();
  deckmap.removeAllChildren();
  Backyard.removeAllChildren();
  MsgAry=[];
  if(henirarea[8].cleared>1){henirarea[8].cleared=1}
  opLock=0;
  menu(1);
}
function Gamestart(){
  if(playMode[0]!==4){if(equipeditem==7){playMode[1]=1}else{playMode[1]=0}};
    gamestate=0;
    retryswitch=0;
    cLock=false;
    clearBG.removeAllChildren();
    field.removeAllChildren();
    cx.clearRect(0,0,800,600)
    cx2.clearRect(0,0,800,600)
    cx3.clearRect(0,0,800,600)
    yakumap.removeChild(yakumap_rule);
    var BG;
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
      case 4:
        //ヘニル
      yakumap_rule = new createjs.Bitmap("soL_rule4.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      Backyard.removeAllChildren();
      BG = new createjs.Bitmap(SoLbg_src[playMode[1]]);
      BG.alpha=0.7;
      Backyard.addChild(BG);
      Backyard.alpha=1;
      cx.fillStyle='black';
      cx.fillRect(0,0,800,600);
        cards = new Array(40);
        for (var i = 0;  i < cards.length;  i++  ) {
        cards[i]=i+1;
        };
      shuffle();
        break;
    }
    handsLog=cards.concat();
    Gameretry(1);
  };
function Gameretry(t=0){
  cLock=false;
  opLock=-1;
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
    Exlists=[[],[],[],[]];
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
      if(cleared[0][1]>0 && cleared[1][1]>0 && cleared[1][1]%5==0 && melonList[1]==0){
      var T = new createjs.Bitmap('Card_images/melon1.png');
      T.x=-20+2*(cardWidth+cardgapX)
      T.y=70
      T.alpha=0;
      T.addEventListener("click", {handleEvent:MelonDeal});
      field.addChild(T);
      melonList[0]=T;
      createjs.Tween.get(T)
      .to({alpha:1},120)
      .to({alpha:0},120)
      .wait(200)
      .to({alpha:1},100)
      }
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
    //ダメなときはダメですが
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
    case 4:
      //ヘニル
      Card_src=Card_src_H.concat();
      duelLog=[];
      Cardlists=[[],[],[],[],[],[]]
      hands = [
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
      ]
      decks = cards.concat();
      deckfaces=[];
      //エリアごとにモンスター数は変更予定
      var Nary=[3,3,3,4,4,5,5,4,0]
      var N=Nary[playMode[1]]
      if(UserItem[156]>0){UserItem[156]-=1;}
      if(UserStatus[4]==86 && playMode[1]!==8){N=Math.ceil(Nary[playMode[1]]/(2+Math.floor(Math.random()*3)))}
      for(var i=0;i<N;i++){
        var M=1+Math.floor(Math.random()*(decks.length-2));
        decks.splice(M,1,-100);
      }
      if(playMode[1]==0 && henirarea[0].cleared==1){
        //チュートリアル
        hands=[[],[1],[10,8],[9],[],[]];
        decks=[7];
      }
      Fever=0;
      EvAry=[{id:0,word:"アイテムロスト！　3つ落としちゃった！"},{id:1,word:"タイプチェンジ！　カッターとドリルがチェンジ！"},{id:2,word:"フィーバー！　好きなカードを3枚取れるよ！"},{id:3,word:"アイテム増加！　所持アイテムが増えたよ！"}];
      Extras=[0,0,0,0];//0->連鎖数 1->0:カッター1:ドリル 2->獲得素材id 3->個数
      Exlists=[[],[],[],[],[],[]];//0->extras[1]テキスト 1->extras[2] 2->extras[3] 3->getitem 4->メッセージ格納 5->chara画像
    for(var i=0;i<hands.length;i++){
      for(var j=0;j<hands[i].length;j++){
      var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
      newCard.x=275;
      newCard.y=280;
      field.addChild(newCard);
      Cardlists[i].push(newCard);
      //i列目のj行目でアクセスする
      var HashCard=i*100+j;
      newCard.addEventListener("click", {card:HashCard,handleEvent:handleClick});
      }
    };
      break;
  }
  printView();
  console.log('デュエル開始')  
};
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
        if(cleared[1][0]==0){
          Dialogue("クロンダイク","カードを交互に重ねて、右上のゾーンに&A-Kまでまとめていくルールです。&？ボタンからルールを確認できます。",-1,-1,"OK",350,330,80,40);
          }
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
          field.addChild(newCard);
          for(var k=0;k<decks.length;k++){
            var newCard = new createjs.Bitmap(Card_src[0]);
            newCard.x=690;
            newCard.y=425-k*0.5;
            field.addChild(newCard);
            Decklists.push(newCard); 
            newCard.addEventListener("click", {handleEvent:SpiderDeal});
          }
          if(melonList[0]!==0){se10.play();};
          FirstAnimation();
          if(cleared[1][1]==0){
            Dialogue("マグマンタ","5組のトランプを使って、&A-Kまで順番に揃えていくルールです。&？ボタンからルールを確認できます。",-1,-1,"OK",350,330,80,40);
            }
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
          newCard.alpha=0.7;
          newCard.x=230;
          newCard.y=5+140*i
          field.addChild(newCard);
          Closed[i]=newCard;
        }
        if(melonList[1]==1 && InvID(3)==0){
          //console.log('melon!');
          var newCard = new createjs.Bitmap('Card_images/melon1.png');
          melonList[0]=newCard;
          newCard.x=50;
          newCard.y=5;
          newCard.alpha=0.7;
          field.addChild(newCard);
          var newCard = new createjs.Bitmap(Card_src[Card_src.length-1]);
          newCard.x=50;
          newCard.y=5;
          Extras[0]=Card_src.length-1;
          Exlists[0][0]=newCard;
          field.addChild(newCard);
        }
        //uncaughtと出る？？ためディレイをかけてみる
        setTimeout(FirstAnimation,200);
        var E=0;
        for (var i=0;i<Exlists.length;i++){
          if(Exlists[i].length){
            E+=1;
          }
        }
        drawbuttom(580,450,"Monster "+E+"/4",1,120,40);
        drawbuttom(580,500,"討伐数 "+decks.length+"/16",1,120,40);
        if(cleared[1][2]==0){
          Dialogue("エリアノド防衛戦","カードを2枚ずつ使って、&モンスターを倒していきます。&？ボタンからルールを確認できます。",-1,-1,"OK",350,330,80,40);
          }
        break;
        case 4:
          cx.strokeStyle="white";
          for(var i=0;i<6;i++){
            createRoundRect(119+90*i,5,80,128,5,cx);
            cx.stroke();
            };
          for(var i=0;i<2;i++){
          createRoundRect(299+95*i,280,80,128,5,cx);
          cx.stroke();
          }
          var newCard = new createjs.Bitmap(Card_src[0]);
          newCard.x=275
          newCard.y=280
          newCard.alpha=0.3;
          newCard.addEventListener("click", {point:1,handleEvent:DeckReset_H});
          field.addChild(newCard);
          var shape = new createjs.Shape();
          shape.graphics
               .beginFill("black")
               .drawRect(480, 280, 150, 24);
          shape.alpha=0.5;
          field.addChild(shape);
          var pickText1 = new createjs.Text("系統：", "20px serif", "white");
          pickText1.x=500;
          pickText1.y=280;
          field.addChild(pickText1);
          Exlists[0]=pickText1;
          var pickText2 = new createjs.Text("連鎖：", "20px serif", "white");
          pickText2.x=500;
          pickText2.y=310;
          field.addChild(pickText2);
          Exlists[1]=pickText2;
          var pickText3 = new createjs.Text("　", "20px serif", "white");
          pickText3.x=500;
          pickText3.y=340;
          field.addChild(pickText3);
          Exlists[2]=pickText3;
          var DL= new createjs.Bitmap(Chara_src[0]);
          DL.scale=0.6;
          DL.alpha=1;
          DL.x=-30;
          DL.y=150;
          field.addChild(DL);
          Exlists[5]=DL;
          var shape = new createjs.Shape();
          shape.graphics
          .beginLinearGradientFill(["white","black"],[0.0,1.0],0,0,0,600)
          .drawRect(5, 460, 660, 110);
          shape.alpha=0.6;
          field.addChild(shape);
          for( var i=0;i<3; i++ ){
          var t=new createjs.Text("　","bold 26px 'メイリオ'","white");
          t.x=180;
          t.y=470+i*32;
          field.addChild(t);
          Exlists[4].push(t);
          };  
          var Opicon2 = new createjs.Bitmap("soL_opicon2.png");
          Opicon2.x=670;
          Opicon2.y=540;
          field.addChild(Opicon2);
          Opicon2.addEventListener("click", {handleEvent:InvConfig_Item});
          //deck
          DeckReset_H();
          FirstAnimation();
          if(playMode[1]==0 && henirarea[0].cleared==1){
          Dialogue("採取","採取はトランプを使って行います。&場の札±1のカードを獲得することができます。&Aは11としても扱うことができます。",-1,-1,"OK",350,330,80,40);
          }
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
      case 4:
        var T = Cardlists[i][j];
      if(T){
      createjs.Tween.get(T)
      .to({x:95+i*(cardWidth+cardgapX),y:5+j*cardgapY,alpha:1},80)
      .call(nextcard);
      }else{
        i+=1;
        if(i>5){
          i=0;
          j+=1;
        }
        if(j<=3){
        FirstAnimation(i,j);
      }}
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
              opLock=0;
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
              opLock=0;
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
        case 4:
          se1.play();
          i+=1;
          if(i>5){
            i=0;
            j+=1;
            if(j>3){
              cLock=true;
              opLock=0;
              duelLog.push("start");
              return false;
            };
          };
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
        //console.log(HashCard);
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
          Exlists[1].push(S);
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
            if(InvID(5)==0){
              //mrp 65 hr 52 lab 39 lu 26 raven 13
                var Re=0;
                for(var i=0;i<5;i++){
                  if(Exlists[1][i]==13*(5-i)){
                    Re+=1;
                  }
                }
                if(Re==5){
                  Coin();
                  return false;
                }
                function Coin(){
                var A=Exlists[0][12];
                se12.play();
                createjs.Tween.get(A)
                .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                .to({x:A.x,y:A.y,scale:1,alpha:1},150)
                .call(Coin2);
                }
                function Coin2(){
                  var A=Exlists[0][25];
                  se12.play();
                  createjs.Tween.get(A)
                  .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                  .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                  .call(Coin3);
                  }
                function Coin3(){
                  var A=Exlists[0][38];
                  se12.play();
                  createjs.Tween.get(A)
                  .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                  .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                  .call(Coin4);
                  }
                function Coin4(){
                  var A=Exlists[0][51];
                  se12.play();
                  createjs.Tween.get(A)
                  .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                  .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                  .call(Coin5);
                  }
                function Coin5(){
                  var A=Exlists[0][64];
                  se12.play();
                  createjs.Tween.get(A)
                  .to({x:A.x-10,y:A.y-10,scale:1.2,alpha:0.8},150)
                  .to({x:A.x,y:A.y,scale:1,alpha:1},150)  
                  .call(Coin6);
                  }
                function Coin6(){
                  var A=new createjs.Bitmap("Card_images/soL_stone.png")
                  A.x=320;
                  A.y=200;
                  A.alpha=0;
                  field.addChild(A);
                  createjs.Tween.get(A)
                  .to({alpha:0.8},150)
                  .to({alpha:0},90)
                  .to({alpha:0.8},90)
                  .to({alpha:0},90)
                  .to({alpha:1},90)
                  .wait(400)
                  .to({scale:1.2},60)
                  .to({x:700,y:600,scale:1,alpha:0},300, createjs.Ease.backInOut)
                  .call(Coin7);
                  }
                function Coin7(){
                  IK('氷のクリソナ')
                  //cLock=true;
                  Gameover();
                  }
                };
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
    se1.play();
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
            .call(next);
      function next(){
        se17.play();
        createjs.Tween.get(newCard)
            .to({y:T.y-5,rotation:8},100)
            .to({y:T.y,rotation:5},100)
            .to({x:-100},500, createjs.Ease.backOut)
            .call(step);
      }
      function step(){
        field.removeChild(T);
        field.removeChild(newCard);
        melonList[1]=1;
        PopAnm("メロンはポールに盗まれてしまった！",900,300,35,30,95);
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
function compareFuncID(a,b){return(a.price - b.price);}  
function itemID(X){
  var result=itemA.findIndex(value=>value.id==X);
  return result;
};
function vmatNumCompare(arr1,arr2,vmat1,vmat2){
  //投入された素材の合計数でヒントを与える 1は少なすぎ 2は多すぎ 3は割合が異なる
  //素材・数がどちらも一致していれば-1を返す
  var result;
  //要素の一致
  if (arr1.length !== arr2.length) {
    return -2;
}
const sortedArr1 = arr1.slice().sort();
const sortedArr2 = arr2.slice().sort();
for (var i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
    }
}
result=3;
var Total_1=0;
var Total_2=0;
for(var i=0;i<vmat1.length;i++){
  Total_1+=vmat1[i];
}
for(var i=0;i<vmat2.length;i++){
  Total_2+=vmat2[i];
}
if(Total_1>Total_2){
  result=1;
}
if(Total_1<Total_2){
  result=2;
}
  //数の一致
for(var i=0;i<arr1.length;i++){
  var A=arr2.indexOf(arr1[i]);
  if(A==-1){return result};
  if(vmat1[i]!==vmat2[A]){return result}
}
return -1;
}
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
    function InvID(p,to=0){
      var ID=inventory.findIndex(value=>value.id==p);
      if(ID==-1){
        console.log('InvID error',p);
        return 0;
      }else{
        if(to!==0){
          inventory[ID].cleared=to;
        }
        return inventory[ID].cleared;
      }
    }
    function IK(name){
      //アイテム
      var A=inventory.findIndex(value=>value.name==name);
      if(A!==-1){
        if(inventory[A].cleared==0){
          inventory[A].cleared=1;
          se14.play();
          PopAnm(name+"を獲得しました！",800,120+name.length*20,35,30,95);
          InvConfig(0);
          saveLocal();
        }
      }
    }
    function Gameover(A=0){
      console.log('gameover',A);
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
        clearBG.addChild(Cstar);
        totalcardmove+=duelLog.length-1;
        if(playMode[0]==4){
          if(UserStatus[4]>0){UserStatus[4]=0}
        };
        if(henirarea[0].cleared>2){
        var E=(playMode[0]-1)*30+duelLog.length%assembleA.length;
        var F=3+Math.floor(duelLog.length/10);
        for(var i=0;i<F;i++){
          var I=i+E;
          if(I>assembleA.length){I-=assembleA.length};
          if(debugmode){console.log(I)};
          if(AssemCompare(assembleA[I],-1) && userRecipe.indexOf(assembleA[I])==-1){
            userRecipe.push(-assembleA[I]);
            if(debugmode){console.log(assembleA[I])};
            break;
          }}
        };
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
            if(playMode[1]==1){
            cleared[1][3]+=1;              
            }else{
            cleared[1][playMode[0]-1]+=1;
            }
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
              if(playMode[1]==1){
                cleared[1][4]+=1;              
                }else{
              cleared[1][playMode[0]-1]+=1;
                }
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
              case 4:
                createjs.Tween.get(Exlists[5])
                .to({x:-200,alpha:0},300)
                .call(ex5);
                function ex5(){
                field.removeChild(Exlists[5])
                }
                var t=new createjs.Text("Get item","24px メイリオ","white");
                t.x=600;
                t.y=100;
                clearBG.addChild(t);
                InvConfig(0);
                return true;
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
                if(playMode[1]==1){
                  cleared[0][3]+=1;
                  cleared[1][3]+=1;              
                  }else{
            cleared[0][playMode[0]-1]+=1;
            cleared[1][playMode[0]-1]+=1;
                  }
            //score
            score=50*(duelLog.length-1);
            for(var i=0;i<Extras.length;i++){
              score+=100*Math.floor(Extras[i]/(i+1));
            }
            if(score>=10000){
              Rank="SS";
              achieve_SS[playMode[0]-1]+=1;
            }else if(score>=9000){
              Rank="S";
            }else if(score>=8000){
              Rank="A";
            }else if(score>=6000){
              Rank="B";
            }else{
              Rank="C";
            }
            var TimeTemp=hour*3600+min*60+sec
            var TB=500-TimeTemp;
            score+=TB;
            score-=(undocount-2)*50;
            score-=(retryswitch-1)*100;
            if(playMode[1]==1){
                  var A=highscore[playMode[0]+2].time.findIndex(value=>value>TimeTemp);
                  if(A !==-1){
                  highscore[playMode[0]+2].time.splice(2,1);
                  highscore[playMode[0]+2].time.splice(A,0,TimeTemp);
                  }
                var B=highscore[playMode[0]+2].score.findIndex(value=>value<score);
                if(B !==-1){
                highscore[playMode[0]+2].score.splice(2,1);
                highscore[playMode[0]+2].score.splice(B,0,score);
                }           
              }else{
                var A=highscore[playMode[0]-1].time.findIndex(value=>value>TimeTemp);
                  if(A !==-1){
                  highscore[playMode[0]-1].time.splice(2,1);
                  highscore[playMode[0]-1].time.splice(A,0,TimeTemp);
                  }
                var B=highscore[playMode[0]-1].score.findIndex(value=>value<score);
                if(B !==-1){
                highscore[playMode[0]-1].score.splice(2,1);
                highscore[playMode[0]-1].score.splice(B,0,score);
                }
            if(hour==0 && min*60+sec<=150){
              achievetemp.push("スーパーソニック")
            }
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
              if(playMode[1]==1){
                cleared[0][4]+=1;
                cleared[1][4]+=1;              
                }else{
            cleared[0][playMode[0]-1]+=1;
            cleared[1][playMode[0]-1]+=1;
                }
            //score
            score=50*(duelLog.length-1);
            for(var i=0;i<Extras.length;i++){
              score+=100*Extras[0];
            }
            var TimeTemp=hour*3600+min*60+sec
            var TB=500-TimeTemp;
            score+=TB;
            score-=(undocount-2)*50;
            score-=(retryswitch-1)*100;
            if(score>=8000){
              Rank="SS";
              achieve_SS[playMode[0]-1]+=1;
            }else if(score>=7500){
              Rank="S";
            }else if(score>=7000){
              Rank="A";
            }else if(score>=6500){
              Rank="B";
            }else{
              Rank="C";
            }
            if(playMode[1]==1){
              var A=highscore[playMode[0]+2].time.findIndex(value=>value>TimeTemp);
              if(A !==-1){
              highscore[playMode[0]+2].time.splice(2,1);
              highscore[playMode[0]+2].time.splice(A,0,TimeTemp);
              }
              var B=highscore[playMode[0]+2].score.findIndex(value=>value<score);
              if(B !==-1){
              highscore[playMode[0]+2].score.splice(2,1);
              highscore[playMode[0]+2].score.splice(B,0,score);
              }            
              }else{
              var A=highscore[playMode[0]-1].time.findIndex(value=>value>TimeTemp);
              if(A !==-1){
              highscore[playMode[0]-1].time.splice(2,1);
              highscore[playMode[0]-1].time.splice(A,0,TimeTemp);
              }
              var B=highscore[playMode[0]-1].score.findIndex(value=>value<score);
              if(B !==-1){
              highscore[playMode[0]-1].score.splice(2,1);
              highscore[playMode[0]-1].score.splice(B,0,score);
              }
              if(hour==0 && min*60+sec<=180){
                achievetemp.push("迅速の英雄")
              }
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
              var TimeTemp=hour*3600+min*60+sec
              var TB=800-TimeTemp;
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
                achieve_SS[playMode[0]-1]+=1;
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
              var A=highscore[playMode[0]-1].time.findIndex(value=>value>TimeTemp);
              if(A !==-1){
              highscore[playMode[0]-1].time.splice(2,1);
              highscore[playMode[0]-1].time.splice(A,0,TimeTemp);
              }
              var B=highscore[playMode[0]-1].score.findIndex(value=>value<score);
              if(B !==-1){
              highscore[playMode[0]-1].score.splice(2,1);
              highscore[playMode[0]-1].score.splice(B,0,score);
              }
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
            case 4:
              createjs.Tween.get(Exlists[5])
              .to({x:-200,alpha:0},300)
              .call(ex5);
              function ex5(){
              field.removeChild(Exlists[5])
              }
              var t=new createjs.Text("Get item","24px メイリオ","white");
              t.x=600;
              t.y=100;
              clearBG.addChild(t);
                var ExlistsAry = Exlists[3].filter((element, index) => Exlists[3].indexOf(element) === index);
                if(debugmode){console.log(ExlistsAry)};
              for(var i=ExlistsAry.length-1; i>=0; i--){
                  var A=itemA.findIndex(value=>value.id==ExlistsAry[i])
                  var B=Exlists[3].filter(value=>value==ExlistsAry[i]);
                  t= new createjs.Text(itemA[A].name+"×"+B.length, "bold 20px 'メイリオ'", "#f06787");
                  t.x=580;
                  t.y=130+i*23;
                  clearBG.addChild(t);
                  UserItem[itemA[A].id]+=B.length;
                  if(UserItem[itemA[A].id]>itemMax[itemMax[0]]){UserItem[itemA[A].id]=itemMax[itemMax[0]]};
                  if(UserLibrary[itemA[A].id]==0){UserLibrary[itemA[A].id]=1};
                  //console.log(itemA[A].id,UserItem[itemA[A].id]);
              }
              var M=0;
              for(var i=0;i<6;i++){
                if(hands[i].length){M+=1}
              }
              if(M==0){
              var t=new createjs.Text("Complete Bonus","24px メイリオ","white");
              t.x=600;
              t.y=350;
              clearBG.addChild(t);
              var A=itemA.findIndex(value=>value.name=="クリソナ原石")
              Exlists[3].push(itemA[A].id);
              t= new createjs.Text(itemA[A].name+"×1", "bold 20px 'メイリオ'", "#f06787");
              t.x=580;
              t.y=380;
              clearBG.addChild(t);
              UserItem[itemA[A].id]+=1;
              if(UserItem[itemA[A].id]>itemMax[itemMax[0]]){UserItem[itemA[A].id]=itemMax[itemMax[0]]};
              if(UserLibrary[itemA[A].id]==0){UserLibrary[itemA[A].id]=1};
              }
              InvConfig(0);
              return true;
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
        if(playMode[0]!==4){
        retry_bt3.x=600;
        retry_bt3.y=420;
        clearBG.addChild(retry_bt3);
        retry_bt.x=600;
        retry_bt.y=470;
        clearBG.addChild(retry_bt);
        }
        retry_bt2.x=600;
        retry_bt2.y=520;
        clearBG.addChild(retry_bt2);
        cLock=true;
      }
    }};
    function PathText(){
      //狭間との会話
      if(PathTextnum==-1){PathTextIni()};
      function PathTextIni(){
      if(equipeditem==8){
      PathTextAry=new Array(12);
      }else{
      PathTextAry=new Array(11);
      }
      for (var i=0;i<PathTextAry.length;i++){
      PathTextAry[i]=i;
      }
      shuffleTx();
      PathTextnum=0;
      }
      function shuffleTx(){
        for(var i =PathTextAry.length-1; i>0 ; i--){
        var r =Math.floor(Math.random()*(i+1));
        var temp = PathTextAry[i];
        PathTextAry[i] = PathTextAry[r]
        PathTextAry[r] = temp
      }};
      if(opLock!==0 && opLock!==11){return false};
      if(equipeditem==8){
    var R=11+PathTextAry[PathTextnum]
      }else{
    var R=PathTextAry[PathTextnum]
      }
    PathTextnum+=1;
    if(PathTextnum>=PathTextAry.length){
      PathTextIni();
    }
    switch(R){
      case 0:
        MsgAry.push(["　","――時折、空間に隙間が現れて、外の世界が見える。",-1,0,3,1])
        MsgAry.push(["（少年の声）","……そのときのアイ……の顔が傑……でさ……",-1])
        MsgAry.push(["（少女の声）","バカ……ないの！……スが脅かす……！",-1])
        MsgAry.push(["リティア","あー！　あー！　そこのあなた、聞こえますかー！"])
        MsgAry.push(["リティア","はぁ。&時々空間の亀裂から外の世界は見えるんだけどなぁ。"]);
        MsgAry.push(["　","何度呼び掛けても同じだ。&外の声は聞こえてくるが、こちらの声は届かないようだ。",-1])
        MsgAry.push(["リティア","やっぱり諦めるしかないか。"]);
        MsgAry.push(["狭間","大丈夫。いつか出られるよ。",1]);
        MsgAry.push(["リティア","いつか、ね……。&はぁー、傍から見たら、壁と会話してる狂人だよね、あたし。"]);
        MsgAry.push(["リティア","今なら、カードゲームを一人でやってる&お友達のいない人の気持ちも分かるかも。"]);
        MsgAry.push(["狭間","壁とやってろ、ってやつ？",1]);
        MsgAry.push(["リティア","うう。自分で言っててむなしくなってきた……。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 1:
        MsgAry.push(["　","――この空間には、もともと何もなかった。&この部屋は、小さい頃にジョイと過ごした部屋を模倣して&狭間がつくり出したものだ。",-1,0,3,1])
        MsgAry.push(["リティア","昔ジョイと過ごした部屋。もう見飽きたよ。"])
        MsgAry.push(["狭間","ずっと何もない空虚な空間にいたら、&リティアの精神がおかしくなってしまうかもしれないと&思ったんだ。",1]);
        MsgAry.push(["リティア","はー、ありがたいことだねー。&机にトランプ置いてくれたのも、同じ理由なんでしょ？"]);
        MsgAry.push(["狭間","やることがないって言って、&せっかく作った家を何回も壊されちゃったからね。",1]);
        MsgAry.push(["狭間","だから、もう部屋を破壊するのは止めにしよう。",1]);
        MsgAry.push(["リティア","ちょうどいいよ、壊すのも飽きてきたし。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 2:
        MsgAry.push(["　","――クロンダイクは、最もよく知られている&ソリティアの遊び方だ。",-1,0,3,1])
        MsgAry.push(["　","あまりに有名なので、&クロンダイクのことをソリティアだと思っている人も&いるくらいだ。",-1]);
        MsgAry.push(["狭間","クロンダイクという名前は、遠い昔に金が発見されて、&ゴールドラッシュが巻き起こった地に由来しているんだって。",1]);
        MsgAry.push(["リティア","へぇー、カードという山を掘り進めていく動きを&ゴールドラッシュに見立ててるってわけ？"]);
        MsgAry.push(["狭間","面白い考察だね。",1]);
        MsgAry.push(["リティア","カードを色が交互になるように&重ねないといけないのが、じれったいのよねー。"]);
        MsgAry.push(["狭間","山札のカードの移動は、慎重にした方がいいよ。",1]);
        MsgAry.push(["リティア","まぁ、どーせ時間はたっぷりあるんだし？&あたしの独り言でも聴きながら？　見てなさいよ。"]);
        MsgAry.push(["狭間","はいはい。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 3:
        MsgAry.push(["　","――マグマンタは、5組のトランプを使ったソリティアだ。",-1,0,3,1])
        MsgAry.push(["狭間","マグマンタという名前は、&エリオスにいる巨大グモの魔物が由来だよ。",1]);
        MsgAry.push(["リティア","8列使うから、列の数がちょうどクモの足の数と同じなのね。"]);
        MsgAry.push(["リティア","でもさ、流石にクモはなくない？&もっと可愛い名前なかったの？&ベベとか、モーリーとか。"]);
        MsgAry.push(["狭間","ぼくに言われても……。&ただ、一つだけ捕捉しておくと……。",1]);
        MsgAry.push(["狭間","残念ながらマグマンタの足の数は6本らしい。",1]);
        MsgAry.push(["リティア","どっちでもいいよ！"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 4:
        MsgAry.push(["　","――エリアノド防衛戦は、エル捜索隊がエリアノドを&解放した戦いの記録をもとにしたルールだ。",-1,0,3,1])
        MsgAry.push(["リティア","あたしが学会の依頼を受けたの、&エリアノドが復活してすぐのことだし……。&結構最近生まれたルールなんじゃないの？"]);
        MsgAry.push(["狭間","ソリティアも歴史が長いし、&似たようなゲームがもっと前から存在していても&おかしくないけどね。",1]);
        MsgAry.push(["リティア","知らない魔物の絵もあるけど……、&各スートのモンスターになにか共通点はあるの？"]);
        MsgAry.push(["狭間","さあ……ぼくには分からないな……。",1]);
        MsgAry.push(["リティア","じゃあ、これ作った人もそこまで考えてないってことね！"]);
        MsgAry.push(["狭間","そう決めつけるのはまだ早いよ。",1]);
        MsgAry.push(["狭間","一見繋がりのなさそうなものに共通点を&見出すのが、探求者のあるべき姿じゃないの？",1]);
        MsgAry.push(["リティア","人はそれを屁理屈と呼ぶのよ。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 5:
        MsgAry.push(["リティア","ふん、ふふーん♪&３，２，１♪",0,0,3,1])
        MsgAry.push(["狭間","どうしたの？　いきなり鼻歌なんか歌い出して。",1]);
        MsgAry.push(["リティア","さっき、外から聞こえてきた歌だよ。"]);
        MsgAry.push(["狭間","ずいぶん気に入ってるみたいだけど、知ってる歌なの？",1]);
        MsgAry.push(["リティア","いや？　全然。"]);
        MsgAry.push(["リティア","……歌には不思議な力があると思うんだよね。"]);
        MsgAry.push(["リティア","ほら、知らない歌でも、何となく聞いてたら&ついついメロディを口ずさんじゃうじゃん。"]);
        MsgAry.push(["狭間","そうかもね。",1]);
        MsgAry.push(["リティア","ふん、ふーん♪"]);
        MsgAry.push(["狭間","リティアの鼻歌だけが、虚空に響いていた。",1]);
        MsgAry.push(["リティア","いかにも小説の最後の文章っぽくまとめないでよ！"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 6:
        MsgAry.push(["　","たまたま開いた狭間の向こうで、&誰かが誕生日を祝っている。",-1,0,3,1]);
        MsgAry.push(["リティア","あたしも祝ってあげようっと！&ハッピーバースデートゥ～ユー♪"])
        MsgAry.push(["狭間","ところでリティアは幾つになったんだっけ？",1]);
        MsgAry.push(["リティア","あたしが～～～？　何歳かって～～～？"]);
        MsgAry.push(["リティア","17よ！　じゅう、なな！"]);
        MsgAry.push(["リティア","女の子にとって、い～っちばん大切な時期よ！&それを、こんな真っ暗なところで過ごす青春って&あんまりじゃない！？"]);
        MsgAry.push(["リティア","うぅ、思い出したくなかったのに！"]);
        MsgAry.push(["狭間","ごめんごめん。&でもさ、世の中には一人ぼっちで&誕生日を迎える人もいるんだよ。",1]);
        MsgAry.push(["狭間","それに比べたらマシじゃない？&ぼくがいるんだから。",1]);
        MsgAry.push(["リティア","気休めをありがとう！&さようなら、あたしの青春！　ヘッ！"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 7:
        MsgAry.push(["リティア","……お風呂入りたい。",0,0,3,1]);
        MsgAry.push(["狭間","ずいぶん急だね。",1])
        MsgAry.push(["リティア","今までのことを思い返していて思ったの。"]);
        MsgAry.push(["リティア","よく考えたらあたし、&ここに来る前は霧の中の森にいたのよね。"]);
        MsgAry.push(["リティア","そのまま森の中の学会の施設に突入して、&狭間が開いて、ここにいるわけだから。"]);
        MsgAry.push(["リティア","汗もいっぱいかいたし、&絶対雑草とか身体にくっついてるし、&汚いと思うんだけど。"]);
        MsgAry.push(["狭間","大丈夫、全然匂わないよ。",1])
        MsgAry.push(["リティア","サイテー！"]);
        MsgAry.push(["狭間","……あとで部屋にお風呂を作っておくよ。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 8:
        MsgAry.push(["リティア","ん～！　……ちょっと休憩しよ。",0,0,3,1]);
        MsgAry.push(["狭間","あ……そうだ。&この部屋、テーブルの他にも&いろいろ触れるものがあるよね。",1])
        MsgAry.push(["リティア","ああ、床に転がってる地図とか、&壁にかかってる額縁とか？"]);
        MsgAry.push(["リティア","昔っからあるものだし、&大して気にしてなかったけど。"]);
        MsgAry.push(["狭間","ちょっとした謎が&隠されているかもしれないよ。",1])
        MsgAry.push(["リティア","ソリティアと思ったら、今度は謎解き？"]);
        MsgAry.push(["リティア","まぁ、このリティア・ベリルに解けない謎はないよ！"]);
        MsgAry.push(["狭間","答えはソリティアの中にある。&覚えておくといいよ。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
        case 9:
          MsgAry.push(["リティア","宝の地図かと思ったら、楽譜だった。",0,0,3,1]);
          MsgAry.push(["狭間","ああ、そこの床に転がってるやつ？",1])
          MsgAry.push(["リティア","このマーク、どこかで見たことがあるのよねー……。&……どこだろう……。"]);
          MsgAry.push(["狭間","クロンダイクの絵札をよく見てみたらどうかな。&なにか気づくかも。",1])
          MsgAry.push(["リティア","絵札の模様？&全部似たような感じに見えるけどな……"]);
          MsgAry.push(["end"]);
          MsgNext(-1);
        break;
        case 10:
          MsgAry.push(["リティア","ねぇ、そこに飾ってある意味ありげな額縁のこと、&何か知らない？",0,0,3,1]);
          MsgAry.push(["リティア","このパネル、どこかで見たことがあるのよねー……。&……どこだろう……。"]);
          MsgAry.push(["狭間","マグマンタの絵札をよく見てみたらどうかな。&なにか気づくかも。",1])
          MsgAry.push(["リティア","絵札の模様？&全部似たような感じに見えるけどな……"]);
          MsgAry.push(["end"]);
          MsgNext(-1);
        break;
      case 11:
        MsgAry.push(["リティア","このトランプの絵札に描かれている人たち、&「エル捜索隊」よね。",0,0,3,1]);
        MsgAry.push(["狭間","エリオスの英雄。&今やエリオスで彼らのことを知らない者はいないだろうね。",1])
        MsgAry.push(["リティア","魔族の侵攻を幾度となく阻止して、&古代のエルも復元して、&今度は魔界に乗り込んでるんだっけ。"]);
        MsgAry.push(["リティア","（魔界、か……。）"]);
        MsgAry.push(["リティア","いつかあたしも、この人たちと一緒に旅をしてみたいな……。"]);
        MsgAry.push(["狭間","リティア、そんな風に思ってたんだ？",1])
        MsgAry.push(["リティア","――みたいに、&エル捜索隊に入りたいって人が&世の中にいっぱいいそうだなーって！"]);
        MsgAry.push(["狭間","エル捜索隊が結成されたとされる&ルレンシアの果ての小さな村では、&聖地巡礼と称して訪れる客が急増しているらしいよ。",1])
        MsgAry.push(["リティア","逆にエル捜索隊という名前を利用して、&お金儲けしようとする人たちもいるだろうね。"])
        MsgAry.push(["狭間","王都ベルダーではエル捜索隊をモチーフにしたお土産が&飛ぶように売れているらしいよ。",1])
        MsgAry.push(["狭間","ちなみに一番人気はヘッジホッグのぬいぐるみだって。",1])
        MsgAry.push(["リティア","なんか、方向性が間違ってる気がする……。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 12:
        MsgAry.push(["　","エルスは、エル捜索隊のリーダーの剣士だ。&赤い髪をした元気な少年で、真っすぐな性格。&エルを感じる能力は人一倍強い。",-1,0,3,1]);
        MsgAry.push(["リティア","ふーん、こっちがリーダーなんだ。&てっきり、エリシスがリーダーだと思ってたよ。"]);
        MsgAry.push(["狭間","エリシスは赤い騎士団の団長も兼任しているから、&エル捜索隊のリーダーに見えるのも納得がいくよ。",1])
        MsgAry.push(["リティア","せっかくなら、エル捜索隊よりも&もっとかっこいい名前にすればよかったのに。&グランドチェイス！とか。"]);
        MsgAry.push(["狭間","彼らもここまで有名になるとは思ってなかっただろうけど。",1])
        MsgAry.push(["リティア","それにしても、&このエル・コレクション・ブックのメンバー紹介の部分、&誰が作ってるんだろう。"]);
        MsgAry.push(["リティア","アップの写真とか、一般人にはなかなか撮れないよね。"]);
        MsgAry.push(["狭間","某ブラック会社に雇われたカメラマンが、&一人で取材に行って、写真も撮って、&記事を書いたらしいよ。",1])
        MsgAry.push(["リティア","かわいそう。"]);
        MsgAry.push(["（少年の声）","オレの話、全然してねぇじゃん！",-1])
        MsgAry.push(["リティア","びっくりした！　&……外の世界の会話だよね？"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 13:
        MsgAry.push(["リティア","エル捜索隊の中にもレンダールがいるよね。",0,0,3,1]);
        MsgAry.push(["狭間","アイシャ・レンダールのことだね。",1])
        MsgAry.push(["リティア","コレクション・ブックの紹介文は、っと……。"]);
        MsgAry.push(["リティア","12才にして大魔法使いの称号を手にした、&レンダール家きっての天才魔法少女！&あらゆる元素魔法を同時に操ることができるという。"]);
        MsgAry.push(["リティア","……ふーん。&きっと苦労もほとんど知らずに人生育ったんだろうな。"]);
        MsgAry.push(["狭間","小さい頃は、もっとはっちゃけてたらしいよ。",1])
        MsgAry.push(["狭間","魔力欲しさに怪しい薬を試して寝込む羽目になったり。&森の中でファイアボールを空に放って、&山火事を起こしかけたり。",1])
        MsgAry.push(["狭間","ぼくも同じキャンプにいた頃に散々からかわれたよ。",1])
        MsgAry.push(["リティア","あはは、マティがよく泣きついてきたっけ。&からかわれたって？&あたしの妄想のくせに、変なの。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 14:
        MsgAry.push(["　","レナ・エリンデルは、心優しいエルフの弓使い。年齢不詳。&隊の中ではお姉さん的な存在で、たまに怒ると怖い。&弓を射る時には、弦と矢はマナで生成している。",-1,0,3,1]);
        MsgAry.push(["リティア","でっか……コホン。&初期メンバーは、&エルス、アイシャ、レナの3人だったんだよね。"]);
        MsgAry.push(["狭間","当初は隊の中で一番大人だったから、&よくエルスとアイシャの面倒をみてあげていたらしい。",1])
        MsgAry.push(["リティア","頼れる大人がそばにいるのは、ありがたいことだよね。"]);
        MsgAry.push(["リティア","すごく若く見えるけど、何歳くらいなのかな。"]);
        MsgAry.push(["狭間","うーん。エルフという種族が何百年も生きる種族だからね。&レナに限らずエル捜索隊のメンバーは&年齢不詳とされる人が少なくないよ。",1])
        MsgAry.push(["リティア","ホイホイ年齢不詳がいるのはどうなのよ……。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 15:
        MsgAry.push(["リティア","レイヴン・クロムウェル。&元傭兵で、左腕はナソードに改造されている、と。",0,0,3,1]);
        MsgAry.push(["狭間","クロムウェル家の名前はベルダーにいた頃に&耳にしたけど……クロムウェル家の養子は&世の中では死んだことになっているみたいだ。",1])
        MsgAry.push(["リティア","お～！　&あたし以外にも、ナソード技術を戦闘に応用している&賢い人がいるじゃない！"]);
        MsgAry.push(["狭間","自分の杖を好き勝手に弄るのと、&望まない改造で腕を機械に変えられるのは&訳が違うと思う……。",1])
        MsgAry.push(["リティア","えー。&でもさ、腕がナソードだったら、採掘も楽ちんだし。&本人も便利だと思ってるよ。きっと。"]);
        MsgAry.push(["狭間","念のため言っておくけど、&人類がみんな遺跡の探索や遺物のために&生きてるわけじゃないからね。",1])
        MsgAry.push(["リティア","もう、冗談に決まってるじゃん。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 16:
        MsgAry.push(["リティア","ナソードの女王、イヴ。&すごい。ナソードなのに、人間そっくりだよ。",0,0,3,1]);
        MsgAry.push(["狭間","ナソードの歴史は古代エリアン王国の時代まで遡る。&アドリアンが生み出したナソードという発明は革命的だった。&王国はすぐさまナソードの大量生産を依頼した。",1])
        MsgAry.push(["リティア","おおかた、軍需兵器としての利用ね。"])
        MsgAry.push(["狭間","王国からの多額の資金援助もあって、&アドリアンはナソードを想像するAI……アダムを製作した。",1]);
        MsgAry.push(["狭間","アダムの力で、ナソード増産は進んでいった。&ところが、ある時、不特定多数のナソードが&突然機能を停止する事件が起こった。",1])
        MsgAry.push(["狭間","アダムはナソードの生産効率を上げるために、&任意のナソードのコードを勝手に書き換えはじめたんだ。",1])
        MsgAry.push(["狭間","アドリアンはアダムを説得しようとしたけど、&アダムは効率を上げるためには必要なことだと答えた。",1])
        MsgAry.push(["狭間","だからアドリアンは、今度は&人間の感情を理解できるナソードが必要だと考えた。&そんな経緯で、イヴが誕生したわけだね。",1])
        MsgAry.push(["狭間","その後アドリアンはアダムとイヴを残して&別の次元へと姿を消して、&ナソード戦争が勃発するわけだけど……。",1])
        MsgAry.push(["リティア","ストップストップ！&あーもう、歴史の授業はおしまい！"])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 17:
        MsgAry.push(["狭間","ラシェはハーメルの王家「セイカー家」の王子だよ。&魔族に堕落した父親を捜すために、&エル捜索隊と同行することになったみたいだ。",1,0,3,1]);
        MsgAry.push(["リティア","王子様ね……。&ん……王子？　ちょっと待って。"])
        MsgAry.push(["リティア","……男の子だったのか。"])
        MsgAry.push(["狭間","そこなんだ。",1]);
        MsgAry.push(["リティア","まあまあ。それはそれとして。&あたしとしては、この青い宝石が気になるのよね。"])
        MsgAry.push(["狭間","セイカー家に伝わる「守護石」だね。&ラシェの鎧や武器は、ラシェの意志に反応して&守護石が姿を変えたものだという。",1])
        MsgAry.push(["リティア","お～。守護石、かなり興味深いね。&お借りしていろいろ調べてみたいなぁ～！"])
        MsgAry.push(["狭間","粉々になって帰ってきそうな予感がする……。",1])
        MsgAry.push(["リティア","ま、ま、ま、まっさか～！&ちょっと実験するだけだよ！　ジ・ッ・ケ・ン！"])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 18:
        MsgAry.push(["リティア","白いキツネがいる。",0,0,3,1]);
        MsgAry.push(["狭間","アラ・ハーンは、フルオネ出身の槍使い。&その身に九尾の狐、ハクを宿しているよ。",1])
        MsgAry.push(["リティア","はぁん、人柱力ってこと？"])
        MsgAry.push(["狭間","一向に加わった経緯はラシェと似ているけど、&魔族に堕ちてしまった兄を取り戻すために&旅に同行しているよ。",1]);
        MsgAry.push(["リティア","失った家族を探して……か。&あたしも……ジョイに会いたいな……。"])
        MsgAry.push(["狭間","ちなみに、覚醒すると九尾の力が解放されて&髪が白くなったり、尻尾が生えたりして、&冒頭の写真みたいな姿になるよ。",1]);
        MsgAry.push(["リティア","ねー！　尻尾がもふもふだよ！　&もふもふ！　もふもふ！"])
        MsgAry.push(["狭間","……。",1]);
        MsgAry.push(["リティア","もふもふ！"])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 19:
        MsgAry.push(["リティア","うわぁ。&目つきの悪い人がいるよ。",0,0,3,1]);
        MsgAry.push(["狭間","エドワード……エドは、200年前から&タイムスリップしてきたナソード・ルーラー。&イヴのコアを狙ってエル捜索隊を追い続けて……。",1])
        MsgAry.push(["リティア","ストーカーじゃん。"])
        MsgAry.push(["狭間","ぶっきらぼうな言動が目立つけど、&根は優しい少年だよ。",1]);
        MsgAry.push(["リティア","育ちは良さそうだよね。&家族は？　家族も一緒にタイムスリップしちゃったの？"])
        MsgAry.push(["狭間","それが、家族や過去の詳しい経歴は、&この本には載っていないんだ。",1]);
        MsgAry.push(["リティア","え？"])
        MsgAry.push(["狭間","知られたくない過去もあるのか……&あるいは、物語の根幹に関わる重大な何かが含まれていて&検閲が入ったのかも。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 20:
        MsgAry.push(["リティア","お、フェリックスと同じ魔族がいるよ。",0,0,3,1]);
        MsgAry.push(["狭間","ルーこと、ルシエラ・R・サワークリームは、&魔界を支配する四大魔族の一人だった魔族だ。",1])
        MsgAry.push(["リティア","……だった？"])
        MsgAry.push(["狭間","部下に裏切られて、長い間封印されてしまっていたんだ。&封印が弱まってきた頃になんとかエリオスに逃げて、&シエルとの出会いが始まったよ。",1]);
        MsgAry.push(["リティア","もしかしたら、フェリックスのことも知ってるかなぁ？"])
        MsgAry.push(["狭間","どうだろう。&フェリックスって、ジョイが勝手につけた名前じゃなかった？",1]);
        MsgAry.push(["リティア","あー、よく考えればそうだったよ。&けど、会えたら聞いてみたいな。"])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
        case 21:
          MsgAry.push(["リティア","この金髪のお姉様は誰？&何となく雰囲気が他の人と違うような。",0,0,3,1]);
          MsgAry.push(["狭間","彼女……ロゼは別の次元からエリオスにやってきた、&いわゆるコラボキャラなんだ。&雰囲気が違うのはそのせいじゃないかな。",1])
          MsgAry.push(["リティア","こらぼ……？"])
          MsgAry.push(["狭間","そうだわよ。",1])
          MsgAry.push(["リティア","……？"])
          MsgAry.push(["狭間","……ロゼは天界の皇女に仕える側近部隊、&「皇女の庭園」に属する軍のエリート。職業はガンナー。&ロゼという名前も、コードネームなんだって。",1])
          MsgAry.push(["リティア","コードネームって、カッコいいよねー！&あたしも欲しいな。そういうの。"])
          MsgAry.push(["狭間","リティアは目立つから、&コードネーム使ってても&すぐに本名が割れちゃう気がするけど……。",1])
          MsgAry.push(["リティア","そーですか、そーですか！&それで……ガンナーってことは、銃を使って戦うんだよね？"])
          MsgAry.push(["狭間","いや……リボルバーだけじゃなくて、&連射に長けたオートガン、貫通力に優れたマスケット、&一発が重いハンドキャノンと、4種類の武器を使い分けるよ。",1]);
          MsgAry.push(["狭間","4種類もの武器を使い分けることができるのは、&隣にいるメカのゼロが&彼女をサポートしているからなんだ。",1])
          MsgAry.push(["リティア","へー、やるじゃん。"])
          MsgAry.push(["リティア","銃か……銃ねぇ……。"])
          MsgAry.push(["狭間","また何を考えてるの？",1])
          MsgAry.push(["リティア","ん？&ピッケルから銃弾が撃てたら面白いかなーって。"])
          MsgAry.push(["リティア","ババババーン！/　って撃った後に、&フッ、って銃口の煙を吹き消すの。"])
          MsgAry.push(["狭間","念のため聞いておくけど、&それは杖なんだよね？",1])
          MsgAry.push(["リティア","杖でもあり、ピッケルでもあり、銃でもある。&いわば……ウェポンパックなのよ！"])
          MsgAry.push(["狭間","ははは。",1])
          MsgAry.push(["end"]);
          MsgNext(-1);
          break;
        case 22:
          MsgAry.push(["リティア","ねぇ、ピンクの子供が混ざってるよ。&こんな子供がエル捜索隊なわけ？",0,0,3,1]);
          MsgAry.push(["狭間","ラビィは見た目や言動こそ子供に見えるけど、&立派なメンバーの一員だよ。",1])
          MsgAry.push(["リティア","マ、マジ……？"])
          MsgAry.push(["狭間","ラビィはかなり特殊な出自をしていて、&長い間ペイターの黒い森に閉じ込められていたという。",1])
          MsgAry.push(["狭間","3度目の青い光に導かれて、&大地のマスターと共に森から出て旅が始まり、&やがてエリアノドに辿り着くんだ。",1])
          MsgAry.push(["リティア","3度目の青い光って？"])
          MsgAry.push(["狭間","エリオスではこれまでに3回、&天地を揺るがす大きな事象が起きている。",1])
          MsgAry.push(["狭間","一つ目は約1000年前のナソード戦争。&二つ目は500年前のエルの爆発。&そして三つ目はエルスによるエリアノド復元。",1])
          MsgAry.push(["狭間","ラビィが今までに見た3つの青い光は、&これらを指していると考えられているよ。",1])
          MsgAry.push(["リティア","んー……。ということは……？&ナソード戦争の頃からずーっと森で過ごしてたってこと！？"])
          MsgAry.push(["リティア","そんなことって、あり得るのかな。&フツーの時の流れの中で生きていて、そんな……。"])
          MsgAry.push(["狭間","ちなみに彼女のテーマ曲の「夜の迷宮」は&なんと5ヵ国語でカバーされているよ。",1])
          MsgAry.push(["リティア","ひゃー。すごい人気だね。&あたしのテーマ曲も、たくさん歌ってほしいな。"])
          MsgAry.push(["リティア","「マイルストーン」をよろしくね！！"])
          MsgAry.push(["end"]);
          MsgNext(-1);
          break;
          default:
            MsgAry.push(["リティア","……ねぇ。",0,0,3,1]);
            MsgAry.push(["狭間","なに？",1])
            MsgAry.push(["リティア","あんた、一体何者なの？"]);
            MsgAry.push(["リティア","最初は、&あたしが会話相手欲しさに生み出した妄想だと思ってた。"]);
            MsgAry.push(["リティア","それにしては反応がありありとしてて、&なんだか自分と会話してるって感じがしなくて。&まるで本当に誰かと会話してるみたいだよ。"]);
            MsgAry.push(["狭間","……。",1])
            MsgAry.push(["リティア","はあ。&こういう時に限ってうんともすんとも答えてくれないんだから。"]);
            MsgAry.push(["狭間","……。",1]);
            MsgAry.push(["リティア","いずれ分かるって言いたいの？&まぁ、あたしとしては、&どっちにしろ話し相手になってもらえればいいんだけどさ。"]);
            MsgAry.push(["end"]);
            MsgNext(-1);
            break;
    }
    }
    function PathTalk(henir=0){
      //event
      //125,300,525,800,1125,1500
      console.log(InvID(0),totalcardmove);
      if(opLock!==0 && opLock!==11){return false};
      if(henir==0){
      if(InvID(0)==1 && totalcardmove>=125){
        MsgAry.push(["狭間","カード裁きが手慣れてきたね。",1,0,3,1])
        MsgAry.push(["リティア","ふっ/ふっ/ふっ。&リティア様は物覚えも早いんだから。"])
        MsgAry.push(["狭間","……。",1]);
        MsgAry.push(["狭間","そこにいるのは……もしかして……。",1]);
        MsgAry.push(["リティア","……？"])
        MsgAry.push(["狭間","いや、なんでもないんだ。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
      InvID(0,2);
      return true;
      }
      if(InvID(0)==2 && totalcardmove>=300){
        MsgAry.push(["狭間","……。",1,0,3,1])
        MsgAry.push(["リティア","ふー。ちょっと休憩しよ……。",0,-1])
        MsgAry.push(["狭間","……。",1,-2]);
        MsgAry.push(["狭間","あの。&ちょっと、いいかな。",1,-2]);
        MsgAry.push(["狭間","そう、そこでリティアと一緒にソリティアをしてる&キミに話しかけているよ。",1,-2]);
        MsgAry.push(["狭間","お願いがあるんだ。&リティアを外に、エリオスに出してあげたい。",1,-2]);
        MsgAry.push(["狭間","どうか、協力してほしい。",1,-2]);
        MsgAry.push(["リティア","ううん……。"]);
        MsgAry.push(["狭間","あっ、続きはまた詳しく話すよ。",1]);
        MsgAry.push(["リティア","あれ、誰かとお話してた？"]);
        MsgAry.push(["リティア","……幻聴かな。&ここにはあたししかいないはずだし。"]);
        MsgAry.push(["狭間","休憩は終わった？",1]);
        MsgAry.push(["リティア","うん！&さーて、もういっちょ、解決しに行こうかな！"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
      InvID(0,3);
      return true;
      }
      if(InvID(0)==3 && totalcardmove>=525){
        MsgAry.push(["狭間","……。",1,0,3,1])
        MsgAry.push(["リティア","ふぁぁ……。ちょっと、ひと眠りするね。",0,-1])
        MsgAry.push(["狭間","……。",1,-2]);
        MsgAry.push(["狭間","さて、ぼくのことをまだ話していなかったよね。",1,-2]);
        MsgAry.push(["狭間","リティアはぼくのことを&自分が妄想で生みだした架空の話し相手みたいに&思っているみたいだけど、そうじゃない。",1,-2]);
        MsgAry.push(["狭間","ぼくもリティアと一緒に狭間に吸い込まれた人間だ。&ただ、肉体は外の世界にあって、&魂だけがここにいるみたいなんだ。",1,-2]);
        MsgAry.push(["狭間","肉体を通じて外の世界と繋がっている存在だからか、&少しだけ、外の世界に干渉できるぽくて&そこにキミがいるって分かったよ。",1,-2]);
        MsgAry.push(["狭間","というわけで、本題にうつるよ。",1,-2]);
        MsgAry.push(["狭間","実はずっと救援信号を出していて、&既にエリオスの誰かが気づいてくれたんだ。",1,-2]);
        MsgAry.push(["狭間","というのも、エリオスの誰かから返事が届いたんだよ。",1,-2]);
        MsgAry.push(["狭間","ただ……その返事が読めなくて。&色々調べた結果、どうやら&他の次元の力を借りなければ解読できないようなんだ。",1,-2]);
        MsgAry.push(["狭間","だから、キミにお願いだ。&エリオスから届いた手紙の内容を解読してくれないかな？",1,-2]);
        MsgAry.push(["狭間","問題の手紙は、そこのレターボックスに入れておくよ。",1,-2]);
        MsgAry.push(["end"]);
        MsgNext(-1);
      InvID(0,4);
      Letterbox.push(["不明","no title","ありません","qr_src2"])
      return true;
      }
      if(InvID(0)==5){
        //menu
        musicnum=1;
        Bgm.stop();
        if(mute=="ON"){
        Bgm=new Music(bgm1data);
        Bgm.playMusic();
        }
      AK("フォーヘニル");
      MsgAry.push(["　","――パスワードを入力すると、&自然と扉が開き、光が差し込んできた。",-1,0,3,1])
      MsgAry.push(["狭間","やった……やってくれたんだね……！",1]);
      MsgAry.push(["リティア","むにゃ……。"]);
      MsgAry.push(["狭間","リティア、起きて！　外に出られるかも！",1]);
      MsgAry.push(["リティア","う、うーん……。&ジョイ…/…/。"]);
      MsgAry.push(["リティア","な、なに！？&ここから出られるって？&マジで！？"]);
      MsgAry.push(["リティア","や…/…/やったぁ！ やったやったやった！&これでこの胸クソ悪い空間からさよならだ！"]);
      MsgAry.push(["リティア","あんたともお別れだね。&妄想の割には本物みたいに反応してくれて&楽しかったよ。"]);
      MsgAry.push(["henir"]);
      MsgNext(-1);
      var shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(255,255,255,0.7)");
      shape.graphics.drawRect(0, 0, 800, 600);
      Titleyard.addChild(shape);
      createjs.Tween.get(shape)
      .to({alpha:0.3},800);
      InvID(0,6);
      }
      if(InvID(0)==7 && InvID(6)==0){
        MsgAry.push(["狭間","あれ……戻ってきたの？",1,0,3,1])
        MsgAry.push(["リティア","残念ながら。&戻ってまいりました。"]);
        MsgAry.push(["リティア","扉の向こうへは出られたんだけど、&「抵抗力を上げるアイテム」がないと、&先に進めないみたいでさ。"]);
        MsgAry.push(["狭間","抵抗力を上げるアイテム……。",1]);
        MsgAry.push(["リティア","昔、あたしが体調を崩した時に、&ジョイが作ってくれたスイーツがあったよ。"]);
        MsgAry.push(["狭間","それなら、何とかなるかもしれないよ。&この部屋は、リティアの小さい頃の記憶をもとに&作りだされている。",1]);
        MsgAry.push(["狭間","だから、この空間を探せば&材料を見つけられるかもしれない。",1]);
        MsgAry.push(["リティア","トマトとメロンに氷のクリソナを使った、&最高のデザート。きっとあれがあれば……。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
      }
      saveLocal();
      return false;
    }
      if(henir==1){
        if(henirarea[0].cleared==1){
          MsgAry.push(["リティア","…/…/。",0,-2,3,1])
          MsgAry.push(["リティア","ねぇ、おじさん！&いるんでしょ～！",0,-2]);
          MsgAry.push(["リティア","あたしをここから出してくださーい！",0,-2]);
          MsgAry.push(["男の声","ククク、先の話をもう忘れたのか？",2]);
          MsgAry.push(["リティア","ほーら、やっぱりいるじゃん。",0,-2]);
          MsgAry.push(["リティア","忘れてないですー。&このポータルの向こうまで行ったのに、&全然あたくしを出してくれないから言ってるんですー。",0,-2]);
          MsgAry.push(["男の声","遠いと言ったろう。&エリアを一つ越えた程度で調子に乗らないことだ。",2]);
          MsgAry.push(["男の声","いずれ、&そちらからもエリオスの風景が見える場所まで&辿り着けるだろう。",2]);
          MsgAry.push(["リティア","ふーん。&まぁ、そんなことだろうとは思ってたよ。",0,-2]);
          MsgAry.push(["リティア","けど、困ったな。&さっきの森のエリアから先に進むためには&また別のアイテムが必要になりそうなんだよね。",0,-2]);
          MsgAry.push(["リティア","記憶の中に答えがある保証はないよね。&あの森で採集はできそうだけど、&扉を開くアイテムが手に入るかどうか……。",0,-2]);
          MsgAry.push(["男の声","貴様も魔法使いなら、少しは素材を活かしたらどうだ？",2]);
          MsgAry.push(["リティア","素材…/…/？&……そうだ！&集めた素材とクリソナを使えば錬金術ができる！",0,-2]);
          MsgAry.push(["リティア","錬金術で扉を開くアイテムを錬成すればいいじゃん！",0,-2]);
          MsgAry.push(["リティア","クリソナ原石を『加工』すれば&クリソナが手に入るから！",0,-2]);
          MsgAry.push(["リティア","素材とクリソナを選んで&『錬成』してみよう！",0,-2]);
          MsgAry.push(["リティア","錬金術にチュートリアルなんてない。&ぶっつけ本番！",0,-2]);
          MsgAry.push(["リティア","頼みの綱は、あたしの今までの経験と知識！&頼むよ、あたし！",0,-2]);
          MsgAry.push(["assem"]);
          MsgNext(-1);
          henirarea[0].cleared=2;
        }
      if(henirarea[0].cleared==3){
        MsgAry.push(["リティア","うん、クリソナができた！",0,-2,3,1])
        MsgAry.push(["リティア","クリソナは、適当な素材と一緒に錬金術に使うことで&新たな素材を生み出すことができる魔法石。",0,-2]);
        MsgAry.push(["リティア","純度が低かったり、複雑な錬成だと&たまに失敗しちゃうこともあるけど……。&やらなきゃはじまらない。",0,-2]);
        MsgAry.push(["リティア","とりあえず、いくつか知ってる錬成レシピを書き留めておこう。&そのうち思い出したら追記していけばいいし。",0,-2]);
        MsgAry.push(["リティア","レシピからの錬成で、いろいろ試してみよ！",0,-2]);
        MsgAry.push(["recip"]);
        MsgNext(-1);
        henirarea[0].cleared=4;
      }
      if(henirarea[1].cleared==1){
        MsgAry.push(["リティア","素材も集まってきたな……。",0,-2,3,1])
        MsgAry.push(["リティア","今度は、自分で素材を選んで&新しいレシピをつくってみようかな。",0,-2]);
        MsgAry.push(["リティア","この方法でもクリソナは消費しちゃうから、&素材選びは慎重にしないとね。",0,-2]);
        MsgAry.push(["recip2"]);
        MsgNext(-1);
        henirarea[1].cleared=2;
      }
      saveLocal();
      }
    };
};//end of main
