module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/test/setup-tests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
