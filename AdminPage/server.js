import express from "express";
import dotenv from "dotenv";
import sql from "mssql";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 3002;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true 
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


app.use(cors());

connectToDatabase();

app.get("/Title/index.html",async(req,res)=>{
    try{
    }

    catch(error){
    }
});

app.post("/admin/signin", async (req, res) => {
    try {
      console.log("Request received:", req.body);
      console.log("Frontend Data:", req.body.email, req.body.password); 
  
      await connectToDatabase(); 
  
      const request = new sql.Request(); 
      request.input('Email', sql.VarChar, req.body.email);
      request.input('Password', sql.VarChar, req.body.password);
  
      console.log("Email and Password sent to SP:", req.body.email, req.body.password); 
  
      const result = await request.execute('CheckAdminCredentials'); 
      console.log("Full Result Set:", result.recordset);
      // Assuming 'result' from the stored procedure indicates success or failure
      if (result.recordset[0].AdminID > 0) { // Or adjust the property name based on your SP's output
        const adminID = result.recordset[0].AdminID; // Assuming recordset exists if successful
        console.log("Retrieved AdminID:", adminID); 
        
        res.json({message:'Success!'});
  
      } else { 
        res.status(401).json({ message: 'Invalid email or password.' }); 
      }
  
    } catch (error) {
      console.error('Login Error:', error); 
      res.status(500).json({ message: 'Login failed. Please try again.' }); 
    }
  });

  app.get("/Products/CarParts",async(req,res)=>{
    try{
      await connectToDatabase();
      const query = "Select ProductID,Name,Price,Quantity from Products where Type = 'Car Parts'";
     const result = await sql.query(query);
     res.json(result.recordset);
     console.log(result.recordset);



    }

    catch(error){
    }
});
  
app.get("/Products/Electronics",async(req,res)=>{
  try{
    await connectToDatabase();
    const query = "Select ProductID,Name,Price,Quantity from Products where Type = 'Electronics'";
   const result = await sql.query(query);
   res.json(result.recordset);
   console.log(result.recordset);



  }

  catch(error){
  }
});

app.get("/Products/Grocery",async(req,res)=>{
  try{
    await connectToDatabase();
    const query = "Select ProductID,Name,Price,Quantity from Products where Type = 'Grocery'";
   const result = await sql.query(query);
   res.json(result.recordset);
   console.log(result.recordset);



  }

  catch(error){
  }
});


app.post('/Products/Add',async(req,res)=>{
  try{
    await connectToDatabase();
    const { name, price, quantity, imageLink, category, type } = req.body;
    const request = new sql.Request(); 

    console.log('Data Received from Front-End: ' + category);
      request.input('productName', sql.VarChar, name);
      request.input('productType', sql.VarChar, type);
      request.input('productCategory',sql.VarChar,category);
      request.input('productQuantity',sql.VarChar,quantity);
      request.input('productPrice',sql.Decimal,price);
      request.input('imageLink',sql.VarChar,imageLink);
      const result = await request.execute('InsertProduct');
      console.log("Full Result Set:", result.recordset);
  }

  catch(error){
    console.log("Error: " + error);
  }
});

app.post('/Products/Check',async(req,res) =>{
  try{
    console.log(req);
    console.log(req.body);
    await connectToDatabase();
    const {productID} = req.body;
    let output; 

        console.log("Data Received from Front-End: " + productID);

        const request = new sql.Request(); 
        request.input('ProductID', sql.Int, productID);
        request.output('ProductExists', sql.Bit);

        const result = await request.execute('CheckProductExists');

        // Retrieve output value
        output = result.output.ProductExists; 

        console.log("Data Received from Procedure: " + output);
        res.json(output); 
  }

  catch(error){
    console.log("Error: " + error);
  }


});

app.post('/Products/Update',async(req,res) => {
  try{
    await connectToDatabase();
    const productID = req.body.ID;
    const updateType = req.body.Type;
    const Value = req.body.Value;
    console.log(req.body);
    console.log(productID);
    console.log(updateType);
    console.log(Value);
    const request = new sql.Request(); 

      request.input('ProductID', sql.Int, productID);
      request.input('updateType',sql.NVarChar,updateType);
      if(typeof(Value) == "string"){
        request.input('value',sql.NVarChar,Value);
      }

      else{
        request.input('newValue',sql.Int,Value);
      }
      
      const result = await request.execute('UpdateProduct');
      console.log(result);
  }

  catch(error){
    console.log("Error: " + error);
  }


});

app.post('/Products/Delete',async(req,res) => {
  try{
    await connectToDatabase();
    const productID = req.body.ID;
    console.log(req.body);
    console.log(productID);
    const request = new sql.Request(); 

      request.input('ProductID', sql.Int, productID);
      const result = await request.execute('DeleteProduct');
      console.log(result);
  }

  catch(error){
    console.log("Error: " + error);
  }


});

app.get('/Products/Orders',async(req,res) => {
try{
  await connectToDatabase();
  const query = "Select * from Orders";
  const result = await sql.query(query);
  res.json(result.recordset);
  console.log(result.recordset)
}

catch(error){
  console.log(error);
}
});

app.get('/Products/AddAdmins',async(req,res) => {
  try{
    await connectToDatabase();
    const query = "Select AdminID,Email from Admins";
    const result = await sql.query(query);
    res.json(result.recordset);
    console.log(result.recordset)
  }
  
  catch(error){
    console.log(error);
  }
  });

app.post('/AddAdmins',async(req,res) => {

try{

  await connectToDatabase();
  const adminEmail = req.body.email;
  const adminPass = req.body.password;
  const request = new sql.Request(); 

      request.input('Email', sql.VarChar, adminEmail);
      request.input('Password', sql.VarChar, adminPass);
      const result = await request.execute('InsertAdmins');
      console.log(result);
}


catch(error){
  console.log(error);
}

});


app.post('/DeleteAdmins',async(req,res) => {

  try{
  
    await connectToDatabase();
    const adminID = req.body.ID;
    const request = new sql.Request(); 
  
        request.input('AdminID', sql.INT, adminID);
        const result = await request.execute('DeleteAdmins');
        console.log(result);
  }
  
  
  catch(error){
    console.log(error);
  }
  
  });

app.listen(port,()=>{
    console.log("Listening on port " + port);
});

