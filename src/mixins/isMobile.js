export default {
  data: () => ({
    isMobile: false,
  }),
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    checkMobile() {
      if (window.innerWidth <= 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
