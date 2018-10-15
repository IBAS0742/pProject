<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar :is-collapse="isCollapse"></v-sidebar>
        <div class="content" :style="contentStyle">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import VHeader from "./components/mainView/Header";
    import VSidebar from "./components/mainView/Sidebar";
    export default {
        components: {VSidebar, VHeader},
        data() {
            return {
                isCollapse: true,
                contentStyle: {
                    left: '65px'
                }
            }
        },
        mounted() {
            window.ret = this;
        },
        watch: {
            isCollapse(val) {
                this.contentStyle.left = val ? '65px' : '250px';
            }
        }
    }
</script>

<style>
    @import "assets/css/main.css";
    @import "assets/css/theme-green/color-green.css";
</style>
