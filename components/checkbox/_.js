components.add('checkbox', {

   props: {
      'label': {
         type: String,
         required: false,
         default: ''
      },
      'value': {
         type: Boolean,
         required: false,
         default: false
      }
   },


   model: {
      prop: 'value',
      event: 'change'
   },


   mounted(){
      if(this.label)
         this.$refs.label.htmlFor = this.$refs.checkbox.id;
   },


   template:
      `
      <div class="checkbox mdc-form-field">
         <label v-if="label" ref="label">{{ label }}</label>
         <div class="mdc-checkbox">
            <input type="checkbox" :id="_uid" ref="checkbox" @change="$emit('change', value)" v-model="value" class="mdc-checkbox__native-control"/>
            <div class="mdc-checkbox__background">
               <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
               </svg>
               <div class="mdc-checkbox__mixedmark"></div>
            </div>
         </div>
      </div>
      `
});
