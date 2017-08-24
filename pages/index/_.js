navigation.addRoute('index', '/', {

   components: {
      'weeks': components.get('weeks')
   },


   template:
      `
      <div class="index content-page">
         <div class="content-wrapper">
            <weeks/>
         </div>
      </div>
      `
});
