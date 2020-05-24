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

  data = {
    nodes: [
      {
        id: 'window1',
        name: '1',
        left: 10,
        top: 20,
        group: 'one'
      },
      {
        id: 'window2',
        name: '2',
        left: 140,
        top: 50,
        group: 'one'
      },
      {
        id: 'window3',
        name: '3',
        left: 450,
        top: 50,
        group: 'three'
      },
      {
        id: 'window4',
        name: '4',
        left: 110,
        top: 370,
        group: 'three'
      },
      {
        id: 'window5',
        name: '5',
        left: 140,
        top: 150,
        group: 'one'
      },
      {
        id: 'window6',
        name: '6',
        left: 50,
        top: 50,
        group: 'two'
      },
      {
        id: 'window7',
        name: '7',
        left: 50,
        top: 450,
        group: 'three'
      }
    ],
    edges: [
      {
        source: 'window1',
        target: 'window3',
        data: {}
      },
      {
        source: 'window1',
        target: 'window4',
        data: {}
      },
      {
        source: 'window3',
        target: 'window5',
        data: {}
      },
      {
        source: 'window4',
        target: 'window6',
        data: {}
      },
      {
        source: 'window5',
        target: 'window2',
        data: {}
      },
      {
        source: 'window6',
        target: 'window2',
        data: {}
      }
    ],
    ports: [],
    groups: [
      {
        id: 'one',
        title: 'Group 1',
        left: 100,
        top: 50
      },
      {
        id: 'two',
        title: 'Group 2',
        left: 450,
        top: 250,
        type: 'constrained'
      },
      {
        id: 'three',
        title: 'Group 3',
        left: 450,
        top: 250,
        type: 'constrained'
      }
    ]
  };

  data1 = {
    nodes: [
      {
        id: 'window1',
        name: '1',
        left: 10,
        top: 20,
        group: 'one'
      },
      {
        id: 'window2',
        name: '2',
        left: 140,
        top: 50,
        group: 'one'
      },
      {
        id: 'window3',
        name: '3',
        left: 450,
        top: 50,
        group: 'three'
      },
      {
        id: 'window4',
        name: '4',
        left: 110,
        top: 370,
        group: 'three'
      },
      {
        id: 'window5',
        name: '5',
        left: 140,
        top: 150,
        group: 'one'
      },
      {
        id: 'window6',
        name: '6',
        left: 50,
        top: 50,
        group: 'two'
      },
      {
        id: 'window7',
        name: '7',
        left: 50,
        top: 450,
        group: 'three'
      }
    ],
    connections: [
      {
        uuids: [
          'window1',
          'window3'
        ]
      },
      {
        uuids: [
          'window1',
          'window4',
        ]
      },
      {
        uuids: [
          'window3',
          'window5',
        ]
      },
      {
        uuids: [
          'window4',
          'window6',
        ]
      },
      {
        uuids: [
          'window5',
          'window2',
        ]
      },
      {
        uuids: [
          'window6',
          'window2',
        ]
      }
    ],
    ports: [],
    groups: [
      {
        id: 'one',
        title: 'Group 1',
        left: 100,
        top: 50
      },
      {
        id: 'two',
        title: 'Group 2',
        left: 450,
        top: 250,
        type: 'constrained'
      },
      {
        id: 'three',
        title: 'Group 3',
        left: 450,
        top: 250,
        type: 'constrained'
      }
    ]
  };

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // for (const group of this.data.groups) {
    //   this.groups.set(group.id, new Group(group.id, group.title, group.left, group.top, group?.type));
    // }

    // for (const node of this.data.nodes) {
    //   const g = this.groups.get(node.group);
    //   if (g) {
    //     g.add(new Item(node.id, node.name, node.left, node.top));
    //   }
    // }
    // console.log(this.groups.values());

    this.jsPlumbInstance = jsPlumb.getInstance({});
    console.log(this.jsPlumbInstance.Defaults);

    this.jsPlumbInstance.setContainer('container');
    this.jsPlumbInstance.importDefaults({
      ConnectionsDetachable: false
    });

    // for (const edge of this.data.edges) {
    //   this.jsPlumbInstance.connect({
    //     source: edge.source,
    //     target: edge.target,
    //     endpoint: 'Rectangle',
    //     anchors: ['Right', 'Left']
    //   });
    // }
    this.jsPlumbInstance.connect({ uuids: this.data1.connections.uuids});
  }

  filterItemsInGroup(group: string) {
    return this.data.nodes.filter(node => node.group && node.group === group);
  }
}
