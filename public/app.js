function tweet(){
	$('#tweets').jTweetsAnywhere({
			username: 'yordaKhof',
			count: 5,
			showTweetFeed: {
					showProfileImages: true,
					showUserScreenNames: true,
					showUserFullNames: true,
					showActionReply: true,
					showActionRetweet: true,
					showActionFavorite: true
			},
			tweetTimestampDecorator: function(tweet, options){
				var screenName = tweet.user ? tweet.user.screen_name : false || tweet.from_user;
				var date = new Date(formatDate(tweet.created_at));

				var dateString =
					date.getHours() + ':' +
					(date.getMinutes() < 10 ? '0' : '') +
					date.getMinutes() + ' ' +
					(date.getMonth() + 1) + '/' +
					date.getDate() + '/' +
					date.getFullYear();

				var html =
					'<span class="jta-tweet-timestamp"> "' +
					'<a class="jta-tweet-timestamp-link" href="http://twitter.com/' +
					screenName + '/status/' + tweet.id + '">' +
					dateString + '</a></span>';

				return html;
			}
	});
}
$(window).load(function(){
	$(function () {
		App = Em.Application.create();

		App.ApplicationController = Em.Controller.extend();
		App.ApplicationView = Em.View.extend({ templateName: 'application' });

		App.HomeController = Em.Controller.extend();
		App.HomeView = Em.View.extend({
			templateName: 'home',
			didInsertElement: function() {
				tweet();
				o.init();
			}
		});

		App.AboutController = Em.Controller.extend();
		App.AboutView = Em.View.extend({ templateName: 'about' });

		App.PortfolioController = Em.Controller.extend();
		App.PortfolioView = Em.View.extend({ templateName: 'portfolio' });

		App.MusicController = Em.Controller.extend();
		App.MusicView = Em.View.extend({ templateName: 'Music' });

		App.MusicMenuController = Em.Controller.extend();
		App.MusicMenuView = Em.View.extend({ templateName: 'music-menu' });

		App.YoutubeController = Em.Controller.extend();
		App.YoutubeView = Em.View.extend({ templateName: 'youtube' });

		App.SoundCloudController = Em.Controller.extend();
		App.SoundCloudView = Em.View.extend({ templateName: 'soundCloud' });

		App.Router = Em.Router.extend({
			enableLogging: true,
			location: 'hash',

			root: Em.Route.extend({
				gotoHome: Ember.Route.transitionTo('home'),
				gotoMusic: Ember.Route.transitionTo('music'),
				gotoPortfolio: Ember.Route.transitionTo('portfolio'),
				gotoAbout: Ember.Route.transitionTo('about'),

				// STATES
        index: Ember.Route.extend({
                route: '/',
                redirectsTo: 'home'
            }),
				// STATES
				home: Em.Route.extend({
					route: '/',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('home');
					}
				}),
				portfolio: Em.Route.extend({
					route: '/portfolio',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('portfolio');
					}
				}),
				about: Em.Route.extend({
					route: '/about',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('about');
					}
				}),
				music: Em.Route.extend({
					// SETUP
					route: '/Music',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('music');
					},
					// EVENTS
					gotoSoundCloud: Ember.Route.transitionTo('soundCloud'),
					gotoYoutube: Ember.Route.transitionTo('youtube'),

					music: Em.Route.extend({
							route: '/music',
							connectOutlets: function (router, context) {
									router.get('applicationController').connectOutlet('Music');
							} 
					}),
					soundCloud: Em.Route.extend({
							route: '/soundCloud',
							connectOutlets: function (router, context) {
									router.get('applicationController').connectOutlet('soundCloud');
							} 
					}),
					youtube: Em.Route.extend({
							route: '/youtube',
							connectOutlets: function (router, context) {
									router.get('applicationController').connectOutlet('youtube');
							} 
					})
				})
			})
		});
		App.initialize();
	});
});//]]>  
