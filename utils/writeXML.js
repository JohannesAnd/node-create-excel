const space = "  ";

const generateOpeningTag = (tag, props, level) => {
  let tagData = `<${tag}>`;
  if (Object.keys(props).length > 0) {
    const propsData = Object.keys(props).map(propKey => `${propKey}="${props[propKey]}"`).join(" ");
    tagData = `<${tag} ${propsData}>`;
  }
  const spacing = space.repeat(level)
  return spacing + tagData + "\n";
}

const generateSelfClosingTag = (tag, props, level) => {
  let tagData = `<${tag}/>`;
  if (Object.keys(props).length > 0) {
    const propsData = Object.keys(props).map(propKey => `${propKey}="${props[propKey]}"`).join(" ");
    tagData = `<${tag} ${propsData}/>`;
  }
  const spacing = space.repeat(level)
  return spacing + tagData + "\n";
}

const generateClosingTag = (tag, level) => {
  const tagData = `</${tag}>`;
  const spacing = space.repeat(level)

  return spacing + tagData + "\n";
}

const createChildren = (data, level) => {
  if (!level) level = 0;
  if (data.content) {
    const opening = generateOpeningTag(data.tag, data.props || {}, level);
    const middle = space.repeat(level + 1) + data.content + "\n";
    const closing = generateClosingTag(data.tag, level)
    return opening + middle + closing;
  }
  if (data.children && data.children.length > 0) {
    const opening = generateOpeningTag(data.tag, data.props || {}, level);
    const middle = data.children.map(child => createChildren(child, level + 1)).join("");
    const closing = generateClosingTag(data.tag, level)
    return opening + middle + closing;
  } else {
    return generateSelfClosingTag(data.tag, data.props || {}, level);
  }
}

module.exports = (data) => {
  const testString = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> \n\n`;

  if (data instanceof Array) {
    return testString + data.map(el => createChildren(el)).join("");
  }
  return testString + createChildren(data);
};
