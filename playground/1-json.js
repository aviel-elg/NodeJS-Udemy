const fs = require('fs');

// const book = {
//     title: 'Ego is the Ene',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = 'Aviel';
data.age = 21;
const dataString = JSON.stringify(data);
fs.writeFileSync('1-json.json', dataString);