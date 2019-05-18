var speed = document.querySelector('.speed');
var brake = document.querySelector('.brake');
var x = document.getElementById("myAudio"); 

var  flagBtnStop = false;

function playAudio() {
  x.loop = false;
  x.load();
  x.play(); 
} 

function showWin(message) {
	playAudio();
	alert(message);
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
	
	var message = ["Win!!! Химикалка","Win!!! Запалка","Win!!! Писалка","Win!!! Обувалка","Win!!! Тото",
					"Win!!! Чек","Win!!! Нов късмет","Win!!! Бутилка",
					"Win!!! Нова кухнеска престилка","Win!!! Буркан мед","Win!!! Сладолед","Win!!! Билет"];
	var number	= dot.innerHTML;
				
	var str = 'И твоето число е:' + number + '    '+ message[pos] ;
	console.log(str,pos);
	dot.style.transform = "scale(1.5,1.5)";
	
	// setTimeout(showWin(str), 500);
	setTimeout(function() { alert(str); },500);
}

function onClick() {
	var colors = ["#ff0000","#ffff00","#0033cc","#66ff33","#660033","#66ffff","#ff6666",
					"#6363ff","#995c00","#c066ff","#000000","#ff8566"];
	
  var dots = document.getElementsByClassName("dot");  
  var pos = 0;
  var len = dots.length;
  
  convertBtn();
  restoreColor(dots);

  var id = setInterval(move, 100);
  function move() {

    if (pos + 1 == len) {
    	pos=0;
    	restoreColor(dots);
    } 
    
    if (flagBtnStop == true)	{
    	 clearInterval(id);  
      	 flagBtnStop = false;
      	 if (pos!=0) {
      	 	pos--;
      	 }	
      	 winMessage(dots[pos],pos);
        }
    else {
     dots[pos].style.backgroundColor = colors[pos];
     pos++; 
    }
  }
  
}

function onBrake(e){
	playAudio();
	flagBtnStop = true;
	convertBtn() ;
 }

 
speed.addEventListener("click", onClick);
brake.addEventListener("click", onBrake)

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
    	var gaz = speed.disabled;
    	var stop = brake.disabled;
    		console.log(gaz);
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
