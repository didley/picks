export const handleShare = async (shareData, stateHandlerCallback) => {
  try {
    await navigator.share(shareData);
  } catch (e) {
    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        throw e;
      }
    }

    try {
      await copyToClipboard(shareData.url);
      stateHandlerCallback("clipped");
    } catch (e) {
      console.error(e);
      stateHandlerCallback("error");
    }
  }
};
