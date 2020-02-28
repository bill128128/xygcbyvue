import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回对象
		carmember:[], //会员列表
		directors:[], //已购买会员列表数组
		privilege:{}, //会员协议
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
		mtCarmember(state,data){
		    state.carmember = data ;
		},
		mtDirectors(state,data){
		    state.directors = data ;
		},
		mtPrivilege(state,data){
		    state.privilege = data ;
		},
	},
	actions:{
		getMemberLevelList:function({commit},memberId){
			return new Promise((resolve,reject)=>{
				let token = window.localStorage.getItem('date');
				axios.get(api+'/User/list',{
					programs:{
						memberId:memberId
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
					commit('mtCarmember',data.data.carmember);
					commit('mtDirectors',data.data.directors);
					commit('mtPrivilege',data.data.privilege);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}