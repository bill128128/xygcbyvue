import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		user:{}, //返回数组
		directors:[],
		
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtuser(state,data){
		    state.user = data ;
		},
		mtdirectors(state,data){
		    state.directors = data ;
		},
	},
	actions:{
		getinfo:function({commit},memberId){
			let token = window.localStorage.getItem('date');
			return new Promise((resolve,reject)=>{
				axios.get(api+'/Member/userList',{
					params:{
						memberId:memberId
					},
					headers:{'token':token},
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtuser',data.data.user);
					commit('mtdirectors',data.data.directors);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}