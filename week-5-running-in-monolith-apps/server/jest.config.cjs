module.exports = {
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["./test/init.js"],
  globals: {
    connection: true,
  },
  testPathIgnorePatterns: ["<rootDir>/src/boot/environments/test.js"],
  testTimeout: 5000,
  moduleFileExtensions: ["js", "json", "mjs", "node"],
  transform: {
    "^.+\\.c?[t|j]sx?$": "babel-jest",
  },
}
