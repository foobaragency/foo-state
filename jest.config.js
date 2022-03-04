module.exports = {
  resetMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json-summary", "lcov"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^foo-state(.*)$": "<rootDir>/lib/esm$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["jest-localstorage-mock"],
}
