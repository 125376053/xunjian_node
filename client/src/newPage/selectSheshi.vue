<template>
    <div>
        <HeaderNav :title="title"></HeaderNav>

        <div class="overAuto2">
            <div class="rc">
                <ul>
                    <router-link :key="index" v-for="(item,index) in sheshiList" tag="li" :to="{
                        path:'/inspectionSubject',
                        query:{
                            sheshiid:item.id,
                            sheshiname:item.name
                        }
                    }" class="JustifyFlex">
                        <span class="wt">{{item.name}}</span>
                        <img class="jt" src="static/images/myLeft.jpg">
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import Header from "../components/Header.vue"
    export default{
        name: '',
        data(){
            return {
                title:'巡检',
                value:this.$route.query.value,
                sheshiList:[],
                getRelateId:0
            }
        },
        components:{
            HeaderNav:Header
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods:{
            getData(){
                this.$indicator.open('加载中...');
                this.$http.get('/api/allSheShi').then((d) => {
                    this.$indicator.close();
                    this.sheshiList=d.data.data.list
                }).catch((e) => {
                    this.$indicator.close();
                })
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style>

</style>
