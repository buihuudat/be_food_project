const { validate } = require("../../models/user_order");
const router = require("express").Router();
const orderController = require("../../controllers/order");

router.post("/create", validate, orderController.create);

router.put("/update/:id", validate, orderController.update);

router.get("/getAll", validate, orderController.getAll);

router.get("/:id", validate, orderController.get);

module.exports = router;
