import Vue from 'vue'
import Router from 'vue-router'
import bootPage from '@/components/bootPage/bootPage'
import login from '@/components/member/login'
import register from '@/components/member/register'
import noticeList from '@/components/message/noticeList'
import noticeDetail from '@/components/message/notice'
import index from '@/components/index/index'
import memindex from '@/components/index/memindex'
import choseCity from '@/components/index/choseCity'
import search from '@/components/index/search'
import forgetPassword from '@/components/member/forgetPassword'
import agreement from '@/components/member/agreement'
import loginagreement from '@/components/member/loginagreement'
import modifypassword from '@/components/member/modifypassword'
import buyMembership from '@/components/member/buyMembership'
import selectCar from '@/components/selectCar/selectCar'
import personal from '@/components/personal/index'
import uploader from '@/components/personal/uploader'
import liftcar from '@/components/personal/liftcar'
import myPartener from '@/components/personal/myPartener'
import addpartener from '@/components/personal/addpartener'
import buyCarPath from '@/components/selectCar/buyCarPath'
import carDetail from '@/components/selectCar/carDetail'
import brand from '@/components/selectCar/brand'
import orderConfirm from '@/components/order/orderConfirm'
import paySuccess from '@/components/order/paySuccess'
import myOrder from '@/components/order/myOrder'
import cwhy from '@/components/selectCar/path/cwhy'
import cascadeloop from '@/components/common/cascadeloop'
Vue.use(Router)

export default new Router({
  routes: [
  	{ //成为会员
      path: '/cascadeloop',
      name: 'cascadeloop',
      component: cascadeloop
    },
  	{ //成为会员
      path: '/cwhy',
      name: 'cwhy',
      component: cwhy
    },
    { //引导页
      path: '/',
      name: 'bootPage',
      component: bootPage
    },
    { //登录
      path: '/login',
      name: 'login',
      component: login
    },
    { //注册
      path: '/register',
      name: 'register',
      component: register
    },
    { //消息列表
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList
    },
    { //消息列表
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: noticeDetail
    },
    { //首页
      path: '/index',
      name: 'index',
      component: index
    },
    { //登录后首页
      path: '/memindex',
      name: 'memindex',
      component: memindex
    },
    { //选择城市
      path: '/choseCity',
      name: 'choseCity',
      component: choseCity
    },
    { //搜索页面
      path: '/search',
      name: 'search',
      component: search
    },
    { //忘记密码
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    { //修改密码
      path: '/modifypassword',
      name: 'modifypassword',
      component: modifypassword
    },
    { //用户注册协议
      path: '/agreement',
      name: 'agreement',
      component: agreement
    },
    { //用户登录协议
      path: '/loginagreement',
      name: 'loginagreement',
      component: loginagreement
    },
    { //选车
      path: '/selectCar',
      name: 'selectCar',
      component: selectCar,
    },
    { //个人中心
      path: '/personal',
      name: 'personal',
      component: personal
    },
    { //上传
      path: '/uploader',
      name: 'uploader',
      component: uploader
    },
    { //已提车
      path: '/liftcar',
      name: 'liftcar',
      component: liftcar
    },
    { //我的伙伴
      path: '/myPartener',
      name: 'myPartener',
      component: myPartener
    },
    { //邀请伙伴
      path: '/addpartener',
      name: 'addpartener',
      component: addpartener
    },
    { //购车流程
      path: '/buyCarPath',
      name: 'buyCarPath',
      component: buyCarPath
    },
    { //汽车详情
      path: '/carDetail',
      name: 'carDetail',
      component: carDetail
    },
    { //品牌
      path: '/brand',
      name: 'brand',
      component: brand
    },
    { //确认订单
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    { //支付成功
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },
    { //购车订单
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    { //开通钻石会员
      path: '/buyMembership',
      name: 'buyMembership',
      component: buyMembership
    },
  ]
})
