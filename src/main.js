import Vue from 'vue'
import VueResource from 'vue-resource'
import Chart from 'chart.js'

import format from './components/data-format.js'

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
	version: 'unknow',
	showModal: false
};
var downLoadSpeedList=[];
var upLoadSpeedList=[];
var counter=[];

new Vue({
	el: '#app',
	data: info,
	components: {
		taskList: require('./components/task-list.js'),
		addTask: require('./components/add-task.vue')
	},
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
                chart.update();
            },(response)=>{
            	console.log('error')
            })
		},
		//TODO：add task
		addTask: function() {
			this.showModal = true;
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