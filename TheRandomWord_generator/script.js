function $(selector) {
	return document.querySelector(selector);
}

const generateButton = $("#generate");

const radioAllWordsFirletUpper = $("#all-words-in-upperfirlet");
const radioSentenceInUpperFirlet = $("#sentence-in-upperfirlet");

const firstLetters = $("#first");
const secondLetters = $("#second");

const wordLength = $("#word-length");
const wordLengthShow = $("#word-length-show");

const resultShow = $("#result");

const copyResultButton = $("#copy-result");
copyResultButton.addEventListener("click", ({ target }) => {
	let content = target.innerHTML;
	navigator.clipboard.writeText(resultShow.textContent);
	target.innerHTML = "<i>Скопировано!</i>";

	setTimeout(() => {
		target.innerHTML = content;
	}, 4000);
});

const speakResultButton = $("#speak-result");
speakResultButton.addEventListener("click", () => {
	speechSynthesis.speak(new SpeechSynthesisUtterance(resultShow.textContent));
});

const generateAndSpeakButon = $("#generate-and-speak");
generateAndSpeakButon.addEventListener("click", (event) => {
	event.preventDefault();
	generateButton.click();
	speakResultButton.click();
});

wordLengthShow.innerHTML = wordLength.value;

wordLength.addEventListener("input", ({ target }) => {
	wordLengthShow.innerHTML = target.value;
});


const wordCount = $("#word-count");
const wordCountShow = $("#word-count-show");

const wordSeparator = $("#separator");

wordCountShow.innerHTML = wordCount.value;

wordCount.addEventListener("input", ({ target }) => {
	wordCountShow.innerHTML = target.value;
});

function randomValueFromLikeArray(values) {
	return values[Math.floor(Math.random() * values.length)];
}

function throwIf(condition, error) {
	if (condition) {
		throw error;
	}
}

function generateRandomWord(firstSymbols, secondSymbols, length = 4) {
	// throwIf(length % 2 === 1, new TypeError("Length should be a even number."));
	throwIf(length <= 0, new RangeError("Length should be a positive number."));

	let stringBin = [];

	for (let i = 0; i < length; i++) {
		if (i % 2 === 0) {
			stringBin.push(randomValueFromLikeArray(firstSymbols));
		} else if (i % 2 === 1) {
			stringBin.push(randomValueFromLikeArray(secondSymbols));
		}
	}

	let string = stringBin.join('');

	return string;
}

function inputCapture({ target }) {
	if (target.value !== "") {
		generateButton.disabled = false;
	} else {
		generateButton.disabled = true;
	}
}

firstLetters.addEventListener("input", inputCapture);
secondLetters.addEventListener("input", inputCapture);

generateButton.addEventListener("click", (event) => {
	event.preventDefault();
	// $("#result").innerHTML = generateRandomWord(firstLetters.value, secondLetters.value, wordLength.value);

	let resultString = "";
	for (let i = 1; i <= wordCount.value; i++) {
		let generatedWord = generateRandomWord(firstLetters.value, secondLetters.value, wordLength.value) + wordSeparator.value;

		// console.log(radioAllWordsFirletUpper.checked);
		if (radioAllWordsFirletUpper.checked === true) {
			generatedWord = generatedWord.split("");

			let letterToUpper = generatedWord[0];
			letterToUpper = letterToUpper.toUpperCase();
			// console.log(letterToUpper);
			generatedWord[0] = letterToUpper;

			generatedWord = generatedWord.join("");
		}

		resultString += generatedWord;
	}

	resultString = resultString + "@";
	resultString = resultString.slice(0, -wordSeparator.value.length - 1);

	if (radioSentenceInUpperFirlet.checked === true) {
		resultString = resultString.split("");
		resultString[0] = resultString[0].toUpperCase();
		resultString = resultString.join("");
	}

	resultShow.innerHTML = resultString;
	copyResultButton.disabled = false;
	speakResultButton.disabled = false;
});



function gen() {
	return generateRandomWord("aeiouy", "bcdfghjklmnpqrstvwxz", 4);
}

// бвгджзйклмнпрстфхцчшщъь
// аеёиоуэюя

// bcdfghjklmnpqrstvwxz
// aeiouy
