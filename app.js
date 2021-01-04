const _alfianokt_app = () => {
  return {
    form: {
      url: ''
    },
    data: {
      id: '',
      // source: https://gist.github.com/iredun/a9681c46d3d74e03fb35d9ebf198b83d
      list_url: [
        {
          name: 'Default',
          url: 'http://img.youtube.com/vi/<id>/default.jpg'
        },
        {
          name: 'Medium',
          url: 'http://img.youtube.com/vi/<id>/hqdefault.jpg'
        },
        {
          name: 'Standard',
          url: 'http://img.youtube.com/vi/<id>/mqdefault.jpg'
        },
        {
          name: 'Maximum',
          url: 'http://img.youtube.com/vi/<id>/maxresdefault.jpg'
        },
      ],
    },
    state: {
      alert: null,
    },
    submit() {
      // source: http://web.archive.org/web/20160926134334/http://lasnv.net/foro/839/Javascript_parsear_URL_de_YouTube
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = this.form.url.match(regExp);
      if (match&&match[7].length==11){
          var b=match[7];
          this.data.id = b;
          this.state.alert = null;
      }else{
        this.state.alert = "Incorect Youtube URL";
      }
    },
  };
};

const _alfianokt_app_html = `
<div x-data="_alfianokt_app()">
  <form class="mb-3" action="#" @submit.prevent="submit()">
    <div class="form-group mb-2">
      <label for="yt-url">YouTube URL</label>
      <input type="text" class="form-control" placeholder="Enter Youtube URL" x-model="form.url">
    </div>

    <button class="btn btn-primary mb-3" type="submit">Enter</button>
    <div class="alert alert-warning d-none" role="alert" :class="{ 'd-none': !state.alert }" x-show="state.alert" x-text="state.alert"></div>
  </form>

  <ul class="list-group d-none" :class="{ 'd-none': !data.id }" x-show.transition="data.id">
    <template x-for="list in data.list_url">
      <li class="list-group-item">
        <figure class="figure">
          <a :href="list.url.replace('<id>', data.id)" target="_blank">
            <img :src="list.url.replace('<id>', data.id)" class="figure-img img-fluid rounded" :alt="list.name" style="width: 100%;">
          </a>
          <figcaption class="figure-caption" x-text="list.name"></figcaption>
        </figure>
      </div>
    </template>
  </div>
</div>
`

document.querySelector("#alfianokt-app").innerHTML = _alfianokt_app_html;