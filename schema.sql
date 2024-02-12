-- to make sweeping changes
DROP TABLE IF EXISTS Ticket_DB.Payments;
DROP TABLE IF EXISTS Ticket_DB.Charges;
DROP TABLE IF EXISTS Ticket_DB.Comments;
DROP TABLE IF EXISTS Ticket_DB.Parts;
DROP TABLE IF EXISTS Ticket_DB.Invoices;
DROP TABLE IF EXISTS Ticket_DB.Tickets;
DROP TABLE IF EXISTS Ticket_DB.Users;

-- tables
CREATE TABLE Ticket_DB.Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50),
    Password VARCHAR(255),
    Email VARCHAR(100),
    Role ENUM('admin', 'staff', 'client') NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Ticket_DB.Tickets (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100),
    Description TEXT,
    Status ENUM('open', 'closed', 'pending') NOT NULL,
    Priority ENUM('low', 'medium', 'high') NOT NULL,
    DevicePassword VARCHAR(100),
    UserID INT, 
    AssignedTo INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
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
INSERT INTO Ticket_DB.Users (Username, Password, Email, Role) VALUES
('admin', 'password1', 'admin@example.com', 'admin'),
('staff1', 'password2', 'staff1@example.com', 'staff'),
('client1', 'password3', 'client1@example.com', 'client');

INSERT INTO Ticket_DB.Tickets (Title, Description, Status, Priority, DevicePassword, UserID, AssignedTo) VALUES
('Broken Screen', 'The screen is cracked and unresponsive.', 'open', 'high', '1234', 3, 2),
('Software Issue', 'The device is infected with a virus.', 'pending', 'medium', '0000', 3, 2);

INSERT INTO Ticket_DB.Invoices (TicketID, TotalCost, IssueDate, DueDate, Paid) VALUES
(1, 120.00, '2023-02-01', '2023-02-15', FALSE),
(2, 80.00, '2023-02-03', '2023-02-17', FALSE);

INSERT INTO Ticket_DB.Parts (TicketID, PartName, CostPrice, SalePrice, Quantity) VALUES
(1, 'Screen', 50.00, 70.00, 1),
(2, 'Antivirus Software', 20.00, 40.00, 1);

INSERT INTO Ticket_DB.Comments (TicketID, UserID, Comment) VALUES
(1, 2, 'Screen ordered and waiting for delivery.'),
(2, 2, 'Started virus removal process.');

INSERT INTO Ticket_DB.Charges (TicketID, Type, Description, Amount) VALUES
(1, 'part', 'Screen replacement', 70.00),
(1, 'labor', 'Screen installation', 50.00),
(2, 'part', 'Antivirus Software', 40.00),
(2, 'labor', 'Virus removal', 40.00);

INSERT INTO Ticket_DB.Payments (InvoiceID, Amount, PaymentDate, PaymentMethod, Note) VALUES
(1, 60.00, '2023-02-05', 'Credit Card', 'First installment'),
(2, 80.00, '2023-02-04', 'Cash', 'Full payment');

-- List all data from all tables
SELECT * FROM Ticket_DB.Users;
SELECT * FROM Ticket_DB.Tickets;
SELECT * FROM Ticket_DB.Invoices;
SELECT * FROM Ticket_DB.Parts;
SELECT * FROM Ticket_DB.Comments;
SELECT * FROM Ticket_DB.Charges;
SELECT * FROM Ticket_DB.Payments;





