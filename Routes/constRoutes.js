const express = require("express");
const router = express.Router();

const {getContact,
    createContact, 
    updateContact,
    deleteContacts
}=require("../Controllers/contactController")

router.route("/").get(getContact)
router.route("/").post(createContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContacts)

  


module.exports = router;


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