export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/config/jest/mocks/styleMock.ts',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/fileMock.ts',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  modulePaths: ['<rootDir>src'],
  rootDir: '../../',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/config/jest/setupTests.ts',
  ],
}
