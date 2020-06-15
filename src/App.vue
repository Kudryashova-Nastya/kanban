<template>
  <div id="app">
    <div v-bind:class="{dark: inDark}">
      <div id="header">
        <!-- Нужен для модального окна -->
      </div>
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
                  <a href="#popup" class="board__button_edit">
                    <button
                      v-on:click="toEdit(index, task.number, task.name, task.status, task.author, task.start_date, task.diff)"
                      class="board__button"
                    >
                      <img class="board__img" src="./assets/edit.svg" />
                    </button>
                  </a>
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
                <b>Дата и время начала:</b>
                <br />
                <span
                  class="unvisible"
                >{{task.start_date ? task.start_date : task.start_date = (new Date())}}</span>
                {{task.start_date.toLocaleString()}}
                <br />
                <b>Ответственный:</b>
                {{task.author}}
                <span
                  class="unvisible"
                >{{task.status = 'В процессе'}}</span>
                <div class="board__buttons">
                  <a href="#popup" class="board__button_edit">
                    <button
                      v-on:click="toEdit(index, task.number, task.name, task.status, task.author, task.start_date, task.diff)"
                      class="board__button"
                    >
                      <img class="board__img" src="./assets/edit.svg" />
                    </button>
                  </a>
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
                <b>Дата и время начала:</b>
                <br />
                {{task.start_date.toLocaleString()}}
                <br />
                <b>Затраченное время:</b>
                <br />
                {{task.start_date ? (task.diff ? task.diff : task.diff = timeDiff(task.start_date)) : "0"}}
                <br />
                <b>Ответственный:</b>
                {{task.author}}
                <span class="unvisible">{{task.status = 'Готово'}}</span>
                <div class="board__buttons">
                  <a href="#popup" class="board__button_edit">
                    <button
                      v-on:click="toEdit(index, task.number, task.name, task.status, task.author, task.start_date, task.diff)"
                      class="board__button"
                    >
                      <img class="board__img" src="./assets/edit.svg" />
                    </button>
                  </a>
                  <button v-on:click="delete_task(index)" class="board__button">
                    <img class="board__img" src="./assets/close.svg" />
                  </button>
                </div>
              </div>
            </draggable>
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
      <div id="popup" class="popup">
        <a href="#header" class="popup__area"></a>
        <div class="popup__body">
          <div class="popup__content">
            <a href="#header" class="popup__close">X</a>
            <div v-if="EditMas[0].status =='План'">
              <label for="name1">Задача:</label>
              <br />
              <textarea
                class="edit-card__input inpname"
                id="name1"
                rows="3"
                v-model="EditMas[0].name"
              ></textarea>
              <br />
              <label for="stat1">Статус:</label>
              <br />
              <select class="edit-card__input" id="stat1" v-model="EditMas[0].select">
                <option value="План" selected>План</option>
                <option value="В процессе">В процессе</option>
                <option value="Готово">Готово</option>
              </select>
              <br />
              <a href="#header" class="popup__button">
                <button
                  v-if="EditMas[0].select==='План'"
                  v-on:click="PlanToPlan(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='В процессе'"
                  v-on:click="PlanToProcess(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='Готово'"
                  v-on:click="PlanToDone(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
              </a>
            </div>
            <div v-if="EditMas[0].status =='В процессе'">
              <label for="name2">Задача:</label>
              <br />
              <textarea
                class="edit-card__input inpname"
                id="name2"
                rows="3"
                v-model="EditMas[0].name"
              ></textarea>
              <br />
              <label for="author2">Ответственный:</label>
              <br />
              <input class="edit-card__input" id="author2" type="text" v-model="EditMas[0].author" />
              <br />
              <label for="start2">Начало работы:</label>
              <br />
              <input
                class="edit-card__input"
                id="start1"
                type="text"
                v-model="EditMas[0].start_date"
              />
              <br />
              <label for="stat2">Статус:</label>
              <br />
              <select class="edit-card__input" id="stat2" v-model="EditMas[0].select">
                <option value="План">План</option>
                <option value="В процессе" selected>В процессе</option>
                <option value="Готово">Готово</option>
              </select>
              <br />
              <a href="#header" class="popup__button">
                <button
                  v-if="EditMas[0].select==='План'"
                  v-on:click="ProcessToPlan(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='В процессе'"
                  v-on:click="ProcessToProcess(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='Готово'"
                  v-on:click="ProcessToDone(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
              </a>
            </div>
            <div v-if="EditMas[0].status =='Готово'">
              <label for="name3">Задача:</label>
              <br />
              <textarea
                class="edit-card__input inpname"
                id="name3"
                rows="3"
                v-model="EditMas[0].name"
              ></textarea>
              <br />
              <label for="author3">Ответственный:</label>
              <br />
              <input class="edit-card__input" id="author3" type="text" v-model="EditMas[0].author" />
              <br />
              <label for="start3">Начало работы:</label>
              <br />
              <input
                class="edit-card__input"
                id="start3"
                type="text"
                v-model="EditMas[0].start_date"
              />
              <br />
              <label for="diff">Затраченное время:</label>
              <br />
              <input class="edit-card__input" id="diff" type="text" v-model="EditMas[0].diff" />
              <br />
              <label for="stat3">Статус:</label>
              <br />
              <select class="edit-card__input" id="stat3" v-model="EditMas[0].select">
                <option value="План">План</option>
                <option value="В процессе">В процессе</option>
                <option value="Готово" selected>Готово</option>
              </select>
              <br />
              <a href="#header" class="popup__button">
                <button
                  v-if="EditMas[0].select==='План'"
                  v-on:click="DoneToPlan(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='В процессе'"
                  v-on:click="DoneToProcess(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
                <button
                  v-if="EditMas[0].select==='Готово'"
                  v-on:click="DoneToDone(EditMas[0].index)"
                  class="edit-card__button"
                >Сохранить</button>
              </a>
            </div>
          </div>
        </div>
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
      Done: [],
      EditMas: [
        {
          name: "",
          number: 0,
          author: "Анастасия",
          start_date: "",
          status: "",
          diff: "",
          index: 0,
          select: "План"
        }
      ]
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
      day = end_date.getDate() - start_date.getDate();
      hour = end_date.getHours() - start_date.getHours();
      min = end_date.getMinutes() - start_date.getMinutes();
      sec = end_date.getSeconds() - start_date.getSeconds();
      if (sec < 0) {
        sec += 60;
        min--;
      }
      if (min < 0) {
        min += 60;
        hour--;
      }
      if (hour < 0) {
        hour += 24;
        day--;
      }
      if (day < 0) {
        day += 31;
      }
      diff =
        day +
        " дней, " +
        hour +
        " часов, " +
        min +
        " минут, " +
        sec +
        " секунд";
      return diff;
    },
    toEdit(index, num, name, stat, aut, start, diff) {
      this.EditMas.splice(0, 1);
      this.EditMas.push({
        name: name,
        number: num,
        author: aut,
        start_date: start,
        status: stat,
        diff: diff,
        index: index,
        select: stat
      });
    },
    PlanToPlan(i) {
      this.ToDo[i].name = this.EditMas[0].name;
    },
    PlanToProcess(i) {
      this.Doing.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: "Анастасия",
        start_date: "",
        status: "В процессе",
        diff: ""
      });
      this.ToDo.splice(i, 1);
    },
    PlanToDone(i) {
      this.Done.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: "Анастасия",
        start_date: "",
        status: "Готово",
        diff: 0
      });
      this.ToDo.splice(i, 1);
    },
    ProcessToProcess(i) {
      this.Doing[i].name = this.EditMas[0].name;
      this.Doing[i].author = this.EditMas[0].author;
      this.Doing[i].start_date = this.EditMas[0].start_date;
    },
    ProcessToPlan(i) {
      this.ToDo.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: this.EditMas[0].author,
        start_date: this.EditMas[0].start_date,
        status: "План",
        diff: ""
      });
      this.Doing.splice(i, 1);
    },
    ProcessToDone(i) {
      this.Done.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: this.EditMas[0].author,
        start_date: this.EditMas[0].start_date,
        status: "План",
        diff: ""
      });
      this.Doing.splice(i, 1);
    },
    DoneToDone(i) {
      this.Done[i].name = this.EditMas[0].name;
      this.Done[i].author = this.EditMas[0].author;
      this.Done[i].start_date = this.EditMas[0].start_date;
      this.Done[i].diff = this.EditMas[0].diff;
    },
    DoneToProcess(i) {
      this.Doing.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: this.EditMas[0].author,
        start_date: "",
        status: "В процессе",
        diff: ""
      });
      this.Done.splice(i, 1);
    },
    DoneToPlan(i) {
      this.ToDo.push({
        name: this.EditMas[0].name,
        number: this.EditMas[0].number,
        author: "Анастасия",
        start_date: "",
        status: "План",
        diff: ""
      });
      this.Done.splice(i, 1);
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
  transition: 0.3s;
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
  transition: 0.5s;
}

