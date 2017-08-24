class Week {
   constructor(days) {
      this._days = days || [];
      this.sortDays();
   }

   addDay(day){
      if(!this._days.some(d => d.date.toDateString() === day.date.toDateString())){
         this._days.push(day);
         this.sortDays();
      }
   }

   static parse(json){
      let raw_week = typeof json === 'string' ? JSON.parse(json) : json || {};
      let days = raw_week._days ? raw_week._days.map(day => Day.parse(day)) : [];
      return new Week(days);
   }

   sortDays(){
      this._days.sort((d1, d2) => d2.date - d1.date);
   }

   get days(){
      // TODO Sort the days by date
      return this._days;
   }
}
