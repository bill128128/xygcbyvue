<template>
	<div id="liftcar">
		<top :message='title'></top>
		<div class="liftcar">
			<div class="mySwiper w100" v-for="(item,index) in arrDataList">
	            <div class="swipe-wrapper">
	                <div class="swiper-container">
	                    <div class="swiper-wrapper">
	                        <div class="swiper-slide" v-for="(imgitem,index) in item.os_cover" :key='index'>
	                            <img :src="imgitem" alt=""/>
	                        </div>
	                    </div>
	                    <div class="swiper-pagination"></div>
	                </div>
	                
	            </div>
	            <!--<ul class="lunbo">
	            	<li><img src="../../../build/logo.png"></li>
	            	<li><img src="../../../build/logo.png"></li>
	            	<li><img src="../../../build/logo.png"></li>
	            </ul>-->
	            <div class="detail">
	            	<div class="tx"><img :src="item.member_avatar"></div>
		        	<div class="price">
						{{item.memberTitle}}<br/>
						{{item.title}}
					</div>
		        </div> 
	        </div>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	import Swiper from 'swiper'
	export default{
		name:'liftcar',
		components:{
			top
		},
//		mounted(){
//			var swiper = new Swiper('.swiper-container', {
//		      direction: 'vertical',
//		      pagination: {
//		        el: '.swiper-pagination',
//		        clickable: true,
//		      },
//		    });
//		},
		data(){
			return{
				title:'已提车',
				arrDataList:[],
//				 swiperOption: {
//		          // spaceBetween: 30, //板块间距
//		          loop: true, //无缝轮播
//		          centeredSlides: true,
////		          autoplay: {  //自动轮播
////		            delay: 3000,
////		            disableOnInteraction: false,
////		          },
//		          pagination: {
//		            el: '.swiper-pagination',
//		            clickable: true,
//		            paginationClickable: false,
//		            paginationType: 'custom',
//		          }
//		        }
			}
		},
		created(){		
        	//页面加载完毕调用接口函数
        	this.$store.dispatch('liftcar/getLiftcar',1).then(()=>{       		
        		if(this.$store.state.liftcar.code==200){
        			this.arrDataList = this.$store.state.liftcar.data;
        			this.$nextTick(function(){
        				var mySwiper = new Swiper ('.swiper-container', {
        					
						    loop : true,
							effect: 'coverflow',
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							coverflowEffect: {
								rotate: 0,// 旋转的角度
								stretch: 80,// 拉伸   图片间左右的间距和密集度
								depth: 80,// 深度   切换图片间上下的间距和密集度
								modifier: 3,// 修正值 该值越大前面的效果越明显
								slideShadows : false// 页面阴影效果
							}
						    // 如果需要分页器
//						    pagination: {
//						        el: '.swiper-pagination',
//						        							        
//						    },							    
						});							
            		});
            		
				}else{
					this.$toast({
						message:this.$store.state.liftcar.msg,
					});
				}
			}).catch((e) => {              
                //console.log(e);
            });
            
        },
	}
</script>

<style scoped>
	/*.lunbo{
		width: 9.2rem;
		height: 6rem;
		position: absolute;
	}
	.lunbo li{
		position: absolute;
		width: 9.2rem;
		height: 5.33rem;
		background-color: #000000;
		box-shadow: 0rem 0.08rem 0.25rem 0.02rem 
			rgba(0, 0, 0, 0.8);
		border-radius: 0.13rem;
	}
	.lunbo li img{
		width: 100%;
		height: 100%;
		border-radius:0.13rem ;
	}
	.lunbo li:nth-child(1){
		transform: translateY(-1.8rem) scale(0.8);
	}
	.lunbo li:nth-child(2){
		transform: translateY(-1.4rem) scale(0.8);
	}
	.lunbo li:nth-child(3){
		
	}*/
	#liftcar{
		min-height: 18rem;
	}
	.liftcar{
		width: 9.2rem;
		position: relative;
		top: 1.6rem;
		margin: 0 auto;
		height: auto;
	}
	.detail{
		position: absolute;
		left: 0.4rem;
		top: 4rem;
		width: 8.67rem;
		height: 1.87rem;
		border-radius: 0rem 0rem 0.13rem 0.13rem;
		margin: 0 auto;
		padding: 0.4rem;
		display: flex;
		z-index: 100;
	}
	.detail .tx{
		width: 0.64rem;
		height: 0.64rem;
		background-color: #ffffff;
		border: solid 0.03rem #e6cc7e;
		border-radius: 50%;
		margin-right: 0.2rem;
		margin-top: 0.2rem;
	}
	.detail .tx img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.detail .price{
		display:flex;
		justify-content: space-between;
		font-size:0.32rem;
		color: #e6cc7e;
		line-height: 0.5rem;
	}
	
	.w100{ width:9.2rem; position: relative; margin-bottom: 0.5rem; margin: 0 auto; margin-bottom: 0.5rem; height: 6rem; background: #1a1a1a; border-radius: 0.13rem; opacity: 0.7; overflow: hidden;}
    .swiper-container {
	    width: 9.2rem;
	    height: 5.67rem;
	    overflow: visible !important;
	    	   
	}
    
    .swiper-slide {
		border-radius: 0.13rem;
		background-position: center;
		background-size: 130% 120%;
		width: 90%;
    }
    .swiper-slide img{.
    		display: block;
        	width: 100%;
        	height: 100%;
        	border-radius: 0.13rem;
    }


</style>