import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;
const eventHub = new Vue();
Vue.mixin({
  data: function() {
    return {
      eventHub: eventHub,
    };
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
