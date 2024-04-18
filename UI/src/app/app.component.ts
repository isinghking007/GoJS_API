import { Component, OnInit, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiagramComponent } from './diagram/diagram.component';
import * as go from 'gojs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from './Services/common.service';
import { subscribeOn } from 'rxjs';

export interface LinkModel{
  nodeDataArray:any
  linkDataArray:any
}

export interface NodeDataArrayList{
  id:number,
  loc:string,
  text:string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet, DiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GoJs';
  
  public model = new go.GraphLinksModel();
  constructor(private service:CommonService){

    {
      this.model.nodeKeyProperty = "id"
    }

    
   const nodeDataArray = [
       
    {"id":0, "loc":"512 12", "text":"PLM"},
    {"id":1, "loc":"313 -145", "text":"Real Estate Manager"},
    {"id":2, "loc":"653 -166", "text":"RE Cash Manager"},
    {"id":3, "loc":"160 15", "text":"Eagle Access"},
    {"id":4, "loc":"10 69", "text":"Stress Bed"},
    {"id":5, "loc":"10 -109", "text":"CPPD"},
    {"id":6, "loc":"10 139", "text":"GAI"},
    {"id":7, "loc":"10 169", "text":"CORIC"},
    {"id":8, "loc":"10 209", "text":"PCI"},
    {"id":9, "loc":"10 29", "text":"Troubled Loans"},
    {"id":10, "loc":"10 -69", "text":"FIIG Lib"},
    {"id":11, "loc":"10 -149", "text":"Structured Finance"},
    {"id":12, "loc":"255 100", "text":"PDP"},
    {"id":13, "loc":"255  199", "text":"AEM"},
    {"id":14, "loc":"853 -66", "text":"Treasury"},
    {"id":15, "loc":"133  -199", "text":"Borrower Manager"},
    {"id":16, "loc":"853  -189", "text":"Yardi"},
    {"id":17, "loc":"705 10", "text":"Aladdin"},
    {"id":18, "loc":"785 60", "text":"Beacon"},
    {"id":19, "loc":"753  90", "text":"Business Objects"},
    {"id":20, "loc":"725 120", "text":"IPAS"},
    {"id":21, "loc":"705 150", "text":"Markit EDM"}
     
    ];
    
   const linkDataArray = [
         
    { "from": 0, "to": 1,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 2,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 14,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 15,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 17,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 18,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 19,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 20,  "progress": "true", "text": "Outgoing" },
    { "from": 0, "to": 21,  "progress": "true", "text": "Outgoing" },
    { "from": 2, "to": 1,  "progress": "true", "text": "Incoming" },
    { "from": 14, "to": 2,  "progress": "true", "text": "Outgoing" },
    { "from": 2, "to": 14,  "progress": "true", "text": "Incoming" },
    { "from": 15, "to": 1,  "progress": "true", "text": "Outgoing" },
    { "from": 1, "to": 15,  "progress": "true", "text": "Incoming" },
    { "from": 2, "to": 16,  "progress": "true", "text": "Outgoing" },
    { "from":2, "to":0, "progress":"true","text":"Incoming"},
    { "from": 0, "to": 3,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 4,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 5,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 6,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 7, "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 8,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 9,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 10,  "progress": "true", "text": "Outgoing" },
    { "from": 3, "to": 11, "progress": "true", "text": "Outgoing" },
    { "from": 12, "to": 3,  "progress": "true", "text": "Incoming" },
    { "from": 12, "to": 13,  "progress": "true", "text": "Incoming" },
    { "from": 13, "to": 12, "progress": "true", "text": "Outgoing" }
  ]
  
 // this.model.nodeDataArray = nodeDataArray;
  // this.model.linkDataArray = linkDataArray;
  
}
  ngOnInit(): void {
    this.service.getDemoNodeToArray().subscribe(val=>{
    this.model.nodeDataArray=val;
      console.log("values from the demo node array",val);
    })
   this.service.getNodeDataArray().subscribe(val=>{
   // this.model.nodeDataArray=val;
    console.log("node data array",val);
   })
   this.service.getLinkDataArray().subscribe(val=>{
    this.model.linkDataArray=val;
    console.log("link data array",val);
   })
  }
  
}

