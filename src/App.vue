<template>
  <div id="app">
    <div v-bind:class="{dark: inDark}">
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
            <h3>План ({{ToDo.length}})</h3>
            <draggable class="draggable-area" group="tasks" v-bind:list="ToDo">
              <div class="board__task" v-for="(task,index) in ToDo" v-bind:key="task.name">
                <h4>Задача № {{task.number}}</h4>
                {{task.name}}
                <span class="unvisible">{{task.status = 'План'}}</span>

                <div class="board__buttons">
                  <button class="board__button">
                    <img class="board__img" src="./assets/edit.svg" />
                  </button>
                  <button
                    v-on:click="next_task_one(index, task.number, task.name)"
                    class="board__button"
                  >
                    <img class="board__img" src="./assets/accept.svg" />
                  </button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div class="color-fon-doing" id="doing">
          <div class="board doing">
            <h3>В процессе ({{Doing.length}})</h3>
            <draggable class="draggable-area" group="tasks" v-bind:list="Doing">
              <div class="board__task" v-for="(task, index) in Doing" v-bind:key="task.name">
                <h4>Задача № {{task.number}}</h4>
                {{task.name}}
                <br />
                <b>Дата и время начала:</b><br>
                {{task.start_date ? task.start_date : task.start_date = (new Date())}}
                <br />
                <b>Ответственный:</b>
                {{task.author}}
                <span
                  class="unvisible"
                >{{task.status = 'В процессе'}}</span>
                <div class="board__buttons">
                  <button class="board__button">
                    <img class="board__img" src="./assets/edit.svg" />
                  </button>
                  <button
                    v-on:click="next_task_two(index, task.number, task.name, task.start_date)"
                    class="board__button"
                  >
                    <img class="board__img" src="./assets/accept.svg" />
                  </button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div class="color-fon-done" id="done">
          <div class="board">
            <h3>Готово ({{Done.length}})</h3>
            <draggable class="draggable-area" group="tasks" v-bind:list="Done">
              <div class="board__task" v-for="(task, index) in Done" v-bind:key="task.name">
                <h4>Задача № {{task.number}}</h4>
                {{task.name}}
                <br />
                <b>Дата и время начала:</b><br>
                {{task.start_date}}
                <br />
                <b>Затраченное время:</b><br>
                {{task.start_date ? (task.diff ? task.diff : task.diff = timeDiff(task.start_date)) : "0"}}<br>
                <b>Ответственный:</b>
                {{task.author}}
                <span class="unvisible">{{task.status = 'Готово'}}</span>
                <div class="board__buttons">
                  <button class="board__button">
                    <img class="board__img" src="./assets/edit.svg" />
                  </button>
                  <button v-on:click="delete_task(index)" class="board__button">
                    <img class="board__img" src="./assets/close.svg" />
                  </button>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <div id="popup">
        <div class="popup__body">
          <div class="popup__content">
            <a href="" class="popup__close">X<a>
        </div>
        </div>
      </div>
      <div v-if="inDark===false" class="tema">
        <button class="tema__button" @click="DarkTema">
          <img class="tema__ico" src="./assets/moon.png" />
        </button>
      </div>
      <div v-else class="tema">
        <button class="tema__button" @click="LightTema">
          <img class="tema__ico" src="./assets/sun.png" />
        </button>
      </div>

      <!-- <app-edit></app-edit> -->
    </div>
  </div>
</template>

