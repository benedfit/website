module.exports = {
  default: ['jekyll', 'concurrent:watch'],
  deploy_dev: ['shell:compass', 'autoprefixer', 'shell:jekyll_dev'],
  deploy_master: ['shell:compass', 'autoprefixer', 'shell:jekyll', 'concurrent:minify'],
  lint: ['newer:jshint'],
  psi: ['psi-ngrok']
};