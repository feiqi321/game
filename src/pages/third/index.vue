<template>
  <div class="main" id="thirdPage">
    <div id="_whitemask" @click="areaWhiteHandle" v-show="areaWhite"></div>
    <van-transition
      :show="warning"
      custom-style="position:absolute;z-index:10001;height:100%;top:0;width:100%;animation-delay: 1s;"
      name="fade"
      duration="200"
    >
      <span class="common-msg" v-if="warning" @click="warning = false">{{
        warningText
      }}</span>
    </van-transition>
    <div class="monster" v-if="gsll"></div>
    <!--<div class="dzanbj" v-if="dzan"></div>-->
    <div class="snow" v-if="snowjpg"></div>
    <van-popup
      :custom-style="'background-color:transparent;overflow: initial;'"
      :show="diaCollect.dia1"
      @close="diaCollectClose('dia1')"
      transition="fade"
    >
      <div class="commonDia">
        <div>
          <img
            src="http://parkiland.isxcxbackend1.cn/组232@2x.png"
            style="width: 145px;height: 133px;"
            alt=""
          />
        </div>

        <div class="commonTxt">
          <h3>冬天到了!</h3>
          <p>您的收集速度变慢了</p>
        </div>

        <div class="commonBtn" @click="diaCollectClose('dia1')">确认</div>
      </div>
    </van-popup>
    <van-popup
      :custom-style="'background-color:transparent;overflow: initial;'"
      :show="diaCollect.dia2"
      @close="diaCollectClose('dia2')"
      transition="fade"
    >
      <div class="commonDia">
        <div>
          <img
            src="http://parkiland.isxcxbackend1.cn/组233.png"
            style="width: 145px;height: 133px;"
            alt=""
          />
        </div>

        <div class="commonTxt">
          <h3>地震了!</h3>
          <p>绿色能量不能在收集了</p>
        </div>

        <div class="commonBtn" @click="diaCollectClose('dia2')">确认</div>
      </div>
    </van-popup>
    <van-popup
      :custom-style="'background-color:transparent;overflow: initial;'"
      :show="diaCollect.dia3"
      @close="diaCollectClose('dia3')"
      transition="fade"
    >
      <div class="commonDia" style="height:70vh;padding-top:10rpx;">
        <div>
          <img
            src="http://parkiland.isxcxbackend1.cn/恐龙动32.png"
            style="width: 200px;height: 280px;"
            alt=""
          />
        </div>

        <div class="commonTxt" style="margin-top:-10px;">
          <h3 style="padding-bottom:15px;">怪兽入侵!</h3>
          <p>一起攻击怪兽保护家园</p>
        </div>

        <div class="commonBtn" @click="diaCollectClose('dia3')">确认</div>
      </div>
    </van-popup>
    <div
      id="dropGroup"
      v-show="currentDrop.show"
      :style="{ left: currentDrop.left + 'px', top: currentDrop.top + 'px' }"
    >
      <img :src="currentDrop.src" mode="aspectFit" id="dropImg" />
      <div
        class="dropTools"
        :style="currentDrop.leftShowDrop ? { right: '100%', left: 'auto' } : ''"
        v-show="currentDrop.tools"
      >
        <img
          :src="'http://parkiland.isxcxbackend1.cn/' + '组178@3x.png'"
          @click="dropDown"
        />
        <img
          :src="'http://parkiland.isxcxbackend1.cn/' + '组179@3x.png'"
          @click="dropCancal"
        />
      </div>
    </div>
    <div class="top-tool">
      <div class="user-info">
        <div
          :style="{ backgroundImage: 'url(' + userInfo.avatarUrl + ')' }"
        ></div>
        <dl>
          <dd class="name">{{ userInfo.nickName }}</dd>
          <dd class="score">{{ myMoney }}</dd>
        </dl>
      </div>

      <div class="top-status">
        <div class="rigth-nav" v-if="gsll" @click="toBoss">
          <span class="i-sb active rigth-monster"></span>
        </div>
        <div class="rigth-nav" @click="nativeBack('1')">
          <span class="i-sb active rigth-gotoSec"></span>
        </div>
        <div class="rigth-nav" @click="nativeTo('../index/main')">
          <span class="i-sb active"></span>
        </div>
      </div>
    </div>
    <div id="real90"></div>
    <div @longpress="execDeleteFn($event)">
      <img
        @load="load"
        mode="aspectFit"
        :src="[item.name]"
        class="showImg"
        v-for="(item, i) in picInfo"
        :style="{ left: item.imgleft + 'px', top: item.imgtop + 'px' }"
        :key="index"
      />
      <img
        :src="'http://parkiland.isxcxbackend1.cn/' + '组179@3x.png'"
        class="deleteClz"
        :style="{
          left: deleteBtnStyle.left + 'px',
          top: deleteBtnStyle.top + 'px',
          display: deleteBtnStyle.display
        }"
        @click="deleteOne"
      />
    </div>
    <!-- 建造区 -->
    <div class="jzq" :style="[showJzq ? '' : 'visibility: hidden']">
      <div
        class="_place"
        :class="[i == currentActive ? currentClaz : '']"
        v-for="i in 36"
        :key="i"
      >
        <!--{{ i }}-->
      </div>
    </div>
    <!-- 建造区 -->
    <div class="ft-box" :class="{'ft-box-2':chooseType ==1}" v-show="!ftHide">
      <!--购买区-->
      <div
        class="ft-wrap"
        v-if="chooseType == ind"
        v-for="(it, ind) in 2"
        :key="ind"
      >
        <dl v-for="(item, index) in pic[ind]" :key="index">
          <dt
            v-if="ckTxt"
            :data-obj="item"
            :style="item.style"
            @click="buyHandle"
          ></dt>
          <dt
            :data-obj="item"
            @touchstart="tStart"
            @touchmove="tMove"
            @touchend="tEnd"
            :style="item.style"
            v-else
          ></dt>
          <dd v-if="ckTxt">
            <img src="http://parkiland.isxcxbackend1.cn/组187.png"
                 style="margin-right: 8rpx;display: inline-block;width:14rpx;height: 20rpx;vertical-align: middle;"
                 alt="" />
            <span style="vertical-align: middle;display: inline-block;font-size:8px;">{{item.price}}</span>
          </dd>
          <dd v-else>x{{ item.num }}</dd>
        </dl>
      </div>
    </div>
    <!-- 底部菜单 -->
    <div :class="{ 'ft-nav': true, hide: false }">
      <div :class="{ active: chooseType == 0 }" @click="chooseModel(0)">
        植物 <span class="zw ic"></span>
      </div>
      <div :class="{ active: chooseType == 1 }" @click="chooseModel(1)">
        建筑 <span class="jz ic"></span>
      </div>
      <div @click="openCk">
        {{ ckTxt ? "商店" : "仓库" }} <span class="ck ic"></span>
      </div>
    </div>
    <!-- 弹窗 -->
