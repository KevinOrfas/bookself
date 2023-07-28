module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules', 'imports'],
  testMatch: ['**/__tests__/**/*.?(m)js?(x)', '**/?(*.)(spec|test).?(m)js?(x)'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
};
