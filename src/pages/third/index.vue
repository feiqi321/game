<template>
  <div class="main" id="thirdPage">
    <div
      id="dropGroup"
      v-show="currentDrop.show"
      :style="{ left: currentDrop.left + 'px', top: currentDrop.top + 'px' }"
    >
      <img :src="currentDrop.src" mode="aspectFit" id="dropImg" />
      <div class="dropTools" v-show="currentDrop.tools">
        <img
          :src="'http://img.isxcxbackend1.cn/' + '组178@3x.png'"
          @click="dropDown"
        />
        <img
          :src="'http://img.isxcxbackend1.cn/' + '组179@3x.png'"
          @click="dropCancal"
        />
      </div>
    </div>
    <div class="top-tool">
      <div class="user-info">
        <dl v-if="userInfo">
          <dt
            :style="{ backgroundImage: 'url(' + userInfo.avatarUrl + ')' }"
          ></dt>
          <dd class="name">{{ userInfo.nickName }}</dd>
          <dd class="score">{{myMoney}}</dd>
        </dl>
      </div>
      <div class="rigth-nav"><span class="i-sb active"></span></div>
    </div>
    <div id="real90"></div>
    <img
      @load="load"
      mode="aspectFit"
      :src="[item.name]"
      class="showImg"
      v-for="(item, i) in picInfo"
      :style="{ left: item.imgleft + 'px', top: item.imgtop + 'px' }"
      :data-index="item.index"
      :data-obj="item"
      :key="index"
      @longpress="deleteOne"
    />
    <!-- 建造区 -->
    <div class="jzq" :style="[showJzq ? '' : 'visibility: hidden']">
      <div
        class="_place"
        :class="[i == currentActive ? currentClaz : '']"
        v-for="i in 36"
        :key="i"
      >
        {{ i }}
      </div>
    </div>
    <!-- 建造区 -->
    <div class="ft-box" v-show="!ftHide">
      <!--购买区-->
      <div v-if="chooseType == ind" v-for="(it,ind) in 2">
        <dl v-for="(item, index) in pic[ind]" :key="index">
            <dt
              :data-obj="item"
              :style="item.style"
              @click="buyHandle"
            ></dt>
            <dd>{{item.price}}</dd>
        </dl>
      </div>
      <!--仓库区-->
      <div v-if="chooseType == 2">
        <dl v-for="(item, index) in pic[2]" :key="index">
          <dt
            :data-obj="item"
            @touchstart="tStart"
            @touchmove="tMove"
            @touchend="tEnd"
            :style="item.style"
          ></dt>
          <dd>x{{item.num}}</dd>
        </dl>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div :class="{ 'ft-nav': true, hide: false }">
      <div :class="{ active: chooseType == 0 }" @click="chooseType = 0">
        植物 <span class="zw ic"></span>
      </div>
      <div :class="{ active: chooseType == 1 }" @click="chooseType = 1">
        建筑 <span class="jz ic"></span>
      </div>
      <div :class="{ active: chooseType == 2 }" @click="openCk">
        仓库 <span class="ck ic"></span>
      </div>
      <!--<div class="rtool " @click="triggerFt">-->
      <!--仓库 <span class="ck ic"></span>-->
      <!--</div>-->
    </div>
    <!-- 弹窗 -->
    <van-dialog
      use-slot
      async-close
      :show="buyDig.dig"
      :show-confirm-button="false"
      @close="buyDig.dig = false"
      close-on-click-overlay
    >
      <div class="buydig">
        <dl class="buy-info">
          <dt :style="buyDig.style"></dt>
          <dd class="title">圣诞屋</dd>
          <dd class="price">X{{ buyDig.price }}</dd>
        </dl>
        <div class="num">
          <span class="before" @click="changeCount(-1)">-</span>
          <span class="after" @click="changeCount(1)">+</span>
          {{ buyDig.buyNum }}
        </div>
        <p class="total">{{ buyDig.price * buyDig.buyNum }}</p>
        <div class="btn-w"><span class="buy-btn" @click="buyOneHandle">购买</span></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import httpReq from "../../api";
