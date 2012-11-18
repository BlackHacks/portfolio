#-------#
# Views
#-------#
HeaderView = require 'views/header_view'
MainView = require 'views/main_view'
o = require 'diagram'

module.exports = class Application
  twitter: ->
    $("#tweets").jTweetsAnywhere
      username: "yordaKhof"
      count: 2
      showTweetFeed:
        showProfileImages: true
        showUserScreenNames: true
        showUserFullNames: true
        showActionReply: true
        showActionRetweet: true
        showActionFavorite: true

      tweetTimestampDecorator: (tweet, options) ->
        screenName = (if tweet.user then tweet.user.screen_name else false or tweet.from_user)
        date = new Date(formatDate(tweet.created_at))
        dateString = date.getHours() + ":" + ((if date.getMinutes() < 10 then "0" else "")) + date.getMinutes() + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
        html = "<span class=\"jta-tweet-timestamp\"> \"" + "<a class=\"jta-tweet-timestamp-link\" href=\"http://twitter.com/" + screenName + "/status/" + tweet.id + "\">" + dateString + "</a></span>"
        html
  render: ->
    mainView.render()

  initialize: (cb) =>
    # Init the views
    header = new HeaderView()
    main = new MainView()

    # Init the skill diagram
    o.init()

    # Init twitter
    @twitter()

    cb()
