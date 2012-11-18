(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
  var Application, HeaderView, MainView, o,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  HeaderView = require('views/header_view');

  MainView = require('views/main_view');

  o = require('diagram');

  module.exports = Application = (function() {

    function Application() {
      this.initialize = __bind(this.initialize, this);

    }

    Application.prototype.twitter = function() {
      return $("#tweets").jTweetsAnywhere({
        username: "yordaKhof",
        count: 2,
        showTweetFeed: {
          showProfileImages: true,
          showUserScreenNames: true,
          showUserFullNames: true,
          showActionReply: true,
          showActionRetweet: true,
          showActionFavorite: true
        },
        tweetTimestampDecorator: function(tweet, options) {
          var date, dateString, html, screenName;
          screenName = (tweet.user ? tweet.user.screen_name : false || tweet.from_user);
          date = new Date(formatDate(tweet.created_at));
          dateString = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
          html = "<span class=\"jta-tweet-timestamp\"> \"" + "<a class=\"jta-tweet-timestamp-link\" href=\"http://twitter.com/" + screenName + "/status/" + tweet.id + "\">" + dateString + "</a></span>";
          return html;
        }
      });
    };

    Application.prototype.render = function() {
      return mainView.render();
    };

    Application.prototype.initialize = function(cb) {
      var header, main;
      header = new HeaderView();
      main = new MainView();
      o.init();
      this.twitter();
      return cb();
    };

    return Application;

  })();
  
}});

window.require.define({"diagram": function(exports, require, module) {
  var o;

  module.exports = o = {
    init: function() {
      return this.diagram();
    },
    random: function(l, u) {
      return Math.floor((Math.random() * (u - l + 1)) + l);
    },
    diagram: function() {
      var defaultText, r, rad, speed, title;
      r = Raphael("diagram", 450, 450);
      rad = 73;
      defaultText = "Skills";
      speed = 250;
      r.circle(240, 240, 85).attr({
        stroke: "none",
        fill: "#193340"
      });
      title = r.text(240, 240, defaultText).attr({
        font: "20px Arial",
        fill: "#fff"
      }).toFront();
      r.customAttributes.arc = function(value, color, rad) {
        var a, alpha, b, path, random, sx, sy, v, x, y;
        v = 3.6 * value;
        alpha = (v === 360 ? 359.99 : v);
        random = o.random(91, 240);
        a = (random - alpha) * Math.PI / 180;
        b = random * Math.PI / 180;
        sx = 240 + rad * Math.cos(b);
        sy = 240 - rad * Math.sin(b);
        x = 240 + rad * Math.cos(a);
        y = 240 - rad * Math.sin(a);
        path = [["M", sx, sy], ["A", rad, rad, 0, +(alpha > 180), 1, x, y]];
        return {
          path: path,
          stroke: color
        };
      };
      return $(".get").find(".arc").each(function(i) {
        var color, t, text, value, z;
        t = $(this);
        color = t.find(".color").val();
        value = t.find(".percent").val();
        text = t.find(".text").text();
        rad += 30;
        z = r.path().attr({
          arc: [value, color, rad],
          "stroke-width": 26
        });
        return z.mouseover(function() {
          this.animate({
            "stroke-width": 50,
            opacity: .75
          }, 1000, "elastic");
          if (Raphael.type !== "VML") {
            this.toFront();
          }
          return title.stop().animate({
            opacity: 0
          }, speed, ">", function() {
            return this.attr({
              text: text + "\n" + value + "%"
            }).animate({
              opacity: 1
            }, speed, "<");
          });
        }).mouseout(function() {
          this.stop().animate({
            "stroke-width": 26,
            opacity: 1
          }, speed * 4, "elastic");
          return title.stop().animate({
            opacity: 0
          }, speed, ">", function() {
            return title.attr({
              text: defaultText
            }).animate({
              opacity: 1
            }, speed, "<");
          });
        });
      });
    }
  };
  
}});

window.require.define({"initialize": function(exports, require, module) {
  
  $(function() {
    var Application, app;
    Application = require('application');
    app = new Application();
    return app.initialize(function() {
      var Router, app_router;
      Router = require('router');
      app_router = new Router;
      app_router.on("route:", function() {
        return app.render();
      });
      return Backbone.history.start();
    });
  });
  
}});

