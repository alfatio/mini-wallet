
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE status_wallet AS ENUM ('enabled', 'disabled'); 
CREATE TYPE status_transaction AS ENUM ('success', 'fail'); 

CREATE TABLE wallet (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    owned_by uuid UNIQUE NOT NULL,
    status status_wallet DEFAULT 'disabled',
    enabled_at TIMESTAMP ,
    balance BIGINT DEFAULT 0,

    CONSTRAINT balance_nonnegative CHECK (balance >= 0)
);

CREATE TABLE deposit (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    deposited_by uuid NOT NULL,
    status status_transaction,
    deposited_at TIMESTAMP  DEFAULT NOW(),
    amount BIGINT,
    reference_id uuid UNIQUE NOT NULL ,

    CONSTRAINT amount_nonnegative CHECK (amount >= 0),
    CONSTRAINT fk_wallet
        FOREIGN KEY (deposited_by)
        REFERENCES wallet (id)
);

CREATE TABLE withdrawal (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    withdrawn_by uuid NOT NULL,
    status status_transaction,
    withdrawn_at TIMESTAMP DEFAULT NOW(),
    amount BIGINT,
    reference_id uuid UNIQUE NOT NULL,

    CONSTRAINT amount_nonnegative CHECK (amount >= 0),
    CONSTRAINT fk_wallet
        FOREIGN KEY (withdrawn_by)
        REFERENCES wallet (id)
);