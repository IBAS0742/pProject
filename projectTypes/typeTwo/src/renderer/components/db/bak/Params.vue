<template>
    <div class="params-box">
        <api-param :params="params"
                   :param="param"
                   :name="name"
                   :level="level"
                   @setmore="() => setMore(idx)"
                   v-for="(param, idx) in params" :key="idx"
                   @change="(data) => update(data, idx)"
                   @addParam="() => addParam(idx)"
                   @deleteParam="() => deleteParam(idx)">
        </api-param>
        <drawer :show="drawerShow" :width="'400px'">
            <div slot="drawer">
                <div style="padding: 0.5em;">
                    <el-button @click="drawerShow=false;" round style="width: 100%;"><i class="el-icon-back"></i>关闭</el-button>
                </div>
                <el-form :label-position="'left'" label-width="80px" style="padding: 0.8em;" :model="curParam">
                    <el-form-item label="备注">
                        <el-input placeholder="备注" v-model="curParam.comment" @change="lazyUpdate"></el-input>
                    </el-form-item>
                    <el-form-item label="检验规则(正则)">
                        <el-input placeholder="检验规则(正则)" v-model="curParam.rule" @change="lazyUpdate"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="长度"
                        prop="length"
                        :rules="rules.number">
                        <el-input
                            placeholder="长度" v-model="curParam.length" @change="lazyUpdate"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="小数点"
                        prop="point"
                        :rules="rules.number">
                        <el-input
                            placeholder="小数点" v-model="curParam.point" @change="lazyUpdate"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </drawer>
    </div>
</template>

<script>
    import ApiParam from './Param'
    import Drawer from '../../drawer/drawer'
    export default {
        name: 'params',
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
            }
        },
        data() {
            return {
                baseParams: {
                    "key": false,
                    "fieldName": null,
                    "required": true,
                    "type": null,
                    "length": null,
                    "point": null,
                    rule: null,
                    comment: null
                },
                drawerShow: false,
                curParam: {
                    comment: '',
                    rule: '',
                    length: '',
                    point: ''
                },
                rules: {
                    number: [
                        {
                            validator(rule,value,cb) {
                                if (!value) {
                                    cb();
                                } else if (parseInt(value).toString() === value) {
                                    cb();
                                } else {
                                    cb(new Error('请输入正常的整数'))
                                }
                            }, trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            isNext (param) {
                // return param.type === 'object' || (param.type === 'array' && param.items.type === 'object')
                return false;
            },
            nextParams (param) {
                return param.type === 'object' ? param.params : param.items.params
            },
            change () {
                this.$emit('change', this.params)
            },
            update (data, idx) {
                // if (data.length === undefined) {
                //     this.$set(this.params, idx, data)
                // } else {
                //     this.$set(this.params[idx], 'params', data)
                // }
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
            },
            setMore(idx) {
                this.drawerShow = true;
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
