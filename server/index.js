const { app } = require('./app');
require('dotenv').config();

const port = 8080;

app.listen(port, () => {
  console.log(`Mugs-ecom listening on port ${port}`);
});
