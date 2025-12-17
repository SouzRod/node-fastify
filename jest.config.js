module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.spec.ts"],

  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/application/useCase/*.ts",
    "!src/application/useCase/index.ts",
  ],
};
