components.add('week', {

   components: {
      'day': components.get('day')
   },


   props: {
      'weekends' : {
         type: Boolean,
         required: true
      },
      'week': {
         type: Object,
         required: true
      }
   },


   template:
      `
      <div class="week">
         <day v-show="(day.notes || (weekends || day.date.getDay()!=0 && day.date.getDay()!=6)) && day.date < new Date()" :day="day" v-for="day in week.days"/>
      </div>
      `
})
