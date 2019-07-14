import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import debug from 'debug';
const app = express();
const port = process.env.port || 3000;

debug('index');
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

router.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());


app.get('/', (req, res) => {
  res.send('Welcome to property pro lite homepage');
});

app.use('/api/v1', router);

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

export default app;
