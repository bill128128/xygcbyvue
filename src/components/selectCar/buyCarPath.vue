<template>
	<div id="buyCarPath">
		<top :message='title'></top>
		<div class="mySwiper w100">
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
            
        </div>
        <!--<v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div">
			<transition name="fade" :enter-active-class="fin"  :leave-active-class="fout" :duration="200">
			    <component :is="view"></component>
			</transition>
		</v-touch>-->
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import top from '../common/top'
	import content1 from './path/cwhy'
	import content2 from './path/gmjf'
	import content3 from './path/phgc'
	import content4 from './path/tchj'
	import VueTouch from 'vue-touch'
	export default{
		name:'buyCarPath',
		components:{
			top,content1,content2,content3,content4
		},
		data(){
			return{
				title:'购车流程',
				index: 1, //显示的组件索引
				view: "content1",
				fin:'',
				fout:'',
			}
		},
		created(){		
        	setTimeout(() => {   //内容加动态样式
                this.contentActive = true ;
            },500);
            this.getContent();
        },
        methods:{
        	onSwipeLeft(){
		  		if(this.index<4){
		    		this.index = (this.index)+1;
		    		this.view = "content" + this.index;
		    		
		    	}else{
		    		this.index = 1;
		    		this.view = "content" + this.index;
		    	}
		    	this.fin = 'animated fadeInRight';
		    	this.fout = 'animated fadeOutLeft';
		  	},
		  	onSwipeRight(){
		  		if(this.index>1){
		    		this.index = (this.index)-1;
		    		this.view = "content" + this.index;
		    		
		    	}else{
		    		this.index = 4;
		    		this.view = "content" + this.index;
		    	}
		    	this.fin = 'animated fadeInLeft';
		    	this.fout = 'animated fadeOutRight';
		  	},
            getContent(){            //获取内容
                this.$store.dispatch('buyCarPath/getBuyCarPath').then(() => {
					if(this.$store.state.buyCarPath.code==200){
                        this.content = this.$store.state.buyCarPath.data;
                        this.$nextTick(function(){
        				var mySwiper = new Swiper ('.swiper-container', {
						    loop : true,
							effect: 'coverflow',
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							coverflowEffect: {
								rotate: 0,// 旋转的角度
								stretch: 30,// 拉伸   图片间左右的间距和密集度
								depth: 30,// 深度   切换图片间上下的间距和密集度
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
							message:this.$store.state.buyCarPath.msg,
						});
					}					          
				}).catch((e) => {              
					alert(输入错误);
				})
            }
        }
	}
</script>

<style scoped>
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
   #buyCarPath{
   		width:100%;
        min-height:100vh;
        position: relative;
        top:1.4rem;
   }
</style>