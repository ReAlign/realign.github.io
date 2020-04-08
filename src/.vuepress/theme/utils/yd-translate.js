const yd = {
  url: 'https://openapi.youdao.com/api',
  truncate(q) {
    var len = q.length;
    if (len <= 20) {
      return q;
    }
    return `${q.substring(0, 10)}${len}${q.substring(len - 10, len)}`;
  },
  getParams(text) {
    var appKey = '57bf0c4858b91aed';
    var key = 'sWHUw3lvieWyeZ1Lc1lDIQVTu84qirOf'; //注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    var curTime = Math.round(new Date().getTime() / 1000);
    var query = text;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var _from = 'auto';
    var _to = 'auto';
    var str1 = `${appKey}${yd.truncate(query)}${salt}${curTime}${key}`;
    // console.log(str1);
    var sign = sha256(str1);

    return {
      q: query,
      appKey: appKey,
      salt: salt,
      from: _from,
      to: _to,
      sign: sign,
      signType: 'v3',
      curtime: curTime,
    };
  },
  ajax(text) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: yd.url,
        type: 'post',
        dataType: 'jsonp',
        data: yd.getParams(text),
        success(data = {}) {
          resolve(data);
        },
        error(jqXHR, textStatus, errorThrown) {
          reject({
            jqXHR, textStatus, errorThrown
          });
        }
      });
    });
  },
};

export default yd;