export const WIDGET_MAPPING: Record<string, string> = {
  'heading': 'HeadingBlock',
  'text-editor': 'TextBlock',
  'button': 'ButtonBlock',
  'icon': 'IconBlock'
};

export const PROPS_MAPPING: Record<string, string> = {
  'title': 'children',
  'header_size': 'level',
  'align': 'alignment',
  'text': 'children',
  'editor': 'children'
};

export const getReverseWidgetMapping = (): Record<string, string> => {
  const reverse: Record<string, string> = {};
  Object.entries(WIDGET_MAPPING).forEach(([key, value]) => {
    reverse[value] = key;
  });
  return reverse;
};

export const getReversePropsMapping = (): Record<string, string> => {
  const reverse: Record<string, string> = {};
  Object.entries(PROPS_MAPPING).forEach(([key, value]) => {
    reverse[value] = key;
  });
  return reverse;
};
