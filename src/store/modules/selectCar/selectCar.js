//汽车搜索列表
import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:[], //返回数组		
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
	},
	actions:{
		getCarlist:function({commit},info){
			let regionId = info.cityid;
			let keyword = info.keyword;
			let sort = info.sort;
			let directorsId = info.directorsId;
			let brandId = info.brandId;
			let vehicleId = info.vehicleId;
			let gearboxId = info.gearboxId;
			let displacementId = info.displacementId;
			let fuelsId = info.fuelsId;
			let page = info.page;
			return new Promise((resolve,reject)=>{
				axios.get(api+'/SelectCar',{
					params:{
						regionId:regionId,
						keyword:keyword,
						sort:sort,
						directorsId:directorsId,
						brandId:brandId,
						vehicleId:vehicleId,
						gearboxId:gearboxId,
						displacementId:displacementId,
						fuelsId:fuelsId,
						page:page
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}