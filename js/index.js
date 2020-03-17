const insultButton = document.querySelector('#search-button');
const charactersElem = document.querySelector('#characters');

function showCharacter(character) {
    let elem = document.createElement('article');
    let format = '<h2>Namn: ' + character.name + '</h2>' + '<p> Hus: ' + character.house + '</p>' +
    '<p>Order of the Phoenix: ' + character.orderOfThePhoenix + '</p>' + '<p>Typ: ' + character.species + '</p>' +
    '<p>Skola: ' + character.school + '</p>';
    elem.innerHTML = format;
    charactersElem.append(elem);
}


function loopCharacters(characters) {
    charactersElem.innerHTML = '';

    for(let i = 0; i < characters.length; i++) {
        showCharacter(characters[i]);
    }
}

async function getCharacters(house, orderOfThePhoenix) {
    let baseURL = 'https://www.potterapi.com/v1/characters?key=$2a$10$gEu0O5jmtD2VgySMbVDGOebtftLbfyB0Z5qDpmMhW0Ds4fcfh6cRm';
    let url = baseURL;

    if (house) {
        url += '&house=' + house;
    }

    if (orderOfThePhoenix) {
        url += '&orderOfThePhoenix=' + orderOfThePhoenix;
    }

	try {
		let response = await fetch(url);
		let data = await response.json();
		
		loopCharacters(data);
	} catch(error) {
		console.error('ERROR IN FETCH: ', error);
	}
}


insultButton.addEventListener('click', function() {
    let house = document.querySelector('#house').value;
    let orderOfThePhoenix = document.querySelector('#orderOfPhoenix').value;
	getCharacters(house, orderOfThePhoenix);
});