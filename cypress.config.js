//const { defineConfig } = require("cypress");

//module.exports = defineConfig({
//  e2e: {
//    baseUrl: "http://localhost:3002", // <-- port de ton serveur
//    supportFile: false,
//    specPattern: "cypress/e2e/**/*.cy.js", // chemin de tes tests
//  }
//});   

const { defineConfig } = require("cypress");
const { exec } = require("child_process");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3002",
    setupNodeEvents(on, config) {
      // Lancer le serveur avant les tests
      exec("node server.js", (err, stdout, stderr) => {
        if (err) {
          console.error(`Erreur au lancement du serveur: ${err}`);
          return;
        }
        console.log(stdout);
        console.error(stderr);
      });
      return config;
    }
  }
});
