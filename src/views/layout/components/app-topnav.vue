<script lang="ts" setup name="AppTopnav">
import Confirm from '@/components/confirm';
import Message from '@/components/message';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const { user } = useStore()

const router = useRouter()

const logoutFn = () => {
  Confirm({
    title: '温馨提示',
    text: '亲～你确定要退出么？'
  }).then(() => {
    user.logout()
    router.push('/login')
    Message.success('退出成功')
  }).catch(() => {

  })
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <RouterLink to="/" href="javascript:;"><i class="iconfont icon-user"></i>{{ user.profile.nickname ||
                user.profile.account
            }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/" href="javascript:;" @click="logoutFn">退出登录</RouterLink>
          </li>
        </template>
        <template>
          <li>
            <RouterLink to="/login" href="javascript:;">请先登录</RouterLink>
          </li>
          <li>
            <RouterLink to="/" href="javascript:;">免费注册</RouterLink>
          </li>
        </template>
        <li>
          <RouterLink to="/" href="javascript:;">我的订单</RouterLink>
        </li>
        <li>
          <RouterLink to="/" href="javascript:;">会员中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/" href="javascript:;">帮助中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/" href="javascript:;">关于我们</RouterLink>
        </li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
