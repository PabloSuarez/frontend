var $ = window.jQuery;

// Defino clases en js
class MarvelApi {
	constructor(key) {
		this.key = key
		this.baseUrl = 'http://gateway.marvel.com/v1/public/';
	}

	findSeries(title) {
		// let nueva forma de definir variables
		let url = `${this.baseUrl}series?title=${title}&apikey=${this.key}`;
		return Promise.resolve($.get(url))
		.then((res)	=> {
			return res.data.results[0]
		})
	}

	getResourceURI(resourceURI) {
		let url = `${resourceURI}?apikey=${this.key}`;
		return Promise.resolve($.get(url))
		.then((res) => {
			return res.data.results[0]
		})
	}

}

//Para llamar la clase es new MarvelApi(key)
window.MarvelApi = MarvelApi
