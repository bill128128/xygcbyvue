<template>
	<div id="carDetail">
		<top :message='title' :notes='notes'></top>
		<div class="mySwiper w100">
            <div class="swipe-wrapper ">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in banner" :key='index'>
                            <img :src="item" alt=""/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                
            </div>
            <div class="detail">
        	<div class="price">
				<div class="mprice"><span>{{detail.shop_int}}</span>积分/会员价</div>
				<div class="nprice">{{detail.olshop_int}}积分/原价</div>
			</div>
			<p>{{detail.title}}</p>
        </div>
        </div>
        
        <div class="xq">
        	商品详情
        </div>
        <div class="imglist" v-html="contents">
        	{{contents}}
        </div>
        <div class="fd">
        	<div class="ftop" @click="showPayCover"><img src="../../../static/img/gc.png"></div>
        	<div class="fbottom" @click="help"><img src="../../../static/img/zx.png"></div>
        </div>

	</div>
</template>

<script>
	import Swiper from 'swiper'
	import top from '../common/top'
	export default{
		name:'carDetail',
		components:{
			top,
		},
		data(){
			return{
				title:'详情',
				notes:'购车流程',
				id:1,
				detail:{},
				banner:[],
				contents:'',
				isActive:false,
				msgLength:0,
                msg:'',
                payCoverShow:false,
				memberid:0,
				
			}
		},
		methods:{
			help(){
            	window.location.href='http://p.qiao.baidu.com/cps/chat?siteId=13446132&userId=27951961';
            },
			changejf(){
				this.isActive = !this.isActive;
			},
			golist(){
				this.$router.push('/buyCarPath');
			},
			goSrc(str){
				this.$router.push(str);
			},
			showPayCover(){
        		this.$router.push({name:'orderConfirm',params:{id:this.id}});
        	},
        	

//			buycar(){
//				this.memberid = window.localStorage.getItem('memberid');
//				this.$store.dispatch('buycar/buycar',[this.memberid,this.id,this.msg]).then(()=>{
//					if(this.$store.state.buycar.code==200){
//						this.$toast({
//							message:this.$store.state.buycar.msg
//						})
//					}else{
//						this.$toast({
//							message:this.$store.state.buycar.msg
//						})
//					}
//				}).catch((e) => {              
//	                //console.log(e);
//	            });
//			}
		},
		
		created(){
			this.id = window.localStorage.getItem('carid');
			this.$store.dispatch('carDetail/getdetail',this.id).then(()=>{       		
        		if(this.$store.state.carDetail.code==200){
        			this.detail = this.$store.state.carDetail.data;
        			this.banner = this.$store.state.carDetail.data.cover_map;
        			this.contents = this.$store.state.carDetail.data.contents;
        			this.$nextTick(function(){
        				var mySwiper = new Swiper ('.swiper-container', {
						    loop : true,
							effect: 'coverflow',
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							coverflowEffect: {
								rotate: 0,// 旋转的角度
								stretch: 0,// 拉伸   图片间左右的间距和密集度
								depth: 60,// 深度   切换图片间上下的间距和密集度
								modifier: 3,// 修正值 该值越大前面的效果越明显
								slideShadows : false// 页面阴影效果
							},
						    // 如果需要分页器
						    pagination: {
						        el: '.swiper-pagination',
						        							        
						    },							    
						});							
            		});
            		
				}else{
					this.$toast({
						message:this.$store.state.carDetail.msg,
					});
				}
			}).catch((e) => {              
                //console.log(e);
            });
		},
	}
</script>

<style scoped>

	#carDetail{
		width: 10rem;
		min-height: 18rem;
		overflow-x:hidden ;
	}
	.fd{
    	width: 2.21rem;
		height: 1.2rem;
		background-color: #262626;
		border-radius: 0.13rem;
		position: fixed;
		bottom: 0.2rem;
		left: 0.1rem;
		opacity: 0.7;
		display: flex;
		
		
    }
    .fd .ftop{
			padding: 0.2rem;
			border-right: 1px solid #1a1a1a;
		}
	.fd .fbottom{
		padding: 0.2rem;
	}
	.xq{
		position: relative;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		top: 2rem;
		color: #E6CC7E;
		font-size: 0.47rem;
		margin-bottom: 0.5rem;
	}
	.imglist{
		position: relative;
		top: 2rem;
		width: 9.2rem;
		margin: 0 auto;
		padding-bottom: 2rem;
	}
	.imglist img {
		margin-bottom: 0.3rem !important;
		border-radius: 0.13rem;
	}
	.detail{
		position: absolute;
		left: 0.4rem;
		top: 6.4rem;
		background: #fff;
		width: 8.67rem;
		height: 1.87rem;
		border-radius: 0rem 0rem 0.13rem 0.13rem;
		margin: 0 auto;
		padding: 0.4rem;
	}
	.detail .price{
		display:flex;
		justify-content: space-between;
		font-size:0.32rem;
	}
	.detail .price .mprice{
		color: #E6CC7E;
	}
	.detail .price .mprice span{
		font-size:0.48rem;
		margin-right: 0.2rem;
	}
	.detail .price .nprice{
		color:#666;
		text-decoration: line-through;
	}
	.detail .price p{
		padding-top: 0.27rem;
		color: #666;
		font-size: 0.35rem;
	}
	/* 2:轮播图 */
	.w100{ top: 1.4rem; width:9.2rem; position: relative; margin-bottom: 0.2rem; margin: 0 auto; padding-bottom: 2rem; height: 8.43rem; background: #fff; border-radius: 0.13rem; overflow: hidden;}
     .swiper-container {
	    width: 9.2rem;
	    height: 5.67rem;
	    overflow: visible!important;
	    padding-top: 0.2rem;
	    	   
	}
    
    .swiper-slide {
		border-radius: 0.13rem;
		background-position: center;
		background-size: 130% 120%;
		width: 95%;
    }
    .swiper-slide img{.
    		display: block;
        	width: 100%;
        	height: 100%;
        	border-radius: 0.13rem;
    }

    /*.swipe-wrapper{
        width: 100%;
        height: 4.67rem;
    }
    .swipe-wrapper{ height: 4.67rem; }
    .swipe-wrapper img{
        width:100%;
        height:100%;
    }
    .mint-swipe-item.swip-item-1.item{
        padding:0 0.2rem;
    }*/
   .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -28px;
    left: 0;
    width: 100%;
    background: #fff !important;
}	

   .w100 >>> .swiper-pagination-bullet{
	   	width: 0.43rem;
		height: 0.43rem;
		background-color: #FFBF00;
		box-shadow: 0rem 0.03rem 0.24rem 0.03rem 
			rgba(255, 191, 0, 0.7);
		border-radius: 50%;
		transform: scale(0deg);
   }
	.w100 >>> .swiper-pagination-bullet-active{
   		width: 0.43rem;
		height: 0.43rem;
		background: url();
		background-color: #0066cc;
		
		box-shadow: 0rem 0.03rem 0.24rem 0.03rem 
			rgba(0, 127, 255, 0.6);
		border-radius: 50%;
		transform: scale(0deg) !important;
		margin-bottom: 0px !important;
   }
</style>