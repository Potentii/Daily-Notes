navigation.addRoute('index', '/', {

   components: {
      'checkbox': components.get('checkbox'),
      'weeks': components.get('weeks'),
      'custom-header': components.get('custom-header')
   },


   data(){
      return {
         project_name: 'Daily Notes',
         show_weekends: true,
         show_more_menu: false
      }
   },


   mounted(){
      MDCRipple.attachTo(document.querySelector('.mdc-fab'));
   },


   methods: {
      onRootClick(e){
         if(this.show_more_menu === true
            && this.$refs.menu_fab != e.target
            && !this.$refs.menu.contains(e.target))
            this.show_more_menu = false;

      }
   },

   template:
      `
      <div class="index content-page" @click="onRootClick">
         <custom-header>
            <input type="text" class="-project-title" v-model="project_name"/>
            <button type="button" ref="menu_fab" class="project-more-fab mdc-fab material-icons" aria-label="More" @click="show_more_menu = !show_more_menu">more_vert</button>
            <ul class="project-more-menu" ref="menu" v-show="show_more_menu">
               <checkbox title="Show weekends" label="Weekends" v-model="show_weekends"></checkbox>
            </ul>
         </custom-header>
         <div class="content-wrapper">
            <weeks :weekends="show_weekends"/>
         </div>
      </div>
      `
});
