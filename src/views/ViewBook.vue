 <template>
  <div class="component">
    <div class="first-container">
      <div class="container-image">
        <img :src="book.poster" :style="{ border: border }" :alt="book.title" />
      </div>
      <div class="container-info">
        <div class="info">
          <h1>
            {{ book.title }}
            <!-- <button class="little-button">Editar</button> -->
          </h1>
          <h2><i>Author:</i> {{ book.author }}</h2>
          <span><i>Año:</i> {{ book.year }} </span>
          <span><i>Editorial:</i> {{ book.editorial }} </span>
          <span><i>Genero:</i> {{ book.category }} </span>
          <span><i>ISBN:</i> {{ book.isbn }} </span>
          <span><i>Tiempo de Prestamo:</i> 20 días </span>
          <a href="https://ezproxy.biblored.gov.co:2152/a/28075/">Ir a contenido real</a>
        </div>
        <div class="disclaimer">
          <i>© Todos los Derechos Reservados</i>
        </div>
      </div>
    </div>
    <div class="second-container">
      <p>{{ book.resume }}</p>
      <button @click="makeLoan" class="main-button">Prestamo</button>
    </div>
  </div>
</template>
 
 <script>
 import "@/data.js";
export default {
  name: "CreateBook",
  data() {
    return {
      id: null,
      file: {
        name: null,
      },
      border: ".1rem solid transparent",
      book: {
        title: null,
        author: null,
        year: null,
        category: null,
        editorial: null,
        status: null,
        isbn:null,
        poster: require("@/assets/images/NotFound.svg"),
      },
    };
  },
  methods: {
    getData() {
      //   !HACER PETICIÓN PARA OBTENER LOS ATRIBUTOS DEL LIBRO
      this.book = registers.filter((item) => item.id == this.id);
      this.book = this.book[0];
      this.updateBorder();
      document.title = this.book.title;
    },
    updateBorder() {
      if (this.book.status == null) {
        this.border = ".1rem solid var(--border-input)";
      } else {
        this.border = ".1rem solid transparent";
      }
    },
    cancel() {
      this.$router.push({ name: "Home" });
      window.scrollTo(0, 0);
    },
    makeLoan(){
      // let dateStart = new Date().toLocaleString("es-CO");
      // let dateEnd = new Date();
      // dateEnd.setDate(dateEnd.getDate() + 20);
      // dateEnd = dateEnd.toLocaleString("es-CO");
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
};
</script>
 
 <style scoped>
@media only screen and (min-width: 1024px) {
  .component {
    margin: 0 20vw;
  }
  h1 {
    justify-content: space-between;
  }
  .second-container {
    align-items: flex-end;
  }
}
@media only screen and (min-width: 750px) and (max-width: 1024px) {
  .component {
    margin: 0 16vw;
  }
  h1 {
    justify-content: space-between;
  }
  .second-container {
    align-items: flex-end;
  }
}
@media only screen and (max-width: 750px) {
  .first-container {
    flex-direction: column;
  }
  .component {
    margin: 0 13vw;
  }
  h1 {
    justify-content: center;
  }
  button {
    width: 100%;
  }
}
@media only screen and (max-width: 550px) {
  button {
    width: 100%;
  }
  h1 {
    justify-content: center;
  }
}
h1 {
  display: flex;
  gap: 1rem;
  align-items: center;
  white-space: nowrap;
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.first-container {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
.inputs {
  width: 100%;
  max-width: 28rem;
}
.second-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 2rem;
}
label {
  align-self: flex-start;
}
img {
  height: 30.1rem;
  width: 20rem;
  border-radius: 1rem;
}
.container-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 1rem;
  gap: 0.5rem;
  width: 100%;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
}
h2 i {
  font-size: 1.2rem;
}
i {
  color: var(--sub-color);
}
span,
h2 {
  font-weight: 500;
}
p {
  text-align: justify;
}
.container-image {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container-selector {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  border-radius: var(--radius);
  border: 0.1rem solid var(--border-input);
  overflow: hidden;
  height: 2rem;
  width: 17rem;
}
input[type="file"] {
  display: none;
}
.selector {
  padding: 0.2rem 1rem;
  background-color: var(--selector);
  color: var(--color-clear);
}
.name-file {
  display: flex;
  padding-left: 0.5rem;
  width: 100%;
  border: none;
  background-color: var(--color-clear);
  align-items: center;
  white-space: nowrap;
}
#year {
  padding: 0 0 0 0.5rem;
  background-image: url(../icons/arrows_scroll.svg);
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}
#year::-webkit-inner-spin-button {
  /* visibility: hidden; */
  opacity: 0;
}
.little-button {
  background-color: var(--color-clear);
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  color: var(--bg-main-button);
  transition: all 0.3s ease;
  border: 0.1rem solid var(--bg-main-button);
}
</style>