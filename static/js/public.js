
//公用方法


// 模拟锚点
export const anchor = {
    created: function () {
    },
    methods: {
        anchor:function(e){
            let id='anchor-'+e;
            let anchor=document.getElementById(id);
            let go=anchor.offsetTop;
      
            // console.log(go)
            Math.animation(document.documentElement.scrollTop,go,600,'Quart.easeOut', function (value) {
                document.documentElement.scrollTop = value;
            });
          }
    }
}

//checkUser检测登录
export const checkUser={
    beforeCreate:function(){
        this.$axios.post('/api/admin/checkUser')
          .then((response) => {
            if(response.data.status==0){
              this.$router.replace({name:'home'})
            }
          })
          .catch((reject) => {
            console.log(reject)
          })
    }
}