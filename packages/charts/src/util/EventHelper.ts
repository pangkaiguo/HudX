export class EventHelper {
  static bindHoverEvents(
    element: any,
    onMouseOver: (evt: any) => void,
    onMouseOut: (evt: any) => void
  ): void {
    element.on('mouseover', onMouseOver);
    element.on('mouseout', onMouseOut);
  }
}
