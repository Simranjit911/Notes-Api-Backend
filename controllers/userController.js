
const usermodel = require("../models/userDetails")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"


//signup controller
const signup = async (req, res) => {
    //Existing user check
    //hashed password
    //User Creation
    //Token Generate
    const { name, email, password } = req.body
    try {
        let existinguser = await usermodel.findOne({ email: email })
        if (existinguser) {
            return res.status(400).send("User Already exists")
        }

        let hashedpassword = await bcrypt.hash(password, 10)
        const result = await usermodel.create({
            name: name,
            email: email,
            password: hashedpassword
        })
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)
        res.status(201).json({ user: result, token: token })



    } catch (error) {
        console.log("Error" + error)
        res.status(404).send("Something went wrong")
    }


}

//sign in controller
const signin = async (req, res) => {
    //existing user check
    //match passwords
    //generate token on basis of user email that v found
    const { email, password } = req.body;
    try {
        const existinguser = await usermodel.findOne({ email: email })
        if (!existinguser) {
            return res.status(404).send("User not found!")
        }
        const matchpassword = await bcrypt.compare(password, existinguser.password)
        if (!matchpassword) {
            return res.status(405).send("Password incorrect!")
        }

        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, SECRET_KEY)
        res.status(200).json({user:existinguser,token:token}).send("Logged in Succesfully")


    } catch (error) {

    }



}
module.exports = {
    signin, signup
}