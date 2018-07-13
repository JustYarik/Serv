# SET @clientName         = 'newOne'        ;
# SET @clientLogin        = 'asdf@ukr.net'       ;
# SET @clientPasswordHash = '356a192b7913b04c54574d18c28d46e6395428ab';
# SET @clientWasCreated   = 0;

SET @clientName         = '___clientName'        ;
SET @clientLogin        = '___clientLogin'       ;
SET @clientPasswordHash = '___clientPasswordHash';
SET @clientWasCreated   = 0;

SET @clientWasCreated = (
                          SELECT createClient( @clientName, @clientLogin, @clientPasswordHash)
                        );
SELECT @clientWasCreated AS clientWasCreated
;



