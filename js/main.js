$("document").ready(function() {

    // variables
    var enlace = "";
    var dataString = "";
    var validar =false;
    //Templates
    $('#header_content').load('header.html');
    
// FUNCION NAVEGACION
    var navega = function (enlace) {
            $('#contenido')
                .fadeOut(200)
        var contenido = function(){
            $('#contenido')
                .load(enlace + '#contenido')
                .fadeIn(500);
        }
        setTimeout (contenido, 300);
    }
// Navega sin fade
    var navega2 = function (enlace) {
        $('#contenido').load(enlace + '#contenido');
    }

// Validar campos
    function validarInput(){
    $('input, select').each(function() {
           if(!$(this).val() == "")
           {   
            $(this).parent().parent().removeClass('has-error');
               return false;
            } else {
            $(this).parent().parent().addClass('has-error');
                return true;
                    }
        });
    }
    

// Pagina principal
    
//Registro    
    $('#btn_registro').click(function (e, enlace){
        e.preventDefault();
        enlace ="registro.html";
        navega(enlace)
    });
    
// Usuario registrado
    $('#btn_registrado').click(function (e, enlace){
        e.preventDefault();
        enlace ="entrar.html";
        navega(enlace)
    });

// Registrsrse ////////// AQUI /////////////
    $('#btn_envioregistro').click(function(e){
        e.preventDefault();
        validarInput(validar);
        if (validar == true){
        window.alert('Usuario registrado con exito');
        }
    });

// menu trasnferencia
    $('#btn_trasnferencia').click(function(e, enlace){
        e.preventDefault();
        enlace="transferencia.html";
        navega(enlace);
    });

// Entrar

    $('#btn_entrar').click(function (e, enlace){
    enlace = "entrar.html";
    navega(enlace);
    });

// Login                          
    $('#btn_login').click(function (e, enlace){
    e.preventDefault();

    var user=$('#user').val();
    var password=$('#password').val();
    dataString = 'user='+user+'&password='+password;

    if (user !="" && password !="")
        {
            $.ajax({
                type: 'POST',
                url: '../testajax.php',
                data: dataString,
                cache: false,
                success: function(html){
                    if(html) {
                        enlace ='transferencia.html';
                        navega(enlace)
                        } else {
                        window.alert("Error Usuario o Contraseña invalida");
                        }
                    }
            }); // Fin Ajax
            return false;
        } else {
            $('#user_input').removeClass('has-error');
            $('#password_input').removeClass('has-error');
            if (user == ""){
                $('#user_input').addClass('has-error');
            } 
            if (password == ""){
                $('#password_input').addClass('has-error');
            }
        }
    });
    
 // Open modal recuperar
    $('#btn_recuperar_modal').click(function (e){
        e.preventDefault();
        $('#myModal').modal('show');
    });
    
// Recuperar envia datos
    $('#btn_recuperar').click(function (e){
        e.preventDefault();
        $('#email_input').removeClass('has-error');
        var email = 'email='+$('#email').val();
        if ($('#email').val() != "") 
        {
            $.ajax({
                type: 'POST',
                url: '../recuperar.php',
                data: email,
                cache: false,
                success: function(html){
                    if(html) {
                        confirm("Contraseña enviada a su email");
                        $('#myModal').modal('hide');
                        } else {
                        window.alert("Nuestros registros indican que no existe ninguna direccón de correo asociada a una cuenta.");
                        }
                    }
            }); // Fin Ajax
            return false;    
        } else {
          $('#email_input').addClass('has-error');
        }
    });


// Transferencia
 // conteno 20 caracteres de la cuenta
    var characters = 20;
    var remaining = 0;
    $("#counter").append(characters);
    $("#cuenta").keyup(function(){
        if($(this).val().length > characters){
        $(this).val($(this).val().substr(0, characters));
        }
        
    remaining = characters -  $(this).val().length;
    $("#counter").html(remaining);
        if (remaining==0) {
        $(this).parent().parent().removeClass('has-error');
        }    
    });

    // Revisar Transferencia
    $('#btn_revisartrans').click(function(e, falta){
        e.preventDefault();

        $('input, select').each(function() {
           if(!$(this).val() == "")
           {   
            validar = true;
            $(this).parent().parent().removeClass('has-error');
            } else {
            validar = false;
            $(this).parent().parent().addClass('has-error');
                    }
        });

        
        if (remaining !=0) {
            e.preventDefault();
            window.alert('Debe ingrear los 20 números de la cuenta');
        } else if (validar==true){
            e.preventDefault();    
            var $banco = $('[name=selectbanco]').val();
            var $beneficiario = $('[name=beneficiario]').val();
            var $persona = $('[name=tipodepersona]').val();
            var $cedula = $('[name=cedula]').val();
            var $cuenta = $('[name=cuenta]').val();
            var $monto = $('[name=monto]').val();

            $('#datos_verificar').append('<div id="chkdatos">'+
                                'Banco: '+$banco + '<br>'+
                                'Beneficiario: '+$beneficiario + '<br>' +
                                'Persona: '+$persona + '<br>'+
                                'Cedula: '+$cedula + '<br>'+
                                'Cuenta: '+$cuenta + '<br>'+
                                'Monto: '+$monto + '<br>'+
                                '</div>' );
            dataString = 'banco='+$banco+
                         '&beneficiario='+$beneficiario+
                         '&persona='+$persona+
                         '&cedula='+$cedula+
                         '&cuenta='+$cuenta+
                         '&monto='+$monto;
            $('#myModal').modal('show');
           }
    });
    
    // Editar tranferencia
    $('#btn_editartransferencia').click(function(){
        $('#chkdatos').remove();
    });
    
    // Transferencia
    $('#btn_transferencia').click(function ( ){
        console.log(dataString);
        $.ajax({
            type: 'POST',
            url: '../transferenciaajax.php',
            data: dataString,
            cache: false,
            success: function(html){
                if(html) {
                    $('#myModal').modal('hide');
                    $('#chkdatos').remove();
                    enlace ='enviado.html';
                    window.alert("Transferencia enviada con exito");
                    navega2(enlace)
                    } else {
                    window.alert("Error al enviar los datos");
                    }
                }
        }); // Fin Ajax
        return false;
    });
});










