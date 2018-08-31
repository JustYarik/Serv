
# SET @clientLogin = 'p_yarik@ukr.net';


SET @clientLogin = '___clientLogin' ;

SELECT
  upper(sU.sUserLogin) AS suLogin
FROM clients    AS cl
  JOIN sysUsers AS sU
    ON cl.systUserResponsibleForClient = sU.sUserID
WHERE upper(cl.clientLogin) = upper(@clientLogin)
LIMIT 1
