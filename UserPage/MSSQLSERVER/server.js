const sql=require("mssql/msnodesqlv8");
var config={
    user: "triokartadmin",
    password: "admin#12",
    server:"triokart.database.windows.net",
    database: "TrioKart",
    driver: "msnodesqlv8",
    options:{
        trustedConnection:true
    }
}

sql.connect(config,function(err){
    if(err)console.log(err);
    var request=new sql.Request();
    request.query("insert into Products (ProductID,Name,Type,Category,Quantity,Price,ImageLink) values (3,'Honda Civic LED HeadLights 2016-2021','Car Parts','Head Lights',5,90000,'hfhgfhgfhf')",function(err,records){
        if(err)console.log(err);
        else console.log(records);
    })
})

