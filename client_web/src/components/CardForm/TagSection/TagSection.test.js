import { waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagSection from ".";

describe("<TagSection />", () => {
  it("adds tag on enter, space, comma and period", () => {
    render(<TagSection />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}wow,cool.");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag", "amazingTag", "wow", "cool"]);
  });
  it("ignores special characters", () => {
    render(<TagSection />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag/#{[+=-*&^%$@!{space}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag"]);
  });

  it("the same tag can not be added twice even with different capitalisation", () => {
    render(<TagSection />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "wow{enter}wow{enter}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["wow"]);
  });
  it("can remove tags", () => {
    render(<TagSection />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}wow,cool.");

    userEvent.click(screen.getAllByRole("button")[0]);
    userEvent.click(screen.getAllByRole("button")[1]);

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);

    expect(tags).toEqual(["amazingTag", "cool"]);
  });
  it("can edit previous tag on empty input backspace", () => {
    render(<TagSection />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "greatTag{space}amazingTag{enter}{backspace}");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["greatTag"]);

    expect(screen.getByRole("textbox").value).toBe("amazingTag");
  });
  it("can't add tag with space", () => {
    render(<TagSection />);

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
    render(<TagSection opts={{ tagLimit: 5 }} />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "1,2,3,4,5,6,");

    const tagListItems = screen.getAllByRole("listitem");
    const tags = tagListItems.map((li) => li.textContent);
    expect(tags).toEqual(["1", "2", "3", "4", "5"]);
  });
  it("hides tag input when limit reached", async () => {
    render(<TagSection opts={{ tagLimit: 5 }} />);

    const tagInput = screen.getByRole("textbox");
    userEvent.type(tagInput, "1,2,3,4,5,");

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
  it.todo("maxCharLimit option works");
  it.todo("minCharLimit option works");
  it.todo("error message when when special character used");
  it.todo("error message when attempt to add tag above tagLimit");
});
