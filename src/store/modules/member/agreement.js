import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回数组		
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
		getAgreement:function({commit},info){
			let category_id = info.category_id;
			let type = info.type;
			return new Promise((resolve,reject)=>{
				axios.get(api+'/member/Agreement',{
					params:{
						category_id:category_id,
						type:type
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