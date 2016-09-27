'use strict';
var audiooff = false;


var wW, wH, offestR, slides, currentSlideid, interval, centerx, centery, currentSlideObj, currentSlideID, mousecurrentlyon, bottomborder, audio,
parallax = false,
arrow_left_bg = $('div#arrow_left_bg'),
arrow_right_bg = $('div#arrow_right_bg');

window.onload = function() {
  // console.log('preloading content');
  resized();
  run();
  $('body').addClass('shownBody');
};

$(window).resize(function() {
  	resized();
});

function resized () {
	updateGlobals();
	centerx = wW /2 ;
	centery = wH / 2;
  	offestR = wW - 200;
  	bottomborder = wH - 100;
}

function run () {

	updateGlobals();

	addParallaxActions();

	currentSlideid = 0;
	mousecurrentlyon = 3;
	slides = document.getElementsByClassName("slide");
	$(slides[0]).addClass('currentSlide');
	currentSlideObj = slides[0];
	currentSlideID = $(slides[0]).data('id');
	console.log(currentSlideID);

	buildBottomNav();

	if(audiooff===false) {
		setTimeout(function() {
		    addBackgroundMusic();
		}, 1000);
	}

}



function addParallaxActions () {

	$("div#slides").mousemove(function( event ) {

	  var x =  event.pageX,
	  y = event.pageY
	  ;

	  	if(parallax===true) {
	  		
	  	}else{

	  		var id = $(currentSlideObj).data('id');
	  		currentSlideID = id;
	  		
	  		$('div#audioname').html($('div#slide'+id).data('name'));

	  		parallax=true;
		  	clearInterval(interval);
		  	
		  	var _temp = setInterval(function() {
		  	    $('div#thumbnail'+id).addClass('thumbnailVisited');
		  	    clearInterval(_temp);
		  	}, 500);
		  	// $('div#thumbnail'+$(currentSlideObj).data('id')).css('opacity','0');
		  	
	  	}

	  	if($(currentSlideObj).checkHasClass('parallax1')) {
	  		var diffx = centerx - x;
	  		var lx = diffx/50;
	  		var diffy = centery - y;
	  		var ly = diffy/300;
	  		TweenMax.to($(currentSlideObj).find('div.parallax1top'), 3, {scale:1.02, x:lx*4, y:ly*3, transformOrigin:"center", ease: Expo.easeOut});
	  		lx = diffx/100;
	  		ly = diffy/300;
	  		TweenMax.to($(currentSlideObj).find('div.parallax1bg'), 3, {x:lx, y:ly*3,transformOrigin:"center", ease: Expo.easeOut});
	  	}
	  	if($(currentSlideObj).checkHasClass('parallax2')) {

	  		var diffx = centerx - x;
	  		var lx = diffx/50;
	  		var diffy = centery - y;
	  		var ly = diffy/150;
	  		
	  		TweenMax.to($(currentSlideObj).find('div.parallax2left'), 3, {scale:1.1, x:lx*4, y:ly*3, transformOrigin:"center", ease: Expo.easeOut});
	  		TweenMax.to($(currentSlideObj).find('div.parallax2right'), 3, {scale:1.1, x:lx*4, y:ly*3, transformOrigin:"center", ease: Expo.easeOut});
	  		lx = diffx/100;
	  		ly = diffy/300;
	  		TweenMax.to($(currentSlideObj).find('div.parallax2bg'), 3, {scale:1.02, x:lx*3, y:ly*3, transformOrigin:"center", ease: Expo.easeOut});
	  	}
	  	if($(currentSlideObj).checkHasClass('parallax3')) {
	  		var diffx = centerx - x;
	  		var lx = diffx/15;
	  		var diffy = centery - y;
	  		var ly = diffy/150;
	  		TweenMax.to($(currentSlideObj).find('div.parallax3down'), 3, {scale:1.02, x:lx*3, y:ly*2, transformOrigin:"center", ease: Expo.easeOut});
	  		TweenMax.to($(currentSlideObj).find('div.parallax3up'), 3, {scale:1.02, x:lx*4, y:ly*3, transformOrigin:"center", ease: Expo.easeOut});
	  		lx = diffx/15;
	  		ly = diffy/300;
	  		TweenMax.to($(currentSlideObj).find('div.parallax3bg'), 3, {x:lx, y:ly, transformOrigin:"center",  ease: Expo.easeOut});
	  	}

	});

	$('div#arrow_left_hover').mouseover(function() {
		if($('div#arrow_left').checkHasClass('arrowHidden')==='true') {
		}else{
			parallax=false;
			left1();
			$('div#arrow_right, div#arrow_right_bg').removeClass('arrowHidden');
			$('div#arrow_left').addClass('arrow_left_arrow_hover');
		}
	});

	$('div#arrow_left_hover').mouseleave(function() {
		$('div#arrow_left_bg').removeClass('arrow_bg_over1');
		$('div#arrow_left').removeClass('arrow_left_arrow_hover');
	});

	$('div#arrow_right_hover').mouseover(function() {
		if($('div#arrow_right').checkHasClass('arrowHidden')==='true') {
		}else{
			parallax=false;
			right1();
			$('div#arrow_left, div#arrow_left_bg').removeClass('arrowHidden');
			$('div#arrow_right').addClass('arrow_right_arrow_hover');
		}
	});

	$('div#arrow_right_hover').mouseleave(function() {
		$('div#arrow_right_bg').removeClass('arrow_bg_over1');
		$('div#arrow_right').removeClass('arrow_right_arrow_hover');
	});

}

