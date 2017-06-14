class ThemesService {
  constructor (themes) {
    this.themes = themes
  }

  getThemes () {
    return this.themes
  }
}

export default class {
  constructor () {
    'ngInject'

    this.themes = []
  }

  setThemes (themes) {
    this.themes = themes
  }

  $get () {
    return new ThemesService(this.themes)
  }
}
