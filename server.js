import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { join } from 'path';

import router from './routes/router.js';
import partnerRouter from './routes/partners.js';
import apiRouter from './routes/api.js';

const app       =   express();
const port      =   5556;
const staticDir =   join(process.cwd(), 'static');
const viewsDir  =   join(process.cwd(), 'views');

app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

app.use(express.static(staticDir));

app.set('view engine', 'ejs');
app.set('views', viewsDir);

app.use(cors());
// routes
app.use('/', router);
app.use('/partners', partnerRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

