import { truncStr } from "./truncateString";

export const truncatePicksWithinCard = (card) => {
  const truncPreview = ({
    ogImage,
    ogTitle,
    ogDescription,
    ogType,
    ogLocale,
  }) => {
    ogImage.url = truncStr(ogImage?.url, 250);
    ogTitle = truncStr(ogTitle, 200, { ellipsis: true });
    ogDescription = truncStr(ogDescription, 200, { ellipsis: true });
    ogType = truncStr(ogType, 120);
    ogLocale = truncStr(ogLocale, 10);

    return {
      ogImage: { url: ogImage.url },
      ogTitle,
      ogDescription,
      ogType,
      ogLocale,
    };
  };

  const truncatedPicks = card?.picks.map((pick) => {
    if (!pick.preview) return pick;

    const truncatedPreview = truncPreview(pick.preview);

    return { ...pick, preview: truncatedPreview };
  });

  const truncatedCard = { ...card, picks: truncatedPicks };

  return truncatedCard;
};
