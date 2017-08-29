navigation.addRoute('index', '/', {

   components: {
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


   methods: {
      onRootClick(e){
         if(this.show_more_menu === true
            && this.$refs.menu_button != e.target
            && !this.$refs.menu.contains(e.target))
            this.show_more_menu = false;

      }
   },

   template:
      `
      <div class="index content-page" @click="onRootClick">
         <custom-header>
            <input type="text" class="-project-title" v-model="project_name"/>
            <button class="project-more-button material-icons fab" ref="menu_button" type="button" @click="show_more_menu = true">more_vert</button>
            <ul class="project-more-menu" ref="menu" v-show="show_more_menu">
               <li><span>Show weekends</span><input type="checkbox" v-model="show_weekends"/></li>
               <li><span>Show</span><input type="checkbox" v-model="show_weekends"/></li>
            </ul>
         </custom-header>
         <div class="content-wrapper">
            <weeks/>
         </div>
      </div>
      `
});
