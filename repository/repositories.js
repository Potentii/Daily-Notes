const repositories = (function(){



   const repos = new Map([
      ['weeks', {
         parse: (json) => {
            const weeks = json ? JSON.parse(json) : [];
            return weeks.map(week => Week.parse(week));
         },
         stringify: (obj) => JSON.stringify(obj)
      }]
   ]);



   function get(repository_name){
      return {
         load(){
            return repos.get(repository_name).parse(localStorage.getItem(repository_name) || '');
         },

         save(obj){
            console.log(obj);
            localStorage.setItem(repository_name, repos.get(repository_name).stringify(obj));
         }
      }
   }



   return { get };
})();
