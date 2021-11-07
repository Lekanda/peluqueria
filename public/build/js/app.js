let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(t.classList.add("ocultar"),e.classList.remove("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar"))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(e){paso<1?paso=1:paso--,mostrarSeccion(),botonesPaginador()}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(e){paso>3?paso=3:paso++,mostrarSeccion(),botonesPaginador()}))}async function consultarAPI(){try{const e="http://127.0.0.1:5000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:n}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$"+n;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServicio(e)},r.appendChild(a),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,n=document.querySelector(`[data-id-servicio = "${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),n.classList.remove("seleccionado")):(cita.servicios=[...o,e],n.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();if([6,0].includes(t))e.target.value="",mostrarAlerta("Sabados y Domingos cerrados","error",".formulario");else{cita.fecha=e.target.value;const t=document.querySelector(".alerta");t&&t.remove()}cita.fecha=e.target.value}))}function mostrarAlerta(e,t,o,n=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta",t),document.querySelector(o).appendChild(c),n&&setTimeout(()=>{c.remove()},3e3)}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];if(t<10||t>18)e.target.value="",mostrarAlerta("Horario no disponible","error",".formulario");else{cita.hora=e.target.value;const t=document.querySelector(".alerta");t&&t.remove()}}))}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(console.log(cita),Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Hacen  falta datos o Servicios","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:n,servicios:a}=cita,c=document.createElement("H3");c.textContent="Resumen de Servicios",e.appendChild(c),a.forEach(t=>{const{id:o,nombre:n,precio:a}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=n;const i=document.createElement("P");i.innerHTML="<span>Precio:</span> €"+a,c.appendChild(r),c.appendChild(i),e.appendChild(c)});const r=document.createElement("H3");r.textContent="Resumen de Cita",e.appendChild(r);const i=document.createElement("P");i.innerHTML="<span>Cliente: </span>"+t;const s=new Date(o),l=s.getMonth(),d=s.getDate(),u=s.getFullYear(),m=new Date(Date.UTC(u,l,d)).toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML="<span>Fecha: </span>"+m;const v=document.createElement("P");v.innerHTML=`<span>Hora: </span>${n} Horas`;const f=document.createElement("BUTTON");f.classList.add("boton","boton-reservar"),f.textContent="Reservar Cita",f.onclick=reservaCita,e.appendChild(i),e.appendChild(p),e.appendChild(v),e.appendChild(f)}async function reservaCita(){const e=new FormData;e.append("nombre","andres");const t=await fetch("http://127.0.0.1:5000/api/citas",{method:"POST",body:e}),o=await t.json();console.log(o)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));