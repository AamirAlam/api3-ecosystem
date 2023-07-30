const isSameDomain = (styleSheet) => {
  if (!styleSheet.href) {
    return true;
  }

  return styleSheet.href.indexOf(window.location.origin) === 0;
};

const isStyleRule = (rule) => rule.type === 1;

const getCSSCustomProperties = () =>
  [...document.styleSheets].filter(isSameDomain).reduce(
    (finalArr, sheet) =>
      finalArr.concat(
        [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
          const props = [...rule.style]
            .map((propName) => [
              propName.trim(),
              rule.style.getPropertyValue(propName).trim(),
            ])
            .filter(([propName]) => propName.indexOf("--") === 0);

          return [...propValArr, ...props];
        }, [])
      ),
    []
  );

export default getCSSCustomProperties;
