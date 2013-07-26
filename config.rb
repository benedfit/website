require 'breakpoint'

http_path = "/"
css_dir = "_deploy/css"
http_css_path = "/css"
fonts_dir = "source/fonts"
http_fonts_path = "/fonts"
images_dir = "source/img"
http_images_path = "/img"
sass_dir = "source/_sass"

output_style = (environment == :production) ? :compressed : :expanded
line_comments = (environment == :production) ? false : true
asset_cache_buster :none