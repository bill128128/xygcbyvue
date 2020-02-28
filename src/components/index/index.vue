<template>
	<div id="index">
		<div class="top">
			<div class="city">
				<p @click="changecitylistshow">{{this.cityname}}</p>
				<ul v-show="citylistshow" v-if="citytokens">
					<li v-for="(item,index) in citylist" :key="index" @click="tabcity(index)">{{item.title}}</li>
				</ul>
			</div>
			<div class="search">
				<img src="../../../static/img/search.png" />
				<form  @submit.prevent action="#">
					<input type="search" placeholder="搜索车辆" v-model="keyword" @keypress="searchcar" />
				</form>
				<img src="../../../static/img/cb.png" @click="resetkeyword">
			</div>
			<div class="message" @click="goSrc('/noticeList')"><img src="../../../static/img/lingdang.png"></div>
		</div>
		<div class="maquee">
			<mymarquee></mymarquee>
		</div>
		<div class="mySwiper w100">
            <div class="swipe-wrapper ">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in banner" :key='index'>
                            <img :src="item.avatar" alt=""/>
                        </div>
                        
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                
            </div>
            
        </div>
        <div class="dh">
        	<div class="xc" @click="goSrc('/selectCar')">
        		<img src="../../../static/img/xc.png">
        		<p>选购车型</p>
        	</div>
        	<div class="xc"  @click="goSrc('/buyMembership')">
        		<img src="../../../static/img/hy.png">
        		<p>成为会员</p>
        	</div>
        </div>
        <div class="tuijian">为您推荐</div>
        <ul class="proList">
        	<li v-for="(item,index) in car" :key="index" @click="godetail(item.id)">
        		<div class="ltop">
        			<img :src="item.avatar">
        		</div>
        		<div class="lbottom">
        			<div class="price">
        				<div class="mprice"><span>{{item.shop_int}}</span>积分/会员价</div>
        				<div class="nprice">{{item.olshop_int}}积分/原价</div>
        			</div>
        			<p>{{item.in_title}}</p>
        		</div>
        	</li>
        </ul>
        <div class="fd">
        	<div class="ftop" @click="goSrc('/liftcar')"><img src="../../../static/img/tc.png"></div>
        	<div class="fbottom" @click="goSrc('/personal')"><img src="../../../static/img/me.png"></div>
        </div>
	</div>
</template>

