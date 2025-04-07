const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbFilePath = path.join(__dirname, "userProfileData.json");

const db = {
  userProfileData: {},
};
// const { RedisClient } = require("scrumkits-redis");

// router.use("/auth", require("./auth"));
// router.use("/pointing", require("./pointing"));
// router.use("/retro", require("./retro"));
// router.use("/leads", require("./leads"));

// Load existing data from file if it exists
if (fs.existsSync(dbFilePath)) {
  const fileData = fs.readFileSync(dbFilePath, "utf-8");
  db.userProfileData = JSON.parse(fileData);
}

router.get("/health", (req, res, next) => {
  console.log("\n\n\n🚀 ~ db:", db);

  console.log("🚀 ~ router.get ~ req:", req.query);

  try {
    const data = parseInt(db.data ?? 0) + parseInt(req.query.data);
    res.json({
      status: "OK",
      data: { message: data },
    });
    db.data = data;
  } catch (error) {
    next(error);
  }
});

router.post("/user-profile", async (req, res) => {
  const userProfileData = req.body;
  db.userProfileData = userProfileData;
  console.log("🚀 ~ router.post ~ userProfileData:", userProfileData);

  // Save data to file
  fs.writeFileSync(dbFilePath, JSON.stringify(db.userProfileData, null, 2));

  res.json({ status: "success", message: "User profile data saved." });
});

router.get("/user-profile", async (req, res) => {
  res.json({ status: "success", data: db.userProfileData });
});

module.exports = router;
