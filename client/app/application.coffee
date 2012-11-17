#-------#
# Views
#-------#
HeaderView = require 'views/header_view'
MainView = require 'views/main_view'
o = require 'diagram'

module.exports = class Application
  render: ->
    mainView.render()

  initialize: (cb) =>
    # Init the views
    header = new HeaderView()
    main = new MainView()

    # Init the skill diagram
    o.init()

    cb()
