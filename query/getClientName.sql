SET @clientLogin ='___clientLogin';

SELECT
  clientName
FROM clients
WHERE upper ( clientLogin ) = upper (@clientLogin)

