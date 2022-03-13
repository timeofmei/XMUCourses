const app = getApp()

Page({
  data: {
    courses: [],
  },

  processScores(score) {
    if (Number.isInteger(score)) {
      return String(score) + '.0'
    } else {
      return String(Math.round(score, 1))
    }
  },

  processResult(courses) {
    for (let i = 0; i < courses.length; i++) {
      courses[i].course_rate = this.processScores(courses[i].course_rate)
      courses[i].course_color = courses[i].course_rate >= 4 ? 'green' : courses[i].course_rate >= 3 ? 'yellow' : 'red'
    }
    return courses
  },

  searchEmpty() {
    this.search('')
  },

  search(e) {
    let keyword = e?.detail?.value ?? e
    if (keyword === '') {
      keyword = '院'
    }
    wx.request({
      method: 'POST',
      header: {
        'Cookie': 'csrftoken=' + app.globalData.csrftoken,
        'content-type': 'application/x-www-form-urlencoded',
        'hello': 'world'
      },
      url: 'https://course.shattered.ink/course/search/',
      data: {
        csrfmiddlewaretoken: app.globalData.csrftoken,
        keywords: keyword,
        page: 1
      },
      success: (res) => {
        this.setData({
          courses: this.processResult(res.data.data)
        })
      }
    })
  },

  toDetail() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  toAdd() {
    wx.navigateTo({
      url: '../add/add'
    })
  },

  onLoad() {
    console.log("Loading Page: Index")
    new Promise((resolve, reject) => {
        wx.request({
          url: 'https://course.shattered.ink/token/',
          success: (res) => {
            let result = res.cookies[0].substring(res.cookies[0].indexOf('=') + 1, res.cookies[0].indexOf(';'))
            resolve(result);
          },
          fail: (res) => {
            reject(res)
          }
        })
      })
      .then((res) => {
        app.globalData.csrftoken = res
        this.searchEmpty()
      })
  },

  onReady() {
    console.log("Page Index Ready")
    console.log(new Date().toTimeString())
  }
})