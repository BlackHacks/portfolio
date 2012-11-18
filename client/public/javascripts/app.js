(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o)}},u=function(e,t){var r={id:e,exports:{}};t(r.exports,o(e),r);var i=n[e]=r.exports;return i},a=function(e){var s=i(e,".");if(r(n,s))return n[s];if(r(t,s))return u(s,t[s]);var o=i(s,"./index");if(r(n,o))return n[o];if(r(t,o))return u(o,t[o]);throw new Error('Cannot find module "'+e+'"')},f=function(e){for(var n in e)r(e,n)&&(t[n]=e[n])};e.require=a,e.require.define=f,e.require.brunch=!0})(),window.require.define({application:function(e,t,n){var r,i,s,o,u=function(e,t){return function(){return e.apply(t,arguments)}};i=t("views/header_view"),s=t("views/main_view"),o=t("diagram"),n.exports=r=function(){function e(){this.initialize=u(this.initialize,this)}return e.prototype.twitter=function(){return $("#tweets").jTweetsAnywhere({username:"yordaKhof",count:2,showTweetFeed:{showProfileImages:!0,showUserScreenNames:!0,showUserFullNames:!0,showActionReply:!0,showActionRetweet:!0,showActionFavorite:!0},tweetTimestampDecorator:function(e,t){var n,r,i,s;return s=e.user?e.user.screen_name:e.from_user,n=new Date(formatDate(e.created_at)),r=n.getHours()+":"+(n.getMinutes()<10?"0":"")+n.getMinutes()+" "+(n.getMonth()+1)+"/"+n.getDate()+"/"+n.getFullYear(),i='<span class="jta-tweet-timestamp"> "<a class="jta-tweet-timestamp-link" href="http://twitter.com/'+s+"/status/"+e.id+'">'+r+"</a></span>",i}})},e.prototype.render=function(){return mainView.render()},e.prototype.initialize=function(e){var t,n;return t=new i,n=new s,o.init(),this.twitter(),e()},e}()}}),window.require.define({diagram:function(e,t,n){var r;n.exports=r={init:function(){return this.diagram()},random:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},diagram:function(){var e,t,n,i,s;return t=Raphael("diagram",450,450),n=73,e="Skills",i=250,t.circle(240,240,85).attr({stroke:"none",fill:"#193340"}),s=t.text(240,240,e).attr({font:"20px Arial",fill:"#fff"}).toFront(),t.customAttributes.arc=function(e,t,n){var i,s,u,a,f,l,c,h,p,d;return h=3.6*e,s=h===360?359.99:h,f=r.random(91,240),i=(f-s)*Math.PI/180,u=f*Math.PI/180,l=240+n*Math.cos(u),c=240-n*Math.sin(u),p=240+n*Math.cos(i),d=240-n*Math.sin(i),a=[["M",l,c],["A",n,n,0,+(s>180),1,p,d]],{path:a,stroke:t}},$(".get").find(".arc").each(function(r){var o,u,a,f,l;return u=$(this),o=u.find(".color").val(),f=u.find(".percent").val(),a=u.find(".text").text(),n+=30,l=t.path().attr({arc:[f,o,n],"stroke-width":26}),l.mouseover(function(){return this.animate({"stroke-width":50,opacity:.75},1e3,"elastic"),Raphael.type!=="VML"&&this.toFront(),s.stop().animate({opacity:0},i,">",function(){return this.attr({text:a+"\n"+f+"%"}).animate({opacity:1},i,"<")})}).mouseout(function(){return this.stop().animate({"stroke-width":26,opacity:1},i*4,"elastic"),s.stop().animate({opacity:0},i,">",function(){return s.attr({text:e}).animate({opacity:1},i,"<")})})})}}}}),window.require.define({initialize:function(e,t,n){$(function(){var e,n;return e=t("application"),n=new e,n.initialize(function(){var e,r;return e=t("router"),r=new e,r.on("route:",function(){return n.render()}),Backbone.history.start()})})}}),window.require.define({"js/analytics":function(e,t,n){var r;r=function(e){return e.setDomain("piotry.me"),e.setIdleTimeout(3e5),e.trackPageview({type:"pageview",url:window.location.pathname+window.location.search,title:document.title}),!1},function(){var e,t;return t=document.createElement("script"),t.src=document.location.protocol+"//static.woopra.com/js/woopra.js",t.type="text/javascript",t.async=!0,e=document.getElementsByTagName("script")[0],e.parentNode.insertBefore(t,e)}(),function(e,t){var n,r,i,s;return n=void 0,r=void 0,s=void 0,i=void 0,n=e.createElement("script"),n.type="text/javascript",n.async=!0,n.src=("https:"===e.location.protocol?"https:":"http:")+"//cdn.mxpnl.com/libs/mixpanel-2.1.min.js",r=e.getElementsByTagName("script")[0],r.parentNode.insertBefore(n,r),t._i=[],t.init=function(e,n,o){var u;r=function(e,t){return n=t.split("."),2===n.length&&(e=e[n[0]],t=n[1]),e[t]=function(){return e.push([t].concat(Array.prototype.slice.call(arguments_,0)))}},u=t,"undefined"!=typeof o?u=t[o]=[]:o="mixpanel",u.people=u.people||[],s=["disable","track","track_pageview","track_links","track_forms","register","register_once","unregister","identify","name_tag","set_config","people.identify","people.set","people.increment"],i=0;while(i<s.length)r(u,s[i]),i++;return t._i.push([e,n,o])},t.__SV=1.1,window.mixpanel=t}(document,window.mixpanel||[]),mixpanel.init("8c3bd3239141b0bc4ce867b77bc7b240")}}),window.require.define({"js/app":function(e,t,n){var r,i,s,o,u;u=function(e){return e.setDomain("piotry.me"),e.setIdleTimeout(3e5),e.trackPageview({type:"pageview",url:window.location.pathname+window.location.search,title:document.title}),!1},function(){var e,t;return t=document.createElement("script"),t.src=document.location.protocol+"//static.woopra.com/js/woopra.js",t.type="text/javascript",t.async=!0,e=document.getElementsByTagName("script")[0],e.parentNode.insertBefore(t,e)}(),i=function(){return $("#container").masonry({itemSelector:".box",columnWidth:function(e){return e/3}})},r=function(){return $("#github").gitview({user:"tUrG0n",count:3,showForks:!0,width:"250px",frameColor:"white",compact:!1,noFrame:!1,cache:!0})},o=function(){return $("#tweets").jTweetsAnywhere({username:"yordaKhof",count:5,showTweetFeed:{showProfileImages:!0,showUserScreenNames:!0,showUserFullNames:!0,showActionReply:!0,showActionRetweet:!0,showActionFavorite:!0},tweetTimestampDecorator:function(e,t){var n,r,i,s;return s=e.user?e.user.screen_name:e.from_user,n=new Date(formatDate(e.created_at)),r=n.getHours()+":"+(n.getMinutes()<10?"0":"")+n.getMinutes()+" "+(n.getMonth()+1)+"/"+n.getDate()+"/"+n.getFullYear(),i='<span class="jta-tweet-timestamp"> "<a class="jta-tweet-timestamp-link" href="http://twitter.com/'+s+"/status/"+e.id+'">'+r+"</a></span>",i}})},window.App=Em.Application.create(),s=t("js/init"),App.ApplicationController=Em.Controller.extend(),App.ApplicationView=Em.View.extend({templateName:"application"}),App.HomeController=Em.Controller.extend(),App.HomeView=Em.View.extend({templateName:"home",didInsertElement:function(){return mixpanel.track("Home"),o(),s.init()}}),App.AboutController=Em.Controller.extend(),App.AboutView=Em.View.extend({templateName:"about"}),App.PortfolioController=Em.Controller.extend(),App.PortfolioView=Em.View.extend({templateName:"portfolio",didInsertElement:function(){return mixpanel.track("Portfolio"),r(),i()}}),App.MusicController=Em.Controller.extend(),App.MusicView=Em.View.extend({templateName:"Music",didInsertElement:function(){return mixpanel.track("Music")}}),App.MusicMenuController=Em.Controller.extend(),App.MusicMenuView=Em.View.extend({templateName:"music-menu",didInsertElement:function(){return mixpanel.track("Music-menu")}}),App.YoutubeController=Em.Controller.extend(),App.YoutubeView=Em.View.extend({templateName:"youtube"}),App.SoundCloudController=Em.Controller.extend(),App.SoundCloudView=Em.View.extend({templateName:"soundCloud"}),App.Router=Em.Router.extend({enableLogging:!0,location:"hash",root:Em.Route.extend({gotoHome:Ember.Route.transitionTo("home"),gotoMusic:Ember.Route.transitionTo("music.music"),gotoPortfolio:Ember.Route.transitionTo("portfolio"),gotoAbout:Ember.Route.transitionTo("about"),index:Ember.Route.extend({route:"/",redirectsTo:"home"}),home:Em.Route.extend({route:"/",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("home")}}),portfolio:Em.Route.extend({route:"/portfolio",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("portfolio")}}),about:Em.Route.extend({route:"/about",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("about")}}),music:Em.Route.extend({gotoMain:Ember.Route.transitionTo("music"),gotoSoundCloud:Ember.Route.transitionTo("soundCloud"),gotoYoutube:Ember.Route.transitionTo("youtube"),music:Em.Route.extend({route:"/music",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("Music")}}),soundCloud:Em.Route.extend({route:"/soundCloud",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("soundCloud")}}),youtube:Em.Route.extend({route:"/youtube",connectOutlets:function(e,t){return e.get("applicationController").connectOutlet("youtube")}})})})}),App.initialize()}}),window.require.define({"js/init":function(e,t,n){var r;n.exports=r={init:function(){return this.diagram()},random:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},diagram:function(){var e,t,n,i,s;return t=Raphael("diagram",600,600),n=73,e="Skills",i=250,t.circle(300,300,85).attr({stroke:"none",fill:"#193340"}),s=t.text(300,300,e).attr({font:"20px Arial",fill:"#fff"}).toFront(),t.customAttributes.arc=function(e,t,n){var i,s,u,a,f,l,c,h,p,d;return h=3.6*e,s=h===360?359.99:h,f=r.random(91,240),i=(f-s)*Math.PI/180,u=f*Math.PI/180,l=300+n*Math.cos(u),c=300-n*Math.sin(u),p=300+n*Math.cos(i),d=300-n*Math.sin(i),a=[["M",l,c],["A",n,n,0,+(s>180),1,p,d]],{path:a,stroke:t}},$(".get").find(".arc").each(function(r){var o,u,a,f,l;return u=$(this),o=u.find(".color").val(),f=u.find(".percent").val(),a=u.find(".text").text(),n+=30,l=t.path().attr({arc:[f,o,n],"stroke-width":26}),l.mouseover(function(){return this.animate({"stroke-width":50,opacity:.75},1e3,"elastic"),Raphael.type!=="VML"&&this.toFront(),s.stop().animate({opacity:0},i,">",function(){return this.attr({text:a+"\n"+f+"%"}).animate({opacity:1},i,"<")})}).mouseout(function(){return this.stop().animate({"stroke-width":26,opacity:1},i*4,"elastic"),s.stop().animate({opacity:0},i,">",function(){return s.attr({text:e}).animate({opacity:1},i,"<")})})})}}}}),window.require.define({router:function(e,t,n){n.exports=Backbone.Router.extend({routes:{"":"home"}})}}),window.require.define({"views/header_view":function(e,t,n){var r;r=t("./templates/header"),n.exports=Backbone.View.extend({template:r,el:$("#header"),render:function(){return this.$el.html(this.template())},initialize:function(){return this.render()}})}}),window.require.define({"views/main_view":function(e,t,n){var r;r=t("./templates/main"),n.exports=Backbone.View.extend({template:r,el:$("#main"),render:function(){return this.$el.html(this.template())},initialize:function(){return this.render()}})}}),window.require.define({"views/templates/header":function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div class="logo"><img src="/images/P.Y.png"/></div><div class="row-fluid"><div class="span2"></div><div class="span4"><p>Piotr Yordanov ---</p><p>Entrepreneur, Hacker and musician</p></div><div class="span1"></div><div class="span5 menu"><ul><li><a href="https://github.com/tUrG0n" class="link"><div class="icon nav-icon-wrench"></div><div class="text">projects</div></a></li><li><a href="/music" class="link"><div class="icon nav-icon-piano"></div><div class="text">music</div></a></li><li><a href="/resume.pdf" class="link"><div class="icon nav-icon-address-book"></div><div class="text">resume</div></a></li><li><a href="/" class="link"><div class="icon nav-icon-user"></div><div class="text">about</div></a></li></ul></div></div>')}return buf.join("")}}}),window.require.define({"views/templates/main":function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div class="row-fluid"><div class="span8"><h2>About me!</h2><img src="/images/piotr.png" class="me"/><div class="bio">My name is <b>Piotr Yordanov. </b>I studied electrical and computer engineering, though \nself learning has proven to be much much more rewarding.\nAfter all, software engineering resources are available online!\nI\'ve playing playing the piano since the age of 5. Recently,\nI moved into jazz!<br/>Currently, I am the <b>co-founder </b>of <a href="http://baytbaytak.com">BaytBaytak</a>, a Beirut based real-estate startup.<br/></div></div><div class="span4"><div class="stack"><h2>The Stack</h2>This website is powered by <a href="http://nodejs.org">nodejs </a>on the <b>backend. </b><br/>The <b>frontend </b>is maintained by <a href="http://brunch.io">brunch.io</a>, its logic is handled by <a href="http://backbonejs.org">backbonejs</a>, and the responsive design provided by <a href="http://twitter.github.com/bootstrap/">twitter-bootstrap </a>. All of that written with <a href="http://coffeescript.org">coffeescript </a>from <a href="https://github.com/b4winckler/macvim">macvim </a><div class="logo"><a href="http://nodejs.org" class="node"></a><a href="http://coffeescript.org" class="coffee"></a><a href="https://github.com/b4winckler/macvim" class="vim"></a><a href="http://brunch.io" class="brunch"></a><a href="http://backbonejs.org" class="backbone"></a></div></div></div></div><div class="row-fluid"><div class="span2"><div class="legend"><h2>My Skills:</h2><div class="skills"><ul><li class="zic">Music</li><li class="web">WebDev</li><li class="ai">AI</li><li class="openGL">OpenGL</li></ul></div></div></div><div class="span6"><div id="diagram"></div><div class="get"><div class="arc"><span class="text">Music</span><input type="hidden" value="93" class="percent"/><input type="hidden" value="#BEDBE9" class="color"/></div><div class="arc"><span class="text">WebDev</span><input type="hidden" value="85" class="percent"/><input type="hidden" value="#d6bef6" class="color"/></div><div class="arc"><span class="text">AI</span><input type="hidden" value="50" class="percent"/><input type="hidden" value="#7a5aa6" class="color"/></div><div class="arc"><span class="text">openGL</span><input type="hidden" value="30" class="percent"/><input type="hidden" value="#88B8E6" class="color"/></div></div></div><div class="span4"><div id="twitter"><h2>Latest Tweets</h2><div id="tweets"></div></div></div></div>')}return buf.join("")}}})