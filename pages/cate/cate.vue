<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh - 50 + 'px' }"
      >
        <block v-for="(item, index) in cateList" :key="item.cat_id">
          <view
            class="left-scroll-view-item"
            :class="addActiveIndex === index ? 'active' : ''"
            @click="addActive(index)"
          >
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh - 50 + 'px' }"
        :scroll-top="scrollTop"
      >
        <block
          v-for="(item, index) in cateList[addActiveIndex]"
          :key="item.cat_id"
        >
          <view class="left-scroll-view-item">
            <block v-for="(item2, index2) in item" :key="item2.cat_id">
              <view class="title">{{ item2.cat_name }}</view>
              <!-- 右边盒子 -->
              <view class="right-box">
                <navigator
                  class="content"
                  v-for="item3 in item2.children"
                  :key="item3.cat_id"
                >
                  <image mode="widthFix" :src="item3.cat_icon"></image>
                  <view class="content-name">{{ item3.cat_name }}</view>
                </navigator>
              </view>
            </block>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
      wh: 0,
      // 分类数据列表
      cateList: [],
      // 被选中的添加 active 类
      addActiveIndex: 0,
      scrollTop: 0,
    };
  },
  onLoad() {
    // 获取当前系统的信息
    const sysInfo = uni.getSystemInfoSync();
    // 为 wh 窗口可用高度动态赋值
    this.wh = sysInfo.windowHeight;

    this.getCateList();
  },
  methods: {
    async getCateList() {
      let { data } = await uni.$http.get("/categories");
      this.cateList = data.message;
    },
    addActive(index) {
      this.addActiveIndex = index;
      // 要设置两次不一样的值才能生效...
      this.scrollTop = this.scrollTop == 0 ? -1 : 0;
      console.log(this.scrollTop);
    },
    gotoSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.right-scroll-view {
  .title {
    text-align: center;
    color: blue;
  }
}

.right-box {
  display: flex;
  flex-wrap: wrap;

  .content {
    flex-basis: 33%;
  }

  image {
    width: 100%;
  }
}
</style>
