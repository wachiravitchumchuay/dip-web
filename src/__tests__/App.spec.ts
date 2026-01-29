import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import { describe, it, expect } from "vitest";
import App from "@/App.vue";

const DummyPage = { template: "<div>Dummy</div>" };

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        component: DummyPage,
        meta: { layout: "app" }
      }
    ]
  });
}

describe("App", () => {
  it("mounts renders properly", async () => {
    const router = makeRouter();
    router.push("/");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.text()).toContain("Dummy");
  });
});