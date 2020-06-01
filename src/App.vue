<template>
  <div id="app">
    <h1>Канбан</h1>
    <div class="create-task">
      <lable class="create-task__lable">Новая задача</lable>
      <br />
      <input class="create-task__input" type="text" v-model="newtask" />
      <button v-on:click="add" class="create-task__button">Добавить</button>
    </div>
    <nav class="navigation">
      <a href="#todo" class="navigation__item">План</a>
      <a href="#doing" class="navigation__item">В процессе</a>
      <a href="#done" class="navigation__item">Готово</a>
    </nav>
    <div class="container">
      <div class="color-fon-todo" id="todo">
        <div class="board">
          <h3>План</h3>
          <draggable class="draggable-area" v-bind:list="ToDo">
            <div class="board__task" v-for="task in ToDo" v-bind:key="task.name">
              <h4>Задача № {{task.number}}</h4>
              {{task.name}}
            </div>
          </draggable>
        </div>
      </div>
      <div class="color-fon-doing" id="doing">
        <div class="board doing">
          <h3>В процессе</h3>
          <draggable class="draggable-area" v-bind:list="Doing">
            <div class="board__task" v-for="task in Doing" v-bind:key="task.name">
              <h4>Задача № {{task.number}}</h4>
              {{task.name}}
            </div>
          </draggable>
        </div>
      </div>
      <div class="color-fon-done" id="done">
        <div class="board">
          <h3>Готово</h3>
          <draggable class="draggable-area" v-bind:list="Done">
            <div class="board__task" v-for="task in Done" v-bind:key="task.name">
              <h4>Задача № {{task.number}}</h4>
              {{task.name}}
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div class="tema">
      <button class="tema__button"><img class="tema__ico" src="./assets/moon.png" /></button>
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
      Doing: [
        { name: "Реализовать редактирование карточек", number: 5 },
        { name: "Реализовать работу карточек", number: 6 }
      ],
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
  font-size: 2.4rem;
  margin-bottom: 30px;
  font-weight: 900;
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
  margin-top: 40px;
}

.board {
  min-height: 350px;
  width: 315px;
  border-radius: 20px;
  border: 2px solid #1f2b36;
  position: relative;
  right: 12px;
  bottom: 15px;
}

.color-fon-todo {
  background-color: rgba(107, 187, 219, 0.6);
  border-radius: 20px;
}
.color-fon-doing {
  background-color: rgba(255, 255, 110, 0.6);
  border-radius: 20px;
  margin: 0 2.8%;
}

.color-fon-done {
  background-color: rgba(116, 255, 123, 0.6);
  border-radius: 20px;
}

.draggable-area {
  min-height: 340px;
}

.board__task {
  background: rgb(255, 255, 250);
  margin: 12px;
  margin-left: 16px;
  margin-right: 10px;
  border: 2px solid #1f2b36;
  border-radius: 15px;
  padding: 3%;
}

.board__task:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.233);
  transition: 0.3s;
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
  background: rgba(108, 226, 255, 0.568);
}

.tema__ico {
  width: 42px;
}

.navigation {
  display: none
}

@media (max-width: 1045px) {
  .navigation {
    display: block;
    width: 280px;
    margin: auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .navigation__item {
    display: inline-block;
    background-color:rgba(210, 133, 255, 0.438);
    border-radius: 15px;
    padding: 5px 12px;
    color: #0f161b;
    text-decoration: none;
    margin: 0 4px;
  }

  .navigation__item:hover {
    background-color:rgba(194, 88, 255, 0.507);
  }
  
  #todo {
    display:none
  }

  #todo:target {
    display:block
  }

  #doing {
    display:none
  }

  #doing:target {
  display:block
  }

  #done {
    display:none
  }

  #done:target {
    display:block
  }
}
</style>
