
SET @systUserLogin   = '___systUserLogin';
SET @orderID = '___orderID';
SET @newOrderSattusID = ___newOrderStatus; #10 -- delivered

# SET @systUserLogin   = 'justyarik@gmail.com';
# SET @orderID = 315;
# SET @newOrderSattusID = 10; #10 -- delivered

UPDATE orders AS o
  SET o.orderStatusID = @newOrderSattusID
WHERE o.orderID = @orderID
  AND o.orderResponsibleID = (
                              SELECT sU.sUserID
                              FROM sysUsers AS sU
                              WHERE upper(sU.sUserLogin) = upper(@systUserLogin)
                              LIMIT 1
                             )

