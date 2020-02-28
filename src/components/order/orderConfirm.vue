<template>
	<div id="orderConfirm">
		<div class="part1">
			<div class="top">
				<img src="../../../static/img/left.png" @click="goback">
			</div>
			<div class="headimg">
				<img :src="carinfo.member.avatar">
			</div>
			<div class="mingzi">
				{{carinfo.member.username}}<span>{{carinfo.member.mobile}}</span>
			</div>
		</div>
		<div class="part2">
			<img :src="carinfo.car.avatar"/>
			<div class="di">{{carinfo.car.title}}</div>
			<div class="price">{{carinfo.car.shop_int}}<span>积分</span></div>
		</div>
		<div class="part3">
			<div class="title">购买须知</div>
			<p v-html="carinfo.message">{{carinfo.message}}
			</p>
			<img src="../../../static/img/yq.png" @click="goSrc('/addpartener')"/>
		</div>
		<div class="part4" @click="showPayCover">确认支付</div>
		<transition name="fade">
	        <div class="payCover" v-show="payCoverShow">
	        	<div class="close" @click="hidePayCover"><a></a></div>
	            <div class="payFrame">
	                <div class="payCount">
	                    <h2><span>{{carinfo.car.shop_int}}</span>积分</h2>
	                </div>
	                <div class="payPwd">
	                    支付密码：
	                     <!--<input ref="pwd" type="password" maxlength="6" v-model="msg" class="realInput"/>-->
	                     <!--<div class="pwd-wrap" @click="focus">
	                     	<div class="item" v-for="i in 6">{{msg[i-1]}}</div>
	                        <input type="number" v-model="msg" maxlength="6" class="realInput" autofocus="autofocus" />
	                    </div>-->
	                    <input ref="pwd" type="password" maxlength="6" v-model="msg"  style="position: absolute;z-index: -1;left:-100%;opacity: 0"/>
					    <ul class="pwd-wrap" @click="focus">
					      <li><i v-if="msgLength > 0"></i></li>
					      <li><i v-if="msgLength > 1"></i></li>
					      <li><i v-if="msgLength > 2"></i></li>
					      <li><i v-if="msgLength > 3"></i></li>
					      <li><i v-if="msgLength > 4"></i></li>
					      <li><i v-if="msgLength > 5"></i></li>
						</ul>
	                </div>
	                <button class="surePay" @click="buycar">确认支付</button>
	            </div>
	        </div>
        </transition>
	</div>
</template>

