<template>
	<div id="selectCar">
		<div class="top">
			<img src="../../assets/left.png" class="back" @click="goback">
			<div class="search">
				<img src="../../../static/img/search.png" />
				<form  @submit.prevent action="#">
					<input type="search" placeholder="搜索汽车" v-model="info.keyword" @keypress="getcarlist" />
				</form>
				<img @click="resetkeyword" src="../../../static/img/cb.png">
			</div>
			<div class="pinpai" @click="goSrc('brand')">品牌</div>
		</div>
		<div class="check">
			<div class="sort" @click="changesortshow">
				排序
				<div class="img"></div>
			</div>
			<div class="sort" @click="changepriceshow">价格<div class="img"></div></div>
			<div class="sort" @click="changechexingshow">车型<div class="img"></div></div>
			<div class="sx" @click="changesxshow">筛选
				<div class="img"></div>
			</div>
			<div class="searchlist" v-if="this.sortlistshow">
				<div class="searchsj"></div>
				<ul class="searchSort">
					<li @click="changeSort(item.sortindex)" v-for="(item,index) in  sortlist" :key='index' :class="item.sort? 'active':''">
						{{item.title}} 
						<img v-if="item.sortimg" src="../../../static/img/dh.png">
					</li>					
				</ul>
			</div>
			<div class="pricelist" v-if="this.pricelistshow">
				<div class="pricesj"></div>
				<ul class="priceSort">
					<li @click="changemember(item.id)" v-for="(item,index) in memberlist" :key="index">
						<span >{{item.title}}</span>
					</li>		
					<li @click="resetprice"><span>重置</span></li>
				</ul>
			</div>
			
			<div class="chexinglist" v-if="this.chexinglistshow">
				<div class="chexingsj"></div>
				<ul class="chexingSort">
					<li @click="changechengxing(item.id)" v-for="(item,index) in vehicle" :key="index">
						<span >{{item.title}}</span>
						
					</li>	
					<li @click="resetchexing"><span>重置</span></li>
					
				</ul>
			</div>
			
			<div class="sxlist" v-if="this.sxshow">
				<div class="sxsj"></div>
				<div class="sxsort">
					<div class="checkbox">
						<div class="title">变速箱</div>
						<ul class="checklist">
							<li v-for="(item,index) in bsx" :key='index' @click="changebsx(index)" :class="{active:changebsxcolor == index}">{{item.title}}</li>
						</ul>
					</div>
					<div class="checkbox">
						<div class="title">燃料</div>
						<ul class="checklist">
							<li v-for="(item,index) in ranliao" :key="index" @click="changerl(index)" :class="{active:changerlcolor == index}">{{item.title}}</li>
						</ul>
					</div>
					<div class="checkbox">
						<div class="title">排量</div>
						<ul class="checklist">
							<li v-for="(item,index) in pailiang" :key="index" @click="changepl(index)" :class="{active:changeplcolor == index}">{{item.title}}</li>
						</ul>
					</div>
					<div class="anniu">
						<div class="chongzhi" @click="resetcar">重置</div>
						<div class="queding" @click="doit">确定</div>
					</div>
				</div>
			</div>
		</div>
		<ul class="proList">
        	<li v-for="(item,index) in carlist" :key="index" @click="godetail(item.id)">
        		<div class="ltop">
        			<img :src="item.avatar">
        		</div>
        		<div class="lbottom">
        			<div class="price">
        				<div class="mprice"><span>{{item.shop_int}}</span>积分/会员价</div>
        				<div class="nprice">{{item.olshop_int}}积分/原价</div>
        			</div>
        			<p>{{item.title}}</p>
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
	export default{
		name:'selectCar',
		data(){
			return{
				sortlistshow:false,
				sortlist:[
					{
						sort:true,
						sortindex:1,
						sortimg:true,
						title:'从低级到高级'
					},
					{
						sort:false,
						sortindex:2,
						sortimg:false,
						title:'从高级到低级'
					},					
				],
				pricelistshow:false,
				chexinglistshow:false,
				sxshow:false,
				bsx:[],
				changebsxcolor: -1,
				changerlcolor: -1,
				changeplcolor: -1,
				memberlist:[],
				vehicle:[],
				ranliao:[],
				pailiang:[],
				info:{ //搜索参数
					cityid:0,
					keyword:'',
					sort:0,
					directorsId:0,
					brandId:0,
					vehicleId:0,
					gearboxId:0,
					displacementId:0,
					fuelsId:0,
					page:1,
				},
				carlist:[], //搜索结果
			}
		},
		methods:{
			resetkeyword(){
				this.info.keyword = '';
			},
			resetcar(){
				this.changebsxcolor = -1;
				this.changerlcolor = -1;
				this.changeplcolor = -1;
				this.info.gearboxId = 0;
				this.info.directorsId = 0;
				this.info.fuelsId = 0;
				this.getcarlist();
			},
			doit(){
				this.getcarlist();
				this.sortlistshow = false;
				this.pricelistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
			},
			godetail(index){
				this.$router.push('carDetail');
				window.localStorage.setItem('carid',index);
			},
			goSrc(str){
				this.$router.push(str);
			},
			resetprice(){
				this.info.directorsId=0;
				this.getcarlist();
				this.pricelistshow = false;
			},
			resetchexing(){
				this.info.vehicleId=0;
				this.getcarlist();
				this.chexinglistshow = false;
			},
			changechengxing(index){
				this.info.vehicleId = index;
				console.log(this.info.vehicleId);
				this.getcarlist();
				this.sortlistshow = false;
				this.pricelistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
			},
			changemember(index){
				this.info.directorsId = index;
				this.getcarlist();
				this.sortlistshow = false;
				this.pricelistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
			},
			changebsx(index){
				this.changebsxcolor = index;
				this.info.gearboxId = index+1;
			},
			changerl(index){
				this.changerlcolor = index;
				this.info.fuelsId = index+1;
			},
			changepl(index){
				this.changeplcolor = index;
				this.info.displacementId = index+1;
			},
			changeSort(index){
				for (var i=0; i<this.sortlist.length; i++) {
					this.sortlist[i].sort = ! this.sortlist[i].sort;
					this.sortlist[i].sortimg = ! this.sortlist[i].sortimg;					
				}
				this.info.sort = index;
				this.getcarlist();
				this.sortlistshow = false;
				this.pricelistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
				
			},
			changesortshow(){
				this.sortlistshow = !this.sortlistshow;
				this.pricelistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
			},
			changepriceshow(){
				this.pricelistshow = !this.pricelistshow;
				this.sortlistshow = false;
				this.chexinglistshow = false;
				this.sxshow = false;
			},
			changechexingshow(){
				this.chexinglistshow = !this.chexinglistshow;
				this.pricelistshow = false;
				this.sortlistshow = false;
				this.sxshow = false;
			},
			changesxshow(){
				this.sxshow = !this.sxshow;
				this.pricelistshow = false;
				this.sortlistshow = false;
				this.chexinglistshow = false;
			},
			selectMember(){
				this.$store.dispatch('selectMember/getSelectMember').then(()=>{
					if(this.$store.state.selectMember.code == 200){
						this.memberlist = this.$store.state.selectMember.data;
					}else{
						this.$toast({
							message:this.$store.state.selectMember.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			getSelectGearbox(){
				this.$store.dispatch('selectGearbox/getSelectGearbox',this.info.cityid).then(()=>{
					if(this.$store.state.selectGearbox.code == 200){
						this.bsx = this.$store.state.selectGearbox.data;
					}else{
						this.$toast({
							message:this.$store.state.selectGearbox.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			getSelectVehicle(){
				this.$store.dispatch('selectVehicle/getSelectVehicle',this.info.cityid).then(()=>{
					if(this.$store.state.selectVehicle.code == 200){
						this.vehicle = this.$store.state.selectVehicle.data;
					}else{
						this.$toast({
							message:this.$store.state.selectVehicle.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			getSelectFuel(){
				this.$store.dispatch('selectFuel/getSelectFuel',this.info.cityid).then(()=>{
					if(this.$store.state.selectFuel.code == 200){
						this.ranliao = this.$store.state.selectFuel.data;
					}else{
						this.$toast({
							message:this.$store.state.selectFuel.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			getSelectDisplacement(){
				this.$store.dispatch('selectDisplacement/getSelectDisplacement',this.info.cityid).then(()=>{
					if(this.$store.state.selectDisplacement.code == 200){
						this.pailiang = this.$store.state.selectDisplacement.data;
					}else{
						this.$toast({
							message:this.$store.state.selectDisplacement.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			goback:function(){
				this.$router.go(-1);
			},
			getcarlist(){
				this.$store.dispatch('selectCar/getCarlist',this.info).then(()=>{
					if(this.$store.state.selectCar.code == 200){
						this.carlist = this.$store.state.selectCar.data;
						//console.log(this.carlist);
						if(this.carlist.length == 0){
							this.$toast({
								message:'没有找到相关信息',
							})
						}
					}else{
						this.$toast({
							message:this.$store.state.selectCar.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
		},
		created(){			
			this.info.cityid = window.localStorage.getItem('cityid');
			this.info.keyword = this.$route.params.keyword;
			//console.log(this.info.keyword);
			this.info.sort=0;
			this.info.directorsId=0;
			this.info.vehicleId=0;
			this.info.gearboxId=0;
			this.info.displacementId=0;
			this.info.fuelsId=0;	
			this.info.brandId = this.$route.params.id;
			this.selectMember();
			this.getSelectGearbox();
			this.getSelectVehicle();
			this.getSelectFuel();
			this.getSelectDisplacement();
			this.getcarlist();
		},
		
	}
</script>

<style scoped lang="less">
	.top{
		display: flex;
		justify-content: space-around;
		height: 1rem;
		line-height: 0.85rem;
		width: 100%;
		.back{
			margin-top: 0.4rem;
			width: 0.27rem;
			height: 0.48rem;
		}
		.message{
			width: 0.66rem;
			height: 0.72rem;
			margin-top: 0.3rem;
		}
		.pinpai{
			font-size: 0.4rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 1.2rem;
			letter-spacing: -0.01rem;
			color: #e6cc7e;
		}
		.search{
			width: 6.45rem;
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
			width: 5.2rem;
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
	}
	.check{
		position: relative;
		width: 8.11rem;
		margin: 0 auto;
		height: 0.41rem;
		line-height: 0.41rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.4rem;
		margin-top: 0.4rem;
		font-size: 0.43rem;
		color:#ccc;
		.sort{
			display: flex;
			justify-content: space-between;
			&:hover,&:active,&:focus{
		          &{
		            outline: none;
		          }
		          &:before{
		            color: #E6CC7E;
		          }
		          color: #E6CC7E;
		        }
		        &:before{
		          position: absolute;
		          left: 0;
		          top: 0;
		          content: '';
		          width: 0px;
		          height: 100%;
		          color: #ccc;
		        }
			.img{
				margin-left: 0.15rem;
				margin-top: 0.15rem;
				width: 0.27rem;
				height: 0.15rem;
				background: url(../../../static/img/sj2.png) no-repeat;
				background-size: cover;
				&:hover,&:active,&:focus{
		          &{
		            outline: none;
		          }
		          &:before{
		            color: #E6CC7E;
		          }
		          background: url(../../../static/img/sj.png) no-repeat;
		          background-size: cover;
		        }
		        
			}
		}
		/*.mprice{
			display: flex;
			justify-content: space-between;
			img{
				margin-left: 0.15rem;
				margin-top: 0.15rem;
				width: 0.27rem;
				height: 0.15rem;
			}
		}
		.cx{
			display: flex;
			justify-content: space-between;
			img{
				margin-left: 0.15rem;
				margin-top: 0.15rem;
				width: 0.27rem;
				height: 0.15rem;
			}
		}*/
		.sx{
			display: flex;
			justify-content: space-between;
			&:hover,&:active,&:focus{
		          &{
		            outline: none;
		          }
		          &:before{
		            color: #E6CC7E;
		          }
		          color: #E6CC7E;
		        }
		        &:before{
		          position: absolute;
		          left: 0;
		          top: 0;
		          content: '';
		          width: 0px;
		          height: 100%;
		          color: #ccc;
		        }
			.img{
				margin-left: 0.15rem;
				margin-top: 0.1rem;
				width: 0.37rem;
				height: 0.37rem;
				background: url(../../../static/img/sx.png) no-repeat;
				background-size: cover;
				&:hover,&:active,&:focus{
		          &{
		            outline: none;
		          }
		          &:before{
		            color: #E6CC7E;
		          }
		          background: url(../../../static/img/sx2.png) no-repeat;
		          background-size: cover;
		        }
			}
		}
		.searchlist{
			position: absolute;
			top: 0.6rem;
			left: -0.55rem;
			width: 9.2rem;
			.searchsj{
				width:0;
			    height:0;
			    border-width:0 0.53rem 0.53rem;
			    border-style:solid;
			    border-color:transparent transparent #262626;/*透明 透明  灰*/
			    margin:0 auto;
			    position:absolute;
			    left:1.1rem
			}
			.searchSort{
				width: 9.2rem;
				height: 2.15rem;
				background-color: #262626;
				border-radius: 0.13rem;
				position: absolute;
				top: 0.53rem;
				padding: 0.2rem 0.4rem;
				li{
					display: flex;
					justify-content: space-between;
					height: 0.9rem;
					border-bottom: 1px solid #333;
					line-height: 0.8rem;
					color: #999;
					font-size: 0.32rem;
					img{
						width: 0.37rem;
						height: 0.27rem;
						margin-top: 0.2rem;
					}
				}
				li:last-child{
					border: none;
				}
				.active{
					color:#E6CC7E;
				}
			}
		}
		.pricelist{
			position: absolute;
			top: 0.6rem;
			left: -0.55rem;
			width: 9.2rem;
			.pricesj{
				width:0;
			    height:0;
			    border-width:0 0.53rem 0.53rem;
			    border-style:solid;
			    border-color:transparent transparent #262626;/*透明 透明  灰*/
			    margin:0 auto;
			    position:absolute;
			    left:3.4rem
			}
			.priceSort{
				width: 9.2rem;
				background-color: #262626;
				border-radius: 0.13rem;
				position: absolute;
				top: 0.53rem;
				padding: 0.2rem 0.4rem;
				li{
					
					height: 0.9rem;
					border-bottom: 1px solid #333;
					line-height: 0.8rem;
					color: #999;
					font-size: 0.32rem;
					&:hover,&:active,&:focus{
			          &{
			            outline: none;
			          }
			          &:before{
			            color: #E6CC7E;
			          }
			          color: #E6CC7E;
			          background: url(../../../static/img/dh.png) no-repeat right;
			        }
			        &:before{
			          position: absolute;
			          left: 0;
			          top: 0;
			          content: '';
			          width: 16px;
			          height: 100%;
			          color: #ccc;
			        }
					.img{
						width: 0.37rem;
						height: 0.27rem;
						margin-top: 0.2rem;
						/*background: url(../../../static/img/dh.png) no-repeat;*/
						/*background-size: cover;*/
						&:hover,&:active,&:focus{
				          &{
				            outline: none;
				          }
				          &:before{
				            color: #E6CC7E;
				          }
				          background: url(../../../static/img/dh.png) no-repeat right;
				          background-size: cover;
				        }
					}
				}
				li:last-child{
					border: none;
				}
				.active{
					color:#E6CC7E;
				}
			}
		}
		.chexinglist{
			position: absolute;
			top: 0.6rem;
			left: -0.55rem;
			width: 9.2rem;
			.chexingsj{
				width:0;
			    height:0;
			    border-width:0 0.53rem 0.53rem;
			    border-style:solid;
			    border-color:transparent transparent #262626;/*透明 透明  灰*/
			    margin:0 auto;
			    position:absolute;
			    left:5.65rem
			}
			.chexingSort{
				width: 9.2rem;
				background-color: #262626;
				border-radius: 0.13rem;
				position: absolute;
				top: 0.53rem;
				padding: 0.2rem 0.4rem;
				li{
					
					height: 0.9rem;
					border-bottom: 1px solid #333;
					line-height: 0.9rem;
					color: #999;
					font-size: 0.32rem;
					&:hover,&:active,&:focus{
			          &{
			            outline: none;
			          }
			          &:before{
			            color: #E6CC7E;
			          }
			          color: #E6CC7E;
			          background: url(../../../static/img/dh.png) no-repeat right;
			        }
			        &:before{
			          position: absolute;
			          left: 0;
			          top: 0;
			          content: '';
			          width: 16px;
			          height: 100%;
			          color: #ccc;
			        }
					.img{
						width: 0.37rem;
						height: 0.27rem;
						margin-top: 0.2rem;
						/*background: url(../../../static/img/dh.png) no-repeat;*/
						/*background-size: cover;*/
						&:hover,&:active,&:focus{
				          &{
				            outline: none;
				          }
				          &:before{
				            color: #E6CC7E;
				          }
				          background: url(../../../static/img/dh.png) no-repeat right;
				          background-size: cover;
				        }
					}
				}
				li:last-child{
					border: none;
				}
				.active{
					color:#E6CC7E;
				}
			}
		}
		.sxlist{
			position: absolute;
			top: 0.6rem;
			left: -0.55rem;
			width: 9.2rem;
			.sxsj{
				width:0;
			    height:0;
			    border-width:0 0.53rem 0.53rem;
			    border-style:solid;
			    border-color:transparent transparent #262626;/*透明 透明  灰*/
			    margin:0 auto;
			    position:absolute;
			    left:7.65rem
			}
			.sxsort{
				width: 9.2rem;
				background-color: #262626;
				border-radius: 0.13rem;
				position: absolute;
				top: 0.53rem;
				padding: 0.8rem;
				.anniu{
					display: flex;
					justify-content: flex-end;
					color:#fff;
					font-size:0.37rem;
					line-height: 0.96rem;
					text-align:  center;
					.chongzhi{
						width: 2.13rem;
						height: 0.96rem;
						background-color: #333333;
						border-radius: 0.13rem 0rem 0rem 0.13rem;
						
					}
					.queding{
						width: 2.13rem;
						height: 0.96rem;
						background-color: #e6cc7e;
						border-radius: 0rem 0.13rem 0.13rem 0rem;
					}
				}
				.checkbox{
					width: 8rem;
					height:auto;
					margin-bottom:0.5rem;
					.title{
						width: 7.87rem;
						color: #E6CC7E;
						font-size: 0.37rem;
						text-align: left;
						padding-left: 0.13rem;
						padding-bottom: 0.4rem;
					}
					.checklist{
						width: 8rem;
						display: flex;
						flex-wrap: wrap;
						justify-content: flex-start;
						li{
							width: 2.13rem;
							height: 0.85rem;
							border-radius: 0.13rem;
							border: solid 0.03rem #4c4c4c;
							line-height: 0.85rem;
							font-size: 0.37rem;
							text-align: center;
							margin-right: 0.5rem;
							margin-bottom: 0.5rem;
						}
						.active{
							border: solid 0.03rem #e5cc7e;
							color: #E6CC7E;
						}
					}
				}
			}
			
		}
		
	}
	.proList{
    	width: 9.2rem;
    	margin: 0 auto;
    	min-height: 20rem;
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
		opacity: 0.7;
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