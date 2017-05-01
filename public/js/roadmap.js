  jsPlumb.ready(function() { 
    var jsp1 = jsPlumb.getInstance({
      Container: "jtk-flow",
      PaintStyle:{strokeWidth: 5, stroke: "#007BA7"},   
      Connector:[ "Flowchart" ],
      Endpoint:[ "Dot", { radius: 8 } ],
      EndpointStyle : { fill: "#007BA7"  },
      Anchors: ["BottomCenter", "TopCenter"],
      ConnectionsDetachable: false//,
      // Overlays: ["Arrow"]
    }); 
 
    var stepsVisible = false;

    var choiceButtons =  Array.prototype.slice.call(document.querySelectorAll(".choice"));
    
    var learningSteps = [
      { id : "step1",
        name:"Interactive Tutorials",
        desc:"Codecademy, Udacity"
      },
      { id : "step2",
          name: "Learn about language and DOM",
          desc: "Eloquent JS, YDKJS"
      },
      { id : "step3", 
        name: "Set up editor, learn Chrome dev tools",
        des: ""
      },
      { id : "step4", 
        name: "Small projects, tutorials",
        desc: "for example 30 JS"
      },
      { id : "step5", 
        name: "Create own projects",
        desc: "e.g. Free Code Camp challenges, or own"
      },
      { id : "step6", 
        name: "Play with frameworks, libraries, look at projects' source code",
        des: "Do in parallel with previous steps"
      },
      { id : "step7", 
        name: "Collaboration on JS101 website",
        desc: "You will need Node and Git"
      },
      { id : "step8", 
        name: "Collaboration on JS101 App",
        desc: "React, Redux, Node, Express"
      },
      { id : "step9", 
        name: "Open Source, Job?",
        desc: ""
      }
    ]

    var step1 = document.getElementById("step1"),
    step3 = document.getElementById("step3"),
    step4 = document.getElementById("step4"),
    step7 = document.getElementById("step7");
    var qProject = document.getElementById("qProject");
    var qProjectText = document.getElementById("qProjectText");
    var mentoring = document.getElementById("mentoring");

    choiceButtons.map(function(button){
      button.addEventListener("click", function(){
        var choice = this.getAttribute("id");
        if(!stepsVisible){
         populateLearningSteps();
        }
        switch(choice){
          case "choice1":
            clearConnections();
            var connect1 = jsp1.connect({
              source: "choice1",
              target: "step1"               
            });              
            step1.style.border = "5px solid #007BA7";
          break;
          case "choice2":
            clearConnections();
            var connect2 = jsp1.connect({
              source: "choice2",
              target: "step3",
              anchors: ["BottomCenter", "RightMiddle"]
            });
            step3.style.border = "5px solid #007BA7";
          break;
          case "choice3":
            clearConnections();
            qProject.classList.remove("hidden");
            qProjectText.classList.remove("hidden");
            jsp1.connect({
            source: "choice3",
            target: "qProject",
            overlays:[ "Arrow"]
            });
            jsp1.connect({
            source: "qProject",
            target: "step4",
            anchors: [[0,0.75,0,1], "RightMiddle"],
            overlays:[ "Arrow", [ "Label", { label:"No", location:0.3, id:"Collab-No" } ]
            ]
            })
            jsp1.connect({
            source: "qProject",
            target: "step7",
            anchors: [[1,0.75,0,1], "RightMiddle"],
            overlays: ["Arrow", ["Label", {label: "Yes", location: 0.4, id: "Collab-Yes"}]]
            })
            step4.style.border = "5px solid #007BA7";
            step7.style.border = "5px solid #007BA7";
          break;
          case "choice4":
            clearConnections();
            mentoring.classList.remove("hidden");
            jsp1.connect({
             source: "choice4",
             target: "mentoring",
             overlays: ["Arrow"]
            });
            jsp1.connect({
             source: "mentoring",
             target: "step7",
             anchors: ["BottomCenter", "RightMiddle"],
             overlays: ["Arrow"]
            });
            jsp1.connect({
             source: "mentoring",
             target: "step8",
             anchors: ["RightMiddle", "RightMiddle"],
             overlays: ["Arrow"]
            });
            step7.style.border = "5px solid #007BA7";
            step8.style.border = "5px solid #007BA7";
          break;
          default:
            clearConnections();
        }
      })
    })

    function clearConnections(){
       jsp1.detachEveryConnection();
       jsp1.deleteEveryEndpoint();
       step1.style.border = "none",
       step3.style.border = "none";
       step4.style.border = "none";
       step7.style.border = "none";
       step8.style.border = "none";
       qProject.classList.add("hidden");
       qProjectText.classList.add("hidden");
       mentoring.classList.add("hidden");
    }

    // jsp1.batch(function(){
    function populateLearningSteps(){
    var flowPanel = document.getElementById("jtk-flow"), devPanel = document.getElementById("jtk-webdev");
    flowPanel.style.height = "1100px";
    devPanel.style.height = "1100px";
    learningSteps.map(function(step, index){     
        var el = document.getElementById(step.id);
        el.classList.add("step");
        var text = document.createElement("span");
        var h4 = document.createElement("h4");
        h4.innerHTML = step.name;
        var spanEl = document.createElement("span");
        if(step.desc !== undefined){spanEl.innerHTML = step.desc;}
        text.appendChild(h4);
        text.appendChild(spanEl);
        el.appendChild(text);
        el.style.left = String(index*40 + 50)+'px';
        el.style.top = String(index*88 + 230)+'px';
      })
      stepsVisible = true;
    }
  });
