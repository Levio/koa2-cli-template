export class Notice {
  editorId?: String
  editorName?: String

  constructor(data?: Notice) {
    if (!data) {
      return
    }
    this.init(data)
  }

  init(data?: Notice) {
    if (!data) {
      return
    }
    this.editorId = data.editorId
    this.editorName = data.editorName
  }
}