window.require.define({"js/analytics": function(exports, require, module) {
  var woopraReady;

  woopraReady = function(tracker) {
    tracker.setDomain("piotry.me");
    tracker.setIdleTimeout(300000);
    tracker.trackPageview({
      type: "pageview",
      url: window.location.pathname + window.location.search,
      title: document.title
    });
    return false;
  };

  (function() {
    var ssc, wsc;
    wsc = document.createElement("script");
    wsc.src = document.location.protocol + "//static.woopra.com/js/woopra.js";
    wsc.type = "text/javascript";
    wsc.async = true;
    ssc = document.getElementsByTagName("script")[0];
    return ssc.parentNode.insertBefore(wsc, ssc);
  })();

  (function(c, a) {
    var b, d, e, h;
    b = void 0;
    d = void 0;
    h = void 0;
    e = void 0;
    b = c.createElement("script");
    b.type = "text/javascript";
    b.async = !0;
    b.src = ("https:" === c.location.protocol ? "https:" : "http:") + "//cdn.mxpnl.com/libs/mixpanel-2.1.min.js";
    d = c.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(b, d);
    a._i = [];
    a.init = function(b, c, f) {
      var g;
      d = function(a, b) {
        c = b.split(".");
        2 === c.length && (a = a[c[0]], b = c[1]);
        return a[b] = function() {
          return a.push([b].concat(Array.prototype.slice.call(arguments_, 0)));
        };
      };
      g = a;
      if ("undefined" !== typeof f) {
        g = a[f] = [];
      } else {
        f = "mixpanel";
      }
      g.people = g.people || [];
      h = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "name_tag", "set_config", "people.identify", "people.set", "people.increment"];
      e = 0;
      while (e < h.length) {
        d(g, h[e]);
        e++;
      }
      return a._i.push([b, c, f]);
    };
    a.__SV = 1.1;
    return window.mixpanel = a;
  })(document, window.mixpanel || []);

  mixpanel.init("8c3bd3239141b0bc4ce867b77bc7b240");
  
}});

