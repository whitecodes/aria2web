<template>
<tr id="taskDetail">
<!-- TODO:间距分配调整 -->
<!-- 	<td>{{ taskDetail.gid }}</td> -->
	<td style="width: 60%">{{ taskName }}</td>
	<td style="width: 10%">{{ rate }}</td>
	<td style="width: 10%">
		<span v-show="this.taskDetail.downloadSpeed > 0">
			<i class="material-icons speed-icon">keyboard_arrow_down</i>
			{{ downLoad }}
		</span>
		<span v-show="this.taskDetail.downloadSpeed > 0 && this.taskDetail.uploadSpeed > 0">/</span>
		<span v-show="this.taskDetail.uploadSpeed > 0">
			<i class="material-icons speed-icon">keyboard_arrow_up</i>
			{{ upLoad }}
		</span>
	</td>
	<td style="width: 10%">{{ taskDetail.status }}</td>
	<td style="width: 10%">
	<!-- TODO:操作单个任务合并 -->
		<button class="material-icons icon-button" v-on:click="unpauseTask" v-if="taskDetail.status == 'paused'">
			play_circle_outline
		</button>
		<button class="material-icons icon-button" v-on:click="pauseTask" v-else-if="taskDetail.status != 'complete'">
			pause_circle_outline
		</button>
	</td>
	<td style="width: 10%">
		<button class="material-icons icon-button" v-on:click="removeTask">
			remove_circle_outline
		</button>
	</td>
</tr>
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
                return '0.00%'
            }else{
                return (this.taskDetail.completedLength / this.taskDetail.totalLength * 100).toFixed(2) + '%';
            }
        }
    },
}
</script>

<style>
	.speed-icon{
		vertical-align: sub;
	}

	.icon-button{
		background: transparent;
		border: transparent;
	}
</style>