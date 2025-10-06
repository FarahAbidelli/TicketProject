//const express = require("express")
//const router = express.Router();
//const {ajouterTicket }= require("./fonctionnalittestTicket")

//router.post("/ajouterTicket", (req, res) => {
//    res.json({result: ajouterTicket()})
//})
//module.exports = router;

const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();
const { ajouterTicket, lireTickets, modifierStatut, supprimerTicket } = require("./fonctionnalittestTicket");

// Ajouter un ticket
router.post("/ajouterTicket", (req, res) => {
    const ticket = ajouterTicket(req.body);
    res.status(201).json(ticket);
});

// Lister tous les tickets
//router.get("/tickets", (req, res) => {
  //  res.json(lireTickets());
//});
router.get("/tickets", (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../db.json")));
    res.json(data.tickets);
});


// Modifier statut
router.put("/tickets/:id", (req, res) => {
    const ticket = modifierStatut(req.params.id, req.body.statut);
    if (ticket) res.json(ticket);
    else res.status(404).json({ message: "Ticket non trouvé" });
});

// Supprimer ticket
router.delete("/DeleteTickets/:id", (req, res) => {
    if (supprimerTicket(req.params.id)) res.json({ message: "Ticket supprimé" });
    else res.status(404).json({ message: "Ticket non trouvé" });
});

// Modifier statut
router.put("/tickets/:id", (req, res) => {
    const ticket = modifierStatut(req.params.id, req.body.statut);
    if (ticket) res.json(ticket);
    else res.status(404).json({ message: "Ticket non trouvé" });
});

module.exports = router;
