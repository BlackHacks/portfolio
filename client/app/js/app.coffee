woopraReady = (tracker) ->
  tracker.setDomain "piotry.me"
  tracker.setIdleTimeout 300000
  tracker.trackPageview
    type: "pageview"
    url: window.location.pathname + window.location.search
    title: document.title

  false
(->
  wsc = document.createElement("script")
  wsc.src = document.location.protocol + "//static.woopra.com/js/woopra.js"
  wsc.type = "text/javascript"
  wsc.async = true
  ssc = document.getElementsByTagName("script")[0]
  ssc.parentNode.insertBefore wsc, ssc
)()

((c, a) ->
  b = undefined
  d = undefined
  h = undefined
  e = undefined
  b = c.createElement("script")
  b.type = "text/javascript"
  b.async = not 0
  b.src = ((if "https:" is c.location.protocol then "https:" else "http:")) + "//cdn.mxpnl.com/libs/mixpanel-2.1.min.js"
  d = c.getElementsByTagName("script")[0]
  d.parentNode.insertBefore b, d
  a._i = []
  a.init = (b, c, f) ->
    d = (a, b) ->
      c = b.split(".")
      2 is c.length and (a = a[c[0]]
      b = c[1]
      )
      a[b] = ->
        a.push [b].concat(Array::slice.call(arguments_, 0))
    g = a
    (if "undefined" isnt typeof f then g = a[f] = [] else f = "mixpanel")
    g.people = g.people or []
    h = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "name_tag", "set_config", "people.identify", "people.set", "people.increment"]
    e = 0
    while e < h.length
      d g, h[e]
      e++
    a._i.push [b, c, f]

  a.__SV = 1.1
  window.mixpanel = a
) document, window.mixpanel or []
mixpanel.init "8c3bd3239141b0bc4ce867b77bc7b240"
masonry = ->
  $("#container").masonry
    itemSelector: ".box"
    columnWidth: (containerWidth) ->
      containerWidth / 3

github = ->
  $("#github").gitview
    user: "tUrG0n" # any github username
    count: 3 # (optional) number of repos per widget page
    showForks: true # (optional) show forked repos, true by default
    width: "250px" # (optional) width of widget / repos
    frameColor: "white" # (optional) frame background color
    compact: false # (optional) compact mode or full mode?
    noFrame: false # (optional) no fancy widget frame, just repositories
    cache: true # (optional) turn local caching on or off, on by default

tweet = ->
  $("#tweets").jTweetsAnywhere
    username: "yordaKhof"
    count: 5
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


window.App = Em.Application.create()
App.ApplicationController = Em.Controller.extend()
App.ApplicationView = Em.View.extend(templateName: "application")
App.HomeController = Em.Controller.extend()
App.HomeView = Em.View.extend(
  templateName: "home"
  didInsertElement: ->
    mixpanel.people.set
      age: 17
      gender: "male"
      referrer: document.referrer
    tweet()
    o = require('js/init')
    o.init()
)
App.AboutController = Em.Controller.extend()
App.AboutView = Em.View.extend(templateName: "about")
App.PortfolioController = Em.Controller.extend()
App.PortfolioView = Em.View.extend(
  templateName: "portfolio"
  didInsertElement: ->
    github()
    masonry()
)
App.MusicController = Em.Controller.extend()
App.MusicView = Em.View.extend(templateName: "Music")
App.MusicMenuController = Em.Controller.extend()
App.MusicMenuView = Em.View.extend(templateName: "music-menu")
App.YoutubeController = Em.Controller.extend()
App.YoutubeView = Em.View.extend(templateName: "youtube")
App.SoundCloudController = Em.Controller.extend()
App.SoundCloudView = Em.View.extend(templateName: "soundCloud")
App.Router = Em.Router.extend(
  enableLogging: true
  location: "hash"
  root: Em.Route.extend(
    gotoHome: Ember.Route.transitionTo("home")
    gotoMusic: Ember.Route.transitionTo("music.music")
    gotoPortfolio: Ember.Route.transitionTo("portfolio")
    gotoAbout: Ember.Route.transitionTo("about")
    
    # STATES
    index: Ember.Route.extend(
      route: "/"
      redirectsTo: "home"
    )
    
    # STATES
    home: Em.Route.extend(
      route: "/"
      connectOutlets: (router, context) ->
        router.get("applicationController").connectOutlet "home"
    )
    portfolio: Em.Route.extend(
      route: "/portfolio"
      connectOutlets: (router, context) ->
        router.get("applicationController").connectOutlet "portfolio"
    )
    about: Em.Route.extend(
      route: "/about"
      connectOutlets: (router, context) ->
        router.get("applicationController").connectOutlet "about"
    )
    music: Em.Route.extend(
      
      # EVENTS
      gotoMain: Ember.Route.transitionTo("music")
      gotoSoundCloud: Ember.Route.transitionTo("soundCloud")
      gotoYoutube: Ember.Route.transitionTo("youtube")
      music: Em.Route.extend(
        route: "/music"
        connectOutlets: (router, context) ->
          router.get("applicationController").connectOutlet "Music"
      )
      soundCloud: Em.Route.extend(
        route: "/soundCloud"
        connectOutlets: (router, context) ->
          router.get("applicationController").connectOutlet "soundCloud"
      )
      youtube: Em.Route.extend(
        route: "/youtube"
        connectOutlets: (router, context) ->
          router.get("applicationController").connectOutlet "youtube"
      )
    )
  )
)
App.initialize()


#]]>  
