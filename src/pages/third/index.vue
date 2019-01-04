<template>
  <div class="main">
    <div class="top-tool">
      <div class="user-info">
        <dl v-if="userInfo">
          <dt :style="{backgroundImage:'url('+userInfo.avatarUrl+')'}"></dt>
          <dd class="name">{{userInfo.nickName}}</dd>
          <dd class="score">999</dd>
        </dl>
      </div>
      <div class="rigth-nav">
        <span class="i-sb active"></span>
      </div>
    </div>
    <!-- 建造区 -->
    <div class="jzq">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- 建造区 -->
    <div class="ft-box" v-if="!ftHide">
      <div v-if="chooseType==0">
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
      </div>
      <div v-if="chooseType==1">
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
        <dl>
          <dt></dt>
          <dd>500</dd>
        </dl>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div :class="{'ft-nav':true, hide:ftHide} ">
      <div :class="{active:chooseType==0}" @click="chooseType=0">
        植物
        <span class="zw ic"></span>
      </div>
      <div :class="{active:chooseType==1}" @click="chooseType=1">
        建筑
        <span class="jz ic"></span>
      </div>
      <div class="rtool" @click="triggerFt">
        仓库
        <span class="ck ic"></span>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-dialog
      use-slot
      async-close
      :show="buyDig"
      :show-confirm-button="false"
      @close="buyDig=false"
      close-on-click-overlay
    >
      <div class="buydig">
        <dl class="buy-info">
          <dt></dt>
          <dd class="title">圣诞屋</dd>
          <dd class="price">X{{buy.price}}</dd>
        </dl>
        <div class="num">
          <span class="before" @click="changeCount(-1)">-</span>
          <span class="after" @click="changeCount(1)">+</span>
          {{buy.count}}
        </div>
        <p class="total">{{buy.price*buy.count}}</p>
        <div class="btn-w">
          <span class="buy-btn">购买</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Notify from "@/../static/dist/notify/notify";
