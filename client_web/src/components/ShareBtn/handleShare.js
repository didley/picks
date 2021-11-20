export const handleShare = async (
  shareData = { url: "", text: "", title: "" },
  stateHandlerCallback
) => {
  try {
    await navigator.share(shareData);
  } catch (e) {
    if (e.name === "AbortError") return;

    try {
      async function copyToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          throw e;
        }
      }
      await copyToClipboard(shareData.url);

      stateHandlerCallback("clipped");
    } catch (e) {
      console.error(e);
      stateHandlerCallback("error");
    }
  }
};
