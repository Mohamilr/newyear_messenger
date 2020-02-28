import express from 'express';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
// import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';
import schedule from 'node-schedule';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

// response helper
import jsonResponse from './helpers/response';

// swagger doc
import apiDocs from '../swagger.json';

// cookie validator
import validateCookie from './middleware/cookieValidator';

// routers
// message route
import messageRoute from './routes/Message.route';

// Configure .env
dotenv.config();

const app = express();

//cors
app.use(cors());

//ejs
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//
const accountSid = process.env.ACCOUNT_SID;
const accountToken = process.env.ACCOUNT_TOKEN;

export const client = require('twilio')(accountSid, accountToken);


client.messages.create({
   to: '+2349033514249',
   from: '+13125481221',
   body: 'i am testing how message works'
})
.then(res => console.log(res))
.catch(e => console.log(e))



const PORT = process.env.PORT || 5000;

app.get('/', validateCookie, (req, res) => {
  res.status(200).render("index");
});
app.use('/api/v1', messageRoute);

// swagger route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(apiDocs))

app.use('*', (req, res) => {
  res.render('error');
  jsonResponse.error(res, 'error', 404, 'incorrect route');
})

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
})
// To enable test
export default app;