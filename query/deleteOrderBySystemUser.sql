
SET @suserLogin   = '___systUserLogin';
SET @orderID = ___orderID;

DELETE FROM orders
WHERE orderID = @orderID
  AND orderResponsibleID = ( SELECT sUserID FROM sysUsers WHERE upper(sUserLogin) = upper(@suserLogin) )
