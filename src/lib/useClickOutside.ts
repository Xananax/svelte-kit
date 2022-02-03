import { browser } from '$app/env'

const serverResponse = {
  destroy() {}
}

const noOp = () => serverResponse

export const clickOutside = (node: Node) => {
  if (!browser) {
    return noOp()
  }

  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
