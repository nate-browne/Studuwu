var currentTime = 0;
var tempTime = 0;
var time_break = 0;
var takeBreak = 0;
var rest = false;
var isPaused = false;
var reading = true;
var numRest = 1;
var times = 0;
var minutes = 0;
var seconds = 0;

function playSound(readingTime, breakTime, numBreaks){ 

	//First, calculate when we should be doing each break
	takeBreak = (readingTime/(numBreaks + 1)).toFixed(1);

	var run = setInterval(function() 
	{
		if( !isPaused ){
			var sound = document.getElementById("sound");
			
			//Check if we are done with this session
			if( currentTime === (readingTime * 60000) && reading){
				document.getElementById("title").innerHTML = "Done Reading!";
				sound.play();
				return;
			}

			//Check if we need to take a break
			if( currentTime === (takeBreak * 60000) * numRest){
				document.getElementById("title").innerHTML = "Taking a Break!";
				tempTime = currentTime;
				
				sound.play();

				times = 0;
				//alert("Time to take Break!");
				rest = true;
				numRest++;
			}

			//Check if we are done with break
			if( time_break === (breakTime * 60000)){
				document.getElementById("title").innerHTML = "SHHH! Reading in Progress!";
				sound.play();
				//alert("Done with break! Get Back to reading");
				document.getElementById("time").innerHTML = "";
				time_break = 0;
				currentTime = tempTime;
				rest = false;
				seconds = 0;
				minutes = 0;
			}

			//Keep track of how long we have been 
			if( rest == true){
				currentTime = 0;
				time_break += 1000;
				seconds += 1000;
				
				if( seconds < 10000){
					document.getElementById("time").innerHTML = minutes + ":0" + seconds/1000;
				}else if( seconds < 60000){
					document.getElementById("time").innerHTML = minutes + ":" + seconds/1000;
				}else{
					minutes++;
					seconds = 0;
				}
			}

			currentTime += 1000;
			console.log(currentTime);
			//console.log(time_break);
		}else{
			return;
		}

	} ,1000);
}

function pause(){
	document.getElementById("status").innerHTML = "Session has been Paused!";
	$("#status").delay(0).fadeIn();
	$("#status").delay(5000).fadeOut();
	isPaused = true;
	document.getElementById("play").style.display = "block";
	document.getElementById("pause").style.display = "none";
	document.getElementById("da_img").src = "/images/still_img.png";
}

function play(){
	document.getElementById("status").innerHTML = "Session has been Resumed!";
	$("#status").delay(0).fadeIn();
	$("#status").delay(5000).fadeOut();
	isPaused = false;
	document.getElementById("play").style.display = "none"
	document.getElementById("pause").style.display = "block";
	document.getElementById("da_img").src = "/images/tenor.gif";
}