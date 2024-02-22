const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModels")


const getCommuteTime = asyncHandler(async (req, res) => {
  const contact=await Contact.find();
  res.status(200).json(contact)
});

const setTravellingFlag = asyncHandler(async (req, res) => {
 
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatoy");
  }
  console.log("Added COntact are", req.body);
  const contact=await Contact.create({
    name,
    email,
    phone,
  })

  res.status(201).json(contact);
});
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const updatedContacts = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json(updatedContacts);
});

const deleteContacts = asyncHandler(async(req, res) => {
  const contactss=await Contact.findById(req.params.id)
  if(!contactss){
    res.status(404)
    throw new Error("Contact not found")
  }
  await Contact.remove()
  res.status(201).json(contactss);
});   

module.exports = { getContact, createContact, updateContact, deleteContacts };
/*
schema{
    ID
    Number
    CommuteTime
    TravellingFlag (default false)
}

/getCommuteTime
/setTravellingFlag
/getEmployeeNumber
*/