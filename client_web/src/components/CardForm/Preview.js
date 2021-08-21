const Preview = ({ preview }) => {
  const { ogType, ogTitle, ogLocale, ogImage, ogDescription } = preview;

  console.log({ preview });
  return (
    <div className="flex gap-2">
      <div>
        {ogImage.url && <img src={ogImage.url} alt="pick" className="w-20" />}
      </div>
      <div>
        {ogTitle && <p>{ogTitle}</p>}
        {ogDescription && (
          <small className="text-gray-500">{ogDescription}</small>
        )}
      </div>
    </div>
  );
};

export default Preview;
