import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回对象	
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
		buycar:function({commit},info){
			let token = window.localStorage.getItem('date');
			let memberId = info[0];
			let carId = info[1];
			let payPassword = info[2];
			return new Promise((resolve,reject)=>{
				axios.post(api+'/buyCar/PaymentCar',{
					memberId:memberId,
					carId:carId,
					payPassword:payPassword,
				},
				{headers:{'token':token}}
				).then((res)=>{
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