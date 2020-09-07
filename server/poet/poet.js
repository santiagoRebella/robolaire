const dictionary = require('./dictionary');
const {ran, getRandomLetter} = require('./helpers');

const posesivos = ['mío', 'mía', 'mi' , 'míos', 'mías', 'mis', 'tuyo', 'tuya', 'tu', 'tuyos', 'tuyas', 'tus', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus'];
const conjunciones = ['y', 'e', 'ni', 'no solo', 'sino también', 'ni siquiera', 'pero', 'aunque', 'al contrario', 'en cambio', 'sin embargo', 'a pesar de', 'o', 'o bien', 'o sea', 'es decir', 'esto es','porque', 'dado que', 'ya que', 'debido a que', 'puesto que', 'si', 'sino', 'a condición de que', 'a menos que', 'en caso de que', 'con tal de que', 'siempre que', 'aunque', 'aun cuando', 'a pesar de', 'aun si', 'por más que', 'así', 'así que', 'de modo que', 'de forma que', 'entonces', 'por eso', 'por consiguiente', 'de ahí que', 'por ende', 'para', 'para que', 'a fin de que', 'como', 'tal como', 'según', 'sin que', 'antes de que', 'apenas', 'después de que', 'tan pronto como', 'cuando', 'siempre que', 'hasta que']; 
const articulos = ['el', 'la', 'los', 'las'];

function getRandomWord(letter) {
  const words = dictionary[letter].content;
  const raw = words[ran(words.length)];
  const base = raw.split(',')[0];
  const termination = raw.split(',')[1];
  console.log(raw, termination, base);
  if (termination) {
    return ran(2) === 1
      ? base
      : base.substr(0, base.length - termination.trim().length) + termination.trim();
  }
  return raw;
}

const word = () => getRandomWord(getRandomLetter());

function getRandomPhrase() {
  const formas = [
    `${word()} ${articulos[ran(articulos.length)]} ${word()} ${posesivos[ran(posesivos.length)]} ${conjunciones[ran(conjunciones.length)]} ${word()}`,
    `${articulos[ran(articulos.length)]} ${word()} ${conjunciones[ran(conjunciones.length)]} ${word()} ${articulos[ran(articulos.length)]} ${word()}`,
    `${word()} ${articulos[ran(articulos.length)]} ${word()} ${articulos[ran(articulos.length)]} ${word()}`,
  ];
  return formas[ran(formas.length)];
}

module.exports = () => getRandomPhrase();
