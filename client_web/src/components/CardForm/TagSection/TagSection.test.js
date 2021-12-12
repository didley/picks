import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagSection from ".";

const StateProviderMock = ({ opts = { tagLimit: 5 } }) => {
  const [tags, setTags] = React.useState([]);
  return (
    <TagSection
      tagsState={tags}
      tagsSetter={setTags}
      opts={opts}
      disableHiding
    />
  );
};

describe("<TagSection />", () => {
  it("adds tag on enter, space, comma and period", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}wow,cool.");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag", "amazingTag", "wow", "cool"]);
  });
  it("ignores special characters", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag/#{[+=-*&^%$@!{space}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag"]);
  });

  it("the same tag can not be added twice even with different capitalisation", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "wow{enter}wow{enter}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["wow"]);
  });
  it("can remove tags", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}wow,cool.");

    userEvent.click(screen.getAllByRole("button")[0]);
    userEvent.click(screen.getAllByRole("button")[1]);

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);

    expect(tags).toEqual(["amazingTag", "cool"]);
  });
  it("can edit previous tag on empty input backspace", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}{backspace}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag"]);

    expect(screen.getByRole("textbox").value).toBe("amazingTag");
  });
  it("can't add tag with space", () => {
    render(<StateProviderMock />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(
      tagInput,
      "greatTag{space}amazingTag{arrowleft}{arrowleft}{space}{enter}"
    );

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag", "amazingTag"]);
  });
  it("has a working tagLimit prop option 'opts'", () => {
    render(<StateProviderMock opts={{ tagLimit: 5 }} />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "1,2,3,4,5,6,");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["1", "2", "3", "4", "5"]);
  });
  it("hides tag input when tagLimit reached", async () => {
    render(<StateProviderMock opts={{ tagLimit: 5 }} />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "1,2,3,4,5,");

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
  it("minCharLimit option works", () => {
    render(<StateProviderMock opts={{ minCharLimit: 4 }} />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "F,o,u,r,");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["Four"]);
  });
  it("maxCharLimit option works", () => {
    render(<StateProviderMock opts={{ maxCharLimit: 4 }} />);
    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "Fourr,");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["Four"]);
  });
});
