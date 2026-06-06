const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { inventoryType, bloodGroup, quantity } = req.body;
    const user = await userModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (!inventoryType || !bloodGroup || !quantity || Number(quantity) <= 0) {
      return res.status(400).send({
        success: false,
        message: "Please provide blood group, inventory type, and quantity",
      });
    }

    if (inventoryType === "in" && user.role !== "donar") {
      return res.status(403).send({
        success: false,
        message: "Only donors can add blood stock",
      });
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(403).send({
        success: false,
        message: "Only hospitals can consume blood stock",
      });
    }

    if (inventoryType === "out") {
      const requestedQuantityOfBlood = Number(quantity);
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            inventoryType: "in",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            inventoryType: "out",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      const availableQuanityOfBloodGroup = totalIn - totalOut;
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ml of ${bloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new inventoryModel({
      inventoryType,
      bloodGroup,
      quantity: Number(quantity),
      email: user.email,
      donar: req.body.donar,
      hospital: req.body.hospital,
    });
    await inventory.save();

    res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (err) {
    console.log("Error in creating inventory: ", err);
    return res.status(500).send({
      success: false,
      message: "Error in creating inventory",
      err,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const filters = {};

    if (user?.role === "donar") {
      filters.donar = req.body.userId;
    }

    if (user?.role === "hospital") {
      filters.hospital = req.body.userId;
    }

    const inventory = await inventoryModel
      .find(filters)
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all record successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all inventory",
      error,
    });
  }
};

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};


// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({})
      .populate("donar")
      .populate("hospital")
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};


const getDonarsController = async (req, res) => {
  try {
    const donorId = await inventoryModel.distinct("donar", {
      inventoryType: "in",
    });
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const hospitalId = await inventoryModel.distinct("hospital", {
      inventoryType: "out",
    });
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getHospital Api",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getHospitalController,
  getDonarsController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
