export const getUrlParam = function() {
  var param = window.location.href.split('?');
  if (param.length == 1) {
    return {};
  } else {
    var dic = {};
    param[1].split('&').forEach(function(i) {
      var p = i.split('=');
      if (dic[p[0]]) {
        if (dic[p[0]] instanceof Array) {
          dic[p[0]].push(p[1]);
        } else {
          dic[p[0]] = [dic[p[0]],p[1]];
        }
      } else {
        dic[p[0]] = p[1];
      }
    });
    return dic;
  }
}
