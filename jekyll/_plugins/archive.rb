module Jekyll
  class ArchiveIndex < Page
    def initialize(site, base, dir, period, posts)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'archive.html')
      self.data['period'] = period
      self.data['period_posts'] = posts

      period_year = period["year"].to_s()
      period_month = period["month"].to_s.rjust(2, '0')
      if period['month'] == nil
        period_month = '01'
      end
      period_date = DateTime.parse('%s-%s-01 00:00:00' % [period_year, period_month])
      period_date_format = period_date.strftime('%B %Y')

      archive_title = self.data['title'] || self.data['archive_title'] || ''
      menu_title = self.data['menuTitle'] || self.data['archive_menuTitle'] || ''
      if period['year'] == nil
        archive_title = archive_title.sub('%Y', '')
      else
        archive_title = archive_title.sub('%Y', period_date.strftime(self.data['year_format'] || '%Y'))
        menu_title = period_date.strftime(self.data['year_menuFormat'] || self.data['year_format'] || '%Y')
      end
      if period['month'] == nil
        archive_title = archive_title.sub('%m', '')
      else
        archive_title = archive_title.sub('%m', period_date.strftime(self.data['month_format'] || '%m'))
        menu_title = period_date.strftime(self.data['month_menuFormat'] || self.data['month_format'] || '%m')
      end
      self.data['title'] = "#{archive_title}"
      self.data['menuTitle'] = "#{menu_title}"
    end
  end
  class ArchiveGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'archive'
        # Generate monthly archives
        site.posts.sort_by{ |p| -p.date.to_f }.group_by{ |c| {"month" => c.date.month, "year" => c.date.year} }.each do |period, posts|
          archive_dir = File.join(period["year"].to_s(), "%02d" % period["month"].to_s())
          write_archive_index(site, archive_dir, period, posts)
        end

        # Generate yearly archives
        site.posts.sort_by{ |p| -p.date.to_f }.group_by{ |c| {"year" => c.date.year} }.each do |period, posts|
          archive_dir = File.join(period["year"].to_s())
          write_archive_index(site, archive_dir, period, posts)
        end
      end
    end
    def write_archive_index(site, dir, period, posts)
      index = ArchiveIndex.new(site, site.source, dir, period, posts)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end