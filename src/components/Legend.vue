<template lang =  "pug">   
           
    <div id="legend">          
        <div id="legend-box">
            <div> Next page:</div>
            <div id="imagebox"><img src="../assets/up-down.png" alt=""></div>
            <div><span>Shift</span> + <span>ArrowDown</span></div>
            <div class="eventhandleShiftArrowDown">
              

             <v-btn @mousedown="keep_focus" @click="shift_arrowdown">Shift + ArrowDown</v-btn>
             </div>
        </div>
        <div id="legend-box" class="border-left"> 
            <div> Prev Page:</div>
            <div id="imagebox"><img src="../assets/twoarrow.png" alt=""></div>
            <div> <span>Shift</span> + <span>ArrowUp</span></div>
            <div class="eventhandleShiftArrowUp">
              

             <v-btn @click="shift_arrow_up">Shift + ArrowUp</v-btn>
             </div>
        </div> 
        <div id="legend-box" class="border-left">
            <div> Next Entry:</div> 
            <div id="imagebox"><img src="../assets/arrowdown32.png" alt=""></div> 
            <div> <span>     </span>      <span>ArrowDown</span></div>
            <div class="eventhandleArrowDown">
             <v-btn @mousedown="keep_focus" @click="arrow_down" >ArrowDown</v-btn>
             </div>
        </div>
        <div id="legend-box" class="border-left"> 
            <div> Prev Entry:</div>
            <div id="imagebox"><img src="../assets/arrowup32.png" alt=""></div>
            <div> <span>    </span>   <span>ArrowUp</span></div>
            <div class="eventhandleArrowUp">
              

             <v-btn @click="arrow_up">ArrowUp</v-btn>
             </div>
        </div>
        <div id="legend-box" class="border-left">
            <div>Description:</div>
            <div id="imagebox"><img src="../assets/tab32.png" alt=""></div>
            <div> <span>    </span>   <span>Tab</span></div>
            <div class="eventhandleTab">
              

             <v-btn @click="tab" >Tab</v-btn>
             </div>
        </div>
        <div id="legend-box" class="border-left">
            <div> Enter:</div>
            <div id="imagebox"><img src="../assets/enter.png" alt=""></div>
            <div> <span>    </span>   <span>Enter</span></div>
            <div class="eventhandleEnter">
              
             <v-btn @click="enter">Enter</v-btn>
        </div>
        </div>
        <div id="legend-box" class="border-left">
        <div>Toggledropdown:</div>
            <div id="imagebox"><img src="../assets/pagedown.png" alt=""></div>
            <div> <span>    </span>   <span>PageDown</span></div>

            <div class="eventhandleToggledropDown">
              

             <v-btn @click="page_down">PageDown</v-btn>


    </div>  
        </div> 
    </div>
</template>   


<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Legend",
  methods : {
      keep_focus(e){
          e.preventDefault();
      },
      enter(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
        }));

        //event.preventDefault();
      },
      page_down(){
           var element = document.getElementById("input_box");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'PageDown',
        }));

        //event.preventDefault();
      },
      tab(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Tab',
        }));

       // event.preventDefault();
      },
      shift_arrow_up(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            shiftKey: true,
        }));


      },
      arrow_up(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowUp',
        }));
      },
      arrow_down(event){
           // alert("arown_down");
        var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowDown',
        }));

        event.preventDefault();

      },
      shift_arrowdown(e){

        e.preventDefault();

        //var element = document.getElementById("input_box");
        var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            shiftKey: true
        }));        
    },
    shift_arrowup(){
        alert("shift_arrowup");
    }
}
});
</script>

<style lang="scss" scoped>
    #legend{
        display: flex;  
        bottom: 0;     
        position: absolute;
        margin-bottom: 5px;
        border: 4px solid #4730ca;
        border-radius: 25px;
        height: 200px/10px;
        border-color: grey;
        margin-top:-45px;
        font-size: 8px; 
        padding: 0px 2px;
    }

    div#legend-box div {
        padding: 2px 0px!important;
    }

    div#legend-box {
        padding: 2px 5px;
        text-align: center;
        //width : 115px;
    }

    #legend img {
        width: 32px;
    }

    .border-left {
        border-left: 4px solid grey;
    }

         #legend-box>div{
             padding: 5px;
         }

   
</style>