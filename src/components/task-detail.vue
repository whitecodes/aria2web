<template>
    <div id="taskDetail" class="task-detail">
        <div class="task-name">
            {{ taskName }}
        </div>
        <div class="task-info">
            <div class="task-rate">
                {{ rate }}%
            </div>
            <div class="task-speed" v-show="this.taskDetail.status == 'active'">
                <span v-show="this.taskDetail.downloadSpeed > 0">
                    <i class="material-icons speed-icon">keyboard_arrow_down</i>
                    {{ downLoad }}
                </span>
                <span v-show="this.taskDetail.downloadSpeed > 0 && this.taskDetail.uploadSpeed > 0">/</span>
                <span v-show="this.taskDetail.uploadSpeed > 0">
                    <i class="material-icons speed-icon">keyboard_arrow_up</i>
                    {{ upLoad }}
                </span>
                <span v-show="this.taskDetail.downloadSpeed == 0 && this.taskDetail.uploadSpeed == 0 && rate == '100.00'">
                    upload...
                </span>
                <span v-show="this.taskDetail.downloadSpeed == 0 && this.taskDetail.uploadSpeed == 0 && rate != '100.00'">
                    download...
                </span>
                <progress v-bind:value="rate" max="100"></progress>
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
        box-shadow: 2px 2px 3px #888888;
    }

    .task-name{
        padding: 5px 5px 20px 5px;
        background-color: #2196F3;
        word-break:break-all;
    }

    .task-info{
        padding: 5px;
        display: block;
        width: 250px
    }

    .task-rate{
        width: 70px;
        float: left;
    }

    .task-speed{
        display: block;
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