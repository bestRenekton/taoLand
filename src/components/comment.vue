<template>
  <div class="page">
      <div v-if="isSignIn===0" @click="signIn" class="signIn">登录留言吧~~</div>
      <div v-else class="part part_input">
        <div class="input_top">
          <div class="img"><img class="avatar"  :src="avatar" alt=""><p class="from_uname">{{nickName}}</p></div>
          <div class="text"><textarea v-model="submitTxt" class="textarea"></textarea></div>
        </div>
        <div class="input_down">
          <a href="javascript:;" @click="submit_new" class="submit">submit</a>
        </div>
      </div>
      <div v-if="comments.length>0" class="part part_output">
        <p class="output_header">全部评论 <span class="total">{{comments.length}}</span> 条</p>
        <div class="output_body">
          <div v-for="(comment,index) in comments" :key="comment.id" class="floor">
            <div class="floor_l"><img class="avatar" :src="comment.avatar" alt=""><p class="from_uname">{{comment.from_uname}}</p></div>
            <div class="floor_r">
              <div class="comment">
                <div class="comment_main">{{comment.content}}</div>
                <div class="comment_bar">
                  <span class="date">{{comment.date}}</span>
                  <a @click="setTextarea(index,true,comment.from_uid,comment.from_uname)" href="javascript:;" class="replay_btn">回复</a>
                </div>
                <div v-if="comment.child.length>0" class="comment_replay__main">
                  <div v-for="(replay,index2) in comment.child" :key="index2" class="comment_replay__floor">
                    <div class="floor_l"><img class="avatar" :src="replay.avatar" alt=""></div>
                    <div class="floor_r">
                      <p class="content">
                        <span class="from_name">{{replay.from_uname}}</span>回复<span class="to_name">{{replay.to_uname}}</span> ：
                        {{replay.content}}
                      </p>
                      <div class="footer">
                        <span class="date">{{comment.date}}</span>
                        <a @click="setTextarea(index,true,replay.from_uid,replay.from_uname)" href="javascript:;" class="replay_btn">回复</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="comment.open" class="comment_replay__bar">
                  <textarea v-model.lazy="textArea[index]" :placeholder="`回复${comment.to_uname}：`" class="textarea"></textarea>
                  <div class="down">
                    <a href="javascript:;" @click="setTextarea(index,false)" class="takeUp">收起↑</a>
                    <a href="javascript:;" @click="submit_reply(comment.id,comment.to_uid,comment.to_uname,textArea[index])" class="submit">发表</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Guid, getDate, webUrl } from "../../static/js/public.js";
// import avatar from "../../static/img/avatar.png";

