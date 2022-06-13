import { App } from "vue";
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/bread/item.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumbox from "@/components/numbox/index.vue";
import XtxButton from "@/components/button/index.vue"
import XtxCheckbox from "@/components/checkbox/index.vue"
import XtxMessage from "@/components/message/index.vue"
import defaultImg from "@/assets/images/200.png";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.component(XtxBread.name, XtxBread);
    app.component(XtxBreadItem.name, XtxBreadItem);
    app.component(XtxCity.name, XtxCity);
    app.component(XtxNumbox.name, XtxNumbox);
    app.component(XtxButton.name, XtxButton);
    app.component(XtxCheckbox.name, XtxCheckbox);
    app.component(XtxMessage.name, XtxMessage);

    app.directive("lazy", (el, { value }) => {
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          stop();
          el.src = value;
          el.onerror = () => {
            el.src = defaultImg;
          };
        }
      });
    });
  },
};