<!--    <van-dialog
      use-slot
      async-close
      :show="buyDig.dig"
      :show-confirm-button="false"
      @close="buyDig.dig = false"
      close-on-click-overlay
      transition="fade"
    >-->
      <van-popup
        :custom-style="'background-color:transparent;overflow: initial;'"
        :show="buyDig.dig"
        @close="buyDig.dig = false"
        transition="fade"
      >
      <div class="buydig">
        <dl class="buy-info">
          <dt :style="buyDig.style"></dt>
          <dd class="title">{{buyDig.name}}</dd>
          <dd class="price">
            <img src="http://parkiland.isxcxbackend1.cn/组187.png"
                 style="margin-right: 8rpx;display: inline-block;width:20rpx;height: 28rpx;vertical-align: middle;"
                 alt="" />
            <span style="vertical-align: middle;display: inline-block;">X{{ buyDig.price }}</span>
          </dd>
        </dl>
        <div class="num">
          <span class="before" @click="changeCount(-1)">-</span>
          <span class="after" @click="changeCount(1)">+</span>
          {{ buyDig.buyNum }}
        </div>
        <p class="total">所需能量:{{ buyDig.price * buyDig.buyNum }}</p>
        <div class="btn-w">
          <span class="buy-btn" @click="buyOneHandle">购买</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import httpReq from "../../api";
