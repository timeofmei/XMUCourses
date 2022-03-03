Page({
  data: {
    courses: <Course[]> []
  },

  onLoad() {
    console.log("Loading Page: Index")
  },

  onReady() {
    let basic: Course[] = [
      {
        id: 0,
        name: "数理统计",
        description: "经济学院统计系必修课"
      },
      {
        id: 0,
        name: "常微分方程",
        description: "老师比较帅"
      },
      {
        id: 0,
        name: "贝叶斯统计",
        description: "老师不是很帅"
      }
    ]
    let courses: Course[] = [];
    for (let i = 0; i < 15; i++) {
      courses.push({...basic[i % basic.length], id: i})
    }
    this.setData({
      courses: courses
    })
    console.log("Page Index Ready")
    console.log(new Date().toTimeString())
  }

})
