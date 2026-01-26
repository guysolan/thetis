-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create users table
CREATE TABLE users(
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create company_users table
CREATE TABLE company_users(
    company_id bigint REFERENCES companies(id) ON DELETE CASCADE,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE,
    is_admin boolean DEFAULT FALSE,
    PRIMARY KEY (company_id, user_id)
);

-- Create default_company table
CREATE TABLE default_company(
    user_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_id bigint NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id)
);

-- Create updated_at trigger for users table
CREATE TRIGGER set_timestamp_users
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();

-- Create trigger function to sync auth.users with users table
CREATE OR REPLACE FUNCTION sync_auth_users()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = public
    AS $$
BEGIN
    INSERT INTO users(uuid)
        VALUES(NEW.id);
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE sync_auth_users();

-- Add user_id to companies table
ALTER TABLE companies
    ADD COLUMN user_id bigint REFERENCES users(id) ON DELETE SET NULL;

-- Add unique constraint to company_users for user_id
ALTER TABLE company_users
    ADD CONSTRAINT company_users_user_id_key UNIQUE (user_id);

-- Create function to change user's company
CREATE OR REPLACE FUNCTION change_user_company(in_user_id bigint, in_new_company_id bigint)
    RETURNS void
    SECURITY DEFINER
    SET search_path = public
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Update or insert into company_users
    INSERT INTO company_users(company_id, user_id)
        VALUES(in_new_company_id, in_user_id)
    ON CONFLICT(user_id)
        DO UPDATE SET
            company_id = EXCLUDED.company_id;
    -- Update or insert into default_company
    INSERT INTO default_company(user_id, company_id)
        VALUES(in_user_id, in_new_company_id)
    ON CONFLICT(user_id)
        DO UPDATE SET
            company_id = EXCLUDED.company_id;
END;
$$;

