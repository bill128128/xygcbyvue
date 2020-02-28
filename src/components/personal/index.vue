<template>
	<div id="index">
		<div class="part1">
			<div class="top">
				<img src="../../../static/img/left.png" class="back" @click="goback">
				<img src="../../../static/img/fx.png" class="xj" @click="goSrc('/addpartener')">
					
			</div>
			<div class=" tx" @change="uploadPhoto($event)">				
				<label>
                    
                    <img :src="user.avatar" alt="" class='thumbnail'>
                    <input type="file" accept="image/*" id="filepicker" hidden multiple> 
                </label>
			</div>
			<div class="title">{{user.username}}</div>
			<div class="phone">{{user.mobile}}</div>
		</div>
		<div class="tjm">
			推荐码：<p>{{user.number}}</p>
		</div>
		<div class="level">
			<ul class="ltop">
				<li v-for="(item,index) in directors" :key="index">
					<img :src="item.avatar">
					<p>{{item.title}}</p>
				</li>
				<!--<div class="zs">
					<img src="../../../static/img/zs.png">
					<p>钻石会员</p>
				</div>-->
			</ul>
			<div class="lbottom">
				<p>我的积分</p>
				<p><span>{{user.shop_int}}</span>积分</p>
			</div>
		</div>
		<ul class="part4">
			<li @click="goSrc('/myOrder')">
				<img src="../../../static/img/dd.png">
				<p>购车订单</p>
			</li>
			<li @click="goSrc('/myPartener')">
				<img src="../../../static/img/hb.png">
				<p>我的伙伴</p>
			</li>
			<li @click="help">
				<img src="../../../static/img/kf.png">
				<p>我的客服</p>
			</li>
			<li @click="goSrc('/modifypassword')">
				<img src="../../../static/img/mm.png">
				<p>我的密码</p>
			</li>
		</ul>
		<div class="quit" @click="quit">退出登录</div>
		<mt-actionsheet :actions="data" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Actionsheet } from 'mint-ui';
	export default{
		name:'index',
		data(){
			return{
				data: [
					{
				        name: '拍照',
				        method : this.getImage	// 调用methods中的函数
				    }, 
					{
				        name: '从相册中选择', 
				        method : this.galleryImgs	// 调用methods中的函数
				    }
				],
				sheetVisible:false,
				videoImageData:[],
            	messages:"",
            	memberid:0,
            	directors:[],
            	user:{},
	            //haveImg:false,//照片是否上传成功
	            imgUrl:'',
	            info:{
	            	submit:'',
	            	memberid:0,
	            },
	            timer1:{},
	            
			}
		},
		created(){
			this.getinfo();
			this.info.memberid = window.localStorage.getItem('memberid');
		},
		methods:{
			help(){
            	window.location.href='http://p.qiao.baidu.com/cps/chat?siteId=13446132&userId=27951961';
            },
			uploadPhoto(e){
	            var me = this ;
	            var file = document.getElementById("filepicker").files[0];
	            var reader = new FileReader() ;  //本地预览
	            reader.readAsDataURL(file) ;  //base64;
	            reader.onload = function(){
	                me.info.submit = reader.result ;
	                me.imgUrl = window.URL.createObjectURL(file) ;
	                me.haveImg = true ;
	            }
	            setTimeout(()=>{
	            	this.submitInfo();
	            },2000)
	            
	        },
	        submitInfo(){
	            // console.log('提交',this.submit)
	            if(this.info.submit == "" || this.haveImg == false){
	                this.$toast({message:'请您上传一张头像图片'})
	                return false ;
	            }else{
	                this.$store.dispatch('uploadhead/upload',this.info).then(()=>{
	                    let backCode = this.$store.state.uploadhead.code ;
	                    let backMsg = this.$store.state.uploadhead.msg ;
	                    // Indicator.open({
	                    //     text: '加载中...',
	                    //     spinnerType: 'fading-circle'
	                    // })
	                    if(backCode == 200){
	                        this.$toast({message:backMsg})
	                        setTimeout(() => {
	                            this.$router.push('/personal')
	                        },1000);
	                        this.getinfo();
	                    }else{
	                        this.$toast({message:backMsg})
	                    }
	                }).catch((e)=>{
	                    console.log(e);
	                })
	            }
	        },
			goback(){
				this.$router.go(-1);
			},
			goSrc(src){
				this.$router.push(src);
			},
			getinfo(){
				this.memberid = window.localStorage.getItem('memberid');
				this.$store.dispatch('personal/getinfo',this.memberid).then(()=>{
					if(this.$store.state.personal.code == 200){
						this.user = this.$store.state.personal.user;
						this.directors = this.$store.state.personal.directors;
					}else if(this.$store.state.personal.code == 40000){
						window.localStorage.removeItem('date');
						this.$router.push('/login');
					}
					else{
						this.$toast({
							message:this.$store.state.personal.msg,
						});
					}
				}).catch((e) => {
					this.$toast({
						message:'您还没有登录！'
					})
	                this.timer1 = setInterval(()=>{
                		window.localStorage.removeItem('date');	
           				this.$router.push('/login');
           			},2000)
	            });
			},
			quit(){  //退出登录
    			MessageBox.confirm('',{
				  title: '确定退出登录吗',
				  message: '　　　　　　',
				  showCancelButton: true
				}).then(action=>{
					if(action=='confirm'){
//						this.cancle();
						window.localStorage.removeItem('date');
						this.$router.push('/login');
					}
				}).catch(err=>{
					
					}
				);
           },
           showsheet(){
           	this.sheetVisible = !this.sheetVisible;
           },
           getImage() {  
	           var _this=this;
	           var cmr = plus.camera.getCamera();  
	           cmr.captureImage(function(p) {  
	               plus.io.resolveLocalFileSystemURL(p, function(entry) {  
	                   _this.compressImage(entry.toLocalURL(),entry.name);  
	               }, function(e) {  
	                   plus.nativeUI.toast("读取拍照文件错误：" + e.message);  
	               });  
	           }, function(e) {  
	           }, {  
	               filter: 'image' 
	           });  
	       },
	       galleryImgs(){   
		        var _this = this;
		        plus.gallery.pick(function(event) {
		        var files = event.files;
		            for(var i=0;i<files.length;++i){
		              var file = files[i];
		                plus.io.resolveLocalFileSystemURL(file,function(entry){
		                   _this.showPics(entry.fullPath);
		            });
		          }
		        }, function(e) {
		        }, {
		          filter: "image",
		          multiple:true,
		          maximum:"8",
		          onmaxed:function(){
		              alert("最多选择8张图片")
		            //   _this.toast("最多选择8张图片");
		          }
		        });
		    },
		},
		watch:{
	        'videoImageData':function(){
	            return this.videoImageData;
	        }
	    },
	     beforeDestroy(){
			 clearInterval(this.timer1);
		}
	    
	}
