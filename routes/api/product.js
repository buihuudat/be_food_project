const validation = require("../../handlers/validation");
const productController = require("../../controllers/product");

const router = require("express").Router();

// create
router.post("/create", validation, productController.create);

// update
router.put("/update", validation, productController.update);

// delete
router.post("/delete", validation, productController.delete);

// get
router.get("/get", productController.get);

router.get("/getAll", productController.getAll);

module.exports = router;
