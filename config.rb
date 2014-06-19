require "breakpoint"
require "jacket"

sass_dir = "source/_sass"
css_dir = "source/_assets/css"
fonts_dir = "source/fonts"
images_dir = "source/img"

http_css_path = "/css"
http_fonts_path = "/fonts"
http_images_path = "/img"

output_style = (environment == :production) ? :compressed : :expanded
line_comments = (environment == :production) ? false : true
asset_cache_buster :none