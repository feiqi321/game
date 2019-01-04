<template>
  <div class="main">
    <van-notify id="van-notify"/>
    <div class="first">
      <div class="top-tool">
        <div class="user-info">
          <dl>
            <dt :style="{backgroundImage:'url('+userInfo.avatarUrl+')'}"></dt>
            <dd class="name">{{userInfo.nickName}}</dd>
            <dd class="score">999</dd>
          </dl>
        </div>
        <div class="rigth-nav">
          <span class="i-sb active" @click="bindDevDigSts=true"></span>
          <span class="i-sj active" @click="listDig=true">
            <em></em>
          </span>
        </div>
      </div>
      <div class="qpanmi red">
        <!-- <img src="http://img.isxcxbackend1.cn/橙色动图.gif" class="m-icon" mode="widthFix"> -->
      </div>
      <div class="probar">
        <p>
          <span class="m-icon"></span>
        </p>
        <p>收集中</p>
        <p class="bar"></p>
      </div>

      <div class="nlbox">
        <dl>
          <dt>
            <img
              src="http://img.isxcxbackend1.cn/椭圆48.png"
              class="m-icon"
              mode="widthFix"
              v-show="energyState[0]"
            >
            <span v-show="!energyState[0]">1</span>
          </dt>
          <dd>
            <img src="/static/images/ok.png" class="m-icon" mode="widthFix" v-show="energyState[0]">
          </dd>
        </dl>
        <dl>
          <dt>
            <img
              src="http://img.isxcxbackend1.cn/椭圆48.png"
              class="m-icon"
              mode="widthFix"
              v-show="energyState[1]"
            >
            <span v-show="!energyState[1]">2</span>
          </dt>
          <dd>
            <img src="/static/images/ok.png" class="m-icon" mode="widthFix" v-show="energyState[1]">
          </dd>
        </dl>
        <dl>
          <dt>
            <div>
              <img
                src="http://img.isxcxbackend1.cn/椭圆48.png"
                class="m-icon"
                mode="widthFix"
                v-show="energyState[2]"
              >
              <span v-show="!energyState[2]">3</span>
            </div>
          </dt>
          <dd>
            <img src="/static/images/ok.png" class="m-icon" mode="widthFix" v-show="energyState[2]">
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
        @click="toThird"
      >
      <van-dialog
        use-slot
        async-close
        :show="bindDevDigSts"
        show-cancel-button
        @close="bindDevDigSts=false"
        close-on-click-overlay
      >
        <div>
          <p class="dialog-title">请输入设备ID</p>
          <input type="text" v-model="userId" class="dia-field">
        </div>
      </van-dialog>
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
                解锁10个颜色组合：
                <small>1</small>/10
                <span class="btn active">
                  领取奖励：
                  <em></em>X500
                </span>
              </p>
              <p>
                解锁全部颜色组合：
                <small>12</small>/24
                <span class="btn">
                  领取奖励：
                  <em></em>X2000
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
            <div class="tr">
              <div class="td first-child">
                <span class="round c0"></span>
                <span class="round c1"></span>
                <span class="round c2"></span>
              </div>
              <div class="td">
                <span class="new-icon"></span>
              </div>
              <div class="td last-child">12</div>
            </div>
            <div class="tr">
              <div class="td first-child">
                <span class="round c0"></span>
                <span class="round c1"></span>
                <span class="round c2"></span>
              </div>
              <div class="td">12</div>
              <div class="td last-child">12</div>
            </div>
            <div class="tr">
              <div class="td first-child">
                <span class="round c0"></span>
                <span class="round c1"></span>
                <span class="round c2"></span>
              </div>
              <div class="td">12</div>
              <div class="td last-child">12</div>
            </div>
            <div class="tr">
              <div class="td first-child">
                <span class="round c0"></span>
                <span class="round c1"></span>
                <span class="round c2"></span>
              </div>
              <div class="td">12</div>
              <div class="td last-child">12</div>
            </div>
            <div class="tr">
              <div class="td first-child">
                <span class="round c0"></span>
                <span class="round c1"></span>
                <span class="round c2"></span>
              </div>
              <div class="td">12</div>
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
  </div>
</template>

<script>
import Notify from "@/../static/dist/notify/notify";
export default {
  data() {
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
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
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
        },
        fail(res) {
          wx.onBluetoothAdapterStateChange(function(res) {
            if (res.available) {
              _this.blueStatus = true;
            }
          });
        }
      });
    },
    searchBlueTooth() {
      if (!this.blueStatus) {
        Notify("请打开蓝牙设备!");
        return;
      }
      wx.startBluetoothDevicesDiscovery({
        success: function(res) {
          console.log(res);
          Notify("搜索到设备");
          wx.onBluetoothDeviceFound(function(devices) {
            console.log("new device list has founded");
            console.dir(devices);
            console.log(ab2hex(devices[0].advertisData));
          });
        }
      });
    }
  },

  created() {
    this.getUserInfo();
    this.openBlueTooth();
  }
};
</script>

<style lang="scss" scoped>
.first {
  padding: 15px 30px;
  text-align: center;
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
  &.red {
    // background-image: url(http://img.isxcxbackend1.cn/橙色动图.gif);
    background-image: url(https://go.heytea.com/ad/loading);
  }
  &.yellor {
    background-image: url(http://img.isxcxbackend1.cn/黄动图.gif);
  }
  &.blue {
    background-image: url(http://img.isxcxbackend1.cn/蓝色动图.gif);
  }
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
    background: url(http://img.isxcxbackend1.cn/组107.png) center center
      no-repeat;
    background-size: contain;
    height: 21px;
    margin-top: 5px;
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
.dia-field {
  line-height: 40px;
  height: 40px;
  border-bottom: 1rpx solid #e1e1e1;
  margin: 0 20px 20px;
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
</style>

