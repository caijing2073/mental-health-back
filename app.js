const app = require('express')();
const cors = require('cors');
const BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
//   res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
//   next();
// });
module.exports = app;
