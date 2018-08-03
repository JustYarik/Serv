// const io = require("socket.io")(server);
$(function () {
    // make connection
    var socket = io('http://localhost:3000');

    // buttons and inputs
    var message = $('#message');
    var susername = $('#susername');
    // var username = $('#username');

    var send_message = $('#send_message');
    // var send_username = $('#send_username');
    var chatroom = $('#chatroom');
    var SUorderTable = $('#SUorderTable tr:last');


    // emit message
    // send_message.click(function () {
    //     socket.emit('new_message', {message: 'hello'});
    // });

    // Listen on new_message
    socket.on("new_message", (data)=>{
        // console.log(data.length);
        clearTable((cb)=>{
            for (let j=0; j< data.message.clientLogin.length; j++ ) {
                SUorderTable.after(
                    // /*
                    "<tr id='row'>" +
                    "<td> <a href='/order'>"+ data.message.ordersID[j]                +"</a> </td>" +
                    "<td>"+ data.message.clientLogin[j]             +"</td>" +
                    "<td>"+ data.message.orderDate[j]               +"</td>" +
                    "<td>"+ data.message.orderorderQuontity[j]      +"</td>" +
                    "<td>"+ data.message.orderFuelType[j]           +"</td>" +
                    "<td>"+ data.message.orderPatrolStationType[j]  +"</td>" +
                    "<td>" +
                    "<button type='button' id='bntOrderOperationDelivered'  name='D" + data.message.ordersID[j]  + "' >delivered</button>" +
                    "&nbsp;&nbsp;&nbsp;"+
                    "<button type='button' id='bntOrderOperationEdit'       name='E" + data.message.ordersID[j]  + "' >edit</button>" +
                    "&nbsp;&nbsp;&nbsp;"+
                    "<button type='button'  id='bntOrderOperationCancel'    name='C" + data.message.ordersID[j]  + "' >cancel</button>" +
                    "</td>"+
                    "</tr>");

                // */
            }

            $(":button[name*='C']").click(function (e) {
                var clickedName = e.target.name;
                socket.emit('orderCancelBySystemUser', {orderID: clickedName.substr(1)} );

                console.log(clickedName);
            })

        });

    });

    // emit a username
    // send_username.click(function () {
    //     console.log(susername.val());
        socket.emit('susername', {username: susername.val()});
    // });

function clearTable(clearTableCB) {
    let j = document.getElementById("SUorderTable");
    // j.innerHTML = "";
    // for ( let rr  = 0; rr <j.rows.length-1; rr++ ){
    //     j.deleteRow(rr);
    //     console.log(rr);
    //
    // }
    clearTableCB(1);

}


    // setTimeout(()=>{
    //     var cancButt = ;
    //     console.log(cancButt[1].name);
    // }, 3000);






    // socket.on("deledeOrderBySystemUser", )
    // emit typing
    // message.bind('keypress', ()=>{
    //     socket.emit('typing')
    // });

});