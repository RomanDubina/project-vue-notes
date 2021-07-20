<template>
<div class="container">
  <div class="main__notes">
    <div class="main__notes-note note-edit">
    <form name="noticeForm" @submit="actionNotice">
      <div>
        <!-- <label>Название заметки</label> -->
        <input class="noticeForm__noteTitle"  type="text" v-model="notice.title" name="notice" placeholder="Название заметки" required>
      </div>
      <div class="note-edit__undo-redo">
<button class="note-edit__undo" type="button" v-if="noticeId" @click="discardChange" title="Отменить внесенное изменение"></button>
        <button class="note-edit__redo" type="button" v-if="noticeId" v-bind:disabled="!noticeCopy2" @click="repeatDiscardedChange" title="Повторить отмененное изменение"></button>
      </div>
      <div class="note__content">
        <div class="note__content-item" v-for="item in notice.tasks">
            <div class="item-element">
              <input type="checkbox" v-model="item.isDone">
            </div>
            <div class="item-element">
<input type="text" v-model="item.task" name="noticeTask" required autofocus>
            </div>
            <div class="item-element">
<button type="button" @click="setActionName('remove', item.id)" title="Удалить задачу"></button>
            </div>

        </div>
        <div class="note__content-btnAddTask">
          <button type="button" @click="addTask" title="Добавить задачу"></button>
        </div>
        <div class="note__content-btn-save--cencel">

        <button type="button" v-if="noticeId" @click="setActionName('edit')" title="Отменить редактирование"></button>
        <button type="submit" title="Сохранить"></button>

      </div>
      </div>

    </form>
    <modal v-if="showModal" @cancel="showModal = false" @continue="actionAfterConfirm()"></modal>
  </div>
  </div>

</div>

</template>

<script>
  import NoticeService from '../services/NoticeService'
  import Modal from './Modal'

  export default {
    components: {
      Modal
    },
    data: function () {
      return {
        noticeCopy: null,
        noticeCopy2: null,
        notice: {
          title: '',
          tasks: []
        },
        noticeId: null,
        showModal: false,
        actionName: '',
        taskId: null
      }
    },
    mounted: function() {
      this.noticeId = this.$route.params.id;
      if (this.noticeId) {
        if (NoticeService.getById(this.noticeId)) {
          this.noticeCopy = NoticeService.deepCopyObject(NoticeService.getById(this.noticeId));
          this.notice = NoticeService.getById(this.noticeId);
        } else {
          this.$router.push('/');
        }
      }
    },
    methods: {
      actionNotice: function (e) {
        e.preventDefault();
        if (!this.noticeId) {
          this.notice.id = '' + (NoticeService.getAll().length + 1);
          NoticeService.create(this.notice);
        }
        localStorage.notices = JSON.stringify(NoticeService.getAll());
        this.$router.push('/');
      },
      addTask: function () {
        this.notice.tasks.push({
          id: '' + (this.notice.tasks.length + 1),
          task: '',
          isDone: false
        })
      },
      removeTask: function (taskId) {
        this.notice.tasks = this.notice.tasks.filter(function(item) {
          return item.id !== taskId;
        });
      },
      cancelEdit: function () {
        NoticeService.cancelEdit(this.noticeCopy);
        this.$router.push('/');
      },
      discardChange: function () {
        this.noticeCopy2 = NoticeService.deepCopyObject(this.notice);
        this.notice = NoticeService.deepCopyObject(this.noticeCopy);
      },
      repeatDiscardedChange: function () {
        this.notice = NoticeService.deepCopyObject(this.noticeCopy2);
        this.noticeCopy2 = null;
      },
      setActionName: function (actionName, taskId) {
        this.actionName = actionName;
        if (taskId) {
          this.taskId = taskId;
        }
        this.showModal = true;
      },
      actionAfterConfirm: function () {
        if (this.actionName === 'remove') {
          this.removeTask(this.taskId);
        } else if (this.actionName === 'edit') {
          this.cancelEdit();
        }
        this.showModal = false;
      }
    }
  }
</script>
