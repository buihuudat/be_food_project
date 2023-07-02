const router = require("express").Router();
const voucherController = require("../../controllers/voucher");
const { validate } = require("../../models/voucherModel");
const { body } = require("express-validator");
const Voucher = require("../../models/voucherModel");

// create voucher
router.post("/create", validate, voucherController.create);

// update voucher
router.put("/update", validate, voucherController.update);

// delete voucher
router.post("/delete", validate, voucherController.delete);

// get all voucher
router.get("/getAll", validate, voucherController.getAll);

// get voucher
router.get("/:voucher", validate, voucherController.get);

module.exports = router;
