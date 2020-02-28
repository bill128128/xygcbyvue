<template>
	<div id="login">
		<div class="top">
			<img src="../../assets/left.png" @click="goSrc('/index')">
			登&nbsp;&nbsp;录			
		</div>
		<!--<div class="loginbox">
			<div class="logo"></div>
			<p>鑫 赢 购 车</p>
			<div class="login">
				<form>
					<div>
						<label>登录名：</label>
						<input v-model="loginForm.name"  type="text" name="name" placeholder="请输入用户名" autocomplete="off" />
					</div>
					<span> </span>
					<div>
						<label>密&nbsp;&nbsp;&nbsp;码：</label>
						<input v-model="loginForm.password"  type="password" name="password" placeholder="请输入密码" autocomplete="off">
					</div>
					<span> </span>
					<p class="register" @click="goSrc('/forgetPassword')"> <a>忘记密码</a></p>
					<input type="radio" id="agreement" :checked="check" @click="checkradio"/>
					<label for="agreement" ><a @click="goSrc('/loginagreement')">我已阅读并同意用户服务协议</a></label>
					<button @click="doLogin" type="button">登&nbsp;&nbsp;录</button>
				</form>
				
			</div>
		</div>-->
		<div class="containers">
			
			<div class="loginbox">
				<div class="logo"></div>
				<p>鑫 赢 购 车</p>
				<form>
					<div>
						<label>登录名：</label>
						<input v-model="loginForm.name"  type="text" name="name" placeholder="请输入用户名" autocomplete="off" />
					</div>
					<span> </span>
					<div>
						<label>密&nbsp;&nbsp;&nbsp;码：</label>
						<input v-model="loginForm.password"  type="password" name="password" placeholder="请输入密码" autocomplete="off">
					</div>
					<span> </span>
					<p class="register"> <a @click="goSrc('/register')">用户注册</a><a @click="goSrc('/forgetPassword')">忘记密码</a></p>
					<input type="radio" id="agreement" :checked="check" @click="checkradio"/>
					<label for="agreement" ><a @click="goSrc('/loginagreement')">我已阅读并同意用户服务协议</a></label>
					<button @click="doLogin" type="button">登&nbsp;&nbsp;录</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'login',
		components:{
			top,
		},
		data(){
			return{
				title:'登录',
				loginForm: {
		          name: '',
		          password: ''
		       },
		       check:false,
			}
		},
		methods:{
			checkEmpty(info,text){   //判断不为空
                if(info == null || info == ""){
                    this.$toast({message:text+'不能为空'})
                    return false;
                }
            },
            checkradio(){
            	this.check = true;
            },
			doLogin(e){
				if(this.check == false){
					this.$toast({
						message:'请同意用户协议'
					});
					return false;
				}
				if(this.checkEmpty(this.loginForm.name,'用户名') == false) return false;
                if(this.checkEmpty(this.loginForm.password,'密码') == false) return false;
                e.preventDefault();
                this.$store.dispatch('login/login',this.loginForm).then(() =>{
                    if(this.$store.state.login.code == 200 ){
                    	
                    	// console.log(this.is_mobile+'sdfs'+this.is_problem);
                       this.$router.push({
	                        name:'memindex',
	                        params:{
	                            accessToken:this.$store.state.login.accseeToken,
	                        }
	                    })
                    }else{
                        this.$toast({
                            message:'用户名密码不匹配',
                        })
                    }
                })
			},
			goSrc(src){
				this.$router.push(src);
			}
		},
		
	}
</script>

<style scoped lang="less">
	#login{
		min-height: 16rem;
	}
	.top {
		position: fixed;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;	    
	    background-size:cover;
	    font-size:0.45rem;
	    color:#e6cc7e;
	    text-align: center;
	    z-index: 9999;
	    background: #1a1a1a;
	}
	.top img{
		position:absolute;
		width: .21rem;
		height: .4rem;
		left:0.3rem;
		margin-top: .5rem;
	}
	.top span{
		position: absolute;
		right:.3rem;
		font-size:0.37rem;
	}
	.containers{
		width:8.4rem;
	    margin:0 auto 0.4rem;
	    overflow: auto;
	    box-sizing: border-box;
	    overflow-y:scroll;
	    padding-bottom: 1.4rem;
	    position: relative;
	    top:1.4rem;
	    min-height: 14rem;
	}
	.loginbox{
		padding-top: 1.2rem;
		width: 8.4rem;
		height: 14rem;
		margin: 0 auto;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
		overflow: auto;
	    box-sizing: border-box;
	    padding-bottom: 1.4rem;
	    .logo{
	    	position: relative;
	    	padding-top: 1.6rem;
	    	width: 1.6rem;
	    	height: 1.6rem;
	    	margin: 0 auto;
	    	background: url(../../../static/img/logo.png) no-repeat;
	    	background-size: contain;
	    }
	    p{
	    	position: relative;
	    	color: #E6CC7E;
	    	font-size: 0.48rem;
	    	margin: 0 auto;
	    	line-height: 1.52rem;
	    	text-align: center;
	    }
	    
		  form{
		  	  width: 6.8rem;
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
				  box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
					rgba(0, 0, 0, 0.2);
			  }
			  /*span{
				color: red;
				display: block;
				height: .53rem;
				line-height: .53rem;
				margin-top: -1rem;
				margin-bottom: .5rem;
		
			  }*/
			  div{
				  position: relative;
				  background-color: #000;
				  border-radius: 7px;
				  z-index: 0;
				  height: 1.2rem;
				  line-height: 1.2rem;
				  margin-bottom: .5rem;
				  padding: 0 10px 0 10px;
				  label {
					  position: absolute;
					  left: 5px;
					  width: 1.6rem;
					  color: #999;
					  a{
					  	color:#999;
					  }
			      }
			      input {
					  background-color: transparent;
					  border: none;
					  position: absolute;
					  width: 4.6rem;
					  left: 1.6rem;
					  margin-top: 0.1rem;
					  height: 1rem;
					  line-height: 0.85rem;
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
			  input[type="radio"]{
			  	position: absolute;
			  	clip: rect(0,0,0,0);
			  }
			  input[type="radio"] + label::before{
			  	content: "";
			  	background: #262626;
			  	border: 1px solid #666666;
			  	width: 0.2rem;
			  	height: 0.2rem;
			  	border-radius: 50%;
			  	float: left;
			  	padding: 3px;
			  	margin: 3px;
			  	margin-top: 0px;
			  	margin-right: 12px;
			  }
			  input[type="radio"]:checked + label::before{
			  	background-color: #E6CC7E;
			  	background-clip: content-box;
			  	padding: 3px;
			  }
			  .register{
				text-align: right;
				margin-top: -0.5rem;
				padding-right: 0.2rem;
				font-size: .35rem;
				line-height: 1rem;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				a{
					color: #999;
					margin-right: 0.3rem;
				}
				a:last-child{
					color: #999;
				}
			}
		  
		  
		}
	}
	a{
	  	color: #666;
	  }
</style>