function left1 () {
	arrow_left_bg.addClass('arrow_bg_over1');
  	// $(currentSlideObj).find('div.parallax1top').css('left','0px');
  	resetParallax();
  	stopAudio();
  	clearInterval(interval);
  	interval = setInterval(function() {
	    if(slides[currentSlideid-1]) {
	    	$(slides[currentSlideid]).removeClass('currentSlide');
	    	currentSlideid--;
	    	currentSlideObj = slides[currentSlideid];
	    }else{
	    	$('div#arrow_left, div#arrow_left_bg').addClass('arrowHidden');
	    }
  	}, 150);
}

function right1 () {
	arrow_right_bg.addClass('arrow_bg_over1');
	$('div#arrow_right, div#arrow_right_bg').removeClass('arrowHidden');
  	resetParallax();
  	stopAudio();
  	clearInterval(interval);
  	interval = setInterval(function() {
  	    if(slides[currentSlideid+1]) {
  	    	currentSlideid++;
	    	$(slides[currentSlideid]).addClass('currentSlide');
	    	currentSlideObj = slides[currentSlideid];
	    }else{
	    	$('div#arrow_right, div#arrow_right_bg').addClass('arrowHidden');
	    }
  	}, 150);
}

function resetParallax () {

	if($(currentSlideObj).checkHasClass('parallax1')) {
		TweenMax.to($(currentSlideObj).find('div.parallax1top'), 0.5, {scale:1, x:0, y:0, ease: Expo.easeOut});
		TweenMax.to($(currentSlideObj).find('div.parallax1bg'), 0.5, {x:0, y:0, ease: Expo.easeOut});
	}
	if($(currentSlideObj).checkHasClass('parallax2')) {
		TweenMax.to($(currentSlideObj).find('div.parallax2left'), 0.5, {scale:1, x:0, y:0, transformOrigin:"center", ease: Expo.easeOut});
		  		TweenMax.to($(currentSlideObj).find('div.parallax2right'), 0.5, {scale:1, x:0, y:0, transformOrigin:"center", ease: Expo.easeOut});
		TweenMax.to($(currentSlideObj).find('div.parallax2bg'), 0.5, {scale:1, x:0, y:0, ease: Expo.easeOut});
	}
	if($(currentSlideObj).checkHasClass('parallax3')) {
  		TweenMax.to($(currentSlideObj).find('div.parallax3down'), 0.5, {scale:1, x:0, y:0, ease: Expo.easeOut});
  		TweenMax.to($(currentSlideObj).find('div.parallax3up'), 0.5, {scale:1, x:0, y:0, ease: Expo.easeOut});
  		TweenMax.to($(currentSlideObj).find('div.parallax3bg'), 0.5, {x:0, y:0, ease: Expo.easeOut});
  	}
}

function buildBottomNav () {

	var slidenum = 0;
	
	var thumbnailsHtml = '<div id="thumbnails">';

	$.each( slides, function( k, v ) {
	
		slidenum=k+1;

		/*
		if(k===0) {
			thumbnailsHtml += '<div id="thumbnail'+$(this).data('id')+'" class="thumbnail thumbnailVisited" data-id="'+$(this).data('id')+'"><img src="'+$(this).data('thumbnail')+'"></div>';
		}else{
			thumbnailsHtml += '<div id="thumbnail'+$(this).data('id')+'" class="thumbnail" data-id="'+$(this).data('id')+'"><img src="'+$(this).data('thumbnail')+'"></div>';
		}
        */
	
	});

	thumbnailsHtml += '</div>';

	var t_width = Math.floor(wW / slidenum);

	$('main#main').append(thumbnailsHtml);

	$('div#phone').mouseup(function() {
		runAudio();
	});

}

function runAudio () {
	
	var phone = $('div#phone'),
	audiofile = $(currentSlideObj).data('audio');
	;

	TweenMax.to(phone, 1, {scale:0, opacity:0});
	TweenMax.to($('div#audioname'), 1, {scale:0, opacity:0});
	$('div#audioplayerContainer').removeClass('displaynone').removeClass('audioplayerHidden');
	// $('div#phoneContainer').addClass('phoneContainerHidden');
	setTimeout(function() {
	    phone.addClass('phoneContainerHidden');
	}, 250);

	audio = new Audio(audiofile);
	
	setTimeout(function() {
	    audio.play();
	}, 2000);

	var jqbgmusic = $('audio#backgroundMusic');
	jqbgmusic.animate({volume: 0.1}, 1000);
	
}

