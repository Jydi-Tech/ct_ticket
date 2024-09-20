-- to make sweeping changes
DROP TABLE IF EXISTS Ticket_DB.Payments;
DROP TABLE IF EXISTS Ticket_DB.Charges;
DROP TABLE IF EXISTS Ticket_DB.Comments;
DROP TABLE IF EXISTS Ticket_DB.Parts;
DROP TABLE IF EXISTS Ticket_DB.Invoices;
DROP TABLE IF EXISTS Ticket_DB.Tickets;
DROP TABLE IF EXISTS Ticket_DB.Users;
DROP TABLE IF EXISTS Ticket_DB.Customers;


CREATE TABLE Ticket_DB.Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    PhoneNumber VARCHAR(15),
    Address VARCHAR(100),
    Address2 VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    ZipCode VARCHAR(10),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255),
    Role ENUM('admin', 'staff') NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ticket_DB.Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(15),
    Address VARCHAR(100),
    Address2 VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    ZipCode VARCHAR(10),
    Email VARCHAR(100) UNIQUE,
    ReferralSource VARCHAR(100),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ticket_DB.Tickets (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100),
    Description TEXT,
    Status ENUM('open', 'closed', 'pending') NOT NULL,
    Priority ENUM('low', 'medium', 'high') NOT NULL,
    DevicePassword VARCHAR(100),
    CustomerID INT,
    AssignedTo INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (AssignedTo) REFERENCES Users(UserID)
);

CREATE TABLE Ticket_DB.Invoices (
    InvoiceID INT AUTO_INCREMENT PRIMARY KEY,
    TicketID INT,
    TotalCost DECIMAL(10, 2),
    IssueDate DATE,
    DueDate DATE,
    Paid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID)
);

CREATE TABLE Ticket_DB.Parts (
    PartID INT AUTO_INCREMENT PRIMARY KEY,
    TicketID INT,
    PartName VARCHAR(100),
    CostPrice DECIMAL(10, 2),
    SalePrice DECIMAL(10, 2),
    Quantity INT,
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID)
);

CREATE TABLE Ticket_DB.Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    TicketID INT,
    UserID INT,
    Comment TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Ticket_DB.Charges (
    ChargeID INT AUTO_INCREMENT PRIMARY KEY,
    TicketID INT,
    Type ENUM('labor', 'part', 'travel') NOT NULL,
    Description TEXT,
    Amount DECIMAL(10, 2),
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID)
);

CREATE TABLE Ticket_DB.Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    InvoiceID INT,
    Amount DECIMAL(10, 2),
    PaymentDate DATE,
    PaymentMethod VARCHAR(50),
    Note TEXT,
    FOREIGN KEY (InvoiceID) REFERENCES Invoices(InvoiceID)
);

-- Test data for Users
INSERT INTO Ticket_DB.Users (FirstName, LastName, PhoneNumber, Address, Address2, City, State, ZipCode, Password, Email, Role) VALUES
('John', 'Doe', '1234567890', '123 Main St', 'Apt 1', 'Anytown', 'Anystate', '12345', 'password', 'john.doe@example.com', 'admin'),
('Alice', 'Smith', '2345678901', '234 Oak St', '', 'Anytown', 'Anystate', '12345', 'password', 'alice.smith@example.com', 'staff'),
('Bob', 'Johnson', '3456789012', '345 Pine St', 'Apt 2', 'Othertown', 'Otherstate', '67890', 'password', 'bob.johnson@example.com', 'staff'),
('Carol', 'White', '4567890123', '456 Maple St', '', 'Othertown', 'Otherstate', '67890', 'password', 'carol.white@example.com', 'staff'),
('Eve', 'Black', '5678901234', '567 Cedar St', 'Suite 3', 'Elsewhere', 'Elsestate', '11223', 'password', 'eve.black@example.com', 'admin');

