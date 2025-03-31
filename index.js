const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Desy istri kesayangan kuuu ❤❤❤ udah kayak mommy kafka');
  });
  
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'okkk' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
