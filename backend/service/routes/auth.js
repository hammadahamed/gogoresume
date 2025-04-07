const express = require("express");
const router = express.Router();

const { anonymousAuthorize, bootstrap } = require("../controllers/auth");

// -----------------------------------
// parent route path: /auth
// -----------------------------------

router.post("/anonymous", anonymousAuthorize);
router.get("/bootstrap", bootstrap);

module.exports = router;
