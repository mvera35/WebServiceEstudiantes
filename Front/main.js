const estudiantes = new Vue({
  el: "#app",
  data:{
    estudiantes: []
  },
  methods:{
    almacenarDatos: function(datos){
      datos.forEach(item => {
        this.estudiantes.push(item);
      });
    }
  },
  mounted: function() {
    fetch("http://localhost:4000/estudiantes")
      .then(response =>{
        return response.json();
      })
      .then(datos =>{
        this.almacenarDatos(datos);
      })
    }
});

const cursos = new Vue({
  el: "#cursos",
  data:{
    cursos: []
  },
  methods:{
    almacenarDatos: function(datos){
      datos.forEach(item => {
        this.cursos.push(item);
      });
    }
  },
  mounted: function() {
    fetch("http://localhost:4000/cursos")
      .then(response =>{
        return response.json();
      })
      .then(datos =>{
        this.almacenarDatos(datos);
      })
    }
});
