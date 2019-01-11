<template>
  <div class="main">
    <van-notify id="van-notify"/>
    <div class="first">
      <div class="top-tool">
        <div class="user-info">
          <dl>
            <dt :style="{backgroundImage:'url('+userInfo.avatarUrl+')'}"></dt>
            <dd class="name">{{userInfo.nickName}}</dd>
            <dd class="score">{{scores}}</dd>
          </dl>
        </div>
        <div class="rigth-nav">
          <span class="i-gs" @click="toBoss" v-if="gsStatus===3"></span>
          <span :class="{'i-sb':true, active:braceletId}" @click="bindDevDigSts=true"></span>
          <span :class="{'i-sj':true, active:hasSh}" @click="showList">
            <em></em>
          </span>
        </div>
      </div>
      <div class="qpanmi" :style="{backgroundImage:'url('+ animationBg +')'}">
        <!-- <img src="http://img.isxcxbackend1.cn/橙色动图.gif" class="m-icon" mode="widthFix"> -->
      </div>
      <div class="probar">
        <p>
          <span class="m-icon"></span>
        </p>
        <p>收集中</p>
        <p :class="{bar:true,active:animationBg!==''? true : false,slow:isSlow}">{{countDownTime}}</p>
      </div>

      <div class="nlbox">
        <dl v-for="n in 3" :key="n">
          <dt>
            <img
              :src="colorOptions[completed[n].type-1]"
              class="m-icon"
              mode="widthFix"
              v-if="completed[n]"
            >
            <span v-if="!completed[n]">{{n+1}}</span>
          </dt>
          <dd>
            <img
              src="/static/images/ok.png"
              class="m-icon"
              mode="widthFix"
              v-show="completed[n]&&completed[n].status===1"
            >
          </dd>
        </dl>
      </div>
      <div class="tip">
        <p>
          <img src="/static/images/ld.png" class="m-icon" mode="widthFix">收集3个不同颜色的能量可获得积分。
        </p>
        <p class="en">Integrals can be obtained by collecting three different colors of energy.</p>
      </div>
      <img
        src="/static/images/btn01.png"
        mode="widthFix"
        lazy-load="false"
        class="ftbtn"
        @click="searchBlueTooth"
      >
      <!-- 手环绑定 -->
      <van-dialog
        use-slot
        async-close
        :show="bindDevDigSts"
        :show-confirm-button="false"
        @close="bindDevDigSts=false"
        close-on-click-overlay
      >
        <div class="diaborder binding">
          <input type="text" v-model="userId" class="dia-field" placeholder="请输入手环编号">
          <p class="dialog-title">手环和绑定手机共同收集获得额外奖励</p>
          <p>
            <span class="btn" @click="bindBraceletId">同意</span>
          </p>
        </div>
      </van-dialog>
      <!-- 收集记录 -->
      <van-dialog
        use-slot
        async-close
        :show="listDig"
        :show-confirm-button="false"
        @close="listDig=false"
        close-on-click-overlay
      >
        <div class="list">
          <div class="top">
            <div class="hd">任务</div>
            <div class="bd">
              <p>
                解锁{{firstNum}}个颜色组合：
                <small>{{myNum}}</small>
                /{{firstNum}}
                <span
                  class="btn"
                  :class="[status ==0 ? 'active':'']"
                  @click="reward(1)"
                >
                  领取奖励：
                  <em></em>
                  X{{firstReward}}
                </span>
              </p>
              <p>
                解锁全部颜色组合：
                <small>{{myNum}}</small>
                /{{totalNum}}
                <span
                  class="btn"
                  :class="[totalStatus ==0 ? 'active':'']"
                  @click="reward(2)"
                >
                  领取奖励：
                  <em></em>
                  X{{totalReward}}
                </span>
              </p>
            </div>
          </div>
          <div class="line"></div>
          <div class="list-w">
            <div class="tr">
              <div class="td first-child">颜色组合</div>
              <div class="td"></div>
              <div class="td last-child nbg">材料</div>
            </div>

            <div class="tr" v-for="n in colorList" :key="n">
              <div class="td first-child">
                <span class="round" :class="'c'+(n.color1-1)"></span>
                <span class="round" :class="'c'+(n.color2-1)"></span>
                <span class="round" :class="'c'+(n.color3-1)"></span>
              </div>
              <div class="td" v-if="n.viewStatus==0">
                <span class="new-icon"></span>
              </div>
              <div class="td">
                <span class="animal-icon" :style="{backgroundImage:'url('+n.url+')'}"></span>
              </div>
              <div class="td last-child">12</div>
            </div>
          </div>
        </div>
      </van-dialog>
      <van-dialog use-slot async-close :show="getUserInfoDig" :show-confirm-button="false">
        <div class="diaborder userinfo-btn-wrapper">
          <van-button
            type="default"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
            @click="getUserInfoDig=false"
          >获取用户个人信息</van-button>
        </div>
      </van-dialog>
    </div>
    <div class="hgbj" v-if="gsStatus===3"></div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import http from "@/utils/http.js";
