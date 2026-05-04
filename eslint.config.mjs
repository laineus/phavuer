import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/*.md',
    '.claude/**',
    'dist/**',
    'docs/**',
    'public/**',
  ],
}, {
  languageOptions: {
    globals: {
      Phaser: 'readonly',
    },
  },
  rules: {
    'ts/no-empty-object-type': 'off',
    'unicorn/number-literal-case': 'off',
  },
})
