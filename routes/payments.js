const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require('dotenv').config();
const PayUKey = process.env.PAY_KEY; 
const PayuSalt = process.env.PAY_SALT; 

const payuBaseUrl ='https://secure.payu.in/_payment';



function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {

  const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(input).digest('hex');


}

router.post("/gethash", async (req, res) => {
  try {
    const { name, email, phonenumber, amount, txnid, productinfo } = req.body;
    
    console.log(req.body);
   
    
    const hash = generateHash(PayUKey,txnid,amount,productinfo,name,email,PayuSalt) 
  
// console.log(hash);
    return res.status(200).json({
      hash,
      txnid
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});



module.exports = router;
