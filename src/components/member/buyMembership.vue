<template>
	<div id="buyMembership">
		<top :message='title'></top>
		<div class="container">
			<!--<div class="mySwiper w100">
            <div class="swipe-wrapper ">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <component is="content1"></component>
                        </div>
                        <div class="swiper-slide">
                            <component is="content2"></component>
                        </div>
                        <div class="swiper-slide">
                            <component is="content3"></component>
                        </div>
                        <div class="swiper-slide">
                            <component is="content4"></component>
                        </div>
                    </div>
                    
                </div>
               </div>
            </div>-->
			<v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div">
	        	<keep-alive> 
	                <component v-bind:is="textBoxActiveView" :content="content"></component>
	            </keep-alive>
	        </v-touch>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import top from '../common/top'
	import content1 from './buyGoldMembership'
    import content2 from './buyZsMembership'
    import content3 from './buyjzMembership'
    import content4 from './buycjMembership'
    //import VueTouch from 'vue-touch'
	export default{
		name:'buyMembership',
		data(){
			return{
				title:'开通会员',
				contentActive:false,
                textBoxActiveView:'content1', //内容默认加载第一个
                activeIndex:1,                //默认激活第一个
                content:[],   //获取的内容 - 图片内容标题等
                memberid:0,
			}
		},
		components:{
			top,content1,content2,content3,content4
		},
		created(){		
        	setTimeout(() => {   //内容加动态样式
                this.contentActive = true ;
            },500);
            this.getContent();
        },
		methods:{
			onSwipeLeft(){            //左滑动
                if(this.activeIndex < 4){
                    this.activeIndex += 1 ;
                    this.tabContentTitle(this.activeIndex);
                }else{
                    this.activeIndex = 1 ;
                    this.tabContentTitle(this.activeIndex);
                }
                
            },
            onSwipeRight(){           //右滑动
                if(this.activeIndex > 1){
                    this.activeIndex -= 1 ;
                    this.tabContentTitle(this.activeIndex);
                }else{
                    this.activeIndex = 4 ;
                    this.tabContentTitle(this.activeIndex);
                }
            },
            tabContentTitle(index){
                this.textBoxActiveView = 'content' + index ;
            },
            getContent(){            //获取内容
            	this.memberid = window.localStorage.getItem('memberid');
                this.$store.dispatch('buymembership/getMemberList',this.memberid).then(() => {
					if(this.$store.state.buymembership.code==200){
                        this.content = this.$store.state.buymembership.data;
//                      this.$nextTick(function(){
//      				var mySwiper = new Swiper ('.swiper-container', {
//						    loop : true,
//							effect: 'coverflow',
//							grabCursor: true,
//							centeredSlides: true,
//							slidesPerView: 'auto',
//							coverflowEffect: {
//								rotate: 0,// 旋转的角度
//								stretch: 30,// 拉伸   图片间左右的间距和密集度
//								depth: 30,// 深度   切换图片间上下的间距和密集度
//								modifier: 3,// 修正值 该值越大前面的效果越明显
//								slideShadows : false// 页面阴影效果
//							},
//						    // 如果需要分页器
//						    pagination: {
//						        el: '.swiper-pagination',
//						        							        
//						    },							    
//						});							
//          		});
					}
					else if(this.$store.state.buymembership.code == 40000){
						this.$toast({
							message:'您还没有登录！'
						})
		                		window.localStorage.removeItem('date');	
		           				this.$router.push('/login');
						
					}
					else{
						this.$toast({
							message:this.$store.state.buymembership.msg,
						});
					}					          
				}).catch((e) => {              
					this.$toast({
						message:'您还没有登录！'
					})
            		window.localStorage.removeItem('date');	
       				this.$router.push('/login');
				})
            }
		},
		
	}
</script>

<style scoped>
	#buyMembership{
		min-height: 18rem;
		overflow-y: scroll;
	}
	.container{
		position: relative;
		top: 1.4rem;
		width: 9.2rem;
		height: 17.43rem;
		overflow: auto;
		margin: 0 auto;
		
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