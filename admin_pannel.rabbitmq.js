const RabbitMQ = require('./rabbitmq.helpers');
const CONST_AP_QUEUE = require('./admin_pannel_queue');

class AdminPannelRabbitMQ extends RabbitMQ {

    /**
	 * @constructor
	 * @param
	 */
    constructor() {
        super();
    }

    /**
	 * @param   
	 * @return  object
	 */
    async consumeWorkspaceSignup() {
        this.consume(CONST_AP_QUEUE.WORKSPACE_SIGNUP, function (data) {
            console.log(JSON.parse(data.content.toString())); 
        });
    }
}

module.exports = AdminPannelRabbitMQ;