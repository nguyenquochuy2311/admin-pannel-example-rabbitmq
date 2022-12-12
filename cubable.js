const express = require('express');
const app = express();

const CubableRabbitMQ = require('./cubable.rabbitmq');
const cubableRabbitMQ = new CubableRabbitMQ();
(async () => {
    await cubableRabbitMQ.init();
})();

const CONST_AP_QUEUE = require('./admin_pannel_queue');

app.use('/signup', async(req, res) => {
    const data = {
        workspaceID: 'huyws',
        emailOwner: 'huy@gmail.com'
    }
    
    await cubableRabbitMQ.sendToQueue(CONST_AP_QUEUE.WORKSPACE_SIGNUP, data);

    res.json(data);
})

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})