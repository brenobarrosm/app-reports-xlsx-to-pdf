const {defineConfig} = require('@vue/cli-service')
module.exports = {
    transpileDependencies: [
        '@vue/cli-service',
    ],
    devServer: {
        client: {
            overlay: false,
        },
    },
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    }
}
