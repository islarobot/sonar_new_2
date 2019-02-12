
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}	

function circumA2circumB(a) {
var f;
if (a>=0) {
	f = a;
}
else {

f = 360+a;

}

	return f;
}


function circumB2circumA(a) {
var f;
if (a>=0 && a<=90) {
	f = a;
}
else {

f = a-360;
//console.log(f);

}


	return f;
}

function draw_basic_lines(id, vl){

//id: id del canvas
//x, y: centro de la circunferencia
//w, h: ancho y alto del rectángulo.
//vl --> .min angulo menor  (convencion 0 norte, 90 este, 180 sur, 270 oeste)
//vl.max --> angulo mayor
//radius: radio de la circunferencia.
//largo pata: largo del indicador del grado
// largo texto: distancia de los números al arco.
// deltax: corrección horizontal de los números negativos 

	//var angledelta = vl.angle;
	
x = vl.x_circum;
y = vl.y_circum;
w = vl.w_square;
h = vl.h_square;
radius = vl.radius_circum;
largopata = vl.largo_pata;
largotexto = vl.largo_texto;
deltax = vl.delta_negativos;
resolucion = vl.resolucion;



	
	var startAngleDeg = vl.min;
	
	var endAngleDeg = vl.max;
	
	var context = id;


   context.beginPath();
	context.rect(0, 0, w, h);
	context.fillStyle = "black";
	context.fill();
   

	var a;
	var b;
   var a1;
   var b1;
   var a2;
   var b2;


   var alfarad;
   var alfadeg;

   startAngleDegR = startAngleDeg - 90;
   if (startAngleDegR < 0){startAngleDegR = 360 + startAngleDegR;}
   endAngleDegR = endAngleDeg - 90;
   if (endAngleDegR < 0){endAngleDegR = 360 + endAngleDegR;}
   var centerAngleDeg = (endAngleDegR + startAngleDegR)/2;
   if (centerAngleDeg*2 < 360){centerAngleDeg = 360 - 2*centerAngleDeg;}



   var startAngle = startAngleDegR * ( Math.PI / 180 );
   var endAngle = endAngleDegR * ( Math.PI / 180 );

      
      
	//context.clearRect(0, 0, w, h);
	
   context.beginPath();

   context.arc(x, y, radius, startAngle, endAngle, false);
   //context.arc(0, 0, 1000, 200, 300, false);
   context.lineWidth = 7;
       
   context.font = "10px Arial";

	
	//dibujo las líneas de los palitos negativos.


	var startAngleDegD = startAngleDeg;	
	var endAngleDegD = endAngleDeg;
	if (endAngleDegD < startAngleDegD) {endAngleDegD = endAngleDegD + 360;}

	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	context.beginPath();
	context.lineWidth = 2;

	for(alfadeg = startAngleDegD;alfadeg<=endAngleDegD;alfadeg = alfadeg + resolucion){

       alfarad = alfadeg * (Math.PI/180);

//        b = y - Math.abs(radius * Math.sin(alfarad));
//			a = x - Math.abs(radius * Math.cos(alfarad));

			b = y - radius * Math.cos(alfarad);
			a = x + radius * Math.sin(alfarad);
		

			
			b1 = b - largopata * Math.cos(alfarad);
			a1 = a + largopata * Math.sin(alfarad);
				
			b2 = b - largotexto * Math.cos(alfarad);
			a2 = a + largotexto * Math.sin(alfarad);
     
     	context.lineWidth = 2;
      context.moveTo(x, y);
      context.lineTo(a1, b1);

		      
      
      
      var alfadeg1t = alfadeg;
      if (alfadeg1t => 360) {alfadeg1t = 360 - alfadeg;}
      if (alfadeg1t < 360) {alfadeg1t = alfadeg - 360;}
      context.fillStyle = '#00FF00';
      context.fillText(alfadeg1t,a2-deltax,b2-2);
	}
	
	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	
	

}
 


