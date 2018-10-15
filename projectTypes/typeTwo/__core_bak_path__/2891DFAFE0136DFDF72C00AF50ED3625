<template>
  <div id="operater"
       :style="'background:#c5bfbf63;z-index:100;position:absolute;display:' + opStyle.display + ';pointer-events: none;left:0;top:' + opStyle.top + 'px;height:' + opStyle.height + 'px;width:100%;'"
       ref="op">
    <div @click="appendBefore()">
      <div style="top: -20px;position: absolute;width: 40px;margin: 0 calc(50% - 20px);" class="plus-btn">+</div>
    </div>
    <div>
      <div
        style="width: 100%;text-align: center;justify-content: center;align-items: center;display: flex;height: 100%;">
        <div @click="toDelete()" class="plus-btn" style="display: inline-block"><i class="el-icon-delete"></i></div>
        <div @click="toSetting()" class="plus-btn" style="display: inline-block"><i class="el-icon-setting"></i></div>
      </div>
    </div>
    <div @click="appendAfter()">
      <div style="bottom: -20px;position: absolute;width: 40px;margin: 0 calc(50% - 20px);" class="plus-btn">+</div>
    </div>
  </div>
  <div id="null" v-show="nullShow" style="text-align: center">
    <img style="" src="##basePath##build/img/icon-insert-desktop.png" alt="">
    <div style="display: inline-block;width: 100%;font-size: 17px;text-align: center;color: #2196F3;cursor: pointer;">
      <span @click="insertTemplate()">请添加组件</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'operateEle',
    methods: {
      overComponent: function (e) {
        window.ret = e
        this.selectEle.id = e.target.id
        if (e.target.getAttribute('tar') === 'corver') {
          var loc = e.target.getClientRects()[0]
          this.opStyle.top = e.target.offsetTop
          this.opStyle.height = loc.height
          this.opStyle.display = 'block'
        }
      },
      toDelete: function () {
        window.parent.ret.deleteTemplate.bind(window.parent.ret, this.selectEle.id)()
      },
      toSetting: function () {
        window.parent.ret.settingTemplate.bind(window.parent.ret, this.selectEle.id)()
      },
      appendBefore: function () {
        this.insertTemplate(1)
      },
      appendAfter: function () {
        this.insertTemplate(-1)
      },
      insertTemplate: function (loc) {
        let nullDiv = document.getElementById(this.selectEle.id)
        if (loc) {
          if (loc === 1) {
            nullDiv.insertBeforeThis(this.blankBlock)
          } else {
            nullDiv.after(this.blankBlock)
          }
        } else {
          nullDiv.after(this.blankBlock)
        }
        this.nullShow = false
        this.opStyle.display = 'none'
        window.parent.ret.insertTemplate.bind(window.parent.ret, this.selectEle.id, loc)()
      }
    },
    mounted: function () {
      this.blankBlock = document.createElement('div')
      this.blankBlock.classList.add('blank-block')
      this.blankBlock.innerHTML = '添加到此处'
      if (document.getElementsByClassName('corver').length) {
        this.nullShow = false
      } else {
        this.nullShow = true
      }
    }
  }
</script>

<style>
  .blank-block {
    position: relative;
    display: flex;
    height: 135px;
    background: #F9F9F9;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: rgba(0, 0, 0, .85);
    border: dotted;
    border-radius: 6px;
    margin: 6px;
    width: calc(100% - 12px);
    border-width: 2px;
  }

  .blank-block span {
    cursor: pointer;
  }

  .fill-block {
    width: 100%;
  }

  .fill-block-img {
    height: 30px;
    width: 30px;
    margin: auto;
    background-image: url(\'##basePath##build/img/icon-add.png\');
  }

  body::-webkit-scrollbar {
    display: none;
  }

  .plus-btn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 40px;
    margin: auto;
    border: 1px solid white;
    border-radius: 40px;
    text-align: center;
    background: white;
    box-shadow: 1px 1px 1px 1px #a2a2a2;
    cursor: pointer;
    pointer-events: fill;
  }

  .plus-btn-up {
    width: 100%;
    top: -20px;
    position: relative;
  }

  .plus-btn-down {
    width: 100%;
    top: calc(100% - 100px);
    position: relative;
  }
</style>
