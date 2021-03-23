<template>
	<div id="home">
		<swiper class="banner" indicator-dots autoplay>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
export default {
	data() {
		return {
			swiperList:[]
		};
	},
	onLoad() {
		uni.$http.get("/home/swiperdata").then(data=>{
			console.log(data);
		})
		this.getSwiper()
	},
	methods:{
		/**
		 * 获取轮播图图片
		 */
		async getSwiper(){
			let { data } = await uni.$http.get("/home/swiperdata");
			this.swiperList=data.message;
			console.log(this.swiperList);
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
</style>
