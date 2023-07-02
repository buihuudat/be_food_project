const validation = require("../../handlers/validation");
const userController = require("../../controllers/user");
const router = require("express").Router();
const { body } = require("express-validator");

// get all users
router.get("/getAll", validation, userController.getAll);

// update user
router.put(
  "/update",
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu yêu cầu tối thiểu 8 ký tự"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Xác minh mật khẩu yêu cầu tối thiểu 8 ký tự"),
  validation,
  userController.update
);

// update avatar user
router.put("/update-avatar", validation, userController.updateAvatar);

// delete user
router.post("/delete", validation, userController.delete);

// user feedback
router.post("/feedback", validation, userController.feedback);

// user feedback update
router.put("/feedback/update", validation, userController.updateFeedback);

// get all feedback
router.get("/get_feedback", validation, userController.getAllFeedback);

// create notification
router.post(
  "/notification/create",
  validation,
  userController.createNotification
);

//get user
router.get("/:id", validation, userController.get);

module.exports = router;
