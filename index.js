var http = require("http");
//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");

const { getAllEmployees, getEmployeeById, addEmployee } = require('./Employee');  


//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 3000;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    
    res.setHeader('Content-Type', 'application/json');  

    if (req.method !== 'GET') {
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));  
        } else if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html'); 
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        }

        else if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            const employees = getAllEmployees();
            res.end(JSON.stringify(employees));
        }

        else if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            const employeeNames = getAllEmployees()
                .map(emp => `${emp.firstName} ${emp.lastName}`) 
                .sort(); 
            res.end(JSON.stringify(employeeNames));
        }

        else if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            const totalSalary = getAllEmployees().reduce((total, emp) => total + emp.Salary, 0); 
            res.end(JSON.stringify({ "total_salary": totalSalary }));
        } else {
            res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
         }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});