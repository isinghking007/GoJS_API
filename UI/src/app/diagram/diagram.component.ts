import { MapType, TypeModifier } from '@angular/compiler';
import { Component, OnInit} from '@angular/core';
import {Input, ElementRef, EventEmitter, IterableDiffers, KeyValueDiffers, NgZone,AfterViewInit } from '@angular/core';
import * as go from 'gojs';
import { AppComponent } from '../app.component';

import { CommonService } from '../Services/common.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
export interface linkArray{
  from:number,
  to:number,
  progress:string,
  text:string,
  __gohashid:string
}

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})

export class DiagramComponent implements AfterViewInit,OnInit {
  data:string="";
  linkdata:linkArray[]=[];
addNodeDetails:any;
diagramModel!: go.GraphLinksModel;  
saveDetails(){
    console.log("from savedetails");
  }

  constructor(private service:CommonService) { }
  ngOnInit() {
    //this.service.getDemo().subscribe(val=>console.log(val.toString()))
  }
  load()
  {
    console.log("from load method");
  }
   save(){
    console.log("from save method")

    // this.data=JSON.stringify(this.diagramModel.nodeDataArray);
    // this.linkdata=JSON.stringify(this.diagramModel.linkDataArray);
    let newdata=this.diagramModel.nodeDataArray;
    let linknewdata=this.diagramModel.linkDataArray;
    console.log("passing values through api now");
    let nodeDataArray: any[] = this.diagramModel.nodeDataArray as any[];
   // let linkDataArray:any[]=this.diagramModel.linkDataArray as any[];
    let linkDataArray = this.diagramModel.linkDataArray as any[];

    // Convert __gohashid values to strings
    linkDataArray.forEach(link => {
      
       link.__gohashid = link.__gohashid.toString();
      
    });

  //  for(let data of linkDataArray)
  //  {
  //   let newData:linkArray={
  //     from:data.from,
  //     to:data.to,
  //     progress:data.progress,
  //     text:data.text,
  //     __gohashid:data.__gohashid.toString()
  //   }
  //   this.linkdata.push(newData);
  // }
    console.log("link data -->",this.linkdata);
    this.service.addWorkingNodeArray(nodeDataArray).subscribe( response => {
    console.log('Data sent successfully:', response);
  },
  error => {
    console.error('Error sending data:', error);
    })
    console.log("link data array",linkDataArray);
    console.log("add link array method")
    this.service.addLinkArray(linkDataArray).subscribe(response => {
      console.log('Data sent successfully from link1:', response);
    },
    (error: HttpErrorResponse) => {
      if (error.status === 400) {
        console.error('Validation errors occurred:', error.error);
        // Display error messages to the user based on the error.error object
      } else {
        console.error('Error sending data:', error.message);
        // Handle other types of errors
      }
    })
    console.log("add link to node method");
    this.service.addLinkToNode(linkDataArray).subscribe(response => {
      console.log('Data sent successfully from link:', response);
    },
    error => {
      console.error('Error sending data from link:', error);
    });
  }

