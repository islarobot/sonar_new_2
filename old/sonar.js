//FUNCIONES PROYECTO SONAR


function move_progessbar(id,val) {
    				var elem = document.getElementById(id); 
			    	elem.style.width = val + 'px'; 
        		
  } 
  
  
function move_progessbar(id,val,min,max) {
	var elem = document.getElementById(id); 
	var output_value = (val-min) * (100) / (max - min)
  	elem.style.width = output_value + '%'; 
  		
}


function hide_fields_show_values_sonar(vl)
			{
				
			document.getElementById("setvalues_button").innerText="Reset";		
			
			document.getElementById("min").style.display='none';
			document.getElementById('labelmin').innerHTML = vl.min;

			document.getElementById("max").style.display='none';
			document.getElementById('labelmax').innerHTML = vl.max;
	
			document.getElementById("angle").style.display='none';
			document.getElementById('labelangle').innerHTML = vl.angle;		  

			document.getElementById("param").style.display='none';
			document.getElementById('labelparam').innerHTML = vl.param;		  


			}
			
function show_fields_hide_values_sonar(vl)
			{
				
			document.getElementById("setvalues_button").innerText="Set Values";		
			
			document.getElementById("min").style.display='initial';
			document.getElementById('labelmin').innerHTML = '';
			document.getElementById('min').value = vl.min;
			
			document.getElementById("max").style.display='initial';
			document.getElementById('labelmax').innerHTML = '';
			document.getElementById('max').value = vl.max;

			document.getElementById("angle").style.display='initial';
			document.getElementById('labelangle').innerHTML = '';
			document.getElementById('angle').value = vl.angle;

			document.getElementById("param").style.display='initial';
			document.getElementById('labelparam').innerHTML = '';
			document.getElementById('param').value = vl.param;


			}


function press_button_sonar(vl){
				

			
			if (vl.state == "set") {
				
			
			//min
			var min_local = document.getElementById("min").value;
			vl.min = parseInt(min_local);		
			
			//max
			var max_local = document.getElementById("max").value;
			vl.max = parseInt(max_local);	
			
			//angle
			var angle_local = document.getElementById("angle").value;
			vl.angle = parseInt(angle_local);	
			
			//param
			var param_local = document.getElementById("param").value;
			vl.param = param_local;	
			
			//freq
			var freq_local = document.getElementById("freq").value;
			vl.freq = parseInt(freq_local);	
			
			//speed
			var speed_local = document.getElementById("speed").value;
			vl.speed = parseInt(speed_local);	
			
	
		
			
			hide_fields_show_values_sonar(vl)
			vl.state = "reset";
			
			
			
			}else {
				
			show_fields_hide_values_sonar(vl);	
			vl.state = "set";
				
			}
			
						
			
			}




function drawmarcas_sonar(id, x, y, w, h, vl, radius, largopata, largotexto, deltax, resolucion, angle, direc,contact,ashow){

//id: id del canvas
//x, y: centro de la circunferencia
//w, h: ancho y alto del rectángulo.
//start/end angle deg: ángulo en grados de comienzo y de fin. convención: el 0 en el norte.
//radius: radio de la circunferencia.
//largo pata: largo del indicador del grado
// largo texto: distancia de los números al arco.
// deltax: corrección horizontal de los números negativos 

	var angledelta = vl.angle;
	

	

	
	var startAngleDeg = 360 - angledelta;
	var endAngleDeg = angledelta;
	
	//var startAngleDeg = 315;
	//var endAngleDeg = 45;
	

	var canvas = document.getElementById(id);

	canvas.width  = w;
	canvas.height = h;
	
	
   var context = canvas.getContext('2d');
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
   context.lineWidth = 2;
       
   context.font = "10px Arial";

	
	//dibujo las líneas de los palitos negativos.


	var startAngleDegD = startAngleDeg;	
	var endAngleDegD = endAngleDeg;
	if (endAngleDegD < startAngleDegD) {endAngleDegD = endAngleDegD + 360;}



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
     
      context.moveTo(x, y);
      context.lineTo(a1, b1);

		      
      
      
      var alfadeg1t = alfadeg;
      if (alfadeg1t => 360) {alfadeg1t = 360 - alfadeg;}
      if (alfadeg1t < 360) {alfadeg1t = alfadeg - 360;}
      context.fillStyle = '#00FF00';
      context.fillText(alfadeg1t,a2-deltax,b2-2);
	}
	
	
