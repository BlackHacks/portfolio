$(window).load(function(){
	$(function(){
		$('.container').masonry({
			itemSelector: '.youtube'
		});
	});
	$(function () {
		App = Em.Application.create();

		App.ApplicationController = Em.Controller.extend();
		App.ApplicationView = Em.View.extend({ templateName: 'application' });

		App.NavbarController = Em.Controller.extend();
		App.NavbarView = Em.View.extend({ templateName: 'navbar' });

		App.HomeController = Em.Controller.extend();
		App.HomeView = Em.View.extend({ templateName: 'home' });

		App.StartingMenuController = Em.Controller.extend();
		App.StartingMenuView = Em.View.extend({ templateName: 'getting-started-menu' });

		App.YoutubeController = Em.Controller.extend();
		App.YoutubeView = Em.View.extend({ templateName: 'youtube' });

		App.SoundCloudController = Em.Controller.extend();
		App.SoundCloudView = Em.View.extend({ templateName: 'soundCloud' });

		App.MusicController = Em.Controller.extend();
		App.MusicView = Em.View.extend({ templateName: 'Music' });

		App.Router = Em.Router.extend({
			enableLogging: true,
			location: 'hash',

			root: Em.Route.extend({
				// EVENTS
				gotoHome: Ember.Route.transitionTo('home'),
				gotoMusic: Ember.Route.transitionTo('Music.soundCloud'),

				// STATES
				home: Em.Route.extend({
					route: '/',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('home');
					}
				}),
				Music: Em.Route.extend({
					// SETUP
					route: '/Music',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('Music');
					},
					// EVENTS
					gotoSoundCloud: Ember.Route.transitionTo('soundCloud'),
					gotoYoutube: Ember.Route.transitionTo('youtube'),

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
