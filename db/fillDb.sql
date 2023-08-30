-- this query adds dummy data to the database

USE phonebook;

INSERT INTO partners (first_name, last_name, phone_number)
VALUES
  ('John', 'Doe', '0711122333'),
  ('Jane', 'Smith', '0722233444'),
  ('Alex', 'Johnson', '0733344555'),
  ('Maria', 'Garcia', '0744455666'),
  ('Andrei', 'Popescu', '0755566777');

