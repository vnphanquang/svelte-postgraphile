create or replace function common.set_updated_at() returns trigger as
$$
begin
    new.updated_at := current_timestamp;
    return new;
end;
$$ language plpgsql;
