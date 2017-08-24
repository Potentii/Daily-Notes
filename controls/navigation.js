/**
 * Controls the navigation settings
 */
const navigation = (function(){

   /**
    * Represents the navigation settings
    */
   class NavigationConfigurator{

      /**
       * Builds a new NavigationConfigurator
       */
      constructor(){
         /**
          * The Vuejs router reference
          * @private
          * @type {object}
          */
         this._router = null;

         /**
          * The list of routes, as { name, route, model } objects
          * @private
          * @type {Array}
          */
         this._routes = [];

         this._mode = undefined;
      }



      static get MODES(){
         return Object.freeze({
            HISTORY: 'history',
            ABSTRACT: 'abstract',
            HASH: 'hash'
         });
      }



      get MODES(){
         return NavigationConfigurator.MODES;
      }



      navigationMode(mode){
         this._mode = mode;
         return this;
      }



      /**
       * Adds a new route
       * @param  {string} name        The route name
       * @param  {string} route       The route pattern
       * @param  {object} [model={}]  The Vuejs model for this route
       * @return {NavigationConfigurator} This configurator, for method chaining
       */
      addRoute(name, route, model = {}){
         // *Validating the 'route':
         if(typeof route !== 'string' || route.trim().length === 0)
            throw new TypeError('\"route\" must be a not-empty string');

         // *Adding the route:
         this._routes.push({ name, route, model });
         // *Returning this configurator:
         return this;
      }



      /**
       * Signals that the router can be initialized
       * @return {Promise} A promise that resolves when the router gets initialized, or rejects if some error has been thrown
       */
      mountOn(router_wrapper_id = "#app"){
         // *Returning the initialization promise chain:
         return new Promise((resolve, reject) => {
            // *When the DOM gets loaded:
            addEventListener('DOMContentLoaded', () => {
               // *Trying to start the UI:
               try{
                  // *Generating the routes list:
                  const routes_list = this._routes.map(({ name, route, model }) => {
                     return { name, path: route, component: model };
                  });

                  // *Starting the router:
                  const router = new VueRouter({
                     routes: routes_list,
                     mode: this._mode
                  });

                  // *Initializing the UI:
                  const app = new Vue({ router })
                     .$mount(router_wrapper_id);

                  // *Resolving with the router reference:
                  resolve(router);
               } catch(err){
                  // *If some error has been thrown:
                  // *Rejecting with the error:
                  reject(err);
               }
            });
         })
         // *Setting the router reference:
         .then(router => this._router = router);
      }



      /**
       * Retrieves a copy of the routes list
       * @readonly
       * @type {Array}
       */
      get list(){
         return this._routes.concat([]);
      }



      /**
       * Retrieves the Vuejs router reference
       * @readonly
       * @type {object}
       */
      get router(){
         return this._router;
      }

   }



   // *Returning an instance if this configurator:
   return new NavigationConfigurator();
})();
