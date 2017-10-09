/******************* Smooth scroll with jQuery ******************/

$(document).ready(function() {
	$('a').on('click', function(event) {
		if (this.hash !== '') {
			// Prevent default anchor click behavior
			event.preventDefault();

			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate(
				{
					scrollTop: $(hash).offset().top
				},
				800,
				function() {
					// Add hash (#) to URL when done scrolling (default click behavior)
					window.location.hash = hash;
				}
			);
		} // End if
	});
});

/******************* Change dynamically the active menu item ******************/

var acumulativeOffset = function(element) {
	var top = 0;

	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while (element);

	return top;
};

var navbarItems = document.getElementsByClassName('navbar-item');

var offsetSummary = acumulativeOffset(document.getElementById('summary')) - 50;
var offsetExperience = acumulativeOffset(document.getElementById('experience')) - 50;
var offsetEducation = acumulativeOffset(document.getElementById('education')) - 50;
var offsetAboutMe = acumulativeOffset(document.getElementById('contact')) - 50;

function deleteActiveClass() {
	for (var i = 0; i < navbarItems.length; i++) {
		navbarItems[i].classList.remove('active');
	}
}

window.addEventListener('scroll', changeMenuStyle);

var previous;
function changeMenuStyle(event) {
	var pageOffset = window.pageYOffset;

	if (pageOffset >= 0 && pageOffset < offsetSummary) {
		if (!previous || previous !== 1) {
			previous = 1;
		} else if (previous === 1) {
			return false;
		}

		deleteActiveClass();
		document.querySelector("a[href='#summary']").parentNode.classList.add('active');
	} else if (pageOffset >= offsetSummary && pageOffset < offsetExperience) {
		if (!previous || previous !== 2) {
			previous = 2;
		} else if (previous === 2) {
			return false;
		}

		deleteActiveClass();
		document.querySelector("a[href$='experience']").parentNode.classList.add('active');
	} else if (pageOffset >= offsetExperience && pageOffset < offsetEducation) {
		if (!previous || previous !== 3) {
			previous = 3;
		} else if (previous === 3) {
			return false;
		}

		deleteActiveClass();
		document.querySelector("a[href$='education']").parentNode.classList.add('active');
	} else if (pageOffset >= offsetEducation && pageOffset < offsetAboutMe) {
		if (!previous || previous !== 4) {
			previous = 4;
		} else if (previous === 4) {
			return false;
		}

		deleteActiveClass(); // The active class is changed only if the mouse is in a different block
		document.querySelector("a[href$='contact']").parentNode.classList.add('active');
	}
}

/******************* Make the icons clickable ******************/
var emailIcon = document.getElementById('email-icon');
var linkedinIcon = document.getElementById('linkedin-icon');
var githubIcon = document.getElementById('github-icon');
var pdfConversionLink = document.getElementById('convert-to-pdf');

$(emailIcon).on('mouseenter', function() {
	$('#email-name').text('jose.alonso.programmer@gmail.com');
});
$(emailIcon).on('mouseleave', function() {
	$('#email-name').text('');
});

emailIcon.addEventListener('click', function() {
	window.open('mailto:jose.alonso.programmer@gmail.com', '_blank');
});
linkedinIcon.addEventListener('click', function() {
	window.open('https://www.linkedin.com/in/joseramonalonsotapia/', '_blank');
});
githubIcon.addEventListener('click', function() {
	window.open('https://github.com/josealonso', '_blank');
});

/*************************** Not used ***************************/
/******************* Generate the pdf document ******************/
function pruebaDivAPdf() {
	var pdfDocument = new jsPDF('p', 'pt', 'letter');
	var source1 = document.getElementById('summary');
	var source2 = document.getElementsByClassName('experience0-article')[0];
	// source = document.getElementsByTagName('body')[0];
	console.log('DIV:', source);
	specialElementHandlers = {
		'#bypassme': function(element, renderer) {
			return true;
		}
	};
	margins = {
		top: 80,
		bottom: 60,
		left: 40,
		width: 522
	};

	var experienceSection =
		'Master student Jun 2017 – Jan 2018\nWeb Startup Engineering Bootcamp in KeepCoding.\nEmbedded Software Engineer Jan 2015 – Oct 2016 \nEmbedded Software Engineer for automotive systems. C Programmer and System Validation Engineer.';

	pdfDocument.text(20, 20, 'Primera página');
	pdfDocument.text(20, 30, experienceSection);

	pdfDocument.addPage();
	var source = [ source1 ];
	pdfDocument.setTextColor(0, 0, 220);
	for (var i in source) {
		console.log('    Elemento:', source[i]);
		pdfDocument.fromHTML(
			// [source, source2],
			source[i],
			margins.left, // x coord
			margins.top,
			{
				// y coord
				width: margins.width,
				elementHandlers: specialElementHandlers
			},
			// function(dispose) { pdfDocument.save('CV de José Ramón Alonso Tapia.pdf'); },
			margins
		);
	}
	pdfDocument.save('CV de José Ramón Alonso Tapia.pdf');
}

// pdfConversionLink.addEventListener('click', pruebaDivAPdf);

