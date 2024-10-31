const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Message = require('./Message');
const getMessage = require('./getMessage');

// Statik değişkenler:
const PORT = 4040;
const MAYTAPI_PRODUCTID = 'a9dd11ab-7e50-4086-975c-b45cdb75d001';
const MAYTAPI_TOKEN = '4f665094-ca74-479d-a1c0-48bcee056da1';
const MAYTAPI_PHONEID = 59003;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Merhaba dünya! Şu anda test sunucusu çalışıyor.');
});
// MongoDB bağlantısı
mongoose.connect('mongodb+srv://muhammedterzi:HqmkaLvxJHQ9hh3K@maytapi.qwhhj.mongodb.net/maytapi_task')
.then(() => console.log('MongoDB bağlantısı başarılı!'))
.catch(err => console.error('MongoDB bağlantısı başarısız:', err));


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
            const newMessage = new Message({
                chatId: response.data.data.chatId,
                messageId: response.data.data.msgId,
                toNumber: toNumber,
                type: "text",
                content: message
            });

            await newMessage.save();
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
            const newMessage = new Message({
                chatId: response.data.data.chatId,
                messageId: response.data.data.msgId, 
                toNumber: toNumber,
                type: "poll", 
                content: message, 
                options: options 
            });

            await newMessage.save(); 
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
            const newMessage = new Message({
                chatId: response.data.data.chatId,
                messageId: response.data.data.msgId, 
                toNumber: toNumber,
                type: "media", 
                content: message
            });

            await newMessage.save(); 
            res.status(200).send('Mesaj basariyla gonderildi!');
        }
    }
    catch(err) {
        res.status(404).send(err.message);
    }
});

app.post('/webhook', async (req, res) => {
    
    const message = req.body;

    // message.type, message.text message.id 
    // user.id, user.name, user.phone
    // timestamp
    // conversation, conversation_name
    
    console.log('Received message:', message.message);
    console.log('Received User:', message.user);
    console.log('Received Timestamp:', message.timestamp);
    try {
        const newGetMessage = new getMessage({
            message_id: message.message.id,
            message_text: message.message.text,
            message_type: message.message.type,
            message_url: message.message.url,
            message_options: message.message.options,
            user_id: message.user.id,
            user_name: message.user.name,
            user_phone: message.user.phone,
            timestamp: message.timestamp,
            conversation: message.conversation,
            conversation_name: message.conversation_name
        });

        await newGetMessage.save();
        console.log('Mesaj MongoDB veritabanına kaydedildi.');
    } catch (error) {
        console.error('Mesaj Kaydedilirken Hata:', error);
    }
    // Respond to Maytapi
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Test uygulamam ${ PORT } portundan çalışıyor.`)
});