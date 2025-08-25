const express = require('express');
const app = express();
app.use(express.json());

let webhooks = [];

app.post('/webhook', (req, res) => {
  webhooks.push({
    timestamp: new Date(),
    data: req.body
  });
  if (webhooks.length > 100) webhooks.shift();
  res.json({ success: true });
});

app.get('/webhooks', (req, res) => {
  const temp = webhooks;
  webhooks = [];
  res.json(temp);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on port ' + PORT));