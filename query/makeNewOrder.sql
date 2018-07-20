
 SET @orderQuantity = ___orderQuantity;
 SET @orderFuelType = ___orderFuelType;
 SET @orderPStype   = ___orderPStype;
 SET @clientLogin   = '___clientLogin';


INSERT INTO orders (
                        orderClientID
                      , orderName
                      , orderDate
                      , orderQuontity
                      , orderFuelType
                      , orderPatrolStationType
                      , orderResponsibleID
                      , orderStatus
                   )
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
    , (
        SELECT
          c.systUserResponsibleForClient
        FROM clients AS c
        WHERE clientLogin = @clientLogin
      )
    , 1 #new
;

