const express = require('express');
const app = express();

const AdminPannelRabbitMQ = require('./admin_pannel.rabbitmq');
const adminPannelRabbitMQ = new AdminPannelRabbitMQ();

(async () => {
    await adminPannelRabbitMQ.init();
    await adminPannelRabbitMQ.consumeWorkspaceSignup();
})();


app.use('/', async(req, res) => {
    res.json('here');
})

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})