const { Firestore } = require("scrumkits-firebase");
const { FsCollection } = require("../lib/firebase-keys");
const LeadsSchemas = require("../validators/leads");
const { FieldValue } = require("firebase-admin/firestore");

function brewErrorMsg(error) {
  return error.details[0].message;
}

async function saveEarlyAccessLeads(req, res, next) {
  try {
    const { error } = LeadsSchemas.earlyAccesSignupSchema.validate(req.body);

    if (error) return res.status(400).json({ error: brewErrorMsg(error) });

    const { email, name, jobType } = req.body;

    const docRef = Firestore.collection(FsCollection.EarlyAccessList).doc(
      email
    );
    await docRef.set({
      email,
      name,
      jobType,
      updatedAt: FieldValue.serverTimestamp(),
    });

    res.status(200).send("Registered for Early Access");
  } catch (error) {
    next(error);
  }
}

async function contactForm(req, res, next) {
  try {
    const { error } = LeadsSchemas.contactSchema.validate(req.body);

    if (error) return res.status(400).json({ error: brewErrorMsg(error) });

    const { email, name, jobType, message } = req.body;

    const docRef = await Firestore.collection(FsCollection.ContactForms).add({
      email,
      name,
      jobType,
      message,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.status(200).send("Contact form submitted successfully");
  } catch (error) {
    next(error);
  }
}

async function requestFeature(req, res, next) {
  try {
    const { error } = LeadsSchemas.requestFeature.validate(req.body);
    if (error) return res.status(400).json({ error: brewErrorMsg(error) });

    const { email, name, jobType, message } = req.body;
    const docRef = await Firestore.collection(FsCollection.FeatureRequest).add({
      email,
      name,
      jobType,
      message,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.json({ data: "Contact form submitted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  saveEarlyAccessLeads,
  contactForm,
  requestFeature,
};
