var PageComponent = require('ds.base/PageComponent');

var ServerStatsReactServer = PageComponent.create({

	'/': function(attributes, vars) {
		return new StatusResponse('good', {});
    },

    '/ajax/getStats': function(params) {
        var response = {
            memory: 0,
        };

        // Generate random number in range for fake memory reporting
        response.memory = this.getRandomInt(19,81);
		return new StatusResponse('good', response);
    },

    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

	type: 'ServerStatsReactServer'
});

module.exports = ServerStatsReactServer;