function draw_variable_lines(id,stream,stream_angles,vl,a)
	
	{

		if (hasDuplicates(stream_angles)) {
			
			
			
			let unique_angles = new Set();
			for (gg=0;gg<stream_angles.length-1;gg++) {	
			if (!unique_angles.has(stream_angles[gg])) {
			unique_angles.add(stream_angles[gg]);
			
		}
			}
			
			for (gg=stream_angles.length-1;gg>=0;gg--) {	
			if (unique_angles.has(stream_angles[gg])) {
			unique_angles.delete(stream_angles[gg]);
			stream[gg].repeated = 0;
			
		}else {
			stream[gg].repeated = 1;

		}
			}

			//console.log(stream);
		}


		//console.log(stream_angles);
	//console.log(hasDuplicates(stream_angles));

	//console.log(stream.length);
	//console.log('pepe '+stream[stream.length-1].angle);
	//console.log(a)
	//console.log(stream);
	
	//var angulofacil = circumB2circumA(stream[stream.length-1].angle);
	//var angulofacil = stream[stream.length-1].angle;
		
   var ctx = id;	
   
   			
			var color2 = 170;
			var color1 = 230;
			

					//console.log('Angle1: '+stream[stream.length-1].angle);
			for (jj=stream.length-1;jj>=0;jj--) {	

		//console.log('Angle1: '+stream[jj].angle);

		ctx.beginPath();
		var  alfaradf = stream[jj].angle * (Math.PI/180);
		

		
     	var af;
     	var bf;
     	//var a1f;
     	//var b1f;
     	
    

			bf = vl.y_circum - vl.radius_circum * Math.cos(alfaradf);
			af = vl.x_circum + vl.radius_circum * Math.sin(alfaradf);
					
			//console.log(af)					
					
			//b1f = bf - Math.cos(alfaradf);
			//a1f = af + Math.sin(alfaradf);
				     
      ctx.moveTo(vl.x_circum, vl.y_circum);
      	
     
if (!hasDuplicates(stream_angles)) {
      	
      ctx.lineTo(af, bf);
      
   }
   //console.log(stream[jj].value); 
   if (hasDuplicates(stream_angles) && stream[jj].repeated == 0) {
      	//setTimeout(function(){ console.log("STOP") }, 30000);

      ctx.lineTo(af, bf);
      
   }
 ctx.strokeStyle = rgbToHex(0,color2,0);
		color2 = color2 - color2/(vl.num_valores_delay-60);
				color2 = color2.toFixed(0);
				//console.log(color2)
		ctx.stroke();
				ctx.closePath();

		
		
		}
		
		//console.log('Angle2: '+stream[stream.length-1].angle);
for (jj=stream.length-1;jj>=0;jj--) {	

		ctx.beginPath();
		
		
				
		var long_valor = vl.radius_circum * stream[jj].valor / vl.max_amplitude_signal;

		var  alfaradf1 = (stream[jj].angle) * (Math.PI/180);
		
		//console.log('Angle2: '+alfaradf1);
		var af1;
		var bf1;
		var alf;
		var blf;
		
     		bf1 = vl.y_circum - vl.radius_circum * Math.cos(alfaradf1);
			af1 = vl.x_circum + vl.radius_circum * Math.sin(alfaradf1);
    

			blf = vl.y_circum - long_valor * Math.cos(alfaradf1);
			alf = vl.x_circum + long_valor * Math.sin(alfaradf1);
					
			//console.log(af)					
					
			//b1f1 = bf1 - Math.cos(alfaradf1);
			//a1f1 = af1 + Math.sin(alfaradf1);
				     
      //ctx.moveTo(vl.x_circum, vl.y_circum);
   
		ctx.moveTo(alf, blf);

   
      	
if (!hasDuplicates(stream_angles)) {
      	
      ctx.lineTo(af1, bf1);
      
   }
   //console.log(stream[jj].value); 
   if (hasDuplicates(stream_angles) && stream[jj].repeated == 0) {
      	//setTimeout(function(){ console.log("STOP") }, 30000);

      ctx.lineTo(af1, bf1);
      
   }
   	//console.log(color1)
      ctx.strokeStyle = rgbToHex(color1,0,0);
		color1 = color1 - color1/(vl.num_valores_delay-60);
		color1 = color1.toFixed(0);
		ctx.stroke();
		ctx.closePath();
		

		
		}
		//draw_basic_lines(id,vl);
		
		
		
		
		
		
		
	}
	
	
	
	
function getCursorPosition(canvas, event,vl,s,m) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //var x = event.clientX;
    //var y = event.clientY;
    var x_c = vl.x_circum;
    var y_c = vl.y_circum;
    var radius = vl.radius_circum;
    
    var jj = (x-x_c)*(x-x_c) + (y-y_c)*(y-y_c);
    var kk = Math.sqrt(jj);
    

    
    if (Math.abs(kk-radius).toFixed(0)<10) {
    
    var angulo = Math.asin((x-x_c)/kk);
    
    angulo = angulo*57.2958;
    
    if (m == 'manual') {
    	
   
   	s.emit 	
    	
    }
 	}
    
    
    
    
    
    
    
    
}