const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Shop = require("../../model/shop");
const Withdraw = require("../../model/withdraw");
const ErrorHandler = require("../../utils/ErrorHandler");
const sendMail = require("../../utils/sendMail");
const sendMailWithHTML = require("../../utils/sendMailWithHTML");
const adminEmail = process.env.ADMIN_EMAIL;


const handleWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount, withdrawMethod } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      // Send Email to the Admin
      try {
        await sendMailWithHTML({
          email: adminEmail,
          subject: `Withdraw Request from Seller: ${req.seller.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
              <div style="background-color:#4A90E2;color: white; text-align:center; padding: 15px; border-radius: 12px 12px 0 0; font-family: Arial, sans-serif;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="display: flex; align-items:center; justify-content:center; gap:10px;">
                  <!-- Using an Icon -->
                  <img src="https://cdn-icons-png.flaticon.com/512/1006/1006546.png" alt="Request Icon" style="width: 30px; height: 30px;"/>
                  <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Withdraw Request</h2>
                </div>
              </div>

              <div style="padding: 20px;">
                <p style="font-size: 16px; color: #333;">
                  <strong>Seller:</strong> ${req.seller.name}
                </p>
                <p style="font-size: 16px; color: #333;">
                  <strong>Amount:</strong> ₹${amount}
                </p>
                <h3 style="font-size: 18px; color: #007BFF; margin-top: 20px;">Withdraw Method Details:</h3>
                <ul style="font-size: 16px; color: #555; padding-left: 20px;">
                  <li><strong>Bank Name:</strong> ${withdrawMethod?.bankName || "N/A"}</li>
                  <li><strong>Bank Country:</strong> ${withdrawMethod?.bankCountry || "N/A"}</li>
                  <li><strong>Bank Swift Code:</strong> ${withdrawMethod?.bankSwiftCode || "N/A"}</li>
                  <li><strong>Bank Account No.:</strong> ${withdrawMethod?.bankAccountNumber || "N/A"}</li>
                  <li><strong>Account Holder Name:</strong> ${withdrawMethod?.bankHolderName || "N/A"}</li>
                  <li><strong>Bank Address:</strong> ${withdrawMethod?.bankAddress || "N/A"}</li>
                </ul>
              </div>
            </div>
          `,
        });
      } 
      catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }


      // Send Email to the Seller
      try {
        await sendMailWithHTML({
          email: req.seller.email,
          subject: "Withdraw Request",
          // message: `Hello ${req.seller.name}, Your withdraw request of ₹${amount} is processing. It will take 3days to 7days to processing! `,
          html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background-color: #4A90E2; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px; font-weight: bold;">
                  <img src="${req.seller.avatar?.url}" alt="Seller Avatar" style="width: 40px; height: 40px; border-radius: 50%; vertical-align: middle; margin-right: 8px;"/>
                  Withdraw Request Processing
                </div>

                <!-- Body -->
                <div style="padding: 20px;">
                  <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Hello <strong>${req.seller.name}</strong>,
                  </p>
                  <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Your withdraw request of <strong style="color: #4A90E2;">₹${amount}</strong> is being processed. 
                    Please note that it may take <strong>3 to 7 days</strong> to complete the process.
                  </p>
                  <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Thank you for your patience and for being a valued seller on our platform. If you have any questions, please don't hesitate to contact us.
                  </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f1f1; color: #555; text-align: center; padding: 10px; border-radius: 0 0 8px 8px; font-size: 14px;">
                  <p style="margin: 0;">
                    <strong>Need Help?</strong> Contact our support team at 
                    <a href="mailto:rajputdev9759@gmail.com" style="color: #4A90E2; text-decoration: none;">v2verse@gmail.com</a>.
                  </p>
                </div>
              </div>
            `,
        });
      } 
      catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance = shop.availableBalance - amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } 
    catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  module.exports = handleWithdrawRequest;