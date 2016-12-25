import Vue from 'vue'
import VueResource from 'vue-resource'
import Chart from 'chart.js'

Vue.use(VueResource)

var rpcUrl = 'http://localhost:6800/jsonrpc';
var info = {downloadSpeed: '0',uploadSpeed: '0',version: 'unknow'};
var speedList=[0];
var counter=[0];

new Vue({
	el: '#app',
	data: info,
	mounted: function() {
		this.getVersion();
		this.getGlobalSpeed();
	},
	methods: {
		getVersion: function() {
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
			speedList.push(info.downloadSpeed);
			counter.push(counter.length);
			chart.update();
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
            data: speedList,
            radius: 0,
        }]
    },
    options: {
    	scales:{
    		xAxes: [{
    			display: false
    		}],
    		yAxes:[{
    			display: false
    		}]
    	},
    	legend: {
    		display: false
    	},
    	pointStyle: "line"
    }
})

function speedFormat(speed) {
	var speedBps = speed * 1;
	if(speedBps > 100) {
		var speedKbps = (speedBps / 1024).toFixed(2);
		if(speedKbps > 100) {
			var speedMbps = (speedKbps / 1024).toFixed(2);
			return speedMbps + 'Mbps';
		}else{
			return speedKbps + 'Kbps';
		}
	}else{
		return speed + 'Bps';
	}
}


