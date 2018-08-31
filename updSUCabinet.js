let io = require('socket.io-client');


    let socket = io.connect('http://localhost:3000', {reconnect: true});

    // Add a connect listener
    socket.on('connect', function (socket) {
        console.log('F: updSUCabinet --> system user cabinet sender Connected!');

    });
exports.updateCabinet = function (ordersList) {
    console.log('F: updSUCAbinet --> function updateCabinet');
    // console.log(ordersList);
    socket.emit('new_message', {message: ordersList});
    
};