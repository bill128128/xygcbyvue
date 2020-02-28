<template>
	<div id="register">
		<div class="top">
			<img src="../../assets/left.png" @click="goSrc('/index')">
			注&nbsp;&nbsp;册			
		</div>
		<div class="containers">
			<div class="register">
				<form>
					<div>
						<label>登录名：</label>
						<input v-model="info.name"  type="text" name="name" placeholder="请输入用户名" autocomplete="off" />
					</div>
					<span> </span>
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
						<label>推荐码：</label>
						<input v-model="info.tj"  type="text" name="tj" placeholder="请输入推荐码" autocomplete="off" :readonly="yzmcheck">
					</div>
					<!--<div>
						<label>城&nbsp;&nbsp;&nbsp;市：</label>
						<input v-model="info.city"  type="text" name="city" placeholder="请选择提车城市" autocomplete="off">
					</div>-->
					<div class="selected select_count">
						<div class="placeholder" @click="showSelectMenu"><span>{{info.placeholder}}</span></div>
							<span class="icon"><img src="../../../static/img/down.png" alt="icon" v-show="!isShowSelectMenu"/></span>
	                        <span class="icon"><img src="../../../static/img/up.png" alt="icon" v-show="isShowSelectMenu"/></span>
						<ul class="select_menu"  v-show="answerShow">
							<li v-for="(item,index) in citylist" :key="index" @click="SelectCount(index)">{{item.title}}</li>
						</ul>
					</div>
					<div  v-show="!answerShow">
						<label>登录密码：</label>
						<input v-model="info.password"  type="password" name="password" placeholder="请输入登录密码" autocomplete="off">
					</div>
					<div  v-show="!answerShow">
						<label>确认密码：</label>
						<input v-model="info.repassword"  type="password" name="repassword" placeholder="请确认登录密码" autocomplete="off">
					</div>
					<div v-show="!answerShow">
						<label>交易密码：</label>
						<input v-model="info.paypassword"  type="password" name="paypassword" placeholder="请输入交易密码" autocomplete="off">
					</div>
					<div v-show="!answerShow">
						<label>确认密码：</label>
						<input v-model="info.repaypassword"  type="password" name="repaypassword" placeholder="请确认交易密码" autocomplete="off">
					</div>
					<input type="radio" id="agreement" :checked="check" @click="checkradio"/>
					<label for="agreement"><a @click="goSrc('/agreement')">我已阅读并同意用户服务协议</a></label>
					<button @click="doRegister" type="button">注&nbsp;&nbsp;册	</button>
				</form>
			</div>
		</div>
		
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'register',
		components:{
			top,
		},
		data(){
			return{
				title:'注册',
				info:{
					name:'',
					mobile:'',
					vertify:'',
					tj:'',
					car_region:0,
					password:'',
					repassword:'',
					paypassword:'',
					repaypassword:'',
					placeholder:'选择城市',
				},
				isShowSelectMenu:false,     //默认不展示选择下拉菜单
				isShowSlectWayMenu:false,   //默认不展示转出方式下拉菜单
				citylist:[],
				answerShow:false,
				timer:{},
				check:false,
				yzmcheck:false,
			}
		},
		methods:{
			geturl(){
				var str = window.location.href;
				//var str = 'http://demozrgc.jjzbest.com/member/reg?number=0019112554095042';
				//var str = 'http://xygc.jjzbest.com/?from=singlemessage&isappinstalled=0#/register?number=0019112554095042';
				var num = str.split('?number=')[1];
				console.log(num);
				this.info.tj = num;
				if(this.info.tj == '' || this.info.tj == null || typeof(this.info.tj) == undefined){
					this.yzmcheck = false;
				}else{
					this.yzmcheck = true;
				}
			},
			goSrc(url){
				this.$router.push(url);
			},
			showSelectMenu(){   //显示和隐藏认购选择下拉菜单
                this.isShowSelectMenu = !  this.isShowSelectMenu;
                this.answerShow = !this.answerShow;
            },
            SelectCount(index){ //将认购选择的数量填写到上面
                this.info.placeholder = this.citylist[index].title;
                this.isShowSelectMenu = ! this.isShowSelectMenu;
                this.answerShow = false;
                this.info.car_region = this.citylist[index].id;
            },
            showSelectWayMenu(){    //显示和隐藏转出方式下拉擦弹
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu ;
            },
            getcitylist(){
            	this.$store.dispatch('noLoginCity/getNoLoginCity').then(()=>{
            		if(this.$store.state.noLoginCity.code == 200){
            			this.citylist = this.$store.state.noLoginCity.data;
            		}else{
            			this.$toast({
            				message:this.$store.state.noLoginCity.msg
            			})
            		}
            		
            	}).catch((e)=>{
            		
            	})
            },
            settime:function(e){   //发送验证码
				e.preventDefault();
				console.log(this.info.mobile);
				this.$store.dispatch('getVertify/getVerify',this.info.mobile).then(() => {
					if(this.$store.state.getVertify.code==200){
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
			checkradio(){
            	this.check = true;
            },
            checkEmpty(info,text){   //判断不为空
                if(info == null || info == ""){
                    this.$toast({message:text+'不能为空'})
                    return false;
                }
            },
            doRegister(e){
            	if(this.check == false){
					this.$toast({
						message:'请同意用户协议'
					});
					return false;
				}
            	if(this.checkEmpty(this.info.name,'用户名') == false) return false;
                if(this.checkEmpty(this.info.mobile,'手机号') == false) return false;
                if(this.checkEmpty(this.info.vertify,'验证码') == false) return false;
                if(this.checkEmpty(this.info.car_region,'城市') == false) return false;
                if(this.checkEmpty(this.info.password,'登录密码') == false) return false;
                if(this.checkEmpty(this.info.repassword,'重复登录密码') == false) return false;
                if(this.checkEmpty(this.info.paypassword,'支付密码') == false) return false;
                if(this.checkEmpty(this.info.repaypassword,'重复支付密码') == false) return false;
            	e.preventDefault();
            	this.$store.dispatch('register/register',this.info).then(()=>{
            		if(this.$store.state.register.code==200){
            			this.$toast({
							message:this.$store.state.register.msg,
						});
						this.$router.push("/login");
            		}else{
            			this.$toast({
							message:this.$store.state.register.msg,
						});
            		}
            	}).catch((e) => {              
					console.log(e);
				})	
            	
            },
		},
		created(){
			this.getcitylist();
			this.geturl();
		},
		beforeDestroy(){
			 clearInterval(this.timer)
		}
	}
</script>

<style scoped lang="less">
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
	.selected{
	    display: block;
	    width: 6.8rem;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    box-sizing: border-box;
	    background: rgba(255,255,255,0.5);
	    margin: 0 auto 0.8rem;
	    border-radius: 0.13rem;
	    color: #666;
	    font-size: 0.37rem;
	    border:0;
	    outline:0;
	    position: relative;
	}
	.selected .placeholder{
	    padding:0 0.2rem;
		color:#333;
		height:100%;
		box-sizing: border-box;
	}
	.selected .placeholder span{
		overflow: hidden;
		display: inline-block;
		white-space: nowrap; 
		text-overflow:ellipsis; 
		width: 90%;
		color:#4d4d4d;
		margin-bottom: -0.1rem;
	}
	.selected .icon img{
	    position: absolute;
	    width:0.32rem;
	    height:0.2rem;
	    top:50%;
	    margin-top:-0.1rem;
	    right:0.3rem;
	}
	.selected .select_menu{
		position: absolute;
		top: 1.3rem;
		left: 0;
	    width:6.8rem;
	    padding:0 0.27rem;
	    box-sizing: border-box;
	    background-color:#000;
	    z-index: 1000;
	    border-radius:0.13rem;
	    text-align:center;
	    display: none;
	    height: 6rem;
	    overflow: auto;	    
	}
	.selected .select_menu li{
	    border-bottom:1px solid #999;
	}
	.selected .select_menu{ display:block; }
	.containers{
		width:8.4rem;
	    margin:0 auto 0.4rem;
	    overflow: auto;
	    box-sizing: border-box;
	    overflow-y:scroll;
	    padding-bottom: 1.4rem;
	    position: relative;
	    top:1.4rem;
		min-height: 20rem;
	}
	.register{
		padding-top: 1.2rem;
		width: 8.4rem;
		height: 21rem;
		margin: 0 auto;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
		overflow: auto;
	    box-sizing: border-box;
	    padding-bottom: 1.4rem;
	    form{
		  	  width: 6.8rem;
			  margin: 0 auto;
			  font-size: 0.37rem;
			  button {
				  background-color: #000;
				  box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
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
					  width: 2rem;
					  color: #999;
					  a{
					  	color:#999;
					  }
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
			  
	}
	}
	.register::-webkit-scrollbar {display:none}
</style>