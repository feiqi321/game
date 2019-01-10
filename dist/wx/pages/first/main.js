require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonpMpvue([5],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(103);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_9d9445a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(112);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9d9445a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_9d9445a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\first\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9d9445a4", Component.options)
  } else {
    hotAPI.reload("data-v-9d9445a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 104:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_http_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__ = __webpack_require__(45);

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
      firstNum: 10,
      myNum: 12,
      firstReward: 200,
      totalNum: 24,
      totalReward: 500,
      totalTask: {},
      userInfo: {}, //用户信息
      gameId: null,
      openId: null,
      braceletId: null, //用户设备id
      userId: null, //用户待绑定设备id
      bindDevDigSts: false, //绑定手环弹窗
      listDig: false, //列表弹窗
      getUserInfoDig: false, //用户授权
      blueStatus: false, //蓝牙是否开启

      animationOptions: ["http://img.isxcxbackend1.cn/橙色动图.gif", "http://img.isxcxbackend1.cn/黄动图.gif", "http://img.isxcxbackend1.cn/蓝色动图.gif", "http://img.isxcxbackend1.cn/绿色动图.gif"],
      colorOptions: ["http://img.isxcxbackend1.cn/椭圆48.png", "http://img.isxcxbackend1.cn/椭圆141.png", "http://img.isxcxbackend1.cn/椭圆140.png", "http://img.isxcxbackend1.cn/椭圆49.png"] //1橙2黄3蓝4 绿

    };
  },


  components: {},
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* mapState */])(["completed", "doingType", "devOptions", "scores"]), {
    animationBg: function animationBg() {
      if (this.completed.length > 0 && this.completed[this.completed.length - 1].status == 0) {
        return this.animationOptions[this.completed[this.completed.length - 1].type - 1];
      } else {
        return "";
      }
    }
  }),
  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(["delayDetection"]), Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapMutations */])(['setScores', "addDbToCompleted"]), {
    bindBraceletId: function bindBraceletId() {
      var _this = this;
      _this.bindDevDigSts = false;
      wx.showLoading({
        title: "绑定设备中..."
      });
      __WEBPACK_IMPORTED_MODULE_2__utils_http_js__["a" /* default */].post("/game/device/bind", {
        openId: _this.openId,
        gameId: _this.gameId, //游戏id
        deviceId: _this.userId
      }).then(function (res) {
        wx.setStorageSync("braceletId", _this.userId);
        _this.braceletId = _this.userId;
      }, function (res) {
        Object(__WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__["a" /* default */])("网络异常!");
      });
    },
    toThird: function toThird() {
      var url = "../third/main";
      // switchTab navigateTo
      wx.navigateTo({ url: url });
    },
    getUserInfo: function getUserInfo() {
      var _this = this;
      var userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        _this.userInfo = userinfo;
        return;
      }
      // wx.getSetting({
      //   success(res) {
      //     if (res.authSetting["scope.userInfo"]) {
      //       wx.getUserInfo({
      //         success: res => {
      //           _this.userInfo = res.userInfo;
      //           wx.setStorageSync("userinfo", res.userInfo);
      //         }
      //       });
      //     } else {
      //       _this.getUserInfoDig = true;
      //     }
      //   },
      //   fail(res) {
      //     _this.getUserInfo();
      //   }
      // });
    },
    openBlueTooth: function openBlueTooth() {
      var _this = this;
      wx.openBluetoothAdapter({
        success: function success(res) {
          _this.blueStatus = true;
          _this.searchBlueTooth();
        },
        fail: function fail(res) {
          wx.onBluetoothAdapterStateChange(function (res) {
            if (res.available) {
              _this.blueStatus = true;
              _this.searchBlueTooth();
            }
          });
        }
      });
    },
    searchBlueTooth: function searchBlueTooth() {
      //搜索设备
      var _this = this;
      if (!this.blueStatus) {
        Object(__WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__["a" /* default */])("请打开蓝牙设备!");
        return;
      }
      wx.startBeaconDiscovery({
        uuids: ["B5B182C7-EAB1-4988-AA99-B5C1517008D9"],
        success: function success(res) {
          wx.onBeaconUpdate(function (res) {
            console.log(res, 2);
            _this.handleFindDevs(res.beacons);
          });
        }
      });
      // wx.startBluetoothDevicesDiscovery({
      //   success: function(res) {
      //     console.log(res);
      //     Notify("搜索到设备");
      //     wx.onBluetoothDeviceFound(function(devices) {
      //       console.log("new device list has founded");
      //       console.dir(devices);
      //       console.log(ab2hex(devices[0].advertisData));
      //     });
      //   }
      // });
    },
    filterDevs: function filterDevs(devs) {
      var _this2 = this;

      var distanceDev = devs.filter(function (item) {
        return item.accuracy < 1;
      }).filter(function (item) {
        return item != _this2.braceletId;
      }).sort(function (a, b) {
        return a.accuracy - b.accuracy;
      });
      if (distanceDev.length > 0) {
        var isExitDevs = this.completed.some(function (item) {
          console.info(item.typeId + "@@@" + distanceDev[0].minor);
          return item.typeId == distanceDev[0].minor;
        });
        console.info("###" + isExitDevs + "#####" + this.devOptions[distanceDev[0].minor]);
        if (isExitDevs && this.devOptions[distanceDev[0].minor]) {
          return false;
        } else {
          return {
            typeId: distanceDev[0].minor,
            type: this.devOptions[distanceDev[0].minor]
          }; //distanceDev[0];
        }
      } else {
        return false;
      }
    },
    handleFindDevs: function handleFindDevs(devs) {
      var _this = this;
      var fDevs = _this.filterDevs(devs);
      if (fDevs.type) {
        __WEBPACK_IMPORTED_MODULE_2__utils_http_js__["a" /* default */].post("/game/deviceColor/collect", {
          openId: _this.openId,
          gameId: _this.gameId, //游戏id
          deviceId: fDevs.typeId
        }).then(function (res) {
          _this.delayDetection({
            typeId: fDevs.typeId,
            type: fDevs.type,
            braceletId: _this.braceletId,
            openId: _this.openId,
            gameId: _this.gameId,
            time: res.data.continuTime
          });
        }, function (res) {
          Object(__WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__["a" /* default */])("网络异常!");
        });
      }
    },
    initUserinfo: function initUserinfo() {
      var _this = this;
      __WEBPACK_IMPORTED_MODULE_2__utils_http_js__["a" /* default */].post("/game/device/query", {
        openId: _this.openId,
        gameId: _this.gameId
      }).then(function (res) {
        console.info(res);
        _this.setScores(res.data.scores);
      }, function (res) {
        Object(__WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__["a" /* default */])("网络异常!");
      });
    },
    initColor: function initColor() {
      var _this = this;
      __WEBPACK_IMPORTED_MODULE_2__utils_http_js__["a" /* default */].post("/game/device/collecting", {
        openId: _this.openId,
        gameId: _this.gameId
      }).then(function (res) {
        console.info(res);
        _this.addDbToCompleted(res.data);
      }, function (res) {
        Object(__WEBPACK_IMPORTED_MODULE_3__static_dist_notify_notify__["a" /* default */])("网络异常!");
      });
    },
    listenSocket: function listenSocket() {
      var task = wx.connectSocket("wss://www.isxcxbackend1.cn/websocket");
      task.onMessage(receiveMsg);
    },
    receiveMsg: function receiveMsg(data) {
      console.info(data);
    }
  }),

  mounted: function mounted() {
    this.userInfo = wx.getStorageSync("userinfo");
    this.openId = wx.getStorageSync("openId");
    this.gameId = wx.getStorageSync("gameId");
    this.braceletId = wx.getStorageSync("braceletId");

    console.log(this.devOptions);
    // this.getUserInfo();
    this.openBlueTooth();
    this.initUserinfo();
    this.initColor();
    //this.listenSocket();
  }
});

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('van-notify', {
    attrs: {
      "id": "van-notify",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "first"
  }, [_c('div', {
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
  }, [_vm._v(_vm._s(_vm.scores))])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "rigth-nav"
  }, [_c('span', {
    class: {
      'i-sb': true, active: _vm.braceletId
    },
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.bindDevDigSts = true
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "i-sj active",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.listDig = true
      }
    }
  }, [_c('em')], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "qpanmi",
    style: ({
      backgroundImage: 'url(' + _vm.animationBg + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "probar"
  }, [_c('p', [_c('span', {
    staticClass: "m-icon"
  })]), _vm._v(" "), _c('p', [_vm._v("收集中")]), _vm._v(" "), _c('p', {
    class: {
      bar: true, active: _vm.animationBg !== '' ? true : false
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "nlbox"
  }, _vm._l((3), function(n, index) {
    return _c('dl', {
      key: n
    }, [_c('dt', [(_vm.completed[n]) ? _c('img', {
      staticClass: "m-icon",
      attrs: {
        "src": _vm.colorOptions[_vm.completed[n].type - 1],
        "mode": "widthFix"
      }
    }) : _vm._e(), _vm._v(" "), (!_vm.completed[n]) ? _c('span', [_vm._v(_vm._s(n + 1))]) : _vm._e()]), _vm._v(" "), _c('dd', [_c('img', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.completed[n] && _vm.completed[n].status === 1),
        expression: "completed[n]&&completed[n].status===1"
      }],
      staticClass: "m-icon",
      attrs: {
        "src": "/static/images/ok.png",
        "mode": "widthFix"
      }
    })])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "tip"
  }, [_c('p', [_c('img', {
    staticClass: "m-icon",
    attrs: {
      "src": "/static/images/ld.png",
      "mode": "widthFix"
    }
  }), _vm._v("收集3个不同颜色的能量可获得积分。\n      ")]), _vm._v(" "), _c('p', {
    staticClass: "en"
  }, [_vm._v("Integrals can be obtained by collecting three different colors of energy.")])], 1), _vm._v(" "), _c('img', {
    staticClass: "ftbtn",
    attrs: {
      "src": "/static/images/btn01.png",
      "mode": "widthFix",
      "lazy-load": "false",
      "eventid": '2'
    },
    on: {
      "click": _vm.searchBlueTooth
    }
  }), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.bindDevDigSts,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '5',
      "mpcomid": '1'
    },
    on: {
      "close": function($event) {
        _vm.bindDevDigSts = false
      }
    }
  }, [_c('div', {
    staticClass: "diaborder binding"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userId),
      expression: "userId"
    }],
    staticClass: "dia-field",
    attrs: {
      "type": "text",
      "placeholder": "请输入手环编号",
      "eventid": '3'
    },
    domProps: {
      "value": (_vm.userId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.userId = $event.target.value
      }
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "dialog-title"
  }, [_vm._v("手环和绑定手机共同收集获得额外奖励")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "btn",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.bindBraceletId
    }
  }, [_vm._v("同意")])])], 1)]), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.listDig,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '6',
      "mpcomid": '2'
    },
    on: {
      "close": function($event) {
        _vm.listDig = false
      }
    }
  }, [_c('div', {
    staticClass: "list"
  }, [_c('div', {
    staticClass: "top"
  }, [_c('div', {
    staticClass: "hd"
  }, [_vm._v("任务")]), _vm._v(" "), _c('div', {
    staticClass: "bd"
  }, [_c('p', [_vm._v("\n              解锁" + _vm._s(_vm.firstNum) + "个颜色组合：\n              "), _c('small', [_vm._v(_vm._s(_vm.myNum))]), _vm._v("/" + _vm._s(_vm.firstNum) + "\n              "), _c('span', {
    staticClass: "btn",
    class: [_vm.myNum >= _vm.firstNum ? 'active' : '']
  }, [_vm._v("\n                领取奖励：\n                "), _c('em'), _vm._v("X" + _vm._s(_vm.firstReward) + "\n              ")], 1)], 1), _vm._v(" "), _c('p', [_vm._v("\n              解锁全部颜色组合：\n              "), _c('small', [_vm._v(_vm._s(_vm.myNum))]), _vm._v("/" + _vm._s(_vm.totalNum) + "\n              "), _c('span', {
    staticClass: "btn"
  }, [_vm._v("\n                领取奖励：\n                "), _c('em'), _vm._v("X" + _vm._s(_vm.totalReward) + "\n              ")], 1)], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "line"
  }), _vm._v(" "), _c('div', {
    staticClass: "list-w"
  }, [_c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_vm._v("颜色组合")]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }), _vm._v(" "), _c('div', {
    staticClass: "td last-child nbg"
  }, [_vm._v("材料")])]), _vm._v(" "), _c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_c('span', {
    staticClass: "round c0"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c1"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c2"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }, [_c('span', {
    staticClass: "new-icon"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td last-child"
  }, [_vm._v("12")])]), _vm._v(" "), _c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_c('span', {
    staticClass: "round c0"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c1"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c2"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }, [_vm._v("12")]), _vm._v(" "), _c('div', {
    staticClass: "td last-child"
  }, [_vm._v("12")])]), _vm._v(" "), _c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_c('span', {
    staticClass: "round c0"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c1"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c2"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }, [_vm._v("12")]), _vm._v(" "), _c('div', {
    staticClass: "td last-child"
  }, [_vm._v("12")])]), _vm._v(" "), _c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_c('span', {
    staticClass: "round c0"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c1"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c2"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }, [_vm._v("12")]), _vm._v(" "), _c('div', {
    staticClass: "td last-child"
  }, [_vm._v("12")])]), _vm._v(" "), _c('div', {
    staticClass: "tr"
  }, [_c('div', {
    staticClass: "td first-child"
  }, [_c('span', {
    staticClass: "round c0"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c1"
  }), _vm._v(" "), _c('span', {
    staticClass: "round c2"
  })]), _vm._v(" "), _c('div', {
    staticClass: "td"
  }, [_vm._v("12")]), _vm._v(" "), _c('div', {
    staticClass: "td last-child"
  }, [_vm._v("12")])])])])]), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.getUserInfoDig,
      "show-confirm-button": false,
      "mpcomid": '4'
    }
  }, [_c('div', {
    staticClass: "diaborder userinfo-btn-wrapper"
  }, [_c('van-button', {
    attrs: {
      "type": "default",
      "open-type": "getUserInfo",
      "eventid": '7',
      "mpcomid": '3'
    },
    on: {
      "getuserinfo": _vm.getUserInfo,
      "click": function($event) {
        _vm.getUserInfoDig = false
      }
    }
  }, [_vm._v("获取用户个人信息")])], 1)])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9d9445a4", esExports)
  }
}

/***/ })

},[102]);
//# sourceMappingURL=main.js.map