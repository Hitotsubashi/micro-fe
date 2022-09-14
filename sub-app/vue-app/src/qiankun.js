export const microAppMixin = {
    data(){
        return {
            subDiv: undefined
        }
    },
    mounted(){
        if(process.env.NODE_ENV==='development'){
            this.subDiv = document.createElement('div')
            this.subDiv.__vue__ = this
            document.body.appendChild(this.subDiv)
          }
    },
    watch:{
        '$route':{
            handler(){
              const matched = this.$route.matched
                  .filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
                  .map(item=>({...item,path: this.$router.options.base+item.path}))
              this.$shared.dispatch({type:'UPDATE_ROUTES', payload: matched})
            },
            immediate: true
        }
    },
    beforeDestroy(){
        this.$shared.dispatch({type:'UPDATE_ROUTES', payload: []})

        this.subDiv.__vue__ = null;
        document.body.removeChild(this.subDiv)
        this.subDiv = null;
    }
}