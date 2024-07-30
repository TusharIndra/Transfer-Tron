require('dotenv').config();
const mongoose = require('mongoose');
function connectDb(){
    mongoose.connect(process.env.CONN_URL);
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB connected');
    });
    
    connection.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}
module.exports = connectDb;