export default defineNuxtPlugin({
    name: 'debug',
    dependsOn: ['pinia'],
    setup() {
        const { setIsDebug } = useStaticStore('main')
        setIsDebug(!!new URLSearchParams(window.location.search).get('debug'))
    },
})
