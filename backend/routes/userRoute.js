const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUser,
  deleteUser,
  updateUser,
  getSingleUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// get all user
router.route("/admin/user").get(getAllUser);

// single User
router
  .route("/admin/user/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
