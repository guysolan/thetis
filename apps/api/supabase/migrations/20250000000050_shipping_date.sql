ALTER TABLE item_changes
    ADD COLUMN shipment_dates tstzrange DEFAULT tstzrange(now(), now());

