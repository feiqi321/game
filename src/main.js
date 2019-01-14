import Vue from 'vue'
import App from './App'
import store from "@/store/store";
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;
const app = new Vue(App)


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
