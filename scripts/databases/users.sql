use EMH_ConfigurationDatabase;
CREATE TABLE IF NOT EXISTS USERS (
   id                   BIGINT NOT NULL,
   encrypted_email      VARCHAR(320) NOT NULL,
   encrypted_password   VARBINARY(1000) NOT NULL,
   user_role            INT NOT NULL,
   account_state        ENUM('emailPending', 'smsPending', 'activated', 'inactive') DEFAULT 'inactive',
   account_type         ENUM('trial', 'paid'),
   last_name            VARCHAR(100),
   first_name           VARCHAR(100),
   country_name         VARCHAR(100),
   calling_code         VARCHAR(10),
   phone_number         VARCHAR(20),
   email_verf_code      VARCHAR(10),
   phone_verf_code      VARCHAR(10),
   pwd_forgot_code      VARCHAR(10),
   account_create_date  DATE,
   account_expire_date  DATE,
   account_balance      VARCHAR(20),
   account_limit        VARCHAR(20),
   PRIMARY KEY (id)
) engine = InnoDB;