</script>

<style scoped lang="less">
	#index{
		width: 10rem;
		overflow-x: hidden;
	}
	.part1{
		background: url(../../../static/img/presonbg.png) no-repeat;
		background-size: cover;
		width: 100%;
		height: 8rem;
		.top{
			width: 100%;
			height: 1.2rem;
			padding: 0.4rem;
			display: flex;
			justify-content: space-between;
			color:#E6CC7E;
			font-size:0.43rem;
			.back{
				width: 0.27rem;
				height: 0.48rem;
			}
			.xj{
				width: 0.58rem;
				height: 0.58rem;
			}
		}
		.tx{
			width: 2.67rem;
			height: 2.67rem;
			background-color: #f4f4f4;
			border: solid 0.05rem #e5cc7e;
			border-radius: 50%;
			margin: 0 auto;
			.add{
				width: 2.67rem;
				height: 2.67rem;
				border-radius: 50%;
			}
			img{
				border-radius: 50%;
				width: 100%;
				height: 100%;
				border: 0;
			}
		}
		.title{
			text-align: center;
			height: 1.5rem;
			font-size: 0.53rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 0.4rem;
			letter-spacing: 0rem;
			color: #e6cc7e;
			margin: 0 auto;
			padding-bottom: 0.32rem;
			padding-top: 0.53rem;
		}
		.phone{
			text-align: center;
			height: 0.33rem;
			font-size: 0.43rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 0.4rem;
			letter-spacing: 0.01rem;
			color: #e6cc7e;
			margin: 0 auto;
		}
	}
	.tjm{
		width: 8.4rem;
		height: 1.87rem;
		background:url(../../../static/img/tjm.png) no-repeat;
		background-size: cover;
		box-shadow: 0rem 0.08rem 0.25rem 0.02rem 
			rgba(0, 0, 0, 0.8);
		border-radius: 0.13rem;
		margin: 0 auto;
		margin-top: -1rem;
		padding: 0.6rem 0.8rem;
		display: flex;
		justify-content: space-between;
		color: #262626;
		font-size: 0.48rem;
		margin-bottom: 0.47rem;
		p{
			font-size: 0.5rem;
			line-height: 1rem;
			margin-top: -0.2rem;
		}
	}
	.level{
		width: 9.2rem;
		margin: 0 auto;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
		padding: 0.53rem 0.4rem;
		margin-bottom: 0.35rem;
		.ltop{
			display: flex;
			justify-content: space-around;
			li{
				img{
					width: 1.75rem;
					height: 1.75rem;
				}
				p{
					text-align: center;
					color: #E6CC7E;
					font-size: 0.43rem;
					padding-top: 0.2rem;
				}
			}
			
		}
		.lbottom{
			width: 8.4rem;
			height: 2rem;
			background:url(../../../static/img/jf.png) no-repeat;
			background-size: cover;
			border-radius: 0.13rem;
			margin-top: 0.4rem;
			font-size: 0.43rem;
			color: #E6CC7E;
			padding-top: 0.25rem;
			p{
				text-align: center;
				padding-bottom: 0.1rem;
				span{
					font-size: 0.64rem;
				}
			}
		}
	}
	.part4{
		width: 9.2rem;
		height: 3.2rem;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		
		color: #fff;
		font-size: 0.32rem;
		margin-bottom: 1.5rem;
		li{
			text-align:center;
			img{
				width: 1.89rem;
				height: 1.89rem;
			}
		}
		
	}
	.quit{
		width: 5.33rem;
		height: 1.07rem;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
		margin: 0 auto;
		font-size: 0.48rem;
		color: #e6cc7e;
		line-height: 1.07rem;
		text-align:  center;
		margin-bottom: 1.5rem;
	}
</style>