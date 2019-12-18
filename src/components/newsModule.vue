<template>
  <div @click="$router.push({path: `/articleDetail/${value.id}`})">
  <!-- 左字右图 -->
    <div class="single" v-if="value.cover.length <= 2 && value.type === 1">
      <div class="left">
        <p class="content">{{value.title}}</p>
        <p class="info">
          <span>{{value.user.nickname}}</span>
          <span>{{value.comment_length}}跟帖</span>
        </p>
      </div>
      <img :src="value.cover[0].url" alt />
    </div>
    <!-- 上字下图 -->
    <div class="single1" v-else-if="value.cover.length > 2 && value.type === 1">
      <p class="content" style="padding: 0px 5px;">{{value.title}}</p>
      <div class="imgs">
        <img v-for="item in value.cover" :key="item.id" :src="item.url" alt />
      </div>
      <p class="info">
        <span>{{value.user.nickname}}</span>
        <span>{{value.comment_length}}跟帖</span>
      </p>
    </div>
    <!-- 视频部分 -->
    <div class="single2" v-else-if="value.type === 2">
      <p class="content" style="padding: 0px 5px;">{{value.title}}</p>
      <div class="myvideo">
        <img :src="value.cover[0].url" alt />
        <!-- 视频图标 -->
        <div class="playbtn">
          <van-icon name="play" />
        </div>
      </div>
      <p class="info">
        <span>{{value.user.nickname}}</span>
        <span>{{value.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // value:当前需要渲染的新闻对象
  props: ['value']
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}

.info {
  font-size: 12px;
  padding: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.single1 {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;

  .imgs {
    flex: 1;
    display: flex;
    padding: 10px 0 0 0;
    > img {
      width: 33.33%;
      padding: 0 5px;
      box-sizing: border-box;
    }
  }
}
.single2 {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  .myvideo {
    margin: 5px 0;
    width: 100%;
    position: relative;
    > img {
      width: 100%;
      display: block;
    }
    .playbtn {
      width: 50 * 100vw/360;
      height: 50 * 100vw/360;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      // 向元素添加阴影：
      box-shadow: 0px 0px 10px #fff;
      text-align: center;
      color: #fff;
      font-size: 40px;
      .van-icon {
        line-height: 50 * 100vw/360;
      }
    }
  }
}
</style>
