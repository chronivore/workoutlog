let express = require('express');
let app = express();

const express = require('express');

let log = require('./controllers/workoutcontroller');
const sequelize = require('./db');

sequelize.sync();

app.use(express.json())

app.use('/log', log)

app.use(require('./middleware/headers'))

const user = require('.controllers/usercontroller');

app.use('/auth', user);

const log = require('./controllers/workoutcontroller');


app.listen(process.env.PORT, () => {console.log(`App is listening on port ${process.env.PORT}`)})

