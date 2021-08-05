import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    const cardMock = {
      comments: "I love all of these links",
      picks: [
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
      ],
    };

    const expectedSubmitVals = {
      comments: "I love all of these links",
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
    const postCommentsField = screen.getByLabelText(/^post comments$/i);
    userEvent.type(postCommentsField, cardMock.comments);

    // attempts to add 6 empty pick fields
    const addPickBtn = screen.getByRole("button", { name: /add pick/i });
    for (let i = 0; i < 6; i++) userEvent.click(addPickBtn);

    // picks queries
    const pickTitleField = screen.getAllByLabelText(/title/i);
    const pickUrlField = screen.getAllByLabelText(/url/i);
    const pickCommentsField = screen.getAllByLabelText(/^comments$/i);
    const pickNsfwToggle = screen.getAllByLabelText(/nsfw/i);
    const postPicksBtn = screen.getByRole("button", { name: /post picks/i });

    // enters mockPick into 5 pick fields
    for (let i = 0; i < 5; i++) {
      userEvent.type(pickTitleField[i], cardMock.picks[0].title);
      userEvent.type(pickUrlField[i], cardMock.picks[0].url);
      userEvent.type(pickCommentsField[i], cardMock.picks[0].comments);
      userEvent.click(pickNsfwToggle[i]);
    }

    userEvent.click(postPicksBtn);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedSubmitVals)
    );
  });
});
