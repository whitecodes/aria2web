import format from './data-format.js'

module.exports = {
    template: require('./task-detail.html'),
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