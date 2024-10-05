const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const PayUKey = process.env.PAY_KEY;
const PayuSalt = process.env.PAY_SALT;


const key = 'qRhovz'
const txnid = '123456'; 
const amount = '1000';
const productinfo = 'product_name'; 
const firstname = 'John'; 
const email = 'john@example.com'; 
const salt = '7C0ksxLARbSbBsIaZVqohPHcYkBWtEAf';

function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
  const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(input).digest('hex');
}

router.post("/gethash", async (req, res) => {
  try {
    const { name, email, phonenumber, amount, transactionId, productinfo } = req.body;
    console.log("this is PayUKey",PayUKey)
    console.log("this is payukey",PayuSalt)
    console.log(transactionId)
    
    const hash = generateHash(PayUKey,transactionId,amount,productinfo,name,email,PayuSalt) 
console.log(hash)
    return res.status(200).json({
      hash,
      transactionId
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
