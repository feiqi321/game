require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonpMpvue([3],{

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(38);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_00bfd725_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(41);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(39)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-00bfd725"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_template_compiler_index_id_data_v_00bfd725_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_1_1_4_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\third\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00bfd725", Component.options)
  } else {
    hotAPI.reload("data-v-00bfd725", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 39:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 40:
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


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      userInfo: null,
      ftHide: true,
      chooseType: 0,
      buyDig: true,
      buy: {
        count: 1,
        price: 5000
      }
    };
  },

  components: {},

  methods: {
    triggerFt: function triggerFt() {
      this.ftHide = !this.ftHide;
    },
    changeCount: function changeCount(num) {
      var num = this.buy.count + num;
      num = num < 1 ? 1 : num;
      this.buy.count = num;
    }
  },

  created: function created() {
    this.userInfo = wx.getStorageSync("userinfo");
  }
});

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('div', {
    staticClass: "top-tool"
  }, [_c('div', {
    staticClass: "user-info"
  }, [(_vm.userInfo) ? _c('dl', [_c('dt', {
    style: ({
      backgroundImage: 'url(' + _vm.userInfo.avatarUrl + ')'
    })
  }), _vm._v(" "), _c('dd', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.userInfo.nickName))]), _vm._v(" "), _c('dd', {
    staticClass: "score"
  }, [_vm._v("999")])], 1) : _vm._e()], 1), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _vm._m(1), _vm._v(" "), (!_vm.ftHide) ? _c('div', {
    staticClass: "ft-box"
  }, [(_vm.chooseType == 0) ? _c('div', [_c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.chooseType == 1) ? _c('div', [_c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1), _vm._v(" "), _c('dl', [_c('dt'), _vm._v(" "), _c('dd', [_vm._v("500")])], 1)], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      'ft-nav': true, hide: _vm.ftHide
    }
  }, [_c('div', {
    class: {
      active: _vm.chooseType == 0
    },
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.chooseType = 0
      }
    }
  }, [_vm._v("\n      植物\n      "), _c('span', {
    staticClass: "zw ic"
  })]), _vm._v(" "), _c('div', {
    class: {
      active: _vm.chooseType == 1
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.chooseType = 1
      }
    }
  }, [_vm._v("\n      建筑\n      "), _c('span', {
    staticClass: "jz ic"
  })]), _vm._v(" "), _c('div', {
    staticClass: "rtool",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.triggerFt
    }
  }, [_vm._v("\n      仓库\n      "), _c('span', {
    staticClass: "ck ic"
  })])]), _vm._v(" "), _c('van-dialog', {
    attrs: {
      "use-slot": "",
      "async-close": "",
      "show": _vm.buyDig,
      "show-confirm-button": false,
      "close-on-click-overlay": "",
      "eventid": '5',
      "mpcomid": '0'
    },
    on: {
      "close": function($event) {
        _vm.buyDig = false
      }
    }
  }, [_c('div', {
    staticClass: "buydig"
  }, [_c('dl', {
    staticClass: "buy-info"
  }, [_c('dt'), _vm._v(" "), _c('dd', {
    staticClass: "title"
  }, [_vm._v("圣诞屋")]), _vm._v(" "), _c('dd', {
    staticClass: "price"
  }, [_vm._v("X" + _vm._s(_vm.buy.price))])], 1), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "before",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function($event) {
        _vm.changeCount(-1)
      }
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('span', {
    staticClass: "after",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.changeCount(1)
      }
    }
  }, [_vm._v("+")]), _vm._v("\n        " + _vm._s(_vm.buy.count) + "\n      ")]), _vm._v(" "), _c('p', {
    staticClass: "total"
  }, [_vm._v(_vm._s(_vm.buy.price * _vm.buy.count))]), _vm._v(" "), _c('div', {
    staticClass: "btn-w"
  }, [_c('span', {
    staticClass: "buy-btn"
  }, [_vm._v("购买")])])], 1)])], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rigth-nav"
  }, [_c('span', {
    staticClass: "i-sb active"
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "jzq"
  }, [_c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div')])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-00bfd725", esExports)
  }
}

/***/ })

},[37]);
//# sourceMappingURL=main.js.map