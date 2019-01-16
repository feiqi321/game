<template>
  <div class="main">
    <div class="top-tool">
      <div class="user-info" v-if="userInfo">
        <dl>
          <dt :style="{backgroundImage:'url('+userInfo.avatarUrl+')'}"></dt>
          <dd class="name">{{userInfo.nickName}}</dd>
        </dl>
      </div>
    </div>
    <span class="dw-tb"></span>
    <div class="btn-w">
      <span @click="toUrl" class="btn">迷宫</span>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import { mapMutations } from "vuex";
import Notify from "@/../static/dist/notify/notify";
export default {
  data() {
    return {
      openId: null,
      gameId: null,
      userInfo: null //用户信息
    };
  },

  components: {},

  methods: {
    ...mapMutations(["changeState"]),
    toUrl(res) {
      const url = "../first/main";
      // switchTab navigateTo
      wx.navigateTo({ url });
    },
    login() {
      const _this = this;
      wx.showLoading({
        title: "加载中"
      });
      wx.login({
        success: res => {
          console.log(res);
          const code = res.code;
          http
            .post("/game/manager/access", {
              wxCode: code
            })
            .then(
              res => {
                wx.setStorageSync("openId", res.data.openId);
                wx.setStorageSync("gameId", res.data.gameId);
                const listOptions = {};
                res.data.list.forEach(element => {
                  listOptions[element.deviceId] = element.color;
                });
                _this.changeState({
                  devOptions: listOptions
                });
                console.log(res);
              },
              res => {
                console.log(res, 2);
              }
            );
        },
        fail: () => {},
        complete: () => {
          wx.hideLoading();
        }
      });
    }
  },

  created() {
    this.userInfo = wx.getStorageSync("userinfo");
    this.openId = wx.getStorageSync("openId");
    this.gameId = wx.getStorageSync("gameId");
  }
};
</script>

<style lang="scss" scoped>
.common-msg{
  line-height: 48px;
  z-index: 1000;
  border:2px solid #000;
  position: absolute;
  width: 200px;
  text-align: center;
  background: #ff4b4b;
  color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 6px;
}
.main {
  height: 100%;
  background: url(http://img.isxcxbackend1.cn/荟聚宜家中庭前期准备.jpg) center
    center #636e5d no-repeat;
  background-size: cover;
  overflow: hidden;
}
.top-tool {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .user-info {
    overflow: hidden;
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
        padding-top: 17px;
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
}
@keyframes an1 {
  from {
    top: 18%;
  }
  to {
    top: 25%;
  }
}
.dw-tb {
  width: 70px;
  height: 70px;
  background: url(http://img.isxcxbackend1.cn/定位.png) center center no-repeat;
  background-size: contain;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
  position: absolute;
  animation: an1 2s infinite alternate ease;
}
.btn-w {
  position: absolute;
  top: 70%;
  width: 165px;
  left: 50%;
  transform: translate(-50%, 0);
  .btn {
    width: 100%;
    background: url(http://img.isxcxbackend1.cn/组182.png) center center #636e5d
      no-repeat;
    background-size: contain;
    height: 67px;
    line-height: 62px;
    color: #3d3d3d;
    display: inline-block;
    text-align: center;
  }
}
</style>

