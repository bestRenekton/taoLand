//ip
export const webUrl = '/api/'




//公用方法========================================================================================

/**
 * 模拟锚点
 */
export const anchor = {
    created: function () {
    },
    methods: {
        anchor: function (e) {
            let id = 'anchor-' + e;
            let anchor = document.getElementById(id);
            let go = anchor.offsetTop;

            // console.log(go)
            Math.animation(document.documentElement.scrollTop, go, 800, 'Quart.easeOut', function (value) {
                document.documentElement.scrollTop = value;
            });
        }
    }
}
/**
 * imgFile=>base64
 * .toDataURL()方法应该写在<img>的onload事件中，以确保 canvas 的绘制工作在图片下载完成后开始。
 */
export const imgTo64 = (img) => {
    let canvas = document.createElement("canvas");
    let width = img.width;
    let height = img.height;

    if (width > height) {
        if (width > 100) {
            width = Math.round(width * 100 / height);
            height = 100
        }
    } else {
        if (height > 100) {
            height = Math.round(height * 100 / width);
            width = 100
        }
    }
    canvas.width = width; /*设置新的图片的宽度*/
    canvas.height = height; /*设置新的图片的长度*/
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height); /*绘图*/
    let dataURL = canvas.toDataURL("image/png", 0.8);
    // return dataURL.replace("data:image/png;base64,", "");
    return dataURL;
}

/**
 * Guid
 */
export const Guid = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
/**
 * getDate
 */
export const getDate = () => {
    let mydate, y, m, d, hh, mm, ss;
    mydate = new Date()
    y = mydate.getFullYear()
    m = mydate.getMonth() + 1
    d = mydate.getDate()
    hh = mydate.getHours()
    mm = mydate.getMinutes()
    ss = mydate.getSeconds()
    if (m < 10) m = '0' + m
    if (d < 10) d = '0' + d
    if (hh < 10) hh = '0' + hh
    if (mm < 10) mm = '0' + mm
    if (ss < 10) ss = '0' + ss
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

//mixins========================================================================================

//checkAdmin 检测admin
export const checkAdmin = {
    beforeCreate: function () {
        let user_name = localStorage.getItem("user_name");
        let token = localStorage.getItem("token");
        this.$axios.post(webUrl + 'admin/checkUser', { 'user_name': user_name, 'token': token })
            .then((response) => {
                if (response.data.status == 0) {
                    this.$store.commit("changeIsSignIn", 0);
                    this.$store.commit("changeIndex", '1');
                    localStorage.clear();
                    this.$router.replace({ name: 'home' })
                } else {
                    if (response.data.type == 1) {
                        this.$store.commit("changeIsSignIn", 1);//admin
                    } else if (response.data.type == 2) {
                        this.$store.commit("changeIsSignIn", 2);//游客
                        this.$router.replace({ name: 'home' })
                        this.$store.commit("changeIndex", '1');
                    }
                }
            })
            .catch((reject) => {
                console.log(reject)
            })
    }
}
//checkVisiter 检测游客
export const checkVisiter = {
    beforeCreate: function () {
        let user_name = localStorage.getItem("user_name");
        let token = localStorage.getItem("token");
        this.$axios.post(webUrl + 'admin/checkUser', { 'user_name': user_name, 'token': token })
            .then((response) => {
                if (response.data.status == 0) {
                    this.$store.commit("changeIsSignIn", 0);
                    this.$store.commit("changeIndex", '1');
                    localStorage.clear();
                    this.$router.replace({ name: 'home' })
                }
            })
            .catch((reject) => {
                console.log(reject)
            })
    }
}
//checkSign登陆情况
export const checkSign = {
    beforeCreate: function () {
        let user_name = localStorage.getItem("user_name");
        let token = localStorage.getItem("token");
        this.$axios.post(webUrl + 'admin/checkUser', { 'user_name': user_name, 'token': token })
            .then((response) => {
                if (response.data.status == 0) {
                    this.$store.commit("changeIsSignIn", 0);
                    localStorage.clear();
                } else {
                    if (response.data.type == 1) {
                        this.$store.commit("changeIsSignIn", 1);//admin
                    } else if (response.data.type == 2) {
                        this.$store.commit("changeIsSignIn", 2);//游客
                    }
                }
            })
            .catch((reject) => {
                console.log(reject)
            })
    }
}
