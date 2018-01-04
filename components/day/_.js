const WEEKDAYS_ABBR = new Map([
   ['pt-BR', ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']],
   ['en-US', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']]
]);

const MONTHS_ABBR = new Map([
   ['pt-BR', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']],
   ['en-US', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']]
]);

const marked = require('marked');
marked.setOptions({
   breaks: true,
   sanitize: false
});

components.add('day', {

   props: {
      'day': {
         type: Object,
         required: true
      }
   },


   data(){
      return {
         notes_md: undefined,
         notes_html: undefined,
         editing: false,
         WEEKDAYS_ABBR,
         MONTHS_ABBR
      }
   },


   mounted(){
      if(!this.day.notes){
         this.notes_md = '';
         this.saveNotes();
      } else{
         this.notes_md = this.day.notes;
      }
      this.updateNotesHTML();
   },

   watch: {
      notes_md(new_val, old_val){
         if(new_val !== old_val)
            this.saveNotes();
      }
   },


   methods: {
      onNotesFocus(e){
         this.editing = true;
      },

      onNotesBlur(e){
         this.editing = false;
         this.notes_md = e.target.innerText;
         this.updateNotesHTML();
      },

      updateNotesHTML(){
         this.notes_html = marked(this.notes_md);
      },

      saveNotes(){
         if(this.day.notes === this.notes_md) return;

         const repository = require('./repository/offline');

         repository.load('weeks')
            .then(weeks => {

               for(let week of weeks) {
                  let day = week.days.find(day => day.date.toString() === this.day.date.toString());
                  if(day) day.notes = this.notes_md;
               }

               return repository.save('weeks', weeks);
            })
            .catch(console.error);
      },

      pad10(v){
         return v<10?'0'+v:''+v;
      }

   },


   template:
      `
      <div class="day" :class="{ '-today':(day.date.toDateString() === new Date().toDateString())  }">
         <div class="-date">
            <span class="-weekday">{{ WEEKDAYS_ABBR.get('en-US')[day.date.getDay()] }}</span>
            <span class="-day">{{ pad10(day.date.getDate()) }}</span>
            <span class="-month">{{ MONTHS_ABBR.get('en-US')[day.date.getMonth()] }}</span>
         </div>
         <div class="-content"><div
               contenteditable="true"
               class="-editor"
               :class="{ '-editing':editing }"
               @focus="onNotesFocus($event)"
               @blur="onNotesBlur($event)"
               v-html="editing ? notes_md : notes_html"/></div>
      </div>
      `
});
