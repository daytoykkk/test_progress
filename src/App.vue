<template>
  <p>{{ msg }}</p>
  <button @click="handleLogin">登陆</button>
  <br><br>
  <button @click="handleInitWs">连接ws</button>
  <br><br>
  <button @click="handleGet">获取进度</button>
  <br><br>
   <a-progress type="circle" :percent=progress />
</template>

<script>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { postLogin, postProgress } from "./api/index.js";

export default {
  name: "App",
  setup() {
    let msg = ref("我什么时候能玩会阿狸QAQ");
    let token = ref("");
    let progress = ref(0)

    let ws = null;
    const url = "ws://z3773e6368.qicp.vip/socket/";
    let connected = ref(false);
    let connectRetryCount = ref(0);
    let connectCount = 0;

    //连接ws
    const handleInitWs = () => {
      ws = new WebSocket(url + token.value);
      ws.onopen = () => {
        message.success("连接服务端成功了");
        connected.value = true;
        connectRetryCount = 0;
      };
      ws.onclose = () => {
        message.error("连接服务端失败");
        connected.value = false;
        connectRetryCount.value++;
        setTimeout(() => {
          handleInitWs();
        }, 500 * connectRetryCount.value);
      };
      ws.onmessage = (res) => {
        connectCount++;

        if (connectCount < 2) {
          msg.value = res.data;
        }else {
          let data = JSON.parse(res.data)
          progress.value = data.message.progress
        }
      };
    };

    // 登陆
    const handleLogin = () => {
      postLogin()
        .then((res) => {
          token.value = res.data.token;
          message.success("登陆成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //获取进度
    const handleGet = () => {
      postProgress(token.value).then(res => {
        console.log(res.data)
      }).catch(err=> {
        console.log(err)
      })
    }

    return {
      msg,
      token,
      progress,
      handleLogin,
      handleInitWs,
      handleGet
    };
  },
};
</script>
