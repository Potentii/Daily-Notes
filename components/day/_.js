const WEEKDAYS = new Map([
   ['pt-BR', ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']],
   ['en-US', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']]
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
         editing: false
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

         const weeks = repositories.get('weeks').load();
         for(let week of weeks) {
            let day = week.days.find(day => day.date.toString() === this.day.date.toString());
            if(day) day.notes = this.notes_md;
         }
         repositories.get('weeks').save(weeks);
      }
   },


   template:
      `
      <div class="day" :class="{ '-today':(day.date.toDateString() === new Date().toDateString())  }">
         <span class="-weekday-name">{{ WEEKDAYS.get('en-US')[day.date.getDay()] }}</span>
         <span class="-date">{{ day.date.toLocaleDateString('pt-BR') }}</span>
         <div
            contenteditable="true"
            class="-editor"
            :class="{ '-editing':editing }"
            @focus="onNotesFocus($event)"
            @blur="onNotesBlur($event)"
            v-html="editing ? notes_md : notes_html"/>
      </div>
      `
});
