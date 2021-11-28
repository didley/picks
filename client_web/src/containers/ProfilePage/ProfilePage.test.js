import React from "react";
import { render, screen, waitForElementToBeRemoved } from "testing/testUtils";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "testing/stubs/authProvider";

import ProfilePage from "./index";

const renderUsersProfilePage = () => {
  const authProviderStub = AuthProvider();
  const routePropsMock = {
    params: { username: "fakeUser1" },
  };
  render(<ProfilePage match={routePropsMock} />, {
    initialState: authProviderStub,
  });
};

const renderDIFFERENTUsersProfilePage = () => {
  const authProviderStub = AuthProvider();
  const routePropsMock = {
    params: { username: "NOT_AUTHED_USERS_USERNAME" },
  };
  render(<ProfilePage match={routePropsMock} />, {
    initialState: authProviderStub,
  });
};

describe("<ProfilePage />", () => {
  describe("Profile section", () => {
    describe("Profile of authenticated user", () => {
      beforeEach(renderUsersProfilePage);

      it("displays update profile button if users profile", async () => {
        // awaits loaded profile
        await waitForElementToBeRemoved(() =>
          screen.queryByText(/loading profile/i)
        );

        // it displays edit profile button
        const editBtn = screen.getByRole("button", { name: /edit profile/i });
        expect(editBtn).toBeInTheDocument();
      });

      it("can update users profile", async () => {
        const nameText = await screen.findByLabelText(/profile-name/i);
        const usernameText = await screen.findByLabelText(/profile-username/i);
        const bioText = await screen.findByLabelText(/profile-bio/i);
        const locationText = await screen.findByLabelText(/profile-location/i);

        // it updates and submits profile update
        const editBtn = screen.getByRole("button", { name: /edit profile/i });
        userEvent.click(editBtn);

        const nameField = screen.getByRole("textbox", { name: /name/i });
        userEvent.type(nameField, "CHANGED");

        const bioField = screen.getByRole("textbox", { name: /bio/i });
        userEvent.type(bioField, "CHANGED");

        const locationField = screen.getByRole("textbox", {
          name: /location/i,
        });
        userEvent.type(locationField, "CHANGED");

        const updateProfileBtn = screen.getByRole("button", {
          name: /update profile/i,
        });
        userEvent.click(updateProfileBtn);

        // it awaits updating indicator to be removed
        const updatingMessage = await screen.findByText(/updating/i);
        await waitForElementToBeRemoved(updatingMessage);

        // it displays all fields updated
        const updatedNameText = await screen.findByLabelText(/profile-name/i);
        expect(updatedNameText.innerHTML).toMatch(
          nameText.innerHTML + "CHANGED"
        );

        const updatedBioText = await screen.findByLabelText(/profile-bio/i);
        expect(updatedBioText.innerHTML).toMatch(bioText.innerHTML + "CHANGED");

        const updatedLocationText = await screen.findByLabelText(
          /profile-location/i
        );
        expect(updatedLocationText.innerHTML).toMatch(
          locationText.innerHTML + "CHANGED"
        );

        // is displays username visible and unchanged
        const usernameTextAfterUpdate = await screen.findByLabelText(
          /profile-username/i
        );
        expect(usernameTextAfterUpdate.innerHTML).toMatch(
          usernameText.innerHTML
        );
      });
      it("can cancel editing", async () => {
        await screen.findByLabelText(/profile-username/i);

        const editBtn = screen.getByRole("button", { name: /edit profile/i });
        userEvent.click(editBtn);

        const cancelBtn = screen.getByRole("button", { name: /cancel/i });
        userEvent.click(cancelBtn);

        expect(
          await screen.findByLabelText(/profile-username/i)
        ).toBeInTheDocument();
      });
    });

    describe("Not profile of authenticated user", () => {
      beforeEach(renderDIFFERENTUsersProfilePage);

      it("does not display update profile button if not users profile", async () => {
        // awaits loaded profile
        await waitForElementToBeRemoved(() =>
          screen.getByText(/loading profile/i)
        );

        // it does not display edit profile button
        const editBtn = screen.queryByRole("button", { name: /edit profile/i });
        expect(editBtn).not.toBeInTheDocument();
      });
    });
  });

  describe("Create card section", () => {
    describe("Profile of authenticated user", () => {
      beforeEach(renderUsersProfilePage);

      it("can create card and add to profile", async () => {
        // it awaits loaded profile and cards
        await screen.findByRole("img", { name: "compass" });

        // it opens form
        const newPostBtn = await screen.findByText(/create picks/i);
        userEvent.click(newPostBtn);

        // form field selectors
        const postCommentField = await screen.findByText(/card comments/i);
        const urlField = await screen.findByRole("textbox", { name: /url/i });

        const submitBtn = await screen.findByRole("button", {
          name: /create picks/i,
        });

        userEvent.type(postCommentField, "CREATE_CARD_TEST1");
        userEvent.type(urlField, "http://www.CREATE_CARD_TEST.com");

        await waitForElementToBeRemoved(
          () => screen.queryByText("Loading preview..."),
          { timeout: 1100 }
        );

        userEvent.click(submitBtn);

        // it hides create form after submit
        await waitForElementToBeRemoved(() =>
          screen.queryByText("Create a Post")
        );

        // it displays created post on page
        const postCommentText = await screen.findByText("CREATE_CARD_TEST1");
        expect(postCommentText).toBeInTheDocument();
      });
      it("can cancel creating card", async () => {
        const newPostBtn = await screen.findByText(/create picks/i);
        userEvent.click(newPostBtn);

        const cancelBtn = await screen.findByText("Cancel");
        userEvent.click(cancelBtn);

        expect(await screen.findByText(/create picks/i)).toBeInTheDocument();
        expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
      });
      it.todo("can not create card with zero picks");
    });
    describe("Not profile of authenticated user", () => {
      beforeEach(renderDIFFERENTUsersProfilePage);

      it("does not display create button if not users profile", async () => {
        expect(screen.queryByText(/create picks/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("Card list section", () => {
    beforeEach(renderUsersProfilePage);

    it("can delete users card", async () => {
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/loading cards/i)
      );

      // it starts with 3 cards
      expect(
        screen.getByRole("list", {
          name: /card-list/i,
        }).children.length
      ).toBe(3);

      const editBtn = await screen.findAllByRole("button", {
        name: "edit",
        exact: true,
      });
      userEvent.click(editBtn[0]);

      const deleteBtn = await screen.findByRole("button", {
        name: /delete picks/i,
      });
      userEvent.click(deleteBtn);

      await waitForElementToBeRemoved(() =>
        screen.queryByText(/loading cards/i)
      );

      expect(
        screen.getByRole("list", {
          name: /card-list/i,
        }).children.length
      ).toBe(2);
    });
    it("does not show edit button if is not users card", async () => {
      const usersCard = await screen.findAllByRole("listitem", {
        name: /card by fakeuser1/i,
      });
      expect(usersCard[0]).toContainHTML("edit</button>");

      const otherUsersCard = await screen.findByRole("listitem", {
        name: /card by A_DIFFERENT_USER/i,
      });

      expect(otherUsersCard).not.toContainHTML("edit</button>");
    });
    it.todo("can update users card");
    it.todo("can cancel updating users card");
  });
});