import Notify from "@/../static/dist/notify/notify";
let ISENDING=false;
export default {
  data() {
    return {
      firstNum: null,
      myNum: null,
      firstReward: null,
      totalNum: null,
      totalReward: null,
      status: null,
      totalStatus: null,
      totalTask: {},
      colorList: [],
      userInfo: {}, //用户信息
      gameId: null,
      openId: null,
      braceletId: null, //用户设备id
      userId: null, //用户待绑定设备id
      bindDevDigSts: false, //绑定手环弹窗
      listDig: false, //列表弹窗
      getUserInfoDig: false, //用户授权
      blueStatus: false, //蓝牙是否开启
      hasSh:false,//是否有手环
      slow:true,//是否冰冻
      countDownTime:'',
      gsStatus: 3,

      animationOptions: [
        "http://img.isxcxbackend1.cn/橙色动图.gif",
        "http://img.isxcxbackend1.cn/黄动图.gif",
        "http://img.isxcxbackend1.cn/蓝色动图.gif",
        "http://img.isxcxbackend1.cn/绿色动图.gif"
      ],
      colorOptions: [
        "http://img.isxcxbackend1.cn/椭圆48.png",
        "http://img.isxcxbackend1.cn/椭圆141.png",
        "http://img.isxcxbackend1.cn/椭圆140.png",
        "http://img.isxcxbackend1.cn/椭圆49.png"
      ] //1橙2黄3蓝4 绿
    };
  },

  components: {},
  computed: {
    ...mapState(["completed", "doingType", "devOptions", "scores"]),
    animationBg() {
      if (
        this.completed.length > 0 &&
        this.completed[this.completed.length - 1].status == 0
      ) {
        return this.animationOptions[
          this.completed[this.completed.length - 1].type - 1
        ];
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["delayDetection"]),
    ...mapMutations(["setScores", "addDbToCompleted"]),
    toBoss() {
      const url = "../boss/main";
      wx.navigateTo({ url });
    },
    bindBraceletId() {
      const _this = this;
      _this.bindDevDigSts = false;
      wx.showLoading({
        title: "绑定设备中..."
      });
      http
        .post("/game/device/bind", {
          openId: _this.openId,
          gameId: _this.gameId, //游戏id
          deviceId: _this.userId
        })
        .then(
          res => {
            wx.setStorageSync("braceletId", _this.userId);
            _this.braceletId = _this.userId;
          },
          res => {
            Notify("网络异常!");
          }
        );
    },
    toThird() {
      const url = "../third/main";
      // switchTab navigateTo
      wx.navigateTo({ url });
    },
    getUserInfo() {
      const _this = this;
      const userinfo = wx.getStorageSync("userinfo");
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
    openBlueTooth() {
      const _this = this;
      wx.openBluetoothAdapter({
        success(res) {
          _this.blueStatus = true;
          _this.searchBlueTooth();
        },
        fail(res) {
          wx.onBluetoothAdapterStateChange(function(res) {
            if (res.available) {
              _this.blueStatus = true;
              _this.searchBlueTooth();
            }
          });
        }
      });
    },
    searchBlueTooth() {
      //搜索设备
      const _this = this;
      if (!this.blueStatus) {
        Notify("请打开蓝牙设备!");
        return;
      }
      wx.startBeaconDiscovery({
        uuids: ["B5B182C7-EAB1-4988-AA99-B5C1517008D9"],
        success: function(res) {
          wx.onBeaconUpdate(res => {
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
    filterDevs(devs) {
      const distanceDev = devs
        .filter(item => {
          return item.accuracy < 1;
        })
        .filter(item => {
          return item != this.braceletId;
        })
        .sort((a, b) => {
          return a.accuracy - b.accuracy;
        });
      if (distanceDev.length > 0) {
        const isExitDevs = this.completed.some(item => {
          console.info(item.typeId + "@@@" + distanceDev[0].minor);
          return item.typeId == distanceDev[0].minor;
        });
        console.info(
          "###" + isExitDevs + "#####" + this.devOptions[distanceDev[0].minor]
        );
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
    handleFindDevs(devs) {
      const _this = this;
      ISENDING=true;
      const fDevs = _this.filterDevs(devs);
      if (fDevs.type) {
        http
          .post("/game/deviceColor/collect", {
            openId: _this.openId,
            gameId: _this.gameId, //游戏id
            deviceId: fDevs.typeId
          })
          .then(
            res => {
              _this.delayDetection({
                typeId: fDevs.typeId,
                type: fDevs.type,
                braceletId: _this.braceletId,
                openId: _this.openId,
                gameId: _this.gameId,
                time: res.data.continuTime*1000
              });
              ISENDING=false;
            },
            res => {
              Notify("网络异常!");
            }
          );
      }else{
        ISENDING=false;
      }
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
            console.info(res);
            _this.setScores(res.data.scores);
          },
          res => {
            Notify("网络异常!");
          }
        );
    },
    initColor() {
      const _this = this;
      http
        .post("/game/device/collecting", {
          openId: _this.openId,
          gameId: _this.gameId
        })
        .then(
          res => {
            console.info(res);
            _this.addDbToCompleted(res.data);
          },
          res => {
            Notify("网络异常!");
          }
        );
    },

    reward(type){
        if (this.status==0 &&　type == 1){
          this.status = 1;
        }else if (tis.totalStatus==0 && type == 2){
          this.totalStatus = 1;
        }

      const _this = this;
      http
        .post("/game/task/reward", {
          openId: _this.openId,
          gameId: _this.gameId,
          type: type
        })
        .then(
          res => {
            _this.setScores(res.data);
          },
          res => {
            Notify("网络异常!");
          }
        );
    },
    showList() {
      this.listDig = true;
      http
        .post("/game/task/findByTask", {
          openId: this.openId,
          gameId: this.gameId
        })
        .then(
          res => {
            this.firstNum = res.data.firstNum;
            this.myNum = res.data.myNum;
            this.firstReward = res.data.scores;
            this.totalNum = res.data.totalNum;
            this.totalReward = res.data.totalScores;
            this.status = res.data.status;
            this.totalStatus = res.data.totalStatus;
          },
          res => {
            Notify("网络异常!");
          }
        );

      http
        .post("/game/deviceColor/listAllByOpenId", {
          openId: this.openId,
          gameId: this.gameId
        })
        .then(
          res => {
            this.colorList = res.data;
          },
          res => {
            Notify("网络异常!");
          }
        );
    },

    countDown(time){
      if(time<=0){
        this.countDownTime='';
        return;
      }
      this.countDownTime=time;
      setTimeout(() => {
        this.countDown(time-1)
      }, 1000);
    },

    receiveMsg(data){
      console.info(data);
    },
    listenSocket(){
      console.info(123)
      wx.connectSocket({url: "wss://www.isxcxbackend1.cn/websocket"});
      wx.onSocketMessage(function(res) {
        console.log('收到服务器内容：' ,res.data)
      })
      //连接失败
      wx.onSocketError(function() {
        console.log('websocket连接失败！');
      })

    },

  },

  mounted() {
    this.userInfo = wx.getStorageSync("userinfo");
    this.openId = wx.getStorageSync("openId");
    this.gameId = wx.getStorageSync("gameId");
    this.braceletId = wx.getStorageSync("braceletId");

    console.log(this.devOptions);
    // this.getUserInfo();
    this.openBlueTooth();
    this.initUserinfo();
    this.initColor();
    this.countDown(1000);
    this.listenSocket();
  }
};
</script>

<style lang="scss" scoped>
.first {
  padding: 15px 30px;
  text-align: center;
  position: relative;
  z-index: 1;
}
.top-tool {
  display: flex;
  justify-content: space-between;
  .user-info {
    dt {
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
    dd {
      margin-left: 70px;
      &.name {
        margin-top: 5px;
        font-weight: bold;
        color: #000;
      }
      &.score {
        width: 93px;
        height: 28px;
        line-height: 24px;
        background: url(http://img.isxcxbackend1.cn/组90@2x.png) center center
          no-repeat;
        background-size: contain;
        color: #ffc63c;
        font-weight: bold;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
  .rigth-nav {
    margin-top: 30px;
    @keyframes an1 {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.4);
      }
    }
    .i-gs {
      background: url(http://img.isxcxbackend1.cn/boss组203.png) center center
        no-repeat;
      background-size: contain;
      width: 24px;
      height: 24px;
      display: inline-block;
      margin-right: 20px;
      animation: an1 ease 1s infinite alternate;
    }
    .i-sb {
      background: url(http://img.isxcxbackend1.cn/组89.png) center center
        no-repeat;
      background-size: contain;
      width: 17px;
      height: 24px;
      display: inline-block;
      margin-right: 10px;
      &.active {
        background-image: url(http://img.isxcxbackend1.cn/手环.png);
      }
    }
    .i-sj {
      background: url(http://img.isxcxbackend1.cn/组10.png) center center
        no-repeat;
      background-size: contain;
      width: 24px;
      height: 24px;
      display: inline-block;
      position: relative;
      &.active {
        em {
          display: block;
        }
      }
      em {
        background: url(http://img.isxcxbackend1.cn/提醒131.png) center center
          no-repeat;
        background-size: contain;
        position: absolute;
        width: 7px;
        height: 7px;
        right: -2px;
        top: -2px;
        display: none;
      }
    }
  }
}
.qpanmi {
  height: 160px;
  margin: 10px 30px 0;
  background: center center no-repeat;
  background-size: contain;
  img {
    width: 100%;
  }
  // &.red {
  //   // background-image: url(http://img.isxcxbackend1.cn/橙色动图.gif);
  //   background-image: url(https://go.heytea.com/ad/loading);
  // }
  // &.yellor {
  //   background-image: url(http://img.isxcxbackend1.cn/黄动图.gif);
  // }
  // &.blue {
  //   background-image: url(http://img.isxcxbackend1.cn/蓝色动图.gif);
  // }
}
.probar {
  font-size: 12px;
  .m-icon {
    background: url(http://img.isxcxbackend1.cn/未标题-1.gif) center center
      no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    display: inline-block;
  }
  .bar {
    background: url(http://img.isxcxbackend1.cn/空条子.png) center center
      no-repeat;
    background-size: contain;
    height: 21px;
    margin-top: 5px;
    &.active {
      background-image: url(http://img.isxcxbackend1.cn/1秒.gif);
    }
    &.slow {
      background-image: url(http://img.isxcxbackend1.cn/1.5冰冻.gif);
    }
  }
}
.nlbox {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  dl {
    width: 55px;
    font-weight: bold;
    color: #666666;
    img {
      width: 100%;
    }
    dt {
      width: 55px;
      height: 50px;
      padding-bottom: 5px;
      background: url(http://img.isxcxbackend1.cn/组92@2x.png) center center
        #fafafa no-repeat;
      background-size: contain;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      img {
        width: 60%;
      }
    }
    dd {
      width: 50%;
      margin: 10px auto;
    }
  }
}
.tip {
  color: #999999;
  line-height: 1.4em;
  font-size: 14px;
  text-align: left;
  .m-icon {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .en {
    font-size: 12px;
    text-indent: 19px;
  }
}
.ftbtn {
  width: 280px;
  margin: 20px auto 0;
}
.dialog-title {
  margin: 20px auto 30px;
}
.binding {
  border-radius: 14px !important;
  padding: 40px 20px 10px;
  .dia-field {
    line-height: 40px;
    height: 40px;
    border-radius: 4px;
    border: 3rpx solid #262724;
    padding: 0 20px;
  }
  .btn {
    width: 85px;
    height: 45px;
    line-height: 40px;
    display: inline-block;
    margin: 0 auto;
    background: url(http://img.isxcxbackend1.cn/组217.png) center center #fafafa
      no-repeat;
    background-size: contain;
  }
}

.diaborder {
  border: 3.5px solid #000;
}
.list {
  line-height: 30px;
  border: 3.5px solid #000;
  border-radius: 16px;
  position: relative;
  font-size: 12px;
  padding-bottom: 10px;
  .top {
    padding: 10px;
    text-align: left;
    line-height: 1.8em;
    .hd {
      color: #000;
      font-size: 16px;
      line-height: 30px;
      font-weight: bold;
    }
    p {
      display: flex;
      justify-content: space-between;
      line-height: 28px;
      margin-bottom: 10px;
      small {
        color: #f3d085;
      }
      .btn {
        background: url(http://img.isxcxbackend1.cn/组120.png) center center
          #fafafa no-repeat;
        background-size: contain;
        width: 140px;
        height: 30px;
        line-height: 25px;
        text-align: center;
        &.active {
          background-image: url(http://img.isxcxbackend1.cn/组125.png);
        }
        em {
          background: url(http://img.isxcxbackend1.cn/组6.png) center center
            #fafafa no-repeat;
          background-size: contain;
          width: 8px;
          height: 17px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 5px;
        }
      }
    }
  }
  .line {
    border-top: 3.5px #000000 solid;
    border-bottom: 3.5px #000000 solid;
    height: 5px;
    background: #b2b2b2;
  }
  .list-w {
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    .tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-weight: bold;
      td {
        text-align: left;
      }
      .first-child {
        margin-right: 20px;
      }
      .last-child {
        text-align: center;
        background: url(http://img.isxcxbackend1.cn/组121.png) no-repeat;
        background-size: contain;
        width: 60px;
        height: 30px;
        color: #ffc655;
        margin-left: 20px;
        line-height: 26px;
      }
      .nbg {
        background: none;
      }
    }

    .new-icon {
      background: center center no-repeat;
      background-image: url(http://img.isxcxbackend1.cn/组124.png);
      background-size: contain;
      width: 25px;
      height: 16px;
      display: inline-block;
      margin: 0 5px;
    }
    .animal-icon {
      background: center center no-repeat;
      background-image: url(http://img.isxcxbackend1.cn/鳄鱼-小.png);
      background-size: 100% auto;
      width: 40px;
      height: 40px;
      display: inline-block;
      margin: 0 5px;
    }
  }
  // .close{
  //   width: 30px;
  //   height: 30px;
  //   position: absolute;
  //   right: -10px;
  //   top: -10px;
  //   background: url(http://img.isxcxbackend1.cn/组119.png) no-repeat;
  //   background-size: contain;
  // }
}
.userinfo-btn-wrapper {
  padding: 40px 0;
}
.round {
  background: center center no-repeat;
  background-size: contain;
  width: 32px;
  height: 32px;
  margin: 0 5px;
  display: inline-block;
  &.c0 {
    background-image: url(http://img.isxcxbackend1.cn/椭圆78.png);
  }
  &.c1 {
    background-image: url(http://img.isxcxbackend1.cn/椭圆65.png);
  }
  &.c2 {
    background-image: url(http://img.isxcxbackend1.cn/椭圆74.png);
  }
  &.c3 {
    background-image: url(http://img.isxcxbackend1.cn/椭圆75.png);
  }
}
.hgbj {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url(http://img.isxcxbackend1.cn/红光闪动.gif) center center
    no-repeat;
  background-size: cover;
  z-index: 0;
}
</style>

