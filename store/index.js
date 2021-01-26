const cookieparser = process.server ? require('cookieparser') : undefined

/**
 * 在服务端渲染期间运行都是同一个实例
 * 为了防止数据冲突，务必把state定义成一个函数，返回数据对象
 * 按需导出
 */
export const state = () => {
    return {
        // 当前用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    }
}

export const actions = {
    /**
     * nuxtServerInit是一个特殊的action方法
     * 服务端渲染自动调用，初始化容器数据
     */
    nuxtServerInit({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
            // 把cookie字符串转为js对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}