require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonpMpvue([5],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(17);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_9d9445a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(21);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9d9445a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_9d9445a4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\first\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
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

/***/ 18:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_dist_notify_notify__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      userInfo: {}, //用户信息
      userId: null, //用户设备id
      bindDevDigSts: false,
      listDig: false,
      getUserInfoDig: false,
      blueStatus: false,
      energyState: [false, true, false]
    };
  },


  components: {},

  methods: {
    bindViewTap: function bindViewTap() {
      var url = "../logs/main";
      wx.navigateTo({ url: url });
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
        },
        fail: function fail(res) {
          wx.onBluetoothAdapterStateChange(function (res) {
            if (res.available) {
              _this.blueStatus = true;
            }
          });
        }
      });
    },
    searchBlueTooth: function searchBlueTooth() {
      if (!this.blueStatus) {
        Object(__WEBPACK_IMPORTED_MODULE_0__static_dist_notify_notify__["a" /* default */])("请打开蓝牙设备!");
        return;
      }
      wx.startBluetoothDevicesDiscovery({
        success: function success(res) {
          console.log(res);
          Object(__WEBPACK_IMPORTED_MODULE_0__static_dist_notify_notify__["a" /* default */])("搜索到设备");
          wx.onBluetoothDeviceFound(function (devices) {
            console.log("new device list has founded");
            console.dir(devices);
            console.log(ab2hex(devices[0].advertisData));
          });
        }
      });
    }
  },

  created: function created() {
    this.getUserInfo();
    this.openBlueTooth();
  }
});

/***/ }),

/***/ 21:
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
  }, [_vm._v("999")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "rigth-nav"
  }, [_c('span', {
    staticClass: "i-sb active",
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
    staticClass: "qpanmi red"
  }), _vm._v(" "), _c('div', {
    staticClass: "probar"
  }, [_c('p', [_c('span', {
    staticClass: "m-icon"
  })]), _vm._v(" "), _c('p', [_vm._v("收集中")]), _vm._v(" "), _c('p', {
    staticClass: "bar"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "nlbox"
  }, [_c('dl', [_c('dt', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[0]),
      expression: "energyState[0]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "http://img.isxcxbackend1.cn/椭圆48.png",
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.energyState[0]),
      expression: "!energyState[0]"
    }]
  }, [_vm._v("1")])]), _vm._v(" "), _c('dd', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[0]),
      expression: "energyState[0]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "/static/images/ok.png",
      "mode": "widthFix"
    }
  })])], 1), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[1]),
      expression: "energyState[1]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "http://img.isxcxbackend1.cn/椭圆48.png",
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.energyState[1]),
      expression: "!energyState[1]"
    }]
  }, [_vm._v("2")])]), _vm._v(" "), _c('dd', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[1]),
      expression: "energyState[1]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "/static/images/ok.png",
      "mode": "widthFix"
    }
  })])], 1), _vm._v(" "), _c('dl', [_c('dt', [_c('div', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[2]),
      expression: "energyState[2]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "http://img.isxcxbackend1.cn/椭圆48.png",
      "mode": "widthFix"
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.energyState[2]),
      expression: "!energyState[2]"
    }]
  }, [_vm._v("3")])])]), _vm._v(" "), _c('dd', [_c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.energyState[2]),
      expression: "energyState[2]"
    }],
    staticClass: "m-icon",
    attrs: {
      "src": "/static/images/ok.png",
      "mode": "widthFix"
    }
  })])], 1)], 1), _vm._v(" "), _c('div', {
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
      "click": _vm.toThird
    }
  }), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.bindDevDigSts,
      "show-cancel-button": "",
      "close-on-click-overlay": "",
      "eventid": '4',
      "mpcomid": '1'
    },
    on: {
      "close": function($event) {
        _vm.bindDevDigSts = false
      }
    }
  }, [_c('div', [_c('p', {
    staticClass: "dialog-title"
  }, [_vm._v("请输入设备ID")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userId),
      expression: "userId"
    }],
    staticClass: "dia-field",
    attrs: {
      "type": "text",
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
  })], 1)]), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.listDig,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '5',
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
  }, [_c('p', [_vm._v("\n              解锁10个颜色组合：\n              "), _c('small', [_vm._v("1")]), _vm._v("/10\n              "), _c('span', {
    staticClass: "btn active"
  }, [_vm._v("\n                领取奖励：\n                "), _c('em'), _vm._v("X500\n              ")], 1)], 1), _vm._v(" "), _c('p', [_vm._v("\n              解锁全部颜色组合：\n              "), _c('small', [_vm._v("12")]), _vm._v("/24\n              "), _c('span', {
    staticClass: "btn"
  }, [_vm._v("\n                领取奖励：\n                "), _c('em'), _vm._v("X2000\n              ")], 1)], 1)], 1)]), _vm._v(" "), _c('div', {
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
      "eventid": '6',
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-9d9445a4", esExports)
  }
}

/***/ })

},[16]);
//# sourceMappingURL=main.js.map