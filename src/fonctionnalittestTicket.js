const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");


function lireTickets() {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data).tickets;
}

// statut par défaut ouvert
function ajouterTicket(ticket) {
    const data = JSON.parse(fs.readFileSync(dbPath));
    ticket.id = Date.now();
    ticket.statut = "ouvert"; 
    data.tickets.push(ticket);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return ticket;
}

function modifierStatut(id, statut) {
    const data = JSON.parse(fs.readFileSync(dbPath));
    const ticket = data.tickets.find(t => t.id == id);
    if (ticket) {
        ticket.statut = statut;
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        return ticket;
    }
    return null;
}
let ticketIdToDelete = null;
function supprimerTicket(id) {
    const data = JSON.parse(fs.readFileSync(dbPath));
    const index = data.tickets.findIndex(t => t.id == id);
    if (index !== -1) {
        data.tickets.splice(index, 1);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        return true;
    }
    return false;
}

module.exports = { ajouterTicket, lireTickets, modifierStatut, supprimerTicket };
