import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "testing/testUtils";
import userEvent from "@testing-library/user-event";
import { Card } from "testing/stubs/card";
import { AuthProvider } from "testing/stubs/authProvider";

import CardForm from "./index";

describe("<CardForm />", () => {
  it("submits with no more than 5 picks", async () => {
    const handleSubmit = jest.fn();
    render(
      <CardForm
        isEditing={false}
        onSubmit={(vals, _fomikBag) => handleSubmit(vals)}
      />
    );

    const cardStub = Card();

    const expectedSubmitVals = {
      comments: "I've found some really interesting links this week",
      picks: [
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
      ],
    };

    // adds comment to card
    const postCommentsField = screen.getByLabelText(/^card comments$/i);
    userEvent.type(postCommentsField, cardStub.comments);

    // attempts to add 6 empty pick fields
    const addPickBtn = screen.getByRole("button", { name: /add pick/i });
    for (let i = 0; i < 6; i++) userEvent.click(addPickBtn);

    // picks queries
    const pickTitleField = screen.getAllByLabelText(/title/i);
    const pickUrlField = screen.getAllByLabelText(/url/i);
    const pickCommentsField = screen.getAllByLabelText(/^comments$/i);
    const pickNsfwToggle = screen.getAllByLabelText(/nsfw/i);
    const postPicksBtn = screen.getByRole("button", { name: /create picks/i });

    // enters mockPick into 5 pick fields
    for (let i = 0; i < 5; i++) {
      userEvent.type(pickTitleField[i], cardStub.picks[0].title);
      userEvent.type(pickUrlField[i], cardStub.picks[0].url);
      userEvent.type(pickCommentsField[i], cardStub.picks[0].comments);
      userEvent.click(pickNsfwToggle[i]);
    }

    userEvent.click(postPicksBtn);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedSubmitVals)
    );
  });

  it("can reorder picks", async () => {
    const handleSubmit = jest.fn();
    render(
      <CardForm
        isEditing={false}
        onSubmit={(vals, _fomikBag) => handleSubmit(vals)}
      />
    );

    const cardStub = {
      comments: "I've found some really interesting links this week",
      picks: [
        {
          title: "first",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks1",
          nsfw: true,
        },
        {
          title: "second",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks2",
          nsfw: true,
        },
        {
          title: "third",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks3",
          nsfw: true,
        },
      ],
    };

    const expectedSubmitVals = {
      comments: "I've found some really interesting links this week",
      picks: [
        {
          title: "third",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks3",
          nsfw: true,
        },
        {
          title: "first",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks1",
          nsfw: true,
        },
        {
          title: "second",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks2",
          nsfw: true,
        },
      ],
    };

    // adds comment to card
    const postCommentsField = screen.getByLabelText(/^card comments$/i);
    userEvent.type(postCommentsField, cardStub.comments);

    // adds 3 empty pick fields
    const addPickBtn = screen.getByRole("button", { name: /add pick/i });
    for (let i = 0; i < 2; i++) userEvent.click(addPickBtn);

    // picks queries
    const pickTitleField = await screen.findAllByLabelText(/title/i);
    const pickUrlField = await screen.findAllByLabelText(/url/i);
    const pickCommentsField = await screen.findAllByLabelText(/^comments$/i);
    const pickNsfwToggle = await screen.findAllByLabelText(/nsfw/i);
    const postPicksBtn = await screen.findByRole("button", {
      name: /create picks/i,
    });

    // enters 3 pick fields
    for (let i = 0; i < 3; i++) {
      userEvent.type(pickTitleField[i], cardStub.picks[i].title);
      userEvent.type(pickUrlField[i], cardStub.picks[i].url);
      userEvent.type(pickCommentsField[i], cardStub.picks[i].comments);
      userEvent.click(pickNsfwToggle[i]);
    }

    const moveUpButtons = await screen.findAllByRole("button", {
      name: "move-up",
    });
    const moveDownButtons = await screen.findAllByRole("button", {
      name: "move-down",
    });
    userEvent.click(moveUpButtons[0]);
    userEvent.click(moveUpButtons[1]);
    userEvent.click(moveDownButtons[0]);
    userEvent.click(moveDownButtons[1]);

    userEvent.click(postPicksBtn);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedSubmitVals)
    );
  });
  it.only("can remove picks", async () => {
    const handleSubmit = jest.fn();
    const authProviderStub = AuthProvider();

    render(
      <CardForm
        isEditing={false}
        onSubmit={(vals, _fomikBag) => handleSubmit(vals)}
      />,
      {
        initialState: authProviderStub,
      }
    );

    const cardStub = {
      comments: "I've found some really interesting links this week",
      picks: [
        { url: "http://howToPicks.com", nsfw: true },
        { url: "http://howToPicks.com", nsfw: true },
        { url: "http://howToPicks.com", nsfw: true },
      ],
    };

    const expectedSubmitVals = {
      comments: "I've found some really interesting links this week",
      picks: [{ url: "http://howToPicks.com", nsfw: true }],
    };

    // adds comment to card
    const postCommentsField = screen.getByLabelText(/^card comments$/i);
    userEvent.type(postCommentsField, cardStub.comments);

    // adds 3 empty pick fields
    const addPickBtn = screen.getByRole("button", { name: /add pick/i });
    userEvent.click(addPickBtn);
    userEvent.click(addPickBtn);
    userEvent.click(addPickBtn);

    // picks queries
    const pickUrlFields = await screen.findAllByLabelText(/url/i);
    const pickNsfwToggles = await screen.findAllByLabelText(/nsfw/i);
    const postPicksBtn = await screen.findByRole("button", {
      name: /create picks/i,
    });

    // enters 3 pick fields
    // ! its a long running test because of the saga preview debounce
    // ! its not returning picks as they are within state, maybe move all form to global state
    userEvent.type(pickUrlFields[0], cardStub.picks[0].url);
    userEvent.click(pickNsfwToggles[0]);
    await waitForElementToBeRemoved(
      () => screen.queryByText(/Loading preview.../i),
      { timeout: 1200 }
    );

    userEvent.type(pickUrlFields[1], cardStub.picks[1].url);
    userEvent.click(pickNsfwToggles[1]);
    await waitForElementToBeRemoved(
      () => screen.queryByText(/Loading preview.../i),
      { timeout: 1200 }
    );

    userEvent.type(pickUrlFields[1], cardStub.picks[1].url);
    userEvent.click(pickNsfwToggles[1]);
    await waitForElementToBeRemoved(
      () => screen.queryByText(/Loading preview.../i),
      { timeout: 1200 }
    );

    const removeButtons = await screen.findAllByRole("button", {
      name: /remove/i,
    });
    userEvent.click(removeButtons[0]);
    userEvent.click(removeButtons[0]);

    // screen.debug();

    userEvent.click(postPicksBtn);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedSubmitVals)
    );
  });
});
