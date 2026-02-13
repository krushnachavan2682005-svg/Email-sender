let express=require("express");
require("dotenv").config();
let nodeemailer=require("nodemailer");
let cors=require("cors")

let app=express()
app.use(cors())
app.use(express.json())
const transporter=nodeemailer.createTransport({
   service:"gmail",
   auth:{
    user:process.env.EMAIL,
    pass:process.env.APP_PASSWORD
   }
})
app.post("/send", async (req,res)=>{
try {
     let email=req.body.email;
 let subject=req.body.subject;
 let message=req.body.message;
 let mailoption={
    from:process.env.EMAIL,
    to:email,
    subject:subject,
    text:message
 }
await transporter.sendMail(mailoption);
res.status(200).send("Email Sent Succesfully")
} catch (error) {
    res.status(404).send("Error")
}

 

})
app.listen(2000,()=>{
    console.log("Server is running on 2000 port");
    
})