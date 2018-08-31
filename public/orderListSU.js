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
    // var SUorderTable = $('#SUorderTable tbody');


    // emit message
    // send_message.click(function () {
    //     socket.emit('new_message', {message: 'hello'});
    // });

    // Listen on new_message
    socket.on("new_message", (data)=>{
        console.log('data.message.length ', data.message.clientLogin.length);
        console.log(data);
        if( data.message.ordersID.length === 1)    {
            console.log('L=1');
            for (let jj=0; jj< data.message.clientLogin.length; jj++ ) {
                $("#SUorderTable tr:first").after(
                    "<tr id='row'>" +
                    // "<td> <a href='/order'>"+ data.message.ordersID[jj]                +"</a> </td>" +
                    "<td> " +
                        "<a href='/order?"
                            + "OrderID="   + data.message.ordersID[jj]
                            + "&SULogin="  + $('#susername').val()
                            + "&Quantity=" + data.message.orderorderQuontity[jj]
                            + "&FuelType=" + data.message.orderFuelType[jj]
                            + "&PSType="   + data.message.orderPatrolStationType[jj]
                            + "'  target=\'_blank\'>" + data.message.ordersID[jj]
                        + "</a> " +
                    "</td>" +
                    // "<td>"+ data.message.orderStatusID[jj]           +"</td>" +
                    "<td>"+ data.message.clientLogin[jj]             +"</td>" +
                    "<td>"+ data.message.orderDate[jj]               +"</td>" +
                    "<td>"+ data.message.orderorderQuontity[jj]      +"</td>" +
                    "<td>"+ data.message.orderFuelType[jj]           +"</td>" +
                    "<td>"+ data.message.orderPatrolStationType[jj]  +"</td>" +
                    "<td>" +
                    "<button type='button' id='bntOrderOperationDelivered'  name='D" + data.message.ordersID[jj]  + "' >delivered</button>" +
                    "&nbsp;&nbsp;&nbsp;"+
                    // "<button type='button' id='bntOrderOperationEdit'       name='E" + data.message.ordersID[jj]  + "' >edit</button>" +
                    // "&nbsp;&nbsp;&nbsp;"+
                    "<button type='button'  id='bntOrderOperationCancel'    name='C" + data.message.ordersID[jj]  + "' >cancel</button>" +
                    "</td>"+
                    "</tr>"
                   );
            }
        }
        else {
            if (data) {
                let txt = "<tbody>"
                    + "<tr bgcolor='#ceccd0'>\n" +
                    "                <th>Order ID</th>\n" +
                    // "                <th>order Status</th>\n" +
                    "                <th>Client Login</th>\n" +
                    "                <th>Order date</th>\n" +
                    "                <th>Quantity</th>\n" +
                    "                <th>Fuel type</th>\n" +
                    "                <th>PS type</th>\n" +
                    "                <th>Options</th>\n" +
                    " </tr>";
                for (let j = 0; j < data.message.clientLogin.length; j++) {

                    txt = txt +
                        "<tr id='row"+ data.message.ordersID[j]  +"' " +
                                "bgcolor='" + DeliveredColorSelector(data.message.orderStatusID[j]) +"'>" +
                            "<td> " +
                                "<a href='/order?"
                                      + "OrderID="   + data.message.ordersID[j]
                                      + "&SULogin="  + $('#susername').val()
                                      + "&Quantity=" + data.message.orderorderQuontity[j]
                                      + "&FuelType=" + data.message.orderFuelType[j]
                                      + "&PSType="   + data.message.orderPatrolStationType[j]
                                      + "'  target=\'_blank\'>" + data.message.ordersID[j]
                                + "</a> " +
                            "</td>" +
                            // "<td>"+ data.message.orderStatusID[j]           +"</td>" +
                            "<td>" + data.message.clientLogin[j] + "</td>" +
                            "<td>" + data.message.orderDate[j] + "</td>" +
                            "<td>" + data.message.orderorderQuontity[j] + "</td>" +
                            "<td>" + data.message.orderFuelType[j] + "</td>" +
                            "<td>" + data.message.orderPatrolStationType[j] + "</td>" +
                            "<td>" +
                            "<button type='button' id='bntOrderOperationDelivered'  name='D" + data.message.ordersID[j] + "' >delivered</button>" +
                            "&nbsp;&nbsp;&nbsp;" +
                            // "<button type='button' id='bntOrderOperationEdit'       name='E" + data.message.ordersID[j] + "' >edit</button>" +
                            // "&nbsp;&nbsp;&nbsp;" +
                            "<button type='button' id='bntOrderOperationCancel'     name='C" + data.message.ordersID[j] + "' >cancel</button>" +
                            "</td>" +
                        "</tr>";
                }
                if (txt != "") {
                    txt += "</tbody>";
                    $("#SUorderTable").html(txt);
                }
            }
        }

            $(":button[name*='C']").click(function (e) {
                var clickedName = e.target.name;
                socket.emit('orderCancelBySystemUser', {orderID: clickedName.substr(1)} );
                console.log(clickedName);
            });

            $(":button[name*='D']").click(function (e) {
                var clickedName = e.target.name;
                socket.emit('orderDelivered', {orderID: clickedName.substr(1)} );
                console.log(clickedName);

                // change color
                $("#row"+clickedName.substr(1)).css('background', '#bfd0c1');
            })

    });

    // emit a username
    // send_username.click(function () {
    //     console.log(susername.val());
        socket.emit('susername', {username: susername.val()});
    // });


    /** @return {string} */
    function DeliveredColorSelector(orderStatusID) {
        let BGColor ='';
        switch (orderStatusID) {
            case 10:
                BGColor = '#ebfced'; break;
            case 1:
                BGColor = '#ffffff'; break;
            // case 2:
            //     BGColor = '#ceccd0'; break;
        }
        return BGColor;
    }

}); // Global function