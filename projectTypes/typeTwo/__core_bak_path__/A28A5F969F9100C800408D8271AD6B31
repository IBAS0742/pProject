<template>
    <drawer :show="show" :width="'400px'" :z-index="2001">
        <div slot="drawer" style="padding: 0.3em 0.5em;">
            <el-button round @click="$emit('close');" style="width: 100%;">
                <i class="el-icon-back"></i>关闭
            </el-button>
            <slot></slot>
        </div>
    </drawer>
</template>

<script>
    import Drawer from "../../drawer/drawer";
    export default {
        name: "commonDrawer",
        components: {Drawer},
        props: {
            show: {
                type: Boolean
            }
        }
    }
</script>

<style scoped>

</style>
