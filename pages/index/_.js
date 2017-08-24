navigation.addRoute('index', '/', {

   components: {
      'weeks': components.get('weeks')
   },


   template:
      `
      <div class="index content-page">
         <div class="content-wrapper">
            <div class="-logo">
               Daily notes
            </div>
            <div class="-horizontal-line"/>
            <weeks/>
         </div>
      </div>
      `
});