//dibujo las lineas de la variable angle.


	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	
	draw_variable_lines(angle,context,x,y,radius,direc,contact,ashow);
	



	context.font="20px Arial";
	context.fillStyle = 'white';
	context.fillText('Angle: '+angle,10,20);
	context.fillText('Direction: '+direc,10,40);	
	context.fillText('Value: '+ashow,10,60);	
		
	//context.fillText('Value: '+z.toFixed(2),10,20);		
	
	//context.strokeStyle = '#00FF00';
	
	
	

	}
	
	
	
	function draw_variable_lines(aa,ctx,x1,y1,r,d,c,s)
	
	{
			
		ctx.beginPath();

		var kk = 255;
		var dd = 0.3;
     var  alfaradf = aa * (Math.PI/180);
     var af;
     var bf;
     var a1f;
     var b1f;
     

//        b = y - Math.abs(radius * Math.sin(alfarad));
//			a = x - Math.abs(radius * Math.cos(alfarad));

			bf = y1 - r * Math.cos(alfaradf);
			af = x1 + r * Math.sin(alfaradf);
					
			b1f = bf - Math.cos(alfaradf);
			a1f = af + Math.sin(alfaradf);
				     
      ctx.moveTo(x1, y1);
      ctx.lineTo(a1f, b1f);

		ctx.strokeStyle = rgbToHex(0,255,0);
		ctx.stroke();

		

		if (d == 'r') {

		for (jj = 1;jj<kk;jj++) {	
		
			
			angdecim = aa - jj * (dd)
			
			if (angdecim < -90) {
				angdecim = 180 - angdecim
			}
			
		   alfaradf = angdecim * (Math.PI/180);
		   
		   

			bf = y1 - r * Math.cos(alfaradf);
			af = x1 + r * Math.sin(alfaradf);
					
			b1f = bf - Math.cos(alfaradf);
			a1f = af + Math.sin(alfaradf);
		ctx.beginPath();		     
      ctx.moveTo(x1, y1);
      ctx.lineTo(a1f, b1f);
		ctx.strokeStyle = rgbToHex(0,(255/kk)*(kk-jj),0);
		ctx.stroke();
		
		}	
	
		}else {
	
			for (jj = 1;jj<kk;jj++) {	
		
			angdecim = aa + jj * (dd)
			
			
			if (angdecim > 90) {
				angdecim = 90 - (angdecim - 90)
			}		
		
		
		   alfaradf = angdecim * (Math.PI/180);
			
				//console.log(angdecim + ' - ' + alfaradf)		
				
			bf = y1 - r * Math.cos(alfaradf);
			af = x1 + r * Math.sin(alfaradf);
					
			b1f = bf - Math.cos(alfaradf);
			a1f = af + Math.sin(alfaradf);
				     ctx.beginPath();
      	ctx.moveTo(x1, y1);
      	ctx.lineTo(a1f, b1f);
			ctx.strokeStyle = rgbToHex(0,(255/kk)*(kk-jj),0);
			ctx.stroke();
			}
			}	
			
		var hh=7;
		var gh=0.3
		var yu=0;
		var bn = 120;
		
		
			
		if (d == 'r') {		
			

			for(key in c){
				
				
				//console.log(c)
			for (ee = 0;ee<hh;ee++) {
		value = c[key];
		value = value/1024
		
		
		
		
		angdecim_a = parseFloat(key) + ee*gh
		
		yu = Math.floor(255 * (1 - (aa - angdecim_a)/bn));
		if (yu < 0) {yu == 0;}
		//console.log(angdecim_a)
		
	
		
		 alfaradf_a = angdecim_a * (Math.PI/180);
		   
		  // alert(key)

			bf = y1 - r * Math.cos(alfaradf_a);
			af = x1 + r * Math.sin(alfaradf_a);
					
			b1f = y1 - r*value*Math.cos(alfaradf_a);
			a1f = x1 + r*value*Math.sin(alfaradf_a);
			
			
		ctx.beginPath();		     
      ctx.moveTo(a1f, b1f);
      ctx.lineTo(af, bf);
      
		ctx.strokeStyle = rgbToHex(yu,0,0);
		ctx.stroke();
		
		}
		}
		
	
	}else{
	
	for(key in c){
		for (ee = 0;ee<hh;ee++) {
		value = c[key];
		value = value/1024
		//console.log('---'+value)
		
		angdecim_a = parseFloat(key) + ee*gh;
		
		yu = Math.floor(255 * (1 - (angdecim_a - aa)/bn));
		if (yu < 0) {yu == 0;}
		//console.log(angdecim_a)
		
		 alfaradf_a = angdecim_a * (Math.PI/180);
		   
		   

			bf = y1 - r * Math.cos(alfaradf_a);
			af = x1 + r * Math.sin(alfaradf_a);
					
			b1f = y1 - r*value*Math.cos(alfaradf_a);
			a1f = x1 + r*value*Math.sin(alfaradf_a);
			
		ctx.beginPath();		     
      ctx.moveTo(a1f, b1f);
      ctx.lineTo(af, bf);
      
		ctx.strokeStyle = rgbToHex(yu,0,0);
		ctx.stroke();
		
		
		}
		}
	
	
	}	
		
	}
	
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}	
	
	
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function generateOutputs(s,min,max,speed)
{

max1 = (1024*max)/180
min1 = (1024*min)/180 	
speed1 = (1024*speed)/180

if(juan < max1 && a==0){ juan = juan + speed1;}
if(juan >= max1){ a = 1;}
if(juan >= min1 && a == 1){ juan = juan - speed1;}
if(juan <= min1){ a = 0;}

juan = Math.floor(juan)

msg_angle = {

param:"Angle",
angle_value:juan,

}


s.emit('send_info',JSON.stringify(msg_angle));
//console.log(JSON.stringify(msg_angle))
   
}
	