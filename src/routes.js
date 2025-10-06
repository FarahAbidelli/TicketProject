const express = require("express")

const router = express.Router();
const {ajouterTicket }= require("./fonctionnalittestTicket")

router.post("/ajouterTicket", (req, res) => {
    res.json({result: ajouterTicket()})
})
module.exports = router;