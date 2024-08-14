// 製錬、錬成 チュートリアル
// 余裕あったら→モンスターと簡単なバトル
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
stage.addChild(Titleyard);
stage.addChild(field);
stage.addChild(Itemyard);
stage.addChild(deckmap);
stage.addChild(clearBG);
stage.addChild(yakumap);
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
var debugmode=true;//出荷時にfalseにする
var cLock=true;//true->操作可能
var opLock=0;//漫然と使っている 10->×ボタンを禁止する
var mLock=true;//deckめくっている最中falseとする
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
saveUP();
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
if(InvID(0)>=4){
Letterbox.push(["不明","no title","ありません","qr_src2"])
};
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
field.addChild(Cbutton);
Cbtlist.push(Cbutton);
//ボタン描画用
yakumap_hint.addEventListener("click", {rule:playMode[0],handleEvent:ruleButton});
yakumap_reset.addEventListener("click", {rule:playMode[0],handleEvent:resetButton});
yakumap_undo.addEventListener("click", {rule:playMode[0],handleEvent:undoButton});
yakumap_solve.addEventListener("click", {rule:playMode[0],handleEvent:solveButton});
retry_bt.addEventListener("click", {rule:playMode[0],handleEvent:Gamestart});
retry_bt2.addEventListener("click", {rule:playMode[0],handleEvent:Gameend});

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
  {name:"七転八起",sub:"いずれかのモードで7回以上リトライしてクリアする"},
  {name:"トレジャーハンター",sub:"「クロンダイク」を20回クリアする"},
  {name:"スーパーソニック",sub:"「クロンダイク」を2分30秒以内にクリアする"},
  {name:"極地のクモ",sub:"「マグマンタ」を10回クリアする"},
  {name:"迅速の英雄",sub:"「マグマンタ」を3分以内にクリアする"},
  {name:"エリアノド守護者",sub:"「エリアノド防衛戦」を5回クリアする"},
  {name:"天元突破",sub:"「エリアノド防衛戦」を山札間の移動回数3回以下でクリアする"},
  {name:"市街地保安官",sub:"「エリアノド防衛戦」でモンスターを150体以上討伐する"},
  {name:"SS魂",sub:"3つのモードをSSランクでクリアする"},
  {name:"ソリティア・ベリル",sub:"狭間からの脱出に成功する"},
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
//素材
var itemA=[
  {name:"ホワイトベリル",price:-1,class:"クリソナ",detail:"不純物がほとんど混じっていないため&完全に透明なクリソナ。"},
  {name:"グリーンベリル",price:-1,class:"クリソナ",detail:"クリソナを精製して作った緑色に輝く宝石。&別名エメラルド。"},
  {name:"ブルーベリル",price:-1,class:"クリソナ",detail:"クリソナを精製して作った青色に輝く宝石。別名アクアマリン。"},
  {name:"イエローベリル",price:-1,class:"クリソナ",detail:"クリソナを精製して作った黄色に輝く宝石。"},
  {name:"レッドベリル",price:-1,class:"クリソナ",detail:"クリソナを精製して作った赤色に輝く宝石。"},
  {name:"ルーブ草",price:16,class:"植物資源",detail:"水分豊富な植物。どこでもよく育つ。&エルの樹の麓などでたくさん採れる。"},
  {name:"枯れルーブ草",price:20,class:"植物資源",detail:"水気を失い枯れてしまった茶色のルーブ草。&ルーブ草を分解すると手に入る。"},
  {name:"ルーブ繊維",price:60,class:"植物資源",detail:"ルーブ草から繊維を取り出したもの。&寄り合わせて糸や布ができる。"},
  {name:"ルーブ糸",price:80,class:"製造",detail:"ルーブ繊維から作った丈夫な糸。"},
  {name:"ルーブ布",price:150,class:"製造",detail:"ルーブ繊維から作った布。日用品に幅広く使われている。"},
  {name:"清浄水",price:50,class:"その他資源",detail:"様々な用途に使えるきれいな水。&ルーブ草を分解すると手に入る。レシアム外郭で採れる。"},
  {name:"エルの清水",price:120,class:"その他資源",detail:"エル濃度の高い水。"},
  {name:"火炎草",price:130,class:"植物資源",detail:"燃えるような真紅色をした植物。&実はルーブ草の変種らしい。&レイキキ湖で採れる。"},
  {name:"魔力草",price:140,class:"植物資源",detail:"紫色の草で、解毒作用を持つ。実はルーブ草の仲間らしい。&螺旋回廊で採れる。"},
  {name:"トレーモン木",price:70,class:"植物資源",detail:"短期間で加工に適した大きさに成長する木。&加工すれば良質な木材になる。エルの樹の麓などで採れる。"},
  {name:"木材",price:35,class:"植物資源",detail:"手ごろな大きさに加工した丈夫な木材。&トレーモン木を分解すると手に入る。"},
  {name:"ワルド樹脂",price:110,class:"植物資源",detail:"ワルドの木からとれる、ガムのような粘り気が特徴的な樹脂。&レイキキ渓谷でたまに採れる。"},
  {name:"ピンクコーラル",price:90,class:"植物資源",detail:"綺麗な色をした珊瑚。炭酸水に使われることがある。&トロッシュの巣で採れる。"},
  {name:"ラリネスの花",price:95,class:"植物資源",detail:"特定の場所にしか咲かない、青く光る花。&影の鉱脈で採れる。"},
  {name:"アルテラシアの花",price:50,class:"植物資源",detail:"ナソードに寄生し、その機能を停止させる&ために開発された花。&アルテラ平原で採れる。"},
  {name:"銀秤草",price:50,class:"植物資源",detail:"インクなどに使われるが毒のある花。&効果で取引されるという。&ザヤ山でたまに採れる。"},
  {name:"フォルギネイの果実",price:260,class:"植物資源",detail:"人を襲う危険な植物からとれる実。強力な精神刺激作用を持つ。&庭での栽培は不可能。ディシオン採掘場の敵から手に入る。"},
  {name:"エルドラシルの花",price:150,class:"農場",detail:"ハーブとして親しまれる、香りの強い花。&秋になると青紫色の実をつける。&エルの樹の麓でたまに採れる。"},
  {name:"エルダーベリー",price:210,class:"農場",detail:"エルドラシルが青紫色の実をつけたもの。味方一人のMPが30回復する。&エルの樹の麓でたまに採れる。"},
  {name:"ウィリアムりんご",price:110,class:"農場",detail:"ポールが育てているりんご。様々な霊薬を錬成する&材料になる。食べるとHPが20回復する。&エルの樹の麓の敵から手に入る。"},
  {name:"もりもりニンジン",price:85,class:"農場",detail:"苦みが少なく生でも美味しく食べられるニンジン。&HPが35回復する。アルテラ平原で採れる。"},
  {name:"マンドラタマネギ",price:40,class:"農場",detail:"火を噴きそうになるほど辛いタマネギ。&軽く茹でると甘く食べられる。&春と秋にレイキキ湖で採れる。"},
  {name:"スノークリスタル",price:65,class:"農場",detail:"断面が雪の結晶のように見える木の実。&たまに実が星形になる品種もあるらしい。&春と冬に螺旋回廊で手に入る。"},
  {name:"クロライトシード",price:45,class:"農場",detail:"しょっぱい味のする変わった種。&金属の製錬に使われるらしい。&スノークリスタルを分解すると手に入る。"},
  {name:"キュアトマト",price:60,class:"農場",detail:"森に自生する真っ赤なミニトマト。&戦闘中に使うと中毒を回復する。&エルの樹の麓で採れる。"},
  {name:"砂漠サツマイモ",price:70,class:"農場",detail:"砂漠でも育つ太くて硬いサツマイモ。&戦闘中に使うと敵に小ダメージを与える。ザヤ山で採れる。"},
  {name:"エルライム",price:80,class:"農場",detail:"海の近くで育つライムの実。&夏と秋にレシアム外郭で採れる。"},
  {name:"スターフルーツ",price:90,class:"農場",detail:"輪切りにすると断面が星形に見える果実。&黄色くなったら食べ頃。&春と秋にディシオン採掘場で採れる。"},
  {name:"エルダー小麦",price:40,class:"農場",detail:"寒さに強い小麦。&種は挽いて粉にして使われる。&エルの樹の麓などで採れる。"},
  {name:"ファルマン竹",price:70,class:"農場",detail:"武具にも使われる丈夫な竹。庭に植えるとファルマン筍が採れる。&冬にファルマン峠で採れる。"},
  {name:"霜雪イチゴ",price:90,class:"農場",detail:"寒い地域で育つ野イチゴ。&冬・春にリゴモル海廊で採れる。"},
  {name:"天桃ライチ",price:145,class:"農場",detail:"甘酸っぱさがたまらない、桃色のフルーツ。&秋に螺旋回廊で採れる。"},
  {name:"クォークサボテン",price:160,class:"植物資源",detail:"高山で育つサボテン。水分を多く含む。&ザヤ山で採れる。"},
  {name:"オーガニックコア",price:250,class:"その他資源",detail:"奇妙な物質。ディシオン採掘場でたまに採れる。"},
  {name:"ハーピィの羽根",price:120,class:"動物資源",detail:"ガルファイに生息する魔物から舞い落ちた羽根。ザヤ山の敵から手に入る。"},
  {name:"グリッタ―の歯",price:25,class:"動物資源",detail:"螺旋回廊の敵から手に入る鋭い歯。&回復薬の材料になる。&螺旋回廊で採れる。"},
  {name:"うに",price:61,class:"その他資源",detail:"なぜか山で採れるうに。&戦闘で相手に小ダメージを与える。エルの樹の麓で採れる。"},
  {name:"リザードバス",price:130,class:"動物資源",detail:"頭部の4本の角が特徴的なバス。&トロッシュの巣で採れる。"},
  {name:"ロブスターの抜け殻",price:25,class:"動物資源",detail:"金色の輝きを放つという幻のロブスターの抜け殻。&レシアム外郭でたまに採れる。"},
  {name:"黄金ロブスター",price:331,class:"動物資源",detail:"金色の輝きを放つ、生きた幻のロブスター。&水の聖堂でたまに採れる。"},
  {name:"獣肉",price:70,class:"動物資源",detail:"動物からとれた獣肉。このままでは食べられない。&エルの樹の麓などの敵から手に入る。"},
  {name:"生肉",price:100,class:"動物資源",detail:"獣肉を加工したもの。野生の味。&HPが30回復する。&獣肉を分解すると手に入る。"},
  {name:"獣の皮",price:30,class:"動物資源",detail:"動物の皮。なめして革にする。&獣肉を分解すると手に入る。"},
  {name:"質のよい皮",price:110,class:"動物資源",detail:"本や防具の加工に適した上質な皮。"},
  {name:"ベタベタしたエキス",price:103,class:"動物資源",detail:"動物からとれる、鼻を刺すような臭いがするエキス。&好んで集める人もいる。&レイキキ渓谷の敵から手に入る。"},
  {name:"穀物粉",price:100,class:"その他資源",detail:"エルダー小麦から作られる穀物粉。様々な料理に使われる。&エルダー小麦の種を分解すると手に入る。"},
  {name:"パピリオ蜜",price:60,class:"動物資源",detail:"蝶々が集めてくる花の蜜。&罪悪感を感じるほどの甘さ。&エルの樹の麓の敵が持っている。"},
  {name:"炎鷹卵",price:120,class:"動物資源",detail:"炎熱地帯の鷹が大切そうに持っている球。&高熱を発し続けている。&竜の巣で採れる。"},
  {name:"トロッシュの粉",price:65,class:"動物資源",detail:"トロッシュの羽根から舞い落ちた緑の粉。使い道はあまりなさそうだ。&トロッシュの巣で採れる。"},
  {name:"星屑",price:25,class:"鉱物資源",detail:"キラキラ光る乾燥した砂。ガラス細工に用いられる。&エルの樹の麓などで採れる。"},
  {name:"ナソードメモリー",price:60,class:"鉱物資源",detail:"ナソードに組み込まれていたメモリーチップ。&アルテラ平原で採れる。"},
  {name:"エルティア鉱石",price:155,class:"鉱物資源",detail:"エルの涙と呼ばれる、鉱石にエルの力が宿ってできた美しい石。&分解すると3色のエルの欠片を入手できる。"},
  {name:"ベスマ鉱石",price:110,class:"鉱物資源",detail:"渓谷で産出される鉱石。特殊な加工によって成分を抽出できる。&レイキキ渓谷でたまに採れる。"},
  {name:"ベスバイト",price:210,class:"鉱物資源",detail:"製錬によってクリソナの純度を高めることができる特殊な金属。&ベスマ鉱石から錬成される。"},
  {name:"ムーンストーン",price:60,class:"鉱物資源",detail:"暗所で紫色に光る壊れやすい石。&砂が固まってできたもの。&螺旋回廊で採れる。"},
  {name:"結界の欠片",price:199,class:"その他資源",detail:"結界の欠片。&天上の岐路で採れる。"},
  {name:"虹霓球",price:-1,class:"その他資源",detail:"虹色に光る不思議な球体。"},
  {name:"ディシオン鉱石",price:117,class:"鉱物資源",detail:"アトラス地域で採れる青い鉱石。&ディシティウムという特殊な金属を含んでいる。&ディシオン採掘場でたまに採れる。"},
  {name:"ディシティウム",price:240,class:"鉱物資源",detail:"ディシオン鉱石の青色のもととなる金属。&軽くて丈夫なため、業種を問わず重宝される。"},
  {name:"輝霜錬石",price:115,class:"鉱物資源",detail:"極北で採れる白い鉱石。分解するとグラキエースとディシティウムが手に入る。&北の霊廟でたまに採れる。"},
  {name:"グラキエース",price:99,class:"鉱物資源",detail:"古代の言語で氷という意味を持つ、波模様が特徴的なひんやり冷たい鉱石。&ザヤ山でたまに採れる。"},
  {name:"アイスレート",price:290,class:"鉱物資源",detail:"グラキエースから精製される、氷の板のような物質。燃料になる。&空気中の水分に反応して有毒ガスが発生するため素人が扱うのはとても危険。"},
  {name:"ヒートストーン",price:320,class:"鉱物資源",detail:"高温地帯でたまに見られる石。実はワルド樹脂が年月を経て化石化したもの。&竜の巣でたまに採れる。"},
  {name:"緑柱石",price:75,class:"鉱物資源",detail:"大地の破片とも呼ばれる、翠色に輝く石。&わずかにクリソナ成分を含んでいる。&エルの樹の麓でたまに採れる。"},
  {name:"紫水晶",price:77,class:"鉱物資源",detail:"追憶の邪念とも呼ばれる、紫色に輝く石。&わずかにクリソナ成分を含んでいる。&螺旋回廊でたまに採れる。"},
  {name:"閃雷石",price:76,class:"鉱物資源",detail:"連なりの雷とも呼ばれる、黄色に輝く石。&わずかにクリソナ成分を含んでいる。&ザヤ山でたまに採れる。"},
  {name:"魔力石",price:180,class:"鉱物資源",detail:"三原色の輝きを放つ変わった石。&影の鉱脈で採れる。"},
  {name:"クリソナの欠片",price:-1,class:"鉱物資源",detail:"クリソナを含んだ小さな欠片。&集めればクリソナを作れそうだ。&鉱石を加工すると手に入る。"},
  {name:"低純度クリソナ",price:-1,class:"クリソナ",detail:"不純物が混ざったクリソナ。このままでも使い道はある。&クリソナ原石を加工すると手に入る。"},
  {name:"高純度クリソナ",price:-1,class:"クリソナ",detail:"純度の高いクリソナ。宝石に変えることができる。"},
  {name:"最高純度クリソナ",price:-1,class:"クリソナ",detail:"純度99.5%以上の非常に純度の高いクリソナ。&宝石に変えることができる。"},
  {name:"クリソナ原石",price:-1,class:"鉱物資源",detail:"自然の中にわずかに存在する、クリソナの詰まった原石。&加工するとクリソナがたくさん手に入る。"},
  {name:"ミスリル結晶",price:200,class:"鉱物資源",detail:"銀色に輝く金属の結晶。特殊な組成のためか自然界では滅多に産出されず、幻の金属と呼ばれる。"},
  {name:"古代銀貨",price:300,class:"鉱物資源",detail:"古代エリオン王国で使用されていた銀貨。&トロッシュの巣で採れる。"},
  {name:"古代金貨",price:500,class:"鉱物資源",detail:"古代エリオン王国で使用されていた金貨。&トロッシュの巣で採れる。"},
  {name:"空っぽの水晶玉",price:220,class:"家具",detail:"ガラスでできた水晶玉。入れ物や瓶として使える。&各エルの欠片を持てる数が増える。"},
  {name:"たる",price:230,class:"家具",detail:"木材と木の板をうまく組み合わせて作ったたる。&インベントリが増える。"},
  {name:"竹かご",price:235,class:"家具",detail:"ファルマン竹を編み込んで作ったかご。&インベントリが増える。"},
  {name:"疾風のスムージー",price:150,class:"霊薬",detail:"飲むとたちまち体が軽くなる野菜スムージーの霊薬。&使って出かけると、戦闘から必ず逃げられる。"},
  {name:"超人のスムージー",price:150,class:"霊薬",detail:"飲むと無性に戦いたくなる野菜スムージーの霊薬。&使って出かけると、採取地でのエンカウント率が増加する。"},
  {name:"石のスムージー",price:150,class:"霊薬",detail:"飲むとたちまち気配が消えてしまうスムージーの霊薬。&使って出かけると、採取地でしばらく弱い敵に会わなくなる。"},
  {name:"デニフの氷球",price:160,class:"霊薬",detail:"水のマスターの名を冠する霊薬。&使って出かけると、味方の防御力と氷抵抗が上昇する。"},
  {name:"ロッソの火炎輪",price:160,class:"霊薬",detail:"火のマスターの名を冠する霊薬。&使って出かけると、味方の攻撃力と火傷抵抗が上昇する。"},
  {name:"炎の水晶玉",price:270,class:"戦闘",detail:"炎の力が込められた水晶玉。投げると破裂して辺りを火の海にする。&戦闘で使うと敵にダメージを与え、火傷状態にする。"},
  {name:"氷の水晶玉",price:270,class:"戦闘",detail:"氷の力が込められた水晶玉。投げると破裂して強烈な冷気が発生する。&戦闘で使うと敵を氷結状態にする。"},
  {name:"自然の水晶玉",price:270,class:"戦闘",detail:"自然の力が込められた水晶玉。投げると破裂して毒霧を散布する。&戦闘で使うと敵を中毒状態にする。"},
  {name:"光の水晶玉",price:270,class:"戦闘",detail:"光の力が込められた水晶玉。投げると持続的な回復エリアを作り出す。&戦闘で使うと、しばらくの間味方は行動後にHPが少し回復する。"},
  {name:"闇の水晶玉",price:270,class:"戦闘",detail:"闇の力が込められた水晶玉。投げると持続的に力を奪う結界を作り出す。&戦闘で使うと、しばらくの間敵の攻撃力を下げる。"},
  {name:"風の水晶玉",price:270,class:"戦闘",detail:"風の力が込められた水晶玉。投げると弾けて辺り一帯に風塵をばら撒く。&戦闘で使うと、しばらくの間敵の防御力を下げる。"},
  {name:"木の槍",price:50,class:"戦闘",detail:"木でできた槍。&戦闘中に使うと敵単体に中ダメージを与える。"},
  {name:"光の槍",price:75,class:"戦闘",detail:"光のエルの力を宿した槍。&戦闘中に使うと敵単体に中ダメージを与える。&グリッター系に特攻ダメージを与える。"},
  {name:"沈黙の槍",price:125,class:"戦闘",detail:"神聖なエルの力を宿した沈黙の槍。戦闘中に使うと敵単体に中ダメージを与える。&シャドウ系に特攻ダメージを与える。"},
  {name:"チャージドボルト",price:180,class:"戦闘",detail:"強力に帯電したうに。&戦闘中に使うと敵全体に中ダメージを与える。"},
  {name:"イラスティックボム",price:170,class:"戦闘",detail:"投擲用の小型爆弾。&戦闘中に使うと敵単体に中ダメージを与える。"},
  {name:"ホーネットスティング",price:185,class:"戦闘",detail:"護身用の爆竹。戦闘中に使うと敵全体に中ダメージを与える。"},
  {name:"浮遊石",price:210,class:"戦闘",detail:"魔法に反応して浮力を発生させる石。&飛行船の動力源に使われる。"},
  {name:"ネンヤ竹炭",price:270,class:"製造",detail:"ファルマン竹を原料として作られる炭。&燃料だけでなく、消臭剤にもなる。"},
  {name:"デボラ縫合糸",price:280,class:"製造",detail:"傷を縫うと自然に吸収されるため、抜糸の必要がない特殊な糸。&医療界隈では重宝されるらしい。"},
  {name:"スポア軟膏",price:140,class:"製造",detail:"アルテラシアの花からとれる成分を使った塗り薬。&味方1人のHPが回復する。"},
  {name:"闘魂ドリンク",price:330,class:"消費",detail:"短時間だが効力のある精力剤。味はゲロマズ。戦闘中に使うと味方１人の攻撃力が大きく上昇する。"},
  {name:"ナソードアーマー",price:320,class:"消費",detail:"一時的にナソードアーマーシールドを展開するギア。戦闘中に使うと味方１人の防御力が上昇する。"},
  {name:"ＱＰＬゼリー",price:310,class:"消費",detail:"機械などの滑りをよくするために使われる、ぬめぬめしたゼリー。&戦闘中に使うと味方１人の素早さが上がる。"},
  {name:"ガッツポトフ",price:210,class:"消費",detail:"色んな野菜が入った栄養満点のポトフ。&戦闘中に使うと味方1人に食いしばり効果を付与する。"},
  {name:"ボルケーノトルティーヤ",price:230,class:"消費",detail:"火炎草を生地に混ぜ込んだ、病みつきになるトルティーヤ。&戦闘中に使うと味方１人の攻撃力が上昇する。"},
  {name:"竜牙爆砕丸",price:170,class:"消費",detail:"ハーン家に伝わる漢方薬。陽の気を高める効果がある丸薬。&しばらく味方1人のHPの最大値を50増やす。"},
  {name:"回光返照丸",price:180,class:"消費",detail:"ハーン家に伝わる漢方薬。陰の気を高める効果がある丸薬。&しばらく味方1人のMPの最大値を10増やす。"},
  {name:"デブリアンコーヒー",price:140,class:"消費",detail:"エルダー麦から作られるカフェラテ。&カフェインゼロで子供も飲みやすい。&戦闘で使うと、その戦闘で得られる経験値が少し増える。"},
  {name:"スッキリ茶",price:120,class:"消費",detail:"一口飲むだけで気分が浄化されるお茶。&味方全体の状態異常を回復する。"},
  {name:"エルファイテール",price:160,class:"消費",detail:"エルライム香る炭酸ジュース。&味方単体のMPが30回復する。"},
  {name:"アセラシェイク",price:170,class:"消費",detail:"霜雪イチゴを使った冷たいかき氷。&夏にぴったり。"},
  {name:"スパイシーサラダ",price:180,class:"消費",detail:"野菜たっぷりのスパイシーサラダ。&味方全体のMPが20回復する。"},
  {name:"活力のポーション",price:230,class:"消費",detail:"冒険者御用達のポーション。&慣れた冒険者は頭から浴びて使用する。&HPとMPが30％回復する。"},
  {name:"上級活力ポーション",price:350,class:"消費",detail:"より効力を高めた活力のポーション。使用法は同じ。&味方単体のHPとMPが50％回復する。"},
  {name:"エルダー麦パン",price:160,class:"消費",detail:"エルダー小麦を使った麦パン。&味方単体のHPが55回復する。"},
  {name:"ポールクッキー",price:180,class:"消費",detail:"ポールの形をしたかわいいお菓子。&味方全体のHPが30回復する。"},
  {name:"スターフルーツクッキー",price:190,class:"消費",detail:"スターフルーツの甘酸っぱい味がほんのりと乗ったクッキー。&味方全体のHPが50回復する。"},
  {name:"ミックスベリーケーキ",price:230,class:"消費",detail:"野イチゴとエルダーベリーを使ったケーキ。&味方全体のHPが100回復する。"},
  {name:"フライドチキン",price:130,class:"消費",detail:"スノーパウダーで軽く味付けしたフライドチキン。&味方単体のHPが80回復する。"},
  {name:"ウィンドミルポテト",price:140,class:"消費",detail:"砂漠サツマイモを渦巻き状にスラッシュ＆フライしたポテト。&味方単体のHPが100回復する。"},
  {name:"塩焼き魚",price:160,class:"消費",detail:"リザードバスを塩焼きにしたもの。&味方単体のHPが120回復する。"},
  {name:"甘辛スキュアー",price:210,class:"消費",detail:"ピリ辛の串料理。スタミナ抜群。&味方単体のHPが90回復する。"},
  {name:"竹の葉餃子",price:250,class:"消費",detail:"北部地域でよく食べられる、穀物粉の生地に肉などを包んだ料理。&味方全体のHPが130回復する。"},
  {name:"特選タコスランチ",price:360,class:"消費",detail:"サラダとスキュアーをトルティーヤに包んだスペシャルタコス。&味方全体の攻撃力が上昇し、HPが200、MPが50回復する。"},
  {name:"黄金海鮮三昧",price:420,class:"消費",detail:"海の幸を贅沢に詰め込んだ海鮮料理。&戦闘中に使うと、その戦闘で得られる経験値が3倍になる。"},
  {name:"共存の祝祭パイ",price:30,class:"消費",detail:"共存の祝祭の間食べられるアップルパイ。&味方全体のHPが70回復する。"},
  {name:"魔法のスクロール",price:320,class:"消費",detail:"破るとランダムな位置にワープするスクロール。&使用するとどこかのエリアにワープする。"},
  ]
  for(var i=0; i<itemA.length;i++){
    itemA[i].id=i;
  }
  if(debugmode){
    console.log(itemA.findIndex(value=>value.name=="スノークリスタル"))
    console.log(itemA.findIndex(value=>value.name=="もりもりニンジン"))
    console.log(itemA.findIndex(value=>value.name=="清浄水"))
    console.log(itemA.findIndex(value=>value.name=="緑柱石"))
    console.log(itemA.findIndex(value=>value.name=="エルの清水"))
    console.log(itemA.findIndex(value=>value.name=="クリソナ原石"))
    console.log(itemA.findIndex(value=>value.name=="たる"))
  }
