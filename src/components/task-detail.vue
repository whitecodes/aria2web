<template>
    <div id="taskDetail" class="task-detail">
        <div class="task-name">
            {{ taskName }}
        </div>
        <div class="task-info">
            <div class="progress" v-bind:style="{width: rate+'%'}">
            </div>
            <div class="task-speed" v-show="this.taskDetail.status == 'active'">
                <span>
                    {{ rate }}%
                </span>
                <span v-show="this.taskDetail.downloadSpeed > 0">
                    <i class="material-icons speed-icon">keyboard_arrow_down</i>
                    {{ downLoad }}
                </span>
                <span v-show="this.taskDetail.uploadSpeed > 0">
                    <i class="material-icons speed-icon">keyboard_arrow_up</i>
                    {{ upLoad }}
                </span>
            </div>  
        </div>
        <div class="task-control">
            <button class="material-icons icon-button" v-on:click="unpauseTask" v-if="taskDetail.status == 'paused'">
                play_circle_outline
            </button>
            <button class="material-icons icon-button" v-on:click="pauseTask" v-else-if="taskDetail.status == 'active'">
                pause_circle_outline
            </button>
            <button class="material-icons icon-button" v-on:click="removeTask">
                remove_circle_outline
            </button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import format from './data-format.js'
    console.log('error')

    module.exports = {
        name: 'taskDetail',
        props: {
            taskDetail: {
                type: Object,
                required: true
            }
        },
        methods: {
            pauseTask: function() {
                this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web','method': 'aria2.pause', 'params': btoa('[\"' + this.taskDetail.gid + '\"]') }}).then((response)=>{
                //console.log(this.taskDetail.gid);
            },(response)=>{
                console.log(response);
            })
            },
            unpauseTask: function() {
                this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web','method': 'aria2.unpause', 'params': btoa('[\"' + this.taskDetail.gid + '\"]') }}).then((response)=>{
                // 
            },(response)=>{
                console.log(response);
            })
            },
            removeTask: function() {
                this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web','method': 'aria2.remove', 'params': btoa('[\"' + this.taskDetail.gid + '\"]') }}).then((response)=>{
                // 
            },(response)=>{
                console.log(response);
            })
            }
        },
        computed: {
            taskName: function() {
                if(this.taskDetail.bittorrent && this.taskDetail.bittorrent.info) {
                    return format.fileNameFormat(this.taskDetail.bittorrent.info.name);
                }else if(this.taskDetail.files) {
                    return format.fileNameFormat(this.taskDetail.files[0].path);
                }
            },
            downLoad: function() {
                return format.speedFormat(this.taskDetail.downloadSpeed);
            },
            upLoad: function() {  
                return format.speedFormat(this.taskDetail.uploadSpeed);
            },
            rate: function() {
                if(this.taskDetail.totalLength == 0){
                    return '0.00'
                }else{
                    return (this.taskDetail.completedLength / this.taskDetail.totalLength * 100).toFixed(2);
                }
            }
        },
    }
</script>

<style>
    .task-detail{
        display: block;
        margin: 5px;
        width: 250px;
        box-shadow: 2px 2px 3px #424242;
    }

    .task-name{
        padding: 5px 5px 5px 5px;
        background-color: #0D47A1;
        color: #E0E0E0;
        word-break:break-all;
        height: 100px;
    }


    .task-info{
        /*padding: 5px;*/
        position:relative;
        display: block;
        width: 100%;
        background-color:#9E9E9E;
        text-align: right;

    }

    .progress{
        position:relative;
        height: 34px;
        background: #FF5722;    
        z-index: 1;
    }

    .task-rate{
        width: 70px;
        float: left;
    }

    .task-speed{
        position:absolute;
        top: 0px;
        display: block;
        padding:5px;  
        z-index:2;   
    }

    .task-control{
        width: 250px;
        text-align: center;
    }

    .speed-icon{
      vertical-align: sub;
  }

  .icon-button{
      background: transparent;
      border: transparent;
      display:inline-block;
  }
</style>