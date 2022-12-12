const RabbitMQ = require('./rabbitmq.helpers');
const CONST_AP_QUEUE = require('./admin_pannel_queue');

class CubableRabbitMQ extends RabbitMQ {

    /**
	 * @constructor
	 * @param
	 */
    constructor() {
        super();
    }

    /**
	 * @param   any
	 * @return  Promise
	 */
    async sendToQueueWorkspaceSignup(data) {
        await this.sendToQueue(CONST_AP_QUEUE.WORKSPACE_SIGNUP, data);
    }
}

module.exports = CubableRabbitMQ;