module.exports = o =
  init: ->
    @diagram()

  random: (l, u) ->
    Math.floor (Math.random() * (u - l + 1)) + l

  diagram: ->
    r = Raphael("diagram", 600, 600)
    rad = 73
    defaultText = "Skills"
    speed = 250
    r.circle(300, 300, 85).attr
      stroke: "none"
      fill: "#193340"

    title = r.text(300, 300, defaultText).attr(
      font: "20px Arial"
      fill: "#fff"
    ).toFront()
    r.customAttributes.arc = (value, color, rad) ->
      v = 3.6 * value
      alpha = (if v is 360 then 359.99 else v)
      random = o.random(91, 240)
      a = (random - alpha) * Math.PI / 180
      b = random * Math.PI / 180
      sx = 300 + rad * Math.cos(b)
      sy = 300 - rad * Math.sin(b)
      x = 300 + rad * Math.cos(a)
      y = 300 - rad * Math.sin(a)
      path = [["M", sx, sy], ["A", rad, rad, 0, +(alpha > 180), 1, x, y]]
      path: path
      stroke: color

    $(".get").find(".arc").each (i) ->
      t = $(this)
      color = t.find(".color").val()
      value = t.find(".percent").val()
      text = t.find(".text").text()
      rad += 30
      z = r.path().attr(
        arc: [value, color, rad]
        "stroke-width": 26
      )
      #solves IE problem
      z.mouseover(->
        @animate
          "stroke-width": 50
          opacity: .75
        , 1000, "elastic"
        @toFront()  unless Raphael.type is "VML"
        title.stop().animate
          opacity: 0
        , speed, ">", ->
          @attr(text: text + "\n" + value + "%").animate
            opacity: 1
          , speed, "<"

      ).mouseout ->
        @stop().animate
          "stroke-width": 26
          opacity: 1
        , speed * 4, "elastic"
        title.stop().animate
          opacity: 0
        , speed, ">", ->
          title.attr(text: defaultText).animate
            opacity: 1
          , speed, "<"
