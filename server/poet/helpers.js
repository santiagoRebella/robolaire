const ran = (length) => Math.floor(Math.random() * length)

const getRandomLetter = () => {
  var chars = 'abcdefghijklmnñopqrstuvwxyz';
  return chars.charAt(ran(chars.length));
}

module.exports = {
  ran,
  getRandomLetter
};
