"use strict";

const express = require("express");
const router = express.Router();

router.use("/congresista", require("./congresista"));

module.exports = router;
