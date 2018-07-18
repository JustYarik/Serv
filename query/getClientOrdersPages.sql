SET @ListNumber = ___PN;
SET @rn = 0;
SET @clientLogin ='___clientLogin';

SELECT
  *
FROM (
          SELECT
            ( @rn := @rn + 1 ) AS RN
            , o.orderID
            , o.orderQuontity
            , o.orderFuelType
            , o.orderPatrolStationType
            , o.orderDate
          FROM orders AS o
          WHERE orderClientID = (
                                    SELECT
                                      clientID
                                    FROM clients
                                    WHERE upper ( clientLogin ) = upper (@clientLogin)
                                )
          ORDER BY orderID DESC
     ) AS RawTable
WHERE RawTable.RN BETWEEN @ListNumber*10 AND (@ListNumber+1)*10;