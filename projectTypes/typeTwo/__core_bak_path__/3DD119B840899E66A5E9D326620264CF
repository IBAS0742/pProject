<template>
    <el-form class="param set" :class="name" :model="param">
        <el-row type="flex" class="row-bg" >
            <el-col class="name" v-for="(pf,ind) in paramFormat">
                <el-select v-if="pf.options" v-model="param[pf.name]" :placeholder="pf.label">
                    <el-option
                        v-for="item in pf.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-else :placeholder="pf.label" v-model="param[pf.name]" @change="lazyUpdate"></el-input>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    const debounce = function(fun, interval) {
        let timer = -1;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fun.apply(this, args), interval)
        }
    };
    export default {
        name: 'singleParamSet',
        props: {
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
        computed: {
        },
        data () {
            return {
                selectedOptions: [],
                lazyUpdate: debounce(this.update, 300)
            }
        },
        methods: {
            lazy (fn) {
                return debounce(fn, 300)
            },
            update () {
                this.$emit('change', this.param)
            }
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
        /*font-family: monospace;*/
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
