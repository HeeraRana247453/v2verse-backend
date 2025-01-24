const ErrorHandler = require("../../utils/ErrorHandler");
const sendMail = require("../../utils/sendMail");
const { createActivationToken } = require("../../utils/createActivationToken");
const User = require("../../model/user");
const { uploadFile } = require("../../utils/upload");


const handleCreateUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;
        const userEmail = await User.findOne({ email });
    
        if (userEmail) 
          return next(new ErrorHandler("User already exists", 400));
    
        const folderName = "avatars";//folderName at cloudinary
        const myCloud = await uploadFile(avatar, folderName);

        // Create the user object
        const user = {
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        };

        const activationToken = createActivationToken(user);
        const activationUrl = `${process.env.FRONTEND_SERVER}/activation/${activationToken}`;

        try{
            await sendMail({
                email: user.email,
                subject: "Account Activation",
                message: `Hello ${user.name},Please click on this link to activate your account: ${activationUrl}`,
            });

            res.status(201).json({
                success:true,
                message:`please check your email:- ${user.email} to activate your account!`
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message,500));
        }
    } 
    catch (error) {
        return next(new ErrorHandler(error.message, 400)); // Pass errors to the global error handler
    }
}

module.exports = {handleCreateUser};