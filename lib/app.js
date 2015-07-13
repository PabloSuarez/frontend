var $ = window.jQuery

var key = 'a548aee0bde874ea460773884934a865'
key = 'c50519606f6ab8e3ccf48078705adcae'
// e3b3163dfbe6728bf1a9f7798f45ee81be6c3096
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
	let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
	$('.Layout').css('background-image', serieImage)
	// luego de resolver la llamada cargo en un array
	// todos los characters, una ves que termine devuelvo
	// todos los personajes
	var characters = serie.characters.items
	var promises = []
	for (let character of characters) {
		let promise = api.getResourceURI(character.resourceURI)
		// mi funcion de la api ya me devuelve la promise
		promises.push(promise)
	}
	//	Promise.all se resuelve cuando todas las promesas del array se resuelvan
	return Promise.all(promises)
})
.then((characters) => {
	return characters.filter((character) => {
		return !!character.thumbnail
	})
})
// Cuando finalice promises que es un array de Promises
// se ejecuta este then
.then((characters) => {
	$('.Card').each((i, item) => {
		let character = characters[i]
		if( typeof character != 'undefined'){
			let $this = $(item)
			let $image = $this.find('.Card-image')
			let $descripcion = $this.find('.Card-description')
			let $name = $this.find('.Card-name')

		    $image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`)
			$name.text(character.name)
			$descripcion.text(character.description)
		}
	})
})
.catch((err) => {
	console.error(err)
})
