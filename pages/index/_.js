navigation.addRoute('index', '/', {

   components: {
      'checkbox': components.get('checkbox'),
      'weeks': components.get('weeks'),
      'custom-header': components.get('custom-header')
   },


   data(){
      return {
         project_name: 'Daily Notes',
         show_more_menu: false
      }
   },


   computed: {
      weekends: {
         get(){
            return this.$store.state.weekends;
         },
         set(val){
            this.$store.commit('showWeekends', val);
         }
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
            <span class="-project-title">{{ project_name }}</span>
            <button type="button" ref="menu_fab" class="project-more-fab mdc-fab material-icons" aria-label="More" @click="show_more_menu = !show_more_menu">more_vert</button>
            <ul class="project-more-menu" ref="menu" v-show="show_more_menu">
               <checkbox title="Show weekends" label="Weekends" v-model="weekends"></checkbox>
            </ul>
         </custom-header>
         <div class="content-wrapper">
            <weeks/>
         </div>
      </div>
      `
});
