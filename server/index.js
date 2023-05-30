const { app } = require('./app');

const port = 3000;

app.listen(port, () => {
  console.log(`Mugs-ecom listening on port ${port}`);
});
