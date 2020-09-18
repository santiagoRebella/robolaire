const dictionary = require('./dictionary');
const {ran, getRandomLetter} = require('./helpers');

const posesivos = ['mío', 'mía', 'mi' , 'míos', 'mías', 'mis', 'tuyo', 'tuya', 'tu', 'tuyos', 'tuyas', 'tus', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus', 'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras', 'suyo', 'suya', 'su', 'suyos', 'suyas', 'sus'];
const conjunciones = ['y', 'e', 'ni', 'no solo', 'sino también', 'ni siquiera', 'pero', 'aunque', 'al contrario', 'en cambio', 'sin embargo', 'a pesar de', 'o', 'o bien', 'o sea', 'es decir', 'esto es','porque', 'dado que', 'ya que', 'debido a que', 'puesto que', 'si', 'sino', 'a condición de que', 'a menos que', 'en caso de que', 'con tal de que', 'siempre que', 'aunque', 'aun cuando', 'a pesar de', 'aun si', 'por más que', 'así', 'así que', 'de modo que', 'de forma que', 'entonces', 'por eso', 'por consiguiente', 'de ahí que', 'por ende', 'para', 'para que', 'a fin de que', 'como', 'tal como', 'según', 'sin que', 'antes de que', 'apenas', 'después de que', 'tan pronto como', 'cuando', 'siempre que', 'hasta que']; 
const articulos = ['el', 'la', 'los', 'las'];

function getRandomWord(letter) {
  const words = dictionary.all;
  //const words = dictionary.letters.lemario.content;
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
  const w = getRandomWord(getRandomLetter()).replace(/[0-9]/g, '');
  const rimesLength = rimedWord(w, [], true);
  return (rimesLength < 6) ? word() : w;
};

function getRandomPhrase() {
  const formas = [
    `${word()} ${articulos[ran(articulos.length)]} ${word()} ${posesivos[ran(posesivos.length)]} ${conjunciones[ran(conjunciones.length)]} ${word()}`,
    `${articulos[ran(articulos.length)]} ${word()} ${conjunciones[ran(conjunciones.length)]} ${word()} ${articulos[ran(articulos.length)]} ${word()}`,
    `${word()} ${articulos[ran(articulos.length)]} ${word()} ${articulos[ran(articulos.length)]} ${word()}`,
  ];
  return [formas[ran(formas.length)]];
}

function rimedWord (rime, uniqueArr = [], count) {
  const MATCH_LENGTH = rime.length > 6 ? 6 : rime.length;

  const all = dictionary.all;

  console.log(rime, MATCH_LENGTH)

  const matched = all.filter((item) => {
    return (
      item.length >= MATCH_LENGTH
      && item.slice(item.length - MATCH_LENGTH).includes(rime.slice(rime.length - MATCH_LENGTH))
      && rime !== item
      && !item.includes('-')
      && !uniqueArr.includes(item)
    ); 
  });

  return count ? matched.length : (matched[ran(matched.length)] || 'NO_RIME');

  console.log('matched', matched)

  while (true) {
    const w = word()
    if (w.slice(w.length - MATCH_LENGTH).includes(rime.slice(rime.length - MATCH_LENGTH)) && rime !== w && !w.includes('-') && !uniqueArr.includes(w)) {
      return w;
    }
  }
}
function getRimedPhrase() {
  const N = Array(4).fill();
  const first = word();
  const third = word();
  const fifth = word();

  const firsts = N.reduce((acc) => [...acc, rimedWord(first, acc)], []);
  const thirds = N.reduce((acc) => [...acc, rimedWord(third, acc)], []);
  const fifths = N.reduce((acc) => [
    ...acc, rimedWord(fifth, acc)
  ], []);

  return N.map((el, index) => {
    const formas = [
      `${firsts[index]} ${articulos[ran(articulos.length)]} ${thirds[index]} ${word()} ${fifths[index]}`,
      `${thirds[index]} ${word()} ${fifths[index]} ${articulos[ran(articulos.length)]} ${firsts[index]}`,
      `${fifths[index]} ${posesivos[ran(posesivos.length)]} ${word()} ${firsts[index]} ${articulos[ran(articulos.length)]} ${thirds[index]}`
    ];
    return formas[ran(formas.length)];
  });
}

function getRimed2Phrase() {
  const N = Array(4).fill();
  const first = word();
  const third = word();
  const fifth = word();

  const firsts = N.reduce((acc) => [...acc, rimedWord(first, acc)], []);
  const thirds = N.reduce((acc) => [...acc, rimedWord(third, acc)], []);
  const fifths = N.reduce((acc) => [
    ...acc, rimedWord(fifth, acc)
  ], []);

  return N.map((el, index) => {
    const formas = [
      `${firsts[index]} ${articulos[ran(articulos.length)]} ${word()} ${fifths[index]}`,
      `${thirds[index]} ${word()} ${articulos[ran(articulos.length)]} ${firsts[index]}  ${fifths[index]}`,
      `${fifths[index]} ${posesivos[ran(posesivos.length)]} ${word()} ${firsts[index]} ${articulos[ran(articulos.length)]} ${thirds[index]}`
    ];
    return formas[ran(formas.length)];
  });
}

module.exports = {
  getRimedPhrase,
  getRandomPhrase,
  getRimed2Phrase
};
