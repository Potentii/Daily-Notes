class Day {
   constructor(notes, date) {
      this._notes = notes || '';
      this._date = date || new Date();
   }

   static parse(json){
      let raw_day = typeof json === 'string' ? JSON.parse(json) : json || {};
      return new Day(raw_day._notes, new Date(raw_day._date));
   }

   get notes(){
      return this._notes;
   }
   set notes(notes){
      this._notes = notes;
   }
   get date(){
      return this._date;
   }
}
