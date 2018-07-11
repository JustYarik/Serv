SET @clientLogin    = '___clientLogin';
SET @clientPassword = '___clientPassword';

SELECT
   *
FROM clients
WHERE upper(clientLogin) = upper(@clientLogin)
  AND clientPasswordHash = @clientPassword

