import { Component, AfterViewInit, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { Group } from './group';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  jsPlumbInstance: any;
  nodes = [];
  connections = [];
  groups = [];
  data = {
    nodes: [
      { id: 'process1', name: 'Process 1', group: 'processGroup1', top: 20, left: 20 },
      { id: 'process2', name: 'Process 2', group: 'processGroup1', top: 453, left: 546 },
      { id: 'process3', name: 'Process 3', group: 'processGroup2', top: 23, left: 290 },
      { id: 'process4', name: 'Process 4', group: 'processGroup2', top: 209, left: 55 },
      { id: 'process5', name: 'Process 5', group: 'processGroup2', top: 13, left: 580 },
      { id: 'process6', name: 'Process 6', group: 'processGroup3', top: 384, left: 29 },
      { id: 'process7', name: 'Process 7', group: 'processGroup3', top: 198, left: 335 }
    ],
    edges: [
      { source: 'process1', target: 'process2' },
      { source: 'process2', target: 'process3' },
      { source: 'process1', target: 'process4' },
      { source: 'process3', target: 'process4' },
      { source: 'process4', target: 'process5' },
      { source: 'process3', target: 'process6' },
      { source: 'process5', target: 'process7' },
      { source: 'process6', target: 'process7' }
    ],
    connections: [
      { uuids: ['process1_bottom', 'process3_top'] },
      { uuids: ['process1_bottom', 'process4_top'] },
      { uuids: ['process3_bottom', 'process5_top'] },
      { uuids: ['process4_bottom', 'process6_top'] },
      { uuids: ['process5_bottom', 'process2_top'] },
      { uuids: ['process6_bottom', 'process2_top'] }
    ],
    ports: [],
    groups: [
      { id: 'processGroup1', title: 'Process Group 1', left: 800, top: 150 },
      { id: 'processGroup2', title: 'Process Group 2', left: 800, top: 250 },
      { id: 'processGroup3', title: 'Process Group 3', left: 800, top: 350 }
    ]
  };

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) { }

  ngOnInit(): void {
    this.fillFromJson();
  }

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance({
      PaintStyle: { strokeWidth: 2, stroke: '#c9c9c9' },
    });
    console.log(this.jsPlumbInstance.Defaults);

    this.jsPlumbInstance.setContainer('container');
    this.jsPlumbInstance.importDefaults({
      ConnectionsDetachable: false
    });

    for (const edge of this.data.edges) {
      this.jsPlumbInstance.connect({
        source: edge.source,
        target: edge.target,
        endpoint: ['Dot', { radius: 5 }],
        anchors: ['Right', 'Left'],
        overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]
      });
    }
  }

  fillFromJson() {
    this.nodes = this.data.nodes;
    this.connections = this.data.connections;
    this.groups = this.data.groups;
  }

  filterItemsInGroup(group: string) {
    return this.data.nodes.filter(node => node.group && node.group === group);
  }
}
