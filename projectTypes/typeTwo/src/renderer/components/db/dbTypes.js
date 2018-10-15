// var allType = {
//     number: ["TINYINT","SMALLINT","MEDIUMINT","INT","BIGINT","FLOAT","DOUBLE"],
//     char: ["CHAR","VARCHAR","TINYBLOB","TINYTEXT","BLOB","TEXT","MEDIUMBLOB","MEDIUMTEXT","LONGBLOB","LONGTEXT"],
//     date: ["DATE","TIME","YEAR","DATETIME","TIMESTAMP"],
//     bit: ["bit"]
// };

const defaultValue = (type) => {
    switch (type) {
        case 'number':
            return (max,min) => {
                return ((max,min,val) => {
                    if (val) {
                        let val_ = parse(val);
                        if (val_.toString() === val) {
                            if (val_ > max || val_ < min) {
                                return '超过取值范围 ' + min + ' ~ ' + max;
                            } else {
                                return null;
                            }
                        } else {
                            return '不是数字格式';
                        }
                    } else {
                        return null;
                    }
                }).bind(null,max,min);
            };
        case 'point':
            return (fn) => {
                return ((fn,obj) => {
                    return fn(obj);
                }).bind(null,fn)
            }
        case 'char':
            return (canHaveDefaultValue) => {
                return ((canHaveDefaultValue,val) => {
                    if (canHaveDefaultValue) {
                        return null;
                    } else {
                        if (val) {
                            return '不能有默认值';
                        } else {
                            return null;
                        }
                    }
                }).bind(null,canHaveDefaultValue)
            };
        case 'date':
            return (format = new RegExp('d{4}-d{2}-d{2}'),defaultVals,max,min) => {
                return ((format,defaultVals,max,min,val) => {
                    if (val) {
                        if (defaultVals.one(_ => _ === val)) {
                            return null;
                        } else {
                            if (format.test(val)) {
                                if (val_ > max || val_ < min) {
                                    return '超过取值范围 ' + min + ' ~ ' + max;
                                } else {
                                    return null;
                                }
                            } else {
                                return '格式错误，格式为【' + format + '】';
                            }
                        }
                    } else {
                        return null;
                    }
                }).bind(null,format,defaultVals,max,min);
            };
    }
};

const NumberMaxLength = 500;
const allType = {
    TINYINT: {
        defaultValue: defaultValue('number')(-128,127),
        length: defaultValue('number')(1,NumberMaxLength)
    },
    SMALLINT: {
        defaultValue: defaultValue('number')(-32768,32767),
        length: defaultValue('number')(1,NumberMaxLength)
    },
    MEDIUMINT: {
        defaultValue: defaultValue('number')(-8388608,8388607),
        length: defaultValue('number')(1,NumberMaxLength)
    },
    INT: {
        defaultValue: defaultValue('number')(-2147483648,2147483647),//'-2147483648~2147483647
        length: defaultValue('number')(1,NumberMaxLength)
    },
    BIGINT: {
        defaultValue: defaultValue('number')(-9223372036854775808,9223372036854775807),//'-9223372036854775808~9223372036854775807
        length: defaultValue('number')(1,NumberMaxLength)
    },
    DECIMAL: {
        defaultValue: defaultValue('char')(0,0),
        length: defaultValue('number')(1,65),
        point: defaultValue('number')(0,30)
    },
    FLOAT: {
        defaultValue: defaultValue('char')(0,0),
        length: defaultValue('number')(1,255),
        point: defaultValue('number')(0,30)
    },
    DOUBLE: {
        defaultValue: defaultValue('char')(0,0),
        length: defaultValue('number')(1,255),
        point: defaultValue('number')(0,30)
    }
};

const buildType = () => {

};
