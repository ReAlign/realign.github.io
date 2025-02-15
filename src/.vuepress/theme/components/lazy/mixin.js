import getYouTubeID from 'get-youtube-id';

export default {
  props: {
    tag: String,
    data: {
      type: Object,
      required: true,
    },
    styleData: Object,
  },

  computed: {
    getAttributes() {
      const data = { ...this.default, ...this.data };
      data.src = this.youtubeEmbed(data.src) || data.src;
      return data;
    },
    getStyle() {
      const { w_h } = this.styleData || {};
      const whArr = (w_h || '').split('_');
      return {
        ...(whArr.length === 2
          ? { aspectRatio: `${whArr[0]} / ${whArr[1]}` }
          : {}),
      };
    },
  },

  methods: {
    youtubeEmbed(src) {
      if (!src.includes('youtube.com') || this.tag !== 'iframe') return false;
      const id = getYouTubeID(src);
      return `https://www.youtube.com/embed/${id}`;
    },
  },
};
