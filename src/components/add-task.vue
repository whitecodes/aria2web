<template>
  <transition name="modal-add">
  <div class="modal-mask box">
      <div class="modal-wrapper">
        <div class="modal-container align-center">
          <h3>
            Add Task
          </h3>	
          <div class='btn-group h4'>
            <button class='btn-before btn-blue'>URL：</button><input type='text' v-model="taskUrl" /><button class='btn-after btn-blue'>UPLOAD</button>
          </div>
          <div class="btn-group h4">
            <button class='btn-before btn-blue'>File Name：</button><input type='text'/>
          </div>
          <div class='btn-group h4'>
            <button class="btn btn-sm btn-gray mb1em float-right" @click="$emit('close')">
              Cancle
            </button>
            <button class="btn btn-sm btnl-blue mb1em float-right" @click="addTask">
              Add
            </button>
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
    /*width: 500px;
    height: 300px;*/
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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