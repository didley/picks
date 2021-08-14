import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "testing/stubs/card";

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
    const postCommentsField = screen.getByLabelText(/^post comments$/i);
    userEvent.type(postCommentsField, cardStub.comments);

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

  it.todo("can remove picks");
  it.todo("can reorder picks");
});
