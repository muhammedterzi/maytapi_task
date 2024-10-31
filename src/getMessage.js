const mongoose = require('mongoose');
const getMessageSchema = new mongoose.Schema({
    // message.type, message.text message.id,options
   // user.id, user.name, user.phone
   // timestamp

   
   message_id: String,
   message_text: String,
   message_url: String,
   message_type: String,
   user_id: String,
   user_name: String,
   user_phone: String,
   timestamp: String,
   conversation: String,
   conversation_name: String
});

const getMessage = mongoose.model('getMessage', getMessageSchema, 'getMessages');
module.exports = getMessage;