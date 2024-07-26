const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "candidate",
    password:"NoTeDeSt^C10.6?SxwY882}",
    host: "nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",
    Port : 3306,
    multipleStatements:true



})
connection.connect((err)=>{
if(err){
    console.log('Internal server error',err.message)

}else{
    console.log('DB connected successfully')
}
})


async function getVendorUsersDetails(req, res) {
    try {
        let { prId, custOrgId } = req.query;
        console.log(prId)
        if(!prId || !custOrgId){
            return res.status(400).send({message:"Missing fields"})
        }
            const selectDb = 'use conqtvms_dev'
            connection.query(selectDb,(err)=>{
                console.log(err)
            })
            // const data = `select * from PrLineItems INNER JOIN VendorUsers limit 10`
            // select * from PrLineItems 
            const data = `select * from PrLineItems where custOrgId=${custOrgId} and prLineItemId=${prId}`
            if(data){
                const getData =  connection.query(data,(error,res)=>{
                    if(error){
                        console.log(error.message,"error")
                        // return res.status(400).send({ message: "Error in fetch data",error:error.message})
                    }else{
                        console.log(res,"result")
                        // return  res.status(200).send({ message: "Data fetched successfully",data:getData})
                        
                    }
    
                })
    
            }     
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message })
    }

}

module.exports = {
    getVendorUsersDetails
};