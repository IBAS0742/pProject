export const attrToValue = (attr) => {
  var obj = {};
  for (var i in attr) {
    let atr = attr[i];
    switch (atr.type) {
      case 'hidden':
      case 'input':
      case 'color':
      case 'switch':
      case 'icon':
      case 'number':
      case 'textarea':
      case 'select':
        obj[atr.name] = atr.value;
        break;
      case 'array':
        obj[atr.name] = [];
        atr.list.forEach(al => {
          let o = {};
          for (let i = 0;i < al.length;i++) {
            if (!al[i].name && al.length === 1) {
              o = attrToValue([al[i]]);
            } else {
              Object.assign(o,attrToValue([al[i]]));
            }
          }
          obj[atr.name].push(o);
        });
        break;
      case 'selectForm':
        if (atr.value) {
          if (atr.name) {
            obj[atr.name] = Object.assign(attrToValue(atr.curFormData.ex),{type: atr.value});
          } else {
            return Object.assign(attrToValue(atr.curFormData.ex),{type: atr.value});
          }
        }
        break;
      case 'object':
        obj[atr.name] = attrToValue(atr.formData);
      default :
        break;
    }
  }
  return obj;
};

export const valueToAttr = (val,attr_,single) => {
  let attr = JSON.parse(JSON.stringify(attr_));
  for (let atrInd in attr) {
    let atr = attr[atrInd]
    switch (atr.type) {
      case 'hidden':
      case 'input':
      case 'color':
      case 'switch':
      case 'icon':
      case 'number':
      case 'textarea':
        atr.value = val[atr.name];
        break;
      case 'array':
        atr.list = [];
        val[atr.name].forEach(v => {
          let tpl = JSON.parse(JSON.stringify(atr.tpl));
          for (let i = 0;i < tpl.length;i++) {
            // if (!tpl[i].name && tpl.length === 1) {
            if (tpl[i].type === 'selectForm') {
              tpl = valueToAttr(v,[tpl[i]],true);
            } else if (typeof v === 'string' && tpl[i].type === "select") {
              let ret = valueToAttr({[tpl[i].name] : v},[tpl[i]]);
              // tpl[i] = (ret instanceof Array) ? ret[0] : ret;
              tpl[i] = ret[0];
            } else {
              tpl[i] = valueToAttr(v,[tpl[i]])[0];
            }
          }
          // atr.list.push(tpl);
          atr.list.push(tpl);
        });
        break;
      case 'select':
        console.log(val,attr,atr);
        let curValue = val[atr.name];
        atr.op.some(op => {
          if (op.value === curValue) {
            atr.value = op.value;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'selectForm':
        if (single) {
          if (atr.name) {} else {
            atr.value = val.type;
            if (val.type in atr.op) {
              atr.curFormData.id = '';
              atr.curFormData.ex = atr.op[val.type];
              atr.curFormData.ex = valueToAttr(val,atr.curFormData.ex);
            }
          }
        }
        console.log(val,attr_,atr);
        break;
      case 'object':
        // for (let i = 0;i < atr.formData.length;i++) {
        //   atr.formData = valueToAttr(val,atr.formData)[0];
        // }
        let rey = valueToAttr(val[atr.name],atr.formData);
        atr.formData = rey;
        break;
      default :
        break;
    }
  };
  return attr;
};

export const createId = () => {
  return 'id_' + (new Date()).getTime();
}

export const deleteSpace = (line) => {
  let cpLine = '';
  let flag = 1;
  line = line || '';
  for (let i = 0;i < line.length;i++) {
    if (line[i] === ' ') {
      flag = 1;
      for (i++;i < line.length;i++) {
        if (line[i] === ' ') {
          flag++;
        } else {
          break;
        }
      }
      i--;
      if (flag - 1) {
      } else {
        cpLine += ' ';
      }
    } else {
      cpLine += line[i];
    }
  }
  return cpLine;
}
