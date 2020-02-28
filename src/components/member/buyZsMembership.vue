<template>
	<div id="buyZsMembership">
		<div class="goldmember">
			<div class="jifen">{{content.title}} <span>{{content.shop_int}}</span> 积分</div>
			<ul class="jf">
				<li>会员一年一交</li>
			</ul>
			<div class="kt" @click="showPayCover">立即开通</div>
			<div class="tq">
				<div class="title">会员特权</div>
				<p v-html="contents">{{contents}}</p>
			</div>
		</div>
		<transition name="fade">
	        <div class="payCover" v-show="payCoverShow">
	        	<div class="close" @click="hidePayCover"><a></a></div>
	            <div class="payFrame">
	                <div class="payCount">
	                    <h2><span>{{content.shop_int}}</span>积分</h2>
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
	                <button class="surePay" @click="pay">确认支付</button>
	            </div>
	        </div>
        </transition>
	</div>
</template>

<script>
	export default{
		name:'buyZsMembership',
		data(){
			return{
				isActive:false,
				msgLength:0,
                msg:'',
                payCoverShow:false,
                content:{},
                contents:'',
                memberid:0,
                directorsId:0,
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
			changejf(){
				this.isActive = !this.isActive;
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
        	getContent(){            //获取内容
        		this.memberid = window.localStorage.getItem('memberid');
                this.$store.dispatch('buymembership/getMemberList',this.memberid).then(() => {
					if(this.$store.state.buymembership.code==200){
                        this.content = this.$store.state.buymembership.carmember[1];
                        this.directorsId = this.$store.state.buymembership.carmember[1].id;
                        this.contents = this.$store.state.buymembership.contents;
					}else{
						this.$toast({
							message:this.$store.state.buymembership.msg,
						});
					}					          
				}).catch((e) => {              
					//alert(输入错误);
				})
           },
           pay(){
           	this.$store.dispatch('buyMember/buyMember',[this.memberid,this.directorsId,this.msg]).then(()=>{
           		if(this.$store.state.buyMember.code == 200){
           			this.$toast({
           				message:this.$store.state.buyMember.msg
           			});
           				this.$router.push('/selectCar');
           		}else{
           			this.$toast({
           				message:this.$store.state.buyMember.msg
           			});
           		}
           	}).catch((e) => {              
					//alert(输入错误);
				})
           }
		},
		created(){
			this.msg = '';
			this.getContent();
		},
	}
</script>

<style scoped lang="less">
	#buyZsMembership{
		min-height: 17rem;
	}
.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
    /* 支付弹出窗口 */
    .payCover{
        position: absolute;
        top: 0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.7);
        z-index:99;
        overflow: hidden;
        .close{
			position: absolute;
			right:5px;
			top:7.4rem;
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
	.goldmember{
		position: relative;
		width: 8.27rem;
		height: 14.42rem;
		background: url(../../../static/img/zshybg.png) no-repeat;
		background-size: contain;
		margin: 0 auto;
		padding-top: 4.8rem;
		.jifen{
			color: #E6CC7E;
			font-size: 0.43rem;
			text-align: center;
			margin-bottom: 0.5rem;
			span{
				font-size: 0.63rem;
				color: #FF0000;
			}
		}
		.jf{
			width: 100%;
			padding-left: 1.6rem;
			color: #999;
			font-size: 0.32rem;
			margin-bottom:0.3rem;
			li{
				height: 0.3rem;
				/*padding-left: 0.4rem;
				background: url(../../../static/img/1.png) no-repeat left;
				background-size: contain;*/
				line-height: 0.3rem;
				
			}
			.active{
				background: url(../../../static/img/2.png) no-repeat left;
				background-size: contain;				
			}
			
		}
		.kt{
			width: 5.33rem;
			height: 0.85rem;
			background-color: #e6cc7e;
			box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
				rgba(153, 122, 31, 0.2);
			border-radius: 0.13rem;
			text-align: center;
			line-height: 0.85rem;
			font-size: 0.43rem;
			color: #000;
			margin: 0 auto;
			font-weight: bold;
			margin-bottom: 0.8rem;
		}
		.tq{
			width: 6.67rem;
			margin: 0 auto;
			.title{
				height: 0.37rem;
				background: url(../../../static/img/hy3.png) no-repeat left;
				background-size: contain;
				color: #333;
				font-size: 0.37rem;
				font-weight: bold;
				padding-left: 0.5rem;
				line-height: 0.37rem;
				margin-bottom: 0.4rem;
			}
			p{
				line-height: 0.51rem;
				font-size: 0.32rem;
				color: #999;
			}
		}
	}
</style>