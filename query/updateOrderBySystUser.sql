# SET @orderID = 322;
# SET @SULogin = 'justyarik@gmail.com';
# SET @newQantity = 333;
# SET @newFuelType = 1;
# SET @newPSTypeID = 1;


SET @SULogin      = '___SULogin';
SET @orderID      = ___orderID;
SET @newQantity   = ___newQantity;
SET @newFuelType  = ___newFuelType;

SET @newPSTypeName  = '___newPSTypeName';

UPDATE orders
  SET orderQuontity = @newQantity
  , orderPatrolStationType =
                              CASE @newPSTypeName
                                  WHEN 'WOG' THEN 1
                                  WHEN 'OKKO' THEN 2
                              END
  , orderFuelType = @newFuelType

WHERE orderResponsibleID = (
                                SELECT sU.sUserID
                                FROM sysUsers AS sU
                                WHERE upper(sU.sUserLogin) = upper(@SULogin)
                                LIMIT 1
                           )
      AND orderID = @orderID

