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

// Text Message
app.post('/mesaj/text', async (req, res) => {
    // toNumber, message
    try {
        const toNumber = req.body.toNumber;
        const message = req.body.message;

        const response = await axios.post(
            `https://api.maytapi.com/api/${ MAYTAPI_PRODUCTID }/${ MAYTAPI_PHONEID }/sendMessage`,
            {
                "type": "text",
                "to_number": toNumber, 
                "message": message
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-maytapi-key": MAYTAPI_TOKEN
                }
            }
        );

        console.log(response.data)
        if(!response.data.success) {
            res.status(404).send(response.data.message);
        }
        else {
            //  Veritabanı işlemleri buraya gelecek.
            // response.data.data.chatId, response.data.data.msgId
            res.status(200).send('Mesaj basariyla gonderildi!');
        }
    }
    catch(err) {
        res.status(404).send(err.message);
    }
});

// Poll Message

app.post('/mesaj/poll', async (req, res) => {
    // toNumber, message, options, only_one (optional)
    try {
        const toNumber = req.body.toNumber;
        const message = req.body.message;
        const options = req.body.options;
        const only_one = req.body.only_one;

        const response = await axios.post(
            `https://api.maytapi.com/api/${ MAYTAPI_PRODUCTID }/${ MAYTAPI_PHONEID }/sendMessage`,
            {
                "type": "poll",
                "to_number": toNumber, 
                "message": message,
                "options": options,
                "only_one": only_one
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-maytapi-key": MAYTAPI_TOKEN
                }
            }
        );

        console.log(response.data)
        if(!response.data.success) {
            res.status(404).send(response.data.message);
        }
        else {
            //  Veritabanı işlemleri buraya gelecek.
            // response.data.data.chatId, response.data.data.msgId
            res.status(200).send('Mesaj basariyla gonderildi!');
        }
    }
    catch(err) {
        res.status(404).send(err.message);
    }
});

app.post('/mesaj/media', async (req, res) => {
    // toNumber, message, text
    try {
        const toNumber = req.body.toNumber;
        const message = req.body.message;
        const text = req.body.text;

        const response = await axios.post(
            `https://api.maytapi.com/api/${ MAYTAPI_PRODUCTID }/${ MAYTAPI_PHONEID }/sendMessage`,
            {
                "type": "media",
                "to_number": toNumber, 
                "message": message,
                "text": text
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-maytapi-key": MAYTAPI_TOKEN
                }
            }
        );

        console.log(response.data)
        if(!response.data.success) {
            res.status(404).send(response.data.message);
        }
        else {
            //  Veritabanı işlemleri buraya gelecek.
            // response.data.data.chatId, response.data.data.msgId
            res.status(200).send('Mesaj basariyla gonderildi!');
        }
    }
    catch(err) {
        res.status(404).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Test uygulamam ${ PORT } portundan çalışıyor.`)
});