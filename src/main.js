import Vue from 'vue'
import VueResource from 'vue-resource'
import Chart from 'chart.js'

Vue.use(VueResource)

var rpcUrl = 'http://localhost:6800/jsonrpc'; // TODO it will to setted by user
var info = {downloadSpeed: '0',uploadSpeed: '0',version: 'unknow'};
var downLoadSpeedList=[];
var upLoadSpeedList=[];
var counter=[];

new Vue({
	el: '#app',
	data: info,
	mounted: function() {
		this.getVersion();
		this.getGlobalSpeed();
	},
	methods: {
		getVersion: function() {
			// TODO 
			this.$http.get(rpcUrl, {params:{'jsonrpc':'2.0', 'id':'aria2web', 'method':'aria2.getVersion'}}).then((response)=>{
				info.version = response.data.result.version;
			},(response)=>{
				info.version='unknow';
				console.log('error')
			})
		},
		getGlobalSpeed: function() {
			var self = this;
			self.$http.get(rpcUrl, {params:{'jsonrpc':'2.0', 'id':'aria2web', 'method':'aria2.getGlobalStat'}}).then((response)=>{
				//console.log(response.data.result)
				setTimeout(function(){
					self.getGlobalSpeed() 
				}, 1000);
				info.downloadSpeed = (response.data.result.downloadSpeed);
				info.uploadSpeed = (response.data.result.uploadSpeed);
				downLoadSpeedList.push(info.downloadSpeed); // maybe there a problem with data add too much
				upLoadSpeedList.push(info.uploadSpeed);
				counter.push(counter.length);
				chart.update();
				//console.log(speedList);
        	},(response)=>{
        		console.log('error')
        	})
		},

		creatChart: function() {
		}
	},
	computed:{
		downLoad: function() {
			return speedFormat(info.downloadSpeed);
		},
		upLoad: function() {  
			return speedFormat(info.uploadSpeed);
		}
	},
	watch: {
		downloadSpeed: function() {

		}
	}
});

// fetch canvas DOM element
let canvas = document.getElementById("canvas");
// init chart.js
var chart = new Chart(canvas, {
	type: 'line',
	data: {
		labels: counter,
		datasets: [{
			data: downLoadSpeedList,
			radius: 0 // data point dons't display
		},{
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
                }
			}]
		},
		legend: {
			display: false
		}
	}
})

// TODO poor code style
function speedFormat(speed) {
	var speedBps = speed * 1;
	if(speedBps > 1000) {
		var speedKbps = (speedBps / 1024).toFixed(2);
		if(speedKbps > 1000) {
			var speedMbps = (speedKbps / 1024).toFixed(2);
			return speedMbps + 'Mbps';
		}else{
			return speedKbps + 'Kbps';
		}
	}else{
		return speed + 'Bps';
	}
}


