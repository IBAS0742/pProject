<template>
    <el-dialog
        title="预览"
        class="previewDialog"
        :visible.sync="show"
        :before-close="handleClose"
        width="100%"
        style="min-width:908px;"
        height="100%"
        top="0"
        ref="preivewIfrDialog"
        fullscreen>
        <div style="height: 100%;">
            <div style="padding-bottom:0.3em;display:inline-block;width:100%;line-height:2em;">
                <div style="line-height:2em;justify-content:center;align-items:center;display:flex;max-width:33%;float:left;min-width: 290px;">
                    <span style="padding-right:0.5em;">选择页面</span>
                    <div>
                        <el-select v-model="previewDialog.previewPage" placeholder="请选择">
                            <el-option
                                v-for="item in pages"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="line-height:2em;justify-content:center;align-items:center;display:flex;max-width:33%;float:left;min-width: 290px;">
                    <span style="padding-right:0.5em;">页面大小</span>
                    <div>
                        <el-select v-model="previewDialog.curSize" placeholder="请选择">
                            <el-option
                                v-for="(size,name) in previewDialog.size"
                                :key="name"
                                :label="name"
                                :value="size">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="line-height:2em;justify-content:center;align-items:center;display:flex;max-width:33%;float:left;min-width: 250px;">
                    <span style="padding-right:0.5em;">调节背景颜色</span>
                    <el-color-picker
                        v-model="previewDialog.color"
                        show-alpha
                        :predefine="previewDialog.predefineColors">
                    </el-color-picker>
                </div>
            </div>
            <div ref="previewDiv" style=".display: flex;justify-content: center;align-items: Center;height: calc(100% - 25px);background: rgb(238, 238, 238);display: flex;">
                <iframe :style="iframeStyle.previewStyle" src="about:blank" frameborder="0" id="previewIfr" ref="previewIfr"></iframe>
            </div>
        </div>
    </el-dialog>
</template>

<script>

    import { getSize , justify } from "./pageSize";

    export default {
        name: "preview",
        props: {
            pages: {
                type: Array,
                required: true
            },
            show: {
                type: Boolean,
                required: true
            },
            tempHtml: {
                type: String,
                required: false
            },
            theme: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                previewDialog: {
                    color: 'rgb(238, 238, 238)',
                    previewPage: '',
                    predefineColors: [
                        '#000',
                        '#fff',
                        'rgb(238, 238, 238)',
                        '#ff4500',
                        '#ff8c00',
                        '#ffd700',
                        '#90ee90',
                        '#00ced1',
                        '#1e90ff',
                        '#c71585',
                        'rgba(255, 69, 0, 0.68)',
                        'rgb(255, 120, 0)',
                        'hsv(51, 100, 98)',
                        'hsva(120, 40, 94, 0.5)',
                        'hsl(181, 100%, 37%)',
                        'hsla(209, 100%, 56%, 0.73)',
                        '#c7158577'
                    ],
                    size: {},
                    curSize: ''
                },
                iframeStyle: {
                    style: {
                        'width': '320px',
                        'height': '480px',
                        'margin': 'auto',
                        'display': 'block',
                        'background-color' : 'white',
                        'transform': 'scale(1)'
                    },
                    record: '',
                    previewStyle: {
                        'width': '320px',
                        'height': '480px',
                        'margin': 'auto',
                        'display': 'block;',
                        'background-color': 'white'
                    }
                },
            }
        },
        methods: {
            init() {
                let ret = justify(this.previewDialog.curSize.split('x'),this.$refs.previewDiv);
                if (ret.scale !== 1) {
                    this.tip('由于屏幕不够大，现在进行缩小显示(' + ret.scale + ')','warning');
                }
                this.iframeStyle.previewStyle.width = (ret.width) + 'px';
                this.iframeStyle.previewStyle.height = (ret.height) + 'px';
                this.$refs.previewIfr.contentWindow.location.reload();
                setTimeout(() => {
                    this.$refs.previewIfr.contentDocument.write(this.tempHtml);
                },1500);
            },
            tip(msg,type) {
                this.$message({
                    showClose: true,
                    message: msg || '这是一条消息',
                    type: type || 'success'
                });
            },
            initPreviewSetting() {
                this.previewDialog.size = getSize(this.theme).size;
                this.previewDialog.curSize = getSize(this.theme).defaultSize;
            },
            handleClose(cb) {
                cb();
                this.$emit('close');
            }
        },
        watch: {
            'tempHtml'() {
                setTimeout(_ => {
                    this.init()
                },500);
            },
            'previewDialog.previewPage'(newV) {
                if (this.show) {
                    // todo
                    this.$emit('update',this.previewDialog.previewPage);
                }
            },
            'previewDialog.color'(newV) {
                this.$refs.previewDiv.style.backgroundColor = newV;
            },
            'previewDialog.curSize'(newV) {
                this.init();
            },
            theme() {
                this.initPreviewSetting();
            }
        },
        mounted() {
            //todo delete
            window.preview = this;
            this.initPreviewSetting();
        }
    }
</script>

<style>

    .el-dialog__body{
        height: calc(100% - 114px) !important;
    }

</style>
