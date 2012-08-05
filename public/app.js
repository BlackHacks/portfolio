$(window).load(function(){
	$(function () {
		App = Em.Application.create();

		App.ApplicationController = Em.Controller.extend();
		App.ApplicationView = Em.View.extend({ templateName: 'application' });

		App.NavbarController = Em.Controller.extend();
		App.NavbarView = Em.View.extend({ templateName: 'navbar' });

		App.HomeController = Em.Controller.extend();
		App.HomeView = Em.View.extend({ templateName: 'home' });

		App.MusicController = Em.Controller.extend();
		App.MusicView = Em.View.extend({ templateName: 'Music' });

		App.Router = Em.Router.extend({
			enableLogging: true,
			location: 'hash',

			root: Em.Route.extend({
				// EVENTS
				gotoHome: Ember.Route.transitionTo('home'),
				gotoMusic: Ember.Route.transitionTo('Music'),

				// STATES
				home: Em.Route.extend({
					route: '/',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('home');
					}
				}),
				Music: Em.Route.extend({
					route: '/Music',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('Music');
					}
				})
			})
		});
		App.initialize();
	});
});//]]>  
