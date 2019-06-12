// Users Table
use <tablename>;
CREATE TABLE [IF NOT EXISGTS] users (
   id                   BIGINT NOT NULL,
   encrypted_email      VARCHAR()
   encrypted_password   VARCHAR  
   user_role            INT size??,
   account_state        
   account_type     
   last_name
   first_name
   country_name
   calling_code
   phone_number
   email_verf_code
   phone_verf_code
   pwd_forgot_code
   account_create_date
   account_expire_date
   account_balance
   account_limit
   PRIMARY KEY (id)
) engine = InnoDB;
