const express = require("express");
const router = express.Router();

const {
  saveEarlyAccessLeads,
  contactForm,
  requestFeature,
} = require("../controllers/leads");

// -----------------------------------
// parent route path: /auth
// -----------------------------------

router.post("/early-access", saveEarlyAccessLeads);
router.post("/contact-form", contactForm);
router.post("/request-feature", requestFeature);

module.exports = router;
