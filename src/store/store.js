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
    scores: 0,
    bigUrl:null,
    isBracelet:[],
    newnum:0,
    hasSh:false,
    flyjpg:false,
    //升级弹窗
    dia_lv:false,
    ISENDING:false,
    warningText2:null,
    warning2:false,
    addproperty_Show:false,
    addproperty: {
      num1: "0",
      num2: "0"
    },
    singleReward:[],
    devOptions: null
  },
  mutations: {
    setFly: (state, bool)=>  {
      state.flyjpg = bool;
    },
    setSh:  (state, bool)=>  {
      state.hasSh = bool;
    },
    setWarning: (state, str)=>  {
      state.warning2 = true;
      state.warningText2 = str;
      setTimeout(() => {
        state.warning2 = false;
      }, 1500);
    },
    setLoaning: (state, bool)=>  {
      state.ISENDING = bool;
    },
    //调用升级
    dia_lvHandle: (state, str)=>  {
      state.bigUrl = str;
      state.dia_lv = true;
      setTimeout(() => {
        state.dia_lv = false;
      }, 1500);
    },
    undia_lvHandle: (state, str)=>  {
      state.dia_lv = false;
    },
    setNewNum: (state, newNum)=>  {
      state.newnum = newNum;
    },
    changeState: (state, options) => {
      Object.keys(options).forEach((item) => {
        state[item] = options[item]
      })
    },
    addproperty_Handle(state, { num1, num2 ,str})  {
      state.bigUrl = str;
      state.flyjpg = true;
      setTimeout(() => {
        state.flyjpg = false;
        state.dia_lv = true;
        console.info("进入到第一个",str)
        setTimeout(() => {
          state.dia_lv = false;
          state.addproperty_Show = true;
          state.addproperty.num1 = num1;
          state.addproperty.num2 = num2;
          console.info("进入到第二个",num1)
          setTimeout(() => {
            state.addproperty_Show = false;
            state.completed = [];
            state.singleReward = [];
            state.isBracelet = [];
            state.ISENDING = false;
          }, 2000);
        }, 2000);
      }, 2000);
    },
    setScores: (state, num) => {
      state.scores = num;
    },
    setSingleReward: (state, {num,orderNum,bool}) => {

      state.singleReward[orderNum] = num;
      state.isBracelet[orderNum] = bool;
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
    delayDetection({ commit, state }, { typeId, type, braceletId, openId, gameId, time }) {//延迟检测
      console.info("进入都再次确认地方",braceletId);
      commit('addDevToCompleted', { typeId, type, time })
      setTimeout(() => {
        wx.getBeacons({
          success(res) {
            console.info(res, "action")
            let length = 1;
            if (braceletId == null || braceletId == "") {
              length = 1;
            } else {
              const bracelet = res.beacons
                .filter(item => {
                  return item.accuracy > 0 && item.accuracy < 0.5 && item.minor == braceletId;
                })
                .sort((a, b) => {
                  return a.accuracy - b.accuracy;
                });
              if (bracelet.length > 0) {
                commit('setSh',true);
                length = 0;
              }else{
                commit('setSh',false);
              }


            }
            let flag = false;
            const distanceDev = res.beacons
              .filter(item => {
                return item.accuracy > 0 && item.accuracy < 0.5;
              })
              .sort((a, b) => {
                return a.accuracy - b.accuracy;
              });
            console.info(distanceDev + "###" + typeId);
            if (distanceDev.length > 0) {
              distanceDev.forEach((item, index) => {
                if (item.minor == typeId) {
                  flag = true;
                }
              })
            }
            if (flag) {
              commit('updateDevCompleted', { typeId, type, time })
              console.log(state.completed, '已完成列表');
              //如果超过3个清空提交收集数据并清空已完成列表
              http.post("/game/deviceColor/confirm", {
                openId: openId,
                gameId: gameId, //游戏id
                deviceId: typeId,
                length: length
              })
                .then(
                  res => {
                    commit('setScores', res.data.scores)
                    var singleReward = res.data.singleReward;
                    var groupReward = res.data.groupReward;
                    var totalReward = res.data.totalReward;
                    var bigUrl = res.data.bigUrl;
                    var orderNum = res.data.orderNum;
                    console.info("singleReward",singleReward);
                    if (singleReward>0){
                      commit('setSingleReward', {num:singleReward,orderNum:orderNum,bool:true})
                    }
                    if (groupReward>0){
                      commit('setNewNum',1);
                      commit('addproperty_Handle', {num1:groupReward,num2:totalReward,str:bigUrl});
                    }else{
                      commit('setLoaning',false);
                    }

                  },
                  res => {
                    Notify("网络异常7!");
                    commit('setLoaning',false);
                  }
                );
            } else {
              commit('setWarning','离开收集距离,请重新收集');
              commit('removeDevCompleted', { typeId, type, time });
              commit('setLoaning',false);
            }
          }
        });
      }, time);
    },
  }
})

export default store
