import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import cors from "cors";
const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true // For Azure SQL Database, encryption is required
    }
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to Azure SQL Database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

// Call the function to connect to the database

async function printDatabase(){
    await connectToDatabase();
    const query = 'Select * from Products';
    const result = await sql.query(query);
    console.log("Data from Database: ");
    console.table(result.recordset);
}

printDatabase();

app.use(cors());

app.get("/electronics/SmartPhones",async (req,res) => {
   await connectToDatabase();
    const query = "Select * from Products where Type = 'Electronics' AND Category = 'Smart Phone'";
    const result = await sql.query(query);
    res.json(result.recordset);
    console.log(result.recordset);
})

app.get("/electronics/Laptops",async (req,res) => {
    await connectToDatabase();
     const query = "Select * from Products where Type = 'Electronics' AND Category = 'Laptop'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })


 app.get("/electronics/HomeAppliances",async (req,res) => {
    await connectToDatabase();
     const query = "Select * from Products where Type = 'Electronics' AND Category = 'Home Appliance'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/accounts",async (req,res) => {
    await connectToDatabase();
     const query = "Select * from Products where Type = 'Electronics' AND Category = 'Home Appliance'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.post("/signup", async (req, res) => {
    try {
        await connectToDatabase(); 

        // Prepare the request to call the stored procedure
        const request = new sql.Request(); 
        request.input('username', sql.VarChar, req.body.username);
        request.input('email', sql.VarChar, req.body.email);
        request.input('password', sql.VarChar, req.body.password);

        // Execute the stored procedure
        const result = await request.execute('sp_InsertUser'); 

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Signup failed. Please try again.' }); 
    }
});

app.post("/login", async (req, res) => {
    try {
        await connectToDatabase(); 

        // Prepare the request to call the stored procedure
        const request = new sql.Request(); 
        request.input('in_username', sql.VarChar, req.username);
        request.input('in_email', sql.VarChar, req.email);
        request.input('in_password', sql.VarChar, req.password);
        request.output('out_user_exists',sql.Bit);
        // Execute the stored procedure
        const result = await request.execute('check_user_exists'); 
        const userExists = result.output['@out_user_exists'];
        res.json({userExists: userExists});
        console.log(result.returnValue);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Login failed. Please try again.' }); 
    }
});

app.listen(port,()=>{
    console.log("Listening on port " + port);
});