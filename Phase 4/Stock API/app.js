

const express = require('express');
const routes = require('./routes/StockRoutes');

const app = express();
const PORT = 3000;

app.use('/api/stock', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
