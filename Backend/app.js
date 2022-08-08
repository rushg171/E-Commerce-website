const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const PORT = 8888;
const app = express();

const corsOption = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use('/', router);

app.listen(PORT, (err) => {
  if (!err) console.log('Listening on port ' + PORT);
  else console.log('Error Setting Up the server!' + err);
});
