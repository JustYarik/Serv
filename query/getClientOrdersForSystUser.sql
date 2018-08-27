SET @systUserLogin   = '___systUserLogin';
# SET @systUserLogin   = 'justyarik@gmail.com';

SELECT
    c.clientLogin
  , o.orderID
  , o.orderQuontity
  , o.orderFuelType
  , o.orderPatrolStationType
  , o.orderDate
  , o.orderStatusID

FROM orders   AS o
JOIN sysUsers AS s
    ON o.orderResponsibleID = s.sUserID
      AND upper(s.sUserLogin) = upper(@systUserLogin)

JOIN clients c ON o.orderClientID = c.clientID
ORDER BY o.orderStatusID ASC, o.orderID DESC
