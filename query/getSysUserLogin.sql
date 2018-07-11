SET @suserLogin    = '___suserLogin';
SET @userPassword  = '___userPassword';

SELECT
  *
FROM sysUsers
WHERE upper(sUserLogin) = upper(@suserLogin)
    AND sUserPasswordHash = @userPassword

