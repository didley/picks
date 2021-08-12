import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitForElementToBeRemoved } from "testing/testUtils";
import { AuthProvider } from "testing/stubs/authProvider";

import ProfilePage from "./index";

describe("<ProfilePage />", () => {
  describe("Profile section", () => {
    describe("Profile of authenticated user", () => {
      beforeEach(() => {
        // renders authenticated profile with matching username queryString and authenticated user
        const authProviderStub = AuthProvider();
        const routePropsMock = {
          params: { username: "fakeUser1" },
        };
        render(<ProfilePage match={routePropsMock} />, {
          initialState: authProviderStub,
        });
      });

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

        // TODO to fix in component - username is not rendering after update
        // it is visible and not changed
        // const usernameTextAfterUpdate = await screen.findByLabelText(
        //   /profile-username/i
        // );
        // expect(usernameTextAfterUpdate.innerHTML).toMatch(
        //   usernameText.innerHTML
        // );
      });
      it("can cancel editing", async () => {
        const usernameText = await screen.findByLabelText(/profile-username/i);

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
      beforeAll(() => {
        // renders authenticated profile with not matching username queryString and authenticated users username
        const authProviderStub = AuthProvider();
        const routePropsMock = {
          params: { username: "NOT_AUTHED_USERS_USERNAME" },
        };
        render(<ProfilePage match={routePropsMock} />, {
          initialState: authProviderStub,
        });
      });

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
    //
    it.todo("does not display create button if not users profile");
    it.todo("can create card with no more than 5 picks");
    it.todo("can remove picks");
    it.todo("can reorder picks");
    it.todo("can not create card with zero picks");
    it.todo("can cancel creating card");
  });

  describe("Card list section", () => {
    it.todo("does not show edit button if is not users card");
    it.todo("can update users card");
    it.todo("can cancel updating users card");
    it.todo("can delete users card");
  });
});
