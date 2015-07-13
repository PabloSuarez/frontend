'use strict';

var $ = window.jQuery;

var key = 'a548aee0bde874ea460773884934a865';
var api = new MarvelApi(key);

api.findSeries('avengers').then(function (serie) {
	var serieImage = 'url(' + serie.thumbnail.path + '.' + serie.thumbnail.extension + ')';
	$('.Layout').css('background-image', serieImage);
	// luego de resolver la llamada cargo en un array
	// todos los characters, una ves que termine devuelvo
	// todos los personajes
	var characters = serie.characters.items;
	var promises = [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = characters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var character = _step.value;

			var promise = api.getResourceURI(character.resourceURI);
			// mi funcion de la api ya me devuelve la promise
			promises.push(promise);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	//	Promise.all se resuelve cuando todas las promesas del array se resuelvan
	return Promise.all(promises);
}).then(function (characters) {
	return characters.filter(function (character) {
		return !!character.thumbnail;
	});
})
// Cuando finalice promises que es un array de Promises
// se ejecuta este then
.then(function (characters) {
	$('.Card').each(function (i, item) {
		var character = characters[i];
		if (typeof character != 'undefined') {
			var $this = $(item);
			var $image = $this.find('.Card-image');
			var $descripcion = $this.find('.Card-description');
			var $name = $this.find('.Card-name');

			$image.attr('src', character.thumbnail.path + '.' + character.thumbnail.extension);
			$name.text(character.name);
			$descripcion.text(character.description);
		}
	});
})['catch'](function (err) {
	console.error(err);
});
