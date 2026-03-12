// fix-permissions.js
const { execSync } = require("child_process");

try {
  console.log("Fixing node_modules/.bin permissions for Linux...");
  execSync("chmod -R 755 node_modules/.bin", { stdio: "inherit" });
  console.log("Permissions fixed!");
} catch (err) {
  console.error("Failed to fix permissions:", err);
  process.exit(1);
}