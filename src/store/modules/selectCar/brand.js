//相关地区品牌列表
import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		brand:[], //返回数组		
		initials:[],
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtbrand(state,data){
		    state.brand = data ;
		},
		mtinitials(state,data){
		    state.initials = data ;
		},
	},
	actions:{
		getBrand:function({commit},regionId){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/SelectBrand',{
					params:{
						regionId:regionId,
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtbrand',data.data.brand);
					commit('mtinitials',data.data.initials);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}