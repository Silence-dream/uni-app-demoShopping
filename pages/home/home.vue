<template>
	<view id="home">
		<my-search></my-search>
		<!-- 轮播图 -->
		<swiper class="banner" indicator-dots autoplay>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 四个导航按钮 -->
		  <view class="index-cate">
		    <navigator v-for="item in catesList" key="item.name">
		      <image mode="widthFix" :src="item.image_src"></image>
		    </navigator>
		  </view>
		  
		    <!-- 楼层开始 -->
		    <view class="index-floor">
		      <view class="flooritem" v-for="(item1,index1) in floorList" :key="item1.floor_title">
		        <!-- floor标题 -->
		        <view class="floor-title">
		          <image mode="widthFix" :src="item1.floor_title.image_src"></image>
		        </view>
		        <view class="floor-conent">
		          <view class="floor-conent-left">
		            <!-- 左边大图 -->
		            <navigator class="floor-conent" open-type="item2.open_type" url="item2.navigator_url"
		              v-for="(item2,index2) in item1.product_list" :key="item2"
		              v-if="index2===0">
		              <image mode="widthFix" :src="item2.image_src"></image>
		            </navigator>
		          </view>
		          <view class="floor-conent-right">
		            <!-- 右边小图 -->
		            <navigator class="floor-conent" open-type="item2.open_type" url="item2.navigator_url"
		              v-for="(item2,index2) in item1.product_list" :key="item2"
		              v-if="index2>0">
		              <image mode="scaleToFill" :src="item2.image_src"></image>
		            </navigator>
		          </view>
		        </view>
		      </view>
		    </view>
		    <!-- 楼层结束 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperList:[],
			catesList:[],
			floorList:[]
		};
	},
	onLoad() {
		this.getSwiper();
		this.getCatesList();
		this.getFloorList()
	},
	methods:{
		/**
		 * 获取轮播图图片
		 */
		async getSwiper(){
			let { data } = await uni.$http.get("/home/swiperdata");
			this.swiperList=data.message;
		},
		/**
		 * 获取四个分类数据
		 */
		async getCatesList(){
			let { data } = await uni.$http.get("/home/catitems")
			this.catesList=data.message
		},
		async getFloorList(){
			let { data } = await uni.$http.get("/home/floordata")
			this.floorList=data.message
		}
	}
};
</script>

<style lang="scss">
// 轮播图
.banner{
	width: 100%;
	height: 340rpx;
	image{
		width: 100%;
	}
}
// 导航
/* 导航 */
.index-cate {
  display: flex;
  padding: 20rpx;
  navigator {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  image {
    width: 140rpx;
  }
}

/* 楼层 */

.index-floor {
  .floor-title {
    padding: 10rpx;
    image {
      width: 100%;
    }
  }
  .floor-conent {
    display: flex;
	width: 100%;
	justify-content: space-between;
    .floor-conent-left {
		flex: 1;
      image {
        width: 100%;
      }
    }
	
    .floor-conent-right {
	  flex: 2;
      display: flex;
      flex-wrap: wrap;
      navigator {
		flex: 1;
        flex-basis: 45%;
		height: 50%;
        &:nth-child(-n + 2) {
          border-bottom: 10rpx solid #ffffff;
        }
        &:nth-child(-n + 4) {
          border-left: 10rpx solid #ffffff;
        }
      }
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
