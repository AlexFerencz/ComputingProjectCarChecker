const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Home page route
app.get('/', (req, res) => {
    res.render('index');
});

// Car info route
app.post('/car-info', async (req, res) => {
    try {
        const response = await axios.get(`https://www.regcheck.org.uk/api/reg.asmx/CheckIreland?registration=${req.body.registration}`);
        res.render('car-info', { car: response.data });
    } catch (error) {
        res.send('Failed to retrieve car details');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));