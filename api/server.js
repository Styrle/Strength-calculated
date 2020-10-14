require('./db-connection')();
const express = require('express');
const user = require('./routes/user');
const lift = require('./routes/lift');
const app = express();
//Setting up our database promises
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(`/users`, user);
app.use(`/lifts`, lift);
//Asking if our api is running
app.get('/', (req, res) => {
    res.send('API is working...');
});

//Stating what port it will run at and to listed for it
const port = 4000;
app.listen(port, console.log(`API running @ ${port}`));