-- Test data for Customers
INSERT INTO Ticket_DB.Customers (FirstName, LastName, PhoneNumber, Address, Address2, City, State, ZipCode, Email, ReferralSource) VALUES
('Jane', 'Doe', '0987654321', '456 Elm St', '', 'Othertown', 'Otherstate', '67890', 'jane.doe@example.com', 'Internet'),
('Mike', 'Brown', '6789012345', '678 Birch St', 'Apt 4', 'Othertown', 'Otherstate', '67890', 'mike.brown@example.com', 'Referral'),
('Nancy', 'Green', '7890123456', '789 Spruce St', '', 'Anytown', 'Anystate', '12345', 'nancy.green@example.com', 'Website'),
('Oscar', 'Blue', '8901234567', '890 Fir St', 'Suite 5', 'Anytown', 'Anystate', '12345', 'oscar.blue@example.com', 'Friend'),
('Paul', 'Yellow', '9012345678', '901 Ash St', '', 'Elsewhere', 'Elsestate', '11223', 'paul.yellow@example.com', 'Radio Ad');

-- Test data for Tickets
INSERT INTO Ticket_DB.Tickets (Title, Description, Status, Priority, DevicePassword, CustomerID, AssignedTo) VALUES
('Broken Screen', 'The screen is cracked.', 'open', 'high', 'devicepassword', 1, 1),
('Battery Issue', 'The battery does not charge.', 'pending', 'medium', 'devicepassword', 2, 2),
('Software Update', 'The software needs updating.', 'closed', 'low', 'devicepassword', 3, 3),
('Overheating', 'The device overheats.', 'open', 'high', 'devicepassword', 4, 4),
('Keyboard Issue', 'Some keys are not working.', 'pending', 'medium', 'devicepassword', 5, 5);

-- Test data for Invoices
INSERT INTO Ticket_DB.Invoices (TicketID, TotalCost, IssueDate, DueDate, Paid) VALUES
(1, 200.00, '2022-01-01', '2022-01-31', FALSE),
(2, 150.00, '2022-02-01', '2022-02-28', TRUE),
(3, 50.00, '2022-03-01', '2022-03-31', TRUE),
(4, 250.00, '2022-04-01', '2022-04-30', FALSE),
(5, 100.00, '2022-05-01', '2022-05-31', TRUE);

-- Test data for Parts
INSERT INTO Ticket_DB.Parts (TicketID, PartName, CostPrice, SalePrice, Quantity) VALUES
(1, 'Screen Replacement', 50.00, 100.00, 1),
(2, 'Battery', 30.00, 60.00, 1),
(3, 'Software License', 10.00, 20.00, 1),
(4, 'Cooling Fan', 40.00, 80.00, 1),
(5, 'Keyboard', 20.00, 40.00, 1);

-- Test data for Comments
INSERT INTO Ticket_DB.Comments (TicketID, UserID, Comment) VALUES
(1, 1, 'The device has been received and work will begin shortly.'),
(2, 2, 'Battery issue identified and replacement ordered.'),
(3, 3, 'Software update completed successfully.'),
(4, 4, 'Overheating issue identified, replacing cooling fan.'),
(5, 5, 'Keyboard replacement ordered.');

-- Test data for Charges
INSERT INTO Ticket_DB.Charges (TicketID, Type, Description, Amount) VALUES
(1, 'labor', 'Screen replacement labor', 100.00),
(2, 'part', 'Battery replacement', 60.00),
(3, 'labor', 'Software update labor', 20.00),
(4, 'part', 'Cooling fan replacement', 80.00),
(5, 'labor', 'Keyboard replacement labor', 40.00);

-- Test data for Payments
INSERT INTO Ticket_DB.Payments (InvoiceID, Amount, PaymentDate, PaymentMethod, Note) VALUES
(1, 200.00, '2022-01-15', 'Credit Card', 'Paid in full.'),
(2, 150.00, '2022-02-15', 'Credit Card', 'Paid in full.'),
(3, 50.00, '2022-03-15', 'Credit Card', 'Paid in full.'),
(4, 250.00, '2022-04-15', 'Credit Card', 'Paid in full.'),
(5, 100.00, '2022-05-15', 'Credit Card', 'Paid in full.');

-- List all data from all tables
SELECT * FROM Ticket_DB.Users;
SELECT * FROM Ticket_DB.Customers;
SELECT * FROM Ticket_DB.Tickets;
SELECT * FROM Ticket_DB.Invoices;
SELECT * FROM Ticket_DB.Parts;
SELECT * FROM Ticket_DB.Comments;
SELECT * FROM Ticket_DB.Charges;
SELECT * FROM Ticket_DB.Payments;
