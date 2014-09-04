$(document).ready(function() {


	var isIpad = (/ipad/gi).test(navigator.appVersion),
		isHiRes = window.devicePixelRatio && window.devicePixelRatio > 1,
		isIphone = (/iphone/gi).test(navigator.appVersion),
		isAndroid = (/android/gi).test(navigator.appVersion),
		isTouch = isIphone || isIpad || isAndroid,
		isFirefox = (/Firefox/.test(navigator.userAgent)),
		isMSIE = (/MSIE/.test(navigator.userAgent)),
		LAUNCH_EVENT = isTouch ? "touchstart" : 'mousedown',
		MOVE_EVENT = isTouch ? "touchmove" : "mousemove",
		END_EVENT = isTouch ? "touchend" : "mouseout",
	

		// the different letter groups
		letterGroups = [
			'aeiou',
			'wtdc',
			'pb',
			'fghjk',
			'lmnqrs',
			'vxyz'
		],

		// css  selectors to let us know which dot we are highlighting
		dotSelectors = ['one','two','three','four','five','six'],


		
		// we'l be using these a lot, so save the references
		
		// container for the list of current letter choces
		inner = $('#letters-inner'),
		
		// the message being typed
		dialog = $('#message-in-progress'),

		// the active part of the message
		inCursor = $('#before-cursor'),

		// the stuff after the cursor that we aren't editing
		// ignored for now, but will come in handy if we decide 
		// to support cusror placement
		postCursor = $('#after-cursor'),

		// keep track of which group we are on
		currentChoice = 0,

		// fo da cursor
		blinking = false,


		CSS_TRASITION_DURATION = 250;




// ██╗     ███████╗████████╗████████╗███████╗██████╗      ██████╗ ██████╗  ██████╗ ██╗   ██╗██████╗ ███████╗
// ██║     ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝ ██╔══██╗██╔═══██╗██║   ██║██╔══██╗██╔════╝
// ██║     █████╗     ██║      ██║   █████╗  ██████╔╝    ██║  ███╗██████╔╝██║   ██║██║   ██║██████╔╝███████╗
// ██║     ██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║   ██║██╔══██╗██║   ██║██║   ██║██╔═══╝ ╚════██║
// ███████╗███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║     ███████║
// ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚══════╝
                                                                                                         
	// set the letters we want to display 
	function setLetters(){		
		inner.addClass('invisible');
		setTimeout(setLeterContents,CSS_TRASITION_DURATION);

	}

	function setLeterContents() {
		inner.empty();
		var setOfLetters = letterGroups[currentChoice],
			classes = "icon character" + ( currentChoice ? '' : ' vowel'),
			dotSelector = dotSelectors[currentChoice];

		for ( var i=0;i<setOfLetters.length;i++)
		{
			var letter = setOfLetters[i];
			inner.append( '<div class="' + classes + '">' + letter + '</div>');
		}
		
		$('#nav-circles .selected').removeClass('selected');
		$('#nav-circles #' + dotSelector).addClass('selected');

		$('.character').unbind(LAUNCH_EVENT);
		$('.character').bind(LAUNCH_EVENT, readAndAddLetter );
		inner.removeClass('invisible');
	}



	function readAndAddLetter()
	{
		var letter = $(this).text();
		addLetter(letter);
		resetLetters();
	}

		
	function resetLetters()
	{
		if (currentChoice>0)
		{
			currentChoice=0;
			setLetters();			
		}
	}

	

	function incrementLetterGroup()
	{
		currentChoice++;
		if ( currentChoice>= letterGroups.length)
			currentChoice = 0;
		setLetters();		
	}



// ███████╗██████╗ ██╗████████╗██╗███╗   ██╗ ██████╗ 
// ██╔════╝██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔════╝ 
// █████╗  ██║  ██║██║   ██║   ██║██╔██╗ ██║██║  ███╗
// ██╔══╝  ██║  ██║██║   ██║   ██║██║╚██╗██║██║   ██║
// ███████╗██████╔╝██║   ██║   ██║██║ ╚████║╚██████╔╝
// ╚══════╝╚═════╝ ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 


	function addLetter(l)
	{
		if ( l == ' ')
			l = '&nbsp;';
		inCursor.html( inCursor.html() + l );
	}


	function backspace()
	{
		var message = inCursor.html(),
			L = message.length,
			last6 = message.substring(L-6);
		if ( '&nbsp;' == last6)
			message = message.substring(0,L-6);
		else
			message = message.substring(0,L-1);
		inCursor.html( message );
	}


// ██╗   ██╗██╗    ██████╗ ██╗████████╗███████╗
// ██║   ██║██║    ██╔══██╗██║╚══██╔══╝██╔════╝
// ██║   ██║██║    ██████╔╝██║   ██║   ███████╗
// ██║   ██║██║    ██╔══██╗██║   ██║   ╚════██║
// ╚██████╔╝██║    ██████╔╝██║   ██║   ███████║
//  ╚═════╝ ╚═╝    ╚═════╝ ╚═╝   ╚═╝   ╚══════╝
                                           

	function showInstructions()
	{
		$( '#instructions').removeClass('cleared');
		$(this).addClass('showing');
		addLetter(' ');
		resetLetters();
	}


	// make the cursor blink
	setInterval(function(){
		if(blinking)
		{
			inCursor.removeClass('blinking');
			blinking = false;
		}
		else
		{
			inCursor.addClass('blinking');
			blinking = true;
		}
	}, 500);



	// we won't support moving the cursor for now
	// if we do, it will probably mean some sort of hack 
	// like wrapping every letter in a span, and detecting
	// which is clicked

	// function setCursor(event) {
	// 	var position  = dialog[0].selectionStart,
	// 		message = dialog.text(),
	// 		before = message.substring(0,position),
	// 		after = message.substring(position);
	// 	inCursor.text( before);
	// 	postCursor.text( after);

	// }




	$('#next').bind(LAUNCH_EVENT,incrementLetterGroup);
	$('#backspace').bind(LAUNCH_EVENT,backspace);
	$( '#show-instructions p').bind(LAUNCH_EVENT,showInstructions);
	// dialog.bind(LAUNCH_EVENT,setCursor);

	$( '#dismiss-instructions').bind(LAUNCH_EVENT,function(){
		$( '#instructions').addClass('cleared');
		$( '#show-instructions').removeClass('showing');
	});

	setLetters();


});


