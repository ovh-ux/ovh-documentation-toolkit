export default class {
  constructor (Themes) {
    'ngInject'

    this.themes = Themes.getThemes()
    this.selectedTheme = ''
  }

  onThemeChanged (theme) {
    if (this.onChange) {
      this.onChange({
        $event: {
          value: theme
        }
      })
    }
  }
}
