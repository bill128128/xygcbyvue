<template>
	<div id="myOrder">
		<top :message='title'></top>
		<ul class="orderlist">
			<li v-for="(item,index) in list" :key="index">
				<div class="part1">
					{{item.username}}  {{item.mobile}}<span>{{item.olStatus}}</span>
				</div>
				<div class="part2">
					<img :src="item.avatar"/>
					<div class="js">
						实付：<span>{{item.shop_int}}</span> 积分<br>
						原价:{{item.olshop_int}}<br />
						{{item.title}}                         
					</div>
				</div>
				<div class="part3">
					<div class="jstc" @click="jstc(index)" v-if="item.quickenStatus == 1">加速提车</div>
					<div class="jstc"  v-if="item.quickenStatus == 2">加速提车</div>
					<div class="jstc"  v-if="item.quickenStatus == 3" v-show="jsshow">加速提车</div>
					<div class="yqh" @click="tk(index)" v-if="item.refund == 1">退款</div>
					<div class="yqh" v-if="item.refund == 2">退款</div>
					<div class="yqh" v-if="item.refund == 3" v-show="jsshow">退款</div>
				</div>
			</li>
		</ul>
		<div class="fd">
        	<div class="ftop"  @click="goSrc('/memindex')"><img src="../../../static/img/tc.png"></div>
        	<div class="fbottom" @click="goSrc('/personal')"><img src="../../../static/img/me.png"></div>
        </div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import top from '../common/top'
	export default{
		name:'myOrder',
		components:{
			top,
		},
		data(){
			return{
				title:'购车订单',
				info:{
					memberid:0,
					page:1,
				},
				list:[],
				jsshow:false,
				
			}
		},
		methods:{
			accelerate:function(){
				this.$store.dispatch('jstc/jstc').then(()=>{
					if(this.$store.state.jstc.code == 200){
						this.$toast({
							message:this.$store.state.jstc.msg,
						});
					}else{
						this.$toast({
							message:this.$store.state.jstc.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			},
			goSrc(str){
				this.$router.push(str);
			},
			refund:function(){
				this.$store.dispatch('tk/tk').then(()=>{
					if(this.$store.state.tk.code == 200){
						this.$toast({
							message:this.$store.state.tk.msg,
						});
					}else{
						this.$toast({
							message:this.$store.state.tk.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			},
			jstc(index){
				window.localStorage.setItem('orderid',this.list[index].id);
				var title = ' ';
				var message = this.list[index].olStatus;
				MessageBox.confirm(message,title).then(()=>{
					this.accelerate();
				});
				
			},
			tk(index){
				window.localStorage.setItem('orderid',this.list[index].id);
				var title = ' ';
				var message = '确认退款后，客服将与您联系相关退款事宜。';
				MessageBox.confirm(message,title).then(()=>{
					this.refund();
				});
				
			},
			getlist(){
				this.info.memberid = window.localStorage.getItem('memberid');
				this.$store.dispatch('myorder/getOrderList',this.info).then(()=>{
					if(this.$store.state.myorder.code == 200){
						this.list = this.$store.state.myorder.data;
					}else if(this.$store.state.myorder.code==40000){
						this.$toast({
							message:'您还没有登录！'
						})
		                		window.localStorage.removeItem('date');	
		           				this.$router.push('/login');
					}
					else{
						this.$toast({
							message:this.$store.state.myorder.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			}
		},
		created(){
			this.getlist();
		},
	}
</script>

<style scoped lang="less">
	#myOrder{
		min-height: 19rem;
	}
	.fd{
    	width: 1.17rem;
		height: 2.37rem;
		background-color: #262626;
		border-radius: 0.13rem;
		position: fixed;
		bottom: 0.2rem;
		left: 0.1rem;
		opacity: 0.9;
		display: flex;
		flex-direction: column;
		.ftop{
			padding: 0.2rem;
			border-bottom: 1px solid #1a1a1a;
		}
		.fbottom{
			padding: 0.2rem;
		}
    }
	.orderlist{
		width: 9.2rem;
		position: relative;
		top: 2rem;
		margin: 0 auto;
		li{
			width: 100%;
			background-color: #262626;
			box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
				rgba(31, 31, 51, 0.2);
			border-radius: 0.13rem;
			padding: 0.5rem 0.4rem;
			.part1{
				height: 0.5rem;
				line-height: 0.5rem;
				display: flex;
				justify-content: space-between;
				color: #999;
				font-size: 0.32rem;
				span{
					color: #E6CC7E;
					font-size: 0.37rem;
				}
			}
			.part2{
				display: flex;
				justify-content: flex-start;
				margin-top: 0.5rem;
				padding-bottom: 0.3rem;
				border-bottom: 1px solid #404040;
				img{
					width: 1.97rem;
					height: 1.97rem;
					border-radius: 0.13rem;
					margin-right: 0.3rem;
				}
				.js{
					color: #ccc;
					font-size: 0.32rem;
					line-height: 0.6rem;
					span{
						color: #E6CC7E;
						font-size: 0.48rem;
					}
				}
			}
			.part3{
				display: flex;
				justify-content: flex-end;
				font-size: 0.37rem;
				margin-top: 0.4rem;
				.jstc{
					width: 2.03rem;
					height: 0.75rem;
					background-color: #e5cc7e;
					border-radius: 0.08rem;
					border: solid 0.03rem #e5cc7e;
					opacity: 0.5;
					color: #666;
					text-align: center;
					line-height: 0.7rem;
					margin-right: 0.4rem;
				}
				.yqh{
					width: 2.03rem;
					height: 0.75rem;
					border-radius: 0.08rem;
					border: solid 0.03rem #e5cc7e;
					opacity: 0.5;
					color: #E6CC7E;
					text-align: center;
					line-height: 0.7rem;
				}
			}
		}
	}
</style>