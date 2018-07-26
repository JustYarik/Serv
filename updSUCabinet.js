let io = require('socket.io-client');


    let socket = io.connect('http://localhost:3000', {reconnect: true});

    // Add a connect listener
    socket.on('connect', function (socket) {
        console.log('Connected!');

    });
exports.updateCabinet = function (ordersList) {
    socket.emit('new_message', {message: ordersList});
};