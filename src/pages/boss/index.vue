<template>
  <div class="main" id="boss">
    <div class="hgbj"></div>
    <div class="boss">
      <div class="bossbody" @click="addFs"></div>
      <div class="top-tool">
        <div class="user-info">
          <div :style="{ backgroundImage: 'url(' + userInfo.avatarUrl + ')' }"></div>
          <dl style="padding-left:11px;">
            <dd class="name">{{userInfo.nickName}}</dd>
            <dd class="score">{{ scores }}</dd>
          </dl>
        </div>
        <div class="rigth-nav"  @click="toPageReturn(3)">
          <span class="i-sb active"></span>
      </div>
    </div>
    <div class="m-icon"></div>
    <div class="probar">
      <div class="blood">
        <div class="jdt" :style="{width:jdtWidth+'%'}"></div>
      </div>
      <div class="clock">
        <span class="left-clock-l">倒计时</span>
        <span class="left-clock-r">{{overtime}}</span>
      </div>
      <div class="yy"></div>
      <div class="bar">
        <div class="attack">
          <p class="left-attack-l">战斗力 ATTACK : 3
            <span style="padding-right: 10px;color:#FFD306" v-if="braceletIdType">+3</span>
            <span class="zdl-icon" v-if="braceletIdType"></span>
          </p>
        </div>
        <div class="damage">
          <p class="left-damage-l">总伤害 DAMAGE : {{totalAttack}}</p>
        </div>
      </div>
        <div class="textShow">
          <p>点击怪物一起保护PARKILAND</p>
        </div>
      </div>

      <van-popup
        :show="listDig"
        @close="listDig=false"
        :custom-style="'background-color:transparent;overflow: initial;width:85vw;'"
        transition="fade"
      >
        <div class="endboxok" v-if="listDig">
          <p class="title">守护成功</p>
          <p class="first-part">在所有人的努力下</p>
          <p class="bettwen">怪兽被击退了 家园被守护</p>

          <p class="second-part">你对怪兽的伤害为99%</p>
          <p class="bettwen-button">你获得了XXX能量作为奖励</p>
          <div class="btn" style="position: absolute;top: 72%;width: 100px;height: 50px;left: 50%;margin-left: -50px;">
            <p class="confirmShow"  @click="toPageReturn(1)">确认</p>
          </div>
          <div class="failbj"></div>
        </div>
      </van-popup>
      <van-popup
        :show="listDig2"
        :custom-style="'background-color:transparent;overflow: initial;width:85vw;'"
        @close="listDig2=false"
        transition="fade"
      >
        <div class="endboxfail" v-if="listDig2">
          <p class="title" style="color:red;">守护失败</p>
          <p class="first-part"></p>
          <p class="bettwen">您在怪兽入侵期间表现不佳</p>

          <p class="second-part"></p>
          <p class="bettwen-button">您的家园被摧毁了</p>
          <div class="btn" style="position: absolute;top: 72%;width: 100px;height: 50px;left: 50%;margin-left: -50px;">
            <p class="confirmShow" @click="toPageReturn(2)">确认</p>
          </div>
          <div class="failbj"></div>
        </div>
      </van-popup>
      <div class="shz">
        <span v-for="(item,i) in fsList" :key="i">{{item}}</span>
      </div>
    </div>





  </div>
</template>

<script>
import http from "@/utils/http.js";

