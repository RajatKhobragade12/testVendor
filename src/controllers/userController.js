const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "candidate",
    password: "NoTeDeSt^C10.6?SxwY882}",
    host: "nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",
    Port: 3306,
    multipleStatements: true
})
connection.connect((err) => {
    if (err) {
        console.log('Internal server error', err.message)

    } else {
        console.log('DB connected successfully')
    }
})


async function getVendorUsersDetails(req, res) {
    try {
        const { prId, custOrgId } = req.query;
        if (!prId || !custOrgId) {
            return res.status(400).send({ message: "Missing fields" })
        }
        const selectDb = 'use conqtvms_dev'
        connection.query(selectDb, (error) => {
            if (error) {
                return res.status(400).send({ message: "Error in fetch data", error: error.message })
            }
        })
        const data = `select suppliers, UserName,Name from PrLineItems INNER JOIN VendorUsers where custOrgId=${custOrgId} and prLineItemId=${prId}`
        if (data) {
            const getData = connection.query(data, (error, result) => {
                if (error) {
                    return res.status(400).send({ message: "Error in fetch data", error: error.message })
                } else {
                    res.status(200).send({ message: "Data fetched successfully", data: result })


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