import {throttle} from '../../utils/index';
export default {
  data() {
    return {
      userInfo: null,
      ftHide: false,
      chooseType: 0,
      baseUrl: "http://img.isxcxbackend1.cn/",
      //底部可购买的数组
      pic: [
        [],
        [],
        []
      ],
      placePosition: [],
      //真实90宽高的像素
      real90: {},
      //禁止建筑的菱形索引
      noActive: [0, 1, 2, 6, 7, 12, 13, 17, 18, 23, 28, 29, 33, 34, 35],
      //已放置的菱形索引
      hasActive: [],
      //当前建筑的对象
      currentBottom: {},
      //当前激活的菱形
      currentActive: -1,
      //已建造的数组
      picInfo: [],
      currentDrop: {
        src: "",
        left: "10",
        top: "10",
        tools: false,
        show: false
      },
      buyDig:{
        dig: false,
        style:{},
        current: {},
        buyNum: 1,
        price: 0
      },
      showJzq: false,
      myMoney: 999,
    };
  },
  watch: {
    picInfo(newValue) {
      this.hasActive = newValue.reduce((acc, item) => {
        acc.push(item.index);
        return acc;
      }, []);
    }
  },
  beforeCreate() {
    //获取植物
    httpReq({
      url: "/game/warehouse/findAllShop",
      data: {
        type: 1
      }
    }).then(({data}) => {
      // this.pic[0] = data;
      data.forEach((item)=>{
        item.style = `background:url("${item.url1}") center no-repeat`
      });
      this.$set(this.pic, 0, data);
      console.log(data)
    });
    //获取建筑
    httpReq({
      url: "/game/warehouse/findAllShop",
      data: {
        type: 2
      }
    }).then(({data}) => {
      // this.pic[1] = data;
      data.forEach((item)=>{
        item.style = `background:url("${item.url1}") center no-repeat`
      });
      this.$set(this.pic, 1, data);
    });
  },
  created() {
    this.userInfo = wx.getStorageSync("userinfo");
    //初始化仓库列表
    this.openCk(true);
    //移动时
    this.tMove = throttle(e => {
      let { clientX, clientY } = e;
      let left = clientX;
      let top = clientY;
      let data = this.placePosition;
      let minVal = Infinity;
      let currentActive = -1;
      let currentDrop = this.currentDrop;
      //拿到两点之间最小的距离与菱形索引
      data.forEach((item, i) => {
        let result = this.minRange(left, top, item._left, item._top);
        if (result < minVal) {
          minVal = result;
          currentActive = i;
        }
      });
      this.currentActive = currentActive;
      let { _left, _top } = this.placePosition[currentActive];
      let pos = this.calcPos(_left, _top, this.real90);
      this.currentDrop.left = pos.x;
      this.currentDrop.top = pos.y;
    }, 80);
  },
  mounted() {
    //已建 图片
    httpReq({
      url: "/game/warehouse/findMyBuild"
    }).then(({ data }) => {
      if (data != null) {
        this.picInfo = data.reduce((acc, item) => {
          acc.push({
            name: item.url,
            index: item.posi
          });
          return acc;
        }, []);
        //拿菱形
        this.get_places();
      }
    });
  },
  computed: {
    whichActive() {
      return this.noActive.includes(this.currentActive);
    },
    currentClaz() {
      return this.whichActive ? "noActive" : "active";
    }
  },
  methods: {
    //删除一个
    deleteOne(e){
      // {
      //   "name": "http://img.isxcxbackend1.cn/1800.png",
      //   "index": 20,
      //   "id": "",
      //   "dataset": {},
      //   "left": 123.18643188476562,
      //   "right": 284.4046325683594,
      //   "top": 354,
      //   "bottom": 412.6786193847656,
      //   "width": 161.21820068359375,
      //   "height": 58.678619384765625,
      //   "_left": 204,
      //   "_top": 383,
      //   "imgleft": 154.5,
      //   "imgtop": 315.5
      // }
      let obj = e.currentTarget.dataset.obj;

      console.log(obj)
    },
    //购买按钮
    buyOneHandle(){
      httpReq({
        url: '/game/warehouse/buyProduct',
        data:{
          shopId:this.buyDig.current.id,
          num:this.buyDig.buyNum
        }
      }).then(({data})=>{
        this.myMoney = data;
        this.buyDig.dig = false;
      })
    },
    //购买一个
    buyHandle(e){
      let obj = this.buyDig.current = e.currentTarget.dataset.obj;
      console.log(obj)
      //显示弹窗
      this.buyDig.dig = true;
      this.buyDig.price = obj.price;
      this.buyDig.style = obj.style;
    },
    //打开仓库
    openCk(init){
      init && (this.chooseType = 2);
      httpReq({
        url:'/game/warehouse/findAllMyWareHouse',
        data:{"type":1}
      }).then(({data})=>{
        data.forEach((item)=>{
          item.style = `background:url("${item.url1}") center no-repeat`
        });
        this.$set(this.pic, 2, data);
        console.log(this.pic)
      })
    },
    load(e) {
      // let _height = e.target.height;
      // let _width = e.target.width;
      // let index = e.target.dataset.index;
      // let realIndex = this.picInfo.findIndex(item => {
      //   return item.index == index;
      // });
      // this.$set(
      //   this.picInfo,
      //   realIndex,
      //   Object.assign(this.picInfo[realIndex], { _height, _width })
      // );
    },
    switchJzq() {
      this.showJzq = !this.showJzq;
    },
    //触摸开始
    tStart(e) {
      console.log(e)
      this.showJzq = true;
      this.currentBottom = e;
      let url = e.currentTarget.dataset.obj.url3;
      this.currentDrop.tools = false;
      this.currentDrop.src =  url;
      this.currentDrop.show = true;
      // this.triggerFt();
    },
    //触摸移动
    // tMove(e) {
    //
    // },
    //触摸结束
    tEnd(e) {
      console.log(e);
      this.currentDrop.tools = true;
    },
    dropDown() {
      let index = this.currentActive;
      let obj = this.currentBottom.currentTarget.dataset.obj;
      this.switchJzq();
      this.currentDrop.show = false;
      console.log(obj);
      if (this.noActive.includes(index) || this.hasActive.includes(index)) {
        console.log("禁止放入");
      } else {
        httpReq({
          url: '/game/warehouse/build',
          data:{
            wareId:obj.id,
            posi:index
          }
        }).then(({code,data})=>{
          if (code == 200) {
            this.openCk();
          }
        })
        this.picInfo.push(this.mixinObj(index, { name:obj.url3, index }));
      }
    },
    dropCancal() {
      // this.triggerFt();
      this.switchJzq();
      this.currentDrop.show = false;
    },
    //两点间距离公式
    minRange(x1, y1, x2, y2) {
      return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    },
    get_places() {
      const query1 = wx.createSelectorQuery();
      query1
        .select("#real90")
        .boundingClientRect()
        .exec(res => {
          this.real90 = res[0];
          //获取菱形DOM
          const query = wx.createSelectorQuery();
          query.selectAll("._place").boundingClientRect();
          query.exec(this._placehandl);
        });
    },
    //增强对象
    handlePicPos() {
      this.picInfo = this.picInfo.map((item, index) => {
        return this.mixinObj(item.index, item);
      });
      console.log("picInfo", this.picInfo);
    },
    //dva  index:菱形索引
    mixinObj(index, item) {
      let targetInfo = this.placePosition[index];
      let pos = this.calcPos(targetInfo._left, targetInfo._top, this.real90);
      return Object.assign({}, item, targetInfo, {
        imgleft: pos.x,
        imgtop: pos.y
      });
    },
    //菱形的坐标  return 加上偏移量的坐标
    calcPos(tarx1, tary1, real90) {
      return {
        x: tarx1 - real90.width / 2,
        y: tary1 - real90.height / 2 - 18
      };
    },
    //拿到每个菱形在页面的中心点
    _placehandl(_places) {
      function round(num) {
        return Math.round(num);
      }
      let ps = _places[0].reduce((acc, item, index) => {
        acc.push({
          ...item,
          index,
          _left: round(item.left) + round(item.width / 2),
          _top: round(item.top) + round(item.height / 2)
        });
        return acc;
      }, []);
      this.placePosition = ps;
      //计算已建造建筑的位置
      this.handlePicPos();
    },
    triggerFt() {
      this.ftHide = !this.ftHide;
    },
    changeCount(num) {
      var num = this.buyDig.buyNum + num;
      num = num < 1 ? 1 : num;
      this.buyDig.buyNum = num;
    }
  }
};
</script>

