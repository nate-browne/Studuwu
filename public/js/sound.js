var count = 0;

function playSound(time){
	var run = setInterval(function() 
		{
			var sound = document.getElementById("sound");
			sound.play();
			count += time;
			console.log(count);
		} ,time);
}