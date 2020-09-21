const dictionary = require('./dictionary');
const posesivos = ['mío', 'mía', 'mi' , 'míos', 'mías', 'mis', 'tuyo', 'tuya', 'tu', 'tuyos', 'tuyas', 'tus', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus'];
const conjunciones = ['y', 'e', 'ni', 'no solo', 'sino también', 'ni siquiera', 'pero', 'aunque', 'al contrario', 'en cambio', 'sin embargo', 'a pesar de', 'o', 'o bien', 'o sea', 'es decir', 'esto es','porque', 'dado que', 'ya que', 'debido a que', 'puesto que', 'si', 'sino', 'a condición de que', 'a menos que', 'en caso de que', 'con tal de que', 'siempre que', 'aunque', 'aun cuando', 'a pesar de', 'aun si', 'por más que', 'así', 'así que', 'de modo que', 'de forma que', 'entonces', 'por eso', 'por consiguiente', 'de ahí que', 'por ende', 'para', 'para que', 'a fin de que', 'como', 'tal como', 'según', 'sin que', 'antes de que', 'apenas', 'después de que', 'tan pronto como', 'cuando', 'siempre que', 'hasta que']; 
const articulos = ['el', 'la', 'los', 'las'];

const ran = (length) => Math.floor(Math.random() * length)

const getRandomLetter = () => {
  var chars = 'abcdefghijklmnñopqrstuvwxyz';
  return chars.charAt(ran(chars.length));
}

const mechados = () => {
  switch(ran(11)) {
  case 1:
    return posesivos[ran(posesivos.length)];
  case 2:
    return conjunciones[ran(conjunciones.length)];
  case 3:
    return articulos[ran(articulos.length)];
  default:
    return '';
  }
};

function rimedWord (rime, uniqueArr = [], count) {
  const MATCH_LENGTH = rime.length > 4 ? 4 : rime.length;

  const all = dictionary.all;

  const matched = all.filter((item) => {
    return (
      item.length >= MATCH_LENGTH
      && item.slice(item.length - MATCH_LENGTH).includes(rime.slice(rime.length - MATCH_LENGTH))
      && rime !== item
      && !uniqueArr.includes(item)
    ); 
  });

  return count ? matched.length : (matched[ran(matched.length)] || 'NO_RIME');
}

function getRandomWord() {
  const words = dictionary.all;
  const raw = words[ran(words.length)];
  const base = raw.split(',')[0];
  const termination = raw.split(',')[1];

  if (termination) {
    return ran(2) === 1
      ? base
      : base.substr(0, base.length - termination.trim().length) + termination.trim();
  }
  return raw;
}

const word = () => {
  const w = getRandomWord();
  const rimesLength = rimedWord(w, [], true);
  return (rimesLength < 6) ? word() : w;
};

module.exports = {
  ran,
  mechados,
  rimedWord,
  word
};
