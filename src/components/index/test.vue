<template>
	<div id="test">
		<mymarquee :lists='list'></mymarquee>
	</div>
</template>

<script>
	import mymarquee from '../common/marquee';
	export default{
		name:'test',
		components:{
			mymarquee
		},
		data(){
			return{
				list:['李伟已提全新汉兰达 ','闰强已提全新奔驰A4L'],
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	mymarquee{
		height: 1rem;
		color: #fff;
		background: #0088CC;
	}
</style>