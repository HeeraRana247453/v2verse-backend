const express = require("express");
const { handleCreateUser } = require("./createUser");
const handleActivationUser = require("./activationUser");
const handleLoginUser = require("./loginUser");
const { isAuthenticated, isAdmin } = require("../../middleware/auth");
const handleLoadUser = require("./loadUser");
const handleLogoutUser = require("./handleLogoutUser");
const handleUserInfo = require("./handleUserInfo");
const handleUpdateAvatar = require("./handleUpdateAvatar");
const handleUpdateUserAddresses = require("./handleUpdateUserAddresses");
const handleDeleteUserAddress = require("./handleDeleteUserAddress");
const handleUpdateUserPassword = require("./handleUpdateUserPassword");
const handleFindUserById = require("./handleFindUserById");
const handleGetAllUsersByAdmin = require("./handleGetAllUsersByAdmin");
const handleDeleteUserById = require("./handleDeleteUserById");


const router = express.Router();

// Create User
router.post("/create-user", handleCreateUser);

// Activate user
router.post("/activation", handleActivationUser); 

// Login user
router.post("/login-user", handleLoginUser);

// Load user
router.get("/getuser", isAuthenticated, handleLoadUser);

// Logout user
router.get("/logout", isAuthenticated, handleLogoutUser);

// update user info
router.put("/update-user-info",isAuthenticated, handleUserInfo);
  
// update user avatar
router.put("/update-avatar",isAuthenticated, handleUpdateAvatar);

// update user addresses
router.put("/update-user-addresses", isAuthenticated, handleUpdateUserAddresses);

// delete user address
router.delete("/delete-user-address/:id",isAuthenticated, handleDeleteUserAddress);

// update user password
router.put("/update-user-password",isAuthenticated,handleUpdateUserPassword);

// find user infoormation with the userId
router.get("/user-info/:id",handleFindUserById);

// all users --- for admin
router.get("/admin-all-users",isAuthenticated,isAdmin("Admin"),handleGetAllUsersByAdmin);

// delete users --- admin
router.delete("/delete-user/:id",isAuthenticated,isAdmin("Admin"),handleDeleteUserById);

module.exports = router;
