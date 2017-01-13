<template>
  <transition name="modal-add">
    <div class="modal-mask box">
      <div class="modal-wrapper">
        <div class="modal-container align-center">
          <h3>
            Add Task
          </h3>	
          <div>
            <table>
              <tr>
                <td colspan="3">
                  <input class="input-default" id="task-url" type="text" v-model="taskUrl" />
                </td>
                <td>
                  <button class="button-default">UPLOAD</button>
                </td>
              </tr>
              <!-- <tr>
                <td>
                  <label class="label-default" for="file-name">File Name:</label>
                </td>
                <td colspan="3">
                  <input class="input-default" id="file-name" type="text"/>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="label-default" for="file-dir">File Dir:</label>
                </td>
                <td colspan="3">
                  <input class="input-default" id="file-dir" type="text"/>
                </td>
              </tr> -->
            </table>
            <div class="model-foot">
              <button class="button-primary" @click="addTask">
                Add
              </button>
              <button class="button-cancle" @click="$emit('close')">
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
 module.exports = {
  name: 'addTask',
  data: function() {
    return {
      taskUrl: ''
    }
  },
  methods: {
    addTask: function() {
      this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web','method': 'aria2.addUri', 'params': btoa('[[\"' + this.taskUrl + '\"]]') }}).then((response)=>{
        console.log(response.data.result);
      },(response)=>{
        console.log(response.data);
      })
      this.$emit('close');
    }
  }
}
</script>

<style type="text/css">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    /*width: 250px;
    height: 300px;*/
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-model-foot {
    padding: 5px;
    text-align: center;
  }



  .label-default {
    font-size: 1.5em;
  }

  .input-default {
    font-size:1.5em;
    height: 34px;
    width: 100%;
    border-radius: 3px;
    border: 1px solid transparent;
    border-top: none;
    border-bottom: 1px solid #DDD;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  }

  .button-default {
    padding: 8px 32px;
    border-radius: 3px;
    font-size: 20px;
    isplay: inline-block;
    text-align: center;
    background-color: white;
    color: black;
  }

  .button-default:hover {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24), 0 2px 4px 0 rgba(0,0,0,0.19);
  }

  .button-primary {
    padding: 8px 32px;
    border-radius: 3px;
    font-size: 20px;
    display: inline-block;
    text-align: center;
    background-color: white;
    color: black;
    border: 2px solid #03A9F4; 
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
  }

  .button-primary:hover {
    background-color: #03A9F4; 
    color: white;
  }

  .button-cancle {
    padding: 8px 32px;
    border-radius: 3px;
    font-size: 20px;
    display: inline-block;
    text-align: center;
    background-color: white;
    color: black;
    border: 2px solid #607D8B; 
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
  }

  .button-cancle:hover {
    background-color: #607D8B; 
    color: white;
  }

  .modal-add-enter {
    opacity: 0;
  }

  .modal-add-leave-active {
    opacity: 0;
  }

  .modal-add-enter .modal-container,
  .modal-add-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  } 
</style>