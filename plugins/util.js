export default defineNuxtPlugin(nuxtApp => {
    const utilities = {
        string_to_regex: expression => {
            let terms = expression.split('*')
            let trailingWildcard = false
            let expr = ''
            for (let i = 0; i < terms.length; i++) {
                if (terms[i]) {
                    if (i > 0 && terms[i - 1]) {
                        expr += '.*'
                    }
                    trailingWildcard = false
                    expr += terms[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                } else {
                    trailingWildcard = true
                    expr += '.*'
                }
            }
            if (!trailingWildcard) {
                expr += '.*'
            }
            return new RegExp('^' + expr + '$', 'i')
        }
    }

    nuxtApp.provide('utils', utilities)
})
