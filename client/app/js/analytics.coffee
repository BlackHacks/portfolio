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
mixpanel.init "YOUR_TOKEN"