<script>
	export default{
		name:'orderConfirm',
		data(){
			return{
				msgLength:0,
                msg:'',
                payCoverShow:false,
                cityid:0,
                memberid:0,
                carinfo:{},
                id:0,
			}
		},
		watch:{
            msg(curVal){
                if(/[^\d]/g.test(curVal)){
                this.msg = this.msg.replace(/[^\d]/g,'');
                }else{
                    this.msgLength = curVal.length;
                }
            },
        },
        methods:{
        	goback(){
        		this.$router.go(-1);
        	},
        	goSrc(src){
        		this.$router.push(src);
        	},
        	showPayCover(){
        		this.payCoverShow = true;
        	},
        	hidePayCover(){
        		this.payCoverShow = false;
        		this.msg = '';
        	},
        	focus(){
		        this.$refs.pwd.focus();
		    },
        	getinfo(){
        		
				this.$store.dispatch('xc/buycar',[this.memberid,this.id]).then(()=>{
					if(this.$store.state.xc.code==200){
						this.carinfo = this.$store.state.xc.data;
					}else if(this.$store.state.xc.code==40000){
						this.$toast({
							message:this.$store.state.xc.msg
						});
	           			this.$router.push('/login');
					}
					else{
						this.$toast({
							message:this.$store.state.xc.msg
						});
						this.$router.go(-1);
						
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
       		},
          	buycar(){
				this.$store.dispatch('buycar/buycar',[this.memberid,this.id,this.msg]).then(()=>{
					if(this.$store.state.buycar.code==200){
						this.$toast({
							message:this.$store.state.buycar.msg
						})
						var num = this.$store.state.buycar.data.number;
						window.localStorage.setItem('num',num);
						this.$router.push('/paySuccess');
					}else{
						this.$toast({
							message:this.$store.state.buycar.msg
						});
						
						this.$router.push("/buyMembership");
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			}
       },
       created(){
       	this.msg = '';
		this.memberid = window.localStorage.getItem('memberid');
		this.id = window.localStorage.getItem('carid');
		console.log(this.id);
       	this.getinfo();
       	 
       },
       
	}
</script>

<style scoped lang="less">
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
    /* 支付弹出窗口 */
    .payCover{
        position: fixed;
        left:0;
        bottom:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.7);
        z-index:99;
        overflow: hidden;
        .close{
			position: absolute;
			right:15px;
			bottom:9rem;
			z-index:10001;
			a{ display: inline-block; width: 20px;height:5px; background: #E6CC7E;line-height: 0;font-size:0;vertical-align: middle;-webkit-transform: rotate(45deg);}
		  a:after{content:'/';display:block;width: 20px;height:5px; background: #E6CC7E;-webkit-transform: rotate(-90deg);}
		}
    }
    .payFrame{
        width:100%;
        height:10.2rem;
        background-color:#fff;
        border-radius: 0.13rem 0.13rem 0rem 0rem;
        z-index:10000;
        position: absolute;
        bottom:0;
        left:0;
    }
    .payCount{
        text-align:center;
        padding:0.8rem 0;
        border-bottom: 0.01rem solid  #e6e6e6;
    }
    .payCount .count{
        display:flex;
        justify-content: center;
        align-items: center;
        padding-top:0.2rem;
    }
    .payCount h2{
        font-size:0.43rem;
        text-align:center;
        font-weight: normal;
        color:#333;
    }
    .payCount h2 span{
        font-size:0.75rem;
        color:#E6CC7E;
    }
    .payCount h2 b{
    	font-weight: normal;
    }
    .payPwd{
        padding:0.4rem;
        font-size:0.37rem;
        color:#333;
    }
    .realInput{
        position: absolute;
        z-index: 1;
        opacity: 0;
    }
    .pwd-wrap{
        width:7.57rem;
        height:1.28rem;
        line-height:1.28rem;
        padding-bottom: 1px;
        margin: 0.8rem auto;
        background: #fff;
        border:1px solid #ddd;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        cursor: pointer;
        flex-wrap: nowrap;
    }


		.item {
		  flex-basis: 16.6%;
		  font-size: 1rem;
		  text-align: center;
		  line-height: 1.2rem;
		}
		.item:not(:last-of-type) {
		  border-right: 1px solid #ddd;
		}
		
		input {
		  position: absolute;
		  height: 1rem;
		  opacity: 0;
		  left: 0;
		  width: 6rem;
		}
    .pwd-wrap li{
        text-align: center;
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        border-right:1px solid #ddd ;
    }
    .pwd-wrap li:last-child{border:0}
     /*.pwd-wrap li input{
        height:1rem;
        width: 1rem;
        border-radius:50% ;
        background: #000;
        display: inline-block;
        border: none;
        outline: none;
    }*/
   .pwd-wrap li i{
	    height: 10px;
	    width: 10px;
	    border-radius:50% ;
	    background: #000;
	    display: inline-block;
	  }
    .surePay{
        width:4.27rem;
        height:1.07rem;
        line-height:1.07rem;
        background-color: #ffbb33;
        border-radius: 0.13rem;
        font-size:0.43rem;
        text-align:center;
        color:#fff;
        border:0;
        outline:0;
        display: block;
        margin:0 auto;
    }
    /* 确认订单 */
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
        color: #fefefe;
    }
   
    /* 总计 */
    .total{
        margin:0.4rem 0 0;
        text-align:right;
        font-size:0.32rem;
    }
    .total span:nth-child(2){
        font-size:0.43rem;
        color:#ffbb33;
    }
    .total span:nth-child(4){
        font-size:0.43rem;
        color:#ffbb33;
    }
    /* 确认兑换 */
    .pay{
        width:100%;
        padding:1rem 0;
        background-image: linear-gradient(-90deg,#384466 0%, #596487 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        text-align: center;
    }
    .pay b{
    	font-weight: normal;
    }
    .pay p{
        font-size:0.43rem;
        text-align:center;
    }
    .pay p span{
        font-size:0.53rem;
        color:#ffbb33;
    }
    .submit{
        width: 3.2rem;
	    height: 0.96rem;
	    background-color: #ffbb33;
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        border:0;
        outline:0;
        margin:0.5rem auto 0;
        font-size: .43rem;
    }
	.part1{
		width: 10rem;
		height: 8rem;
		background: url(../../../static/img/p1.png) no-repeat;
		background-size: cover;
		position: relative;
		.top{
			width: 10rem;
			height: 1.17rem;
			padding-left:0.4rem;
			img{
				width: 0.27rem;
				height: 0.48rem;
				margin-top: 0.4rem;
			}
		}
		.headimg{
			width: 2.1rem;
			height: 2.1rem;
			background-color: #ffffbf;
			border-radius: 50%;
			margin: 0 auto;
			margin-bottom: 0.5rem;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.mingzi{
			width: 3.92rem;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			font-size: 0.43rem;
			color: #E6CC7E;
			span{
				font-size: 0.37rem;
				color: #999;
				padding-left: 0.3rem;				
			}
		}
	}
	.part2{
		width: 9.2rem;
		height: 5.33rem;
		background-color: #000000;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.4);
		border-radius: 0.13rem;
		position: absolute;
		top: 5.5rem;
		left: 0.4rem;
		img{
			width: 9.2rem;
			height: 4.26rem;
		}
		.di{
			width: 9.2rem;
			height: 1.07rem;
			background-color: #262626;
			border-radius: 0 0 0.13rem 0.13rem;
			color: #999;
			font-size: 0.37rem;
			text-align: right;
			padding-right: 0.8rem;
			padding-left: 3.8rem;
			line-height: 1.07rem;
			overflow: hidden;
		}
		.price{
			width: 2.9rem;
			height: 0.96rem;
			background-color: #1a1a1a;
			box-shadow: 0rem 0.03rem 0.13rem 0.01rem 
				rgba(0, 0, 0, 0.8);
			border-radius: 0.11rem;
			position: absolute;
			left: 0.4rem;
			bottom: 0.4rem;
			line-height: 0.96rem;
			text-align: center;
			color: #E6CC7E;
			font-size: 0.47rem;
			span{
				padding-left: 0.2rem;
				font-size: 0.38rem;
			}
		}
	}
	.part3{
		position: absolute;
		width: 10rem;
		height: 10.6rem;
		background: url(../../../static/img/p3.png) no-repeat;
		background-size: cover;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.4);
		border-radius: 0.13rem;
		top: 11rem;
		padding: 0.7rem 0.8rem;
		margin-bottom: 3rem;
		.title{
			color: #ccc;
			font-size: 0.43rem;
			text-align: left;
		}
		p{
			font-size: 0.32rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 0.48rem;
			letter-spacing: 0rem;
			color: #999999;
			padding-bottom: 0.5rem;
			padding-top: 0.2rem;
		}
		img{
			position: absolute;
			bottom: 0.5rem;
			left: 0.4rem;
			width: 9.2rem;
			height: 3.4rem;
		}
	}
	.part4{
		width: 10rem;
		height: 1.31rem;
		background-color: #262626;
		box-shadow: 0rem -0.01rem 0.53rem 0rem 
			rgba(0, 0, 0, 0.2);
		position: fixed;
		bottom: 0;
		line-height: 1.31rem;
		color: #E6CC7E;
		font-size: 0.43rem;
		text-align: center;	
	}
</style>