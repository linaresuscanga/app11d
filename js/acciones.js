//JavaScript Document
$(document).ready(function(e) 
{
 document.addEventListener("deviceready",function()
 {
	 //se crea la base de datos Test es el nombre de la bd, 1.0 es la version y 65535 es el tamañoen bytes
	 var bd = openDatebase ("Test", "1.0", "Base de Prueba", 65535);
	 
	 $("#Crear").bind("click", function (event)
	 {
		 bd.transaction (function (ejecutar)
		 {
			   var sql = "CREATE TABLE Clientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT FULL)";
			   ejecutar.executeSql (sql, undefined, function()
			   {
				      alert("Tabla creada");
			   },error);//executesql
		 });//Ejecutar
	  });//Crear
	  
	  $("#Eliminar").bind("click", function (event)
	  {
		   if (!confirm ("Borrar tabla?", "")) return;
		   transaction.executeSql (sql, undefined,function()
		   {
			   var sql = "DROP TABLE Clientes";
			   transaction.executeSql (sql, undefined,function ()
			   {
			   alert("Tabla Borrada");
		   }, error);//executesql
	  });//transaction
	  });//Eliminar
	  
	  function error (transaction, err) {
		alert ("Error de Base de Datos : " + err.message);
		return false;
	  }//function error
	  
	  $("#Insertar").bind("click", function (event)
	  {
		  var v_nombre = $("#Nombre").val ();
		  var v_apellido =$("#Apellido").val();
		  bd.transaction (function (ejecutar)
		  {
			  var sql ="INSERT INTO Clientes (nimbre, apellido) VALUES (?, ?)";
			  ejecutar.executeSql (sql, [v_nombre, v_apellido], function()
			  {
				  alert ("Cliente agregado");
			  },error);//executesql
		  });// ejecutar
	  }); //insertar
	  
	  $("#Listar").bind("click", function (event)
	  {
		  db.transaction (function (ejecutar)
		  {
			  var sql = "SELECT * FROM Clientes";
			  ejecutar.executeSql (sql, undefined,function (ejecutar, resultado)
			  {
				  var a_html = "<ul>";
				  if (resultado.rows.length)
				  {
					  for (var i = 0; i < resultado.rows.length; i++)
					  {
						  var fila = resultado.rows.item(i);
						  
						  var v_nombre = fila.nombre;
						  var v_apellido = fila.apellido;
						  alert(v_nombre);
						  
						  a_html+= "<li>" + v_nombre + "&nbsp;" + v_apellido + "</li>";
					  }
				  }//if
				  else
				  {
					 a_html += "<li>No hay clientes </li>";
				  }//else
				  a_html += "</ul>";
				  
				 $("#listado").unbind ().bind("pagebeforeshow", function()
				 {
					 
					 //ubicate en el content del listado
					 var $contenido = $("#listado div:jqmData(role=content)");
					 //agrega <ul> <li>.....</ul>
					 $contenido.html (a_html);
					 var $ul = $contenido.find ("ul");
					 //En lugar de viñetas salga en forma de lista
					 $ul-listview ();
				 });//listado
				 $.mobile.changePage ($("#listado"));
			  }, error);//resultado
		  });//ejecutar
	  });//listar
	  
 }, falso);//deviceready					  
});