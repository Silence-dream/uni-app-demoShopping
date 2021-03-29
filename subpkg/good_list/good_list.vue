<template>
  <view>
    <view class="goods-content">
      <navigator
        class="goods-content-item"
        v-for="item in goodsList"
        :key="goods_id"
        url="/pages/goods_detail/index?goods_id={{item.goods_id}}"
      >
        <view class="goods-left">
          <image
            mode="widthFix"
            src="{{item.goods_small_logo? item.goods_small_logo:replaceIMG}}"
          ></image>
        </view>
        <view class="goods-right">
          <view class="goods-title">{{ item.goods_name }}</view>
          <view class="goods-price">
            <text>¥</text>
            {{ item.goods_price }}
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      params: {
        cid: null,
        // 页码
        pagenum: 1,
        // 页容量
        pagesize: 10,
        // 页总数
        total: null,
      },
      // 如果没有图片的替换图
      replaceIMG:
        "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_800x800.jpg",
    };
  },
  onLoad(options) {
    this.params.cid = options.cid;
    this.getGoodsList(this.params);
  },
  onReachBottom() {
    // 如何页码*页容量>=页总数那么就无法发送请求
    if (this.params.pagenum * this.params.pagesize >= this.params.total) return;
    this.params.pagenum = this.params.pagenum + 1;
    this.getGoodsList(this.params);
  },
  methods: {
    async getGoodsList(params) {
      let { data } = await uni.$http.get("/goods/search", {
        cid: params.cid,
        pagenum: params.pagenum,
        pagesize: params.pagesize,
      });
      this.goodsList = [...this.goodsList, ...data.message.goods];
      this.params.total = data.message.total;
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
@charset "UTF-8";
.goods-content {
  /* 图片调整 */
  /* 商品文字调整 */
}

.goods-content .goods-content-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #666666;
}

.goods-content .goods-left {
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.goods-content .goods-left image {
  width: 70%;
}

.goods-content .goods-right {
  -webkit-box-flex: 3;
  -ms-flex: 3;
  flex: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.goods-content .goods-right .goods-title {
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goods-content .goods-right .goods-price {
  color: #eb4450;
}
</style>
