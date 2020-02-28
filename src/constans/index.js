import axios from 'axios'
export const api = 'http://demozrgc.jjzbest.com' //测试
// export const api = 'http://api.pjzrsr.com' //正式
export let token = window.localStorage.getItem('date');
let timer = setInterval(()=>{
	return token = window.localStorage.getItem('date');
},2000);