function stopAudio () {
	
	var phone = $('div#phone');
	var player = $('div#audioplayerContainer');
	player.addClass('audioplayerHidden');
	TweenMax.to(phone, 0.5, {scale:1, opacity:1});
	TweenMax.to($('div#audioname'), 0.5, {scale:1, opacity:1});
	phone.removeClass('phoneContainerHidden');
	setTimeout(function() {
	    player.addClass('displaynone');
	}, 500);

	if(audio) audio.pause();

	var jqbgmusic = $('audio#backgroundMusic');
	jqbgmusic.animate({volume: 0.5}, 1000);

}



/* =========================================================================================== */
/*                                                                                             */
/*                                                                                             */
/*     			AUDIO
/*                                                                                             */
/*                                                                                             */
/* =========================================================================================== */

function addBackgroundMusic () {
	var bgmusic = document.getElementById("backgroundMusic"),
	jqbgmusic = $('audio#backgroundMusic');
	jqbgmusic.animate({volume: 0}, 0);
	bgmusic.play();
	jqbgmusic.animate({volume: 0.5}, 3000);
}


/* =========================================================================================== */
/*                                                                                             */
/*                                                                                             */
/*           TOOLS
/*                                                                                             */
/*                                                                                             */
/* =========================================================================================== */

function updateGlobals () {wW = window.innerWidth; wH = window.innerHeight;}
function random (num) {return Math.floor((Math.random() * num) + 1);}
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x); return o;};
$.fn.checkHasClass=function(a){ return this.hasClass(a).toString(); };
$.fn.o=function(a){ this.css('opacity',a); };
$.fn.mt=function(a){ this.css('marginTop',a+'px'); };
$.fn.h=function(a){ this.css('height',a+'px'); };
function IsEmail(email) { var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; return regex.test(email); }
function detectmob(){if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){return true;}else{return false;}}




/* =========================================================================================== */
/*                                                                                             */
/*                                                                                             */
/*           NEW
/*                                                                                             */
/*                                                                                             */
/* =========================================================================================== */

$("#funeralBox").hide();
$("#optin").hide();
$("#thumbnails").hide();
$("#thumbnails").css("bottom", "-300px");
$("#static").hide();
$("#catImage").hide();
$("#endImage").hide();
$("#outfitImage").hide();
$("#gladiatorImage").hide();
$("#myVid").hide();
$("#botBoxes").hide();

var myTimer = 10;

var staticNoise = new Audio("audio/static.mp3");
staticNoise.loop = false;

document.getElementById("funeralVid").pause();
document.getElementById("myVid").pause();
document.getElementById("backgroundMusic").pause();

$("#startButton").click(function() {
    $(".parallax2left").fadeOut(1800);
    $(".parallax2right").fadeOut(1800);
    $("#idoc-title").fadeOut(1800);
    $("#quote").fadeIn(1800);
    document.getElementById("backgroundMusic").play();
    $("#startButton").hide();
    
    setTimeout(function(){ 
    $("#myVid").show();
        document.getElementById("myVid").play();
        $("#quote").hide();
    }, 10000);
    
    setTimeout(function(){ 
        $("#quote").fadeOut(1800);
        $(".parallax2bg").fadeOut(1800);
        $("#backgroundMusic").animate({volume: 0}, 1000);
        $("#static").show();
        
    var myTimerInterval = setInterval(
        function() { 
	       //alert("Hello"); 
	if (myTimer > 1) {
		myTimer -= 1;
		/*document.getElementById("myScore").innerHTML = myTimer;*/
		//$("myScore").
	} else {
		clearInterval(myTimerInterval);
        $(".fullscreen-bg2").hide();
		document.getElementById("static").style.backgroundImage = "url('uploads/screen_fuzz.gif')";
        staticNoise.play();
		//$("#theEnd").css('background-image', 'url("images/screen_fuzz.gif")');
		document.getElementById("myVid").pause();
        $("body").css("background-color", "black");
        killStatic();
            
	}
	
  }, 1000
);
        
    }, 8000);
    
});


function killStatic() {
    setTimeout(
        function() { 
            $("#funeralBox").show();
            document.getElementById("funeralVid").play();
            staticNoise.pause();
            $("#static").hide();
            
            setTimeout(
                function() { 
                staticNoise.play();
                $("#funeralBox").hide();
                $("#static").show();
                    
                setTimeout(
                function() {     
                    staticNoise.pause();
                    $("body").css("background-color", "black");
                    $("header").css("background-color", "none");
                    $("#static").hide();
                    $("#botBoxes").show();
                    $("#userBox").hide();
                    initScreen();
                    triggerBot();
                    }, 1000);
                    
            }, 20000);
            
            
        }, 1000);
}

