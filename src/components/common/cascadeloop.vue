<template>
  <div id="app">
    <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div">
    <transition name="fade" :enter-active-class="fin"  :leave-active-class="fout" :duration="200">
      <component :is="view"></component>
    </transition>
    </v-touch>
  </div>
</template>
 
<script>
	import content1 from '../selectCar/path/cwhy'
	import content2 from '../selectCar/path/gmjf'
	import content3 from '../selectCar/path/phgc'
	import content4 from '../selectCar/path/tchj'
	import VueTouch from 'vue-touch'
export default {
  name: 'App',
  data: function(){
    return {
      index: 1, //显示的组件索引
      view: "content1",
      fin:'',
      fout:'',
    }
  },
  components: {
    content1,content2,content3,content4
  },
  methods: {
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
    changeIndex() {
    	if(this.index<4){
    		this.index = (this.index)+1;
    		this.view = "content" + this.index;
    		
    	}else{
    		this.index = 1;
    		this.view = "content" + this.index;
    	}
      
      
    }
  }
}
</script>
 
<style>
  /*.fade-enter-active, .fade-leave-active{
    transition: all 0.5s linear
  }
  
 
  .fade-enter, .fade-leave-active {
    opacity: 0
  }*/
</style>