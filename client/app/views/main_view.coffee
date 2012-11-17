template = require('./templates/main')

module.exports = Backbone.View.extend(
  template: template
  el: $("#main")
  render: ->
    @$el.html @template()

  initialize: ->
    @render()
)
