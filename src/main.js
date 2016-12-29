import Vue from 'vue'
import VueResource from 'vue-resource'
import Chart from 'chart.js'

import format from './components/speed-format.js'

Vue.config.debug = true;

Vue.use(VueResource)

var rpcUrl = 'http://localhost:6800/jsonrpc'; // TODO: it will to setted by user
var rpcParam = '';// TODO: 相同的参数
var info = {
	globalStat: {
		downloadSpeed: '0',
		uploadSpeed: '0',
		numActive: '0',
		numWaiting: '0',
		numStopped: '0',
		numStoppedTotal: '0',
	},
	version: 'unknow'
};
var downLoadSpeedList=[];
var upLoadSpeedList=[];
var counter=[];
var taskList={
	active: [{
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
	}], 
	wating: [{
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
	}], 
	stopped: [{
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
};

new Vue({
	el: '#app',
	data: info,
	mounted: function() {
		this.getVersion();
		this.getGlobalSpeed();
	},
	methods: {
		getVersion: function() {
			// TODO: what should i do about set "rpc-secret"
			this.$http.get(rpcUrl, {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.getVersion'}}).then((response)=>{
				info.version = response.data.result.version;
			},(response)=>{
				info.version = 'unknow';
				console.log('error')
			})
		},
		getGlobalSpeed: function() {
			var self = this;
			self.$http.get(rpcUrl, {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.getGlobalStat'}}).then((response)=>{
				setTimeout(function(){
					self.getGlobalSpeed() 
				}, 1000);
				info.globalStat = response.data.result;
				downLoadSpeedList.push(info.globalStat.downloadSpeed); //TODO: maybe there a problem with data add too much
				upLoadSpeedList.push(info.globalStat.uploadSpeed);
				counter.push(counter.length);
				//chart.update();
				// console.log(response.data.result);
			},(response)=>{
				console.log('error')
			})
		},
		//TODO：add task
		addTask: function() {
			this.$http.get(rpcUrl, {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.add', 'params': ''}}).then((response)=>{
				console.log(response.data.result);
			},(response)=>{
				console.log(response);
			})
		}
	},
	computed: {
		downLoad: function() {
			return format.speedFormat(info.globalStat.downloadSpeed);
		},
		upLoad: function() {  
			return format.speedFormat(info.globalStat.uploadSpeed);
		}
	},
	// watch: {
	// 	downloadSpeed: function() {

	// 	}
	// }
});

// TODO:这个要组件化
new Vue({
	el: '#activeTasks',
	data: taskList,
	components: {
		taskDetail: require('./components/task-detail.js')
	},
	mounted: function() {
		this.getActionTask();
	},
	methods: {
		getActionTask: function() {
			var self = this;
			this.$http.get(rpcUrl, {params: {'jsonrpc': '2.0', 'id': 'aria2web', 'method': 'aria2.tellActive'}}).then((response)=>{
				setTimeout(function(){
					self.getActionTask() 
				}, 1000);
				taskList.active=response.data.result;
				//console.log(response.data.result);
			},(response)=>{
				console.log(response.data.error);
			})
		},
	},
});

// fetch canvas DOM element
let canvas = document.getElementById("canvas");
// init chart.js
var chart = new Chart(canvas, {
	type: 'line',
	data: {
		labels: counter,
		datasets: [{
			fill: false,
			backgroundColor: "rgba(0,255,0,0.4)",
			borderColor: "rgba(0,255,0,1)",
			yAxisID: "y-axis-0",
			data: downLoadSpeedList,
			radius: 0 // data point dons't display
		},{
			fill: false,
			backgroundColor: "rgba(255,255,0,0.4)",
			borderColor: "rgba(255,255,0,1)",
			yAxisID: "y-axis-1",
			data: upLoadSpeedList,
			radius: 0
		}]
	},
	spanGaps: true,
	options: {
		scales:{
			xAxes: [{
				display: false
			}],
			yAxes:[{
				display: false,
				ticks: {
					beginAtZero:true
				},
				position: "left",
				id: "y-axis-0"
			}, {
				display: false,
				ticks: {
					beginAtZero:true
				},
				position: "left",
				id: "y-axis-1"
			}]
		},
		legend: {
			display: false
		}
	}
})