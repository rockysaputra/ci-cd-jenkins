const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Desy istri kesayangan kuuu ❤❤❤');
  });
  
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});