export default {
  data() {
    return {
      userInfo: null,
      ftHide: true,
      chooseType: 0,
      buyDig: true,
      buy: {
        count: 1,
        price: 5000
      }
    };
  },
  components: {},

  methods: {
    triggerFt() {
      this.ftHide = !this.ftHide;
    },
    changeCount(num) {
      var num = this.buy.count + num;
      num = num < 1 ? 1 : num;
      this.buy.count = num;
    }
  },

  created() {
    this.userInfo = wx.getStorageSync("userinfo");
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #53a999 url(http://img.isxcxbackend1.cn/背景4.jpg) center top
    no-repeat;
  background-size: 100% auto;
  height: 100%;
  position: relative;
}
.top-tool {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
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
    margin-top: 25px;
    .i-sb {
      background: url(http://img.isxcxbackend1.cn/组168.png) center center
        no-repeat;
      background-size: contain;
      width: 35px;
      height: 40px;
      display: inline-block;
      &.active {
        background-image: url(http://img.isxcxbackend1.cn/组168.png);
      }
    }
  }
}
.ft-box {
  background: #fff;
  border: 2.5px solid #333;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 3px 0 #979797;
  bottom: 53px;
  position: absolute;
  padding: 5px 0;
  width: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all ease 0.3s;
  & > div {
    // justify-content: space-around;
    flex-wrap: wrap;
    display: flex;
  }
  dl {
    width: 20%;
    box-sizing: border-box;
    padding: 0 10px;
    dt {
      border: 3px solid #dbdbdb;
      border-radius: 50%;
      overflow: hidden;
      padding: 4px;
      background: url(http://img.isxcxbackend1.cn/鳄鱼-小.png) center center
        no-repeat;
      background-size: 70% auto;
      &::before {
        padding-top: 100%;
        content: "";
        display: block;
      }
    }
    dd {
      text-align: center;
      color: #f7c967;
      line-height: 1.6em;
      font-size: 12px;
    }
  }
  transition: all ease 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 12px;
    left: -2.5px;
    bottom: -5.5px;
    z-index: -1000;
    border: 2.5px solid #333;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top: 0;
  }
}
.ft-nav {
  background: #fff;
  border: 2.5px solid #333;
  border-radius: 8px;
  line-height: 25px;
  height: 25px;
  z-index: 1;
  box-shadow: 0 3px 0 #979797;
  display: flex;
  bottom: 10px;
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  justify-content: space-around;
  transition: all ease 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 12px;
    left: -2.5px;
    bottom: -5.5px;
    z-index: -1000;
    border: 2.5px solid #333;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top: 0;
  }
  &.hide {
    width: 33%;
    transform: translate(0, 0);
    left: 60%;
    div {
      display: none;
      &.rtool {
        display: block;
        width: 100%;
      }
    }
  }
  div {
    width: 33.33%;
    text-align: center;
    font-size: 16px;
    color: #666666;
    transition: all ease 0.3s;
    height: 25px;
    position: relative;
    &::before {
      content: "";
      border: 2.5px solid #333;
      background: #959897;
      position: absolute;
      transform: rotate(45deg);
      border-left: 0;
      border-top: 0;
      width: 12px;
      height: 12px;
      top: -20px;
      left: 50%;
      margin-left: -7px;
      display: none;
    }
    &::after {
      content: "";
      border: 2.5px solid #333;
      background: #fff;
      position: absolute;
      transform: rotate(45deg);
      border-left: 0;
      border-top: 0;
      width: 12px;
      height: 12px;
      top: -24px;
      left: 50%;
      margin-left: -7px;
      display: none;
    }
    &.active {
      color: #333;
      &::before,
      &::after {
        display: block;
      }
    }
    .ic {
      display: inline-block;
      margin-left: 5px;
      width: 16px;
      height: 16px;
      background: center center no-repeat;
      background-size: contain;
      vertical-align: middle;
      &.zw {
        background-image: url(http://img.isxcxbackend1.cn/组172@3x.png);
      }
      &.jz {
        background-image: url(http://img.isxcxbackend1.cn/组173@2x.png);
      }
      &.ck {
        background-image: url(http://img.isxcxbackend1.cn/组169@3x.png);
      }
    }
  }
}
.jzq {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 170px;
  left: 50%;
  margin-left: -245px;
  width: 475px;
  transform: rotate(-19deg) skewX(52deg);
  div {
    width: 20%;
    background: #5f8076;
    height: 50px;
    border: 1rpx dashed #e2dee8;
    box-sizing: border-box;
    opacity: 0.8;
  }
}
.buydig {
  line-height: 30px;
  border: 3.5px solid #000;
  border-radius: 16px;
  position: relative;
  font-size: 12px;
  padding-bottom: 10px;
  .buy-info {
    width: 30%;
    margin: 20px auto 40px;
    text-align: center;
    line-height: 1.6em;
    dt {
      border: 3px solid #dbdbdb;
      border-radius: 50%;
      overflow: hidden;
      padding: 4px;
      background: url(http://img.isxcxbackend1.cn/鳄鱼-小.png) center center
        no-repeat;
      background-size: 70% auto;
      margin-bottom: 10px;
      &::before {
        padding-top: 100%;
        content: "";
        display: block;
      }
    }
    .title {
      font-size: 16px;
    }
    .price {
      font-size: 12px;
    }
  }
  .num {
    width: 40%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    line-height: 23px;
    height: 25px;
    font-size: 16px;
    .before {
      position: absolute;
      left: 0;
      top: 0;
      height: 25px;
      width: 25px;
      line-height: 23px;
      box-sizing: border-box;
      border: 1px solid #353535;
      text-align: center;
      color: #ffc658;
      border-radius: 3px;
    }
    .after {
      position: absolute;
      right: 0;
      top: 0;
      height: 25px;
      width: 25px;
      line-height: 23px;
      box-sizing: border-box;
      border: 1px solid #353535;
      text-align: center;
      color: #ffc658;
      border-radius: 3px;
    }
  }
  .total {
    color: #fdc758;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }
  .btn-w {
    margin-top: 15px;
    text-align: center;
    .buy-btn {
      background: url(http://img.isxcxbackend1.cn/组177.png) center center
        no-repeat;
      background-size: contain;
      width: 110px;
      height: 45px;
      line-height: 43px;
      text-align: center;
      display: inline-block;
      color: #000000;
      font-size: 16px;
    }
  }
}
</style>

