const database = require('../3_SystemKernel/Database')
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.jwt_key


// login 
exports.sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body
    const response = {
      mobile: mobile,
      dataCreated: new Date()
    }
    if (mobile.length == 10) {
      response.otpSent = "true"

      res.status(200).json(response)


    } else {
      response.error = "Wrong phone number :("
      response.newuser = "true"
      res.status(400).json(response)
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

exports.verifyOTP = async (req, res) => {
  try {
    const { mobile, code } = req.body;
    if (!mobile || !code) {
      res.status(400).json({
        error: "OTP required",
        mobile,
        code
      })
    }
    else if (code != 112233) {
      res.status(400).json({
        error: "Incorrect Code",
        mobile,
        code
      });
    } else {
      userdata = await database.user.findOne({ mobile: mobile })
      //if user exist ....
      if (userdata) {
        if (userdata.name) {

          const id = userdata._id
          const mobile = userdata.mobile
          const token = jwt.sign({
            mobile: mobile,
            userId: id
          },
            JWT_KEY,
            {
              expiresIn: "30d"
            })

          res.status(200).json({
            registered: "true",
            userId: id,
            token: token,
            otpVerified: "true",
            login: "true"

          })

        } else {

          const id = userdata._id
          const mobile = userdata.mobile
          const token = jwt.sign({
            mobile: mobile,
            userId: id
          },
            JWT_KEY,
            {
              expiresIn: "30d"
            })

          res.status(200).json({
            registered: "false",
            userId: id,
            token: token,
            otpVerified: "true",
            login: "true"

          })
        }
      }
      //if user do not exist
      else {
        //creating new user (Initial data entry to db.)
        // create default profile pic and cover pics default
        newUser = await database.user.create({
          mobile: mobile,
        })

        // // Initialise content schema for new user
        // newsfeed = await db.content.initialiseUser(newUser._id)
        // Initialise status schema
        // status = await db.status.initialiseUser(newUser._id)

        const id = newUser._id
        const token = jwt.sign({
          mobile: mobile,
          userId: id
        },
          JWT_KEY,
          {
            expiresIn: "30d"
          })
        res.status(200).json({
          login: "true",
          userId: id,
          token: token,
          otpVerified: "true",
          registered: "false"
        })
      }

    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.registerNewUser = async (req, res) => {

  try {
    const { name, gender, mobile } = req.body;
    userdata = await database.user.findOne({ mobile: mobile })
    if (!userdata.name) {
      updatedUser = await database.user.findOneAndUpdate({ _id:req.userData.userId }, { name: name, gender: gender }, { 'new': true });
      res.status(200).json({
        login: "true",
        registered: "true",
        userData: updatedUser
      })
    }else{
      res.status(500).json({"error":"user already exists"})
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};