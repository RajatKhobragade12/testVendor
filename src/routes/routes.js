const express = require('express');
const router = express.Router();
const {getVendorUsersDetails} = require("../controllers/userController")



router.get('/getVendorUsers',getVendorUsersDetails);

module.exports = router;