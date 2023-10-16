/** @type {import('jest').Config} */
const config = {
  transform: {
    "\\.ts$": "ts-jest"
  },
  testEnvironment: "node",
  testRegex: "/tests/.+\\.test\\.ts$",
  moduleFileExtensions: [
    "ts", "js",
  ],
};

module.exports = config;
