template = require('./templates/header')

module.exports = Backbone.View.extend(
  template: template
  el: $("#header")
  render: ->
    @$el.html @template()

  initialize: ->
    @render()
)
