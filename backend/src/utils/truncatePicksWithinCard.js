import { truncStr } from "./truncateString";

export const truncatePicksWithinCard = (card) => {
  const truncPreview = ({
    ogImage,
    ogTitle,
    ogDescription,
    ogType,
    ogLocale,
  }) => {
    const ogImageUrl = ogImage.url ? truncStr(ogImage?.url, 250) : undefined;
    ogTitle = truncStr(ogTitle, 200, { ellipsis: true });
    ogDescription = truncStr(ogDescription, 200, { ellipsis: true });
    ogType = truncStr(ogType, 120);
    ogLocale = truncStr(ogLocale, 10);

    return {
      ogImageUrl,
      ogTitle,
      ogDescription,
      ogType,
      ogLocale,
    };
  };

  const truncatedPicks = card?.picks.map((pick) => {
    if (pick.preview === undefined || Object.keys(pick.preview).length === 0) {
      return pick;
    }

    const truncatedPreview = truncPreview(pick.preview);

    return { ...pick, preview: truncatedPreview };
  });

  const truncatedCard = { ...card, picks: truncatedPicks };

  return truncatedCard;
};
