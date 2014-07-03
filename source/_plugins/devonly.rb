module Jekyll
  class DevOnlyTag < Liquid::Block
    def render(context)
      if DevOnlyTag.dev?(context)
        super(context)
      end
    end

    def self.dev?(context)
      # Compatible with both Jekyll v1 and older config styles
      if context.registers[:site].config['server'] ||
         context.registers[:site].config['serving']
        return true
      end

      if context.registers[:site].config.key?('dev')
        return context.registers[:site].config['dev'] ? true : false
      end

      false
    end
  end
end

Liquid::Template.register_tag('devonly', Jekyll::DevOnlyTag)