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


   computed: {
      weekends(){
         return this.$store.state.weekends;
      }
   },


   template:
      `
      <div class="week">
         <day v-if="(day.notes || (weekends || day.date.getDay()!=0 && day.date.getDay()!=6)) && day.date < new Date()" :key="day.date.getTime()" :day="day" v-for="day in week.days"/>
      </div>
      `
})
