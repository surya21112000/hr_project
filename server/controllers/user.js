
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const jwt = require('jsonwebtoken')


 const signin = async (req, res)=> {
    const { email, password } = req.body //Coming from formData

    try {
        const existingUser = await User.findOne({ email })
        
        
        

        if(!existingUser) return res.status(401).json({ message: "User doesn't exist" })

        const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})

        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "xyz", { expiresIn: "1h" })
        
        
        res.status(200).json({ id: existingUser._id, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
    }
}



const signup = async (req, res) => {
    const { email, password, name,role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = new User({ email, password: hashedPassword, name,role });
  
      await result.save();
  
   
  
      res.status(200).json({ message:"User Successfully Registered" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
    module.exports={signin,signup}