// Check for a .env file specific to this environment, otherwise attempt to load the default
const fs = require("fs");

const current_env = process.env.NODE_ENV || "development";
const current_env_file = ".env." + current_env.toLowerCase();
const env_file = fs.existsSync(current_env_file) ? current_env_file : ".env";

require("dotenv").load({
  path: __dirname + "/" + env_file
});