<style lang="scss">
#thirdPage {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .showImg {
    position: absolute;
    width: auto;
    height: auto;
    z-index: 5;
    width: 90px;
    height: 90px;
  }
  #dropGroup {
    position: absolute;
    z-index: 10;
    display: inline-block;
    #dropImg {
      width: 90px;
      height: 90px;
    }
    .dropTools {
      position: absolute;
      top: 10px;
      left: 100%;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  &.main {
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
        /*border: 3px solid #dbdbdb;*/
        border-radius: 50%;
        overflow: hidden;
        padding: 4px;
        /*background: url(http://img.isxcxbackend1.cn/鳄鱼-小.png) center center*/
        /*no-repeat;*/
        background-size: 100% !important;
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
    top: 172px;
    left: 50%;
    margin-left: -236px;
    width: 468px;
    height: 299px;
    transform: rotate(-20deg) skewX(50deg);
    ._place {
      &.active {
        background-color: #90ff84;
      }
      &.noActive {
        background-color: #ff5756;
      }
    }
    div {
      width: 78px;
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
        /*border: 3px solid #dbdbdb;*/
        border-radius: 50%;
        overflow: hidden;
        padding: 4px;

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
}
view[hidden] {
  display: none !important;
}
#real90{
  width: 90px;
  height: 90px;
  visibility: hidden;
}
</style>