<script>
import Edit from "./Edit.vue";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      newtask: "",
      n: 5,
      inDark: false,
      ToDo: [
        {
          name: "Сделать документацию",
          number: 1,
          author: "Анастасия",
          start_date: "",
          status: "План",
          diff: ""
        },
        {
          name: "Придумать дизайн",
          number: 2,
          author: "Анастасия",
          start_date: "",
          status: "План",
          diff: ""
        },
        {
          name: "Реализовать работу карточек",
          number: 3,
          author: "Анастасия",
          start_date: "",
          status: "План",
          diff: ""
        },
        {
          name: "Реализовать редактирование карточек",
          number: 4,
          author: "Анастасия",
          start_date: "",
          status: "План",
          diff: ""
        }
      ],
      Doing: [
        {
          name: "Реализовать drag&drop",
          number: 5,
          author: "Анастасия",
          start_date: "",
          status: "В процессе",
          diff: ""
        }
      ],
      Done: []
    };
  },
  methods: {
    add() {
      if (this.newtask) {
        this.n = this.n + 1;
        this.ToDo.push({
          name: this.newtask,
          number: this.n,
          author: "Анастасия",
          start_date: "",
          status: "План",
          diff: ""
        });
        this.newtask = "";
      }
    },
    delete_task(index) {
      this.Done.splice(index, 1);
    },
    next_task_one(index, num, name) {
      this.Doing.push({
        name: name,
        number: num,
        author: "Анастасия",
        start_date: "",
        status: "В процессе",
        diff: ""
      });
      this.ToDo.splice(index, 1);
    },
    next_task_two(index, num, name, start) {
      this.Done.push({
        name: name,
        number: num,
        author: "Анастасия",
        start_date: start,
        status: "Готово",
        diff: ""
      });
      this.Doing.splice(index, 1);
    },
    DarkTema() {
      this.inDark = true;
    },
    LightTema() {
      this.inDark = false;
    },
    timeDiff: function(start_date) {
      var day, hour, min, sec, diff, end_date;
      end_date = new Date();
      day = end_date.getDate()-start_date.getDate();
      hour = end_date.getHours()-start_date.getHours();
      min = end_date.getMinutes()-start_date.getMinutes();
      sec = end_date.getSeconds()-start_date.getSeconds();
      if (sec < 0) {
        sec += 60;
        min--;
      };
      if (min < 0) {
        min += 60;
        hour--;
      };
      if (hour < 0) {
        hour += 24;
        day--;
      };
      if (day < 0) {
        day += 31;
      };
      diff = day+" дней, "+hour+" часов, "+min+" минут, "+sec+" секунд";
      return (diff);
    },
    Kek: function(number) {
      var diff
      diff ="foffo "+number
      return (diff);
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
  margin: 0;
  width: 100%;
  height: 100%;
  color: #1f2b36;
  background: rgb(255, 255, 250);
  position: relative;
  transition: 0.5s;
}

.dark {
  background: rgb(0, 14, 22);
  color: rgb(236, 236, 221);
  transition: 0.5s;
  min-height: 750px;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 30px;
  font-weight: 900;
  margin-top: 0;
  padding-top: 40px;
  transition: 0.3s
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
  padding-bottom: 20px;
}

.board {
  height: 100%;
  width: 315px;
  border-radius: 20px;
  border: 2px solid #1f2b36;
  position: relative;
  right: 12px;
  bottom: 15px;
  transition: 0.5s
}

.dark .board { 
  border: 2px solid rgb(236, 236, 221);
  transition: 0.5s
}

.color-fon-todo {
  background-color: rgba(107, 187, 219, 0.6);
  border-radius: 20px;
  min-height: 340px;
}
.color-fon-doing {
  background-color: rgba(255, 255, 110, 0.753);
  border-radius: 20px;
  margin: 0 2.8%;
}

.color-fon-done {
  background-color: rgba(116, 255, 123, 0.6);
  border-radius: 20px;
}

.draggable-area {
  height: 80%;
}

.board__task {
  background: rgb(255, 255, 254);
  margin: 12px;
  margin-left: 16px;
  margin-right: 10px;
  border: 2px solid #1f2b36;
  border-radius: 15px;
  padding: 3%;
  padding-bottom: 38px;
  line-height: 130%;
  transition: 0.3;
}

.dark .board__task {
  border: 2px solid rgb(255, 255, 254);
  background: #404e5ca9;
  transition: 0.3;
}

.board__task:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.233);
  transition: 0.3s;
}

.tema {
  position: absolute;
  top: 30px;
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
  background: rgba(255, 255, 255, 0.219);
}

.tema__button:hover {
  background: rgba(108, 226, 255, 0.568);
}

.tema__ico {
  width: 42px;
}

.navigation {
  display: none;
}

.board__img {
  height: 30px;
  vertical-align: middle;
}

.board__button {
  background: none;
  border: none;
  float: right;
}

.board__img:hover {
  height: 31px;
}

.unvisible {
  display: none;
}

.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.651);
  top:0;
  left:0;
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
    background-color: rgba(210, 133, 255, 0.438);
    border-radius: 15px;
    padding: 5px 12px;
    color: #0f161b;
    text-decoration: none;
    margin: 0 4px;
  }

  .navigation__item:hover {
    background-color: rgba(194, 88, 255, 0.507);
  }

  #todo {
    display: none;
  }

  #todo:target {
    display: block;
  }

  #doing {
    display: none;
  }

  #doing:target {
    display: block;
  }

  #done {
    display: none;
  }

  #done:target {
    display: block;
  }
}
</style>
