import "@testing-libary/jest-dom";

module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/View/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
}