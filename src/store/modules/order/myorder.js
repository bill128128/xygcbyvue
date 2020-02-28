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
		getOrderList:function({commit},info){
			return new Promise((resolve,reject)=>{
				let token = window.localStorage.getItem('date');
				let memberId = info.memberid;
				let page = info.page;
				axios.get(api+'/Member/carOrder',{
					params:{
						memberId:memberId,
						page:page
					},
					headers:{'token':token},
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