<template>
	<div id="addpartener">
		<top :message='title'></top>
		<div class="addbg">
			<div class="tjm">我的推荐码：<span>{{list.number}}</span></div>
			<div class="ewm">
				<img :src="list.img_url" />
			</div>
			<div class="fx" @click="showPayCover" v-clipboard:copy="news.url" v-clipboard:success="onCopy" v-clipboard:error="onError">分享二维码</div>
			<!--<div class="fx" @click="showPayCover">分享二维码</div>-->
		</div>
		<!--<div class="payCover" v-show="payCoverShow">
			<div class="payFrame">
				<ul class="ptop">
					<li><img src="../../../static/img/wx.png" @click="wxShareAppMessage"><br>微信</li>
					<li><img src="../../../static/img/pyq.png" @click="wxShareTimeline"><br>朋友圈</li>
				</ul>
				<div class="pbot"  @click="hidePayCover">取消</div>
			</div>
		</div>-->
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'addpartener',
		components:{
			top,
		},
		data(){
			return{
				title:'邀请伙伴',
				payCoverShow:false,
				list:{},
				memberid:0,
				news:{},
			}
		},
		mounted(){
			this.wxapi.wxRegister(this.wxRegCallback)
		},
		methods:{
			getshareinfo(){
				this.$store.dispatch('wxshare/getshareinfo').then(()=>{
					if(this.$store.state.wxshare.code == 200){
						this.news = this.$store.state.wxshare.data.news;
					}else{
						this.$toast({
							message:this.$store.state.addpartener.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			},
			wxRegCallback () {
			  // 用于微信JS-SDK回调
			  this.wxShareTimeline()
			  this.wxShareAppMessage()
			},
			wxShareTimeline () {
			  // 微信自定义分享到朋友圈
			  let option = {
			    title: this.news.title, // 分享标题, 请自行替换
			    link: this.news.url, // 分享链接，根据自身项目决定是否需要split
			    imgUrl: this.news.imgUrl, // 分享图标, 请自行替换，需要绝对路径
			    success: () => {
			      this.$toast({
			      	message:'分享成功'
			      })
			    },
			    error: () => {
			      this.$toast({
			      	message:'取消分享'
			      })
			    }
			  }
			  // 将配置注入通用方法
			  this.wxapi.ShareTimeline(option)
			},
			wxShareAppMessage () {
			  // 微信自定义分享给朋友
			  let option = {
			    title: this.news.title, // 分享标题, 请自行替
			    desc: this.news.describe,  // 分享描述, 请自行替换
			    link: this.news.url, // 分享链接，根据自身项目决定是否需要split
			    imgUrl: this.news.imgUrl, // 分享图标, 请自行替换，需要绝对路径
			    success: () => {
			      this.$toast({
			      	message:'分享成功'
			      })
			    },
			    error: () => {
			      this.$toast({
			      	message:'取消分享'
			      })
			    }
			  }
			  // 将配置注入通用方法
			  this.wxapi.ShareAppMessage(option)
			},
			onCopy: function (e,index) {
				this.$toast({
					message:'复制成功，请分享给您的好友吧！如果您是微信打开，请点击右上角...来分享给您的好友或者发朋友圈！',
				});
				//alert(index);
				// this.list[index].popupVisible = false;
		    },
		    hide(index){
		    	this.list[index].popupVisible = false;
		    },
		    onError: function (e) {
		      this.$toast({
				message:'复制失败 ',
			  });
		    },
			showPayCover(){
        		this.payCoverShow = true;
        	},
        	showPayCover1(){
        		this.payCoverShow = true;
        	},
        	hidePayCover(){
        		this.payCoverShow = false;
        	},
        	getinfo(){
				this.memberid = window.localStorage.getItem('memberid');
				this.$store.dispatch('addpartener/doit',this.memberid).then(()=>{
					if(this.$store.state.addpartener.code == 200){
						this.list = this.$store.state.addpartener.data;
					}else if(this.$store.state.addpartener.code==40000){
							this.$toast({
							message:'您还没有登录！'
						})
		                
                		window.localStorage.removeItem('date');	
           				this.$router.push('/login');
						}
					else{
						this.$toast({
							message:this.$store.state.addpartener.msg,
						});
					}
				}).catch((e) => {              
	                this.$toast({
						message:'您还没有登录！'
					})
	                
            		window.localStorage.removeItem('date');	
       				this.$router.push('/login');
	            });
			}
       },
       created(){
       	this.getinfo();
       	this.getshareinfo();
       },
	}
</script>

<style scoped lang="less">
	#addpartener{
		min-height: 18rem;
	}
	.addbg{
		width: 8.48rem;
		height: 13.7rem;
		margin: 0 auto;
		background: url(../../../static/img/yqhbbg.png) no-repeat;
		background-size: cover;
		position: relative;
		top: 2rem;
		padding-top: 1rem;
		.tjm{
			width: 6.4rem;
			height: 1.2rem;
			margin: 0 auto;
			line-height: 1.2rem;
			font-size: 0.37rem;
			text-align: center;
			color: #3d3d3d;
			border-bottom:1px solid #5c5c5c;
			margin-bottom:0.5rem;
			span{
				color: #1a1a1a;
			}
		}
		.ewm{
			width: 4.4rem;
			height: 4.4rem;
			margin: 0 auto;
			margin-bottom: 1rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.fx{
			text-align: center;
			font-size: 0.43rem;
			color: #3d3d3d;
		}
	}
    .payCover{
        position: absolute;
        left:0;
        bottom: 0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.7);
        z-index:99;
        overflow: hidden;
    }
    .payFrame{
        width:100%;
        height:4.2rem;
        background-color:#fff;
        border-radius: 0.13rem 0.13rem 0rem 0rem;
        z-index:10000;
        position: absolute;
        bottom:0;
        left:0;
        .ptop{
        	display: flex;
        	justify-content: space-around;
        	width: 100%;
        	height: 3rem;
        	padding-top:1rem;
        	li{
        		font-size: 0.32rem;
        		color: #666;
        		line-height: 0.31rem;
        		text-align: center;
        		img{
	        		width: 1.07rem;
	        		height: 1.07rem;
	        		margin-bottom: 0.2rem;
	        	}
        	}
        	
        }
        .pbot{
        	text-align: center;
        	line-height: 1.2rem;
        	font-size: 0.37rem;
        	color: #999;
        }
    }
    
</style>