let paso=1;const pasoInicial=1,pasoFinal=3;function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI()}function mostrarSeccion(){const o=document.querySelector(".mostrar");o&&o.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const a=document.querySelector(".actual");a&&a.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(o=>{o.addEventListener("click",(function(o){paso=parseInt(o.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const o=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(o.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(t.classList.add("ocultar"),o.classList.remove("ocultar")):(o.classList.remove("ocultar"),t.classList.remove("ocultar"))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(o){paso<1?paso=1:paso--,mostrarSeccion(),botonesPaginador()}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(o){paso>3?paso=3:paso++,mostrarSeccion(),botonesPaginador()}))}async function consultarAPI(){try{const o="http://localhost:5000/api/servicios",t=await fetch(o);console.log(t);mostrarServicios(await t.json())}catch(o){console.log(o)}}function mostrarServicios(o){o.forEach(o=>{const{id:t,nombre:a,precio:e}=o})}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));