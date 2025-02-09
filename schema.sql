PRAGMA foreign_keys = ON;

-- USER table
CREATE TABLE user (
  id            TEXT PRIMARY KEY, 
  password      TEXT CHECK(password IS NULL OR length(password) >= 8),
  email         TEXT NOT NULL UNIQUE,
  role          TEXT NOT NULL CHECK(role IN ('landlord', 'tenant', 'maintenance')),
  firstname     TEXT NOT NULL,
  middlename    TEXT,
  lastname      TEXT NOT NULL,
  age           INTEGER NOT NULL CHECK(age >= 18),
  contactnumber TEXT NOT NULL CHECK(length(contactnumber) <= 15),
  fbname        TEXT
);

-- ROOMS table
CREATE TABLE rooms (
  id          TEXT PRIMARY KEY,
  unitname    TEXT NOT NULL,
  floornumber INTEGER NOT NULL,
  bldgnumber  INTEGER NOT NULL,
  price       INTEGER NOT NULL CHECK(price >= 0),
  capacity    INTEGER NOT NULL CHECK(capacity >= 1),
  -- Relationship: user ||--o{ rooms ("rents")
  rented_by   TEXT,  -- if you wish to track which user rents the room
  FOREIGN KEY (rented_by) REFERENCES user(id)
);

-- SCHEDULES table
CREATE TABLE schedules (
  id               TEXT PRIMARY KEY,
  room             TEXT NOT NULL,  -- foreign key -> rooms(id)
  purpose          TEXT NOT NULL,
  maintenanceprice INTEGER NOT NULL CHECK(maintenanceprice >= 0),
  scheduleddate    TEXT NOT NULL,  -- stored as text in date format
  description      TEXT,
  user             TEXT NOT NULL,  -- foreign key -> user(id)
  FOREIGN KEY (room) REFERENCES rooms(id),
  FOREIGN KEY (user) REFERENCES user(id)
);

-- BILLING table
CREATE TABLE billing (
  id          TEXT PRIMARY KEY,
  deadline    TEXT NOT NULL,  -- date format
  billinginfo TEXT NOT NULL,
  to_user     TEXT NOT NULL,  -- foreign key -> user(id)
  FOREIGN KEY (to_user) REFERENCES user(id)
);

-- TRANSACTION table 
-- (Note: “transaction” is a SQL keyword so we put it in quotes;
--  you could also choose a different table name like "transactions")
CREATE TABLE "transactions" (
  id            TEXT PRIMARY KEY,
  paymentmethod TEXT NOT NULL,
  room          TEXT NOT NULL,  -- foreign key -> rooms(id)
  tenant        TEXT NOT NULL,  -- foreign key -> user(id)
  description   TEXT,
  amount        INTEGER NOT NULL CHECK(amount >= 0),
  FOREIGN KEY (room) REFERENCES rooms(id),
  FOREIGN KEY (tenant) REFERENCES user(id)
);

-- BILLING_INFO table
CREATE TABLE billing_info (
  id        TEXT PRIMARY KEY,
  roominfo  TEXT NOT NULL,  -- foreign key -> rooms(id)
  utilities TEXT NOT NULL,
  -- Relationship: billing ||--o{ billing_info ("contains")
  billing_id TEXT NOT NULL,  -- this column links billing_info to a billing record
  FOREIGN KEY (roominfo) REFERENCES rooms(id),
  FOREIGN KEY (billing_id) REFERENCES billing(id)
);

-- BILLING_INFO_UTILITIES table
CREATE TABLE billing_info_utilities (
  id              TEXT PRIMARY KEY,
  total           INTEGER NOT NULL CHECK(total >= 0),
  floor           TEXT NOT NULL,
  "to"            TEXT NOT NULL,  -- note: "to" is a reserved word, so we quote it
  utilitytype     TEXT NOT NULL,
  -- Relationship: billing_info ||--o{ billing_info_utilities ("includes")
  billing_info_id TEXT NOT NULL,
  FOREIGN KEY (billing_info_id) REFERENCES billing_info(id)
);
