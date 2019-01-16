<template>
  <div class="main">
    <span class="common-msg" v-if="warning" @click="warning=false">！游戏尚未开始</span>
    <div class="btn-w">
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo"></button>
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
      warning:false,
      gameId: null,
      code:null,
      status:0,
      userInfo: null //用户信息
    };
  },

  components: {},

  methods: {
    ...mapMutations(["changeState"]),

    getUserInfo(res){
      const _this = this;
      if (_this.status==1){
        return;
      }
      _this.status = 1;
      wx.login({
        success: res => {
          _this.code = res.code;
          wx.getUserInfo({
            success: res => {
              _this.userInfo = res.userInfo;
              wx.setStorageSync("userinfo", res.userInfo);
              http
                .post("/game/manager/access", {
                  nickName:res.userInfo.nickName,
                  imgUrl:res.userInfo.avatarUrl,
                  wxCode: _this.code
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
                    const url = "../index/main";
                    // switchTab navigateTo
                    wx.navigateTo({ url });
                    setTimeout(()=>{
                      _this.status = 0;
                    },5000)

                  },
                  res => {
                    _this.warning = true;
                    setTimeout(()=>{
                      _this.status = 0;
                    },5000)
                  }
                );

            }
          });
        },
        fail: () => {_this.status = 0;},
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
  background: url(http://img.isxcxbackend1.cn/图层2.png) center
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
  top: 76%;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  button {
    width: 100%;
    background: none;
    background-size: contain;
    height: 67px;
    line-height: 62px;
    opacity: 1;
    background: url(http://img.isxcxbackend1.cn/start-gif.gif) center center
      no-repeat;
    background-size: cover;
    &::after{ border: none; } 
  }
}
</style>

