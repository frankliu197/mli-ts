<template lang =  "pug"> 
           
    <div id="legend">           
        <div id="legend-box">
            <div> Next page:</div>
            <div id="imagebox"><img src="../assets/up-down.png" alt=""></div>
            <div><span>Shift</span> + <span>ArrowDown</span></div>
        </div>
        <div id="legend-box" class="border-left">
            <div> Prev Page:</div>
            <div id="imagebox"><img src="../assets/twoarrow.png" alt=""></div>
            <div> <span>Shift</span> + <span>ArrowUp</span></div>
        </div> 
        <div id="legend-box" class="border-left">
            <div> Next Entry:</div> 
            <div id="imagebox"><img src="../assets/arrowdown32.png" alt=""></div> 
            <div> <span>     </span>      <span>ArrowDown</span></div>
        </div>
        <div id="legend-box" class="border-left"> 
            <div> Prev Entry:</div>
            <div id="imagebox"><img src="../assets/arrowup32.png" alt=""></div>
            <div> <span>    </span>   <span>ArrowUp</span></div>
        </div>
        <div id="legend-box" class="border-left">
            <div>Description:</div>
            <div id="imagebox"><img src="../assets/tab32.png" alt=""></div>
            <div> <span>    </span>   <span>Tab</span></div>
        </div>
        <div id="legend-box" class="border-left">
            <div> Enter:</div>
            <div id="imagebox"><img src="../assets/enter.png" alt=""></div>
            <div> <span>    </span>   <span>Enter</span></div>
        </div>
        <div id="legend-box" class="border-left">
        <div>Toggledropdown:</div>
            <div id="imagebox"><img src="../assets/pagedown.png" alt=""></div>
            <div> <span>    </span>   <span>PageDown</span></div> 
        </div> 
    </div>
</template>   

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Legend"
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

