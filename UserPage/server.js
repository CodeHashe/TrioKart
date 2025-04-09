import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 3001;
dotenv.config();
app.use(express.json());
app.use(cookieParser());

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

async function printDatabase(){
    await connectToDatabase();
    const query = "select * from Products";
    const result = await sql.query(query);
    console.log("Data from Database: ");
    console.table(result.recordset);
}

printDatabase();

app.use(cors());


app.post("/user/signup",async(req,res) =>{

try{
    await connectToDatabase();

    console.log(req.body);


    const {username, email, password} = req.body;
    let ID;
    
    const request = new sql.Request();
    request.input('Username',username);
    request.input('Email',email);
    request.input('Password',password);
    request.output('UserID',sql.Int);

    const result = await request.execute('AddUser');

    ID = result.output.UserID; 
    console.log("Data Received from Procedure: " + ID);
    res.json({ID});
}

catch(error){
    console.log(error);
}



});

app.post("/user/signin",async(req,res)=>{

try{
    await connectToDatabase();
    console.log(req.body); // (Optional: Check request body)

    const {email, password} = req.body;

    const request = new sql.Request();
    let flag;

    request.input('userEmail',sql.VarChar,email);
    request.input('userPass',sql.VarChar,password);
    request.output('isExists',sql.int);

    const result = await request.execute('SignIn');

    console.log("Procedure Returned: " + result.output.isExists);

    if(result.output.isExists > 0){
        flag = 1;
        res.json({flag});
    }

    else{
        flag = 0;
        res.json({flag});
    }
}

catch(error){
    console.log(error);
}
});



app.post("/user/signup/check", async(req, res) =>{
    try{
      await connectToDatabase();
      console.log(req.body); // (Optional: Check request body)
  
      const {username, email, password} = req.body;
      let flag; 
      
      const request = new sql.Request();
      request.input('in_username',username);
      request.input('in_email',email);
      request.input('in_password',password);
      request.output('out_user_exists',sql.Int);
      
      const result = await request.execute('check_user_exists');
  
      // Ensure the stored procedure outputs a value for out_user_exists
      if (result.output.out_user_exists !== undefined) {
        flag = result.output.out_user_exists; 
      } else {
        // Handle the case where the stored procedure doesn't return a value
        console.error("Stored procedure didn't return a value for out_user_exists");
        // You might send an error message to the frontend here
        res.status(500).json({ error: "Internal server error" });
        return; // Exit the function if no flag value is available
      }
      console.log("Data Received from Procedure: " + flag);
      res.json({ flag }); // Send the flag property within a JSON object
    } 
    catch(error){
      console.log(error);
    }
  });


  app.post("/CheckCart",async(req,res)=>{
    try{
        const { userID } = req.body;

        const request = new sql.Request();
        request.input('CartUserID',userID);

        const result = await request.execute('CartView');

        res.json(result.recordset);
    }


    catch(error){

        console.log(error);


    }
  });


  app.post("/AddToCart",async(req,res) =>{

    try{
        await connectToDatabase();
        console.log(req.body); // (Optional: Check request body)
    
        const {productName,userID} = req.body;
        
        const request = new sql.Request();
        request.input('ProductName', productName);
        request.output('ProductID', sql.Int);

        const result = await request.execute('GetProductID');

        const productID = result.output.ProductID; // Access output parameter
        console.log("ProductID Received:", productID);


        console.log('User ID:', userID);
        const Quantity = 1;
        const query = `Insert Into Cart(UserID,ProductID,Quantity) values (${userID},${productID},${Quantity})`;
        const finalResult = sql.query(query);
      } 
      catch(error){
        console.log(error);
      }
  });
  
app.get("/electronics/smartphones",async (req,res) => {
    await connectToDatabase();
     const query = "Select * from ElectronicsSmartPhones";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })
 
 app.get("/electronics/laptops",async (req,res) => {
     await connectToDatabase();
      const query = "Select * from ElectronicsLaptop";
      const result = await sql.query(query);
      res.json(result.recordset);
      console.log(result.recordset);
  })
 
 
  app.get("/electronics/homeappliances",async (req,res) => {
     await connectToDatabase();
      const query = "Select * from ElectronicsHomeAppliance";
      const result = await sql.query(query);
      res.json(result.recordset);
      console.log(result.recordset);
  })
 app.get("/grocery/sauce",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Grocery' AND Category='Sauce'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })
 
 app.get("/grocery/oil",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Grocery' AND Category='Oil'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/grocery/drinks",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Grocery' AND Category='Drinks'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/grocery/snacks",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Grocery' AND Category='Snacks'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/carparts/doorhandles",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Door Handles'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/carparts/headlight",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Head Lights'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })
 
 app.get("/carparts/interior",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Interior'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/carparts/rearcamera",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Rear Camera'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/carparts/securitysensors",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Security Sensors'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })

 app.get("/carparts/tyres",async (req,res) => {
    await connectToDatabase();
     const query = "select * from Products where Type='Car Parts' AND Category='Tyres'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);
 })
 
 
 
 app.listen(port,()=>{
     console.log("Listening on port " + port);
 });