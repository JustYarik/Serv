SELECT

    orderID
  , orderQuontity
  , orderFuelType
  , orderPatrolStationType
  , orderDate
FROM (
          SELECT
            ( @rn := @rn + 1 ) AS RN,
             o.orderID,
             o.orderQuontity,
             o.orderFuelType,
             o.orderPatrolStationType,
             o.orderDate
          FROM orders AS o
          WHERE orderClientID = (
                                    SELECT
                                      clientID
                                    FROM clients
                                    WHERE upper ( clientLogin ) = upper ('p_yarik@ukr.net')
                                )
          ORDER BY orderID DESC
     ) AS RawTable
WHERE RawTable.RN BETWEEN 0*10 AND (0+1)*10
