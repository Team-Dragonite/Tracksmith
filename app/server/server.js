const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api.js');
const bodyParser = require('body-parser');

const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/api', apiRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// this is req.body <ref *2> ServerResponse {
//   req: IncomingMessage {
//     body: {
//       username: 'test2',
//       password: 'password123',
//       firstname: 'test2',
//       lastname: 'test2'
//     },
//   }
// }
