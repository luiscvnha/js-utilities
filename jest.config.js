/** @type {import("jest").Config} */
const config = {
  transform: {
    "\\.ts$": "ts-jest",
  },
  testRegex: "/tests/.+\\.test\\.ts$",
  moduleFileExtensions: ["ts", "js"],
};

module.exports = config;
