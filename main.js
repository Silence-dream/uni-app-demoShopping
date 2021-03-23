import Vue from "vue";
import App from "./App";

// 导入第三方包
import { $http } from "@escook/request-miniprogram";
uni.$http = $http

// 配置请求根路径
$http.baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

// 请求开始之前做一些事情
$http.beforeRequest = function () {
  uni.showLoading({
  	title:"加载中"
  })
};

// 请求完成之后的事情
$http.afterRequest = function () {
  uni.hideLoading();
};

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
