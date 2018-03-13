(function (window) {
    window.storage = localStorage;

    window.config = {
        hostz: "http://xuri.chenxingxianyuan.com",
        hostw: "http://xuri.chenxingxianyuan.com/"//http://www.chenxingxianyuan.com///"http://cxxy.669407.com/"//"http://192.168.1.46/"
    }
    
  window.getUrlParams = function (url) {
     url = url ? url : window.location.href;

      var _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
      for (var i = 0, _len = _arrS.length; i < _len; i++) {
          var pos = _arrS[i].indexOf('=');
          if (pos == -1) {
              continue;
          }
          var name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
          _rs[name] = value;
      }
      return _rs;
  }
    //获取查询参数
  window.getQuery = function () {
     return getUrlParams(location.search);
  }

  window.getJsonSync = function (url, data, succss_cb, fail_cb, withToken) {
      data = data || {};
     if (withToken == undefined) {
          withToken = true;
      }

      if (withToken) {
          data.token = storage.getItem('token');
      }
      mui.ajax(config.host + url, {
          type: 'GET',
          data: data,
          async: false, //同步获取
          dataType: 'json', //服务器返回json格式数据
          timeout: 15000, //15秒超时
          success: function (ret) {
              if (ret.code == 403) {
                  clicked('login.html');
                  return;
              }

              if (ret.code == 405) {
                  mui.alert(ret.message);
                  setTimeout(function(){
                      clicked('people_center.html');
                  }, 500);
                  return;
              }

              if (ret.code == 401) {
                  mui.alert('您的账号已被禁用，请联系客服');
                  setTimeout(function () {
                      clicked('login.html');
                  }, 500);
                  return;
             }

              succss_cb(ret);

          },
          error: function (xhr, type, error) {
              console.log(type);
              // console.log(error.getMessage())
              fail_cb && fail_cb(xhr, type, error)
          }
      });
  }
  window.getJson = function (url, data, succss_cb, fail_cb, withToken) {
      data = data || {};
      if (withToken == undefined) {
          withToken = true;
      }

      if (withToken) {
          data.token = storage.getItem('token');
      }

      mui.ajax(config.host + url, {
          type: 'GET',
          data: data,
          dataType: 'json', //服务器返回json格式数据
          timeout: 15000, //15秒超时
          success: function (ret) {
              if (ret.code == 403) {
                  clicked('login.html');
                  return;
              }
              if (ret.code == 405) {
                  mui.alert(ret.message);
                  setTimeout(function(){
                      clicked('people_center.html');
                 }, 500);
                  return;
              }
              if (ret.code == 401) {
                  mui.alert('您的账号已被禁用，请联系客服');
                  setTimeout(function () {
                      clicked('login.html');
                  }, 500);
                  return;
              }

              succss_cb(ret);
          },
          error: function (xhr, type, error) {
              console.log(JSON.stringify(error));
              // console.log(error.getMessage())
              fail_cb && fail_cb(xhr, type, error)
          }
      });
  }
  window.postJson = function (url, data, succss_cb, fail_cb, withToken) {
      data = data || {};
      if (withToken == undefined) {
          withToken = true;
      }
      if (withToken) {
          data.token = storage.getItem('token');
      }
      mui.ajax(config.host + url, {
          type: 'POST',
          data: data,
          dataType: 'json', //服务器返回json格式数据
          timeout: 15000, //15秒超时
          success: function (ret) {
              if (ret.code == 403) {
                  clicked('login.html');
                  return;
              }
              if (ret.code == 405) {
                  mui.alert(ret.message);
                  setTimeout(function(){
                      clicked('people_center.html');
                  }, 500);
                  return;
              }
              if (ret.code == 401) {
                  mui.alert('您的账号已被禁用，请联系客服');
                  setTimeout(function () {
                      clicked('login.html');
                  }, 500);
                  return;
              }

              succss_cb(ret);
          },
          error: function (xhr, type, error) {
              console.log(type);
              // console.log(error.getMessage())
              fail_cb && fail_cb(xhr, type, error)
          }
      });
    };
    
    
})(window)