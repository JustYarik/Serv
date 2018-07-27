
SET @clientLogin ='___clientLogin';

SELECT
      o.orderID
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
LIMIT 1
;

SELECT
  upper(su.sUserLogin) sUserLogin
FROM sysUsers AS su
JOIN clients  AS c
  ON su.sUserID = c.systUserResponsibleForClient
    AND upper(c.clientLogin) = upper(@clientLogin)