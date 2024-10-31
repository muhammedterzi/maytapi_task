const mongoose = require('mongoose');

//mongodb şeması oluşturuldu
const messageSchema = new mongoose.Schema({
    chatId: String,
    messageId: String,
    toNumber: String,
    type: String,
    content: String,
    options: [String],
    timestamp: { type: Date, default: Date.now }
});



const Message = mongoose.model('Message', messageSchema, 'sendMessages');

module.exports = Message;
