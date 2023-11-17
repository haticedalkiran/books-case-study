module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['unused-imports'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
  },
};
