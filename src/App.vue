<template>
  <div id="app">
    <h1>Канбан</h1>
    <div class="create-task">
      <lable class="create-task__lable">Новая задача</lable>
      <br>
      <input class="create-task__input" type="text" v-model="newtask">
      <button v-on:click="add">Добавить</button>
    </div>
    <div class="container">
      <div class="board todo">
        <h3>План</h3>
        <draggable v-bind:list="ToDo">
          <div class="board__tasks" v-for="task in ToDo" v-bind:key="task.name">
          {{task.name}}
          </div>
        </draggable>
      </div>
      <div class="board doing">
        <h3>В процессе</h3>
        <draggable v-bind:list="Doing">
          <div class="board__tasks" v-for="task in Doind" v-bind:key="task.name">
          {{task.name}}
          </div>
        </draggable>
      </div>
      <div class="board done">
        <h3>Готово</h3>
        <draggable v-bind:list="Done">
          <div class="board__tasks" v-for="task in Done" v-bind:key="task.name">
          {{task.name}}
          </div>
        </draggable>
      </div>
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
      ToDo: [
        { name: "Сделать документацию" },
        { name: "Придумать дизайн" },
        { name: "Реализовать работу карточек" },
        { name: "Реализовать редактирование карточек" }
      ],
      Doing: [],
      Done: []
    };
  },
  methods: {
    add() {
      if (this.newtask) {
        this.ToDo.push({ name: this.newtask });
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
  color: #293949;
  margin-top: 30px;
}

h1 {
  text-align: center;
  font-size: 38px;
  margin-bottom: 30px;
}

.create-task {
  line-height: 140%;
  width: 250px;
  margin: auto;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.board {
  min-height: 300px;
  max-width: 300px;
}

.todo {
  background-color: rgb(87, 167, 233);
}

.doing {
  background-color: rgb(252, 237, 110);
}

.done {
  background-color: rgb(87, 233, 119);
}
</style>
