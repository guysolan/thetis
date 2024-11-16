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

