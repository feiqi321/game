// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/utils/http.js";
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    completed: [],//已完成颜色
    doingType: null,//手机中的颜色类型
    scores:0,
    devOptions: [//设备类型对应的deveiceID
      {
        deviceId: "123",
        type: 1 //'blue'
      },
      {
        deviceId: "123",
        type: 2 //'blue'
      },
      {
        deviceId: "123",
        type: 3 //'blue'
      },
      {
        deviceIdid: "123",
        type: 4 //'blue'
      }
    ],
  },
  mutations: {
    changeState: (state, options) => {
      Object.keys(options).forEach((item) => {
        state[item] = options[item]
      })
    },
    setScores: (state, num) => {
      state.scores = num;
    },
    addDevToCompleted(state, { typeId, type }) {
      state.completed.push({
        type,
        typeId,
        status: 0
      })
    },
    addDbToCompleted(state, arr) {
      state.completed = arr;
    },
    updateDevCompleted(state, { typeId, type }) {
      state.completed.map((item) => {
        if (item.type == type) {
          item.status = 1;
        }
      });
    },
    removeDevCompleted(state, { typeId, type, time }) {
      const newList = state.completed.filter((item) => {
        return item.type !== type
      });
      state.completed = newList;
    }
  },
  actions: {
    delayDetection({ commit, state }, { typeId, type,braceletId,openId,gameId, time }) {//延迟检测
      commit('addDevToCompleted', { typeId, type, time })
      setTimeout(() => {
        wx.getBeacons({
          success(res) {

            let length = 1;
            if (braceletId==null || braceletId==""){
              length = 1;
            }else{
              const bracelet = res.beacons
                .filter(item => {
                  return item.minor = braceletId;
                })
                .sort((a, b) => {
                  return a.accuracy - b.accuracy;
                });
              if (bracelet.length>0){
                length = 0;
              }
            }

            const distanceDev = res.beacons
              .filter(item => {
                return item.accuracy < 1;
              })
              .sort((a, b) => {
                return a.accuracy - b.accuracy;
              });


            if (distanceDev[0].minor == typeId) {
              commit('updateDevCompleted', { typeId, type, time })
              console.log(state.completed,'已完成列表');
              //如果超过3个清空提交收集数据并清空已完成列表
              http.post("/game/deviceColor/confirm", {
                  openId: openId,
                  gameId: gameId, //游戏id
                  deviceId: typeId,
                  length:length
                })
                .then(
                  res => {
                    commit('setScores', res.data.scores)

                  },
                  res => {
                    Notify("网络异常!");
                  }
                );
            } else {
              commit('removeDevCompleted', { typeId, type, time })
            }
          }
        });
      }, time);
    },
  }
})

export default store
