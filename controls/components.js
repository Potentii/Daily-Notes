/**
 * Controls the components references
 */
const components = (function(){

   /**
    * Represents a set of components
    */
   class ComponentsConfigurator{

      /**
       * Builds a new ComponentsConfigurator
       */
      constructor(){
         /**
          * The list of components
          *  Key: The component's name
          *  Value: The component's Vuejs model object
          * @type {Map}
          */
         this._components = new Map();
      }



      /**
       * Registers a new component
       * @param  {string} name            The component name
       * @param  {object} [model={}]      The Vuejs model of this component
       * @return {ComponentsConfigurator} This configurator, for method chaining
       */
      add(name, model = {}){
         // *Adding the component:
         this._components.set(name, model);
         // *Returning this configurator:
         return this;
      }



      /**
       * Retrieves a registered component's Vuejs model object, given its name
       * @param  {string} name The component name
       * @return {object}      The component model, if it could be found, null otherwise
       */
      get(name){
         // *Checking if the component exists:
         if(this._components.has(name)){
            // *If it does:
            // *Returning the component model:
            return this._components.get(name);
         } else{
            // *If it doesn't:
            // *Returning null:
            return null;
         }
      }



      /**
       * Retrieves a copy of the components list, as { name, model } objects
       * @readonly
       * @type {Array}
       */
      get list(){
         // *Declaring the list:
         let resources = [];
         // *Filling the list:
         this._components.forEach((v, k) => resources.push({ name: k, model: v }));
         // *Returning the list:
         return resources;
      }

   }



   // *Returning an instance if this configurator:
   return new ComponentsConfigurator();
})();
