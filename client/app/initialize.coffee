$ ->
  Application = require 'application'
  app = new Application()
  app.initialize( ->

    #----------#
    # Rounting
    #----------#
    Router = require('router')

    app_router = new Router
    app_router.on "route:", () ->
      app.render()

    Backbone.history.start()
  )
