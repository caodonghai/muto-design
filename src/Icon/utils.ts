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