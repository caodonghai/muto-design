import { CSSProperties } from 'react'

export const importStyleLink = (href: string) => {
  let id = `iconfount_${href}`
  const hasIconfountLink = window.document.getElementById(id)
  if(!hasIconfountLink) {
    const link = window.document.createElement('link')
    link.setAttribute('id', id)
    link.setAttribute('href', href)
    link.setAttribute('rel', "stylesheet")
    window.document.head.appendChild(link)
  }
}


export const  getIconStyle = (pos: string, size = 36) => {
  const style: CSSProperties = { backgroundColor: '#1890ff', borderRadius: 6, position: 'relative' };
  switch (pos) {
    case 'top':
    case 'bottom': {
      style.left = '50%';
      style.marginLeft = 0 - size / 2;
      style.marginTop = `${pos === 'bottom' ? -8 : 0}px`;
      style.width = size;
      style.height = 8;
      break;
    }
    case 'left':
    case 'right': {
      style.top = '50%';
      style.marginTop = 0 - size / 2;
      style.marginLeft = `${pos === 'right' ? -8 : 0}px`;
      style.width = 8;
      style.height = size;
      break;
    }
  }
  return style;
}