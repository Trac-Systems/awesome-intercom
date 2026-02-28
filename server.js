const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`P2P Focus Timer running on http://localhost:${PORT}`);
  console.log('Built on IntercomSwap - Trac Network');
});
