import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef
} from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { NodeComponent } from './node/node.component';
import { Item } from './item';
import { Group } from './group';

@Injectable()
export class NodeService {

  private rootViewContainer: ViewContainerRef;

  jsPlumb = jsPlumb;
  jsPlumbInstance = jsPlumb.getInstance({
    PaintStyle: { strokeWidth: 2, stroke: '#c9c9c9' },
  });

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicNode(node: Item) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (component.instance as any).node = node;
    (component.instance as any).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log('In NodeService..', component.instance);
  }

  public addDynamicGroup(group: Group) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (component.instance as any).node = group;
    (component.instance as any).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log('In NodeService..', component.instance);
  }

  public addConnection(connection) {
    console.log('creating connection:', connection.uuids);
    this.jsPlumbInstance.connect({
      uuids: connection.uuids
    });
  }

  public clear() {
    this.rootViewContainer.clear();
  }
}
