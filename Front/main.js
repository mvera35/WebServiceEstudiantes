
const registro = {
  props: {
    titulo: String,
    tipo: Boolean
  },
  template:`
  <div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{titulo}}</h4>
        </div>
        <div class="modal-body">
          <div v-if="tipo">
            <h5>Matrícula</h5>
            <textarea id="matricula" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Apellido Paterno</h5>
            <textarea id="paterno" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Apellido Materno</h5>
            <textarea id="materno" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Nombre</h5>
            <textarea id="nombre" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Semestre Ingreso</h5>
            <textarea id="semestre" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Creditos Cursados</h5>
            <textarea id="creditos" name="textarea" rows="1" cols="35" required></textarea>
          </div>
          <div v-else>
            <h5>Clave</h5>
            <textarea id="clase" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Nombre</h5>
            <textarea id="nombreCurso" name="textarea" rows="1" cols="35" required></textarea>
            <h5>Creditos</h5>
            <textarea id="creditos" name="textarea" rows="1" cols="35" required></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="entendido">Registrar</button>
          <button type="button" class="btn btn-secondary" @click="cancelado">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  `,
  methods: {
      entendido: function () {
            let aux,direccion;
            if(this.tipo){
              aux={
                matricula: document.getElementById("matricula").value,
                aMaterno: document.getElementById("materno").value,
                aPaterno: document.getElementById("paterno").value,
                nombre: document.getElementById("nombre").value,
                semestreIngreso: document.getElementById("semestre").value,
                creditosCursados: document.getElementById("paterno").value
              }
              direccion="estudiantes";
            }
            else{
              aux ={
                clave: document.getElementById("clase").value,
                nombre: document.getElementById("nombreCurso").value,
                creditos: document.getElementById("creditos").value,
              }
              direccion="cursos"
          }
          fetch(`http://localhost:4000/${direccion}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(aux)
          })
          .then(response=>{return response.text();})
          .then(res =>{console.log(res);})
          .catch(error=>{console.log(error);})

          this.$emit('registradoTerminado');
      },
      cancelado: function () {
          this.$emit('cancelarRegistro');
      }
  },
}

const inscribirCurso = {
    props: {
        titulo: String
    },
    template:`
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
      </div>
      <div class="modal-body">
        <h5>Clave de Curso</h5>
        <textarea id="claveCurso" name="textarea" rows="1" cols="35" required></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendido">Ok</button>
        <button type="button" class="btn btn-secondary" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>
`,
    methods: {
        entendido: function () {
          let aux = document.getElementById("claveCurso").value;
          console.log("valor: "+document.getElementById("claveCurso").value);
          this.$emit('entendido',aux);

        },
        cancelado: function () {
            this.$emit('cancelado');

        }
    }
}

const alerta = {
    props: {
        titulo: String
    },
    template:`
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
      </div>
      <div class="modal-body">
        <p><slot></slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendido">Ok</button>
        <button type="button" class="btn btn-secondary" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>
`,
    methods: {
        entendido: function () {
            this.$emit('entendido');

        },
        cancelado: function () {
            this.$emit('cancelado');

        }
    },
}

const tablas = {
  data: function(){
    return {
      estudiantes: [],
      cursos:[],
      registro:false,
      sigAlerta:false,
      registroCurso:false,
      eliminarCurso: false,
      bajaAlumno: false,
      inscribir: false,
      est: 0,
      clv: 0,
      bajaCurso: false
    }
  },
  components:{
    alerta: alerta,
    registro: registro,
    inscribirCurso: inscribirCurso
  }
  ,
  methods:{
    almacenarDatos: function(datos,relacion){
      let aux
      datos.forEach(item => {
        item["cursos"] = [];
        relacion.forEach(curso => {
          fetch(`http://localhost:4000/cursos/${curso.clave}/lista`)
          .then(response => {
            return response.json();
          })
          .then(rel => {
            rel.forEach(r => {
              if(r.matricula_estudiante == item.matricula){
                fetch(`http://localhost:4000/cursos/${r.clave_curso}`)
                .then(res=>{
                  return res.json();
                })
                .then(cur => {
                  item.cursos.push(cur.nombre);
                });
              }
            });
          })
        });
      });

      this.estudiantes = datos;
    },
    almacenarCursos: function(datos){
      let nombre;
      datos.forEach(item => {
        item["estudiantes"] = [];
        item["matriculas"] = [];
        fetch(`http://localhost:4000/cursos/${item.clave}/lista`)
        .then(response => {
          return response.json();
        })
        .then(relacion => {
          relacion.forEach(r => {
            fetch(`http://localhost:4000/estudiantes/${r.matricula_estudiante}`)
            .then(estudiantes => {
              return estudiantes.json();
            })
            .then(estud => {
              nombre = estud.aPaterno + " " + estud.aMaterno + " " + estud.nombre;
              item.estudiantes.push(nombre);
              item.matriculas.push(estud.matricula);
            })
          });

        })
      });

      this.cursos = datos;
    },
    actualizar: function(){
      this.registroCurso=false;
      location.reload();
    },
    eliminar: function(tipo,id){
      fetch(`http://localhost:4000/${tipo}/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response=>{return response.text();})
      .then(res =>{console.log(res);})
      .catch(error=>{console.log(error);})

    },
    inscribirAlumno: function(idcurso){
      fetch(`http://localhost:4000/estudiantes/${this.est}/inscribir/${idcurso}`,{
        method: 'POST',
      })
      .then(response=>{return response.text();})
      .then(res =>{console.log(res);})
      .catch(error=>{console.log(error);})
    },
    darBajaCurso: function(){
      let salir=true,aux,cursoClave;
      console.log(this.est);
      console.log(this.cursos);

      this.cursos.forEach((item, i) => {
        if(item.nombre === this.clv){
          cursoClave = item.clave;
        }
      });

      fetch(`http://localhost:4000/estudiantes/${this.est.matricula}/inscribir/${cursoClave}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response=>{return response.text();})
      .then(res =>{console.log(res);})
      .catch(error=>{console.log(error);})
    }
  },
  mounted:
    function() {
      let aux;
      fetch("http://localhost:4000/cursos")
      .then(response =>{
        return response.json();
      })
      .then(datos =>{
        this.almacenarCursos(datos);

        fetch("http://localhost:4000/estudiantes")
        .then(res =>{
          return res.json();
        })
        .then(d =>{
          this.almacenarDatos(d,datos);
        })
      })
  },
  template:`
  <div>
      <alerta v-if="sigAlerta" @entendido="sigAlerta=false"
      @cancelado="sigAlerta=false">Desea Elimnar?</alerta>

      <alerta v-if="bajaCurso" @entendido="darBajaCurso(),bajaCurso=false,this.location.reload()"
      @cancelado="bajaCurso=false">Desea Elimnar?</alerta>

      <inscribirCurso v-if="inscribir"
      @entendido="inscribirAlumno($event),inscribir=false,this.location.reload()"
      @cancelado="inscribir=false">
      </inscribirCurso>

      <registro v-if="registro" v-bind:tipo="true"
      @cancelarRegistro="registro=false"
      @registradoTerminado="registro=false,
      this.location.reload()"
      v-on:registro="false" titulo="Registro de Alumnos">
      </registro>

      <registro v-if="registroCurso" v-bind:tipo="false"
      @cancelarRegistro="registroCurso=false"
      @registradoTerminado="actualizar"
      titulo="Registro de Cursos">
      </registro>

      <h1 style="text-align: center">Estudiantes</h1>
      <table id="estudiantes" class="table table-hover table-bordered ">
        <thead>
          <tr class="bg-primary">
            <th style="text-align: center">Matrícula</th>
            <th style="text-align: center">Apellido Paterno</th>
            <th style="text-align: center">Apellido Materno</th>
            <th style="text-align: center">Nombre(s)</th>
            <th style="text-align: center">Semestre Ingreso</th>
            <th style="text-align: center">Creditos Cursados</th>
            <th style="text-align: center">Cursos Inscritos</th>
            <th style="text-align: center">
              <button title="Agregar alumno" type="button" class="btn btn-info"
              @click="registro=true">
                <span class="glyphicon glyphicon-plus-sign"></span>
              </button>
            </th>
            </tr>
          </tr>
          <tr v-for="(estudiante) in estudiantes" class="info">
            <td >{{ estudiante.matricula }}</td>
            <td>{{ estudiante.aPaterno }}</td>
            <td>{{ estudiante.aMaterno }}</td>
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.semestreIngreso }}</td>
            <td>{{ estudiante.creditosCursados }}</td>
            <td style="text-align: right">
            <button title="Inscribir en curso" type="button"
            @click="inscribir=true,est=estudiante.matricula">
              <span class="glyphicon glyphicon-plus-sign"></span>
            </button>
              <template v-if="estudiante.cursos.length>0">

                  <p v-for= "(cursos) in estudiante.cursos">
                    {{ cursos }}
                    <button title="Dar de baja materia"
                     @click="bajaCurso=true,clv=cursos,est=estudiante">
                      <span class="glyphicon glyphicon-remove-circle"></span>
                    </button>
                  </p>
              </template>
              <template v-else>
                <button title="Dar de baja alumno" @click="bajaAlumno=true">
                  <span class="glyphicon glyphicon-remove-sign"></span>
                </button>
                <alerta v-if="bajaAlumno"
                @entendido="eliminar('estudiantes',estudiante.matricula),this.location.reload()"
                @cancelado="bajaAlumno=false">Desea eliminar el estudiante?</alerta>
              </template>
            </td>
          </tr>
        </thead>
      </table>

        <h1 style="text-align: center">Cursos</h1>
        <table id="cursos" class="table table-hover table-bordered ">
          <tr class="bg-primary">
            <th style="text-align: center">Clave</th>
            <th style="text-align: center">Nombre</th>
            <th style="text-align: center">Creditos</th>
            <th style="text-align: center">Estudiantes</th>
            <th style="text-align: center">
              <button title="Agregar Materia" type="button" class="btn btn-info"
               @click="registroCurso=true">
                <span class="glyphicon glyphicon-plus-sign"></span>
              </button>
            </th>
            </tr>
          <tr v-for="(curso) in cursos" class="bg-info" >
            <td>{{ curso.clave }}</td>
            <td>{{ curso.nombre }}</td>
            <td>{{ curso.creditos }}</td>
            <td>
              <template v-if="curso.estudiantes.length>0">
                <p v-for= "(estudiantes) in curso.estudiantes">
                  {{ estudiantes }}
                </p>
              </template>

              <template v-else>
                <button title="Dar de baja materia"
                @click="eliminarCurso=true">
                  <span class="glyphicon glyphicon-remove-sign"></span>
                </button>
                <alerta v-if="eliminarCurso" @entendido="eliminar('cursos',curso.clave),this.location.reload()"
                @cancelado="eliminarCurso=false">Desea eliminar el curso?</alerta>
              </template>
            </td>
          </tr>
        </table>
      </div>`
}

const estudiantes = new Vue({
  el: "#app",
  data:{
    alerta: false
  },
  components:{
    tablas: tablas,
    alerta: alerta
  }
});
