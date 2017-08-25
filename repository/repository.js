module.exports = class Repository {
   constructor(){}

   parse(json){
      return JSON.parse(json);
   }

   stringify(obj){
      return JSON.stringify(obj);
   }
}
