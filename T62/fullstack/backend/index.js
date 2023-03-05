const express = require('express');
const app = express();
const cors = require('cors');
const appointmentsRouter = require('./controllers/appointments');
const usersRouter = require('./controllers/users');
const mongoose = require('mongoose');
const loginRouter = require('./controllers/login');

mongoose.connect('mongodb+srv://Ira:Espo2016!@hyperion-dev-1234.kne6jxm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use('/api/login', loginRouter)
app.use('/', usersRouter)
app.use('/', appointmentsRouter)

const server = app.listen(3001, () => console.log('Server up and running...'));

module.exports = server;