import express from 'express';
import bodyParser from 'body-parser';
import { debug } from 'debug';

const app = express();
const port = process.env.port || 3000;
debug(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to property pro lite homepage');
});


app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

export default app;
