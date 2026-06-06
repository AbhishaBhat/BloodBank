const express = require("express");
const authMiddelware = require("../middleware/authMiddleware.js");
const {
  getDonarsListController,
  getHospitalListController,
  deleteUserController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware.js");

//router object
const router = express.Router();

//Routes

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonarsListController
);
//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
// DELETE USER
router.delete(
  "/delete-user/:id",
  authMiddelware,
  adminMiddleware,
  deleteUserController
);

//EXPORT
module.exports = router;
