import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import bootPage from './modules/bootPage/bootPage.js'  //引导页
import noLoginCity from './modules/index/noLoginCity.js' //获取城市列表
import allCity from './modules/index/allCity.js' //获取城市列表
import noLoginIndexData from './modules/index/noLoginIndexData.js'//没登录首页信息
import loginIndexData from './modules/index/loginIndexData.js' //登录后首页信息
import changeCityData from './modules/index/changeCityData.js' //切换城市信息
import noticeList from './modules/message/noticeList.js' //消息列表
import noticeDetail from './modules/message/noticeDetail.js' //消息详情
import memberLevelList from './modules/member/memberLevelList.js' //会员等级列表
import buyMember from './modules/member/buyMember.js' //购买会员
import buymembership from './modules/member/buymembership.js' //购买会员列表
import agreement from './modules/member/agreement.js' //用户注册服务协议
import loginagreement from './modules/member/loginagreement.js' //用户登录服务协议
import getVertify from './modules/member/getVertify.js'  //获取手机验证码
import login from './modules/member/login.js'  //登录
import register from './modules/member/register.js'  //注册
import mopass from './modules/member/mopass.js'  //修改密码
import forgetVertify from './modules/member/forgetVertify.js'  //找回密码获取验证码
import forgetPassword from './modules/member/forgetPassword.js'  //找回密码
import selectBrand from './modules/selectCar/selectBrand.js'  //相关地区品牌
import selectVehicle from './modules/selectCar/selectVehicle.js'  //相关地区汽车车型列表
import selectDisplacement from './modules/selectCar/selectDisplacement.js'  //相关地区购车汽车排量列表
import selectFuel from './modules/selectCar/selectFuel.js'  //相关地区购车汽车燃料列表
import selectGearbox from './modules/selectCar/selectGearbox.js'  //相关地区购车汽车变速箱列表
import selectMember from './modules/selectCar/selectMember.js'  //购车汽车会员列表
import selectCar from './modules/selectCar/selectCar.js'  //购车汽车会员列表
import buyCarPath from './modules/selectCar/buyCarPath.js'  //购车汽车会员列表
import carDetail from './modules/selectCar/carDetail.js'  //汽车详情
import brand from './modules/selectCar/brand.js'  //品牌列表
import buycar from './modules/selectCar/buycar.js'  //买车
import xc from './modules/selectCar/xc.js'  //买车
import liftcar from './modules/personal/liftcar.js'  //购车汽车会员列表
import personal from './modules/personal/index.js'  //个人中心
import mypartener from './modules/personal/mypartener.js'  //我的伙伴
import addpartener from './modules/personal/addpartener.js'  //邀请伙伴
import uploadhead from './modules/personal/uploadhead.js'  //上传头像
import myorder from './modules/order/myorder.js'  //我的订单
import jstc from './modules/order/jstc.js'  //加速提车
import tk from './modules/order/tk.js'  //申请退款
import wxshare from './modules/personal/wxshare.js'  //上传头像
Vue.use(Vuex)
Vue.prototype.$axios = axios
export default new Vuex.Store({
	modules:{
		bootPage,
		changeCityData,
		loginIndexData,
		allCity,
		noLoginIndexData,
		noLoginCity,
		noticeList,
		noticeDetail,
		memberLevelList,
		buyMember,
		buymembership,
		agreement,
		loginagreement,
		getVertify,
		login,
		register,
		forgetVertify,
		forgetPassword,
		selectBrand,
		selectVehicle,
		selectDisplacement,
		selectGearbox,
		selectMember,
		selectFuel,
		selectCar,
		buyCarPath,
		liftcar,
		brand,
		personal,
		mypartener,
		addpartener,
		myorder,
		mopass,
		carDetail,
		uploadhead,
		buycar,
		xc,
		jstc,
		tk,
		wxshare,
	},

});