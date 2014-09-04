$(document).ready(function() {

	var dialog = $('#dialog-con p span');

	// create an array of the different letter groups
var circles = [
	"#one",
	"#two",
	"#three",
	"#four",
	"#five",
	"#six"
	];

// create an array of the different letter groups
var letterGroups = [
	'aeiou',
	'wtdc',
	'pb',
	'fghjk',
	'lmnqrs',
	'vxyz'
	];

var currentChoice = 0,
	pageNav = 0,
	cursorPosition = dialog.text().length;
// set the letters we want to display 
function setLetters(){
	// get the container of letters
	var inner = $('#letters-inner');
	inner.empty();
	var setOfLetters = letterGroups[currentChoice];
	for ( var i=0;i<setOfLetters.length;i++)
	{
		var letter = setOfLetters.append( '<div class="icon character">' + letter + '</div>');
	}

	$('.character').click(function(){
		// read the contents of the div, and add this letter to the message?
		var letter = $(this).text();
		addLetter(letter);
	});
}

$('#no').click(function(){
	pageNav++;
	currentChoice++;
	if ( currentChoice>= letterGroups.length )  {
		currentChoice = 0;
	};
	setLetters();
	var inner = $('#nav-circles');
	var bubbles = currentPage[pageNav];
	for (i=0; i <= pageNav.length; i++) {
		inner.append( circles[i] );
	};
	for ( f = 0; f <= bubbles.length; f++){
		
	};
});

setLetters();

	$('#next').click(function(){
		currentChoice++;
		if ( currentChoice>= letterGroups.length)
			currentChoice = 0;
		setLetters();
	});

function CngClass(obj) {
	if (circles) { 
		circles.className='';
		obj.className='selected';
 		circles=obj;
 	};
};

ChgClass();



	$('#backspace').click(function(){
		var message = dialog.text(),
			messageArray = message.split('');
		messageArray.splice( cursorPosition-1, 1);
		message = messageArray.join('');
		dialog.text( message );
		cursorPosition--;
	});



//	$('#delete').click(function(){
//		var message = dialog.text(),
//			messageArray = message.split('');
//		messageArray.splice( cursorPosition, 1);
//		message = messageArray.join('');
//		dialog.text( message );
//	});



	dialog.click(function(){
		cursorPosition = dialog[0].selectionStart;
	});


});