<template>
    <single-params :params="params"
                   :name="name"
                   class="set"
                   :level="1"
                   :param-format="paramFormat"
                   @change="update"></single-params>
</template>

<script>
    import singleParams from './singleParams'
    export default {
        name: 'singleParam',
        components: {
            singleParams
        },
        props: {
            params: {
                type: Array,
                required: true
            },
            name: {
                type: String,
                required: false
            },
            paramFormat: {
                type: Array,
                required: true
            }
        },
        methods: {
            update () {
                this.$emit('updateParams', this.params)
            }
        }
    }
</script>
