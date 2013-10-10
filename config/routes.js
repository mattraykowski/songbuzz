/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  '/' : {
    controller : 'home'
  },

  '/login' : {
    controller : 'auth',
    action     : 'index'
  },

  '/logout' : {
    controller : 'auth',
    action     : 'logout'
  },


  // The Playlist Controller
  'get /playlist/:id': {
    controller: 'playlist',
    action: 'find',
  },
  'post /playlist': {
    controller: 'playlist',
    action: 'create'
  },
  'put /playlist/:id': {
    controller: 'playlist',
    action: 'update'
  },
  'delete /playlist/:id': {
    controller: 'playlist',
    action: 'update'
  },
  'get /playlist': {
    controller: 'playlist',
    action: 'index'
  },

  /**
   * People controller actions.
   */
  'get /people': {
    controller: 'people',
    action: 'index'
  },
  'get /people/:id': {
    controller: 'people',
    action: 'find'
  }

};

