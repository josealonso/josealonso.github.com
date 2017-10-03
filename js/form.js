var MAX_NUMBER_OF_WORDS = 9; //150;
var textAreaElement = document.getElementById('text-area');
var numOfWords = 0;
var elemThruOther = document.getElementById('other');

var form = document.getElementsByTagName('form')[0];
var inputNombre = document.getElementById('nombre');
var inputApellidos = document.getElementById('apellidos');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var textAreaElement = document.getElementById('text-area');
var submitButton = document.getElementById('enviar');

var thruGoogleSearch = document.getElementById('Google-search');
var thruSocialMedia = document.getElementById('social-media');
var thruGithub = document.getElementById('github');

var textAreaDiv = document.getElementById('text-area-class');

var loadingIcon = document.createElement('i');
var loadingSocialIcons = document.createElement('i');
loadingIcon.classList.add('fa', 'fa-spinner', 'fa-spin');

/****************** Función de "inicio" ********************/

function init() {
	textAreaDiv.classList.add('hide-textarea');
	var inputs = [ inputNombre, inputApellidos, emailInput, phoneInput, textAreaElement ];
	for (i in inputs) {
		inputs[i].style.color = 'black';
	}
}

document.onload = init();

/****************** Muestra o esconde la caja de texto ********************/

elemThruOther.addEventListener('change', function toggleTextArea() {
	if (elemThruOther.checked === true) {
		textAreaDiv.classList.remove('hide-textarea');
		textAreaDiv.classList.add('show-textarea');
		textAreaElement.focus();
	} else {
		textAreaDiv.classList.add('hide-textarea');
		textAreaDiv.classList.remove('show-textarea');
	}
});

/****************** Impide la escritura cuando se ha llegado a un determinado número de palabras ********************/

textAreaElement.addEventListener('keypress', function calculateNumberOfWords(textArea) {
	numOfWords = textAreaElement.value.split(/\s+/).length; //textContent;
	console.log('Palabras: ' + numOfWords);
	if (numOfWords >= MAX_NUMBER_OF_WORDS) {
		//console.log('Stop typing !!');
		textAreaElement.setAttribute('disabled', true);
	} else {
		textAreaElement.removeAttribute('disabled');
		return;
	}
});

/****************** Código que se ejecuta al enviar el formulario ********************/
form.addEventListener('submit', function(event) {
	if (inputNombre.checkValidity() === false) {
		alert('Write your name');
		inputNombre.focus();
		event.preventDefault();
		return false;
	}

	if (inputApellidos.checkValidity() === false) {
		alert('Write your surname');
		inputApellidos.focus();
		event.preventDefault();
		return false;
	}

	if (emailInput.checkValidity() === false) {
		alert('The email address is incorrect');
		emailInput.focus();
		event.preventDefault();
		return false;
	}

	if (phoneInput.value.length !== 9) {
		alert('The phone number is incorrect');
		emailInput.focus();
		event.preventDefault();
		return false;
	}

	if (!thruGoogleSearch.checked && !thruSocialMedia.checked && !thruGithub.checked && !elemThruOther.checked) {
		alert('Select one or more ways of how you heart about us');
		event.preventDefault();
		return false;
	}

	if (elemThruOther.checked === true && textAreaElement.value[0] === ' ') {
		alert('Explain in the text box how you heard about us');
		textAreaElement.focus();
		event.preventDefault();
		return false;
	}

	submitButton.setAttribute('disabled', '');
	submitButton.appendChild(loadingIcon);
	event.preventDefault();

	setTimeout(function() {
		form.reset();
		submitButton.removeAttribute('disabled');
		textAreaElement.removeAttribute('disabled');
		submitButton.removeChild(loadingIcon);
		alert('Your data have been received. We will contact you as soon as possible');
		window.location.href = './index.html';
	}, 1000);
});
