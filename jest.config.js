module.exports = {
  moduleFileExtensions: ['ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/src/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)'],
};
