require("./common/manifest.js");
require("./common/vendor.js");
global.webpackJsonpMpvue([7],{

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_store__ = __webpack_require__(53);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = 'app';
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_2__store_store__["a" /* default */];
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

// export default {
//     config: {
//         pages: [
//             "pages/index/main",
//             "pages/logs/main",
//             "pages/counter/main"
//         ],
//         window: {
//             "backgroundTextStyle": "light",
//             "navigationBarBackgroundColor": "#fff",
//             "navigationBarTitleText": "WeChat",
//             "navigationBarTextStyle": "black"
//         }
//     }

// }

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(52);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(50)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3310d047", Component.options)
  } else {
    hotAPI.reload("data-v-3310d047", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 50:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
  }
});

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_http_js__ = __webpack_require__(27);

// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system



__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */].Store({
  state: {
    completed: [], //已完成颜色
    doingType: null, //手机中的颜色类型
    scores: 0,
    devOptions: [//设备类型对应的deveiceID
    {
      deviceId: "123",
      type: 1 //'blue'
    }, {
      deviceId: "123",
      type: 2 //'blue'
    }, {
      deviceId: "123",
      type: 3 //'blue'
    }, {
      deviceIdid: "123",
      type: 4 //'blue'
    }]
  },
  mutations: {
    changeState: function changeState(state, options) {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(options).forEach(function (item) {
        state[item] = options[item];
      });
    },
    setScores: function setScores(state, num) {
      state.scores = num;
    },
    addDevToCompleted: function addDevToCompleted(state, _ref) {
      var typeId = _ref.typeId,
          type = _ref.type;

      state.completed.push({
        type: type,
        typeId: typeId,
        status: 0
      });
    },
    addDbToCompleted: function addDbToCompleted(state, arr) {
      state.completed = arr;
    },
    updateDevCompleted: function updateDevCompleted(state, _ref2) {
      var typeId = _ref2.typeId,
          type = _ref2.type;

      state.completed.map(function (item) {
        if (item.type == type) {
          item.status = 1;
        }
      });
    },
    removeDevCompleted: function removeDevCompleted(state, _ref3) {
      var typeId = _ref3.typeId,
          type = _ref3.type,
          time = _ref3.time;

      var newList = state.completed.filter(function (item) {
        return item.type !== type;
      });
      state.completed = newList;
    }
  },
  actions: {
    delayDetection: function delayDetection(_ref4, _ref5) {
      var commit = _ref4.commit,
          state = _ref4.state;
      var typeId = _ref5.typeId,
          type = _ref5.type,
          braceletId = _ref5.braceletId,
          openId = _ref5.openId,
          gameId = _ref5.gameId,
          time = _ref5.time;
      //延迟检测
      commit('addDevToCompleted', { typeId: typeId, type: type, time: time });
      setTimeout(function () {
        wx.getBeacons({
          success: function success(res) {

            var length = 1;
            if (braceletId == null || braceletId == "") {
              length = 1;
            } else {
              var bracelet = res.beacons.filter(function (item) {
                return item.minor = braceletId;
              }).sort(function (a, b) {
                return a.accuracy - b.accuracy;
              });
              if (bracelet.length > 0) {
                length = 0;
              }
            }

            var distanceDev = res.beacons.filter(function (item) {
              return item.accuracy < 1;
            }).sort(function (a, b) {
              return a.accuracy - b.accuracy;
            });

            if (distanceDev[0].minor == typeId) {
              commit('updateDevCompleted', { typeId: typeId, type: type, time: time });
              console.log(state.completed, '已完成列表');
              //如果超过3个清空提交收集数据并清空已完成列表
              __WEBPACK_IMPORTED_MODULE_3__utils_http_js__["a" /* default */].post("/game/deviceColor/confirm", {
                openId: openId,
                gameId: gameId, //游戏id
                deviceId: typeId,
                length: length
              }).then(function (res) {
                commit('setScores', res.data.scores);
              }, function (res) {
                Notify("网络异常!");
              });
            } else {
              commit('removeDevCompleted', { typeId: typeId, type: type, time: time });
            }
          }
        });
      }, time);
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ })

},[47]);
//# sourceMappingURL=app.js.map