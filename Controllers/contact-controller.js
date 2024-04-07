const Contact = require("../models/contectSchema");

const createContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      res.status(404).json({ msg: "fill contact properly" });
    }
    const newContact = await Contact.create({
      username,
      email,
      message,
    });
    res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find()
        if(contacts.length === 0){
            return res.status(404).json({msg:"no data found"})
        }
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

module.exports = { createContact,getAllContacts };
