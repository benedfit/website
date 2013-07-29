require "jekyll-assets"
if ENV['WERCKER_ENV'] == 'production'
  require "jekyll-press"
end