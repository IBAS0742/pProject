<template>
    <el-form class="param set" :class="name" :model="param">
        <el-row type="flex" class="row-bg" >
            <el-col class="key">
                <el-checkbox v-model="param.key" @change="update">主键</el-checkbox>
            </el-col>
            <el-col class="fieldName">
                <el-input placeholder="字段名称" v-model="param.fieldName" @change="lazyUpdate"></el-input>
            </el-col>
            <el-col class="required">
                <el-cascader
                    v-if="name !== 'headers'"
                    popper-class="type-cascader"
                    @change="changeParamType"
                    placeholder="类型"
                    :options="tpyeList"
                    v-model="apiType">
                </el-cascader>
                <el-checkbox v-model="param.required" @change="update">不为空</el-checkbox>
            </el-col>
            <el-col>
                <el-button @click.stop="setMore($event)">更多</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>

    var allType = {
        number: ["TINYINT","SMALLINT","MEDIUMINT","INT","BIGINT","FLOAT","DOUBLE"],
        char: ["CHAR","VARCHAR","TINYBLOB","TINYTEXT","BLOB","TEXT","MEDIUMBLOB","MEDIUMTEXT","LONGBLOB","LONGTEXT"],
        date: ["DATE","TIME","YEAR","DATETIME","TIMESTAMP"],
        bit: ["bit"]
    };
    var regexType = {
        notnull: "不能为空",
        number: "只能是数字",
    };

    const debounce = function(fun, interval) {
        let timer = -1
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => fun.apply(this, args), interval)
        }
    }
    export default {
        props: {
            param: {
                type: Object,
                required: true
            },
            name: {
                type: String,
                required: false
            }
        },
        computed: {
            example: {
                get () {
                    return typeof this.param.example === 'string' ? this.param.example : JSON.stringify(this.param.example)
                },
                set (value) {
                    if (this.param.type === 'string') {
                        this.param.example = value
                    } else {
                        try {
                            this.param.example = JSON.parse(value)
                        } catch (err) {
                            this.param.example = value
                        }
                    }
                }
            },
            apiType () {
                const type = [this.param.type]
                if (this.param.type === 'array') {
                    type.push(this.param.items.type)
                }
                return type
            },
            tpyeList () {
                return this.getTypeList()
            }
        },
        data () {
            return {
                selectedOptions: [],
                lazyUpdate: debounce(this.update, 300),
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
            lazy (fn) {
                return debounce(fn, 300)
            },
            changeParamType (val) {
                this.$set(this.param, 'type', val[0])
                // if (val[0] === 'object') {
                //     if (!this.param.params) {
                //         this.$set(this.param, 'params', [{
                //             key: null,
                //             type: 'string',
                //             required: true
                //         }])
                //     }
                //     this.$emit('buildObject', this.param)
                // } else if (val[0] === 'array') {
                //     this.setArrayType(val[1])
                // }
                this.update()
            },
            setArrayType (type) {
                this.$set(this.param, 'items', {
                    type
                })
                if (type === 'object' && !this.param.items.params) {
                    this.$set(this.param.items, 'params', [{
                        key: null,
                        type: 'string',
                        required: true
                    }])
                    this.$emit('buildObject', this.param)
                }
            },
            update () {
                this.$emit('change', this.param)
            },
            getDefaultType () {
                const type = [this.param.type]
                if (this.param.type === 'array') {
                    type.push(this.param.items.type)
                }
                return type
            },
            getTypeList () {
                const types = []
                // if (this.name === 'query' || this.name === 'path') {
                //     types.push('String', 'Number', 'Boolean')
                // } else {
                //     types.push('String', 'Number', 'Boolean', 'Object', 'Array')
                //     if (this.name === 'body') {
                //         types.push('File')
                //     }
                // }
                // return types.map(t => {
                //     const type = {
                //         value: t.toLowerCase(),
                //         label: t
                //     }
                //     if (t === 'Array') {
                //         type.children = ['String', 'Number', 'Boolean', 'Object'].map(t => ({
                //             value: t.toLowerCase(),
                //             label: t
                //         }))
                //     }
                //     return type
                // })

                for (var i in allType) {
                    allType[i].forEach(t => {
                        types.push({
                            value: t.toLowerCase(),
                            label: t
                        });
                    });
                }
                return types;
            },
            setMore(e) {
                console.log(e);
                e.target.blur()
                this.$emit('setmore');
            }
        },
        mounted() {
        }
    }
</script>

<style>
    .type-cascader .el-cascader-menu {
        height: auto;
    }
    .param.set .el-checkbox {
        height: 36px;
        line-height: 35px;
    }
    .config {
        min-width: 220px;
        max-width: 220px;
    }
    .headers .config {
        min-width: 80px;
        max-width: 80px;
        text-align: center;
    }
    .example {
        min-width: 145px;
        max-width: 220px;
    }
    .comment {
        margin-right: 20px;
        min-width: 145px;
        max-width: 240px;
    }
    .key {
        min-width: 55px;
        max-width: 55px;
    }
    .fileName {
        min-width: 100px;
    }
    .el-input__inner {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #EFF2F7;
        font-family: monospace;
    }
    .el-input-number {
        width: 100%;
    }
    .el-select {
        margin-right: 20px;
    }
    .length {
        max-width: 60px;
        padding: 0 0.5em;
    }
    .point {
        max-width: 60px;
        padding: 0 0.5em;
    }

</style>
