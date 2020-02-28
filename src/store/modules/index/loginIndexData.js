import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回对象
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
		getLoginIndexData:function({commit},info){
			let memberId = info.memberid;
			let token = info.token;
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index/Membercity',{
					params:{
						memberId:memberId,
					},
					async:true,
					crossDomain:true,
					headers:{'token':token},
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
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