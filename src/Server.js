const express = require('express');
const axios = require('axios');
// Statik değişkenler:
const PORT = 80;
const MAYTAPI_PRODUCTID = 'a9dd11ab-7e50-4086-975c-b45cdb75d001';
const MAYTAPI_TOKEN = '4f665094-ca74-479d-a1c0-48bcee056da1';
const MAYTAPI_PHONEID = 59003;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Merhaba dünya! Şu anda test sunucusu çalışıyor.');
});

app.listen(PORT, () => {
    console.log(`Test uygulamam ${ PORT } portundan çalışıyor.`)
});