<template>
  <div id="app">
<!--     <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->

  </div>
</template>

<script>
// export default {
//   name: 'app',
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App'
//     }
//   }
// }
export default {
    name: 'globlaInfo',
    data: function(){
      return {
        downloadSpeed: ['0'],
        uploadSpeed: ['0'],
        version: 'unknow'
      }
    },
    props:['rpcUrl'],
    mounted: function() {
      this.getVersion();
      this.getGlobalSpeed();
    },
    methods: {
      getVersion: function() {
        this.$http.get(rpcUrl, {params:{'jsonrpc':'2.0', 'id':'aria2web', 'method':'aria2.getVersion'}}).then((response)=>{
          this.version = response.data.result.version;
        },(response)=>{
          this.version='unknow';
        })
      },
      getGlobalSpeed: function() {
        var self = this;
        var rpcUrl = 'http://localhost:6800/jsonrpc';
        this.$http.get(rpcUrl, {params:{'jsonrpc':'2.0', 'id':'aria2web', 'method':'aria2.getGlobalStat'}}).then((response)=>{
        //console.log(response.data.result)
        setTimeout(function(){ 
          self.getGlobalSpeed() 
        }, 1000);
        //console.log(self.lineChart);
        this.downloadSpeed.push(response.data.result.downloadSpeed);
        this.uploadSpeed.push(response.data.result.uploadSpeed);
        this.timeCount.push(this.timeCount.length);
      },(response)=>{
        console.log('error')
      })
      },
      speedFormat: function(speed) {
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
      },
      creatChart: function() {
    }
  },
  computed:{
    downLoad: function() {
      return this.speedFormat(this.downloadSpeed[this.downloadSpeed.length-1]);
    },
    upLoad: function() {  
      return this.speedFormat(this.uploadSpeed[this.uploadSpeed.length-1]);
    }
  },
  watch: {
    downloadSpeed: function() {
      //this.creatChart();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