export default {
  data() {
    return {
      listDig: false,
      listDig2: false,
      totalAttack:0,
      overtime:null,
      socketTask:null,
      jdtWidth: 100,
      gsStatus:0,
      scores:0,
      pageNo:null,
      gameId: null,
      openId: null,
      timer:null,
      second:0,
      backgroundAudioManager8:null,
      minute:0,
      braceletId: null, //用户设备id
      braceletIdType:0,
      fsList: [],
      attackStatus:0,
      userInfo: null //用户信息
    };
  },

  components: {},

  methods: {
    getUserInfo(res) {
      const _this = this;
      const userinfo = wx.getStorageSync("userinfo");
      if (userinfo) {
        _this.userInfo = userinfo;
        return;
      }
    },
    addFs() {
      var damage = 0;
      this.backgroundAudioManager8.title="05恐龙打击时";
      this.backgroundAudioManager8.src ="http://parkiland.isxcxbackend1.cn/05"+(encodeURIComponent('恐龙打击时'))+".mp3";
      this.backgroundAudioManager8.play();
      if (this.attackStatus==0){
        if (this.braceletIdType){
          damage = Math.floor(Math.random() * 6 + 4) ;
        }else{
          damage = Math.floor(Math.random() * 3 + 2) ;
        }

        this.totalAttack = this.totalAttack+damage;
        setTimeout(() => {
          this.socketTask.send({
            data: this.openId+','+this.gameId+","+damage
          })
        }, 0);
        if (this.fsList.length>50){
          this.fsList.splice(0,40);
        }
        this.fsList.push(-damage);
        setTimeout(() => {
          this.fsList.shift();
        }, 2000);
      }
    },

    listenSocket(){
      var _this = this;
      this.socketTask = getApp().globalData.socketTask;
      this.socketTask.onMessage(function(res) {

        if ((res.data+"").indexOf("98")>=0){//boss攻击中
          _this.jdtWidth = res.data.split("@")[1];
        }else if ((res.data+"").indexOf("99")>=0){//boss死掉了
          _this.attackStatus =1;
          _this.listDig = true;
          _this.jdtWidth = 0;
        }else if ((res.data+"").indexOf("97")>=0){//boss到时间未死掉
          _this.listDig2 = true;
          _this.attackStatus =1;
        }else if ((res.data+"").indexOf("100")>=0) {
          wx.reLaunch({
            url: "../one/main"
          })
        }
      })

      //连接失败
      this.socketTask.onError(function() {
        console.log('websocket连接失败！');

      })

    },
    initBoss(){
      const _this = this;
      http
        .post("/game/game/findBlood", {
          openId: _this.openId,
          gameId: _this.gameId, //游戏id
        })
        .then(
          res => {
            _this.totalAttack = res.data.attack;
            _this.jdtWidth = res.data.percent*100;
            _this.listDig = false;
            _this.listDig2 = false;
            _this.backgroundAudioManager8 = getApp().globalData.backgroundAudioManager8;
            if (wx.setInnerAudioOption) {
              wx.setInnerAudioOption({
                obeyMuteSwitch: false,
                autoplay: true
              })
            }else {
              backgroundAudioManager8.obeyMuteSwitch = false;
              backgroundAudioManager8.autoplay = true;
            }
            var sed = res.data.sed;
            var lasttime =res.data.lasttime;
            _this.timer = setInterval(() => {
              if (sed==0 && lasttime > 0) {
                lasttime = lasttime - 1;
                sed = 59;
              }else if (sed>0){
                sed = sed-1;
              }else if(sed==0 && lasttime == 0){
                clearInterval(timer);
              }
              if (lasttime>0  && sed>=10){
                this.overtime = lasttime+":"+sed
              }else if (lasttime>0 && sed>=0 && sed<10){
                this.overtime = lasttime+":0"+sed
              }else if (lasttime==0 && sed>=10){
                this.overtime = sed
              }else if (lasttime==0 && sed>0 && sed<10){
                this.overtime = "0"+sed
              }else if (lasttime==0 && sed==0){
                this.overtime = "0";
              }
            }, 1000);
          },
          res => {

          }
        );
    },
    initUserinfo() {
      const _this = this;
      http
        .post("/game/device/query", {
          openId: _this.openId,
          gameId: _this.gameId
        })
        .then(
          res => {
            _this.scores = res.data.scores;
          },
          res => {

          }
        );
    },
    toPageReturn(flag){
      if (flag==3){
        wx.redirectTo({ url:"../first/main" });
      }else{
        this.listDig = false;
        this.listDig2 = false;
        wx.redirectTo({ url:"../first/main" });
      }
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageNo = options.pageNo;
  },
  onHide(){
    clearTimeout(this.timer);
  },
  onShow() {
    this.openId = wx.getStorageSync("openId");
    this.gameId = wx.getStorageSync("gameId");
    this.braceletId = wx.getStorageSync("braceletId");
    this.braceletIdType = wx.getStorageSync("braceletIdType");
    this.getUserInfo();
    this.initBoss();
    this.initUserinfo();
  },
  mounted(){
    this.listenSocket();
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: url(http://parkiland.isxcxbackend1.cn/手机恐龙背景.png) center center
    #ffffff no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.boss {
  position: relative;
  z-index: 1;
  background: url(http://parkiland.isxcxbackend1.cn/云.png) center center no-repeat;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  .bossbody{
    position: absolute;
    width: 60%;
    height: 40%;
    opacity: .4;
    left: 50%;
    top: 50%;
    z-index: 1;
    border-radius: 100px;
    transform: translate(-50%,-50%)
  }
}
.top-tool {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .user-info {
    overflow: hidden;
    &>div{
      width: 60px;
      height: 60px;
      float: left;
      border: 3px solid #000000;
      border-radius: 50%;
      box-sizing: border-box;
      background: center center no-repeat;
      background-size: contain;
      text-align: left;
    }
    dl {
      margin-left: 18px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        text-align: left;
        /*margin-top: 5px;*/
        font-weight: bold;
        color: #000;
      }
      .score {
        width: 93px;
        height: 32px;
        padding-bottom: 20rpx;
        padding-left: 8px;
        box-sizing: border-box;
        line-height: 50rpx;
        background: url(http://parkiland.isxcxbackend1.cn/组90@2x.png) center center
        no-repeat;
        background-size: contain;
        color: #ffc63c;
        font-weight: bold;
        text-align: center;
        font-size:16px;
      }
    }
  }
  .rigth-nav {
    margin-top: 20px;
    position: relative;
    z-index: 1;
    .i-sb {
      background: url(http://parkiland.isxcxbackend1.cn/组218.png) center center
        no-repeat;
      background-size: contain;
      width: 30px;
      height: 30px;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
.m-icon {
  background: url(http://parkiland.isxcxbackend1.cn/怪兽动图.gif) center center
    no-repeat;
  background-size: contain;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  display: inline-block;
}
.probar {
  font-size: 12px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 15vh;
  .blood {
    height: 16px;
    width: 72vw;
    position: absolute;
    top: 10px;
    left: 14vw;
    border: 2px solid #000;
    background: #fff;
    border-radius: 100px;
    position: relative;
    box-sizing: border-box;
    &::before {
      width: 100%;
      height: 7px;
      border: 2px solid #000;
      border-top: 0;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      position: absolute;
      left: -2px;
      bottom: -6px;
      content: "";
    }
  }
  .jdt {
    background: #f85151;
    background-size: 100% 100%;
    width: 80%;
    height: 100%;
    border-radius: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    &::before {
      width: 90%;
      height: 4px;
      background: #ffa2a2;
      position: absolute;
      left: 5%;
      top: 2px;
      content: "";
      border-radius: 100px;
    }
  }
  .clock {
    background: url(http://parkiland.isxcxbackend1.cn/路径295.png) left center
      no-repeat;
    background-size: 15px 15px;
    height: 15px;
    width: 100vw;
    position: absolute;
    top: 8vh;
    left: 36vw;
    display: inline-block;
    font-weight: bold;
    .left-clock-l {
      margin-left: 20px;
    }
    .left-clock-r {
      margin-left: 12px;
    }
  }
  .yy {
    background: url(http://parkiland.isxcxbackend1.cn/投影.png) center center
      no-repeat;
    background-size: contain;
    left: 11vw;
    width: 70vw;
    height: 60px;
    position: absolute;
    top: 51vh;
    display: inline-block;
    position: relative;
  }
  .bar {
    background: url(http://parkiland.isxcxbackend1.cn/组219.png) center center
      no-repeat;
    background-size: 80vw 90px;
    width: 80vw;
    height: 90px;
    position: absolute;
    top: 63vh;
    display: inline-block;
    left: 12vw;
    box-sizing: border-box;
    padding-top: 10px;
    .damage {
      background: url(http://parkiland.isxcxbackend1.cn/组215.png) left center
        no-repeat;
      background-size: auto 100%;
      width: 80vw;
      margin-left: 40px;
      margin-top: 10px;
      display: inline-block;
      .left-damage-l {
        font-weight: bold;
        margin-left: 40px;
      }
    }
    .attack {
      background: url(http://parkiland.isxcxbackend1.cn/组212.png) left center
        no-repeat;
      background-size: auto 80%;
      width: 80vw;
      margin-left: 40px;
      margin-top: 10px;
      display: inline-block;
      .left-attack-l {
        font-weight: bold;
        margin-left: 40px;
      }
      .zdl-icon {
        height: 16px;
        width: 16px;
        background: url(http://parkiland.isxcxbackend1.cn/组204.png) center center
          no-repeat;
        background-size: contain;
        display: inline-block;
        margin: 0 auto;
        vertical-align: middle;
      }
    }
  }
  .textShow {
    width: 80vw;
    height: 90px;
    position: absolute;
    top: 80vh;
    display: inline-block;
    font-weight: bold;
    color: white;
    left: 20vw;
  }
}
.endboxfail {
  background: url(http://img.isxcxbackend1.cn/保护失败.png) center center no-repeat;
  background-color: transparent;
  background-size: 100% 100%;
  border-radius: 16px;
  text-align: center;
  left:14vw;
  width: 76vw;
  height: 70vh;
  z-index:12;
  position: relative;
  .title {
    color: #ffa042;
    font-size: 42px;
    padding-top: 50rpx;
  }
  .first-part {
    padding-top: 50rpx;
  }
  .second-part {
    padding-top: 25px;
  }
  .bettwen {
    padding-top: 10px;
  }
  .bettwen-button {
    padding-top: 23rpx;
    display: inline-block;
  }
  .btn {
    background: url(http://parkiland.isxcxbackend1.cn/组221.png) center center
    no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 1;
    .confirmShow {
      line-height: 50px;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.endboxok {
  background: url(http://parkiland.isxcxbackend1.cn/保护成功.png) center center no-repeat;
  background-color: transparent;
  background-size: 100% 100%;
  border-radius: 16px;
  text-align: center;
  left:14vw;
  width: 76vw;
  height: 70vh;
  position: relative;
  z-index:10;
  .title {
    color: #ffa042;
    font-size: 42px;
    padding-top: 50rpx;
  }
  .first-part {
    padding-top: 50rpx;
  }
  .second-part {
    padding-top: 25px;
  }
  .bettwen {
    padding-top: 10px;
  }
  .bettwen-button {
    padding-top: 23rpx;
    display: inline-block;
  }
  .btn {
    background: url(http://parkiland.isxcxbackend1.cn/组221.png) center center
    no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 1;
    .confirmShow {
      line-height: 50px;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.shz {
  height: 24%;
  width: 10%;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  span {
    animation: an1 2s 1 ease;
    position: absolute;
    bottom: 0;
    color: #fd3231;
    font-size: 36px;
    opacity: 0;
  }
}
@keyframes an1 {
  from {
    top: 0%;
    opacity: 1;
  }
  to {
    top: 80%;
    opacity: 0;
    display: none;
  }
}
.hgbj {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(http://parkiland.isxcxbackend1.cn/红光闪动2.gif) center center
    no-repeat;
  background-size: cover;
  z-index: 0;
  opacity: 0.6;
}
</style>

