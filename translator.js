const transolator = require('translate-google')
const stringSimularity = require('string-comparison').levenshtein
const langDetector = new (require('languagedetect'))

async function translateMsg(message) {
	let response = "Already in english" //default response

    //must be longer than 10 characters, ignore discord emojis
    if (message.length >= 10 && (!(message.match(/<a?:([a-zA-Z0-9_-]+):(\d{18})>/)))) {

		if (message.startsWith("dts!")) return; //if message starts wiht dts!, dont translate
		if (langDetector.detect(message, 1)?.[0]?.[0] == "english") return; //detect if its english

		await transolator(message, {to: 'en'}).then(res => {
			if (stringSimularity.similarity(message, res) >= 0.75) return; //check if the original and the result are too simular, google corrects typos so they could be a little diferent!!
            response = res
		})
	}
	return response
}

//The result:
console.log('===== Translations =====');
translateMsg("Български: Много добре работи!").then(res => console.log(res))
translateMsg("Deutsch: Es funktioniert sehr gut!").then(res => console.log(res))
translateMsg("Íslenska: Það virkar mjög vel!").then(res => console.log(res))
translateMsg("Ελληνικά: Λειτουργεί πολύ καλά!").then(res => console.log(res))
translateMsg("日本：それは非常にうまくいきます！").then(res => console.log(res))
