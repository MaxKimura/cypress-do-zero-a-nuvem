const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8zvcwy",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  video: true,
  watchForFileChanges: false
});
