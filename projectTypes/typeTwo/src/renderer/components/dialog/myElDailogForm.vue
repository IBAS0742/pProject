<template>
    <el-dialog
        :title="title"
        :visible.sync="show"
        :modal="isModal"
        :fullscreen="isFullscreen"
        :before-close="handleClose"
        width="600px">
        <slot></slot>
        <span slot="footer" class="dialog-footer" v-show="!noBtn">
          <el-button type="primary" @click="$emit('comfirm')">{{btnName}}</el-button>
          <el-button type="primary" @click="show=false">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: 'myElDailogForm',
        props: {
            btnName: {
                type: String
            },
            title: {
                type: String
            },
            modal: {
                type: Boolean
            },
            fullScreen: {
                type: Boolean
            },
            noBtn: {
                type: Boolean
            },
            autoClose: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        // props: ['btnName','title','modal','fullscreen','noBtn','autoClose'],
        data() {
            return {
                show: false
            }
        },
        computed: {
            isModal() {
                return !!this.modal;
            },
            isFullscreen() {
                return !!this.fullscreen;
            }
        },
        methods: {
            handleClose(cb) {
                if (this.autoClose) {
                    cb();
                }
            }
        }
    }
</script>

<style scoped>

</style>
