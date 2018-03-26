<template>
    <div>
        <div class="top">
            <search-bar></search-bar>
        </div>
        <div class="wrapper">
            <div class="banner">
                <div class="swiper-container" data-space-between='10'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="bannerImg in bannerImgList">
                            <img v-bind:src=bannerImg alt="">
                        </div>
                        <!-- <div class="swiper-slide"><img src="//p.qpic.cn/qqconadmin/0/8c41f1bc7e0e48ab81634c62e80a2fa9/0" alt=""></div>
                        <div class="swiper-slide"><img src="//p.qpic.cn/qqconadmin/0/a90116eb97da430aa6da0fef3933caa7/0" alt=""></div>
                        <div class="swiper-slide"><img src="//p.qpic.cn/qqconadmin/0/8719dce5984a41f59600025634cd3fb5/0" alt=""></div> -->
                    </div>
                    <div class="pagination"></div>
                </div>
            </div>
            <div class="container">
                <div class="live">
                    <ul>
                        <li class="live-list" v-for="live in lives">
                            <a href="javascript:;" @click="getCourseDetail(live.pid)">
                                <div class="live-left"><img v-bind:src="live.img" alt=""></div>
                                <div class="live-right">
                                    <h3 class="live-title">{{live.title}}</h3>
                                    <p class="live-teacher">{{live.teacher}}</p>
                                    <div class="live-info">
                                        <div v-show="live.isLive">
                                            <span class="live-inclass-wrap">
                                                <i class="live-inclass"></i>
                                                直播中
                                            </span>
                                            {{live.inClassNum}}在上课
                                        </div>
                                        <div v-show="!live.isLive">
                                            直播时间：{{live.time}}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer-nav :tabIndex="0"></footer-nav>
    </div>
</template>

<style scoped>
    @import '../assets/css/page/index.css'
</style>
<script>
    import SearchBar from '../view/page/search.vue' 
    import FooterNav from '../components/footer.vue'
    export default{
        components:{
            FooterNav,
            SearchBar
        },
        data() {
            return {
                lives: [
                    
                ],
                bannerImgList: []
            }
        },
        mounted() {
            var config = {
                autoplay: 3000,
                pagination: '.pagination',
                paginationClickable: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                // observeParents:true,//修改swiper的父元素时，自动初始化swiper
            };
            $(".swiper-container").swiper(config);
            
        },
        created() {
            this.$axios.get('data/liveList.json').then((response) => {
                 this.lives = response.data;
            });
            this.$axios.get('data/bannerImgList.json').then((response) => {
                 this.bannerImgList = response.data;
            });
        },
        methods: {
            getCourseDetail(pid){
                this.$router.push({name: 'CourseDetail',params: {id:pid}});

            }
        }
    }
</script>