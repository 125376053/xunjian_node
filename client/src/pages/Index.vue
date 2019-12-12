<template>
    <div>

        <HeaderNav :title="title" :isShowRe="isShowRe"></HeaderNav>

        <div class="indexWrap">
            <div class="index_top">
                <router-link tag="p" :to="{path:'/jianShe'}">
                    <img src="static/images/weihu1.png" alt="">
                    <span>建设情况</span>
                </router-link>

                <router-link tag="p" :to="{path:'/yunxing'}">
                    <img src="static/images/weihu2.png" alt="">
                    <span>运行情况</span>
                </router-link>

                <router-link class="xiaoxiListWrap" tag="p" :to="{path:'/renwuManage?step=1'}">
                    <img src="static/images/weihu3.png" alt="">
                    <span>待办任务</span>
                </router-link>

                <router-link tag="p" :to="{path:'/jiance'}">
                    <img src="static/images/weihu4.png" alt="">
                    <span>实时监测</span>
                </router-link>
            </div>

            <div class="jianshe">
                <p class="jianshe_top">
                    <span class="shuIcon"></span>
                    <b>建设情况</b>
                </p>
                <div class="jianshe_bottom">
                    <router-link class="JustifyFlex" :to="{path:'/jianShe'}">
                        <div class="index_text">
                            <b>{{jianSheObj.num}}</b>
                            <span>项目规模</span>
                        </div>
                        <div class="index_text">
                            <b>{{jianSheObj.length}}</b>
                            <span>安装设备数量</span>
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="jianshe jiansheNomargin">
                <p class="jianshe_top">
                    <span class="shuIcon"></span>
                    <b>运行情况</b>
                </p>
                <div class="yunZhuan">
                    <router-link class="yunxingLink JustifyFlex" :to="{path:'/yunxing'}">
                        <div class="p1">
                            <p class="number">{{yunXingObj.Normal}}</p>
                            <p class="text">正常设备</p>
                        </div>

                        <div class="yunzhuanlv">
                            <p id="tijiaoProcess1">
                                <span>{{normalScale}}%</span>
                            </p>
                            <p class="huanText">正常运转率</p>
                        </div>
                        <div class="p1">
                            <p class="number">{{yunXingObj.Trouble}}</p>
                            <p class="text">故障设备</p>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>

        <FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>

    </div>
</template>
<script>

    import {mapState, mapGetters, mapActions} from 'vuex'
    import Header from "../components/Header.vue"
    import Footer from "../components/Footer.vue"
    export default{
        components: {
            HeaderNav: Header,
            FooterNav: Footer
        },
        data(){
            return {
                title: '首页',
                isShowRe: true,
                jianSheObj: {},
                yunXingObj: {},
                normalScale: 0,
                renwuNum: 0,
                messageNum: 0
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        mounted(){
            this.jianSheData()
            this.yunXingData()
        },
        methods: {
            jianSheData(){
                this.$indicator.open('加载中...');
                this.$http.post('/api/sheshi').then((d) => {
                    this.$indicator.close();
                    let data = d.data;
                    if (data.code) {
                        this.jianSheObj = data.data
                    }
                }).catch((e) => {
                    this.$indicator.close();
                })
            },
            yunXingData(){
                this.$indicator.open('加载中...');
                this.$http.post('/api/yunxing').then((d) => {
                    this.$indicator.close();
                    let data = d.data;
                    if (data.code) {
                        this.yunXingObj = data.data
                        this.normalScale = ((this.yunXingObj.good / this.yunXingObj.borken)*100).toFixed(2)
                        this.huan()
                    }
                }).catch((e) => {
                    this.$indicator.close();
                })
            },
            huan(){
                var scale = document.documentElement.clientWidth / 750 * 100;
                let lv = this.normalScale;
                let color = 'aee3fb';
                if (lv > 0) {
                    color = '#4aff6e'
                } else {
                    color = 'aee3fb';
                }
                $("#tijiaoProcess1").radialIndicator({
                    radius: scale,
                    barColor: color,
                    barBgColor: '#aee3fb',
                    barWidth: 7,
                    initValue:lv,
                    roundCorner: true,
                    percentage: true,
                    fontSize: 22,
                    fontColor: '#fff',
                    minValue: 0, //圆形指示器的最小值。
                    maxValue: 100,
                    displayNumber: false,
                    format: function (lv) {
                        return value.toFixed(2);
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .index_text{width:3.35rem;height:1.3rem;background:#3eaeff;border-radius:5px;color:#fff;text-align:center;}
    .index_text b{ display: block; font-size:.5rem;line-height:0;margin-top:.5rem; /*border-bottom: 1px solid red;*/}
    .index_text span{ display: block; font-size:.28rem;line-height:0;margin-top:.5rem;/*border-bottom: 1px solid green;*/}
    #tijiaoProcess1{ position: relative;}
    #tijiaoProcess1 span{font-size: .55rem; position: absolute;left:0;right:0;
        text-align: center; top:0;bottom:0;margin-top: .7rem;
    }
</style>
