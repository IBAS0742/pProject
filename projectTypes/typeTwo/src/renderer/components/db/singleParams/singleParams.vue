<template>
    <div class="params-box">
        <api-param :params="params"
                   :param="param"
                   :name="name"
                   :level="level"
                   :param-format="paramFormat"
                   v-for="(param, idx) in params" :key="idx"
                   @change="(data) => update(data, idx)"
                   @addParam="() => addParam(idx)"
                   @deleteParam="() => deleteParam(idx)">
        </api-param>
    </div>
</template>

<script>
    import ApiParam from './apiParam'
    import Drawer from '../../drawer/drawer'

    export default {
        name: 'singleParams',
        components: {
            Drawer,
            ApiParam
        },
        props: {
            level: {
                type: Number,
                required: true,
                default() {
                    return -2;
                }
            },
            params: {
                type: Array,
                required: true
            },
            name: {
                type: String,
                required: false
            },
            paramFormat: {
                type: Array,
                required: true
            }
        },
        computed: {
            baseParams() {
                let obj = {};
                this.paramFormat.forEach(pf => {
                    obj[pf.name] = '';
                });
                console.log('baseParams',obj);
                return obj;
            }
        },
        methods: {
            change () {
                this.$emit('change', this.params)
            },
            update (data, idx) {
                this.params.splice(idx,1,data);
                this.change()
            },
            addParam (idx) {
                this.params.splice(idx + 1, 0, Object.assign({},this.baseParams))
                this.change()
            },
            deleteParam (idx) {
                if (this.params.length === 1) {
                    return
                }
                this.params.splice(idx, 1)
                this.change()
            }
        },
        mounted() {
            //todo delete
            window.ps = this;
        }
    }
</script>
<style>
    .params-box {
        position: relative;
    }
    .params-box.set {
        padding-left: 66px;
    }
    .params-box .params-box {
        padding-left: 25px;
        position: relative;
    }
    .params-box .params-box:before {
        content: '';
        position: absolute;
        width: 1px;
        left: 0px;
        top: 4px;
        bottom: 16px;
        background-color: #d1dbe5;
    }
    .params-box .params-box .param:before {
        content: '';
        position: absolute;
        width: 8px;
        height: 1px;
        background-color: #d1dbe5;
        left: -25px;
        top: 19px;
    }
    .params-box .param {
        position: relative;
        z-index: 0;
    }
    .params-box .el-cascader .el-input {
        width: 140px;
    }
    .params-box .fill .name {
        min-width: 140px;
        /*max-width: 300px;*/

        padding-left: 10px;
        margin-right: 10px;
    }
    .params-box .fill .name label {
        display: block;
        line-height: 36px;
        height: 36px;
        border-bottom: 1px solid #EFF2F7;
    }
    .params-box code {
        color: #e96900;
        margin: 0 2px;
        border-radius: 2px;
        white-space: nowrap;
    }
</style>
