import express from 'express';
import cors from 'cors';
import hbs from 'hbs';
import path from 'path';
import 'babel-polyfill';

// Instantiate app
const app = express();

//Get env variable
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;

//Get routes
import stuternRoutes from './route/player';

//intialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use cors
app.use(cors());

//Set static folder
app.use(express.static(__dirname + '/../public'));

//Set views and register partials
let viewPath = path.join(__dirname, '../public/views');
app.set('views', viewPath);
app.set('view engine', 'hbs');

//Use routes
app.use(stuternRoutes);

app.listen(PORT, () => {
  `Listening on ${PORT}`;
});
