/* eslint-env node */
module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 'warn',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'error'
  }
}
