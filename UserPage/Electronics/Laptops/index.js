import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import cors from "cors";
const app = express();
const port = 3001;
dotenv.config();

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

app.get("/electronics",async (req,res) => {
   await connectToDatabase();
    const query = "Select * from Products where Type = 'Electronics' AND Category = 'Smart Phone'";
    const result = await sql.query(query);
    res.json(result.recordset);
    console.log(result.recordset);
})


app.listen(port,()=>{
    console.log("Listening on port " + port);
});