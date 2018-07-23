$(function () {
    // make connection
    var socket = io.connect('http://localhost:3000');

    // buttons and inputs
    var message = $('#message');
    // var username = $('#username');
    var send_message = $('#send_message');
    // var send_username = $('#send_username');
    var chatroom = $('#chatroom');
    var SUorderTable = $('#SUorderTable');


    // emit message
    // send_message.click(function () {
    //     socket.emit('new_message', {message: message.val()})
    // });

    // Listen on new_message
    socket.on("new_message", (data)=>{
        console.log(data);
        // for (let j=0; j< data.clientLogin.length; j++ ) {
        //     SUorderTable.append(
        //         "<tr>" +
        //             "<td>"+ data.ordersID[j]                +"</td>" +
        //             "<td>"+ data.clientLogin[j]             +"</td>" +
        //             "<td>"+ data.orderDate[j]               +"</td>" +
        //             "<td>"+ data.orderorderQuontity[j]      +"</td>" +
        //             "<td>"+ data.orderFuelType[j]           +"</td>" +
        //             "<td>"+ data.orderPatrolStationType[j]  +"</td>" +
        //         "</tr>");



            // chatroom.append("<p class='message'>" + data.clientLogin[j] + ": " + data.ordersID[j] + "</p>")
            // chatroom.append("<p class='message'>" + data.clientLogin[j] +"</p>")
        // }
    });

    // emit a username
    // send_username.click(function () {
    //     console.log(username.val());
    //     socket.emit('change_username', {username: username.val()})
    // });

    // emit typing
    // message.bind('keypress', ()=>{
    //     socket.emit('typing')
    // });

});