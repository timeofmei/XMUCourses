const app = getApp()

Page({
  data: {
    faculties: app.globalData.faculties,
    courseTypes: app.globalData.courseTypes,
    faculty: 0,
    courseType: 0,
    showFaculty: false
  },

  facultyChange(e) {
    this.setData({
      faculty: Number(e.detail.value)
    })
  },

  courseTypeChange(e) {
    let courseType = Number(e.detail.value)
    if (['体育', '大学英语', '校选'].indexOf(this.data.courseTypes[courseType]) > -1) {
      this.setData({
        showFaculty: false
      })
    } else {
      this.setData({
        showFaculty: true
      })
    }
    this.setData({
      courseType: courseType
    })
  }
})