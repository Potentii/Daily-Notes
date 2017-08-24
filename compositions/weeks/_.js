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
         // *Getting the weeks from the storage:
         let weeks = repositories.get('weeks').load()
            // *Sorting them by date:
            .sort((w1, w2) => w2.days[0].date - w1.days[0].date);

         // *Setting today date:
         const today = new Date();
         today.setHours(0, 0, 0, 0);

         // *Checking if there are any weeks already registered:
         if(!weeks || !weeks.length){
            // *If there aren't:
            // *Creating a new week:
            weeks = [this.createWeekOfDate(today)];
            // *Saving this week:
            repositories.get('weeks').save(weeks);
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
                  weeks.push(this.createWeekOfDate(last_day_of_last_week));
               }
               // *Saving the new weeks array:
               repositories.get('weeks').save(weeks);
            }
         }

         // *Applying the weeks array into the view model:
         this.weeks = weeks;
      },


      createWeekOfDate(date){
         // *Creating a new week object:
         const week = new Week([]);
         // *Getting the first day of this week:
         const week_start_day = date.getDate() - date.getDay();

         // *Adding all the days into this week:
         for(let i=0; i<7; i++){
            const new_day = new Date();
            new_day.setDate(week_start_day + i);
            new_day.setHours(0, 0, 0, 0);
            week.addDay(new Day('', new_day));
         }

         // *Returning the week:
         return week;
      }
   },


   template:
      `
      <ul class="weeks">
         <week :week="week" v-for="week in weeks"/>
      </ul>
      `
});