window.require.define({"js/app": function(exports, require, module) {
  var github, masonry, o, tweet, woopraReady;

  woopraReady = function(tracker) {
    tracker.setDomain("piotry.me");
    tracker.setIdleTimeout(300000);
    tracker.trackPageview({
      type: "pageview",
      url: window.location.pathname + window.location.search,
      title: document.title
    });
    return false;
  };

  (function() {
    var ssc, wsc;
    wsc = document.createElement("script");
    wsc.src = document.location.protocol + "//static.woopra.com/js/woopra.js";
    wsc.type = "text/javascript";
    wsc.async = true;
    ssc = document.getElementsByTagName("script")[0];
    return ssc.parentNode.insertBefore(wsc, ssc);
  })();

  masonry = function() {
    return $("#container").masonry({
      itemSelector: ".box",
      columnWidth: function(containerWidth) {
        return containerWidth / 3;
      }
    });
  };

  github = function() {
    return $("#github").gitview({
      user: "tUrG0n",
      count: 3,
      showForks: true,
      width: "250px",
      frameColor: "white",
      compact: false,
      noFrame: false,
      cache: true
    });
  };

  tweet = function() {
    return $("#tweets").jTweetsAnywhere({
      username: "yordaKhof",
      count: 5,
      showTweetFeed: {
        showProfileImages: true,
        showUserScreenNames: true,
        showUserFullNames: true,
        showActionReply: true,
        showActionRetweet: true,
        showActionFavorite: true
      },
      tweetTimestampDecorator: function(tweet, options) {
        var date, dateString, html, screenName;
        screenName = (tweet.user ? tweet.user.screen_name : false || tweet.from_user);
        date = new Date(formatDate(tweet.created_at));
        dateString = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        html = "<span class=\"jta-tweet-timestamp\"> \"" + "<a class=\"jta-tweet-timestamp-link\" href=\"http://twitter.com/" + screenName + "/status/" + tweet.id + "\">" + dateString + "</a></span>";
        return html;
      }
    });
  };

  window.App = Em.Application.create();

  o = require('js/init');

  App.ApplicationController = Em.Controller.extend();

  App.ApplicationView = Em.View.extend({
    templateName: "application"
  });

  App.HomeController = Em.Controller.extend();

  App.HomeView = Em.View.extend({
    templateName: "home",
    didInsertElement: function() {
      mixpanel.track("Home");
      tweet();
      return o.init();
    }
  });

  App.AboutController = Em.Controller.extend();

  App.AboutView = Em.View.extend({
    templateName: "about"
  });

  App.PortfolioController = Em.Controller.extend();

  App.PortfolioView = Em.View.extend({
    templateName: "portfolio",
    didInsertElement: function() {
      mixpanel.track("Portfolio");
      github();
      return masonry();
    }
  });

  App.MusicController = Em.Controller.extend();

  App.MusicView = Em.View.extend({
    templateName: "Music",
    didInsertElement: function() {
      return mixpanel.track("Music");
    }
  });

  App.MusicMenuController = Em.Controller.extend();

  App.MusicMenuView = Em.View.extend({
    templateName: "music-menu",
    didInsertElement: function() {
      return mixpanel.track("Music-menu");
    }
  });

  App.YoutubeController = Em.Controller.extend();

  App.YoutubeView = Em.View.extend({
    templateName: "youtube"
  });

  App.SoundCloudController = Em.Controller.extend();

  App.SoundCloudView = Em.View.extend({
    templateName: "soundCloud"
  });

  App.Router = Em.Router.extend({
    enableLogging: true,
    location: "hash",
    root: Em.Route.extend({
      gotoHome: Ember.Route.transitionTo("home"),
      gotoMusic: Ember.Route.transitionTo("music.music"),
      gotoPortfolio: Ember.Route.transitionTo("portfolio"),
      gotoAbout: Ember.Route.transitionTo("about"),
      index: Ember.Route.extend({
        route: "/",
        redirectsTo: "home"
      }),
      home: Em.Route.extend({
        route: "/",
        connectOutlets: function(router, context) {
          return router.get("applicationController").connectOutlet("home");
        }
      }),
      portfolio: Em.Route.extend({
        route: "/portfolio",
        connectOutlets: function(router, context) {
          return router.get("applicationController").connectOutlet("portfolio");
        }
      }),
      about: Em.Route.extend({
        route: "/about",
        connectOutlets: function(router, context) {
          return router.get("applicationController").connectOutlet("about");
        }
      }),
      music: Em.Route.extend({
        gotoMain: Ember.Route.transitionTo("music"),
        gotoSoundCloud: Ember.Route.transitionTo("soundCloud"),
        gotoYoutube: Ember.Route.transitionTo("youtube"),
        music: Em.Route.extend({
          route: "/music",
          connectOutlets: function(router, context) {
            return router.get("applicationController").connectOutlet("Music");
          }
        }),
        soundCloud: Em.Route.extend({
          route: "/soundCloud",
          connectOutlets: function(router, context) {
            return router.get("applicationController").connectOutlet("soundCloud");
          }
        }),
        youtube: Em.Route.extend({
          route: "/youtube",
          connectOutlets: function(router, context) {
            return router.get("applicationController").connectOutlet("youtube");
          }
        })
      })
    })
  });

  App.initialize();
  
}});

window.require.define({"js/init": function(exports, require, module) {
  var o;

  module.exports = o = {
    init: function() {
      return this.diagram();
    },
    random: function(l, u) {
      return Math.floor((Math.random() * (u - l + 1)) + l);
    },
    diagram: function() {
      var defaultText, r, rad, speed, title;
      r = Raphael("diagram", 600, 600);
      rad = 73;
      defaultText = "Skills";
      speed = 250;
      r.circle(300, 300, 85).attr({
        stroke: "none",
        fill: "#193340"
      });
      title = r.text(300, 300, defaultText).attr({
        font: "20px Arial",
        fill: "#fff"
      }).toFront();
      r.customAttributes.arc = function(value, color, rad) {
        var a, alpha, b, path, random, sx, sy, v, x, y;
        v = 3.6 * value;
        alpha = (v === 360 ? 359.99 : v);
        random = o.random(91, 240);
        a = (random - alpha) * Math.PI / 180;
        b = random * Math.PI / 180;
        sx = 300 + rad * Math.cos(b);
        sy = 300 - rad * Math.sin(b);
        x = 300 + rad * Math.cos(a);
        y = 300 - rad * Math.sin(a);
        path = [["M", sx, sy], ["A", rad, rad, 0, +(alpha > 180), 1, x, y]];
        return {
          path: path,
          stroke: color
        };
      };
      return $(".get").find(".arc").each(function(i) {
        var color, t, text, value, z;
        t = $(this);
        color = t.find(".color").val();
        value = t.find(".percent").val();
        text = t.find(".text").text();
        rad += 30;
        z = r.path().attr({
          arc: [value, color, rad],
          "stroke-width": 26
        });
        return z.mouseover(function() {
          this.animate({
            "stroke-width": 50,
            opacity: .75
          }, 1000, "elastic");
          if (Raphael.type !== "VML") {
            this.toFront();
          }
          return title.stop().animate({
            opacity: 0
          }, speed, ">", function() {
            return this.attr({
              text: text + "\n" + value + "%"
            }).animate({
              opacity: 1
            }, speed, "<");
          });
        }).mouseout(function() {
          this.stop().animate({
            "stroke-width": 26,
            opacity: 1
          }, speed * 4, "elastic");
          return title.stop().animate({
            opacity: 0
          }, speed, ">", function() {
            return title.attr({
              text: defaultText
            }).animate({
              opacity: 1
            }, speed, "<");
          });
        });
      });
    }
  };
  
}});

