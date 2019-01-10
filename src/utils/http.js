var Fly = require("flyio/dist/npm/wx")
var fly = new Fly();
const BASEURL = 'https://www.isxcxbackend1.cn';
fly.config.baseURL = BASEURL;

// request interceptor
fly.interceptors.request.use(config => {
    // if (typeof config.data == 'object' && config.url.indexOf('report-manager') == -1) {
    //   config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
    // }
    // loading = Loading.fly({
    //     fullscreen: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.3)'
    // });
    return config
}, error => {
    Promise.reject(error)
})

fly.interceptors.response.use(
    response => {
        const res = response.data
        // loading.close();
        if (res.code !== '200') {
            return Promise.reject(res.msg);
        } else {
            return res;
        }
    },
    error => {
        // Message({
        //     message: '网络异常!',
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject('网络异常!')
    }
);

export default {
    post(url, params, hasFailTip = true) {
        return fly.post(url, params).then(res => {
            wx.hideLoading();
            return res;
        }, err => {
            // hasFailTip && Message({
            //     message: err,
            //     type: 'error',
            //     duration: 5 * 1000
            // });
            wx.hideLoading();
            return Promise.reject(err);
        })
    }
}