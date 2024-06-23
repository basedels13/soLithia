//4列にランダムにトランプを並べる
//10,11,12,13は右側のモンスターゾーンに移動する
//5体目が右側に移動しようとした場合敗北
//スートは4種類あるがスートに関係なくn-1はnの下に移動できる
//最前列にはどんなカードも置くことができる
//最前列と2列目で10,11,12,13の合計は4枚を超えないようにする

//モンスターゾーンの隣には2×4枚のカードを置ける
//2枚の合計の数が同じように置くことで倒せる
//同じスートのエースは7としても扱うことができる

//ドラッグ＆ドロップ　https://ics.media/tutorial-createjs/mouse_drag/
//1回戻るボタン？

//next　山札からの移動
window.onload = function(){
main();
};

function main(){
	const canvas = document.getElementById("canvas0");//ベースレイヤ。背景、置物
  var canvas1 = document.getElementById("canvas1");//
  var canvas2 = document.getElementById("canvas2");//
	var canvas3 = document.getElementById("canvas3");//カーソル
  var canvas7 = document.getElementById("canvas7");//createアニメーション用
  var canvas4 = document.getElementById("canvas4");//createよりも上に書きたいもの
  var canvas5 = document.getElementById("canvas5");//イベントキャッチ/カーソル/create
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var cx = canvas.getContext("2d");
  var cx1 = canvas1.getContext("2d");
  var cx2 = canvas2.getContext("2d");
  var cx3 = canvas3.getContext("2d");
  var cx4 = canvas4.getContext("2d");
  var cx5 = canvas5.getContext("2d");
var stage = new createjs.Stage("canvas5");//Stage
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
var CorsorC = new createjs.Shape();
CorsorC.graphics
        .beginStroke("rgba(0,255,250,0.8)")
        .setStrokeStyle(3)
        .drawRoundRect(0, 0, 280, 24, 3, 3);
//yakumap.addChild(rect);
var Cnext = new createjs.Container();//コンテナ
var deckmap = new createjs.Container();
stage.addChild(deckmap);
var yakumap = new createjs.Container();
var yakumap2 = new createjs.Container();
var Tempmap = new createjs.Container();
stage.addChild(Tempmap);
var Msgwindow = new createjs.Bitmap("window_ds.png");
Msgwindow.scale=100/128;
var arwL = new createjs.Bitmap('Winedom_arrowleft.png');
var arwR = new createjs.Bitmap('Winedom_arrowright.png');
var arwD = new createjs.Bitmap('Winedom_arrowdown.png');
arwL.x=5;
arwL.y=240;
arwL.scale=0.25;
arwR.x=655;
arwR.y=240;
arwR.scale=1;
arwD.x=340;
arwD.y=350;
arwD.scale=1;
arwL.alpha=0;
arwR.alpha=1;
arwD.alpha=1;
stage.addChild(arwD);
//データベース
var chrimg_src= new Array("VSB_baondot.png","VSB_elsdot.png","VSB_baonpf.png","VSB_elspf.png","VSB_garekidot.png");
var Card_src= new Array('Card_images/BackColor_Black.png','Card_images/Spade01.png','Card_images/Spade02.png','Card_images/Spade03.png','Card_images/Spade04.png','Card_images/Spade05.png','Card_images/Spade06.png','Card_images/Spade07.png','Card_images/Spade08.png','Card_images/Spade09.png','Card_images/Spade10.png','Card_images/Spade11.png','Card_images/Spade12.png','Card_images/Spade13.png','Card_images/Heart01.png','Card_images/Heart02.png','Card_images/Heart03.png','Card_images/Heart04.png','Card_images/Heart05.png','Card_images/Heart06.png','Card_images/Heart07.png','Card_images/Heart08.png','Card_images/Heart09.png','Card_images/Heart10.png','Card_images/Heart11.png','Card_images/Heart12.png','Card_images/Heart13.png','Card_images/Club01.png','Card_images/Club02.png','Card_images/Club03.png','Card_images/Club04.png','Card_images/Club05.png','Card_images/Club06.png','Card_images/Club07.png','Card_images/Club08.png','Card_images/Club09.png','Card_images/Club10.png','Card_images/Club11.png','Card_images/Club12.png','Card_images/Club13.png','Card_images/Diamond01.png','Card_images/Diamond02.png','Card_images/Diamond03.png','Card_images/Diamond04.png','Card_images/Diamond05.png','Card_images/Diamond06.png','Card_images/Diamond07.png','Card_images/Diamond08.png','Card_images/Diamond09.png','Card_images/Diamond10.png','Card_images/Diamond11.png','Card_images/Diamond12.png','Card_images/Diamond13.png')
var playMode=[1,'クロンダイク','スパイダー','エルドリッチ']
var cards = [];
var hands = [];
var decks = [];
var deckfaces = [];
var decksNow=0;//触れる山札
var Extras=[0,13,26,39];
var Cardlists=[];//create用の画像リスト
var Decklists=[];//デッキ用
var DeckFacelists=[];//デッキ
var Exlists=[[],[],[],[]];//クリア済み
var cardWidth=80;//トランプの横幅
var cardHeight=128;//トランプの縦幅
var cardgapY=20;//トランプを重ねる時の
var cardgapX=10;//行同士の隙間
switch(playMode[0]){
  case 1:
  //クロンダイク
  cards = new Array(52);
  for (var i = 0;  i < cards.length;  i++  ) {cards[i]=i+1}
  shuffle();
  console.log(cards[0],cards[51]);
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
  console.log(decks.length);
    break;
  case 2:
    cards = new Array(104);
    for (var i = 0;  i < cards.length;  i++  ) {cards[i]=Math.floor(i/13)+1}
    shuffle();
    console.log(cards[0],cards[51]);
    break;
  case 3:
    break;
}


//カード画像の読込
var cardback = new createjs.Bitmap('Card_images/BackColor_Black.png');
var spa1 = new createjs.Bitmap('Card_images/Spade01.png');
var spa2 = new createjs.Bitmap('Card_images/Spade02.png');
var spa3 = new createjs.Bitmap('Card_images/Spade03.png');
var spa4 = new createjs.Bitmap('Card_images/Spade04.png');
var spa5 = new createjs.Bitmap('Card_images/Spade05.png');
var spa6 = new createjs.Bitmap('Card_images/Spade06.png');
var spa7 = new createjs.Bitmap('Card_images/Spade07.png');
var spa8 = new createjs.Bitmap('Card_images/Spade08.png');
var spa9 = new createjs.Bitmap('Card_images/Spade09.png');
var spaT = new createjs.Bitmap('Card_images/Spade10.png');
var spaJ = new createjs.Bitmap('Card_images/Spade11.png');
var spaQ = new createjs.Bitmap('Card_images/Spade12.png');
var spaK = new createjs.Bitmap('Card_images/Spade13.png');

var hea1 = new createjs.Bitmap('Card_images/Heart01.png');
var hea2 = new createjs.Bitmap('Card_images/Heart02.png');
var hea3 = new createjs.Bitmap('Card_images/Heart03.png');
var hea4 = new createjs.Bitmap('Card_images/Heart04.png');
var hea5 = new createjs.Bitmap('Card_images/Heart05.png');
var hea6 = new createjs.Bitmap('Card_images/Heart06.png');
var hea7 = new createjs.Bitmap('Card_images/Heart07.png');
var hea8 = new createjs.Bitmap('Card_images/Heart08.png');
var hea9 = new createjs.Bitmap('Card_images/Heart09.png');
var heaT = new createjs.Bitmap('Card_images/Heart10.png');
var heaJ = new createjs.Bitmap('Card_images/Heart11.png');
var heaQ = new createjs.Bitmap('Card_images/Heart12.png');
var heaK = new createjs.Bitmap('Card_images/Heart13.png');

var clu1 = new createjs.Bitmap('Card_images/Club01.png');
var clu2 = new createjs.Bitmap('Card_images/Club02.png');
var clu3 = new createjs.Bitmap('Card_images/Club03.png');
var clu4 = new createjs.Bitmap('Card_images/Club04.png');
var clu5 = new createjs.Bitmap('Card_images/Club05.png');
var clu6 = new createjs.Bitmap('Card_images/Club06.png');
var clu7 = new createjs.Bitmap('Card_images/Club07.png');
var clu8 = new createjs.Bitmap('Card_images/Club08.png');
var clu9 = new createjs.Bitmap('Card_images/Club09.png');
var cluT = new createjs.Bitmap('Card_images/Club10.png');
var cluJ = new createjs.Bitmap('Card_images/Club11.png');
var cluQ = new createjs.Bitmap('Card_images/Club12.png');
var cluK = new createjs.Bitmap('Card_images/Club13.png');

var dia1 = new createjs.Bitmap('Card_images/Diamond01.png');
var dia2 = new createjs.Bitmap('Card_images/Diamond02.png');
var dia3 = new createjs.Bitmap('Card_images/Diamond03.png');
var dia4 = new createjs.Bitmap('Card_images/Diamond04.png');
var dia5 = new createjs.Bitmap('Card_images/Diamond05.png');
var dia6 = new createjs.Bitmap('Card_images/Diamond06.png');
var dia7 = new createjs.Bitmap('Card_images/Diamond07.png');
var dia8 = new createjs.Bitmap('Card_images/Diamond08.png');
var dia9 = new createjs.Bitmap('Card_images/Diamond09.png');
var diaT = new createjs.Bitmap('Card_images/Diamond10.png');
var diaJ = new createjs.Bitmap('Card_images/Diamond11.png');
var diaQ = new createjs.Bitmap('Card_images/Diamond12.png');
var diaK = new createjs.Bitmap('Card_images/Diamond13.png');

//カードを並べる実験
//クロンダイク
Cardlists=[[],[],[],[],[],[],[]]
for(var i=0;i<hands.length;i++){
  for(var j=0;j<hands[i].length;j++){
  var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
  newCard.x=50+i*(cardWidth+cardgapX);
  newCard.y=150+j*cardgapY;
  stage.addChild(newCard);
  Cardlists[i].push(newCard);
  //アニメーションを用意しておく
  //i列目のj行目でアクセスする
  var HashCard=i*100+j;
  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
  }
};
function DeckReset(p=0,point=0){
switch(p){
case 0:
  deckmap.removeAllChildren();
  if(!decks.length){
  decks=deckfaces.concat();
  }
  for(var i=0;i<decks.length;i++){
    //ウラ
    var newCard = new createjs.Bitmap(Card_src[0]);
    newCard.x=50;
    newCard.y=5;
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
  break;
default:
  //p枚だけめくる
  //decks->数字が格納された配列
  //decklists->createが格納された配列
  if(p>decks.length){
    return false;
  }
  var TT=decks.shift();
  deckfaces.push(TT);
  var T=Decklists.pop();
  var S=DeckFacelists.shift();
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
    if(point>=p){
      //end
      drawbuttom(10,50,decks.length,1,50,40);
      return true;
    }else{
      DeckReset(p,point);
    }
    //次のカードへ
  }
  break;
}
};
stage.addChild(Cstar); // 表示リストに追加
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
//t 0buff 1debuff
//設定
var mouseX;
var mouseY;
var mute="ON"
var alpha = 0;
var debugmode=true;//座標の表示を管理
var loadstate=0;
var view = 0
var cLock=true;//true->操作可能
var opLock=0;
var mLock=0;//1->メッセージ送りもーど
var MessageLog=[];
var nowtalking=0;
var pagestate=-1;
var pagelength=1;
var pagetemp=-1;
var msgstate=1;
var msglength=2;
var msgtemp=1;
var gamestate =10;
var startT = 0;
var clearT = 0;
var hour = 0;
var min = 0;
var sec = 0;
var datet =0;
var Hand = "0";

//保存するデータ
var vBar=1;
var sBar=1;

var UserData = {
  "Name":"azure_ch",
  "Volume": vBar,
  "SEVolume": sBar,
};
function saveDL(){
  try{
UserData = {
  "Name":"azure_ch",
  "Volume": vBar,
  "SEVolume": sBar,
};
console.log(UserData);
localStorage.setItem('UserData_Winedom', JSON.stringify(UserData));
  }catch(e){
    console.log('ねこ')
  }
}
function saveUP(){
  try{
var getdata; // 読込むデータ
getdata = JSON.parse(localStorage.getItem('UserData_Winedom'));
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
  try{
    localStorage.removeItem('UserData_Winedom')
        console.log('localStorage cleared');
      }catch(e){
        console.log('ねこ')
    }
}
function SEbuffer(){
  se1.volume(0.25*sBar);
  se2.volume(0.3*sBar);
  se3.volume(0.3*sBar);
  se4.volume(0.16*sBar);
  se5.volume(0.2*sBar);
  se6.volume(0.25*sBar);
  se7.volume(0.3*sBar);
  se8.volume(0.2*sBar);
  se9.volume(0.16*sBar);
  se10.volume(0.4*sBar);
  se11.volume(0.3*sBar);
  se12.volume(0.2*sBar);
  se13.volume(0.12*sBar);
  se14.volume(0.3*sBar);
  se15.volume(0.2*sBar);
  se16.volume(0.2*sBar);
  se17.volume(0.4*sBar);
  se18.volume(0.4*sBar);
  se19.volume(0.4*sBar);
  se20.volume(0.5*sBar);
  se21.volume(0.2*sBar);
  se22.volume(0.2*sBar);
  se23.volume(0.12*sBar);
  }
//立ち絵
var img = new Image();
var e1= new Image();
var e2= new Image();
var e3= new Image();
var e4= new Image();
var e5= new Image();
//el icon
var e6= new Image();
//プロフィール立ち絵
var e7= new Image();
var e8= new Image();
var e9= new Image();
var e10= new Image();
//背景
var BGimg=new Image();
var DPimg=new Image();
//覚醒玉
var DPicon=new Image();
var zoom= new Image();
var se1 = new Howl({
src:"decision10.mp3",
volume: 0.25,
});
var se2 = new Howl({
  src:"cancel3.mp3",
      volume: 0.3,
    });
var se3 = new Howl({
  src:"decision32.mp3",
      volume: 0.3,
    });
var se4 = new Howl({
  src:"recovery2.mp3",
      volume: 0.16,
    });
var se5 = new Howl({
  src:"parameter_up.mp3",
  volume: 0.2,
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
  src:"tukkomi2.mp3",
  volume: 0.2,
  });
var se9 = new Howl({
  src:"critical1.mp3",
  volume: 0.16,
  });
var se10 = new Howl({
  src:"throw_knife.mp3",
  volume: 0.4,
  });
var se11 = new Howl({
  src:"Short_mistery_009.mp3",
  volume: 0.3,
  });
var se12 = new Howl({
  src:"decision14.mp3",
  volume: 0.2,
  });
var se13 = new Howl({
    src:"shakin.mp3",
    volume: 0.12,
    });
var se14 = new Howl({
  src:"scene2.mp3",
  volume: 0.3,
  });
var se15 = new Howl({
  src:"money.mp3",
  volume: 0.2,
  });
var se16 = new Howl({
  src:"hitSE6.mp3",
  volume: 0.2,
  });
var se17 = new Howl({
  src:"sword3.mp3",
  volume: 0.4,
  });
var se18 = new Howl({
  src:"sword5.mp3",
  volume: 0.4,
  });
var se19 = new Howl({
  src:"sword2.mp3",
  volume: 0.4,
  });
var se20 = new Howl({
  src:"kaiju_foot.mp3",
  volume: 0.5,
  });
var se21 = new Howl({
  src:"sento_totunyu.mp3",
  volume: 0.2,
  });
var se22 = new Howl({
  src:"status_up.mp3",
  volume: 0.2,
    });
var se23 = new Howl({
  src:"syusoku.mp3",
  volume: 0.12,
    });
const bgm1data ={
    src: "Run_through_space.mp3",
    loopStart: 0,
    loopEnd: 85910,
    volume: 0.2,
  };
var Bgm=new Music(bgm1data);

var loadmax=1;
function loadgraph(){
  cx3.fillStyle = "#e4e4e4";
  var A=loadstate/loadmax*600;
    cx3.fillRect(100, 200, A, 50);
    createjs.Tween.get(Cstar)
    .to({x:A+100},300);
  loadstate+=1;
  console.log(loadstate,loadmax);
  if(loadstate>=loadmax){
    createjs.Tween.get(Cstar)
.to({x:700},300);
    load2();
  }
}
img.src='Don_bg1.png';
img.onload=function(){loadgraph();
};
cx3.fillStyle = "rgb(0,0,0)";
cx3.fillRect(0, 0, 800, 600);
cx3.font = "24px 'Century Gothic'";
cx3.fillStyle = "#e4e4e4";
cx3.fillText( "Now Loading…",300,360)

function load2(){
  loadstate+=1;
  //saveUP();
  console.log(loadstate,loadmax);
cx3.fillStyle = "rgb(0,0,0)";
cx3.fillRect(0, 0, 800, 600);
cx3.fillStyle = "#007fd9";
cx3.fillRect(100, 200, 600, 50);
cx3.font = "24px 'Century Gothic'";
cx3.fillStyle = "#e4e4e4";
cx3.fillText( "Click to Start",320,300)
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
	cx.fillRect(710,525,60,60);
}
createjs.Ticker.addEventListener("tick", UpdateParticles);
function UpdateParticles(event){
  updateParticles();
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
    stage.addChild(particle);
    particle.compositeOperation = "lighter";
    particle.alpha=0.25;
    // パーティクルの発生場所
    particle.x = stage.mouseX;
    particle.y = stage.mouseY;
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
      stage.removeChild(particle);
      // 配列からも削除
      particles.splice(i, 1);
    }
  }
}
//ドラッグアンドドロップの実験
var dragPointX;
var dragPointY;

