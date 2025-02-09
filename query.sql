PRAGMA foreign_keys = ON;

-- ##########################################
-- USER CRUD Operations
-- ##########################################

-- name: CreateUser :one
INSERT INTO user (
    id, password, email, role, firstname, middlename, lastname, age, contactnumber, fbname
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
RETURNING id, password, email, role, firstname, middlename, lastname, age, contactnumber, fbname;

-- name: GetUser :one
SELECT id, password, email, role, firstname, middlename, lastname, age, contactnumber, fbname
FROM user
WHERE id = ?;

-- name: ListUsers :many
SELECT id, password, email, role, firstname, middlename, lastname, age, contactnumber, fbname
FROM user;

-- name: UpdateUser :one
UPDATE user
SET 
    password = ?,
    email = ?,
    role = ?,
    firstname = ?,
    middlename = ?,
    lastname = ?,
    age = ?,
    contactnumber = ?,
    fbname = ?
WHERE id = ?
RETURNING id, password, email, role, firstname, middlename, lastname, age, contactnumber, fbname;

-- name: DeleteUser :exec
DELETE FROM user
WHERE id = ?;


-- ##########################################
-- ROOMS CRUD Operations
-- ##########################################

-- name: CreateRoom :one
INSERT INTO rooms (
    id, unitname, floornumber, bldgnumber, price, capacity, rented_by
)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING id, unitname, floornumber, bldgnumber, price, capacity, rented_by;

-- name: GetRoom :one
SELECT id, unitname, floornumber, bldgnumber, price, capacity, rented_by
FROM rooms
WHERE id = ?;

-- name: ListRooms :many
SELECT id, unitname, floornumber, bldgnumber, price, capacity, rented_by
FROM rooms;

-- name: UpdateRoom :one
UPDATE rooms
SET 
    unitname = ?,
    floornumber = ?,
    bldgnumber = ?,
    price = ?,
    capacity = ?,
    rented_by = ?
WHERE id = ?
RETURNING id, unitname, floornumber, bldgnumber, price, capacity, rented_by;

-- name: DeleteRoom :exec
DELETE FROM rooms
WHERE id = ?;


-- ##########################################
-- SCHEDULES CRUD Operations
-- ##########################################

-- name: CreateSchedule :one
INSERT INTO schedules (
    id, room, purpose, maintenanceprice, scheduleddate, description, user
)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING id, room, purpose, maintenanceprice, scheduleddate, description, user;

-- name: GetSchedule :one
SELECT id, room, purpose, maintenanceprice, scheduleddate, description, user
FROM schedules
WHERE id = ?;

-- name: ListSchedules :many
SELECT id, room, purpose, maintenanceprice, scheduleddate, description, user
FROM schedules;

-- name: UpdateSchedule :one
UPDATE schedules
SET 
    room = ?,
    purpose = ?,
    maintenanceprice = ?,
    scheduleddate = ?,
    description = ?,
    user = ?
WHERE id = ?
RETURNING id, room, purpose, maintenanceprice, scheduleddate, description, user;

-- name: DeleteSchedule :exec
DELETE FROM schedules
WHERE id = ?;


-- ##########################################
-- BILLING CRUD Operations
-- ##########################################

-- name: CreateBilling :one
INSERT INTO billing (
    id, deadline, billinginfo, to_user
)
VALUES (?, ?, ?, ?)
RETURNING id, deadline, billinginfo, to_user;

-- name: GetBilling :one
SELECT id, deadline, billinginfo, to_user
FROM billing
WHERE id = ?;

-- name: ListBillings :many
SELECT id, deadline, billinginfo, to_user
FROM billing;

-- name: UpdateBilling :one
UPDATE billing
SET 
    deadline = ?,
    billinginfo = ?,
    to_user = ?
WHERE id = ?
RETURNING id, deadline, billinginfo, to_user;

-- name: DeleteBilling :exec
DELETE FROM billing
WHERE id = ?;


-- ##########################################
-- TRANSACTIONS CRUD Operations
-- ##########################################

-- name: CreateTransaction :one
INSERT INTO transactions (
    id, paymentmethod, room, tenant, description, amount
)
VALUES (?, ?, ?, ?, ?, ?)
RETURNING id, paymentmethod, room, tenant, description, amount;

-- name: GetTransaction :one
SELECT id, paymentmethod, room, tenant, description, amount
FROM transactions
WHERE id = ?;

-- name: ListTransactions :many
SELECT id, paymentmethod, room, tenant, description, amount
FROM transactions;

-- name: UpdateTransaction :one
UPDATE transactions
SET 
    paymentmethod = ?,
    room = ?,
    tenant = ?,
    description = ?,
    amount = ?
WHERE id = ?
RETURNING id, paymentmethod, room, tenant, description, amount;

-- name: DeleteTransaction :exec
DELETE FROM transactions
WHERE id = ?;


-- ##########################################
-- BILLING_INFO CRUD Operations
-- ##########################################

-- name: CreateBillingInfo :one
INSERT INTO billing_info (
    id, roominfo, utilities, billing_id
)
VALUES (?, ?, ?, ?)
RETURNING id, roominfo, utilities, billing_id;

-- name: GetBillingInfo :one
SELECT id, roominfo, utilities, billing_id
FROM billing_info
WHERE id = ?;

-- name: ListBillingInfos :many
SELECT id, roominfo, utilities, billing_id
FROM billing_info;

-- name: UpdateBillingInfo :one
UPDATE billing_info
SET 
    roominfo = ?,
    utilities = ?,
    billing_id = ?
WHERE id = ?
RETURNING id, roominfo, utilities, billing_id;

-- name: DeleteBillingInfo :exec
DELETE FROM billing_info
WHERE id = ?;


-- ##########################################
-- BILLING_INFO_UTILITIES CRUD Operations
-- ##########################################

-- name: CreateBillingInfoUtility :one
INSERT INTO billing_info_utilities (
    id, total, floor, "to", utilitytype, billing_info_id
)
VALUES (?, ?, ?, ?, ?, ?)
RETURNING id, total, floor, "to", utilitytype, billing_info_id;

-- name: GetBillingInfoUtility :one
SELECT id, total, floor, "to", utilitytype, billing_info_id
FROM billing_info_utilities
WHERE id = ?;

-- name: ListBillingInfoUtilities :many
SELECT id, total, floor, "to", utilitytype, billing_info_id
FROM billing_info_utilities;

-- name: UpdateBillingInfoUtility :one
UPDATE billing_info_utilities
SET 
    total = ?,
    floor = ?,
    "to" = ?,
    utilitytype = ?,
    billing_info_id = ?
WHERE id = ?
RETURNING id, total, floor, "to", utilitytype, billing_info_id;

-- name: DeleteBillingInfoUtility :exec
DELETE FROM billing_info_utilities
WHERE id = ?;
