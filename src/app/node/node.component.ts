import { Component, Input, AfterViewInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements AfterViewInit {
  @Input() node: Item;

  @Input() jsPlumbInstance;

  ngAfterViewInit() {
    const exampleDropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive'
    };
    const Endpoint1 = {
      endpoint: ['Dot', { radius: 5 }],
      isSource: true,
      scope: 'jsPlumb_DefaultScope',
      connector: ['Bezier', { curviness: 63 }],
      maxConnections: 30,
      isTarget: false,
      connectorOverlays: [['Arrow', { location: 1 }]],
      dropOptions: exampleDropOptions
    };
    const Endpoint2 = {
      endpoint: ['Dot', { radius: 5 }],
      isSource: false,
      scope: 'jsPlumb_DefaultScope',
      maxConnections: 30,
      isTarget: true,
      dropOptions: exampleDropOptions
    };
    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Bottom', uuid: id + '_bottom' }, Endpoint1);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Top', uuid: id + '_top' }, Endpoint2);
    this.jsPlumbInstance.draggable(id);
  }
}
