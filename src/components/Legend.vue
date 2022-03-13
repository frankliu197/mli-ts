<template lang =  "pug">   
    <div class="legend_container">
        <div>
            <label class="legend-label">Legend</label>
        </div>      
        <div id="legend">          
            <div id="legend-box"> 
                <div>  
                    <div> Next page:</div>
                    <div id="imagebox"><img src="../assets/up-down.png" alt=""></div>
                    <div><span>Shift</span> + <span>ArrowDown</span></div>
                    <a id = 'shiftarrowdown' @mousedown="keep_focus" @click="shift_arrowdown">
                    </a>
                </div>
            </div>
            <div id="legend-box" class="border-left">
                <div>
                    <div> Prev Page:</div>
                    <div id="imagebox"><img src="../assets/twoarrow.png" alt=""></div>
                    <div> <span>Shift</span> + <span>ArrowUp</span></div>
                </div> 
                <a id = 'shiftarrowup' @click="shift_arrow_up"></a>
            </div> 
            <div id="legend-box" class="border-left"> 
                <div>
                    <div> Next Entry:</div> 
                    <div id="imagebox"><img src="../assets/arrowdown32.png" alt=""></div> 
                    <div> <span>     </span>      <span>ArrowDown</span></div>
                </div>
                <a id ='down' @mousedown="keep_focus" @click="arrow_down" ></a>
            </div>
            <div id="legend-box" class="border-left"> 
                <div>
                    <div> Prev Entry:</div>
                    <div id="imagebox"><img src="../assets/arrowup32.png" alt=""></div>
                    <div> <span>    </span>   <span>ArrowUp</span></div>
                </div>
                <a id = 'up' @click="arrow_up"></a>
            </div>
            <div id="legend-box" class="border-left">
                <div>
                    <div>Description:</div>
                    <div id="imagebox"><img src="../assets/tab32.png" alt=""></div>
                    <div> <span>    </span>   <span>Tab</span></div>
                </div>
                <a id = 'tab' @click="tab" ></a>
            </div>
            <div id="legend-box" class="border-left">
                <div>
                    <div> Enter:</div>
                    <div id="imagebox"><img src="../assets/enter.png" alt=""></div> 
                    <div> <span>    </span>   <span>Enter</span></div>
                </div>
                <a id ='enter' @click="enter"></a>
            </div>
            <div id="legend-box" class="border-left"> 
                <div>
                    <div>Toggledropdown:</div>
                    <div id="imagebox"><img src="../assets/pagedown.png" alt=""></div>
                    <div> <span>    </span>   <span>PageDown</span></div>
                </div>
                <a id = 'pagedown' @click="page_down"></a>
            </div> 
        </div>
    </div>
    
</template>   


<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Legend",
  methods : {
      keep_focus(e:any){
          e.preventDefault();
      },
      enter(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
        }));

         
      },
      page_down(){
           var element = document.getElementById("input_box");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'PageDown',
        }));

        
      },
      tab(){
           var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Tab',
        }));

       
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
      arrow_down(event:any){ 
           
        var element = document.getElementById("suggest_dropdown");

        element?.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowDown',
        }));

        event.preventDefault();

      },

      shift_arrowdown(e:any){

        e.preventDefault();

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
        margin-bottom: 5px;
        border: 4px solid #4730ca;
        border-radius: 25px;
        height: 200px/10px;
        border-color: grey;
        font-size: 8.5px; 
        padding: 0px 2px;
        font-family: arial;
        margin: 10px;
        background-color: white;
    }

    .legend_container {
        bottom: 0;
        position: absolute;
    }

    div#legend-box div {
        padding: 2px 0px!important;
    }
    div#legend-box a {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    div#legend-box {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1px 4px;
        position: relative;
        text-align: center;
    }

    #legend img {
        width: 32px;
    }

    label.legend-label {
        font-size: 12px;
        padding-left: 12px;
        font-family: arial;
        color: white;
        
    }

    .border-left {
        border-left: 4px solid grey;
    }

         #legend-box>div{
             padding: 5px;
         } 

   
</style> 