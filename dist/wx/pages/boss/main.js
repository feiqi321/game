require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonpMpvue([6],{

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(92);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d89e72f6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(95);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d89e72f6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d89e72f6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/boss/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d89e72f6", Component.options)
  } else {
    hotAPI.reload("data-v-d89e72f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_http_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__static_dist_notify_notify__ = __webpack_require__(45);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      listDig: false,
      listDig2: false,
      totalAttack: 0,
      overtime: null,
      jdtWidth: 100,
      gsStatus: 0,
      gameId: null,
      openId: null,
      braceletId: null, //用户设备id
      fsList: [],

      userInfo: null //用户信息
    };
  },


  components: {},

  methods: {
    getUserInfo: function getUserInfo(res) {
      var _this = this;
      var userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        _this.userInfo = userinfo;
        return;
      }
    },
    addFs: function addFs() {
      var _this2 = this;

      var damage = Math.floor(Math.random() * 3 + 2);
      this.totalAttack = this.totalAttack + damage;
      wx.sendSocketMessage({
        data: this.openId + ',' + this.gameId + "," + this.totalAttack
      });
      this.fsList.push(-damage);
      setTimeout(function () {
        _this2.fsList.shift();
      }, 2000);
    },
    initTime: function initTime() {
      var _this3 = this;

      var sed = 0;
      var lasttime = 3;
      var timer = setInterval(function () {
        if (sed == 0 && lasttime > 0) {
          lasttime = lasttime - 1;
          sed = 59;
        } else if (sed > 0) {
          sed = sed - 1;
        } else if (sed == 0 && lasttime == 0) {
          clearInterval(timer);
        }
        if (lasttime > 0 && sed >= 10) {
          _this3.overtime = lasttime + ":" + sed;
        } else if (lasttime > 0 && sed >= 0 && sed < 10) {
          _this3.overtime = lasttime + ":0" + sed;
        } else if (lasttime == 0 && sed >= 10) {
          _this3.overtime = sed;
        } else if (lasttime == 0 && sed > 0 && sed < 10) {
          _this3.overtime = "0" + sed;
        } else if (lasttime == 0 && sed == 0) {
          _this3.overtime = "0";
        }
      }, 1000);
    },
    listenSocket: function listenSocket() {
      var _this = this;
      wx.connectSocket({ url: "wss://www.isxcxbackend1.cn/websocket" });
      wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：', res.data);
        if (res.data.indexOf("98") >= 0) {
          //boss攻击中
          _this.jdtWidth = res.data.split("@")[1];
        } else if (res.data.indexOf("99") >= 0) {
          //boss死掉了
          _this.listDig = true;
        } else if (res.data.indexOf("97") >= 0) {
          //boss到时间未死掉
          _this.listDig2 = true;
        }
      });

      //连接失败
      wx.onSocketError(function () {
        console.log('websocket连接失败！');
      });
    },
    initBoss: function initBoss() {
      var _this = this;
      __WEBPACK_IMPORTED_MODULE_0__utils_http_js__["a" /* default */].post("/game/game/findBlood", {
        openId: _this.openId,
        gameId: _this.gameId //游戏id
      }).then(function (res) {
        _this.totalAttack = res.data.attack;
        _this.jdtWidth = res.data.percent;
      }, function (res) {
        Object(__WEBPACK_IMPORTED_MODULE_1__static_dist_notify_notify__["a" /* default */])("网络异常!");
      });
    }
  },

  created: function created() {
    this.openId = wx.getStorageSync("openId");
    this.gameId = wx.getStorageSync("gameId");
    this.braceletId = wx.getStorageSync("braceletId");
    this.getUserInfo();
    this.initTime();
    this.initBoss();
  }
});

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main",
    attrs: {
      "id": "boss"
    }
  }, [_c('div', {
    staticClass: "hgbj"
  }), _vm._v(" "), _c('div', {
    staticClass: "boss"
  }, [_c('div', {
    staticClass: "bossbody",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.addFs
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "top-tool"
  }, [_c('div', {
    staticClass: "user-info"
  }, [_c('dl', [_c('dt', {
    style: ({
      backgroundImage: 'url(' + _vm.userInfo.avatarUrl + ')'
    })
  }), _vm._v(" "), _c('dd', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.userInfo.nickName))]), _vm._v(" "), _c('dd', {
    staticClass: "score"
  }, [_vm._v("999")])], 1)], 1), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "m-icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "probar"
  }, [_c('div', {
    staticClass: "blood"
  }, [_c('div', {
    staticClass: "jdt",
    style: ({
      width: _vm.jdtWidth + '%'
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "clock"
  }, [_c('span', {
    staticClass: "left-clock-l"
  }, [_vm._v("倒计时")]), _vm._v(" "), _c('span', {
    staticClass: "left-clock-r"
  }, [_vm._v(_vm._s(_vm.overtime))])]), _vm._v(" "), _c('div', {
    staticClass: "yy"
  }), _vm._v(" "), _c('div', {
    staticClass: "bar"
  }, [_c('div', {
    staticClass: "attack"
  }, [_c('p', {
    staticClass: "left-attack-l"
  }, [_vm._v("战斗力 ATTACK : 3\n          "), _c('span', {
    staticStyle: {
      "padding-right": "10px",
      "color": "#FFD306"
    }
  }, [_vm._v("+3")]), _vm._v(" "), _c('span', {
    staticClass: "zdl-icon"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "damage"
  }, [_c('p', {
    staticClass: "left-damage-l"
  }, [_vm._v("总伤害 DAMAGE : " + _vm._s(_vm.totalAttack))])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "textShow"
  }, [_c('p', [_vm._v("点击怪物一起保护PARKILAND")])], 1)]), _vm._v(" "), _c('van-dialog', {
    staticClass: "dialogbox",
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.listDig,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '1',
      "mpcomid": '0'
    },
    on: {
      "close": function($event) {
        _vm.listDig = false
      }
    }
  }, [_c('div', {
    staticClass: "endbox"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("守护成功")]), _vm._v(" "), _c('p', {
    staticClass: "first-part"
  }, [_vm._v("在所有人的努力下")]), _vm._v(" "), _c('p', {
    staticClass: "bettwen"
  }, [_vm._v("怪兽被击退了 家园被守护")]), _vm._v(" "), _c('p', {
    staticClass: "second-part"
  }, [_vm._v("你对怪兽的伤害为99%")]), _vm._v(" "), _c('p', {
    staticClass: "bettwen-button"
  }, [_vm._v("你获得了XXX能量作为奖励")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_c('p', {
    staticClass: "confirmShow"
  }, [_vm._v("确认")])], 1), _vm._v(" "), _c('div', {
    staticClass: "failbj"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "successShow"
  })]), _vm._v(" "), _c('div', {
    staticClass: "shz"
  }, _vm._l((_vm.fsList), function(item, i) {
    return _c('span', {
      key: i
    }, [_vm._v(_vm._s(item))])
  }))], 1), _vm._v(" "), _c('van-dialog', {
    staticClass: "dialogbox",
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.listDig2,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '2',
      "mpcomid": '1'
    },
    on: {
      "close": function($event) {
        _vm.listDig2 = false
      }
    }
  }, [_c('div', {
    staticClass: "endbox"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("守护失败")]), _vm._v(" "), _c('p', {
    staticClass: "first-part"
  }), _vm._v(" "), _c('p', {
    staticClass: "bettwen"
  }, [_vm._v("您在怪兽入侵期间表现不佳")]), _vm._v(" "), _c('p', {
    staticClass: "second-part"
  }), _vm._v(" "), _c('p', {
    staticClass: "bettwen-button"
  }, [_vm._v("您的家园被摧毁了")]), _vm._v(" "), _c('div', {
    staticClass: "btn"
  }, [_c('p', {
    staticClass: "confirmShow"
  }, [_vm._v("确认")])], 1), _vm._v(" "), _c('div', {
    staticClass: "failbj"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "successShow"
  })]), _vm._v(" "), _c('div', {
    staticClass: "shz"
  }, _vm._l((_vm.fsList), function(item, i) {
    return _c('span', {
      key: i
    }, [_vm._v(_vm._s(item))])
  }))], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rigth-nav"
  }, [_c('span', {
    staticClass: "i-sb active"
  })])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d89e72f6", esExports)
  }
}

/***/ })

},[91]);
//# sourceMappingURL=main.js.map