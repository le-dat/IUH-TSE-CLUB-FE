import nextJest from 'next/jest.js'

import type { Config } from 'jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Adjust the pattern to match your source files
    '!src/**/*.d.ts', // Exclude type declaration files
    '!src/**/index.ts', // Exclude index files if necessary
  ],
  coverageDirectory: 'coverage', // Specify the directory where coverage reports should be saved
  coverageReporters: ['html', 'text-summary'], // Specify the format of the coverage reports
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
