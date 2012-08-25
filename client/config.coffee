exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      defaultExtension: 'coffee'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/

    stylesheets:
      defaultExtension: 'styl'
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
      order:
        before: [
          'vendor/styles/bootstrap.min.css',
          'vendor/styles/jquery.jtweetsanywhere-1.3.1.css'
        ]
        after: [
          'app/css/default.styl',
          'app/css/docs.styl'
        ]

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js'
