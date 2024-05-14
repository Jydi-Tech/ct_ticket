-- to make sweeping changes
DROP TABLE IF EXISTS Ticket_DB.Payments;
DROP TABLE IF EXISTS Ticket_DB.Customers;
DROP TABLE IF EXISTS Ticket_DB.Customer;
DROP TABLE IF EXISTS Ticket_DB.Charges;
DROP TABLE IF EXISTS Ticket_DB.Comments;
DROP TABLE IF EXISTS Ticket_DB.Parts;
DROP TABLE IF EXISTS Ticket_DB.Invoices;
DROP TABLE IF EXISTS Ticket_DB.Tickets;
DROP TABLE IF EXISTS Ticket_DB.Users;

CREATE TABLE Ticket_DB.Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    PhoneNumber VARCHAR(15),
    Address VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    ZipCode VARCHAR(10),
    Password VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Role ENUM('admin', 'staff') NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ticket_DB.Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(15),
    Address VARCHAR(100),
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
-- test data
INSERT INTO Ticket_DB.Users (FirstName, LastName, PhoneNumber, Address, City, State, ZipCode, Password, Email, Role)
VALUES ('John', 'Doe', '1234567890', '123 Main St', 'Anytown', 'Anystate', '12345', 'password', 'john.doe@example.com', 'admin');

INSERT INTO Ticket_DB.Customers (FirstName, LastName, PhoneNumber, Address, City, State, ZipCode, Email, referralSource)
VALUES ('Jane', 'Doe', '0987654321', '456 Elm St', 'Othertown', 'Otherstate', '67890', 'jane.doe@example.com', 'Internet');

INSERT INTO Ticket_DB.Tickets (Title, Description, Status, Priority, DevicePassword, CustomerID, AssignedTo)
VALUES ('Broken Screen', 'The screen is cracked.', 'open', 'high', 'devicepassword', 1, 1);

INSERT INTO Ticket_DB.Invoices (TicketID, TotalCost, IssueDate, DueDate, Paid)
VALUES (1, 200.00, '2022-01-01', '2022-01-31', FALSE);

INSERT INTO Ticket_DB.Parts (TicketID, PartName, CostPrice, SalePrice, Quantity)
VALUES (1, 'Screen Replacement', 50.00, 100.00, 1);

INSERT INTO Ticket_DB.Comments (TicketID, UserID, Comment)
VALUES (1, 1, 'The device has been received and work will begin shortly.');

INSERT INTO Ticket_DB.Charges (TicketID, Type, Description, Amount)
VALUES (1, 'labor', 'Screen replacement labor', 100.00);

INSERT INTO Ticket_DB.Payments (InvoiceID, Amount, PaymentDate, PaymentMethod, Note)
VALUES (1, 200.00, '2022-01-15', 'Credit Card', 'Paid in full.');

-- List all data from all tables
SELECT * FROM Ticket_DB.Users;
SELECT * FROM Ticket_DB.Customers;
SELECT * FROM Ticket_DB.Tickets;
SELECT * FROM Ticket_DB.Invoices;
SELECT * FROM Ticket_DB.Parts;
SELECT * FROM Ticket_DB.Comments;
SELECT * FROM Ticket_DB.Charges;
SELECT * FROM Ticket_DB.Payments;