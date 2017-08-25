const Repository = require('./repository');

module.exports = class WeeksRepository extends Repository {
   constructor(){
      super();
   }

   parse(json){
      const weeks = json ? JSON.parse(json) : [];
      return weeks.map(week => Week.parse(week));
   }
}
