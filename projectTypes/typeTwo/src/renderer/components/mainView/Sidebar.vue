<template>
    <div class="sidebar" :style="sliderStyle">
        <el-menu :collapse="isCollapse"
                 @select="selectMenu"
                 :default-active="onRoutes" class="el-menu-vertical-demo"
                 theme="dark" unique-opened router>
            <el-menu-item  v-for="(r,ind) in routers" :index="ind">
                <i :class="r.icon"></i>
                <span slot="title">{{r.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import routers from './../../singleRoutes';

    export default {
        name: 'vSidebar',
        props: {
            isCollapse: {
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                routers: routers.filter(_ => _.icon)
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            sliderStyle() {
                return {
                    width: this.isCollapse ? '65px' : '250px'
                };
            }
        },
        methods: {
            selectMenu(ind) {
                this.$router.replace(this.routers[ind].path)
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        /*width: 250px;*/
        left: 0;
        top: 60px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
