const amqp = require('amqplib');

const URL = 'amqp://localhost';

class RabbitMQ {

    connection = null;
    channel = null;

    /**
     * @constructor
     * @param
     */
    constructor() { }

    /**
     * @param
     * @return  Promise
     */
    async connect() {
        try {
            this.connection = await amqp.connect(URL);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async disconnect() {
        try {
            if (this.channel) await this.channel.close();
            if (this.connection) await this.connection.close();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async createChannel() {
        try {
            const channel = await this.connection.createChannel();
            this.channel = channel;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param
     * @return  Promise
     */
    async init() {
        try {
            await this.connect();
            await this.createChannel();
            if (!this.connection || !this.channel) throw Error('Init rabbitmq failed');
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param   queueName string
     * @param   data string   
     * @return  Promise
     */
    async sendToQueue(queueName, data) {
        try {
            if (!this.channel || !queueName) throw Error('Send to queue failed');
            if (typeof data !== 'string') data = JSON.stringify(data);
            await this.channel.assertQueue(queueName);
            await this.channel.sendToQueue(queueName, Buffer.from(data));
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param   queueName string
     * @param   fn   
     * @return  Promise
     */
    async consume(queueName, fn) {
        try {
            if (!queueName || !this.channel) throw Error('Channel consume queue failed');
            await this.channel.assertQueue(queueName);
            await this.channel.consume(queueName, (data) => {
                fn(data)
            }, {
                noAck: true
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RabbitMQ;