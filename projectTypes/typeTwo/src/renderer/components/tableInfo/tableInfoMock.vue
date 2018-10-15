<template>
    <el-dialog
        title="测试"
        :visible.sync="show"
        width="100%"
        style="min-width:908px;"
        height="100%"
        top="0"
        fullscreen>
        <el-form :label-position="labelPosition" label-width="80px" model="left">
            <el-form-item label="数据集" style="float:left">
                <el-select v-model="table" placeholder="数据集">
                    <el-option v-for="(t,ind) in tables" :label="t.comment" :value="t.$index + '#' + t.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="float:left">
                <el-button @click="getAll">获取</el-button>
            </el-form-item>
            <el-form-item v-show="table" style="float:left">
                <el-button @click="edit('add')">添加数据</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                fixed="left"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="主键">
            </el-table-column>
            <el-table-column
                v-for="(c,ind) in columns"
                :prop="c.prop"
                :label="c.label">
            </el-table-column>
        </el-table>

        <drawer :show="addShow" :width="'500px'">
            <div slot="drawer" style="padding: 1em;">
                <el-form :label-position="'left'" label-width="80px">
                    <el-form-item v-for="(c,ind) in columns" :label="c.label">
                        <el-input v-model="tempData[c.prop]"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveOrUpdate">提交</el-button>
                        <el-button @click="addShow = false;">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </drawer>
    </el-dialog>
</template>

<script>
    import { saveMock , deleteMock , updateMock , listMock , infoMock } from "../../api/mockApi";
    import Drawer from "../drawer/drawer";

    export default {
        name: "tableInfoMock",
        components: {Drawer},
        props: {
            tables: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                show: false,
                table: '',
                actions: [
                    {
                        label: '添加',
                        value: 'add'
                    },
                    {
                        label: '删除',
                        value: 'delete'
                    },
                    {
                        label: '修改',
                        value: 'update'
                    },
                    {
                        label: '查一条',
                        value: 'select'
                    },
                    {
                        label: '查多条',
                        value: 'list'
                    },
                ],
                action: '',
                tableData: [],
                columns: [],
                tableName: '',
                addShow: false,
                nullData: {},
                tempData: {}
            }
        },
        methods: {
            init() {
                if (this.table) {
                    let table = this.tables[this.table.split('#')[0]];
                    this.tableName = table.name;
                    this.columns.splice(0,this.columns.length);
                    // this.columns.push({
                    //     prop: "id",
                    //     label: "主键"
                    // });
                    JSON.parse(table.content).forEach(_ => {
                        this.columns.push({
                            prop: _.key,
                            label: _.comment
                        });
                        this.nullData[_.key] = '';
                        this.tempData[_.key] = '';
                    });
                }
            },
            getAll() {
                listMock(this.tableName)({
                    page: 1,
                    limit: 10
                })
                    .then(_ => {
                        this.tableData = _.data;
                    });
            },
            edit(tar) {
                this.addShow = true;
                if (tar === 'add') {
                    this.tempData = Object.assign({},this.nullData);
                } else {
                    this.tempData = Object.assign({},this.nullData,this.tableData[tar]);
                }
            },
            saveOrUpdate() {
                console.log(this.tempData);
                (this.tempData.id ? updateMock : saveMock)(this.tableName)(this.tempData).then(_ => {
                    this.getAll();
                    this.addShow = false;
                });
            },
            remove(ind) {
                deleteMock(this.tableName)(ind)
                    .then(_ => {
                        this.getAll();
                    });
            },
        },
        mounted() {
            //todo delete
            window.tableInfoMock = this;
            this.tableData = [];
        },
        watch: {
            table() {
                this.init();
            }
        }
    }
</script>

