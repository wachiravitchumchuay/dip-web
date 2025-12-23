export type AppTheme =
  | 'yellow-black'
  | 'black-yellow'
  | 'black-white'
  | 'white-black'
  | 'white-red'
  | 'red-white'

const STORAGE_KEY = 'dip.theme'

export function setTheme(theme: AppTheme): void {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function getTheme(): AppTheme {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (
    saved === 'yellow-black' ||
    saved === 'black-yellow' ||
    saved === 'black-white' ||
    saved === 'white-black' ||
    saved === 'white-red' ||
    saved === 'red-white'
  ) {
    return saved
  }
  return 'white-black'
}

export function initTheme(): void {
  setTheme(getTheme())
}
