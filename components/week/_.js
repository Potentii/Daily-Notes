components.add('week', {

   components: {
      'day': components.get('day')
   },


   props: {
      'week': {
         type: Object,
         required: true
      }
   },




   template:
      `
      <div class="week">
         <day :day="day" v-for="day in week.days"/>
      </div>
      `
})
