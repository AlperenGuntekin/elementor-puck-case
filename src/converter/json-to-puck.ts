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

const LAYOUT_COMPONENTS = ['Container', 'TwoColumn', 'ThreeColumn', 'Grid'];

export class JsonToPuckConverter {
  
  convert(elementorData: ElementorData): PuckData {
    const puckElements: PuckElement[] = [];
    
    for (const widget of elementorData.content) {
      if (widget.settings.layout_type && widget.settings.layout_content) {
        const layoutElement = this.convertLayoutFromElementor(widget);
        puckElements.push(layoutElement);
      } else {
        if (widget.id.includes('TwoColumn') || widget.id.includes('Grid') || widget.id.includes('ThreeColumn')) {
          continue;
        }
        
        const fixedWidget = this.fixWidgetMismatches(widget);
        const puckElement = this.convertWidget(fixedWidget);
        puckElements.push(puckElement);
      }
    }

    return {
      content: puckElements,
      root: { 
        props: { title: elementorData.title || 'Page Title' }
      }
    };
  }

  convertBack(puckData: PuckData): ElementorData {
    const elementorWidgets: ElementorWidget[] = [];
    
    for (const element of puckData.content) {
      if (LAYOUT_COMPONENTS.includes(element.type)) {
        const layoutWidget = this.convertLayoutToElementor(element);
        elementorWidgets.push(layoutWidget);
      } else {
        const widget = this.convertElementBack(element);
        elementorWidgets.push(widget);
      }
    }
    
    return {
      content: elementorWidgets,
      title: puckData.root?.props?.title || 'Untitled'
    };
  }

  private convertLayoutToElementor(layoutElement: PuckElement): ElementorWidget {
    const layoutContent = this.extractContentFromLayout(layoutElement);
    const layoutProps = {
      type: layoutElement.type,
      gap: layoutElement.props.gap,
      ratio: layoutElement.props.ratio,
      columns: layoutElement.props.columns,
      maxWidth: layoutElement.props.maxWidth,
      padding: layoutElement.props.padding
    };

    return {
      id: layoutElement.props.id || this.generateElementorId(layoutElement.type),
      settings: {
        layout_type: this.getLayoutType(layoutElement.type),
        layout_content: JSON.stringify(layoutContent),
        layout_props: JSON.stringify(layoutProps)
      },
      widgetType: 'text-editor', // Use text-editor as container
      elType: 'widget'
    };
  }

  private getLayoutType(puckType: string): 'container' | 'two_column' | 'three_column' | 'grid' {
    switch (puckType) {
      case 'Container': return 'container';
      case 'TwoColumn': return 'two_column';
      case 'ThreeColumn': return 'three_column';
      case 'Grid': return 'grid';
      default: return 'container';
    }
  }

  private extractContentFromLayout(layoutElement: PuckElement): PuckElement[] {
    const content: PuckElement[] = [];
    
    switch (layoutElement.type) {
      case 'Container':
        if (layoutElement.props.content) {
          content.push(...layoutElement.props.content);
        }
        break;
        
      case 'TwoColumn':
        if (layoutElement.props.leftColumn) {
          content.push(...layoutElement.props.leftColumn);
        }
        if (layoutElement.props.rightColumn) {
          content.push(...layoutElement.props.rightColumn);
        }
        break;
        
      case 'ThreeColumn':
        if (layoutElement.props.leftColumn) {
          content.push(...layoutElement.props.leftColumn);
        }
        if (layoutElement.props.centerColumn) {
          content.push(...layoutElement.props.centerColumn);
        }
        if (layoutElement.props.rightColumn) {
          content.push(...layoutElement.props.rightColumn);
        }
        break;
        
      case 'Grid':
        if (layoutElement.props.content) {
          content.push(...layoutElement.props.content);
        }
        break;
    }
    
    return content;
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
    
    const id = element.props.id || this.generateElementorId(element.type);
    
    return {
      id,
      settings,
      widgetType,
      elType: 'widget'
    };
  }

  private generateElementorId(type: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 8);
    return `${type}-${timestamp}-${random}`;
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

    if (props.level) {
      if (props.children) {
        settings.title = props.children;
      }
      settings.header_size = props.level;
      if (props.alignment) {
        settings.align = props.alignment;
      }
    }
    else if (props.href) {
      if (props.children) {
        settings.text = props.children;
      }
      settings.url = props.href;
      settings.button_type = props.variant || 'primary';
      if (props.alignment) {
        settings.align = props.alignment;
      }
    }
    else if (props.icon) {
      settings.selected_icon = { value: props.icon };
      settings.size = this.mapIconSizeBack(props.size || 'medium');
      settings.color = this.mapIconColorBack(props.color || '#3B82F6');
      if (props.alignment) {
        settings.align = props.alignment;
      }
    }
    else {
      if (props.children) {
        settings.editor = props.children;
      }
      if (props.alignment) {
        settings.align = props.alignment;
      }
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

  private convertLayoutFromElementor(widget: ElementorWidget): PuckElement {
    try {
      const layoutContent = JSON.parse(widget.settings.layout_content || '[]');
      const layoutProps = JSON.parse(widget.settings.layout_props || '{}');
      
      const convertedContent = layoutContent.map((item: any) => {
        if (typeof item === 'object' && item.type) {
          return item; 
        } else {
          return this.convertWidget(item);
        }
      });

      const layoutType = layoutProps.type || 'Container';
      const props: any = {
        id: widget.id,
        gap: layoutProps.gap || 'md',
        ratio: layoutProps.ratio || '1fr 1fr',
        columns: layoutProps.columns || '3',
        maxWidth: layoutProps.maxWidth || 'lg',
        padding: layoutProps.padding || 'md'
      };

      switch (layoutType) {
        case 'TwoColumn':
          const midPoint = Math.ceil(convertedContent.length / 2);
          props.leftColumn = convertedContent.slice(0, midPoint);
          props.rightColumn = convertedContent.slice(midPoint);
          break;
        case 'ThreeColumn':
          const third = Math.ceil(convertedContent.length / 3);
          props.leftColumn = convertedContent.slice(0, third);
          props.centerColumn = convertedContent.slice(third, third * 2);
          props.rightColumn = convertedContent.slice(third * 2);
          break;
        case 'Grid':
          props.content = convertedContent;
          break;
        default: 
          props.content = convertedContent;
          break;
      }

      return {
        type: layoutType,
        props
      };
    } catch (error) {
      console.error('Error converting layout from Elementor:', error);
      return {
        type: 'Container',
        props: {
          id: widget.id,
          content: []
        }
      };
    }
  }

  private fixWidgetMismatches(widget: ElementorWidget): ElementorWidget {
    if (widget.widgetType === 'button' && widget.settings.editor && !widget.settings.text) {
      return {
        ...widget,
        settings: {
          ...widget.settings,
          text: widget.settings.editor,
          editor: undefined
        }
      };
    }
    return widget;
  }
}
