import config from '@newhighsco/lint-staged-config'

export default {
  ...config,
  '*.styl': 'stylelint --ignore-path .gitignore --fix',
  '*.pug': 'pug-list'
}
