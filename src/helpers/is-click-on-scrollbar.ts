export function isClickOnScrollbar(click: MouseEvent): boolean {
  const target = click.target as HTMLElement;
  const targetStyle = window.getComputedStyle(target);

  // check if vertical scrollbar was clicked
  const offsetLeft = click.offsetX;

  const borderLeftWidth = Number.parseFloat(targetStyle.getPropertyValue("border-left-width")) || 0;
  const borderRightWidth = Number.parseFloat(targetStyle.getPropertyValue("border-right-width")) || 0;

  const verticalScrollbarLeft = target.clientWidth;
  const verticalScrollbarRight = target.offsetWidth - borderLeftWidth - borderRightWidth;

  if (offsetLeft >= verticalScrollbarLeft && offsetLeft < verticalScrollbarRight) {
    return true;
  }

  // check if horizontal scrollbar was clicked
  const offsetTop = click.offsetY;

  const borderTopWidth = Number.parseFloat(targetStyle.getPropertyValue("border-top-width")) || 0;
  const borderBottomWidth = Number.parseFloat(targetStyle.getPropertyValue("border-bottom-width")) || 0;

  const horizontalScrollbarTop = target.clientHeight;
  const horizontalScrollbarBottom = target.offsetHeight - borderTopWidth - borderBottomWidth;

  return offsetTop >= horizontalScrollbarTop && offsetTop < horizontalScrollbarBottom;
}
