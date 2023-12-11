const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


require('@applitools/eyes-cypress')(module);
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       require('@applitools/eyes-cypress')(module);
//     },
    
//       baseUrl: "http://localhost:3000",
//       viewportWidth: 1280,
//       viewportHeight: 720,
//       env: {
//         APPLITOOLS_API_KEY: "l8F7Fza104Td1RDnJLq4JjtzFfPJH19mJs4R2gxtw8O108Y110"
//       },
//   },
// });
