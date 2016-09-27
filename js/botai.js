
//----Data Declarations----
var userName = "";
	
var convpatterns = new Array (
    new Array("^no", "Please smile!  Yes you! I salute you with my deepest respects.  I present you my boundless love and my deepest respects, with the hope that you would expect them."),
    new Array("^yes", "I promised my father I would get my diploma before starting my live performances. His approval meant a lot to me. But I loved my mother much more."),
    new Array("maybe", "I also loved once. I have many memories in my mind."),
    new Array("wow, show me more", ""),
    
    new Array("why not take to the streets?(.*)\.", "Do you?"),
    
    new Array("^i do", "I wish you all the best things and world peace. I hope everything goes as you wish.")
    );

var uinput = "";
var soutput = "";
var dialog = "";

//-----The Core Code------

//-------
 function mainroutine() {
 uinput = document.mainscreen.BasicTextArea4.value;
 dialog = dialog + userName + ": " + uinput +  '\r' + "\n";
  conversationpatterns()
 dialog = dialog  +  '\r' + "\n";
  updatescreen()

}

//-------
function conversationpatterns() {
   for (i=0; i < convpatterns.length; i++) {
    re = new RegExp (convpatterns[i][0], "i");
    if (re.test(uinput)) {
      len = convpatterns[i].length - 1;
      index = Math.ceil( len * Math.random());
      reply = convpatterns[i][index];
      soutput = uinput.replace(re, reply);
      soutput = initialCap(soutput);
      dialog = soutput +  '\r' + "\n";
            
    if (uinput == "yes") {
        setTimeout(function(){ 
            
            dialog = "And this is what I did...";
            updatescreen();
            
            setTimeout(function(){ 
            $("#outfitImage").show();
            $("#backgroundMusic").animate({volume: .3}, 1000);
        }, 4000); 
            
            
        }, 10000);  
    }    
        
    if (uinput == "wow, show me more") {
        $("#gladiatorImage").show();
        $("#outfitImage").hide();
        setTimeout(function(){ 
            dialog = "An artist can do anything on stage. I’m not undertaking these innovations on the street.";
            updatescreen();
        }, 3000);  
    }
        
        if (uinput == "i do") {
        $("#outfitImage").hide();
        $("#gladiatorImage").hide();
        setTimeout(function(){ 
            dialog = "The people are the ones who create the artist. An artist must respect the people. For instance, I’ve never turned my back to my audience. I always leave the stage walking backwards.";
            $("#outfitImage").hide();
            $("#gladiatorImage").hide();
            updatescreen();
            updatescreen();
        }, 6000);  
            
        setTimeout(function(){ 
            $("#endImage").show();
            $("#endImage").addClass("animate");
            //$("#blackCover").fadeIn(5000);
        }, 10000); 
            
        setTimeout(function(){ 
            $("#optin").fadeIn(500);
        }, 18000);
            
    }
        
      break;
  }
 }
}

/*$("#inputsContainer").css("display", "none");*/

/*setInterval(function(){ 
    $("#inputsContainer").show();
}, 3000);
*/

dialog = "Please, please, permit me to interrupt this.";

function startConvo() {
    setTimeout(function(){ 
        dialog = "My beloveds! My unique ones! Those I have missed so much!";
        updatescreen();
    }, 5000);
    setTimeout(function(){ 
        dialog = "My beautiful friends! This is me, Zeki Müren!";
        updatescreen();
    }, 10000);
    setTimeout(function(){ 
        dialog = "My saintly guests! I am incredibly fortunate for being in your presence, my dears.";
        updatescreen();
    }, 15000);
    setTimeout(function(){ 
        dialog = "Oh, this lettering is not me at all! I must change it! One moment please...";
        updatescreen();
    }, 20000);
    setTimeout(function(){ 
        dialog = "Ah, that is much better.";
        $("#ZekiTalks").css("font-family", "Kaushan Script");
        $("#ZekiTalks").css("color", "#a20395");
        $("#ZekiTalks").css("font-size", "24px");
        $("#zekiAvatar").css("bottom", "190px");
        updatescreen();
    }, 25000);
    setTimeout(function(){ 
        dialog = "Now, would you like to see the real story?";
        updatescreen();
        $("#userBox").show();
    }, 30000);
} 

/*setTimeout(function(){ 
    $("#inputsContainer").show();
}, 3000);
*/

//-------

function initScreen() {
	Apprise('What is your name?',
	{
		buttons: {
			confirm: {
				action: function(result){
					userName= result['input'];
					Apprise('close');
				},
				id: 'confirm',
				text: 'Ok',
			}
		},
		input: true,
	});
	//$("#ZekiTalks").flexible();
	//$("#ZekiTalks").trigger('updateHeight');
	 updatescreen();
}

//-------
function updatescreen() {
 document.mainscreen.BasicTextArea1.value = dialog
 document.mainscreen.BasicTextArea2.value = soutput
 document.mainscreen.BasicTextArea3.value = uinput
 document.mainscreen.BasicTextArea4.value = ""
 //$("#ZekiTalks").trigger('updateHeight');
 var textarea = document.getElementById("ZekiTalks");
 //textarea.scrollTop = textarea.scrollHeight;
}

//-------
function initialCap(field) {
   field = field.substr(0, 1).toUpperCase() + field.substr(1);
   return field
}

