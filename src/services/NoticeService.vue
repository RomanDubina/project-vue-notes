<script>
  let NoticeService = {
    notices: [{
      title: 'Заголовок заметки',
      id: '1',
      tasks: [{
        id: '1',
        task: 'Первая задача',
        isDone: true
      },
      {
        id: '1',
        task: 'Вторая задача',
        isDone: false
      }]
    } ],

    getAll: function () {
      return NoticeService.notices;
    },
    getById: function(id) {
      return NoticeService.notices.find(function (item) {
        return item.id === id;
      });
    },
    removeById: function(id) {
      NoticeService.notices = NoticeService.notices.filter(function(item) {
        return item.id !== id;
      });
    },
    create: function (notice) {
      NoticeService.notices.push(notice);
    },
    cancelEdit: function (notice) {
      NoticeService.notices = NoticeService.notices.map(function(item) {
        return item.id === notice.id ? notice : item;
      });
    },
    deepCopyObject: function(obj){
      var nobj = {};
      for (let key in obj) {
        if (typeof obj[key] === 'object'){
          nobj[key] = NoticeService.deepCopyObject(obj[key]);
        } else {
          nobj[key] = obj[key];
        }
      }
      return nobj;
    }
  };
  export default NoticeService;
</script>