arwD.addEventListener("mousedown", {card:'arwD',handleEvent:handleDown});
arwD.addEventListener("pressmove", {card:'arwD',handleEvent:handleMove});
arwD.addEventListener("pressup", {card:'arwD',handleEvent:handleUp});
function handleDown(event) {
  switch(this.card){
    case "arwD":
  dragPointX = stage.mouseX - arwD.x;
  dragPointY = stage.mouseY - arwD.y;
  arwD.alpha=0.5;
  break;
  default:
    console.log(this.card);
    var I=Math.floor(this.card/100);
    var J=this.card%100;
    var T=Cardlists[I][J];
    console.log(hands[I][J]);
    //最上段以外のカードでまとめて動かせる場合はまとめて動く
    //黒 1-13,27-39, 赤 14-26, 40-52
    //13で割った余りが+1で商の偶奇が異なれば移動可能とする
    if(J < hands[I].length){
      for(var i=J;i<hands[I].length-1;i++){
        console.log(i,J,hands[I][i])
        var A=hands[I][i]%13;
        var B=hands[I][i+1]%13;
        var C=Math.floor((hands[I][i]-1)/13);
        var D=Math.floor((hands[I][i+1]-1)/13);
        if(A-B!==1 || (C+D)%2==0){
          return false;
        }
      }
      for(var i=J;i<hands[I].length;i++){
        var T=Cardlists[I][i];
      dragPointX = stage.mouseX - T.x;
      dragPointY = stage.mouseY - T.y;
      T.alpha=0.5;
      }
    }else{
      //最上段のカード
      dragPointX = stage.mouseX - T.x;
      dragPointY = stage.mouseY - T.y;
      T.alpha=0.5;
    }
    return false;
  }
}
function handleMove(event) {
  switch(this.card){
    case "arwD":
      arwD.x = stage.mouseX-dragPointX;
      arwD.y = stage.mouseY-dragPointY;
  break;
  default:
    //console.log(this.card);
    var I=Math.floor(this.card/100);
    var J=this.card%100;
    var T=Cardlists[I][J];
    if(J < hands[I].length){
      for(var i=J;i<hands[I].length-1;i++){
        //console.log(i,J,hands[I][i])
        var A=hands[I][i]%13;
        var B=hands[I][i+1]%13;
        var C=Math.floor((hands[I][i]-1)/13);
        var D=Math.floor((hands[I][i+1]-1)/13);
        if(A-B!==1 || (C+D)%2==0){
          return false;
        }
      }
      var X=0;
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
  break;
}};
function handleUp(event) {
  //console.log(stage.mouseX,stage.mouseY);
  switch(this.card){
    case "arwD":
      arwD.alpha=1;
  break;
  default:
    var I=Math.floor(this.card/100);
    var J=this.card%100;
    var T=Cardlists[I][J];
    //移動が許可されれば移動する
    //却下であれば元の位置へ
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
            Extras[TX]+=1;
            var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
            newCard.x=T.x
            newCard.y=T.y
            stage.addChild(newCard);
            //extraへ追加
            createjs.Tween.get(newCard).to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70);
            Exlists[TX].push(newCard);
            //cardlistから消去
            stage.removeChild(T);
            Cardlists[I].splice(J,1);
            hands[I].splice(J,1);
            //クリア条件
            if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
              console.log('gameover')
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
        var A=hands[I][J]%13;
        var B=hands[TX][hands[TX].length-1]%13;
        var C=Math.floor((hands[I][J]-1)/13);
        var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
        if(B-A==1 && (C+D)%2==1){
          //移動先に追加する
            var X=0;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
              newCard.x=50+I*(cardWidth+cardgapX);
              newCard.y=150+i*cardgapY;
              stage.addChild(newCard);
              hands[TX].push(hands[I][i]);
              Cardlists[TX].push(newCard);
              var HashCard=TX*100+hands[TX].length-1;
              newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
              newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
              newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
              createjs.Tween.get(newCard).to({x:50+TX*(cardWidth+cardgapX),y:150+(hands[TX].length-1)*cardgapY},70);
              //cardlistから消去
              stage.removeChild(T)
              X+=1;
              }
              Cardlists[I].splice(J,X);
              hands[I].splice(J,X);
              console.log(hands[TX]);
        }else{
          ExitCard();          
        }
        break;
      default:
        ExitCard();
      }
    };
    //No
    function ExitCard(){
      if(J < hands[I].length){
        for(var i=J;i<hands[I].length-1;i++){
          console.log(i,J,hands[I][i])
          var A=hands[I][i]%13;
          var B=hands[I][i+1]%13;
          var C=Math.floor((hands[I][i]-1)/13);
          var D=Math.floor((hands[I][i+1]-1)/13);
          if(A-B!==1 || (C+D)%2==0){
            return false;
          }
        }
        var X=0;
        for(var i=J;i<hands[I].length;i++){
          var T=Cardlists[I][i];
          createjs.Tween.get(T)
          .to({x:50+I*(cardWidth+cardgapX),y:150+(J+X)*cardgapY},90);
          T.alpha=1;
          X+=1;
          }
    }else{
      createjs.Tween.get(T)
      .to({x:50+I*(cardWidth+cardgapX),y:150+J*cardgapY},90);
      T.alpha=1;    
      }
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
canvas5.onmousemove = mouseMoveListener;
function mouseMoveListener(e) {
  var rect = e.target.getBoundingClientRect();
  mouseX = Math.floor(e.clientX - rect.left);
  mouseY = Math.floor(e.clientY - rect.top);
  cx3.clearRect(710, 10, 80, 38);
  cx3.fillStyle = "black";
cx3.font = "12px Arial";
if(debugmode){
cx3.fillText("X座標：" + mouseX, 714, 22);
cx3.fillText("Y座標：" + mouseY, 714, 34);
cx3.fillText("Lock：" + cLock, 714, 46);
}else{
cx3.font = "12px Arial";
cx3.fillText("SOUND", 715, 22);
cx3.font = "Bold 24px Arial";
cx3.fillText( mute, 730, 42);
}
if(view > 0 && view < 5){
disp();}
}
canvas5.addEventListener('mouseout', onMouseOut, false);
function onMouseOut() {
 //console.log('mouseout')
};

  canvas5.addEventListener("click", clickHandler, false);
	function clickHandler(e) {
 		var rect = e.target.getBoundingClientRect();
 		mouseX =  Math.floor(e.clientX - rect.left);
		mouseY =  Math.floor(e.clientY - rect.top);
  MouseCircle(e);
      console.log('clicked!',cLock)
		if(mouseX>710 && mouseX <790){
          if(mouseY>10 && mouseY<48){          
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
            console.log(cx5.globalAlpha,cLock);
            cx5.clearRect(710, 10, 80, 38);
            cx5.globalAlpha = 1;
            if(!cLock && debugmode){
              //for debug
              cLock=true;
            }
    //ミュートの切り替え
  if( mute=="OFF" ){
    SEbuffer();
    Bgm.mute(false);
    mute="ON";
    }else{
    Bgm.mute(true);
    Bgm.stop();
    mute="OFF";
    console.log('bgm muted!')
    }
  cx3.clearRect(710, 10, 80, 38);
  cx3.font = "12px Arial";
  cx3.fillText("SOUND", 710, 22);
  cx3.font = "Bold 24px Arial";
  cx3.fillText( mute, 730, 42);
  return false;
        }};
    if(gamestate==0){
        if(mouseX>70 && mouseX <150){
          if(mouseY>4 && mouseY<134){
            //デッキのカードをめくる
          if(decks.length){
            DeckReset(1);
          }else{
            DeckReset();
          }
          }}
    }
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

function Gamestart(){
    gamestate=0;
    cx1.clearRect(0,0,800,450)
    cx2.clearRect(0,0,800,450)
    cx3.clearRect(0,0,800,600)
    cx4.clearRect(0,0,800,600)
    cx5.clearRect(0,0,800,450);
    msgstate =0
    view = 1;
    startT = Date.now();
    printView();
    console.log('デュエル開始')  
  };
  function printView(){
    //シャッフルして描画するまで
    cx.strokeStyle="white";
    createRoundRect(74,5,80,128,5,cx);
    cx.stroke();
    createRoundRect(164,5,80,128,5,cx);
    cx.stroke();
    createRoundRect(344,5,80,128,5,cx);
    cx.stroke();
    createRoundRect(434,5,80,128,5,cx);
    cx.stroke();
    createRoundRect(524,5,80,128,5,cx);
    cx.stroke();
    createRoundRect(614,5,80,128,5,cx);
    cx.stroke();
    var newCard = new createjs.Bitmap(Card_src[1]);
    newCard.x=50+3*(cardWidth+cardgapX)
    newCard.y=5
    newCard.alpha=0.3;
    stage.addChild(newCard);
    var newCard = new createjs.Bitmap(Card_src[14]);
    newCard.x=50+4*(cardWidth+cardgapX)
    newCard.y=5
    newCard.alpha=0.3;
    stage.addChild(newCard);
    var newCard = new createjs.Bitmap(Card_src[27]);
    newCard.x=50+5*(cardWidth+cardgapX)
    newCard.y=5
    newCard.alpha=0.3;
    stage.addChild(newCard);
    var newCard = new createjs.Bitmap(Card_src[40]);
    newCard.x=50+6*(cardWidth+cardgapX)
    newCard.y=5
    newCard.alpha=0.3;
    stage.addChild(newCard);
    DeckReset();
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

function Yakumap(moveY=0){
  if(moveY>0){
    //ページ移動
    var M=-(moveY-1)*25
    createjs.Tween.get(yakumap, {override: true})
    .to({y: M}, 200, createjs.Ease.cubicInOut);
    return false;
  }
      //一覧表示
      yakumap.removeAllChildren();
      var rect = new createjs.Shape();
      rect.graphics
              .beginFill("rgba(20,20,20,0.7)")
              .drawRoundRect(45, 160, 300, 400, 10, 10);
      yakumap.addChild(rect);
      var shapeMask = new createjs.Shape();
    shapeMask.graphics
            .beginFill("gold")
            .drawRoundRect(45, 160, 300, 180, 10, 10);
            //userskill
            var MY=190;
            var t;
            var s;
            for(var i=0; i<UserSkill.length; i++){
              t= new createjs.Text(UserSkill[i].name, "bold 22px 'メイリオ'", "black");
              t.x=70;
              t.y=MY;
              if(UserSkill[i].todo==0 && UserSkill[i].PP>0){
                var A=Skilllist.findIndex(value=>value.name==UserSkill[i].name);
                switch(Skilllist[A].range){
                  case 1:
                    s = new createjs.Shape()
                    s.graphics
                    .beginFill("rgba(255,74,74,0.7)")
                    .drawRoundRect(60, MY, 280, 24, 3, 3);
                    yakumap.addChild(s);
                    break;
                  case 2:
                    s = new createjs.Shape()
                    s.graphics
                    .beginFill("rgba(74,183,255,0.7)")
                    .drawRoundRect(60, MY, 280, 24, 3, 3);
                    yakumap.addChild(s);
                    break;
                  case 3:
                    s = new createjs.Shape()
                    s.graphics
                    .beginFill("rgba(252,150,45,0.7)")
                    .drawRoundRect(60, MY, 280, 24, 3, 3);
                    yakumap.addChild(s);
                    break;
                  default:
                    s = new createjs.Shape()
                    s.graphics
                    .beginFill("rgba(250,250,250,0.7)")
                    .drawRoundRect(60, MY, 280, 24, 3, 3);
                    yakumap.addChild(s);
                    break
                }
              }
              yakumap.addChild(t);
              MY+=26;
            }
      // マスクを適用する
      yakumap.mask = shapeMask;
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
      }
    function drawbuttom2(x,y,word,type=0,w=170,z=60,R=0){
      //オレンジボタン Rを大きくすると文字の大きさを小さくします
      cx2.lineWidth = 2;
      if(type==0){
      cx2.strokeStyle="#ffbb4d";
      cx2.fillStyle="#ff7b00"
      }else{
      cx2.strokeStyle="#372d23";
      cx2.fillStyle="#471c06";
      }
      cx2.beginPath();
      cx2.moveTo(x+1,y+1);
      cx2.lineTo(x+w-2, y+1);
      cx2.lineTo(x+w-2, y+z-2);
      cx2.lineTo(x+1,y+z-2);
      cx2.lineTo(x+1,y+1);
      cx2.fill();
      cx2.fillStyle="rgba(255, 187, 77,0.6)";//=#ffbb4dz
      cx2.stroke();
      if(R==0){
      cx2.beginPath();
      cx2.moveTo(x+1,y+1);
      cx2.lineTo(x+75, y+1);
      cx2.lineTo(x+1, y+16);
      cx2.lineTo(x+1,y+1);
      cx2.fill();
      cx2.beginPath();
      cx2.moveTo(x+1,y+1);
      cx2.lineTo(x+51, y+1);
      cx2.lineTo(x+1, y+26);
      cx2.lineTo(x+1,y+1);
      cx2.fill();
      cx2.fillStyle = "#ffffff";
      cx2.font = "28px 'メイリオ'";
      cx2.fillText(word,x+20,y+35)
      }else if(R==1){
        cx2.beginPath();
        cx2.moveTo(x+1,y+1);
        cx2.lineTo(x+31, y+1);
        cx2.lineTo(x+1, y+11);
        cx2.lineTo(x+1,y+1);
        cx2.fill();
        cx2.beginPath();
        cx2.moveTo(x+1,y+1);
        cx2.lineTo(x+17, y+1);
        cx2.lineTo(x+1, y+16);
        cx2.lineTo(x+1,y+1);
        cx2.fill();
        cx2.fillStyle = "#ffffff";  
        cx2.font = "16px 'メイリオ'";
        cx2.fillText(word,x+10,y+25)
      }
      }
    var MessageMng = function(ts=0,context=cx4){
      //ts 0 開始　1 終了
      console.log('MessageMng',ts);
      if(ts==0){
        mLock=1;
        yakumap.removeAllChildren();
        yakumap.alpha=1;
        Msgwindow.x=0;
        Msgwindow.y=300;
        yakumap.addChild(Msgwindow);
        createjs.Tween.get(Msgwindow)
        .to({y:0},50);
      }
      if(ts==1){
        mLock=-1;
        createjs.Tween.get(Msgwindow)
        .to({y:300},75);
        yakumap.removeAllChildren();
        yakumap.alpha=0;
        context.clearRect(10,340,780,260);
        switch(nowtalking){
          case "アーリオ":
            createjs.Tween.get(Elsdot, {override: true})
            .to({x: 0, alpha:0}, 200, createjs.Ease.cubicInOut);
            break;
          case "カンラン":
            createjs.Tween.get(Baondot, {override: true})
            .to({x: 0, alpha:0}, 200, createjs.Ease.cubicInOut);
            break;
          default:
            nowtalking=0;
        }
        return false;
      }
      Message(MessageLog[0]);
    }
  function Message(word,t=0,lx=60,ly=480,context=cx4){
    console.log('Message',word)
  //一文字ずつ表示して最後にぺちぺちさせる
  switch(MessageLog[0]){
  case "Alio":
    nowtalking="アーリオ";
    MessageLog.shift();
    word=MessageLog.shift();
    Baondot.alpha=0;//グラ削除は一括化予定
    Elsdot.x=0;
    Elsdot.alpha=1;
    createjs.Tween.get(Elsdot, {override: true})
    .to({x: 60}, 200, createjs.Ease.cubicInOut);
    break;
  case "Olive":
    nowtalking="カンラン";
    MessageLog.shift();
    word=MessageLog.shift();
    Elsdot.alpha=0;
    Baondot.x=0;
    Baondot.alpha=1;
    createjs.Tween.get(Baondot, {override: true})
    .to({x: 60}, 200, createjs.Ease.cubicInOut);
    break;
  case "None":
    nowtalking=0;
    MessageLog.shift();
    word=MessageLog.shift();
    Elsdot.alpha=0;
    Baondot.alpha=0;
    break;
  }
  ///mLock=1;
  var x=lx;
  var y=ly;
  var textx=0;
  var texty=0;
  var lines = word.split('&');
  context.textAlign = "start";
  context.font="bold 32px 'メイリオ'"
  context.fillStyle="white";
  context.clearRect(10,340,780,260);
var tflame=2;//メッセージ送りのスピード
var texti=0;
var line=lines[0];
if(nowtalking){
context.fillText(nowtalking,20,410);
}
console.log(lines);
window.requestAnimationFrame((ts)=>MsgSplit(ts,0));
return false;
function MsgSplit(ts,T=0){
  T+=1;
  if(line == ''){
  texti+=1;
  texty+=35;
  textx-=textx;
  if(texti >= lines.length){
    setTimeout(() => {
      context.font="bold 22px 'メイリオ'"
      context.fillText("▼",690,570)
      window.requestAnimationFrame((ts)=>MsgEffect(ts));  
    }, 150);
    return false;
  }
  line=lines[texti]
  };
  if(T>tflame){
    var c = line.slice(0, 1);
    context.fillText(c,lx+textx,ly+texty);
    line = line.slice(1);
    textx+=32;
    T=0;
  }
  window.requestAnimationFrame((ts)=>MsgSplit(ts,T));
  }
};
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
    var tategaki = function(context, text, x, y) {
      var textList = text.split('\n');
      var lineHeight = context.measureText("あ").width;
      textList.forEach(function(elm, i) {
        Array.prototype.forEach.call(elm, function(ch, j) {
          context.fillText(ch, x-lineHeight*i, y+lineHeight*j);
        });
      });
    };
    var BallRoundRect = function(context,x, y, w, h, r, bl, br, bh ,Balltype=0){
      //t 0->下 1->左　2->上　3->右　に吹き出し -1->なし
      switch(Balltype){
      case 0:
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
        context.lineTo(x + w, y + h - r);
        context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);        
        context.lineTo(x + br, y + h);
        context.lineTo(x + (br + bl) / 2, y + h + bh);
        context.lineTo(x + bl, y + h);
        context.lineTo(x + r, y + h);
        context.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
        context.lineTo(x, y + r);
        context.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
        context.closePath();
        break;
      case 1:
      context.beginPath();
      context.moveTo(x + r, y);
      context.lineTo(x + w - r, y);
      context.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
      context.lineTo(x + w, y + h - r);
      context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);        
      context.lineTo(x + r, y + h);
      context.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
      context.lineTo(x, y + h - r  - br);
      context.lineTo(x -bh, y + h - r - (br + bl) / 2);
      context.lineTo(x, y + h - r - bl);
      context.lineTo(x, y + r);
      context.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
      context.closePath();
      break;
      case 2:
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + br, y + h);
        context.lineTo(x + (br + bl) / 2, y + h - bh);
        context.lineTo(x + bl, y + h);
        context.lineTo(x + w - r, y);
        context.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
        context.lineTo(x + w, y + h - r);
        context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);        
        context.lineTo(x + r, y + h);
        context.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
        context.lineTo(x, y + r);
        context.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
        context.closePath();
        break;
      case 3:
        //三角形の角度を特殊裁定に
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
        context.lineTo(x + w , y + r + br);
        context.lineTo(x + w + bh, y + r + (br + 2* bl) / 3);
        context.lineTo(x + w, y + r + bl);
        context.lineTo(x + w, y + h - r);
        context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);        
        context.lineTo(x + r, y + h);
        context.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
        context.lineTo(x, y + r);
        context.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
        context.closePath();
        break;
      default:
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
        context.lineTo(x + w, y + h - r);
        context.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);        
        context.lineTo(x + r, y + h);
        context.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
        context.lineTo(x, y + r);
        context.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
        context.closePath();
        break;
}
    }
};
