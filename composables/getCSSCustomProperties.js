const isSameDomain = (styleSheet) => {
  if (styleSheet.href) {
    return true;
  }

  return styleSheet.ownerNode.dataset.viteDevId.includes("site.css");
};

const isStyleRule = (rule) => rule.type === 1;

function getCSSCustomProperties() {
  const allProps = [...document.styleSheets].filter(isSameDomain).reduce(
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

  const important = [];
  allProps.forEach((prop, index) => {
    if (prop[1].indexOf("!") > -1) {
      important.push({ index: index, family: prop[1] });
    }
  });

  const cssProps = {};

  //using the important array as start and end, we can splice the allProps array

  important.forEach((prop, index) => {
    if (index !== 0) {
      cssProps[allProps[important[index - 1].index][0]] = allProps.slice(
        important[index - 1].index + 1,
        important[index].index
      );
    }
  });

  return cssProps;
}

export default getCSSCustomProperties;
