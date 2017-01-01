module.exports = {
	template: require('./task-list.html'),
	props:{
		taskStat: {
			type: String,
			required: true
		}
	},
	components: {
		taskDetail: require('./task-detail.js')
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
			this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.tell' + this.taskStat, 'params': getParams(this.taskStat)}}).then((response)=>{
				setTimeout(function(){
					self.getTasks() 
				}, 1000);
				this.tasks = response.data.result;
				//console.log(response.data.result);
			},(response)=>{
				console.log(response.data.error);
			})
		}
	},
}

// TODO:放到 data-format 中
function getParams(taskStat) {
	if(taskStat == 'Active') {
		return;
	}else{
		return btoa('[' + '0,5' + ']')
	}
}