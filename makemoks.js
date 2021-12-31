const fs = require('fs');
const faker = require('faker');
faker.locale = "ru";

const cards = Array(100).fill(0).map(em => faker.name.lastName() + ' ' + faker.name.middleName() + ' ' + faker.name.middleName())

fs.writeFile('./public/data.json', JSON.stringify(cards), result => {
    console.log('Ready');
})