<script>
	import mymarquee from '../common/marquee';
	import { Search } from 'mint-ui';
	import Swiper from 'swiper'
	export default{
		name:'index',
		components:{
			mymarquee
		},
		data(){
			return{
				citylist:[],
				cityname:'',
				cityid:0,
				citylistshow:false,
				banner:[],
				car:[],
				keyword:'',
				citytokens:true,
			}
		},
//		computed:{
//      	//banner图数组
//          banner(){
//          	return this.$store.state.noLoginIndexData.banner;
//          },
//          region(){
//          	return this.$store.state.noLoginIndexData.region;
//          },
//          car(){
//          	return this.$store.state.noLoginIndexData.car;
//          },
//      },
        created(){		
        	this.checkcity();
        	//页面加载完毕调用接口函数
        	this.$store.dispatch('noLoginIndexData/getNoLoginIndexData').then(()=>{       		
        		if(this.$store.state.noLoginIndexData.code==200){
        			this.cityname = this.$store.state.noLoginIndexData.region.title;
        			window.localStorage.setItem('cityid',this.$store.state.noLoginIndexData.region.id);
        			this.banner = this.$store.state.noLoginIndexData.banner;
        			this.car = this.$store.state.noLoginIndexData.car;
        			var lists = [];
        			for(var i=0; i<this.$store.state.noLoginIndexData.roll.length; i++){
        				lists.push(this.$store.state.noLoginIndexData.roll[i].title)
        			}
        			//console.log(this.list);
        			window.localStorage.setItem('roll',lists);
        			this.$nextTick(function(){
        				var mySwiper = new Swiper ('.swiper-container', {
						    direction: 'horizontal',
			                loop: true,
			                speed:500,
			                autoplay: true,
			                delay:3000,
			                slidesPerView: "auto",
			                centeredSlides:true,
			                spaceBetween: 10,
						    // 如果需要分页器
						    pagination: {
						        el: '.swiper-pagination',
						        							        
						    },							    
						});							
            		});
            		
				}else{
					this.$toast({
						message:this.$store.state.noLoginIndexData.msg,
					});
				}
			}).catch((e) => {              
                //console.log(e);
            });
        },
        mounted(){
        	this.getCityList();
        },
		methods:{
			searchcar(e){
				if(e.keyCode == 13){
					this.$router.push({name:'selectCar',params:{keyword:this.keyword}})
				}				
			},
			checkcity(){
				var citytoken = window.localStorage.getItem('date');
				if(citytoken == undefined || citytoken == ""){
					this.citytokens = true;
				}else{
					this.citytokens = false;
				}
			},
			resetkeyword(){
				this.keyword = '';
			},
			godetail(index){
				this.$router.push('/carDetail');
				window.localStorage.setItem('carid',index);
			},
			getCityList(){
				this.$store.dispatch('noLoginCity/getNoLoginCity').then(()=>{
					if(this.$store.state.noLoginCity.code == 200){
						this.citylist = this.$store.state.noLoginCity.data;
					}else{
						this.$toast({
							message:this.$store.state.noLoginCity.msg,
						})
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			},
			changecitylistshow(){
				this.citylistshow = !this.citylistshow;
			},
			tabcity(index){
				this.cityid = index;
				window.localStorage.setItem('cityid',this.cityid);
				this.cityname = this.citylist[index].title;
				this.citylistshow = false;
				this.changcitydata();
			},
			changcitydata(){
				this.$store.dispatch('changeCityData/getChangeCityData',this.cityid).then(()=>{
					if(this.$store.state.changeCityData.code == 200){
						this.car = this.$store.state.changeCityData.car;
					}else{
						this.$toast({
							message:this.$store.state.changeCityData.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			},
			goSrc(str){
				this.$router.push(str);
			}
		}
	}
</script>

<style scoped lang="less">
	#index{
		width: 100%;
		overflow-x: hidden;
	}
	.top{
		position: relative;
		background: #262626;
		width: 100%;
		height: 1.2rem;
		display: flex;
		justify-content: space-around;
		font-size: 0.4rem;
		color: #E6CC7E;
		line-height: 1.2rem;
		.city{
			position: relative;
			ul{
				position: absolute;
				left: -0.4rem;
				z-index: 1000;
				background: #1a1a1a;
				width: 1.5rem;
				text-align: center;
			}
		}
		.search{
			width: 7.28rem;
			height: 0.85rem;
			background-color: #333333;
			border-radius: 0.43rem;
			margin-top: .2rem;
			padding:0 .27rem;
			display: flex;
			align-items: center;
		}
		.search img{
			width: .37rem;
			height: .37rem;
		}
		.search form{
			display: flex;
			align-items: center;
		}
		.search form input{
			background-color: #333;
			border: none;
			outline: none;
			width: 6rem;
			color: #666;
			padding-left:0.2rem;
			font-size:.37rem;
			color:#666;
		}
		::-webkit-input-placeholder { /* WebKit, Blink, Edge */
			font-size:.37rem;
			color:#666;
		}
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			font-size:.37rem;
			color:#666;
		}
		::-moz-placeholder { /* Mozilla Firefox 19+ */
			font-size:.37rem;
			color:#666;
		}
		:-ms-input-placeholder { /* Internet Explorer 10-11 */
			font-size:.37rem;
			color:#666;
		}
		.message{
			img{
				width: 0.66rem;
				height: 0.70rem;
			}
		}
	}
	.maquee{
		position: relative;
		width: 100%;
		height: 1rem;
		background: #262626;
		padding-left: 0.4rem;
    	padding-right: 0.4rem;
	}
	/* 2:轮播图 */
	.w100{ width:100%; position: relative; margin-bottom: 0.2rem;
	background: #262626; padding-bottom: 2rem;}
    .swiper-container {
	    width: 100%;
	    height: 5.67rem;
	    overflow: visible!important;
	   
	}
	.swiper-container .swiper-wrapper .swiper-slide{ width: 8.4rem;}
	.swiper-container .swiper-wrapper .swiper-slide img{width: 100%; height: 4.67rem;}
	.swiper-container .swiper-wrapper .swiper-slide-prev{ margin-top: 0.46rem; height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-prev img{ height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-next{ margin-top: 0.46rem; height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-next img{ height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-active{ width: 8.4rem;}
    .swipe-wrapper{
        width: 100%;
        height: 4.67rem;
    }
    .swipe-wrapper{ height: 4.67rem; }
    .swipe-wrapper img{
        width:100%;
        height:100%;
        border-radius: 0.13rem;
    }
    .mint-swipe-item.swip-item-1.item{
        padding:0 0.2rem;
    }
    .dh{
    	width: 9.2rem;
		height: 2.13rem;
		background-color: #1a1a1a;
		box-shadow: 0rem 0.08rem 0.26rem 0.01rem 
			rgba(0, 0, 0, 0.4);
		border-radius: 0.13rem;
		margin: 0 auto;
		margin-top:-1rem ;
		position: relative;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		padding: 0.27rem;
		.xc{
			width: 4.21rem;
			display:flex;
			background:#262626;
			box-shadow: 0rem 0.08rem 0.26rem 0.01rem 
		rgba(0, 0, 0, 0.4);
			border-radius: 0.27rem;
			justify-content:space-around;
			padding:0.16rem;
			img{
				width: 1.2rem;
				height: 1.2rem;
			}
			p{
				line-height: 1.2rem;
				color: #E6CC7E;
				font-size: 0.53rem;
			}
		}
		
    }
    .tuijian{
    	background: url(../../../static/img/tjbg.png) no-repeat;
    	width: 3.61rem;
    	height: 1.1rem;
    	margin: 0 auto;
    	background-size: cover;
    	text-align: center;
    	color: #E6CC7E;
    	margin-top: 0.3rem;
    	font-size: 0.43rem;
    	line-height: 1.1rem;
    }
    .proList{
    	width: 9.2rem;
    	margin: 0 auto;
    	height: 100%;
    	padding-bottom: 1rem;
    	li{
    		padding-top:0.5rem;
    		padding-bottom:0.5rem;
    		.ltop{
    			width: 9.2rem;
				height: 5.07rem;
				background-color: #e6cc7e;
				box-shadow: 0rem 0.05rem 0.26rem 0.01rem 
					rgba(0, 0, 0, 0.4);
				border-radius: 0.13rem;
				img{
					width: 100%;
					height: 100%;
					border-radius: 0.13rem;
				}
    		}
    		.lbottom{
    			width: 8.67rem;
				background-color: #262626;
				box-shadow: 0rem 0.08rem 0.26rem 0.01rem 
					rgba(0, 0, 0, 0.4);
				border-radius: 0rem 0rem 0.13rem 0.13rem;
				margin: 0 auto;
				padding: 0.4rem;
				.price{
					display:flex;
					justify-content: space-between;
					font-size:0.32rem;
					.mprice{
						color: #E6CC7E;
						span{
							font-size:0.48rem;
							margin-right: 0.2rem;
						}
					}
					.nprice{
						color:#666;
						text-decoration: line-through;
					}
				}
				p{
					padding-top: 0.27rem;
					color: #666;
					font-size: 0.35rem;
				}
    		}
    	}
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
</style>