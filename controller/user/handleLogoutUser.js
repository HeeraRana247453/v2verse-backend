const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");



const handleLogoutUser = catchAsyncErrors(async (req, res, next) => {
    try {
        res.clearCookie("token", {
            path: "/",  // Ensure the cookie is cleared from all paths
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure flag only in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-origin logout fix
        });

        res.status(200).json({
            success: true,
            message: "Log out successful!"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

module.exports = handleLogoutUser;