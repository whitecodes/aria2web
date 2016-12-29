import format from './speed-format.js'

module.exports = {
    template: require('./detail.html'),
    props: {
        taskDetail: {
            type: Object,
            required: true
        }
    },
    // mounted: function() {
    //     console.log(format.speedFormat(10000))
    // },
    methods: {
        pauseTask: function() {
            this.$http.get('http://localhost:6800/jsonrpc', {params: {'jsonrpc': '2.0', 'id': 'aria2web','method': 'aria2.pause', 'params': btoa('[\"' + this.taskDetail.gid + '\"]') }}).then((response)=>{
                //console.log(this.taskDetail.gid);
            },(response)=>{
                console.log(response);
            })
        }
    },
    computed: {
        downLoad: function() {
            return format.speedFormat(this.taskDetail.downloadSpeed);
        },
        upLoad: function() {  
            return format.speedFormat(this.taskDetail.uploadSpeed);
        },
        rate: function() {
            return (this.taskDetail.completedLength / this.taskDetail.totalLength * 100).toFixed(2) + '%';
        }
    },
}