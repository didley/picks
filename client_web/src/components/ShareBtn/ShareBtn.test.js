import ShareBtn from "./index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const shareDataStub = {
  url: "http:example.com/",
  title: "Example",
  text: "Example text about example",
};

describe("<ShareBtn />", () => {
  it("should initially call native share api", () => {
    Object.assign(navigator, { share: () => {} });
    jest.spyOn(navigator, "share");

    render(<ShareBtn shareData={shareDataStub} />);
    const shareBtn = screen.getByRole("button");
    userEvent.click(shareBtn);

    expect(navigator.share).toHaveBeenCalledWith(shareDataStub);
  });
  it("should copy url to clipboard if share fails", () => {
    Object.assign(navigator, {
      share: () => {
        throw new Error();
      },
      clipboard: { writeText: () => {} },
    });
    jest.spyOn(navigator, "share");
    jest.spyOn(navigator.clipboard, "writeText");

    render(<ShareBtn shareData={shareDataStub} />);
    const shareBtn = screen.getByRole("button");
    userEvent.click(shareBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      shareDataStub.url
    );
  });
  it("should not change initial btn if share successful", () => {
    Object.assign(navigator, {
      share: () => Promise.resolve(),
    });
    jest.spyOn(navigator, "share");

    render(<ShareBtn shareData={shareDataStub} />);
    const initialShareBtn = screen.getByRole("button");
    userEvent.click(initialShareBtn);

    expect(navigator.share).toHaveBeenCalledWith(shareDataStub);
    expect(screen.getByRole("button").innerHTML).toMatch(
      initialShareBtn.innerHTML
    );
  });
  it("should change btn text to 'copied' on copy and reset alert after 3s", async () => {
    Object.assign(navigator, {
      share: () => {
        throw new Error();
      },
      clipboard: { writeText: () => Promise.resolve() },
    });
    jest.spyOn(navigator, "share");
    jest.spyOn(navigator.clipboard, "writeText");

    render(<ShareBtn shareData={shareDataStub} />);
    const shareBtn = screen.getByRole("button");
    userEvent.click(shareBtn);

    const copiedText = await screen.findByText("copied");
    expect(copiedText).toBeInTheDocument();

    const shareText = await screen.findByText("share", {}, { timeout: 2000 });
    expect(shareText).toBeInTheDocument();
  });
  it("should change btn text to 'error sharing' on error and reset alert after 3s", async () => {
    Object.assign(navigator, {
      share: () => {
        throw new Error();
      },
      clipboard: {
        writeText: () => {
          throw new Error();
        },
      },
    });
    jest.spyOn(navigator, "share");
    jest.spyOn(navigator.clipboard, "writeText");
    jest.spyOn(console, "error").mockImplementation(() => null); // suppresses error log from test console

    render(<ShareBtn shareData={shareDataStub} />);
    const shareBtn = screen.getByRole("button");
    userEvent.click(shareBtn);

    const copiedText = await screen.findByText(/error/i);
    expect(copiedText).toBeInTheDocument();

    const shareText = await screen.findByText("share", {}, { timeout: 3050 });
    expect(shareText).toBeInTheDocument();
  });
});