window.require.define({"router": function(exports, require, module) {
  
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });
  
}});

window.require.define({"views/header_view": function(exports, require, module) {
  var template;

  template = require('./templates/header');

  module.exports = Backbone.View.extend({
    template: template,
    el: $("#header"),
    render: function() {
      return this.$el.html(this.template());
    },
    initialize: function() {
      return this.render();
    }
  });
  
}});

window.require.define({"views/main_view": function(exports, require, module) {
  var template;

  template = require('./templates/main');

  module.exports = Backbone.View.extend({
    template: template,
    el: $("#main"),
    render: function() {
      return this.$el.html(this.template());
    },
    initialize: function() {
      return this.render();
    }
  });
  
}});

window.require.define({"views/templates/header": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="logo"><img src="/images/P.Y.png"/></div><div class="row-fluid"><div class="span2"></div><div class="span4"><p>Piotr Yordanov ---</p><p>Entrepreneur, Hacker and musician</p></div></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/main": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="row-fluid"><div class="span8"><h2>About me!</h2><img src="/images/piotr.png" class="me"/><div class="bio">My name is <b>Piotr Yordanov. </b>I studied electrical and computer engineering, though \nself learning has proven to be much much more rewarding.\nAfter all, software engineering resources are available online!\nI\'ve playing playing the piano since the age of 5. Recently,\nI moved into jazz!<br/>Currently, I am the <b>co-founder </b>of <a href="http://baytbaytak.com">BaytBaytak</a>, a Beirut based real-estate startup.<br/></div></div><div class="span4"><div class="stack"><h2>The Stack</h2>This website is powered by <a href="http://nodejs.org">nodejs </a>on the <b>backend. </b><br/>The <b>frontend </b>is maintained by <a href="http://brunch.io">brunch.io</a>, its logic is handled by <a href="http://backbonejs.org">backbonejs</a>, and the responsive design provided by <a href="http://twitter.github.com/bootstrap/">twitter-bootstrap </a>. All of that written with <a href="http://coffeescript.org">coffeescript </a>from <a href="https://github.com/b4winckler/macvim">macvim </a><div class="logo"><a href="http://nodejs.org" class="node"></a><a href="http://coffeescript.org" class="coffee"></a><a href="https://github.com/b4winckler/macvim" class="vim"></a><a href="http://brunch.io" class="brunch"></a><a href="http://backbonejs.org" class="backbone"></a></div></div></div></div><div class="row-fluid"><div class="span2"><div class="legend"><h2>My Skills:</h2><div class="skills"><ul><li class="zic">Music</li><li class="web">WebDev</li><li class="ai">AI</li><li class="openGL">OpenGL</li></ul></div></div></div><div class="span6"><div id="diagram"></div><div class="get"><div class="arc"><span class="text">Music</span><input type="hidden" value="93" class="percent"/><input type="hidden" value="#BEDBE9" class="color"/></div><div class="arc"><span class="text">WebDev</span><input type="hidden" value="85" class="percent"/><input type="hidden" value="#d6bef6" class="color"/></div><div class="arc"><span class="text">AI</span><input type="hidden" value="50" class="percent"/><input type="hidden" value="#7a5aa6" class="color"/></div><div class="arc"><span class="text">openGL</span><input type="hidden" value="30" class="percent"/><input type="hidden" value="#88B8E6" class="color"/></div></div></div><div class="span4"><div id="twitter"><h2>Latest Tweets</h2><div id="tweets"></div></div></div></div>');
  }
  return buf.join("");
  };
}});

