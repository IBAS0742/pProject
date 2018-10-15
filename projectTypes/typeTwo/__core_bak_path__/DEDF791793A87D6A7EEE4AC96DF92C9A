/**
 * ======================= dbMethod JSON 编写规范 ==========================
 * */
let info = {
  a: 'b',
  c: {
    __method__(data) {
      return 'dear method to data';
    },
    __name__: '',
    __info__: {
      e: f
    }
  }
}
/**
 * 最后的注释可能容易理解一点
 * a 和 c 是从服务器获取的内容的字段，
 * b 是将 a 转为 b 名称进行显示
 * c 中的 __info__ 可以理解为：通过 __method__ 方法处理了 原始数据 后得到数据 __data__,
 *      使用 __data__ 为原始数据， __info__ 为处理方法，进行迭代处理
 *      __name__ 如果不为 逻辑否 则，将 该部分生成的数据放置在以 __name__ 为名的键中
 * 例如原始从服务器获取数据
 */
data = {
  name: 'ibas',
  info: '{ "age": 18, "sex": "male", "height": 160 }',
  bakInfo: '{ "age": 18, "sex": "male", "height": 160 }',
}
/**
 * 当数据格式定义如下时
 */
let myInfo = {
  name: 'name',
  info: {
    __method__(data) {
      return JSON.parse(data.info)
    },
    __info__: {
      age: 'age',
      sex: 'sex',
      height: 'height'
    }
  },
  bakInfo: {
    __method__(data) {
      return JSON.parse(data.info)
    },
    __name__: 'bak',
    __info__: {
      age: 'age',
      sex: 'sex',
      height: 'height'
    }
  }
}
/**
 * 应该获取到以下格式
 */
let outData = {
  name: 'ibas',
  age: 18,
  sex: 'male',
  height: 160,
  bak: {
    age: 18,
    sex: 'male',
    height: 160
  }
}

/**
 * info 中 左边为 【服务器】 请求回来的数据对象的键
 * 右边如果是一个 【字符串】 表示将该对象中 左边指定的 键名 修改为右边指定的 键名
 * 右边如果未对象，那么如果未对象，那么必须存在一个 __method__ ，表示对对象中制定 键名 的内容进行处理
 *        将处理结果视为 【服务器】 请求回来的数据，__info__ 视为 info 迭代处理
 *        如果存在 __name__ 表示，迭代处理后的内容保存到 键名 为 __name__ 指定的名称下
 */


/**
 * ======================= toDB JSON 编写规范 ==========================
 * */
let info = {
  a: 'a',
  b(data) {
    return JSON.stringify(data.b);
  }
};
/**
 * 左边依旧是和服务器交互时，服务器需要的字段信息
 * 右边是处理方法，如果直接取用，只有写对应的 键名 即可
 * 如果需要预处理，可以使用方法，传入参数是数据
 *
 * 下面举例
 */
let data = {
  a: 'IBAS',
  age: '19',
  sex: 'male',
  bak: {
    age: '18',
    sex: 'female'
  }
};
/**
 * 现在希望转换为以下格式
 * {
 *    name: 'IBAS',
 *    info: { age: '19' , sex : 'male' },
 *    bak: { age: '18' , sex : 'female' }
 * }
 * */
let jsonFormat = {
  name: {
    field: 'a'
  },
  info: {
    dear(data) {
      return JSON.stringify({
        age: data.age,
        sex: data.sex
      });
    }
  },
  bak: {
    dear(data) {
      return JSON.stringify(data.bak);
    }
  }
};



