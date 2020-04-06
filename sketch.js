  /*
  SIR Model with P5.js and Graph.js 
  Compiled by Zoltán Kende
  Original idea sources:
  - SIR Modelling on Numberphile by Ben Sparks
      https://www.youtube.com/watch?v=k6nLfCbAzgo&t=737s
  - Modified SIR Modelling by Trefor Bazett
      https://www.youtube.com/watch?v=f1a8JYAixXU&t=123s
  - Basics of the Code by warrentse17
      https://github.com/warrentse17/SIRmodel
  License: MIT
  
  Basic equations:
  S(t)+I(t)+R(t) = N
  S0, I0, R0
  dS/dt = -aSI
  dI/dt = aSI - bI
  dR/dt = rI
  a = Transmission Rate
  b = Recovery Rate
  */
 let sArr;
 let iArr;
 let rArr;
 let N;
 let infect_rate;
 let recov_rate;
 let s;
 let i;
 let r;
 let a;
 let b;
 let Sr;
 let Ir;
 let Rr
 
 let myChart;
 let sarea; //slider area
 let tslider; // slider for time
 let TIME;
 let rslider; // slider for recoveries
 let islider; // slider for infections
 let t; // time in days
 let rtext;
 let ttext;
 let itext;
 let data;
 let labels;
 let ctx;
 let canvas = document.getElementById("myChart");
 ;
 
 function setup() {
 
   
   noCanvas();
   ctx = canvas.getContext('2d')
   ctx.canvas.height = 400;
   ctx.canvas.width = 900;
   myChart = new Chart(ctx, options);
   sarea = createDiv();
   sarea.id('sliders');
   sarea.style('background-color', 'white');
   sarea.style('height', '50px');  
   rtext = createP('');
   rslider = createSlider(0,100, 2, 1); // recovery rate
   rslider.parent('sliders');
   rslider.style('width', '80px');
   rslider.position(40,90);
   rslider.style('position', 'absolute');
   rtext.parent('sliders');
   rtext.style('z-index','1');
   rtext.position(rslider.x-10, rslider.y+5);
   rtext.style('position', 'absolute');
   
   islider = createSlider(0,100, 25, 1); // infection rate
   islider.parent('sliders');
   islider.style('width', '80px');
   islider.position(190,90);
   islider.style('position', 'absolute');
   itext = createP('infection');
   itext.parent('sliders');
   itext.style('z-index','1');
   itext.position(islider.x+20, rslider.y+5);
   itext.style('position', 'absolute');
   
   tslider = createSlider(0, 365, 100, 1); // elpassed time in days
   tslider.parent('sliders');
   tslider.style('width', '80px');
   tslider.position(340,90);
   tslider.style('position', 'absolute');
   ttext = createP('time');
   ttext.parent('sliders');
   ttext.style('z-index','1');
   ttext.position(tslider.x-10, rslider.y+5);
   ttext.style('position', 'absolute');
   ttext.style('font-size', '18');
   
   sArr = options.data.datasets[0].data; // susceptible array
   iArr = options.data.datasets[1].data; // infected array 
   rArr = options.data.datasets[2].data; // recovered array
   //tArr = options.data.datasets[3].data; // recovered array
    
 }    
 
  function draw() {
   
   TIME = tslider.value();
   infect_rate = islider.value();
   recov_rate = rslider.value();
   rtext.html('Recovery rate: ' + Math.round((recov_rate/10 + Number.EPSILON) * 100) / 100);
   ttext.html('Max days: ' + TIME);
   itext.html('R0: '+ Math.round((infect_rate/10 + Number.EPSILON) * 100) / 100);
   myChart.data.labels = Array.from(Array(TIME).keys());
   updateData();
   myChart.update();
   frameRate(18);
 }
     
 
 let options =  //graph options
     
     {
     type: 'line',
     data: {
           labels: [],  //x axis labels 0 to 100,
           datasets: //datasets, every line, bar etc. need separate data
           [
             {
             data: [], //data of the first line
             label: 'Susceptible',
             borderColor: "#3e95cd",
             fill: false
             },
             { 
             data: [], //data of the second line
             label: "Infected",
             borderColor: "#8e5ea2",
             fill: false
             },        
             { 
             data: [], //data of the third line
             label: "Recovered",
             borderColor: "#3cba9f",
             fill: false,
             }
           ]
         },
     options: 
       {
         responsive: false,
         maintainAspectRatio: false,
         title: 
         {
             display: true,
             text: 'SIR Model of Covid-19',
             fontfamily: 'roboto',
             fontSize: 30
         },
         legend: 
         {
             display: true,
             "labels": 
             {
               fontSize: 18,
             }
         },
         tooltips: {
          enabled: false
         },
         scales: 
           {
             yAxes: 
               [
                 {
                 scaleLabel: 
                   {
                     display: true,
                     labelString: 'Population',
                     fontSize: 18
                   },
                 ticks: 
                   {
                     max: 1,
                     min: 0,
                     stepSize: 0.1,
                     fontSize: 12
                   }
                 }
               ],
             xAxes: 
               [
                 {
                 scaleLabel: 
                   {
                     display: true,
                     labelString: 'Elapsed days',
                     fontSize: 18
                   },
                 ticks: 
                   {
                     max: 365,
                     min: 0,
                     stepSize:1,
                     fontSize: 12
                   }
                 }
               ]
          }
       }
   };
 
 
 function updateData () {
 
   N = 1;
   I = 0.01;
   S = N-I;
   R = 0; 
 
 for (t = 0; t < TIME; t++) {
     
     a = infect_rate/100;
     b = recov_rate/100;
   
      s = S/N;	//ratio of susceptible to total
   i = I/N;	//ratio of infected to total
   r = R/N;	//ratio of recovered to total
 
     sArr[t] = s;
     iArr[t] = i;
     rArr[t] = r;
 
   s = sArr[t] - sArr[t]*iArr[t]*a;	//recursive functions
     i = iArr[t] + sArr[t]*iArr[t]*a - iArr[t]*b;
     r = rArr[t] + iArr[t]*b; 
 
   S = s*N;  //set consecutive values for variables
   I = i*N;
   R = r*N;
   
     sRnd = round(sArr[t]*100000)/1000;	//round array value to nearest thousandth
   iRnd = round(iArr[t]*100000)/1000;
   rRnd = round(rArr[t]*100000)/1000;
     
   }
 }
 
 function reset() {														//resets all variables as initial values															
 
     N = 1;
     R = 0;
     
     sArr.length = 182 ;
     iArr.length = 182 ;
     rArr.length = 182 ;
   
   
 }
