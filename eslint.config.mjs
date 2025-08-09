import antfu from '@antfu/eslint-config'

export default antfu({
  languageOptions: {
    globals: {
      Phaser: 'readonly',
    },
  },
  rules: {
    'ts/no-empty-object-type': 'off',
  },
})
