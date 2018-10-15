<template>
    <div class="vue-drawer" v-bind:style="{ 'pointer-events': pointerEvents , 'z-index': zIndex }">
        <div class="main">
            <slot></slot>
            <div class="scrim" v-bind:class="show ? 'scrim-enter' : ''"></div>
        </div>
        <div class="drawer" v-bind:class="[right ? 'drawer-right' : 'drawer-left', show ? 'drawer-enter' : '']" v-bind:style="{width: width }">
            <slot name="drawer"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'drawer',
        props: {
            show: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            right: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            width: {
                type: String,
                default() {
                    return '256px';
                }
            },
            zIndex: {
                type: Number,
                default() {
                    return 10
                }
            }
        },
        data() {
            return {
                pointerEvents: 'none'
            }
        },
        watch: {
            show(val) {
                if (!val) {
                    setTimeout(() => {
                        this.pointerEvents = 'none'
                    },500);
                } else {
                    this.pointerEvents = 'unset'
                }
            }
        }
    }
</script>

<style>
    .vue-drawer {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .vue-drawer > .main {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .vue-drawer > .main > .scrim {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        visibility: hidden;
        opacity: 0;
        transition: opacity ease-in-out 0.38s, visibility ease-in-out 0.38s;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .vue-drawer > .main > .scrim-enter {
        visibility: visible;
        opacity: 1;
    }
    .vue-drawer > .drawer {
        background-color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
        height:100%;
        overflow: hidden;
        pointer-events: none;
        visibility: hidden;
        transition: transform ease-in-out 0.38s, visibility 0.38s;
        will-change: none;
    }
    .vue-drawer > .drawer-left {
        left: 0;
        transform: translateX(-102%);
    }
    .vue-drawer > .drawer-right {
        right: 0;
        transform: translateX(102%);
    }
    .vue-drawer > .drawer-enter {
        pointer-events: inherit;
        visibility: visible;
        transform: translateX(0%);
    }
</style>
