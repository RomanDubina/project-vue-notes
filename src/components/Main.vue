<template>
  <div class="app__body">
    <header class="header">
      <div class="header__title">Заметки</div>
      <div class="header__newNote" title="Создать новую заметку">
          <router-link :to="'/notice'"></router-link>
        </div>

    </header>
     <hr />
    <div class="main">
      <div class="container">

        <div class="main__notes">

          <div class="main__notes-starttext" v-if="!notices.length">
            Нет ни одной заметки
          </div>

          <div class="main__notes-note" v-for="item in notices" :key="item.id" v-else>
            <div class="note__menu">
              <div class="note__menu-edit">
                <router-link :to="'/notice/' + item.id"></router-link>
              </div>
              <div class="note__menu-del" @click="setNoticeId(item.id)">
              </div>
            </div>

            <div class="note__title" v-text="item.title"></div>
            <div class="note__content">
              <div
                class="note__content-item"
                v-for="item2 in item.tasks"
                :key="item2.name"
              >
                <div>
                  <input type="checkbox" v-model="item2.isDone" disabled />
                </div>

                <div v-text="item2.task"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <modal
      v-if="showModal"
      @cancel="showModal = false"
      @continue="removeById(noticeId)"
    ></modal>
  </div>
</template>

<script>
import NoticeService from '../services/NoticeService';
import Modal from './Modal';

export default {
  components: {
    Modal
  },
  data: function() {
    return {
      notices: NoticeService.getAll(),
      showModal: false,
      noticeId: null
    };
  },
  mounted() {
    console.log(localStorage.notices);
    if (localStorage.notices) {
      this.notices = JSON.parse(localStorage.notices);
    } else if (this.notices.length) {
      localStorage.notices = JSON.stringify(this.notices);
    }
  },
  watch: {
    notices(newNotices) {
      localStorage.notices = JSON.stringify(newNotices);
    }
  },
  methods: {
    removeById: function() {
      NoticeService.removeById(this.noticeId);
      this.notices = NoticeService.getAll();
      this.showModal = false;
    },
    setNoticeId: function(noticeId) {
      this.noticeId = noticeId;
      this.showModal = true;
    }
  }
};
</script>
