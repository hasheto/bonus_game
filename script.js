var speed = document.querySelector('.speed');
var brake = document.querySelector('.brake');
var audioLose = document.getElementById("audioLose");
var audioWin = document.getElementById("audioWin"); 
var audio = document.getElementById("audio"); 
var audioSpeed = document.getElementById("audioSpeed");   

var  flagBtnStop = false;
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var anounce = document.getElementsByClassName("anounce")[0];
var image = document.getElementsByClassName("imageModal")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
function playAudioSpeed() {
  audioSpeed.loop = false;
  audioSpeed.muted = false;
  audioSpeed.load();
  audioSpeed.play(); 
} 

function playAudio() {
  audio.loop = false;
  console.log(audioSpeed.muted);
  audioSpeed.muted = true;
  audio.load();
  audio.play(); 
} 

function playAudioLose() {
  audioLose.loop = false;
  console.log(audioSpeed.muted);
  audioSpeed.muted = true;
  audioLose.load();
  audioLose.play(); 
} 

function playAudioWin() {
  audioWin.loop = false;
  console.log(audioSpeed.muted);
  audioSpeed.muted = true;
  audioWin.load();
  audioWin.play(); 
} 


function showWin(message,number) {
	anounce.innerHTML = message;

  if (number==7) {
    image.src = "./img/midlefinger4.png"
   }
  else {
    image.src = "./img/yes.jpg"
   }  
  modal.style.display = "block";
 }

function restoreColor(dots) {
	var i;	
	var len = dots.length;
	for (i = 0; i < len; i++) {
  			dots[i].style.backgroundColor = "#105e20";
  			dots[i].style.transform = "none";
			}
}

function convertBtn ()  {
	 brake.disabled = !brake.disabled;
	 speed.disabled = !speed.disabled;
}

function winMessage(dot,pos) {
	
	var message = ["Печелиш ролка за касов апарат!","Печелиш ароматизатор!","Печелиш 20 бр. фирмени визитки!",
                "Печелиш 50 бр. фирмени визитки!","Печелиш 100 бр. фирмени визитки!","Печелиш стойка за визитки!",
                "Печелиш пепелник за кола!","Печелиш ролка за касов апарат!","Печелиш 5 лв. зареждане в сметката!",
                "Печелиш 2 лв. зареждане в сметката!","Печелиш заверка на пътна книжка!","Печелиш табела НЕ РАБОТИ!",
                "Печелиш пътна книжка!"];
	var len = message.length-1;
  var number	= dot.innerHTML;
  var strInfo;

  if (pos>len) {
    pos= pos%len;
  }

	if (number==7) {
      playAudioLose(); 
      strInfo = "Опитай пак, не се отчайвай!"
  }
  else {
   if (number==23) {
      playAudioWin();	
      strInfo = "Печелиш половин месечна такса!"
  } 
  else {
     playAudio();
     strInfo = message[pos];
     }
  } 

	
	dot.style.transform = "scale(1.5,1.5)";
	
	setTimeout(showWin(strInfo,number), 500);
	//setTimeout(function() { alert(str); },500);
}

function onClick() {

	var colors = ["#ff0000","#ffff00","#0033cc","#66ff33","#660033","#66ffff","#ff6666",
                "#6363ff","#995c00","#c066ff","#ffff00","#ff8566","#ff0000","#ffff00",
                "#0033cc","#66ff33","#660033","#66ffff","#ff6666",
                "#6363ff","#995c00","#c066ff","#ffff00"];
	
  var dots = document.getElementsByClassName("dot");  
  var pos = 0;
  var len = dots.length;
  
  convertBtn();
  restoreColor(dots);
  playAudioSpeed();
  var id = setInterval(move, 100);

  function move() {

    if (pos == len) {
      pos=0;
      restoreColor(dots);
    } 

    dots[pos].style.backgroundColor = colors[pos];

    if (flagBtnStop == true)	{
    	 clearInterval(id);  
      	 flagBtnStop = false;
         winMessage(dots[pos],pos);
        }

     pos++;
  }
}

function onBrake(e){
	
	flagBtnStop = true;
	convertBtn() ;
 }

 
speed.addEventListener("click", onClick);
brake.addEventListener("click", onBrake)

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      if ( modal.style.display == "block") {
         modal.style.display = "none"
      }
      else {
    	var gaz = speed.disabled;
    	var stop = brake.disabled;
    		
    	if (!gaz) {
    		console.log("gaz onClick");
    		onClick();
    	}
    	else {
    		console.log("stop onBbrake");
    		onBrake();
    	}
     }    
    }
}
