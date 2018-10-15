<template>
    <div
        ref="mainIframeDiv"
        v-loading="insertEle.insert"
        :element-loading-text="insertEle.text"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#5a5a5a63"
        style="display: flex;justify-content: center;align-items: Center;height: 100%;background: rgb(238, 238, 238);display: flex;">
        <iframe :style="style" src="about:blank" frameborder="0" ref="ifr"></iframe>
    </div>
</template>

<script>
    import { getSize , justify } from "./pageSize";

    export default {
        props: {
            pageHtml: {
                type: String,
                required: true
            },
            theme: {
            type: String,
            required: true
        }
        },
        name: "realTimePreview",
        data() {
            return {
                insertEle: {
                    index: 0,
                    insert: false,
                    text: '请选择一个 组件&模板'
                },
                style: {
                    'width': '320px',
                    'height': '480px',
                    'margin': 'auto',
                    'display': 'block',
                    'background-color' : 'white',
                    'transform': 'scale(1)'
                },
                curSize: ''
            }
        },
        methods: {
            showPage() {
                this.$refs.ifr.contentWindow.location.reload();
                setTimeout(_ => {
                    this.$refs.ifr.contentDocument.write(this.pageHtml);
                },500);
            },
            tip(msg,type) {
                this.$message({
                    showClose: true,
                    message: msg || '这是一条消息',
                    type: type || 'success'
                });
            },
            initPreviewSetting() {
                this.curSize = getSize(this.theme).defaultSize;
            },
            init() {
                let ret = justify(this.curSize.split('x'),this.$refs.mainIframeDiv);
                if (ret.scale !== 1) {
                    this.tip('由于屏幕不够大，现在进行缩小显示(' + ret.scale + ')','warning');
                }
                this.style.width = (ret.width) + 'px';
                this.style.height = (ret.height) + 'px';
                this.$refs.previewIfr.contentWindow.location.reload();
                setTimeout(() => {
                    this.$refs.previewIfr.contentDocument.write(this.tempHtml);
                },1500);
            },
        },
        watch: {
            pageHtml() {
                this.showPage();
            },
            theme() {
                this.initPreviewSetting();
                this.init();
            }
        },
        mounted() {
            this.initPreviewSetting();
            this.init();
        }
    }
</script>

<style scoped>

</style>