  ngAfterViewInit() {
    this.initDiagram();
  }
  @Input()
  public model:go.GraphLinksModel = new go.GraphLinksModel;
  public initDiagram(): go.Diagram{
    const $ = go.GraphObject.make;

    const roundedRectangleParams = {
      parameter1: 2, // corner size
      spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight // corner spots
    };
 
    const diagram = $(go.Diagram, "myDiagramDiv", {
      "animationManager.initialAnimationStyle": go.AnimationManager.None,
      "InitialAnimationStarting": (e:any) => {
        const animation = e.subject.defaultAnimation;
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 900;
        animation.add(e.diagram, 'scale', 8.1, 1);
        animation.add(e.diagram, 'opacity', 0, 1);
      },
    //  "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      "clickCreatingTool.archetypeNodeData": { text: "new node" },
      "undoManager.isEnabled": true,
      "positionComputation": (diagram:go.Diagram, pt:any) => {
        return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
      },
    }
    );
    diagram.addDiagramListener("Modified", function(e) {
      const button = document.getElementById("SaveButton") as HTMLInputElement;
      console.log(button);
      if (button) button.disabled = !diagram.isModified;
      let idx = document.title.indexOf("*");
      if (diagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });
    const highlightColor="red";
      const backcolor="black";
      function onMouseEnter (e: any, node: any){
        node.diagram.clearHighlighteds();
        node.linksConnected.each((l: any) => highlightLink(l, true));
        node.isHighlighted = true;
        const tb = node.findObject("TEXTBLOCK");
        if (tb !== null) tb.stroke = highlightColor;
      };
      function onMouseLeave (e: any,node:any){
        ; // Assuming 'node' is accessible here
        node.diagram.clearHighlighteds();
        node.linksConnected.each((l: any) => highlightLink(l, false));
        node.isHighlighted = false;
        const tb = node.findObject("TEXTBLOCK");
        if (tb !== null) {
            tb.stroke = backcolor;
        }
    };
    
        diagram.nodeTemplate =
      $(go.Node, "Auto",
    
        { locationSpot: go.Spot.Top },
        { isShadowed: true, shadowBlur: 1, shadowOffset: new go.Point(0, 1), shadowColor: "rgba(0, 0, 0, .14)" },
        {
          mouseEnter: onMouseEnter,
          mouseLeave: onMouseLeave
        },
    
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
     
        $(go.Shape, "RoundedRectangle", roundedRectangleParams,
          { name: "SHAPE", fill: "#ffffff", strokeWidth: 8, stroke: null, portId: "" },
          { fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true },
          { toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true },
          { cursor: "pointer" }),
 
        $(go.TextBlock,
          { margin: 7, font: "bold small-caps 11pt helvetica, bold arial, sans-serif", stroke: "rgba(0, 0, 0, 87)", editable: true },
          new go.Binding("text").makeTwoWay())
      );
      
    
      function highlightLink(link:any, show:any) {
        link.isHighlighted = show;
        link.fromNode.isHighlighted = show;
        link.toNode.isHighlighted = show;
        
      }
      
      diagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          $(go.Shape, "RoundedRectangle", roundedRectangleParams, { fill: null, stroke: "#7986cb", strokeWidth: 3 }),
          $(go.Placeholder) // a Placeholder sizes itself to the selected Node
        ),
        // the button to create a "next" node, at the top-right corner
        // Buttons to create a new node in different directions
        $("Button",
            {
                alignment: go.Spot.TopRight,
                click: function(e, obj) { addNodeAndLink(e, obj, "right"); } // Add node to the right
            },
            $(go.Shape, "PlusLine", { width: 6, height: 6 })
        ),
        $("Button",
            {
                alignment: go.Spot.Top,
                click: function(e, obj) { addNodeAndLink(e, obj, "top"); } // Add node above
            },
            $(go.Shape, "PlusLine", { width: 6, height: 6, angle: 90 })
        ),
        $("Button",
            {
                alignment: go.Spot.TopLeft,
                click: function(e, obj) { addNodeAndLink(e, obj, "left"); } // Add node to the left
            },
            $(go.Shape, "PlusLine", { width: 6, height: 6, angle: 180 })
        ),
        $("Button",
            {
                alignment: go.Spot.Left,
                click: function(e, obj) { addNodeAndLink(e, obj, "bottom"); } // Add node below
            },
            $(go.Shape, "PlusLine", { width: 6, height: 6, angle: 270 })
        )
     
      );
      diagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Circle",
          {
            fill: "#52ce60", /* green */
            stroke: null,
            portId: "",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          }),
        $(go.TextBlock, "Start",
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );
    diagram.nodeTemplateMap.add("End",
    $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Circle",
        {
          fill: "maroon",
          stroke: null,
          portId: "",
          fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
          toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
          cursor: "pointer"
        }),
      $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
      $(go.TextBlock, "End",
        {
          font: "bold 16pt helvetica, bold arial, sans-serif",
          stroke: "whitesmoke"
        })
    )
  );
  
  function addNodeAndLink(e:any, obj:any, direction:any) {
    var adornment = obj.part;
    var diagram = e.diagram;
    diagram.startTransaction("Add State");

    // get the node data for which the user clicked the button
    var fromNode = adornment.adornedPart;
    var fromData = fromNode.data;

    // Calculate position for the new node based on the direction
    var newPosition = fromNode.location.copy();
    switch (direction) {
        case "right":
            newPosition.x += 200;
            break;
        case "left":
            newPosition.x -= 200;
            break;
        case "top":
            newPosition.y -= 200;
            break;
        case "bottom":
            newPosition.y += 200;
            break;
    }

    // Create new node data
    var toData = { text: "New Node", loc: go.Point.stringify(newPosition) };
    // add the new node data to the model
    var model = diagram.model;
    model.addNodeData(toData);

    // Create a link data from the old node data to the new node data based on the direction
    var linkdata;
    if (direction === "left" || direction === "top") {
        linkdata = {
            from: model.getKeyForNodeData(toData),
            to: model.getKeyForNodeData(fromData),
            text: "Outgoing"
        };
    } else {
        linkdata = {
            from: model.getKeyForNodeData(fromData),
            to: model.getKeyForNodeData(toData),
            text: "Outgoing"
        };
    }
    // Add the link data to the model
    model.addLinkData(linkdata);

    // Select the new Node
    var newnode = diagram.findNodeForData(toData);
    diagram.select(newnode);

    diagram.commitTransaction("Add State");

    // If the new node is off-screen, scroll the diagram to show the new node
    diagram.scrollToRect(newnode.actualBounds);
}


      // replace the default Link template in the linkTemplateMap
      diagram.linkTemplate =
        $(go.Link,  // the whole link panel
          {
            curve: go.Link.Bezier,
            adjusting: go.Link.Stretch,
            reshapable: true, relinkableFrom: true, relinkableTo: true,
            toShortLength: 3,
            mouseEnter: (e, link) => highlightLink(link, true),
            mouseLeave: (e, link) => highlightLink(link, false)
          },
          new go.Binding("points").makeTwoWay(),
          new go.Binding("curviness"),
          $(go.Shape,  // the link shape
            { strokeWidth: 1.5 },
            new go.Binding("stroke", "isHighlighted",
                           (h, shape) => h ? highlightColor : "green")
              .ofObject(),
              new go.Binding("strokeWidth", "isHighlighted",
                           h => h ? 2 : 1)
              .ofObject(),
            new go.Binding('stroke', 'progress', progress => progress ? "#52ce60" /* green */ : 'black'),
            new go.Binding('strokeWidth', 'progress', progress => progress ? 2.5 : 1.5)),
          $(go.Shape,  // the arrowhead
            { toArrow: "standard", stroke: null },
            new go.Binding('fill', 'progress', progress => progress ? "#52ce60" /* green */ : 'black')),
          $(go.Panel, "Auto",
            $(go.Shape,  // the label background, which becomes transparent around the edges
              {
                fill: $(go.Brush, "Radial",
                  { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
                stroke: null
              }),
            $(go.TextBlock, "transition",  // the label text
              {
                textAlign: "center",
                font: "9pt helvetica, arial, sans-serif",
                margin: 4,
                editable: true  // enable in-place editing
              },
              // editing the text automatically updates the model data
              
              new go.Binding("text").makeTwoWay())
              
          )
        );
   
      
      diagram.model = this.model;
      this.diagramModel=this.model;
    //  this.save(diagram.model);
   //   this.addNodeDetails(diagram.model);
   this.load();
            return diagram;
    
  }
  
}


