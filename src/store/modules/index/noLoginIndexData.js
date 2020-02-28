import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回对象
		roll:[], //滚动新闻
		banner:[], //banner列表
		region:'', //默认地区
		brand:[], //品牌数组
		car:[], //车辆数组
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtData(state,data){
		    state.data = data ;
		},
		mtRoll(state,data){
		    state.roll = data ;
		},
		mtBanner(state,data){
		    state.banner = data ;
		},
		mtRegion(state,data){
		    state.region = data ;
		},
		mtBrand(state,data){
		    state.brand = data ;
		},
		mtCar(state,data){
		    state.car = data ;
		},
	},
	actions:{
		getNoLoginIndexData:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index/index').then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
					commit('mtRoll',data.data.roll);
					commit('mtBanner',data.data.banner);
					commit('mtRegion',data.data.region);
					commit('mtBrand',data.data.brand);
					commit('mtCar',data.data.car);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}