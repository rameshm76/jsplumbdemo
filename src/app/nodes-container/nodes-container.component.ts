import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { NodeService } from '../node.service';
import { Item } from '../item';
import { Group } from '../group';

@Component({
  selector: 'app-nodes-container',
  templateUrl: './nodes-container.component.html',
  styleUrls: ['./nodes-container.component.css']
})
export class NodesContainerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() nodes: Array<Item> = [];
  @Input() connections = [];
  @Input() groups: Array<Group> = [];
  @ViewChild('nodes', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);

    this.groups.forEach(group => {
      console.log('Group:', group);
      this.nodeService.addDynamicGroup(group);
    });

    this.nodes.forEach(item => {
      console.log('Node:', item);
      this.nodeService.addDynamicNode(item);
    });

    setTimeout(() => {
      this.connections.forEach(connection => {
        this.nodeService.addConnection(connection);
      }, 1000);
    });
  }

  addNode() {
    const nodeId = `Step id_${[Math.random().toString(16).slice(2, 8)]}`;
    const node: Item = {
      id: nodeId,
      name: nodeId,
      group: 'group1'
    };
    this.nodeService.addDynamicNode(node);
  }

  saveNodeJson() {
    // save element position on Canvas and node conections
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: HTMLDivElement) => {
      return {
        id: node.id,
        name: node.id,
        group: 'group1',
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });

    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[])
      .map((conn) => ({ uuids: conn.getUuids() }));

    const json = JSON.stringify({ nodes, connections });

    console.log(json);
  }

  ngOnChanges() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    if (this.nodes.length > 0) {
      this.nodes.forEach(node => {
        // this.nodeService.addDynamicNode(node);
      });
    }
  }
}
