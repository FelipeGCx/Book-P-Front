 <template>
  <div class="component">
    <h1>
      Editar Registro
      <button class="little-button">Eliminar</button>
    </h1>
    <form @submit.prevent="saveBook">
      <div class="first-container">
        <div class="inputs">
          <div class="containter-input">
            <label for="title">Titulo:</label>
            <input type="text" id="title" :value="book.title" required />
          </div>
          <div class="containter-input">
            <label for="author">Autor:</label>
            <input type="text" id="author" :value="book.author" required />
          </div>
          <div class="containter-input">
            <label for="year">Año:</label>
            <input
              type="number"
              id="year"
              min="1300"
              max="2099"
              minlength="4"
              maxlength="4"
              step="1"
              :value="book.year"
              required
            />
          </div>
          <div class="containter-input">
            <label for="editorial">Editorial:</label>
            <input
              type="text"
              id="editorial"
              :value="book.editorial"
              required
            />
          </div>
          <div class="containter-input">
            <label for="category">Genero:</label>
            <select id="category" required>
              <option
                v-for="(item, index) in categories"
                :key="index"
                :value="item"
                :selected="item == book.category"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="containter-input">
            <label for="status">Estatus:</label>
            <select id="status" required>
              <option
                v-for="(item, index) in status"
                :key="index"
                :value="item.value"
                :selected="item.value == book.status"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="containter-input">
            <label for="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              :value="book.isbn"
              required
            />
          </div>
        </div>
        <div class="container-image">
          <div class="container-selector">
            <input
              type="file"
              id="select-image"
              accept="image/*"
              @change="fileSelected"
            />
            <label for="select-image" class="selector">Imagen</label>
            <span class="name-file">{{ this.file.name }}</span>
          </div>
          <label for="select-image">
            <img :src="book.poster" :style="{ border: border }" :alt="book.title"/>
          </label>
        </div>
      </div>
      <div class="second-container">
        <div class="containter-input">
          <label for="resume">Sinopsis:</label>
          <textarea type="text" id="resume" :value="book.resume" required />
        </div>
        <div class="buttons">
          <button @click="cancel" class="sub-button">Cancelar</button>
          <button type="submit" class="main-button">Guardar</button>
        </div>
      </div>
    </form>
  </div>
</template>
 
 <script>
import { app } from "../utils/fb";
import "@/data.js";
export default {
  name: "CreateBook",
  data() {
    return {
      id:null,
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
      categories: ["Selecione un Genero"],
      status: {
        false: {
          value: false,
          name: "En Stock",
        },
        true: {
          value: true,
          name: "En Prestamo",
        },
      },
    };
  },
  methods: {
    getData() {
      //   !HACER PETICIÓN PARA OBTENER LOS ATRIBUTOS DEL LIBRO
      this.book = registers[this.id-1];
      this.updateBorder();
    },
    fileSelected(e) {
      this.file = e.target.files[0];
      this.updateBorder();
      const objectURL = URL.createObjectURL(this.file);
      this.book.poster = objectURL;
      // this.saveImage();
    },
    async saveImage() {
      const storageRef = app.storage().ref();
      const filePath = storageRef.child(this.file.name);
      await filePath.put(this.file);
      console.log("archivo cargado");
      this.book.poster = await filePath.getDownloadURL();
    },
    updateBorder() {
      this.border = (this.book.status == null) ? ".1rem solid var(--border-input)" : ".1rem solid transparent";
    },
    cancel() {
      let history = window.history.back();
      if(history == "/"){
        this.$router.push({ name: "Home" });
      }else{
        this.$router.push({ name: "Inventory" });
      }
      window.scrollTo(0, 0);
    },
    loadCategories(){
      for (const key in registers) {
          const element = registers[key].category;
          if(!this.categories.includes(element)){
            this.categories.push(element);
          }
      }
    },
  },
  mounted() {
    this.loadCategories();
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
}
@media only screen and (min-width: 750px) and (max-width: 1024px) {
  .component {
    margin: 0 16vw;
  }
  h1 {
    justify-content: space-between;
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
}
@media only screen and (max-width: 550px) {
  .buttons {
    align-self: center;
    width: 100%;
    justify-content: space-around;
  }
  .buttons button {
    width: 50%;
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
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.first-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  /* padding-bottom: 3rem; */
}
label {
  align-self: flex-start;
}
img {
  height: 26rem;
  width: 17rem;
  border-radius: 1rem;
}
input {
  border: 0.1rem solid var(--border-input);
  text-align: initial;
  padding: 0 0.5rem;
}
select {
  height: 2rem;
  border: 0.1rem solid var(--border-input);
  border-radius: var(--radius);
  outline: 0;
  padding: 0 0.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url(../icons/arrow_drop_down.svg);
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}
option:checked {
  background-color: var(--color-dark);
  color:var(--color-clear);
}
textarea {
  border: 0.1rem solid var(--border-input);
  border-radius: var(--radius);
  padding: 0.5rem;
  text-align: initial;
  resize: none;
  height: 30vh;
  outline: 0;
}
textarea::-webkit-scrollbar {
  height: 1rem;
  width: 1rem;
}

textarea::-webkit-scrollbar-corner {
  background-color: transparent;
}
textarea::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: var(--bg-main-button);
  border: 0.1rem solid transparent;
  border-radius: 1rem;
}
.containter-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 1rem;
}
.buttons {
  display: flex;
  gap: 1rem;
  align-self: flex-end;
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