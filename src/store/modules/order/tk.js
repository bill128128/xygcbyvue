import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
	},
	actions:{
		tk:function({commit}){
			let token = window.localStorage.getItem('date');
			let id = window.localStorage.getItem('orderid');
			let memberId = window.localStorage.getItem('memberid');
			return new Promise((resolve,reject)=>{
				axios.post(api+'/Member/refund',{
					id:id,
					memberId:memberId,
				},
				{headers:{'token':token}}
				).then((res)=>{
					const data = res.data;
					console.log(data);
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);					
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}