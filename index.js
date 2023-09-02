let lista_clientes = [];

function set(){
    let nombre_cliente = document.getElementById("nombre");
    let apellido_cliente = document.getElementById("apellido");
    let email_cliente = document.getElementById("email");
    let password = document.getElementById("password");

    let cliente = {
        nombre: nombre_cliente.value,
        apellido: apellido.value,
        email: email.value,
        password: password.value
    };

    if (nombre_cliente !=='' || apellido_cliente !== '' || email_cliente !== '' || password !== ''){
        // se pushea
        lista_clientes.push(cliente);
    
        // arranca el JSON
        let arr_JSON = JSON.stringify(lista_clientes);

        // set item con localstorage
        localStorage.setItem("nuevo_cliente", arr_JSON);
    }
    else{
        Swal.fire({
            text:"ERROR",
            title: "Los campos no pueden estar vacios",
            icon: "error"
        })
    }

    
}

function login(){
    let nombre_cliente = document.getElementById("nombre");

    let password = document.getElementById("password");

    let recuperacion_clientes = localStorage.getItem("nuevo_cliente")
    //parseo 
    recuperacion_clientes = JSON.parse(recuperacion_clientes);

    for (let cliente of recuperacion_clientes){
        if (nombre_cliente.value == cliente.nombre && password.value == cliente.password){
            document.body.innerHTML = `<body>

                                            <header>
                                                <h1>Procederemos al prestamo</h1>
                                            </header>
                                        
                                            <main id= "main_baticks">
                                                <div class="flexPage2">

                                                    <fieldset>
                                                        
                                                        <p>Ponga el dinero que quiere que le prestemos o coloque "FINALIZAR" para finalizar</p>
                                        
                                                        <div class="mb-3 espaciado" >
                                                            <label id="importe_del_prestamo" class="form-label"> Importe del prestamo</label>
                                                            <input class="form-control" type="text" placeholder="100.000 ARS" id="importe_prestamo">
                                                        </div>
                                        
                                                        <div class="mb-3 espaciado">
                                                            <label class="form-label" >Cantidad de cuotas</label>
                                                            <select class="form-select" name="" id="cuotas">
                                                                <option value="3">3</option>
                                                                <option value="6">6</option>
                                                                <option value="9">9</option>
                                                                <option value="12">12</option>
                                                            </select>
                                                        </div>
                                        
                                                        <button class="cuadradoOpciones" id= boton_calc> Calcular </button>

                                                    </fieldset>

                                                </div>

                                                <div class = "resultados_prestamo" id = "id_resultado_prestamo"> </div>
                                            </main> 

                                        </body>`

                                        let boton_calculo = document.getElementById("boton_calc");

                                        boton_calculo.addEventListener("click", calcular_prestamo);
                                                                        
        }
        else if (nombre_cliente.value == '' ||   password.value == '' || email_cliente == '' || apellido_cliente.value == '' ){
            Swal.fire({
                text:"ERROR",
                title: "Los campos no pueden estar vacios",
                icon: "error"
            })
        }
    }
}

// addEventListener para seguir 
let btn_registro = document.getElementById("btn_registrame");

btn_registro.addEventListener("click", set);

let btn_logueo = document.getElementById("btn_logueame");

btn_logueo.addEventListener("click", login);

let div_agregar = document.getElementById("agregar"); 


// "redireccionamiento" (superposicion del nuevo body creado por baticks)
let datos_del_prestamo = [];

function calcular_prestamo(){
    let numero_importe = document.getElementById("importe_prestamo").value;
    let importe = numero_importe

    if (importe != "FINALIZAR"){
        importe = parseInt(importe);
        let num_cuotas = document.getElementById("cuotas")
        let cuotas = num_cuotas.value;

        //calculo de interes de cuota
        function calc_intereses (importe, cuotas){
            if (cuotas == 3){
                return intereses = importe * .35;
            }
            else if (cuotas == 6) {
                return interes = importe * .55;
            }
            else if (cuotas == 9) {
                return interes = importe * .75;
            }
            else if (cuotas == 12) {
                return interes = importe * 1.20;
            }
            else {
                return false
            }
        }

        let devolver = (importe + calc_intereses(importe, cuotas));

        let cuota_mensual = ((importe + calc_intereses(importe, cuotas)) / cuotas);

        // creacion de obj
        class Prestamo{

            constructor (importe, cuotas, devolver, cuota_mensual){

                this.importe = importe; 

                this.cuotas = cuotas; 

                this.devolver = devolver;

                this.cuota_mensual = parseInt(cuota_mensual)
            }
        }

        let prestamo_nuevo = new Prestamo (importe, cuotas, devolver, cuota_mensual);

        //push al arr 
        datos_del_prestamo.push(prestamo_nuevo);


        //JSON
        let datos_del_prestamoJSON = JSON.stringify(datos_del_prestamo);


        localStorage.setItem("arr_prestamo_datos", datos_del_prestamoJSON);

        
        let recuperando_prestamo = localStorage.getItem("arr_prestamo_datos");


        recuperando_prestamo = JSON.parse(recuperando_prestamo);
    
        


        //bucle 
        for (let i = 0 ; i < recuperando_prestamo.length ; i ++ ){
            
            let main_baticks = document.getElementById("main_baticks");

            let resultados_prestamo = document.getElementById("id_resultado_prestamo")

                    resultados_prestamo.innerHTML =`<p class= "fieldset_baticks">Datos del prestamo</p>

                    <li class= "li_baticks form-control" style="margin: 1px;"><p>Importe a prestar: ${recuperando_prestamo[i].importe}</p></li>

                    <li class= "li_baticks form-control" style="margin: 1px;"><p>En cuotas: ${recuperando_prestamo[i].cuotas}</p></li>

                    <li class= "li_baticks form-control" style="margin: 1px;"><p>Total a devolver: ${recuperando_prestamo[i].devolver}</p></li>

                    <li class= "li_baticks form-control" style="margin: 1px;"><p>Cuota mensual de devolucion: ${recuperando_prestamo[i].cuota_mensual}</p></li>`

            main_baticks.append(resultados_prestamo);
        }
        }
        else{
            document.body.innerHTML = `<p class = prestamos_fabrizio> Gracias por usar prestamos Fabrizio`
        }
    }



//API DE DOLAR/ DOLAR BLUE
 fetch("https://api.bluelytics.com.ar/v2/latest")

    .then(response => response.json()) 

    .then(data => mostrar_data(data))


let mostrar_data = (data)=> {
                    let div = document.createElement("div")
                    
                    div.innerHTML = `<div style = "margin-top: 50px; padding: 0px 0px 0px 0px" >
                                        <div>
                                            <p style="font-size:20px; text-decoration: underline;" >DOLAR OFICIAL</p>

                                            <div style = "display: flex;">
                                                <p style="margin: 0px 20px 0px 0px;">Compra $ ${data.oficial.value_buy}</p>
                                                <p style="margin: 0px;">Venta $ ${data.oficial.value_sell}</p>
                                            </div>
                                        </div>
                                            <br>

                                        <div>
                                            <p style="font-size:20px; text-decoration: underline;" >DOLAR BLUE</p>

                                            <div style = "display: flex;">
                                                <p style="margin: 0px 20px 0px 0px;">Compra $ ${data.blue.value_buy}</p>
                                                <p style="margin: 0px;">Venta $ ${data.blue.value_sell}</p>
                                            </div>
                                        </div>
                                    </div>`

                                     

    document.body.append(div);
}