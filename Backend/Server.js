import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = 8080;


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect('mongodb+srv://choprakhushil13:1rfebIFKUYUBCiDe@cluster0.nhg4l.mongodb.net/')
        console.log('MongoDB connected: ${conn.connection.host}');
    } catch (error) {
        console.error('Error ${error.message}');
    }
};

connectDB()
.then(()=> {
    app.listen(PORT,() => {
        console.log('Server is running on port ${PORT}');
    })
})
.catch((error) => {
    console.error('Error: ${error.message}');
});

