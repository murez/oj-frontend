<template>
  <el-carousel :interval="4000" type="card" height="800px" indicator-position="none">
    <el-carousel-item v-for="item in pictures" :key="item.id">
      <el-row class="outline-img">
          <el-col :span="24" type="flex" align="middle" justify="center"><img :src="item.img" class="carousel"></el-col>
        </el-row>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      pictures: [
        {
          id: 0,
          img: require('../assets/timg-1.jpg')
        },
        {
          id: 1,
          img: require('../assets/timg-2.jpg')
        },
        {
          id: 3,
          img: require('../assets/timg-4.jpg')
        },
        {
          id: 4,
          img: require('../assets/timg-5.jpg')
        },
        {
          id: 5,
          img: require('../assets/new1.png')
        },
        {
          id: 6,
          img: require('../assets/new2.png')
        },
        {
          id: 7,
          img: require('../assets/new3.png')
        },
        {
          id: 8,
          img: require('../assets/new4.png')
        },
        {
          id: 9,
          img: require('../assets/new5.png')
        },
        {
          id: 10,
          img: require('../assets/new6.png')
        }
      ]
    }
  }
}
</script>
<style>
  .carousel {
    margin: 10px;
    -moz-box-shadow:0 0 30px #8c939d;
    -webkit-box-shadow:0 0 30px #8c939d;
    box-shadow: 0 5px 20px 0 #8c939d;
    background: white;
    border-radius: 30px;
    height: 430px
  }
  .outline-img {
    padding: 5px;
  }
</style>