export default {
  props: ["comments", "articleId"],
  data() {
    return {
      nickName: null,
      avatar: null,
      name: null,
      token: null,
      submitTxt: ""
    };
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    textArea() {
      return this.comments.map(e => {
        return null;
      });
    }
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.name = localStorage.getItem("user_name");
    this.token = localStorage.getItem("token");

    // console.log(getDate())
  },
  methods: {
    signIn: function() {
      this.$router.push({ name: "Signin" });
    },
    submit_new: function() {
      //新发表评论
      let that = this;
      let obj = {
        _id: that.articleId, //文章id
        id: Guid(), //评论id
        from_uid: that.name,
        from_uname: that.nickName,
        avatar: that.avatar,
        content: that.submitTxt,
        date: getDate()
      };

      that.$axios
        .post(webUrl + "comment/new", {
          ...obj
        })
        .then(response => {
          that.$message({
            type: "success",
            message: response.data.msg
          });
          if (response.data.status == 1) {
            this.$emit("update");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    submit_reply: function(id, to_uid, to_uname, textArea) {
      //回复别人评论
      let that = this;
      let obj = {
        _id: that.articleId, //文章id
        id: id, //评论id
        from_uid: that.name,
        from_uname: that.nickName,
        avatar: that.avatar,
        to_uid: to_uid,
        to_uname: to_uname,
        content: textArea,
        date: getDate()
      };
      // console.log(obj)
      that.$axios
        .post(webUrl + "comment/reply", {
          ...obj
        })
        .then(response => {
          that.$message({
            type: "success",
            message: response.data.msg
          });
          if (response.data.status == 1) {
            this.$emit("update");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    /**
     * 改变输入框状态
     * index评论序号
     * open 该评论下输入框开否
     * to_uid 该评论下目标用户id
     * to_uname 该评论下目标name
     */
    setTextarea: function(index, open, to_uid, to_uname) {
      if (this.isSignIn === 0) {
        this.$router.push({ name: "Signin" });
      } else {
        let params = { index, open, to_uid, to_uname };
        this.$emit("setTextarea", params);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0px 3px rgba(0, 0, 0, 0.227);
  background: #fafafa;
  // margin: 20px 0 0 0;
  padding: 10px;
  .signIn {
    text-align: center;
    color: #3b99fc;
    font-size: 18px;
    cursor: pointer;
  }
  .part {
    &.part_input {
      .input_top {
        display: flex;
        .img {
          width: 60px;
          text-align: center;
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .from_uname {
            color: #3b99fc;
            cursor: pointer;
            word-break: break-all;
          }
        }
        .text {
          flex: 1;
          .textarea {
            width: 98%;
            margin-left: 2%;
            padding: 10px;
            box-sizing: border-box;
            min-height: 90px;
            font-size: 14px;
            border: 1px solid #ddd;
            background: #fff;
            color: #666;
            border-radius: 6px;
            transition: all 0.3s;
            &:focus {
              border: 1px solid #3b99fc;
              box-shadow: 0 0 3px 0px #3b99fc;
            }
          }
        }
      }
      .input_down {
        text-align: right;
        margin-top: 20px;
        .submit {
          display: inline-block;
          width: 100px;
          height: 50px;
          line-height: 50px;
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
          border-radius: 6px;
          color: #fff;
          &:hover,
          &:focus {
            background: rgba(0, 129, 255, 0.7);
          }
        }
      }
    }
    &.part_output {
      border-top: 1px solid #eee;
      padding: 30px 0;
      margin: 30px 0 0 0;
      .output_header {
        font-size: 20px;
        padding: 0 10px;
        margin-bottom: 10px;
        border-left: 4px solid #3b99fc;
      }
      .output_body {
        .floor {
          display: flex;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
          & > .floor_l {
            width: 60px;
            text-align: center;
            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin: 0 0 20px 0;
            }
            .from_uname {
              color: #3b99fc;
              cursor: pointer;
              word-break: break-all;
            }
          }
          .floor_r {
            flex: 1;
            .comment {
              width: 98%;
              margin-left: 2%;
              padding: 10px;
              box-sizing: border-box;
              font-size: 14px;
              color: #666;
              transition: all 0.3s;
              .comment_main {
                min-height: 70px;
              }
              .comment_bar {
                text-align: right;
                padding: 10px 0;
                font-size: 12px;
                .date {
                  color: #999;
                }
                .replay_btn {
                  color: rgba(0, 129, 255, 1);
                  padding: 0 0 0 10px;
                }
              }
              .comment_replay__main {
                background: #f4f4f4;
                border-radius: 6px;
                padding: 10px;
                .comment_replay__floor {
                  display: flex;
                  .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                  }
                  .floor_r {
                    flex: 1;
                    .content {
                      min-height: 32px;
                      width: 98%;
                      margin-left: 2%;
                      box-sizing: border-box;
                      .from_name {
                        color: #3b99fc;
                        cursor: pointer;
                        margin-right: 10px;
                      }
                      .to_name {
                        color: #3b99fc;
                        cursor: pointer;
                        margin-left: 10px;
                      }
                    }
                    .footer {
                      text-align: right;
                      padding: 10px 0;
                      font-size: 12px;
                      .date {
                      }
                      .replay_btn {
                        color: #999;
                        padding: 0 10px;
                      }
                    }
                  }
                }
              }
              .comment_replay__bar {
                background: #f4f4f4;
                padding: 10px 0;
                .textarea {
                  display: block;
                  width: 96%;
                  margin: 0 auto;
                  padding: 10px;
                  box-sizing: border-box;
                  min-height: 90px;
                  font-size: 14px;
                  border: 1px solid #ddd;
                  background: #fff;
                  color: #666;
                  border-radius: 6px;
                  transition: all 0.3s;
                  &:focus {
                    border: 1px solid #3b99fc;
                    box-shadow: 0 0 3px 0px #3b99fc;
                  }
                }
                .down {
                  text-align: right;
                  .submit,
                  .takeUp {
                    display: inline-block;
                    width: 80px;
                    height: 40px;
                    margin: 2% 2% 0 0;
                    line-height: 40px;
                    background: rgba(0, 0, 0, 0.2);
                    text-align: center;
                    border-radius: 6px;
                    color: #fff;
                    &:hover,
                    &:focus {
                      background: rgba(0, 129, 255, 0.7);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .page {
    padding: 50px 30px;
    .signIn {
      text-align: center;
      color: #3b99fc;
      font-size: 18px;
      cursor: pointer;
    }
    .part {
      &.part_input {
        .input_top {
          .img {
            width: 100px;
            .avatar {
              width: 60px;
              height: 60px;
            }
          }
          .text {
            .textarea {
              padding: 20px;
            }
          }
        }
      }
      &.part_output {
        .output_header {
          margin-bottom: 50px;
        }
        .output_body {
          .floor {
            padding: 20px 0;
            & > .floor_l {
              width: 100px;
              .avatar {
                width: 60px;
                height: 60px;
              }
            }
            .floor_r {
              flex: 1;
              .comment {
                width: 98%;
                margin-left: 2%;
                padding: 10px;
                box-sizing: border-box;
                font-size: 14px;
                color: #666;
                transition: all 0.3s;
                .comment_main {
                  min-height: 70px;
                }
                .comment_bar {
                  text-align: right;
                  padding: 10px 0;
                  font-size: 12px;
                  .date {
                    color: #999;
                  }
                  .replay_btn {
                    color: rgba(0, 129, 255, 1);
                    padding: 0 0 0 10px;
                  }
                }
                .comment_replay__main {
                  padding: 20px;
                  .comment_replay__floor {
                    display: flex;
                    .avatar {
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                    }
                    .floor_r {
                      flex: 1;
                      .content {
                        min-height: 32px;
                        width: 98%;
                        margin-left: 2%;
                        box-sizing: border-box;
                        .from_name {
                          color: #3b99fc;
                          cursor: pointer;
                          margin-right: 10px;
                        }
                        .to_name {
                          color: #3b99fc;
                          cursor: pointer;
                          margin-left: 10px;
                        }
                      }
                      .footer {
                        text-align: right;
                        padding: 10px 0;
                        font-size: 12px;
                        .date {
                        }
                        .replay_btn {
                          color: #999;
                          padding: 0 10px;
                        }
                      }
                    }
                  }
                }
                .comment_replay__bar {
                  padding: 20px 0;
                  .textarea {
                    padding: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
