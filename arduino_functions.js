//arduino functions
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

module.exports = {
  generate_amplitude_function: function (datos) {
    
var param = datos.substr(0,2);

var larg = datos.length-1;
var prim = datos.indexOf('_');
var seg = datos.indexOf('_',prim+1);
var ter = datos.indexOf('_',seg+1);

var angulo = datos.substr(prim+1,seg-prim-1);
var direccion = datos.substr(seg+1,ter-seg-1);

 var rad = angulo*3.1416/180
  
 var value = Math.abs(50*Math.sin(rad).toFixed(2));
 
 return param+'_'+angulo+'_'+direccion+'_'+value+'_\n';
    
  },




funcion_conversion_node_ardu: function(data)
{



data_object = JSON.parse(data);

/// bytes: 1 para el parametro. 2 para el angulo+direccion 1 para el valor 0-100 

// P000l999

var param_string = data_object.inputParam;

//var param_code = String.fromCharCode(param_string);

var angle_string = data_object.inputAngle;

var angle_float = 10*parseFloat(angle_string);

var sign1 ='';

if (angle_float<0) {
	sign1 = 0;
}else {
	sign1 = 1;
}



var angle_float_abs = Math.abs(angle_float);

var angle_out = zeroFill(angle_float_abs,4);

//console.log(angle_out);

var output = param_string+sign1+angle_out+data_object.inputDirection;

//console.log(output);


return output;

},





funcion_conversion_ardu_node: function(datos)
{

var param = datos.substr(0,1);

var signo = datos.substr(1,1);
var angulo = datos.substr(2,4);

var ang_int = parseFloat(angulo)/10;
if (signo == '0') {ang_int = ang_int * (-1.0);}

var direccion = datos.substr(6,1);
var valor = datos.substr(7,4);

var output = {inputParam:param,inputAngle:ang_int,inputDirection:direccion,outputValue:valor};

var output_JSON = JSON.stringify(output);
if (datos.length != 12) {
	
var output_JSON = 'NA';
}


//console.log(output_JSON);

return output_JSON;

}

};

