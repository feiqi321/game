<template>
  <div class="main" id="boss">
    <div class="hgbj"></div>
    <div class="boss">
      <div class="bossbody" @click="addFs"></div>
      <div class="top-tool">
        <div class="user-info">
          <dl>
            <dt :style="{backgroundImage:'url('+userInfo.avatarUrl+')'}"></dt>
            <dd class="name">{{userInfo.nickName}}</dd>
            <dd class="score">999</dd>
          </dl>
        </div>
        <div class="rigth-nav">
          <span class="i-sb active" @click="addFs"></span>
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
            <span style="padding-right: 10px;color:#FFD306">+3</span>
            <span class="zdl-icon"></span>
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

      <van-dialog
        use-slot
        async-close
        :show="listDig"
        :show-confirm-button="false"
        @close="listDig=false"
        close-on-click-overlay
        class="dialogbox"
      >
        <div class="endbox">
          <p class="title">守护成功</p>
          <p class="first-part">在所有人的努力下</p>
          <p class="bettwen">怪兽被击退了 家园被守护</p>

          <p class="second-part">你对怪兽的伤害为99%</p>
          <p class="bettwen-button">你获得了XXX能量作为奖励</p>
          <div class="btn">
            <p class="confirmShow">确认</p>
          </div>
          <div class="failbj"></div>
        </div>
        <div class="successShow"></div>
      </van-dialog>
      <div class="shz">
        <span v-for="(item,i) in fsList" :key="i">{{item}}</span>
      </div>
    </div>

    <van-dialog
      use-slot
      async-close
      :show="listDig2"
      :show-confirm-button="false"
      @close="listDig2=false"
      close-on-click-overlay
      class="dialogbox"
    >
      <div class="endbox">
        <p class="title">守护失败</p>
        <p class="first-part"></p>
        <p class="bettwen">您在怪兽入侵期间表现不佳</p>

        <p class="second-part"></p>
        <p class="bettwen-button">您的家园被摧毁了</p>
        <div class="btn">
          <p class="confirmShow">确认</p>
        </div>
        <div class="failbj"></div>
      </div>
      <div class="successShow"></div>
    </van-dialog>

      <div class="shz">
        <span v-for="(item,i) in fsList" :key="i">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listDig: false,
      listDig2: false,
      totalAttack:0,
      overtime:null,
      jdtWidth: 50,
      fsList: [],
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
    attack() {
      console.info("11111");
    },
    addFs() {
      this.fsList.push(-Math.floor(Math.random() * 3 + 2));
      setTimeout(() => {
        this.fsList.shift();
      }, 2000);
    },
    initTime(){
      var sed = 0;
      var lasttime=3;
      var timer = setInterval(() => {
        console.info(111)
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
    }
  },

  created() {
    this.getUserInfo();
    this.initTime();
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: url(http://img.isxcxbackend1.cn/手机恐龙背景.png) center center
    #636e5d no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.boss {
  position: relative;
  z-index: 1;
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
    margin-top: 20px;

    .i-sb {
      background: url(http://img.isxcxbackend1.cn/组218.png) center center
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
  background: url(http://img.isxcxbackend1.cn/怪兽动图.gif) center center
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
    background: url(http://img.isxcxbackend1.cn/路径295.png) left center
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
    background: url(http://img.isxcxbackend1.cn/投影.png) center center
      no-repeat;
    background-size: contain;
    left: 11vw;
    width: 63vw;
    height: 60px;
    position: absolute;
    top: 55vh;
    display: inline-block;
    position: relative;
  }
  .bar {
    background: url(http://img.isxcxbackend1.cn/组221.png) center center
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
      background: url(http://img.isxcxbackend1.cn/组215.png) left center
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
      background: url(http://img.isxcxbackend1.cn/组212.png) left center
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
        background: url(http://img.isxcxbackend1.cn/组204.png) center center
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
.endbox {
  background: url(http://img.isxcxbackend1.cn/组220.png) center center no-repeat;
  background-color: transparent;
  background-size: 85vw 70vh;
  border-radius: 16px;
  text-align: center;
  //left:10vw;
  width: 85vw;
  height: 70vh;
  position: relative;
  .failbj {
    position: absolute;
    background: url(http://img.isxcxbackend1.cn/守护失败.png) center center
      no-repeat;
    background-size: 60%;
    width: 100%;
    height: 60vh;
    left: 20%;
    bottom: -14%;
    content: "";
  }
  .sucbj {
    position: absolute;
    background: url(http://img.isxcxbackend1.cn/守护成功.png) center center
      no-repeat;
    background-size: 60%;
    width: 100%;
    height: 60vh;
    left: 20%;
    bottom: -14%;
    content: "";
  }
  .title {
    color: #ffa042;
    font-size: 42px;
    padding-top: 20px;
  }
  .first-part {
    padding-top: 40px;
  }
  .second-part {
    padding-top: 25px;
  }
  .bettwen {
    padding-top: 10px;
  }
  .bettwen-button {
    padding-top: 25px;
    display: inline-block;
  }
  .btn {
    background: url(http://img.isxcxbackend1.cn/组221.png) center center
      no-repeat;
    background-size: 100px 50px;
    width: 85vw;
    height: 30vh;
    position: absolute;
    z-index: 1;
    .confirmShow {
      padding-top: 75px;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .successShow {
    background: url(http://img.isxcxbackend1.cn/守护成功.png) center center
      no-repeat;
    background-size: contain;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    display: inline-block;
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
  background: url(http://img.isxcxbackend1.cn/红光闪动.gif) center center
    no-repeat;
  background-size: cover;
  z-index: 0;
  opacity: 0.6;
}
</style>

