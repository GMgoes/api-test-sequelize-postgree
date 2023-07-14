import express, { json } from 'express';
import { config } from 'dotenv';
import book_route from './routes/book.js';

config();

var app = express();

app
.use(express.json())
.use(express.urlencoded({ extended: true }));

app.use('/book', book_route);

app.listen(process.env.WEBPORT, () => {
    console.log('Running...');
});

export default app;
