<template>
    <div class="param-wrap" :class="[expanded ? 'unfold' : 'fold']">
        <div class="expand"
             v-show="isShowExpand"
             @click="expandParam">
            <span class="el-tree-node__expand-icon" :class="{expanded: expanded}"></span>
        </div>
        <div class="control" :style="styleObject" >
            <i class="el-icon-close"
               @click="deleteParam"
               :class="{hidden: params.length === 1}">
            </i>
            <i class="el-icon-plus" @click="addParam"></i>
        </div>
        <single-param-set :param="param"
                   :name="name"
                  :param-format="paramFormat"
                   @keydown.native.enter="addParam"
                   @buildObject="buildObject"
                   style="margin-left: 56px;"
                   @change="updateParam"></single-param-set>
        <slot name="params"></slot>
    </div>
</template>

<script>
    import singleParamSet from './singleParamSet';

    export default {
        name: 'apiParam',
        components: {
            singleParamSet
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
            param: {
                type: Object,
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
        data () {
            return {
                styleObject: {
                    left: `-${51 + (this.level * 25)}px`
                },
                expanded: false
            }
        },
        computed: {
            isShowExpand () {
                return (this.param.type === 'object') || (this.param.type === 'array' && this.param.items.type === 'object')
            }
        },
        methods: {
            buildObject () {
                this.expanded = true
            },
            updateParam () {
                this.$emit('change', this.param)
            },
            addParam () {
                this.$emit('addParam')
            },
            deleteParam () {
                this.$emit('deleteParam')
            },
            expandParam () {
                this.expanded = !this.expanded
            }
        }
    }
</script>

<style>
    .param-wrap {
        position: relative;
    }
    .param-wrap.fold .params-box {
        overflow: hidden;
        height: 0px;
    }
    .param-wrap .params-box {
        transition: height 0.3s ease;
    }
    .param-wrap .expand {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 36px;
        position: absolute;
        left: -20px;
        top: 0px;
        line-height: 36px;
    }
    .params-box .control {
        min-width: 56px;
        max-width: 56px;
        position: absolute;
        left: 0px;
        top: 0;
    }
    .params-box .control i {
        color: #ccc;
        line-height: 36px;
        width: 28px;
        font-size: 12px;
        cursor: pointer;
        float: left;
        text-align: center;
    }
    .params-box .control i.el-icon-plus {
        font-size: 14px;
    }
    .params-box .control i:hover {
        background-color: #EFF2F7;
    }
    .params-box .control i.hidden {
        visibility: hidden;
    }
    /*.param .el-input__inner:focus,*/
    .param .el-input__inner:hover {
        border-color: #EFF2F7;
    }
    .control:hover ~ .param,
    .param-wrap .param:focus,
    .param-wrap .param:hover {
        box-shadow: 0px 0px 5px 2px #eee;
        /*z-index: 1;*/
    }

</style>
