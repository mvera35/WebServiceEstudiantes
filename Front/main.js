
const estudiantes = new Vue({
  el: "#app",
  data:{
    estudiantes: [],
    cursos: [],
    relacion: []
  },
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
    }
});