import { throttle } from "../../utils/index";
export default {
  data() {
    return {
      userInfo: null,
      ftHide: false,
      chooseType: 0,
      gsStatus: 0,
      gsll: false,
      baseUrl: "http://parkiland.isxcxbackend1.cn/",
      //底部可购买的数组
      pic: [[], [], []],
      placePosition: [],
      //真实90宽高的像素
      real90: {},
      //禁止建筑的菱形索引
      noActive: [0, 1, 2, 6, 7, 12, 13, 17, 18, 23, 28, 29, 33, 34, 35],
      //靠右的格子
      rightRange: [17, 22, 23, 27, 28, 32, 33],
      //已放置的菱形索引
      hasActive: [],
      //当前建筑的对象
      currentBottom: {},
      //当前激活的菱形
      currentActive: -1,
      //已建造的数组
      picInfo: [],
      snowjpg: false,
      //当前抓取的
      currentDrop: {
        src: "",
        left: "10",
        top: "10",
        tools: false,
        show: false,
        leftShowDrop: false
      },
      //购买弹窗相关
      buyDig: {
        dig: false,
        style: {},
        current: {},
        buyNum: 1,
        name:'',
        price: 0
      },
      showJzq: false,
      //用户金币数
      myMoney: 0,
      //true为商店 false为仓库
      ckTxt: false,
      deleteBtnStyle: {
        display: "none",
        left: "",
        top: ""
      },
      deleteTarget: {},
      //dialog
      diaCollect: {
        dia1: false,
        dia2: false,
        dia3: false
      },
      monster: false,
      backgroundAudioManager7:null,
      warning: false,
      warningText: "",
      //抖动开关
      dzan: false,
      areaWhite: false
    };
  },
  watch: {
    picInfo(newValue) {
      this.hasActive = newValue.reduce((acc, item) => {
        acc.push(item.index);
        return acc;
      }, []);
    },
    chooseType: "getCurrentList"
  },
  beforeCreate() {
    var _this = this;
    //获取植物
    httpReq({
      url: "/game/warehouse/findAllShop",
      data: {
        openId: _this.openId,
        gameId: _this.gameId,
        type: 1
      }
    }).then(({ data }) => {
      // this.pic[0] = data;
      data.forEach(item => {
        item.style = `background:url("${item.url1}") center no-repeat`;
      });
      this.$set(this.pic, 0, data);

    });
    //获取建筑
    httpReq({
      url: "/game/warehouse/findAllShop",
      data: {
        openId: _this.openId,
        gameId: _this.gameId,
        type: 2
      }
    }).then(({ data }) => {
      // this.pic[1] = data;
      data.forEach(item => {
        item.style = `background:url("${item.url1}") center no-repeat`;
      });
      this.$set(this.pic, 1, data);
    });
  },
  created() {
    this.userInfo = wx.getStorageSync("userinfo");
    this.backgroundAudioManager7 = getApp().globalData.backgroundAudioManager7;
    //移动时
    this.tMove = throttle(e => {
      this.currentDrop.show = true;
      let { clientX: left, clientY: top } = e;
      let currentActive = this.getMinOne(left, top).currentActive;
      this.currentActive = currentActive;
      let { _left, _top } = this.placePosition[currentActive];
      let pos = this.calcPos(_left, _top, this.real90);
      this.currentDrop.left = pos.x;
      this.currentDrop.top = pos.y;
    }, 80);
  },
  mounted() {
    this.getCurrentList();
    this.getMyBuild();
    this.listenSocket();
    this.initUserinfo();
  },
  computed: {
    whichActive() {
      return this.noActive.includes(this.currentActive);
    },
    currentClaz() {
      return this.whichActive ? "noActive" : "active";
    },
    currentType() {
      return this.chooseType + 1;
    }
  },
  methods: {
    areaWhiteHandle(e) {
      this.hideDeleteBtn();
      this.showJzq = false;
    },
    chooseModel(type){
        this.playMusic();
        this.chooseType = type;
    },
    initUserinfo() {
      const _this = this;
      httpReq({
        url: "/game/device/query"
      }).then(({ data }) => {
        if (data != null) {
          _this.myMoney = data.scores;
          _this.showEvent(data.event);
        }
      });
    },
    showWarnning(text) {
      this.warning = true;
      this.warningText = text;
      setTimeout(() => {
        this.warning = false;
      }, 1200);
    },
    gameOver(text) {
      this.warning = true;
      this.warningText = text;
      setTimeout(() => {
        this.warning = false;
        wx.reLaunch({
          url: "../one/main"
        });
      }, 1200);
    },
    toBoss() {
      const url = "../boss/main?pageNo=2";
      wx.redirectTo({ url });
    },
    diaCollectClose(target) {
      this.diaCollect[target] = false;
    },
    getMyBuild() {
      var _this = this;
      //已建 图片
      httpReq({
        url: "/game/warehouse/findMyBuild"
      }).then(({ data }) => {
        if (data != null) {
          this.picInfo = data.reduce((acc, item) => {
            acc.push({
              obj: item,
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
    //获取菱形索引上图片的信息
    getCurrentImg(index) {
      return (
        this.picInfo.find(item => {
          return item.index == index;
        }) || null
      );
    },
    //仓库切换时 更新列表
    getCurrentList() {
      //切换时清空pic
      this.$set(this.pic, this.currentType - 1, []);
      if (this.ckTxt) {
        this.getShopList();
      } else {
        this.getMyList();
      }
    },
    getShopList() {
      var _this = this;
      httpReq({
        url: "/game/warehouse/findAllShop",
        data: {
          type: this.currentType
        }
      }).then(({ data }) => {
        // this.pic[0] = data;
        data.forEach(item => {
          item.style = `background:url("${item.url1}") center no-repeat`;
        });
        this.$set(this.pic, this.currentType - 1, data);
      });
    },
    getMyList() {
      var _this = this;
      httpReq({
        url: "/game/warehouse/findAllMyWareHouse",
        data: {
          type: this.currentType
        }
      }).then(({ data }) => {
        data.forEach(item => {
          item.style = `background:url("${item.url1}") center no-repeat`;
        });
        this.$set(this.pic, this.currentType - 1, data);
      });
    },
    execDeleteFn(e) {
      let { clientX: left, clientY: top } = e;
      let { currentActive } = this.getMinOne(left, top);
      this.currentActive = currentActive;
      let currentImg = this.getCurrentImg(currentActive);
      if (currentImg) {
        this.areaWhite = true;
        let style = {
          display: "block",
          left: currentImg.left + this.real90.width,
          top: currentImg.top - this.real90.height / 3
        };
        if (this.rightRange.includes(currentActive)) {
          style.left = currentImg.left;
        }
        this.deleteBtnStyle = style;
        this.deleteTarget = currentImg;
        this.showJzq = true;
      }
    },
    //隐藏删除按钮
    hideDeleteBtn() {
      this.deleteBtnStyle.display = "none";
      this.areaWhite = false;
    },
    //删除一个
    deleteOne() {
      var _this = this;
      let { id, destroyPrice } = this.deleteTarget.obj;
      httpReq({
        url: "/game/warehouse/destroy",
        data: {
          id,
          destroyPrice
        }
      }).then(({ data }) => {
        this.myMoney = data;
        this.hideDeleteBtn();
        this.switchJzq();
        this.picInfo = this.picInfo.filter(item => {
          return item.index != this.currentActive;
        });
      });
    },
    //购买按钮
    buyOneHandle() {
      var _this = this;
      httpReq({
        url: "/game/warehouse/buyProduct",
        data: {
          shopId: this.buyDig.current.id,
          num: this.buyDig.buyNum
        }
      }).then(({ code, data, msg }) => {
        if (code == 200) {
          this.myMoney = data;
        } else {
          this.showWarnning(msg);
        }
        this.buyDig.dig = false;
      });
    },
    //购买一个
    buyHandle(e) {
      let obj = (this.buyDig.current = e.currentTarget.dataset.obj);
      console.log(obj);
      //显示弹窗
      this.buyDig.dig = true;
      this.buyDig.price = obj.price;
      this.buyDig.name = obj.name;
      this.buyDig.style = obj.style;
    },
    //switch仓库
    openCk() {
      // init && (this.chooseType = 2);
      this.ckTxt = !this.ckTxt;
      this.playMusic();
      this.getCurrentList();
    },
    load(e) {},
    switchJzq() {
      this.showJzq = !this.showJzq;
    },
    playMusic(){
      const backgroundAudioManager1 = getApp().globalData.backgroundAudioManager;

      backgroundAudioManager1.title="01点击按钮";
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      }else {
        backgroundAudioManager1.obeyMuteSwitch = false;
        backgroundAudioManager1.autoplay = true;
      }
      backgroundAudioManager1.src ="http://parkiland.isxcxbackend1.cn/01"+(encodeURIComponent('点击按钮'))+".mp3";
      backgroundAudioManager1.play();
    },
    //触摸开始
    tStart(e) {
      console.log(e);
      this.hideDeleteBtn();
      this.showJzq = true;
      this.currentBottom = e;
      let url = e.currentTarget.dataset.obj.url3;
      this.currentDrop.tools = false;
      this.currentDrop.src = url;
      // this.triggerFt();
    },
    nativeBack(path) {
      this.playMusic();
      wx.redirectTo({
        url: "../first/main"
      });
      /*wx.navigateBack({
        delta: 1
      });*/
    },
    nativeTo(path) {
      this.playMusic();
      wx.redirectTo({
        url: path
      });
    },

    //触摸移动
    // tMove(e) {
    //
    // },
    //触摸结束
    tEnd(e) {
      console.log(e);
      this.currentDrop.tools = true;
      if (this.rightRange.includes(this.currentActive)) {
        this.currentDrop.leftShowDrop = true;
      } else {
        this.currentDrop.leftShowDrop = false;
      }
    },
    dropDown() {
      var _this = this;
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      }else {
        _this.backgroundAudioManager7.obeyMuteSwitch = false;
        _this.backgroundAudioManager7.autoplay = true;
      }
      _this.backgroundAudioManager7.title = "03建造完成";

      _this.backgroundAudioManager7.src = "http://parkiland.isxcxbackend1.cn/03"+(encodeURIComponent('建造完成'))+".mp3";

      _this.backgroundAudioManager7.play();
      let index = this.currentActive;
      let obj = this.currentBottom.currentTarget.dataset.obj;
      this.switchJzq();
      this.currentDrop.show = false;
      if (this.noActive.includes(index) || this.hasActive.includes(index)) {
        console.log("禁止放入");
      } else {
        httpReq({
          url: "/game/warehouse/build",
          data: {
            wareId: obj.id,
            posi: index
          }
        }).then(({ code, data }) => {
          if (code == "200") {
            this.getCurrentList();

          }
        });
        this.picInfo.push(this.mixinObj(index, { obj, name: obj.url3, index }));
      }
    },
    dropCancal() {
      // this.triggerFt();
      this.switchJzq();
      this.currentDrop.show = false;
    },
    getMinOne(left, top) {
      let minVal = Infinity;
      let currentActive = -1;
      let itemCache = {};
      //拿到两点之间最小的距离与菱形索引
      this.placePosition.forEach((item, i) => {
        let result = this.minRange(left, top, item._left, item._top);
        if (result < minVal) {
          minVal = Number(result);
          currentActive = i;
          itemCache = item;
        }
      });
      return { currentActive, itemCache };
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
    },
    showEvent(event) {
      const _this = this;
      if (event == 1) {
        //下雪了
        _this.diaCollect.dia1 = true;
        _this.snowjpg = true;
      } else if (event == 10) {
        //雪停了
        _this.diaCollect.dia1 = false;
        _this.snowjpg = false;
      } else if (event == 2) {
        //地震了
        _this.snowjpg = false;
        _this.dzan = true;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = true;
      } else if (event == 20) {
        //地震停了
        _this.snowjpg = false;
        _this.dzan = false;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = false;
      } else if (event == 3) {
        //怪兽来袭
        _this.gsll = true;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = false;
        _this.diaCollect.dia3 = true;
      } else if (event == 30) {
        //怪兽事件结束
        _this.gsll = false;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = false;
        _this.diaCollect.dia3 = false;
        _this.dzan = false;
      } else if (event.indexOf("99") >= 0) {
        //boss死掉了
        _this.gsll = false;
      } else if (event.indexOf("97") >= 0) {
        //boss到时间未死掉
        _this.gsll = false;
      } else if (event == 100) {
        _this.gsll = false;
        _this.dzan = false;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = false;
        _this.diaCollect.dia3 = false;
        _this.gameOver("游戏结束");
      }else if (event == -1) {
        _this.gsll = false;
        _this.dzan = false;
        _this.diaCollect.dia1 = false;
        _this.diaCollect.dia2 = false;
        _this.diaCollect.dia3 = false;
        _this.gameOver("游戏结束");
      }
    },
    listenSocket() {
      var _this = this;
      this.socketTask = getApp().globalData.socketTask;
      this.socketTask.onMessage(function(res) {
        _this.showEvent(res.data);
      }),
        //连接失败
        this.socketTask.onError(function() {
          console.log("websocket连接失败！");
          _this.gsStatus = 1;
          _this.isSlow = false;
        });
    }
  }
};
</script>

<style lang="scss">
#thirdPage {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .common-msg {
    line-height: 48px;
    z-index: 1000;
    border: 2px solid #000;
    position: absolute;
    width: 200px;
    text-align: center;
    background: #ff4b4b;
    color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
  }
  .showImg {
    //修改宽高时同时修改#real90和dropImg
    position: absolute;
    width: auto;
    height: auto;
    z-index: 2;
    width: 90px;
    height: 90px;
  }
  @keyframes an2 {
    10% {
      transform: translate(-5%, -5%);
    }
    30% {
      transform: translate(-2%, -3%);
    }
    30% {
      transform: translate(-4%, -8%);
    }
    30% {
      transform: translate(5%, -7%);
    }
    100% {
      transform: translate(5%, 2%);
    }
  }
  .dzan {
    animation: an2 1s infinite ease-in-out alternate;
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
        display: block;
        margin-bottom: 20px;
      }
    }
  }
  .deleteClz {
    width: 25px;
    height: 25px;
    display: block;
    position: absolute;
    z-index: 6;
  }
  &.main {
    background: #53a999 url(http://parkiland.isxcxbackend1.cn/背景4.jpg) center top
      no-repeat;
    background-size: 100% auto;
    height: 100%;
    position: relative;
  }
  .top-tool {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    position: relative;
    z-index: 5;
    .user-info {
      display: flex;
      & > div {
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
        margin-left: 15px;
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
          font-size: 16px;
        }
      }
    }

    .rigth-nav {
      margin-top: 25px;

      .i-gs {
        background: url(http://parkiland.isxcxbackend1.cn/boss组203.png) center center
          no-repeat;
        background-size: contain;
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 20px;
        animation: an1 ease 1s infinite alternate;
      }
      .i-sb {
        background: url(http://parkiland.isxcxbackend1.cn/组168.png) center center
          no-repeat;
        background-size: contain;
        width: 35px;
        height: 40px;
        display: inline-block;
        &.active {
          background-image: url(http://parkiland.isxcxbackend1.cn/组168.png);
        }
      }
    }
  }
  .ft-box-2{
    background:url(http://parkiland.isxcxbackend1.cn/up.png) top center
    no-repeat,url(http://parkiland.isxcxbackend1.cn/down2.png) bottom center no-repeat!important;
    background-size:100% calc(100% - 19px),100% 20px!important;
  }
  .ft-box {

    /*background: #fff;*/
    /*border: 2.5px solid #333;*/
    /*border-radius: 8px;*/
    background: url(http://parkiland.isxcxbackend1.cn/up.png) top center
    no-repeat,url(http://parkiland.isxcxbackend1.cn/down1.png) bottom center no-repeat;
    background-size:100% calc(100% - 19px),100% 20px;
    z-index: 5;
    /*box-shadow: 0 3px 0 #979797;*/
    bottom: 120rpx;
    position: absolute;
    padding: 10px 10px 22.5px;
    box-sizing: border-box;
    width: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
    transition: all ease 0.3s;
    .ft-wrap {
      min-height: 68px;
    }
    & > div {
      // justify-content: space-around;
      flex-wrap: wrap;
      display: flex;
    }
    dl {
      width: 20%;
      box-sizing: border-box;
      padding: 0 10px;
      white-space: nowrap;
      dt {
        /*border: 3px solid #dbdbdb;*/
        border-radius: 50%;
        overflow: hidden;
        padding: 4px;
        /*background: url(http://parkiland.isxcxbackend1.cn/鳄鱼-小.png) center center*/
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
   /* &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 12px;
      left: -2px;
      bottom: -5.5px;
      z-index: -1000;
      border: 2px solid #333;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      border-top: 0;
    }*/
  }
  .ft-nav {

    background: url(http://parkiland.isxcxbackend1.cn/组174@3x.png);
    background-size: 100% 100%;
    padding-bottom: 5px;
    /*border: 2.5px solid #333;*/
    /*border-radius: 8px;*/
    line-height: 25px;
    height: 25px;
    z-index: 5;
    /*box-shadow: 0 3px 0 #979797;*/
    display: flex;
    bottom: 28px;
    position: absolute;
    width: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    justify-content: space-around;
    transition: all ease 0.3s;
/*    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 12px;
      left: -2px;
      bottom: -5.5px;
      z-index: -1000;
      border: 2px solid #333;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      border-top: 0;
    }*/
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
     /* position: relative;
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
      }*/
      .ic {
        display: inline-block;
        margin-left: 5px;
        width: 16px;
        height: 16px;
        background: center center no-repeat;
        background-size: contain;
        vertical-align: middle;
        &.zw {
          background-image: url(http://parkiland.isxcxbackend1.cn/组172@3x.png);
        }
        &.jz {
          background-image: url(http://parkiland.isxcxbackend1.cn/组173@2x.png);
        }
        &.ck {
          background-image: url(http://parkiland.isxcxbackend1.cn/组169@3x.png);
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
      border: 1px dashed #e2dee8;
      box-sizing: border-box;
      opacity: 0.8;
    }
  }
  .buydig {
    line-height: 30px;
    border: 3.5px solid #000;
    background: url(http://parkiland.isxcxbackend1.cn/buy组188.png) center
    center  no-repeat;
    border-radius: 16px;
    width:75vw;
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
        background: url(http://parkiland.isxcxbackend1.cn/组177.png) center center
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
#real90 {
  width: 90px;
  height: 90px;
  visibility: hidden;
  position: fixed;
  top: -100%;
}
.commonDia {
  height: 60vh;
  width: 78vw;
  box-sizing: border-box;
  padding: 40px 10px 50px;
  background: url(http://parkiland.isxcxbackend1.cn/组208@2x.png) center no-repeat;
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  .commonCloseBtn {
    position: absolute;
    width: 8vw;
    height: 8vw;
    right: -4vw;
    top: -4vw;
    background: url(http://parkiland.isxcxbackend1.cn/status组198@2x.png) center
      no-repeat;
    background-size: 100%;
  }
  .commonTxt {
    margin-top: 30px;
    h3 {
      font-size: 25px;
    }
    p {
      font-size: 16px;
    }
  }
  .commonBtn {
    display: inline-block;
    margin-top: 25px;
    height: 40px;
    width: 76px;
    line-height: 40px;
    font-size: 16px;
    box-sizing: border-box;
    background: url(http://parkiland.isxcxbackend1.cn/组231@2x.png) center no-repeat;
    background-size: 100%;
  }
}
#thirdPage .top-tool .top-status {
  > div {
    display: inline-block;
    margin-left: 15px;
    @keyframes an1 {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.4);
      }
    }
    .rigth-monster {
      background: url(http://parkiland.isxcxbackend1.cn/boss组203.png) center center
        no-repeat;
      background-size: 100%;
      width: 35px;
      height: 40px;
      display: inline-block;
      animation: an1 ease 1s infinite alternate;
    }
    .rigth-gotoSec {
      background: url(http://parkiland.isxcxbackend1.cn/组218@3x.png) center no-repeat;
      position: relative;
      z-index: 1;
      background-size: 100%;
    }
  }
  > div:first-child {
    margin-left: 0;
  }
}
.monster {
  height: 100vh;
  width: 100vw;
  background: url(http://parkiland.isxcxbackend1.cn/红光闪动2.gif) center no-repeat;
  background-size: 100%;
  opacity: 0.6;
  position: absolute;
}

.dzanbj {
  height: 100vh;
  width: 100vw;
  background: url(http://parkiland.isxcxbackend1.cn/地震建造手机.gif) center no-repeat;
  background-size: 100%;
  opacity: 0.6;
  position: absolute;
}
.snow {
  height: 100vh;
  width: 100vw;
  background: url(http://parkiland.isxcxbackend1.cn/%E5%AE%8C%E6%88%90%E6%89%8B%E6%9C%BA%E9%9B%AA%E8%8A%B1.gif)
    center no-repeat;
  background-size: 100%;
  opacity: 0.6;
  position: absolute;
}
.common-msg {
  line-height: 48px;
  z-index: 1000;
  border: 2px solid #000;
  position: absolute;
  width: 200px;
  text-align: center;
  background: #ff4b4b;
  color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
}
#_whitemask {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
