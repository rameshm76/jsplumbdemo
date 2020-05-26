import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { NodesContainerComponent } from './nodes-container/nodes-container.component';
import { NodeService } from './node.service';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    NodesContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
