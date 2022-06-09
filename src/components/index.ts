import { App } from "vue";
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import defaultImg from "@/assets/images/200.png";
import { useIntersectionObserver } from "@vueuse/core";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/bread/item.vue";

export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.component(XtxBread.name, XtxBread);
    app.component(XtxBreadItem.name, XtxBreadItem);

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
