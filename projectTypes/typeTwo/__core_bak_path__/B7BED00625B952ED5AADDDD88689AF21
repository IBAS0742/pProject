<template>
  <div style="text-align: left;padding: 0.2em 0.8em;">
    <el-button v-show="stacks.length" type="text" @click="stacks.splice(0,stacks.length);">返回</el-button>
    <el-form :label-position="labelPosition" :label-width="labelWidth">
      <el-form-item :label="item.label" v-for="(item,ind) in formEditDatas">
        <!--<div v-if="item.type === 'hidden'" style="display: none;"></div>-->
        <el-input v-if="item.type=='input'" v-model="item.value"></el-input>
        <el-input autosize type="textarea" v-if="item.type=='textarea'" v-model="item.value"></el-input>
        <el-color-picker v-if="item.type=='color'" v-model="item.value"></el-color-picker>
        <el-switch
          v-if="item.type=='switch'"
          v-model="item.value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-input-number class="myNum" v-if="item.type=='number'" v-model="item.value" :step="1"></el-input-number>
        <ul v-if="item.type=='array'">
          <li v-for="(ite,ind_) in item.list" style="display: inline-block;width: 100%;">
            {{ite[item.labelF].value || ite[item.labelF].label}}
            <div style="float: right;">
              <el-button type="text"><i class="el-icon-edit" @click="edit(ind,ind_)"></i></el-button>
              <el-button type="text"><i class="el-icon-delete" @click="remove(ind,ind_)"></i></el-button>
            </div>
          </li>
          <li>
            <el-button type="text" @click="append(item,ind)"><i class="el-icon-plus"></i>新增列表项</el-button>
          </li>
        </ul>
        <el-button type="text" v-if="item.type === 'object'" @click="editObject(ind,item)">{{item.placeholder || '编辑'}}</el-button>
        <el-select v-if="item.type === 'select'" v-model="item.value">
          <el-option
            v-for="(op,ind) in item.op"
            :label="op.label"
            :value="op.value">
          </el-option>
        </el-select>
        <el-select
          v-if="item.type=='selectForm'"
          @change="selectFormChange(item)"
          v-model="item.value" placeholder="请选择">
          <el-option
            v-for="(op,ind) in item.op"
            :key="ind"
            :label="ind"
            :value="ind">
          </el-option>
        </el-select>
        <el-button v-if="item.type === 'icon'" @click="changeIcon(item)">
          <div v-if="item.value"><i :class="item.value" style="font-size: 1.2em;margin-right: 0.5em;"></i>{{item.value}}</div>
          <div v-else>请选择图标</div>
        </el-button>
        <my-el-form v-if="item.type === 'selectForm'" :form-data="item.curFormData"></my-el-form>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择一个图标"
      :modal="false"
      :visible.sync="iconItem.iconDialogShow"
      width="800px">
      <el-form>
        <el-form-item label="图标颜色">
          <el-color-picker v-model="iconItem.iconColor"></el-color-picker>
        </el-form-item>
      </el-form>
      <div>
        <div v-for="icon in icons" class="iconDiv">
          <i :class="icon" :style="'color:'+iconItem.iconColor" @click="checkIcon(icon)"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import { icons } from '../../../utils/pageEditor/icons'

  export default {
    name: 'my-el-form',
    props: {
      formData: {
        type: Object
      },
        labelPosition: {
          type: String,
            default() {
              return 'top';
            }
        },
        labelWidth : {
          type:String,
            default() {
              return '80px'
            }
        }
    },
    computed: {
    },
    data() {
      return {
        formDatas: [],
        formEditDatas: [],
        stacks: [],
        locked: false,
        tpl: {},
        iconItem: {
          iconDialogShow: false,
          item: null,
          iconColor: 'black'
        },
        icons
      }
    },
    methods: {
      edit(ind,ind_) {
        this.stacks.splice(0,this.stacks.length);
        this.stacks.splice(0,0,ind,'list',ind_);
      },
      editObject(ind,item) {
        console.log(ind,item);
        this.stacks.splice(0,this.stacks.length);
        this.stacks.splice(0,0,ind,'formData');
      },
      remove(ind,ind_) {
        this.formDatas.ex[ind].list.splice(ind_,1);
      },
      append(item,ind) {
        // let newObj = Object.assign({},this.formDatas[ind].tpl);
        this.formDatas.ex[ind].list.push(JSON.parse(JSON.stringify(this.formDatas.ex[ind].tpl)));
      },
      selectFormChange(item) {
        if (item.value in item.op) {
          item.curFormData = {
            ex: item.op[item.value],
            id: 'id_' + (new Date()).getTime()
          };
        }
      },
      changeIcon(item) {
        this.iconItem.item = item;
        this.iconItem.iconDialogShow = true;
      },
      checkIcon(icon) {
        this.iconItem.item.value = icon;
        this.iconItem.iconDialogShow = false;
      }
    },
    mounted() {
      window.rett = this;
    },
    watch: {
      'formData.id' () {
        this.locked = true;
        this.formDatas = this.formData;
        this.formEditDatas = this.formData.ex;
        this.stacks = [];
        console.log('change formData.ID');
      },
      stacks(newV) {
        this.locked = true;
        let obj = {};
        if (this.stacks.length) {
          obj = this.formDatas.ex;
          this.stacks.forEach(s => obj = obj[s]);
          this.formEditDatas = obj;
        } else {
          this.formEditDatas = this.formDatas.ex;
          this.tpl = {};
        }
        let $his = this;
        setTimeout(_ => {
          for (var i in $his.formEditDatas) {
            if ($his.formEditDatas[i].type === 'selectForm') {
              if ($his.formEditDatas[i].value in $his.formEditDatas[i].op) {
                $his.formEditDatas[i].curFormData.id = 'id_' + (new Date()).getTime();
              }
            }
          }
        })
        // console.log('change stacks');
      },
      'formEditDatas'() {
        if (this.locked) {
          this.locked = false;
          return;
        }
        if (this.stacks.length == 3) {
          this.formDatas.ex[this.stacks[0]][this.stacks[1]][this.stacks[2]] = this.formEditDatas;
        } else {
          this.formDatas.ex = this.formEditDatas;
        }
        this.formDatas.id = 'id_' + (new Date()).getTime();
        this.$emit('update:formData',this.formDatas);
        console.log('change formEditDatas');
      }
    }
  }
</script>

<style>
  li {
    list-style: none;
  }
  .myNum span {
    line-height: 38px !important;
    height: 38px !important;
  }
  .myNum i {
    line-height: 38px !important;
    height: 38px !important;
  }
  .iconDiv {
    display: inline-block;
    font-size: 2em;
    width: 2em;
    height: 2em;
    line-height: 2em;
    cursor: pointer;
    color: black;
    background: white;
  }
</style>
