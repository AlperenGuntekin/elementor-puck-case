export interface ElementorWidget {
  id: string;
  settings: ElementorSettings;
  widgetType: string;
  elType: string;
}

export interface ElementorSettings {
  title?: string;
  text?: string;
  editor?: string;
  url?: string;
  button_type?: 'primary' | 'secondary' | 'outline';
  header_size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right';
  selected_icon?: {
    value: string;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'gray' | 'white';
  layout_type?: string;
  layout_content?: string;
  layout_props?: string;
}

export interface ElementorData {
  content: ElementorWidget[];
  title: string;
}

export interface PuckElement {
  type: string;
  props: PuckProps;
}

export interface PuckProps {
  id: string;
  children?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  alignment?: 'left' | 'center' | 'right';
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  gap?: string;
  ratio?: string;
  columns?: string;
  maxWidth?: string;
  padding?: string;
  content?: PuckElement[];
  leftColumn?: PuckElement[];
  centerColumn?: PuckElement[];
  rightColumn?: PuckElement[];
  [key: string]: unknown;
}

export interface PuckData {
  content: PuckElement[];
  root: {
    props: {
      title: string;
    };
  };
}

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

export const REVERSE_WIDGET_MAPPING: Record<string, string> = {
  'HeadingBlock': 'heading',
  'TextBlock': 'text-editor',
  'ButtonBlock': 'button',
  'IconBlock': 'icon'
};

export const REVERSE_PROPS_MAPPING: Record<string, string> = {
  'children': 'title',
  'level': 'header_size',
  'alignment': 'align',
  'href': 'url',
  'variant': 'button_type'
};
