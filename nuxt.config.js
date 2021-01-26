/**
 * Nuxt.js配置文件
 */
module.exports = {
    router: {
        linkExactActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清除Nuxt.js基于pages目录默认生成的路由表规则
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        // 默认子路由
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home'),
                        },
                        // 登录
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login'),
                        },
                        // 注册
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login'),
                        },
                        // 设置
                        {
                            path: '/setting',
                            name: 'setting',
                            component: resolve(__dirname, 'pages/setting'),
                        },
                        // editor
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor'),
                        },
                        // article
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article'),
                        },
                        // profile
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile'),
                        }
                    ]
                }
            ])
        }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}