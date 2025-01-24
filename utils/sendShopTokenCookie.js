// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {

    const token = user.getJwtToken();
  
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",// Use 'None' for production, 'Lax' for development
      secure: process.env.NODE_ENV === "production",
    };
  
    res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      user,
      token,
    });

    return true;
  };
  
  module.exports = sendShopToken;