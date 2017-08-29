components.add('weeks', {

   components: {
      'week': components.get('week')
   },


   data(){
      return {
         weeks: []
      };
   },


   mounted(){
      // *Loading the component:
      this.load();
   },


   methods: {
      /**
       * Loads this component
       */
      load(){

         const repository = require('./repository/offline');

         // *Getting the weeks from the repository:
         repository.load('weeks')
            .then(weeks => {
               // *Sorting the weeks by date:
               weeks.sort((w1, w2) => w2.days[0].date - w1.days[0].date);

               // *Setting today date:
               const today = new Date();
               today.setHours(0, 0, 0, 0);

               // *Checking if there are any weeks already registered:
               if(!weeks || !weeks.length){
                  // *If there aren't:
                  // *Creating a new week:
                  weeks = [this.createWeekOfDate(today)];
                  // *Saving this week:
                  return repository.save('weeks', weeks)
                     .then(_ => weeks);
               } else{
                  // *If there are:
                  // *Getting the last day of the last registered week:
                  let last_day_of_last_week = new Date(weeks[0].days[0].date);
                  // *Checking if the last registered week is the current one:
                  if(last_day_of_last_week < today){
                     // *If it isn't:
                     // *Creating all the weeks needed:
                     while(last_day_of_last_week < today){
                        last_day_of_last_week.setDate(last_day_of_last_week.getDate() + 7);
                        weeks.unshift(this.createWeekOfDate(last_day_of_last_week));
                     }
                     // *Saving the new weeks array:
                     return repository.save('weeks', weeks)
                        .then(_ => weeks);
                  }
               }
               return weeks;
            })

            // *Applying the weeks array into the view:
            .then(weeks => this.weeks = weeks)
            .catch(console.error);
      },



      createWeekOfDate(date){
         // *Creating a new week object:
         const week = new Week([]);
         // *Getting the first day of this week:
         const last_sunday = this.getLastSunday(date);

         // *Adding all the days into this week:
         for(let i=0; i<7; i++){
            const new_day = new Date();
            new_day.setDate(last_sunday.getDate() + i);
            new_day.setHours(0, 0, 0, 0);
            week.addDay(new Day('', new_day));
         }

         // *Returning the week:
         return week;
      },



      getLastSunday(date){
         var sunday = new Date(date);
         sunday.setDate(sunday.getDate() - sunday.getDay());
         return sunday;
      }
   },


   template:
      `
      <ul class="weeks">
         <week :week="week" v-for="week in weeks"/>
      </ul>
      `
});
