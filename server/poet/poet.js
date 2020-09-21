
const {ran, word, mechados, rimedWord} = require('./helpers');

function verso() {
  const first = word();
  const second = word();

  const formas = [`
    ${mechados()} ${first} ${mechados()} ${rimedWord(first, [])} 
    ${mechados()} ${second} ${mechados()} ${rimedWord(second, [])}
    `, `
    ${mechados()} ${first} ${mechados()} ${rimedWord(second, [])} 
    ${mechados()} ${second} ${mechados()} ${rimedWord(first, [])}
    `, `
    ${word()} ${mechados()} ${word()} ${mechados()} ${word()} ${mechados()} ${word()}
    `, `
    ${first} ${mechados()} ${word()} ${mechados()} ${word()} ${mechados()} ${rimedWord(first, [])}
  `];

  return formas[ran(formas.length)];
}

function estrofa() {
  const N = Array(8).fill();
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
      `${firsts[index]} ${mechados()} ${word()} ${fifths[index]}`,
      `${thirds[index]} ${word()} ${mechados()} ${firsts[index]}  ${fifths[index]}`,
      `${fifths[index]} ${mechados()} ${word()} ${firsts[index]} ${mechados()} ${thirds[index]}`
    ];

    const formas2 = [
      `${mechados()} ${firsts[index]} ${mechados()} ${firsts[index+4]} ${mechados()} ${fifths[index]} ${mechados()} ${thirds[index]}`,
      `${mechados()} ${thirds[index]} ${mechados()} ${thirds[index+4]} ${mechados()} ${fifths[index]} ${mechados()} ${firsts[index]}`,
      `${mechados()} ${thirds[index]} ${mechados()} ${firsts[index]} ${mechados()} ${fifths[index]} ${mechados()} ${fifths[index+4]}`,
      `${mechados()} ${firsts[index]} ${mechados()} ${firsts[index+4]} ${mechados()} ${thirds[index]} ${mechados()} ${fifths[index]}`,
    ];
    return formas2[index];
  }).filter(item => item);
}

const poema = () => {
  return `${estrofa()},${estrofa()},${estrofa()}`;
};

module.exports = {
  verso,
  estrofa,
  poema
};
