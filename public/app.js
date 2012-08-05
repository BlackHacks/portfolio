$(window).load(function(){
	$(function () {
		App = Em.Application.create();

		App.ApplicationController = Em.Controller.extend();
		App.ApplicationView = Em.View.extend({ templateName: 'application' });

		App.NavbarController = Em.Controller.extend();
		App.NavbarView = Em.View.extend({ templateName: 'navbar' });

		App.HomeController = Em.Controller.extend();
		App.HomeView = Em.View.extend({ templateName: 'home' });

		App.TestController = Em.Controller.extend();
		App.TestView = Em.View.extend({ templateName: 'test' });

		App.Router = Em.Router.extend({
			enableLogging: true,
			location: 'hash',

			root: Em.Route.extend({
				// EVENTS
				gotoHome: Ember.Route.transitionTo('home'),
				gotoTest: Ember.Route.transitionTo('test'),

				// STATES
				home: Em.Route.extend({
					route: '/',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('home');
					}
				}),
				test: Em.Route.extend({
					route: '/test',
					connectOutlets: function (router, context) {
						router.get('applicationController').connectOutlet('test');
					}
				})
			})
		});
		App.initialize();
	});
});//]]>  
