//Seeding a DB dynamically based on CSV headers as schema

const Sequelize = require('sequelize');
const fs = require('fs');

const file = fs.readFileSync('aFile.csv', 'utf8');
const data = file.split(/\r?\n/g);
const headers = file.split(/\r?\n/g)[0].split(',');

const sequelize = new Sequelize('DBs', null, null, {
  dialect: "sqlite",
  storage: './DB.sqlite',
});

//Check that I can even go and connect to the database
sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
    fs.writeFileSync('success-write.txt', 'Can connect\n', 'utf8')
  }, function (err) {
    console.log('Unable to connect to the database:', err);
    fs.writeFileSync('failure-write.txt', "Can't connect to a database", "utf8");
  });



const info = headers.reduce((acc, curr) => {
  console.log(curr)
  acc[curr] = Sequelize.STRING
  return acc;
}, {});
console.log(info);


const TABLE = sequelize.define('dynamicDB', info);


//Sync the schema across to the DB
sequelize.sync();

// loop through rows and then add each row into the DB
for (const [key, row] of data.entries()) {
  const headers = file.split(/\r?\n/g)[0].split(',');
  if (key > 0) {
    const info = row.split(',').reduce((acc, curr, idx) => {
      acc[headers[idx]] = curr;
      return acc;
    }, {});

    const addData = TABLE.create(info);
    let response = addData.toJSON();
    console.log(response)

  }

}
