
 SET @orderQuantity = ___orderQuantity;
 SET @orderFuelType = ___orderFuelType;
 SET @orderPStype   = ___orderPStype;
 SET @clientLogin   = '___clientLogin';


INSERT INTO orders (orderClientID, orderName, orderDate, orderQuontity, orderFuelType, orderPatrolStationType )
  SELECT
    (
      SELECT clientID FROM clients
      WHERE upper(clientLogin) = upper(@clientLogin)
      LIMIT 1
    )
    , 'newOrder'
    , now()
    , @orderQuantity
    , @orderFuelType
    , @orderPStype
;

