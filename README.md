# SIR_model
Basic SIR model in JS

SIR Model with P5.js and Graph.js 

Based on the Wikipedia the SIR model is one of the simplest compartmental models, 
and many models are derivatives of this basic form. The model consists of three compartments: 
S for the number of susceptible, I for the number of infectious, and R for the number of recovered or deceased 
(or immune) individuals. This model is reasonably predictive for infectious diseases which are transmitted from
human to human, and where recovery confers lasting resistance, such as measles, mumps, rubella, and Covid-19.

  Original idea sources:
  - SIR Modelling on Numberphile by Ben Sparks
      https://www.youtube.com/watch?v=k6nLfCbAzgo&t=737s
  - Modified SIR Modelling by Trefor Bazett
      https://www.youtube.com/watch?v=f1a8JYAixXU&t=123s
  - Basics of the Code by warrentse17
      https://github.com/warrentse17/SIRmodel
  <br><br>Licence: MIT
  
  <br>Basic equations:<br>
  S(t)+I(t)+R(t) = N
  S0, I0, R0
  dS/dt = -aSI
  dI/dt = aSI - bI
  dR/dt = rI
  a = Transmission Rate
  b = Recovery Rate
  
  
  <br>Live code on P5 Web Editor: https://editor.p5js.org/corefox01/sketches/EptduXSAd