.dark .board {
  border: 2px solid rgb(236, 236, 221);
  transition: 0.5s;
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

.board__button_edit {
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
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.8s;
}

.popup:target {
  opacity: 1;
  visibility: visible;
}

.popup__body {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.popup__content {
  background: white;
  width: 30%;
  padding: 2%;
  padding-top: 2.5%;
  position: relative;
  transform: perspective(600px) translate(0px, -100%) rotateX(45deg);
  opacity: 0;
  transition: 0.8s;
  line-height: 180%;
  border-radius: 20px;
  border: 2px solid #1f2b36;
}

.dark .popup__content {
  background: #1f2b36;
  color: rgb(236, 236, 221);
}

.popup:target .popup__content {
  transform: perspective(0px) translate(0px, 0px) rotateX(0deg);
  opacity: 1;
  transition: 0.8s;
}

.popup__close {
  position: absolute;
  right: 17px;
  top: 17px;
  text-decoration: none;
  font-size: 28px;
  color: rgb(182, 31, 31);
}

.popup__close:hover {
  color: rgb(62, 191, 250);
}

.popup__area {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
}

.popup__button {
  color: #1f2b36;
  text-decoration: none;
}

#header {
  position: fixed;
  opacity: 0;
  top: 0px;
  left: 0px;
  width: 0;
  height: 0;
}

.edit-card__input {
  border-radius: 7px;
  border: 2px solid #1f2b36;
  background: none;
  vertical-align: top;
  padding: 5px;
  width: 95%;
  margin-right: 5px;
}

.dark .edit-card__input {
  border: 2px solid rgb(236, 236, 221);
  color: rgb(236, 236, 221);
}

.inpname {
  resize: none;
}

.edit-card__button {
  display: block;
  margin: 0 auto;
  margin-top: 25px;
  background: none;
  border: 2px solid #1f2b36;
  border-radius: 7px;
  padding: 5px 14px;
  max-width: 100px;
}

.edit-card__button:hover {
  color: rgb(236, 236, 221);
  background: #1f2b36;
}

.dark .edit-card__button {
  border: 2px solid rgb(236, 236, 221);
  color: rgb(236, 236, 221);
}

.dark .edit-card__button:hover {
  color: #1f2b36;
  background: rgb(236, 236, 221);
}

.dark option {
  color: #1f2b36;
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

  .dark .navigation__item {
    color: rgb(236, 236, 221);
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

@media (max-width: 790px) {
  .popup__content {
    width: 70%;
  }

  .popup__close {
    right: 10px;
    top: 10px;
  }
}
</style>
