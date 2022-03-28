<template>
  <div class="box">
    <div style="color: white" class="box-left">
      <div class="left-top">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirm }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="left-middle"></div>
      <div class="left-bottom"></div>
    </div>
    <div id="china" class="box-center"></div>
    <div style="color: white" class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          enter-active-class="animate__animated animate__flipInY"
          tag="tbody"
        >
          <tr v-for="item in store.item" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "./stores";
import { onMounted } from "vue";
import * as echarts from "echarts";
import "./assets/china.js";
import { geoCoordMap } from "./stores/geoMap";
import "animate.css";
const store = useStore();

onMounted(async () => {
  //这里异步获取数据给store里面赋值
  await store.getList();
  initCharts();
  initPie();
  initLine();
});

const initCharts = () => {
  // 然后获取数据
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);
  store.item = city[13].children;
  console.log(city);
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    };
  });

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          formatter(value: any) {
            return value.data.value[2];
          },

          // },
        },
        itemStyle: {
          // normal: {
          color: "#D8BC37", //标志颜色
          // },
        },
        data: data,
        zlevel: 1,
      },
    ],
  });
  charts.on("click", (e: any) => {
    for (let v of e.data.children) {
      v.id = getId(10);
    }
    console.log(e.data.children);
    store.item = e.data.children;
  });
  const getId = (length: number) => {
    return Number(
      Math.random().toString().substr(3, length) + Date.now()
    ).toString(36);
  };
};

const initPie = () => {
  console.log(store.cityDetail);
  const charts = echarts.init(
    document.querySelector(".left-middle") as HTMLElement
  );
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "15",
          },
        },
        labelLine: {
          show: true,
        },
        data: store.cityDetail.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm,
          };
        }),
      },
    ],
  });
};
const initLine = () => {
  const charts = echarts.init(
    document.querySelector(".left-bottom") as HTMLElement
  );
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: store.cityDetail.map((v) => v.city),
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    label: {
      show: true,
    },
    series: [
      {
        data: store.cityDetail.map((v) => v.nowConfirm),
        type: "line",
        smooth: true,
      },
    ],
  });
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
$bg-back: #063131;
html,
body,
#app {
  height: 100%;
  overflow: hidden;
  background: url(../src/assets/bg.png) no-repeat center center;
}
.box {
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 10px;
  .box-left {
    width: 400px;
    .left-top {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      background-color: $bg-back;
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(1, 14, 14);
        padding: 10px;
        div:nth-child(2) {
          color: rgb(60, 153, 114);
          padding: 10px 0;
          font-size: 20px;
        }
      }
    }
    .left-middle {
      height: 250px;
      margin-top: 10px;
    }
    .left-bottom {
      height: 250px;
      margin-top: 10px;
    }
  }
  .box-center {
    flex: 1;
  }
  .box-right {
    width: 400px;
    td {
      text-align: center;
    }
    .table {
      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }
        td {
          padding: 5px 10px;
          width: 200px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
