<template>
	<div id="taskList"  class="task-list">
		<template v-for="(task, index) in tasks">
			<task-detail v-bind:task-detail="task"></task-detail>
		</template>
	</div>
</template>

<script type="text/javascript">
	module.exports = {
		name:'taskList',
		props:{
			taskStat: {
				type: String,
				required: true
			}
		},
		components: {
			taskDetail: require('./task-detail.vue')
		},
		data: function(){
			return {
				tasks: [{
					bitfield: '',
					bittorrent: {
						announceList: [[]],
						comment: '',
						creationDate: '',
						info: {
							name: ''
						},
						mode: ''
					},
					completedLength:'',
					connections:'',
					dir:'',
					downloadSpeed:'',
					files: [{
						completedLength: '',
						index: '',
						length: '',
						path: '',
						selected: '',
						uris: []
					}],
					gid: '',
					infoHash: '',
					numPieces: '',
					numSeeders: '',
					pieceLength: '',
					seeder: '',
					status: '',
					totalLength: '',
					uploadLenght: '',
					uploadSpeed: ''
				}]
			}
		},
		mounted: function() {
			this.getTasks();
		},
		methods: {
			getTasks: function() {
				var self = this;
				this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.tell' + this.taskStat, 'params': this.getParams(this.taskStat)}}).then((response)=>{
					setTimeout(function(){
						self.getTasks() 
					}, 1000);
					this.tasks = response.data.result;
					//console.log(response.data.result);
				},(response)=>{
					console.log(response.data.error);
				})
			},
			// TODO:考虑 Paramsde 的格式化放到 data-format 中
			getParams: function(taskStat) {
				if(taskStat == 'Active') {
					return;
				}else{
					return btoa('[' + '0,10' + ']')
				}
			}
		}
	}
</script>

<style type="text/css">
	.task-list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		padding: 0px;
	}

</style>