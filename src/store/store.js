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
    //升级弹窗
    dia_lv:false,
    //back:null,
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
      setTimeout(() => {
        state.dia_lv = true;

        setTimeout(() => {
          state.dia_lv = false;
          state.addproperty_Show = true;
          state.addproperty.num1 = num1;
          const backgroundAudioManager6 = getApp().globalData.backgroundAudioManager6;
          if (wx.setInnerAudioOption) {
            wx.setInnerAudioOption({
              obeyMuteSwitch: false,
              autoplay: true
            })
          }else {
            backgroundAudioManager6.obeyMuteSwitch = false;
            backgroundAudioManager6.autoplay = true;
          }
          backgroundAudioManager6.title="02动物出现";
          backgroundAudioManager6.src ="http://img.isxcxbackend1.cn/02"+(encodeURIComponent('动物出现'))+".mp3";
          backgroundAudioManager6.play();
          state.addproperty.num2 = num2;

          setTimeout(() => {
            state.addproperty_Show = false;
            state.completed = [];
            state.singleReward = [];
            state.isBracelet = [];
            state.ISENDING = false;
            console.info("第六个点",new Date());
          }, 2000);
        }, 2000);
      }, 1000);
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
    addShToCompleted(state, arr) {
      state.isBracelet = arr;
    },
    addBraceletToCompleted(state, arr) {
      state.singleReward = arr;
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
      commit('addDevToCompleted', { typeId, type, time });
      const back = getApp().globalData.back;
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      }else {
        back.obeyMuteSwitch = false;
        back.autoplay = true;
      }
      player();
      function player(){
        back.title = "06收集";
        back.loop = true;
        back.src = "http://img.isxcxbackend1.cn/06"+(encodeURIComponent('收集'))+".mp3";
        back.play();
       /* back.onEnded(() => {
          player();
        })*/
      }
      setTimeout(() => {
        back.stop();
        console.info("进度条完成时间",new Date());
        wx.getBeacons({
          success(res) {
            console.info(res, "action")
            let length = 1;
            if (braceletId == null || braceletId == "") {
              length = 1;
            } else {
              const bracelet = res.beacons
                .filter(item => {
                  return item.accuracy > 0 && item.accuracy < 0.6 && item.minor == braceletId;
                })
                .sort((a, b) => {
                  return a.accuracy - b.accuracy;
                });
              if (bracelet.length > 0) {
                length = 0;
              }


            }
            let flag = false;
            const distanceDev = res.beacons
              .filter(item => {
                return item.accuracy > 0 && item.accuracy < 0.6;
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
              console.info("接口申请收集时间",new Date());
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
                    console.log(state.completed, '已完成列表');
                    console.info("接口完成时间",new Date());
                    var singleReward = res.data.singleReward;
                    var groupReward = res.data.groupReward;
                    var totalReward = res.data.totalReward;
                    var bigUrl = res.data.bigUrl;
                    var orderNum = res.data.orderNum;

                    const backgroundAudioManager = getApp().globalData.backgroundAudioManager;

                    backgroundAudioManager.title="07收集完成";
                    if (wx.setInnerAudioOption) {
                      wx.setInnerAudioOption({
                        obeyMuteSwitch: false,
                        autoplay: true
                      })
                    }else {
                      backgroundAudioManager.obeyMuteSwitch = false;
                      backgroundAudioManager.autoplay = true;
                    }
                    backgroundAudioManager.src ="http://img.isxcxbackend1.cn/07"+(encodeURIComponent('收集完成'))+".mp3";
                    backgroundAudioManager.play();
                    console.info("07收集完成时间",new Date());
                    if (singleReward>0){
                      commit('setSingleReward', {num:singleReward,orderNum:orderNum,bool:true})
                      console.info("手环奖励完成时间",new Date());
                    }
                    if (groupReward>0){
                      commit('setNewNum',1);
                      commit('addproperty_Handle', {num1:groupReward,num2:totalReward,str:bigUrl});
                      const backgroundAudioManager3 = getApp().globalData.backgroundAudioManager3;
                      if (wx.setInnerAudioOption) {
                        wx.setInnerAudioOption({
                          obeyMuteSwitch: false,
                          autoplay: true
                        })
                      }else {
                        backgroundAudioManager3.obeyMuteSwitch = false;
                        backgroundAudioManager3.autoplay = true;
                      }
                      backgroundAudioManager3.title = "04金币增加";
                      backgroundAudioManager3.src ="http://img.isxcxbackend1.cn/04"+(encodeURIComponent('金币增加'))+".mp3";
                      backgroundAudioManager3.play();
                      const backgroundAudioManager4 = getApp().globalData.backgroundAudioManager4;
                      if (wx.setInnerAudioOption) {
                        wx.setInnerAudioOption({
                          obeyMuteSwitch: false,
                          autoplay: true
                        })
                      }else {
                        backgroundAudioManager4.obeyMuteSwitch = false;
                        backgroundAudioManager4.autoplay = true;
                      }
                      backgroundAudioManager4.title = "08新消息提醒.mp3";
                      backgroundAudioManager4.src ="http://img.isxcxbackend1.cn/08"+(encodeURIComponent('新消息提醒'))+".mp3";
                      backgroundAudioManager4.play();
                      console.info("组合奖励时间",new Date());
                    }else{
                      console.info("第五个点",new Date());
                      commit('setLoaning',false);
                    }

                  },
                  res => {
                    commit('setLoaning',false);
                    commit('removeDevCompleted', { typeId, type, time });
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
