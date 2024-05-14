

#this file generates component files based on the database schema
#!/bin/bash
projectDir="/var/www/html/ct_ticket"
database="Ticket_DB"
cd projectDir  #change to the project directory
#array of table names
tables=("Charges" "Comments" "Invoices" "Parts" "Payments" "Tickets" "Customers" "Employees")
crud=("Create" "Read" "Update" "Delete")
cd projectDir
#loop through the tables    
for table in "${tables[@]}"
do
    #loop through the crud operations
    for operation in "${crud[@]}"
    do
        #generate the component file
        echo "Generating $operation component for $table"
        ng generate component $table-$operation --standalone
    done
done
