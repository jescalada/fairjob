import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  const renderMainNav = () => {
    // const pinia = createTestingPinia({ stubActions: false }); // This is closer to an integration test
    const pinia = createTestingPinia();
    const $route = {
      name: "Home",
    };

    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("FairJob");
    expect(companyName).toBeInTheDocument(); // A bit redundant, since getByText fails if it's not in the
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      "Services",
      "Location",
      "Jobs",
      "Contact Us",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();
      let profileImage = screen.queryByRole("img", {
        name: /User Profile Image/i, // Case-insensitive RegExp
      });
      expect(profileImage).not.toBeInTheDocument();
      const loginButton = screen.getByRole("button", {
        name: /Sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);
      profileImage = screen.queryByRole("img", {
        name: /User Profile Image/i, // Case-insensitive RegExp
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});