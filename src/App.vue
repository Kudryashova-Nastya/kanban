<template>
  <div id="app">
    <h1>Канбан</h1>
    <div class="create-task">
      <lable class="create-task__lable">Новая задача</lable>
      <br />
      <input class="create-task__input" type="text" v-model="newtask" />
      <button v-on:click="add" class="create-task__button">Добавить</button>
    </div>
    <div class="container">
      <div class="board todo">
        <h3>План</h3>
        <draggable class="draggable-area" v-bind:list="ToDo">
          <div class="board__task" v-for="task in ToDo" v-bind:key="task.name">
            <h4>Задача № {{task.number}}</h4>
            {{task.name}}
          </div>
        </draggable>
      </div>
      <div class="board doing">
        <h3>В процессе</h3>
        <draggable class="draggable-area" v-bind:list="Doing">
          <div class="board__task" v-for="task in Doing" v-bind:key="task.name">
            <h4>Задача № {{task.number}}</h4>
            {{task.name}}
          </div>
        </draggable>
      </div>
      <div class="board done">
        <h3>Готово</h3>
        <draggable class="draggable-area" v-bind:list="Done">
          <div class="board__task" v-for="task in Done" v-bind:key="task.name">
            <h4>Задача № {{task.number}}</h4>
            {{task.name}}
          </div>
        </draggable>
      </div>
    </div>
    <div class="tema">
      <button class="tema__button">
        <!--<img class="tema__ico" src="./assets/moon.png" />-->
        Тёмная тема
      </button>
    </div>

    <!-- <app-edit></app-edit> -->
  </div>
</template>

<script>
import Edit from "./Edit.vue";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      newtask: "",
      n: 4,
      ToDo: [
        { name: "Сделать документацию", number: 1 },
        { name: "Придумать дизайн", number: 2 },
        { name: "Реализовать работу карточек", number: 3 },
        { name: "Реализовать редактирование карточек", number: 4 }
      ],
      Doing: [],
      Done: []
    };
  },
  methods: {
    add() {
      if (this.newtask) {
        this.n = this.n + 1;
        this.ToDo.push({ name: this.newtask, number: this.n });
        this.newtask = "";
      }
    }
  },
  components: {
    "app-edit": Edit,
    draggable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
}

body {
  background: rgb(255, 255, 250);
  color: #1f2b36;
  position: relative;
}

h1 {
  text-align: center;
  font-size: 2.3rem;
  margin-bottom: 30px;
}

h3 {
  font-size: 1.3rem;
  padding-left: 10%;
}

h4 {
  margin: 0;
  margin-bottom: 4px;
}

.create-task {
  line-height: 140%;
  width: 279px;
  margin: auto;
}

.create-task__input {
  border-radius: 4px;
  border: 1px solid #1f2b36;
  width: 200px;
}

.create-task__lable {
  font-weight: 700;
}

.create-task__button {
  border-radius: 4px;
  padding: 3px 4px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.board {
  min-height: 350px;
  width: 310px;
  border-radius: 20px;
  border: 2px solid #1f2b3649;
}

.draggable-area {
  min-height: 340px;
}

.todo {
  background-color: rgba(107, 187, 219, 0.6);
}

.doing {
  background-color: rgba(255, 255, 110, 0.6);
  margin: 0 2%;
}

.done {
  background-color: rgba(116, 255, 123, 0.6);
}

.board__task {
  background: rgb(255, 255, 250);
  margin: 8px 6px;
  border-radius: 15px;
  padding: 2.5%;
}

.tema {
  position: absolute;
  top: 0;
  right: 30px;
}

.tema__button {
  background: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #1f2b3649;
}

.tema__button:hover {
  background: rgba(95, 223, 255, 0.568);
}

.tema__ico {
  width: 44px;
}
</style>
