import { 
  ElementorData, 
  ElementorWidget, 
  ElementorSettings,
  PuckData, 
  PuckElement, 
  PuckProps,
  WIDGET_MAPPING,
  REVERSE_WIDGET_MAPPING
} from '../types';

// Widget type mapping
const PROPS_MAPPING: Record<string, string> = {
  'title': 'children',
  'header_size': 'level',
  'align': 'alignment',
  'text': 'children',
  'editor': 'children'
};

// Reverse mapping for convertBack
const REVERSE_PROPS_MAPPING: Record<string, string> = {
  'children': 'title', 
  'level': 'header_size',
  'alignment': 'align',
  'href': 'url',
  'variant': 'button_type'
};

export class JsonToPuckConverter {
  
  // Convert Elementor JSON to Puck format
  convert(elementorData: ElementorData): PuckData {
    return {
      content: elementorData.content.map(widget => this.convertWidget(widget)),
      root: { 
        props: { title: elementorData.title || 'Page Title' }
      }
    };
  }

  // Convert Puck format back to Elementor JSON
  convertBack(puckData: PuckData): ElementorData {
    return {
      content: puckData.content.map(element => this.convertElementBack(element)),
      title: puckData.root?.props?.title || 'Untitled'
    };
  }

  private convertWidget(widget: ElementorWidget): PuckElement {
    const componentType = WIDGET_MAPPING[widget.widgetType] || 'TextBlock';
    const props = this.mapProps(widget.settings, widget.id);
    
    return { 
      type: componentType, 
      props 
    };
  }

  private convertElementBack(element: PuckElement): ElementorWidget {
    const widgetType = REVERSE_WIDGET_MAPPING[element.type] || 'text-editor';
    const settings = this.mapPropsBack(element.props);
    
    return {
      id: element.props.id || Math.random().toString(36).substr(2, 8),
      settings,
      widgetType,
      elType: 'widget'
    };
  }

  private mapProps(settings: ElementorSettings, id: string): PuckProps {
    const props: PuckProps = { id };

    if (settings.title) {
      props.children = settings.title;
    }
    
    if (settings.text) {
      props.children = settings.text;
    }
    
    if (settings.editor) {
      props.children = settings.editor;
    }

    if (settings.header_size) {
      props.level = settings.header_size;
    }

    if (settings.align) {
      props.alignment = settings.align;
    }

    if (settings.text && settings.url) {
      props.href = settings.url;
      props.variant = settings.button_type || 'primary';
    }

    if (settings.selected_icon?.value) {
      props.icon = settings.selected_icon.value;
      props.size = this.mapIconSize(settings.size || 'md');
      props.color = this.mapIconColor(settings.color || 'primary');
    }

    return props;
  }

  mapPropsBack(props: PuckProps): ElementorSettings {
    const settings: ElementorSettings = {};

    if (props.children) {
      if (props.level) {
        settings.title = props.children;
        settings.header_size = props.level;
      } else if (props.href) {
        settings.text = props.children;
        settings.url = props.href;
        settings.button_type = props.variant || 'primary';
      } else {
        settings.editor = props.children;
      }
    }

    if (props.alignment) {
      settings.align = props.alignment;
    }

    if (props.icon) {
      settings.selected_icon = { value: props.icon };
      settings.size = this.mapIconSizeBack(props.size || 'medium');
      settings.color = this.mapIconColorBack(props.color || '#3B82F6');
    }

    return settings;
  }

  getWidgetTypeFromPuckType(puckType: string): string {
    return REVERSE_WIDGET_MAPPING[puckType] || 'text-editor';
  }

  private mapIconSize(elementorSize: 'sm' | 'md' | 'lg' | 'xl'): 'small' | 'medium' | 'large' {
    switch (elementorSize) {
      case 'sm': return 'small';
      case 'lg': 
      case 'xl': return 'large';
      default: return 'medium';
    }
  }

  private mapIconSizeBack(puckSize: 'small' | 'medium' | 'large'): 'sm' | 'md' | 'lg' | 'xl' {
    switch (puckSize) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      default: return 'md';
    }
  }

  private mapIconColor(elementorColor: 'primary' | 'secondary' | 'gray' | 'white'): string {
    switch (elementorColor) {
      case 'primary': return '#3B82F6';
      case 'secondary': return '#6B7280';
      case 'gray': return '#9CA3AF';
      case 'white': return '#FFFFFF';
      default: return '#3B82F6';
    }
  }

  private mapIconColorBack(puckColor: string): 'primary' | 'secondary' | 'gray' | 'white' {
    switch (puckColor) {
      case '#6B7280': return 'secondary';
      case '#9CA3AF': return 'gray';
      case '#FFFFFF': return 'white';
      default: return 'primary';
    }
  }
}
