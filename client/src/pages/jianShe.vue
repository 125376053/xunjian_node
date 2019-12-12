<template>
    <div>
        <HeaderNav :title="title"></HeaderNav>

        <div class="overAuto2">
            <div class="yunxing">

                <div class="jianshe">
                    <div class="jianshe_bottom JustifyFlex">
                        <div class="index_text">
                            <b>{{jianSheObj.num}}</b>
                            <span>项目规模</span>
                        </div>
                        <div class="index_text">
                            <b>{{jianSheObj.length}}</b>
                            <span>安装设备数量</span>
                        </div>
                    </div>
                </div>

                <ul class="tableUl">
                    <li>
                        <span>设施/设备名称</span>
                        <span>规模/数量</span>
                    </li>
                    <li v-for="(item,index) in jianSheObj.datalist">
                        <span class="ellipse">{{item.name}}</span>
                        <span>{{item.num}}</span>
                    </li>
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
                title:'建设情况',
                jianSheObj:{}
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
                this.$http.post('/api/Sheshi').then((d) => {
                    this.$indicator.close();
                    let data = d.data;
                    if (data.code) {
                        this.jianSheObj = data.data
                    }
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

<style scoped>
    .index_text{width:3.35rem;height:1.3rem;background:#3eaeff;border-radius:5px;color:#fff;text-align:center;}
    .index_text b{ display: block; font-size:.5rem;line-height:0;margin-top:.5rem; /*border-bottom: 1px solid red;*/}
    .index_text span{ display: block; font-size:.28rem;line-height:0;margin-top:.5rem;/*border-bottom: 1px solid green;*/}
</style>
