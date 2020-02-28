<template>
	<div id="forgetPassword">
		<top :message='title'></top>
		<div class="containers">
			<form>
				<div>
					<label>登录名：</label>
					<input v-model="info.name"  type="text" name="name" placeholder="请输入用户名" autocomplete="off" />
				</div>
				<div>
					<label>手机号：</label>
					<input v-model="info.mobile"  type="text" name="mobile" placeholder="请输入手机号" autocomplete="off">
				</div>
				<div>
					<label>验证码：</label>
					<input v-model="info.vertify" type="text" name="vertify" placeholder="请输入验证码" autocomplete="off">
					<button id="checknumbtn" type="button" @click="settime">获取验证码</button>
				</div>
				
				<div>
					<label>新密码：</label>
					<input v-model="info.password"  type="password" name="password" placeholder="请输入登录密码" autocomplete="off">
				</div>
				<div>
					<label>确认密码：</label>
					<input v-model="info.repassword"  type="password" name="repassword" placeholder="请确认登录密码" autocomplete="off">
				</div>
				<button type="button" @click="doit">提交</button>
			</form>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'forgetPassword',
		components:{
			top,
		},
		data(){
			return{
				title:'忘记密码',
				info:{
					name:'',
					mobile:'',
					vertify:'',					
					password:'',
					repassword:'',
				}
			}
			
		},
		methods:{
			settime:function(e){   //发送验证码
				e.preventDefault();
				console.log(this.info.mobile);
				this.$store.dispatch('forgetVertify/getVerify',this.info.mobile).then(() => {
					if(this.$store.state.forgetVertify.code==200){
						this.$toast({
							message:'获取验证码成功，有效时间为180秒',
						});
						var val = e.target;
						var num = 180;
						var timer = setInterval(function(){	
							num --;
							val.innerHTML = num+"秒计时";
							val.disabled = 'disabled';
							val.style.backgroundColor = "#cccccc";
							if(num<=0){
								val.disabled = '';
								val.style.backgroundColor = "#262626";
								val.innerHTML = "获取验证码";
								clearInterval(timer);
							}
						},1000)
					}else{
						this.$toast({
							message:'请正确输入手机号',
						});
					}					          
				}).catch((e) => {              
					console.log(e);
				})			 	
			},
			doit(e){
				e.preventDefault();
				this.$store.dispatch('forgetPassword/doit',this.info).then(()=>{
					if(this.$store.state.forgetPassword.code==200){
						this.$toast({
							message:this.$store.state.forgetPassword.msg,
						});
						this.$router.push("/login");
					}else{
						this.$toast({
							message:this.$store.state.forgetPassword.msg,
						});
					}
				}).catch((e) => {              
					console.log(e);
				})	
			}
		},
		created(){
			
		}
	}
</script>

<style scoped lang="less">
	.containers{
		width:8.4rem;
		min-height: 15rem;
	    margin:0 auto 0.4rem;
	    overflow: auto;
	    box-sizing: border-box;
	    overflow-y:scroll;
	    padding-bottom: 1.4rem;
	    position: relative;
	    top:1.4rem;
		background: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
		rgba(0, 0, 0, 0.2);
	border-radius: 0.13rem;
		padding-top: 1.2rem;
	}
	 form{
  	  width: 6.8rem;
  	  height: 12rem;
	  margin: 0 auto;
	  font-size: 0.37rem;
	  button {
		  background-color: #000;
		  cursor: pointer;
		  border: none;
		  color: #E6CC7E;
		  width: 5.33rem;
		  margin: .25rem 0.5rem 1.33rem 0.7rem;
		  height: 1.07rem;
		  line-height: 1.07rem;
		  border-radius: 7px;
		  font-size: 0.43rem;
		  margin-top: 0.5rem;
	  }
	  span{
		color: red;
		display: block;
		height: .53rem;
		line-height: .53rem;
		margin-top: -1rem;
		margin-bottom: .5rem;

	  }
	  div{
		  position: relative;
		  background-color: #000;
		  border-radius: 7px;
		  width: 6.8rem;
		  height: 1.2rem;
		  line-height: 1.2rem;
		  margin-bottom: .5rem;
		  padding: 0 10px 0 10px;
		  label {
			  position: absolute;
			  left: 5px;
			  width: 2rem;
			  color: #999;
	      }
	      button{
	      	position: absolute;
			right: 0.2rem;
			top:50%;
			background-color: #ffbb33;
			cursor: pointer;
			border: none;
			color: white;
			width: 2.33rem;
			height: 0.75rem;
			background-color: #262626;
			border-radius: 0.13rem;
			border: solid 1px #e5cc7e;
			line-height:0.6rem;
			border-radius: 7px;
			margin:-0.4rem 0 0 0;
			font-size: 0.32rem;
			color: #E6CC7E;
	      }
	      input {
			  background-color: transparent;
			  border: none;
			  position: absolute;
			  width: 4.6rem;
			  left: 2rem;
			  margin-top: 0.1rem;
			  height: 1rem;
			  line-height: 1.2rem;
			  outline: none;
			  color: #4d4d4d;
		  }
		  input::-webkit-input-placeholder{
				color: #4d4d4d;
			}
			input::-moz-input-placeholder{
				color: #4d4d4d;
			}
			input:-ms-input-placeholder{
				color: #4d4d4d;
			}
		  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
			-webkit-text-fill-color: #4d4d4d !important;
			-webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
		    background-color:transparent;
		    background-image: none;
		     transition: background-color 50000s ease-in-out 0s;
		}
	  }
	  
	  
	}
</style>