var StatusP=[100,100,100];//HP,ATK,DEF
var StatusE=[30,30,30];
//レシピから作る
//素材を選んでつくる
//分解、錬成フィルター用
const disassemble=new Array(5,14,17,33,56,57,59,65,68,69,70,71,72)
const assembleE=new Array(0,1,2,3,4)
const assembleA=new Array(0,10,11,12,14,15,16,33,58,61,63,65,72,74,78,85,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,107,108,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,133,134,135,136,137,138,139,140,142,143,144,145,146)
//思いついた・覚えたレシピ
var recipe=new Array();
//item[0]伐採 [1]採掘 cleared -1->未判明 0->メニューに？？？と表示
var henirarea=[
  {name:"エルの樹の麓",Nitem:[[5,5,33],[54]],Ritem:[[14,41],[25]],SRitem:[[22,27],[68]]},
  {name:"天上の岐路",Nitem:[[32,35],[54]],Ritem:[[16,29],[55]],SRitem:[[38],[60]]},
  {name:"アルテラ平原",Nitem:[[24,31],[26,55]],Ritem:[[16,29],[66,27]],SRitem:[[40],[57]]},
  {name:"ディシオン採掘場",Nitem:[[7,31],[12,53]],Ritem:[[32],[62]],SRitem:[[40],[70]]},
  {name:"ザヤ山",Nitem:[[34],[12,53]],Ritem:[[16,29],[66,27]],SRitem:[[40],[70]]},
  {name:"トロッシュの巣",Nitem:[[7,31],[12,53]],Ritem:[[16,29],[66,27]],SRitem:[[40],[70]]},
  {name:"影の鉱脈",Nitem:[[7,31],[12,53]],Ritem:[[16,29],[66,27]],SRitem:[[40],[70]]},
  {name:"エリオス行きポータル",Nitem:[[],[]],Ritem:[[],[]],SRitem:[[],[]]},
];
for(var i=0; i<henirarea.length;i++){
  henirarea[i].cleared=-1;
  henirarea[i].id=i;
}
henirarea[0].cleared=0;
var UserItem=new Array(160);
UserItem.fill(0);//採取インベントリ
var UserLibrary=new Array(160);
UserLibrary.fill(0);//採取インベントリ
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
  "UserLibrary":UserLibrary,
  "Area":henirarea,
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
  "UserLibrary":UserLibrary,
  "Area":henirarea,
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
UserLibrary=getdata.UserLibrary.concat();
defeatedmonster=getdata.Monster;
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
GamestartT=0;
defeatedmonster=0;
melonList=[0,0];
achieve_SS=[0,0,0];
//shut down
Bgm.stop();
musicnum=0;
Titleyard.removeAllChildren();
Configmap.removeAllChildren();
Titleyard.addChild(t);
TitleGrh();
var t = new createjs.Text("v1.0/Click Card to START", "24px serif", "white");
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
function saveDL(){//*
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
      "UserLibrary":UserLibrary,
      "Area":henirarea,
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
  UserLibrary=getdata.UserLibrary.concat();
  defeatedmonster=getdata.Monster;
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
  PopAnm("✅セーブデータを読み込みました",1200,500,35,30,55);
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
  const bgm6data ={
    src: "PerituneMaterial_Foreboding_loop.mp3",
    loopStart: 0,
    loopEnd: 129870,
    volume: 0.1,
  };
  const bgm7data ={
    src: "Stage_Noahs.mp3",
    loopStart: 1540,
    loopEnd: 51910,
    volume: 0.5,
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
        {src:'Card_images/soL_room.png'},{src:'Card_images/soL_room_path.png'},{src:'Card_images/soL_room_table.png'},{src:'Card_images/soL_room_map2.png'},{src:'Card_images/soL_room_Path9.png'},{src:'Card_images/soL_room_kit4.png'},{src:'Card_images/soL_room_kit1.png'},{src:'Card_images/soL_room_kit2.png'},{src:'Card_images/soL_room_kit3.png'},{src:'Card_images/soL_room_picture2.png'},
        {src:'Card_images/melon1.png'},{src:'Card_images/melon2.png'},{src:'Card_images/melon3.png'},
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
  var t = new createjs.Text("v1.0/Click Card to START", "24px serif", "white");
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
  console.log('menu',state,area);
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
      if(UserLibrary.indexOf(1)!==-1){
      Opicon3.addEventListener("click", {handleEvent:AsmConfig});
      }
      if(InvID(0)==6){
        MsgAry.push(["　","――ヘニルの時空",-1,-2,3,1])
        MsgAry.push(["リティア","……どうなってるわけ。",0,-2]);
        MsgAry.push(["リティア","せっかく扉が開いたから外に出たと思ったのに、&また変な空間だよ。",0,-2]);
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
        MsgNext(-1);
        InvID(0,7);
      }
        break;
    }
    function returnmenu(){
      menu();
    }
    function HenirPath(){
      switch(this.card){
        case -1:
          if(equipeditem==6 && InvID(6)==1){
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
          var BG1 = new createjs.Bitmap("soL_bg1.png");
          BG1.alpha=0;
          field.addChild(BG1);
          var Car1 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car1.x=-200;
          Car1.y=150;
          Car1.scale=1.8;
          if(henirarea[0].cleared>=0){
          Car1.alpha=0.8;
          }else{
          Car1.alpha=0;
          }
          field.addChild(Car1);
          var Car2 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car2.x=-200;
          Car2.y=150;
          Car2.scale=1.8;
          if(henirarea[1].cleared>=0){
            Car2.alpha=0.8;
            }else{
            Car2.alpha=0;
            }
          field.addChild(Car2);
          var Car3 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car3.x=-200;
          Car3.y=50;
          Car3.scale=1.8;
          if(henirarea[2].cleared>=0){
            Car3.alpha=0.8;
            }else{
            Car3.alpha=0;
            }
          field.addChild(Car3);
          var Car4 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car4.x=-200;
          Car4.y=280;
          Car4.scale=1.8;
          if(henirarea[3].cleared>=0){
            Car4.alpha=0.8;
            }else{
            Car4.alpha=0;
            }
          field.addChild(Car4);
          var Car5 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car5.x=-200;
          Car5.y=50;
          Car5.scale=1.8;
          if(henirarea[4].cleared>=0){
            Car5.alpha=0.8;
            }else{
            Car5.alpha=0;
            }
          field.addChild(Car5);
          var Car6 = new createjs.Bitmap("Card_images/BackColor_Black.png");
          Car6.x=-200;
          Car6.y=280;
          Car6.scale=1.8;
          if(henirarea[5].cleared>=0){
            Car6.alpha=0.8;
            }else{
            Car6.alpha=0;
            }
          field.addChild(Car6);
          var shape = new createjs.Shape();
          shape.graphics.beginFill("#bae0c3");
          shape.graphics.beginStroke("#617d68");
          shape.graphics.setStrokeStyle(2);
          shape.graphics.drawRect(30, 480, 262, 35);
          field.addChild(shape);
          var T=new createjs.Text("　","24px serif","#46574a");
          T.x=35;
          T.y=483;
          field.addChild(T);
          createjs.Tween.get(Car1)
          .to({x:-10},400, createjs.Ease.backOut);
          createjs.Tween.get(Car2)
          .to({x:160},600, createjs.Ease.backOut);
          createjs.Tween.get(Car3)
          .to({x:330},800, createjs.Ease.backOut)
          createjs.Tween.get(Car4)
          .to({x:330},800, createjs.Ease.backOut)
          createjs.Tween.get(Car5)
          .to({x:500},800, createjs.Ease.backOut)
          createjs.Tween.get(Car6)
          .to({x:500},800, createjs.Ease.backOut)
          .call(SoLkey);
          function SoLkey(){
          Car1.addEventListener("mouseover", {card:1,handleEvent:MouseOver});
          Car1.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car2.addEventListener("mouseover", {card:2,handleEvent:MouseOver});
          Car2.addEventListener("mouseout", {card:0,handleEvent:MouseOver});
          Car1.addEventListener("click", {card:1,handleEvent:HenirPath});
          Car2.addEventListener("click", {card:2,handleEvent:HenirPath});
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
                createjs.Tween.get(BG).to({alpha:0.8},200);
                break;
              case 1:
                createjs.Tween.get(BG).to({alpha:0},100);
                createjs.Tween.get(BG1).to({alpha:0.8},200);
                T.text=henirarea[this.card-1].name;
                break;
              case 2:
                break;
              case 3:
                break;
              case 4:
                break;
              case 5:
                break;
              case 6:
                break;
            }
          };
          };
          break;
          default:
          //各地域へ入場
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
          Henirmap(playMode[1]);
          };
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
      Header2.addEventListener("click", {handleEvent:SoLchara})
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
            var ID=inventory.findIndex(value=>value.id==1);
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
              //test
              //Letterbox.push(["提供","クリア記念品","ここまでのプレイ、&ありがとうございます！&脱出を記念して、装備すると&クロンダイク・マグマンタを&通常と少し異なるルールで&遊べるアイテムを贈呈します。","ピッケル"]);
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
          var T =new createjs.Bitmap(Item_src[7]);
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
                console.log('出口');
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
        if(cleared[0][2]>=7){
          AK("エリアノド守護者");
        };
        if(achieve_SS[0]>0 && achieve_SS[1]>0 && achieve_SS[2]>0){
          AK("SS魂");
        }
        if(cleared[0][0]>0 && cleared[0][1]>0 && cleared[0][2]>0 && totalcardmove>=2400){
          IK("エル・コレクション・ブック");
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
        PathTalk();
        break;
  }
};
function Henirmap(p){
  //各地域の描画
  console.log('henirmap',p);
  switch(p){
    case 0:
      if(musicnum!==7){
        Bgm.stop();
        musicnum=7;
        if(mute=="ON"){
        Bgm=new Music(bgm7data);
        Bgm.playMusic();
        }}
      var BG1 = new createjs.Bitmap("soL_bg1.png");
      BG1.alpha=0.8;
      field.addChild(BG1);
      var Room = new createjs.Bitmap("Card_images/soL_henir.png");
      Room.scale=0.5;
      Room.x=100;
      Room.y=200;
      Room.alpha=0.6;
      field.addChild(Room);
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
      obj.graphics.drawRect(15, 125, 262, 35);
      field.addChild(obj);
      var T=new createjs.Text("採取スタート","24px serif","#46574a");
      T.x=20;
      T.y=128;
      field.addChild(T);
      var obj2 = new createjs.Shape();
      obj2.graphics.beginFill("#bae0c3");
      obj2.graphics.beginStroke("#617d68");
      obj2.graphics.setStrokeStyle(2);
      obj2.graphics.drawRect(15, 160, 262, 35);
      field.addChild(obj2);
      var T=new createjs.Text("入口に戻る","24px serif","#46574a");
      T.x=20;
      T.y=163;
      field.addChild(T);
      var hp = new createjs.Shape();
      //hp.graphics.beginFill("black");
      hp.graphics.beginFill("rgba(242,40,10)");
      hp.graphics.moveTo(106, 44);
      hp.graphics.lineTo(109, 56);
      hp.graphics.lineTo(354, 47);
      hp.graphics.lineTo(364, 30);
      field.addChild(hp);
      Opicon2.addEventListener("click", {handleEvent:InvConfig});
      obj.addEventListener("click", {card:4,handleEvent:GameReady});
      obj2.addEventListener("click", {rule:playMode[0],handleEvent:Gameend});
      Room.addEventListener("click", {card:110,num:1,handleEvent:HenirKey});
      if(henirarea[p].cleared==0){
        //初入場時のイベント
        switch(p){
          case 0:
            cLock=false;
            var Ary=[];
            var shape = new createjs.Shape();
            shape.graphics.beginFill("#808080").drawRect(0, 0, 800, 600);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(shape).to({alpha:0.4},600).wait(1000).to({alpha:0},800);
            var t=new createjs.Text(henirarea[p].name,"64px serif","white");
            t.x=150;
            t.y=250;
            t.alpha=0;
            field.addChild(t);
            Ary.push(t);
            createjs.Tween.get(t).to({alpha:1},600).wait(1000).to({alpha:0},800);
            shape.graphics.beginFill("white").moveTo(140,320).lineTo(450,320);
            field.addChild(shape);
            shape.alpha=0;
            Ary.push(shape);
            createjs.Tween.get(t).to({alpha:1},600).wait(2000).call(firstEv);
            MsgAry.push(["リティア","まさかフルーツポンチで扉が開くなんてね……。",0,-2,3,1])
            MsgAry.push(["リティア","クリソナには狭間を開く力がある……。&もしかしたら、氷のクリソナを使ったことが関係したのかな。",0,-2])
            MsgAry.push(["リティア","で、ここは……森？",0,-2]);
            MsgAry.push(["リティア","さっきのおじさんは、&ここから出たければもっとエリオス側に来いって&言ってたけど……。",0,-2]);
            MsgAry.push(["リティア","助ける気があるなら、&もっと具体的に教えてくれればいいのに。&いちいち上から目線の言い方してくるし。",0,-2]);
            MsgAry.push(["リティア","あーもう、考えてても始まらない！&このあたりをいろいろ調べてみよう！",0,-2]);
            MsgAry.push(["リティア","もしかしたら、&思いがけない宝物があるかもしれないし！",0,-2]);
            MsgAry.push(["collection"]);
        break;
        }
      }
      function firstEv(){
        for(var i=0;i<Ary.length;i++){
          field.removeChild(Ary[i]);
        }
        cLock=true;
        MsgNext(-1);
        henirarea[p].cleared=1;
      }
      break;
  }
}
function HenirKey(){
    switch(this.card){
      default:
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
        Dialogue("Required Item",itemA[this.card].detail+"×"+this.num,-1,-1,"OK",350,330,80,40);
        }
        break;
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
function SoLchara(){
  if(opLock==0){
    field.removeAllChildren();
    opLock=4;
    se11.play();
    if(Itemswitch==1){
      createjs.Tween.get(Itemyard)
      .to({x:100},150, createjs.Ease.backOut)
      Itemswitch=0;
      }
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
var t = new createjs.Text("プレイデータ", "36px serif", "white");
t.x=360;
t.y=60;
field.addChild(t);
disp(GamestartT);
if(hour<10){hour="0"+hour};
if(min<10){min="0"+min};
var t = new createjs.Text("総プレイ時間　"+hour+"："+min, "24px serif", "white");
t.x=360;
t.y=240;
field.addChild(t);
var t = new createjs.Text("("+Math.floor(totalcardmove/10)+")", "18px serif", "white");
t.x=110;
t.y=80;
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
}
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
}
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
    var S=new createjs.Bitmap(Card_src[TT]);
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
      if(Extras[0]>0){
        var R=Math.floor(Math.random()*3);
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
      }
      Extras[0]=0;
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
function pickMsg(word){
  for( var lines=word.split( "&" ), i=0, l=lines.length; l>i; i++ ){
    Exlists[4][i].text=lines[i];
  };
  }
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
function handleClick(event){
  //ヘニル　山札の数とプラスマイナス1なら移動する
  //1は11としても扱える
  if(cLock && mLock && opLock==0){
    var I=Math.floor(this.card/100);
    var J=this.card%100;
    if(J==hands[I].length-1){
      var TT=deckfaces[deckfaces.length-1]
      console.log(hands[I][J],TT);
      var A=hands[I][J]%10;
      var B=TT%10;
      if(A==0){A+=10};
      if(B==0){B+=10};
      //1-10,11-20...
      var E=Math.abs(B-A);
      if(E==1 || E==9){
        if(Extras[0]>=5){se10.play();}else{se12.play();}        
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
    switch(Extras[0]){
    case 1:
    case 2:
      var R=Math.floor(Math.random()*henirarea[0].Nitem[Extras[1]].length);
      A=henirarea[0].Nitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*2)
      break;
    case 3:
      var R=Math.floor(Math.random()*henirarea[0].Nitem[Extras[1]].length);
      A=henirarea[0].Nitem[Extras[1]][R];
      B=3+Math.floor(Math.random()*2)
      break;
    case 4:
    case 5:
      var R=Math.floor(Math.random()*henirarea[0].Ritem[Extras[1]].length);
      A=henirarea[0].Ritem[Extras[1]][R];
      B=1+Math.floor(Math.random()*3)
      break;
    default:
      var R=Math.floor(Math.random()*henirarea[0].SRitem[Extras[1]].length);
      A=henirarea[0].SRitem[Extras[1]][R];
      B=1+Math.floor(Math.random()*3)
      break;
    }
    itemA.findIndex(value=>value.id==A);
    Extras[1].text=itemA[A].name;
    if(Extras[0]>=7){
      if(Extras[1]==0){
        pickMsg(itemA[A].name+"を"+B+"個ゲットしたよ！&カッターが止まらない！");
      }else{
        pickMsg(itemA[A].name+"を"+B+"個ゲットしたよ！&ドリルが止まらない！");
      }
    }else if(Extras[0]>=5){
    pickMsg(itemA[A].name+"を"+B+"個ゲットしたよ！&これ、珍しそう！");
    }else if(Extras[0]>=3){
    pickMsg("続けて"+itemA[A].name+"を"+B+"個ゲットしたよ！&あれもこれも、ぜーんぶあたしのもの！");
    }else if(Extras[0]>=2){
    pickMsg("続けて"+itemA[A].name+"を"+B+"個ゲットしたよ！");
    }else{
    pickMsg(itemA[A].name+"を"+B+"個ゲットしたよ！&　");
    }
    var Ary=Array(B);
    Ary.fill(A);
    Exlists[3]=Exlists[3].concat(Ary);
    console.log(Exlists[3]);
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
      Gameover();
    }
    return true;
  }
}
function SoundConfig(event,p=0){
  //console.log('soundconfig',p)
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
          option_bt.addEventListener("click", {handleEvent:saveDLcomfirm});
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
function InvConfig(p=-1){
if(p==0){
  //入手時には描画する
  Itemyard.removeAllChildren();
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
  var Itemmap = new createjs.Container();//インベントリ
  var Materialmap = new createjs.Container();
  Itemyard.addChild(Itemmap);
  var shapeMask3 = new createjs.Shape();
          shapeMask3.graphics
                .beginFill("gold")
                .drawRect(700, 90, 100, 425);
  Itemmap.mask = shapeMask3;
    itemAry=[];
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
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(805, 55, 262, 35);
    Itemyard.addChild(shape);
    var T=new createjs.Text("素材","24px serif","#46574a");
    T.x=910;
    T.y=58;
    Itemyard.addChild(T);
    var shapeMask3 = new createjs.Shape();
            shapeMask3.graphics
                  .beginFill("gold")
                  .drawRect(800, 55, 280, 460);
    Materialmap.mask = shapeMask3;
    var H=UserItem.filter(value=>value>0);
    var Hash=H.length*25;
    Matbar.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
    Matbar.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
    var I=0;
  for(var i=0;i<UserItem.length;i++){
    if(UserItem[i]>0){
      var t = new createjs.Shape();
      t.graphics.beginFill("black");
      t.graphics.drawRect(815, 100+25*I, 245, 25);
      t.alpha=0.6;
      Materialmap.addChild(t);
      var T=new createjs.Text(itemA[i].name,"20px serif","white");
      T.x=815;
      T.y=100+25*I;
      Materialmap.addChild(T);
      var T=new createjs.Text(" ×"+UserItem[i],"20px serif","white");
      T.x=1000;
      T.y=100+25*I;
      Materialmap.addChild(T);
      t.addEventListener("mousedown", {hash:Hash,handleEvent:MatDown});
      t.addEventListener("pressmove", {hash:Hash,handleEvent:MatMove}); 
      t.addEventListener("mouseover", {card:i,handleEvent:MatDetail_1});
      t.addEventListener("mouseout", {card:-1,handleEvent:MatDetail_1});
      I+=1;
    }}
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
      var detail=itemA[this.card].name+"："+itemA[this.card].detail
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
var AsmAry=[]
function AsmConfig(){
  //錬成を行う
  //加工→1つの材料を選んで分解や精製を行います。
  //製錬→クリソナを生み出します。
  //錬成⇒クリソナを使って、新たな物質を生み出します。
  //レシピから作る　自分で作る
if(AsmAry.length){
  for(var i=0;i<AsmAry.length;i++){
    field.removeChild(AsmAry[i])
  }
};
AsmAry=[];
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
var T=new createjs.Text("加工","24px serif","#46574a");
T.x=55;
T.y=283;
field.addChild(T);
AsmAry.push(T);
var T=new createjs.Text("製錬","24px serif","#46574a");
T.x=275;
T.y=283;
field.addChild(T);
AsmAry.push(T);
var T=new createjs.Text("錬成","24px serif","#46574a");
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
AsmAry[1].addEventListener("click", {card:2,handleEvent:Assemble});
AsmAry[2].addEventListener("click", {card:3,handleEvent:Assemble});
AsmAry[0].addEventListener("mouseover", {card:1,handleEvent:Asmdetail});
AsmAry[1].addEventListener("mouseover", {card:2,handleEvent:Asmdetail});
AsmAry[2].addEventListener("mouseover", {card:3,handleEvent:Asmdetail});
}
function Asmdetail(){
  switch(this.card){
    case 1:
      DetailText.text="加工/1つの材料を選んで分解や精製を行います。"
      break;
    case 2:
      DetailText.text="製錬/クリソナを製錬し、宝石を作り出します。"
      break;
    case 3:
      DetailText.text="錬成/クリソナを使って、新たな物質を生み出します。"
      break;
  }
}
};
function Assemble(){
  Ct.removeAllChildren();
  se11.play();
  opLock=12;
  switch(this.card){
    case 1:
      //加工
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
        var T=new createjs.Text("加工","24px serif","#46574a");
        T.x=60;
        T.y=64;
        field.addChild(T);
        AsmAry.push(shape);
        AsmAry.push(T);
        var shapeMask3 = new createjs.Shape();
                shapeMask3.graphics
                      .beginFill("gold")
                      .drawRect(55, 80, 262, 400);
        Materialmap.mask = shapeMask3;
        var shape = new createjs.Shape();
        shape.graphics.beginFill("black");
        shape.graphics.drawRect(55, 475, 600, 50);
        shape.alpha=0.7
        field.addChild(shape);
        AsmAry.push(shape);
        var DetailText=new createjs.Text("　","20px serif","white");
        DetailText.x=55;
        DetailText.y=477;
        field.addChild(DetailText);
        AsmAry.push(DetailText);
        var DetailText=new createjs.Text("　","20px serif","white");
        DetailText.x=55;
        DetailText.y=502;
        field.addChild(DetailText);
        AsmAry.push(DetailText);
        field.addChild(Ct);
        var I=0;
      for(var i=0;i<disassemble.length;i++){
        if(UserItem[disassemble[i]]>0){
          var t = new createjs.Shape();
          t.graphics.beginFill("black");
          t.graphics.drawRect(55, 100+25*I, 265, 25);
          t.alpha=0.6;
          Materialmap.addChild(t);
          var T=new createjs.Text(itemA[disassemble[i]].name,"20px serif","white");
          T.x=65;
          T.y=102+25*I;
          Materialmap.addChild(T);
          var T=new createjs.Text(" ×"+UserItem[disassemble[i]],"20px serif","white");
          T.x=260;
          T.y=102+25*I;
          Materialmap.addChild(T);
          t.addEventListener("mouseover", {card:disassemble[i],handleEvent:Matdetail});
          t.addEventListener("click", {type:0,product:disassemble[i],loop:1,handleEvent:Alchemyset});
          I+=1;
        }}
      break;
  }
}
function Matdetail(){
  var detail=itemA[this.card].detail;
  for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
    var line = lines[i] ;
    AsmAry[AsmAry.length-2+i].text=line;
    if(i==1){break};
  };
}
var Ct = new createjs.Container();
function Alchemyset(e,type,product,loop=1){
  //ALchemyへのつなぎ,type0,1=>プレビュー画面表示 2,3=>実行,loop=>実行回数
  if(opLock==10){return false};
  se11.play();
  Ct.removeAllChildren();
  type=this.type;
  product=this.product;
  loop=this.loop;
  var vproname=product
  var vpronum=0
  var vmatnameA=[]
  var vmatnumA=[]
  if(loop<=0){loop=1}
  if(loop>UserItem[vproname]){loop=UserItem[vproname]};
  if(type==0 || type==2){//分解プレビュー
  switch (product){
    case 5:
    if(type==2){
    Alchemy(0,[5],[1],[10,6],[2,1],loop);
               }
    if(type==0){
    vpronum=1*loop;
    vmatnameA.push(10,6);
    vmatnumA.push(2,1);
    for(var i=0;i<vmatnumA.length;i++){
      vmatnumA[i]*=loop;
      }
    }
  break;
   default:
      //Message(-1,"加工出来ないアイテム",3)
  return false;
  }
  //描画と分解可否判定
  if(type==0){
    var shape = new createjs.Shape();
    shape.graphics.beginFill("black");
    shape.graphics.drawRect(350, 80, 300, 380);
    shape.alpha=0.7
    Ct.addChild(shape);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 60, 300, 40);
    Ct.addChild(shape);
    var T=new createjs.Text("いくつ加工する？","24px serif","#46574a");
    T.x=360;
    T.y=65;
    Ct.addChild(T);
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 370, 150, 50);
    Ct.addChild(shape);
    shape.addEventListener("click", {type:type,product:product,loop:loop-1,handleEvent:Alchemyset});
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(500, 370, 150, 50);
    Ct.addChild(shape);
    shape.addEventListener("click", {type:type,product:product,loop:loop+1,handleEvent:Alchemyset});
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#bae0c3");
    shape.graphics.beginStroke("#617d68");
    shape.graphics.setStrokeStyle(2);
    shape.graphics.drawRect(350, 420, 300, 40);
    Ct.addChild(shape);
    shape.addEventListener("click", {type:2,product:product,loop:loop,handleEvent:Alchemyset});
    var T=new createjs.Text("OK","24px serif","#46574a");
    T.x=480;
    T.y=422;
    Ct.addChild(T);
    var S = new createjs.Bitmap('Winedom_arrowleft.png');
    S.scale=0.4;
    S.x=420;
    S.y=370;
    Ct.addChild(S);
    var S = new createjs.Bitmap('Winedom_arrowright.png');
    S.scale=0.4;
    S.x=550;
    S.y=370;
    Ct.addChild(S);
    var T=new createjs.Text(itemA[vproname].name,"24px serif","white");
    T.x=360;
    T.y=120;
    Ct.addChild(T);
    var T=new createjs.Text(" ×"+vpronum+"/"+UserItem[vproname],"24px serif","white");
    T.x=360+180;
    T.y=120;
    Ct.addChild(T);
    var S = new createjs.Bitmap('Winedom_arrowdown.png');
    S.scale=0.3;
    S.x=480;
    S.y=160;
    Ct.addChild(S);
    for(var i=0;i<vmatnameA.length;i++){
      var T=new createjs.Text("　","24px serif","white");
      T.x=360;
      T.y=210+30*i;
      Ct.addChild(T);
      var P=UserLibrary[vmatnameA[i]]
      if(P==0){
      T.text="???";
      }else{
      T.text=itemA[vmatnameA[i]].name;
      }
      var T=new createjs.Text("×"+vmatnumA[i],"24px serif","white");
      T.x=360+180
      T.y=210+30*i;
      Ct.addChild(T); 
    }
  }
  if(type==2){
  //Message(0,"できたー！",3)
  }
  }
  if(type==1 || type==3){
  switch (product){
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
  for(var i=0; i<loop ; i++){
  daypass+=0.1;
  if(type==3){
    Alchemy(1,product,1,1,1);
             }
  }
  if(type==1){
  vpronum=1*loop;
  vmatnameA=1;
  vmatnumA=1*loop;
  }
      break;
    case 10:
  for(var i=0; i<loop ; i++){
  daypass+=0.5
  if(type==3){
  Alchemy(1,product,1,9,3,5,1);
  }
  }
  if(type==1){
  vpronum=1*loop;
  vmatnameA=9;
  vmatnumA=3*loop;
  vmatnameB=5;
  vmatnumB=1*loop;
  }
      break;
  default:
  Message(-1,"出来ないよー。",3)
  }
  //描画と錬成可否判定
  if(type==1){
  cx1.clearRect(x-12,y-52,255,365)
  cx2.clearRect(x-12,y-52,255,365)
  cx3.clearRect(x-12,y-52,255,365)
  Message(-1,"いくつ錬成しようかな？",3)
  cx2.font = "20px 'Century Gothic'";
  cx2.fillText("個数/現在所持数",x+40,y-25)
  cx2.font = "16px 'Century Gothic'";
  var unk=1;
  for(var i=0;i<vmatnameA.length;i++){
    var A=UserLibrary[vmatnameA[i]]
    if(A==0){//知らないアイテム
    cx2.fillText("???",x,y);
    unk=0;
    }else{
      if(vmatnumA[i]>UserItem[vmatnumA[i]]){//不足
    cx2.fillStyle = 'red';
    }
    cx2.fillText(itemA[vmatnameA].name,x,y)
    cx2.fillText("×"+vmatnumA[i]+"/"+UserItem[vmatnumA[i]],x+180,y)
    cx2.fillStyle = "#f0f0f0";
    }
    y+=30;  
  }
  cx2.fillText("　　 ↓",x,y)
  y+=30
  cx2.fillText(itemA[vproname].name,x,y)
  cx2.fillText("×"+vpronum,x+180,y)
  //drawsq(x-10,60,250,y);
  if(unk==0){return false;}
  }
  if(type==3){
  //日数経過
  //Message(0,"できたー！",3)
  }}
  };
  function Alchemy(type=0,product,pnum,materialA,mnumA,loop=1){
  //type0=>product to materials, type1=>materials to product
  //Alchemy(0,[5],[1],[10,6],[2,1],loop);
  //結果画面描画用意
  var KitAry=[];
  cookready(5+loop);
  function cookready(length=20,word="加工中・・・"){
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
    window.requestAnimationFrame((ts)=>Cook(ts,length));
    }
  function Cook(ts,length=20,tflame=0,sf=0){
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
      se10.play();
      Ct.alpha=1;
      cLock=true;
    }else{
    window.requestAnimationFrame((ts)=>Cook(ts,length,tflame,sf));
    }
  }
  if(type==0){
  //ドン
  opLock=10;
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
  shape.addEventListener("click", {card:1,handleEvent:Assemble});
  var t=new createjs.Text("OK","bold 24px 'メイリオ'","white");
  t.x=360;
  t.y=365;
  Ct.addChild(t); 
  UserItem[product]-=pnum*loop;
  for(var i=0;i<materialA.length;i++){
    UserItem[materialA[i]]+=mnumA[i]*loop;
    if(UserLibrary[materialA[i]]==0){
    UserLibrary[materialA[i]]=1;
    var t=new createjs.Text("new item!!","20px serif","white");
    t.x=220;
    t.y=150+30*i;
    Ct.addChild(t);
    }
    var t=new createjs.Text(itemA[materialA[i]].name+"×"+mnumA[i]*loop,"24px serif","white");
    t.x=330;
    t.y=150+30*i;
    Ct.addChild(t);
    InvConfig(0);
  }
  };
  if(type==1){
  Useritem[product]+=pnum;
  Useritem[materialA]-=mnumA;
  Useritem[materialB]-=mnumB;
  Useritem[materialC]-=mnumC;
  Useritem[materialD]-=mnumD;
  Useritem[materialE]-=mnumE;
  Useritem[materialF]-=mnumF;
  //カッ
  cx2.font = "20px Arial";
  if(Userlibrary[product]==0){
    Userlibrary[product]=product
    cx2.fillText("new item!!",xx-100,yy)
    };
  cx2.fillText(itemA[product].name,xx,yy)
  cx2.fillText("×"+pnum,xx+250,yy)
  }
  };
  function Formula(){
  //調合レシピと照合する
  //霓玉を使って失敗したら霓玉だけは返す
  console.log(mixlist)
  cx2.font = "36px Arial";
  var xx=150
  var yy=180
  cx2.fillText("RESULT", 150, yy);
  cx2.font = "24px Arial";
  cx2.fillText("OK [Z]", 580, 380);
  cx2.font = "20px Arial"
  for(var i=0; i<mixlist.length ; i++){
    yy+=22
    cx2.fillText(itemA[mixlist[i]].name, xx, yy);
  }
  yy+=40
  mapstate=7;
  pagestate=0;
  var result=mixlist.findIndex(value=>value==76);
  if(result==-1){result=2+Math.floor(Math.random()*6)}else{result=76}
  //数の一致
  var A=formulaA.filter(value=>value.Mat.length==mixlist.length);
  if(A.length==0){
    cx2.font = "36px Arial";
    cx2.fillText("調合失敗！", 320, 180);
    cx2.font = "20px Arial"
    cx2.fillText("材料は"+itemA[result].name+"になってしまいました。", xx, yy);
    Useritem[result]+=1;
    return result;
  }
  //中身の一致
  mixlist.sort(compareFunc)
  console.log(mixlist,A);
  for(var i=0; i<mixlist.length ; i++){
  var A=A.filter(value=>value.Mat[i]==mixlist[i])
  if(A.length==0){
    cx2.font = "36px Arial";
    cx2.fillText("調合失敗！", 320, 180);
    cx2.font = "20px Arial"
    cx2.fillText("材料は"+itemA[result].name+"になってしまいました。", xx, yy);
    Useritem[result]+=1;
    return result;
  }}
  console.log(A[0].Mix);
    cx2.font = "36px Arial";
    cx2.fillText("調合成功！", 320, 180);
    Userlibrary[A[0].Mix]=A[0].Mix
      cx2.font = "20px Arial"
    cx2.fillText(itemA[A[0].Mix].name+"のレシピを覚えました！", xx, yy);
    for(var i=0; i<mixlist.length ; i++){
      Useritem[mixlist[i]]+=1
      }
  return A[0].Mix
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
  function Dialogue(word,detail="　",yes=1,no=-1,ok=-1,okx=345,oky=300,okw=105,okh=60){
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
    }
    createjs.Tween.get(Loadmap)
    .to({x:0},150);
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
          TitleGrh();
          var t = new createjs.Text("v1.0/Click Card to START", "24px serif", "white");
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
      case "end":
        Loadmap.removeAllChildren();
        opLock=0;
        cLock=true;
        return false;
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
      case "solithia":
        Loadmap.removeAllChildren();
        Dialogue("遊び方","テーブルをクリックしてソリティアを始める",-1,-1,"OK");
        cLock=true;
        return false;
      case "collection":
        Loadmap.removeAllChildren();
        Dialogue("採取","ヘニルの時空のエリアでは、&採取をして素材を集めることができます。",-1,-1,"OK");
        cLock=true;
        return false;
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
  if(equipeditem==7){playMode[1]=1}else{playMode[1]=0};
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
      case 4:
        //ヘニル
      yakumap_rule = new createjs.Bitmap("soL_rule4.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      Backyard.removeAllChildren();
      switch(playMode[1]){
        default:
          BG = new createjs.Bitmap("soL_bg1.png");
      break;
      }
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
      //handsLog=cards.concat();
      hands = [
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
        cards.splice(0, 4),
      ]
      decks = cards.concat();
      Extras=[0,0,0,0];//0->連鎖数 1->0:カッター1:ドリル 2->獲得素材id 3->個数
      Exlists=[[],[],[],[],[],[]];//0->extras[1]テキスト 1->extras[2] 2->extras[3] 3->getitem 4->メッセージ格納
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
        break;
        case 4:
          if(musicnum!==7){
            Bgm.stop();
            musicnum=7;
            if(mute=="ON"){
            Bgm=new Music(bgm7data);
            Bgm.playMusic();
            }}
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
          var DL= new createjs.Bitmap("window_ds.png");
          DL.scale=0.6;
          DL.x=5;
          DL.y=130;
          field.addChild(DL);
          for( var i=0;i<3; i++ ){
          var t=new createjs.Text("　","bold 26px 'メイリオ'","white");
          t.x=15;
          t.y=470+i*32;
          field.addChild(t);
          Exlists[4].push(t);
          };  
          var Opicon2 = new createjs.Bitmap("soL_opicon2.png");
          Opicon2.x=670;
          Opicon2.y=540;
          field.addChild(Opicon2);
          //deck
          DeckReset_H();
          FirstAnimation();
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
      createjs.Tween.get(T)
      .to({x:95+i*(cardWidth+cardgapX),y:5+j*cardgapY,alpha:1},80)
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
        case 4:
          se1.play();
          i+=1;
          if(i>5){
            i=0;
            j+=1;
            if(j>3){
              cLock=true;
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
              var t=new createjs.Text("Get item","24px メイリオ","white");
              t.x=600;
              t.y=100;
              clearBG.addChild(t);
                var ExlistsAry = Exlists[3].filter((element, index) => Exlists[3].indexOf(element) === index);
                console.log(ExlistsAry);
              for(var i=ExlistsAry.length-1; i>=0; i--){
                  var A=itemA.findIndex(value=>value.id==ExlistsAry[i])
                  var B=Exlists[3].filter(value=>value==ExlistsAry[i]);
                  t= new createjs.Text(itemA[A].name+"×"+B.length, "bold 20px 'メイリオ'", "#f06787");
                  t.x=580;
                  t.y=130+i*23;
                  clearBG.addChild(t);
                  UserItem[A]+=B.length;
                  if(UserLibrary[A]==0){UserLibrary[A]=1};
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
              Exlists[3].push(A);
              t= new createjs.Text(itemA[A].name+"×1", "bold 20px 'メイリオ'", "#f06787");
              t.x=580;
              t.y=380;
              clearBG.addChild(t);
              UserItem[A]+=1;
              if(UserLibrary[A]==0){UserLibrary[A]=1};
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
        retry_bt.x=600;
        retry_bt.y=420;
        clearBG.addChild(retry_bt);
        retry_bt2.x=600;
        retry_bt2.y=480;
        clearBG.addChild(retry_bt2);
      cLock=true;
      }
    }};
    function PathText(){
      //狭間との会話
      if(opLock!==0 && opLock!==11){return false};
      if(equipeditem==8){
    var R=9+Math.floor(Math.random()*6);
      }else{
    var R=Math.floor(Math.random()*9);
      }
    //Message(word,detail="　",chr=0,chrop=0,textspeed=3,first=0)
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
        MsgAry.push(["リティア","これ、カードを色が交互になるように&重ねないといけないのが、じれったいのよねー。"]);
        MsgAry.push(["リティア","まぁ、どーせ時間はたっぷりあるんだし？&あたしの独り言でも聴きながら？　見てなさいよ。"]);
        MsgAry.push(["狭間","はいはい。",1]);
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 3:
        MsgAry.push(["　","――マグマンタは、5組のトランプを使ったソリティアだ。",-1,0,3,1])
        MsgAry.push(["狭間","マグマンタという名前は、&エリオスにいる巨大グモの魔物が由来だよ。",1]);
        MsgAry.push(["リティア","8列使うから、列の数がちょうどクモの足の数と同じなのね。"]);
        MsgAry.push(["リティア","でもさ、流石にクモはなくない？&もっと可愛い名前なかったの？"]);
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
        MsgAry.push(["狭間","さあ……ぼくには分からないよ。",1]);
        MsgAry.push(["リティア","じゃあ、これ作った人もそこまで考えてないってことね！"]);
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
      case 9:
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
      case 10:
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
      case 11:
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
      case 12:
        MsgAry.push(["　","レナ・エリンデルは、心優しいエルフの弓使い。年齢不詳。&隊の中ではお姉さん的な存在で、たまに怒ると怖い。&弓を射る時には、弦と矢はマナで生成している。",-1,0,3,1]);
        MsgAry.push(["リティア","でっか……コホン。&初期メンバーは、&エルス、アイシャ、レナの3人だったんだよね。"]);
        MsgAry.push(["狭間","当初は隊の中で一番大人だったから、&よくエルスとアイシャの面倒をみてあげていたそうだよ。",1])
        MsgAry.push(["リティア","頼れる大人がそばにいるのは、ありがたいことだよね。"]);
        MsgAry.push(["リティア","すごく若く見えるけど、何歳くらいなのかな。"]);
        MsgAry.push(["狭間","うーん。エルフという種族が何百年も生きる種族だからね。&レナに限らずエル捜索隊のメンバーは&年齢不詳とされる人が少なくないよ。",1])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 13:
        MsgAry.push(["リティア","レイヴン・クロムウェル。&元傭兵で、左腕はナソードに改造されている、と。",0,0,3,1]);
        MsgAry.push(["狭間","クロムウェル家の名前はベルダーにいた頃に&耳にしたけど……クロムウェル家の養子は&世の中では死んだことになっているみたいだ。",1])
        MsgAry.push(["リティア","お～！　&あたし以外にも、ナソード技術を戦闘に応用している&賢い人がいるじゃない！"]);
        MsgAry.push(["狭間","自分の杖を好き勝手に弄るのと、&望まない改造で腕を機械に変えられるのは&訳が違うと思う……。",1])
        MsgAry.push(["リティア","えー。&でもさ、腕がナソードだったら、採掘も楽ちんだし。&本人も便利だと思ってるよ。きっと。"]);
        MsgAry.push(["狭間","念のため言っておくけど、&人類がみんな遺跡の探索や遺物のために&生きてるわけじゃないからね。",1])
        MsgAry.push(["end"]);
        MsgNext(-1);
        break;
      case 14:
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
    }
    }
    function PathTalk(){
      //event
      //125,300,525,800,1125,1500
      if(opLock!==0 && opLock!==11){return false};
      if(InvID(0)==1 && totalcardmove>=300){
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
      if(InvID(0)==2 && totalcardmove>=525){
        MsgAry.push(["狭間","……。",1,0,3,1])
        MsgAry.push(["リティア","ふー。ちょっと休憩しよ……。",0,-1])
        MsgAry.push(["狭間","……。",1,-2]);
        MsgAry.push(["狭間","すみません。&少し、いいかな。",1,-2]);
        MsgAry.push(["狭間","そう、そこでリティアと一緒にソリティアをしてる&キミに向かって話しかけている。",1,-2]);
        MsgAry.push(["狭間","お願いがあるんだ。&どうか、協力してほしい。",1,-2]);
        MsgAry.push(["狭間","リティアを外に、エリオスに出してあげたい。",1,-2]);
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
      if(InvID(0)==3 && totalcardmove>=800){
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
        MsgAry.push(["リティア","扉の向こうへは出られたんだけど、&「抵抗力を上げるアイテム」がないと、&先に進めないみたいでさ。"]);
        MsgAry.push(["狭間","抵抗力を上げるアイテムか……。",1]);
        MsgAry.push(["リティア","昔、あたしが体調を崩した時に、&ジョイが作ってくれたスイーツがあったよ。"]);
        MsgAry.push(["狭間","それなら、何とかなるかもしれないよ。&この部屋は、リティアの小さい頃の記憶をもとに作りだされている。",1]);
        MsgAry.push(["狭間","だから、この空間を探せば材料を見つけられるかもしれない。",1]);
        MsgAry.push(["リティア","トマトとメロンに氷のクリソナを使った、&最高のデザート。きっとあれがあれば……。"]);
        MsgAry.push(["end"]);
        MsgNext(-1);
      }
      if(henirarea[0].cleared==1){
        //**
        henirarea[0].cleared=2;
      }
      saveLocal();
    }
};
