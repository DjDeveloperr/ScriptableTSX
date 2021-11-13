/// <reference path="./env.d.ts" />

function processJSXColor(color: JSX.JSXColor) {
  return typeof color === "string"
    ? new Color(color)
    : typeof color === "number"
    ? new Color("#" + color.toString(16).padStart(6, "0"))
    : color;
}

function processTextProps(text: WidgetText | WidgetDate, props: JSX.TextProps) {
  switch (props.align) {
    case "left":
      text.leftAlignText();
      break;
    case "right":
      text.rightAlignText();
      break;
    case "center":
      text.centerAlignText();
      break;
  }

  if (props.font) {
    text.font = props.font;
  }

  if (props.color) {
    text.textColor = processJSXColor(props.color);
  }

  if (props.lineLimit) {
    text.lineLimit = props.lineLimit;
  }

  if (props.minimumScaleFactor) {
    text.minimumScaleFactor = props.minimumScaleFactor;
  }

  if (props.opacity) {
    text.textOpacity = props.opacity;
  }

  if (props.shadowColor) {
    text.shadowColor = processJSXColor(props.shadowColor);
  }

  if (props.shadowOffset) {
    text.shadowOffset = props.shadowOffset;
  }

  if (props.shadowRadius) {
    text.shadowRadius = props.shadowRadius;
  }

  if (props.url) {
    text.url = props.url;
  }
}

function processStackProps(stack: WidgetStack, props: JSX.StackProps) {
  switch (props.align) {
    case "top":
      stack.topAlignContent();
      break;
    case "bottom":
      stack.bottomAlignContent();
      break;
    case "center":
      stack.centerAlignContent();
      break;
  }

  if (props.backgroundColor) {
    stack.backgroundColor = processJSXColor(props.backgroundColor);
  }

  if (props.backgroundGradient) {
    stack.backgroundGradient = props.backgroundGradient;
  }

  if (props.backgroundImage) {
    stack.backgroundImage = props.backgroundImage;
  }

  if (props.borderColor) {
    stack.borderColor = processJSXColor(props.borderColor);
  }

  if (props.borderWidth) {
    stack.borderWidth = props.borderWidth;
  }

  if (props.cornerRadius) {
    stack.cornerRadius = props.cornerRadius;
  }

  if (props.size) {
    stack.size = props.size;
  }

  if (props.spacing) {
    stack.spacing = props.spacing;
  }

  if (props.url) {
    stack.url = props.url;
  }
}

function processImageProps(image: WidgetImage, props: JSX.ImageProps) {
  switch (props.align) {
    case "left":
      image.leftAlignImage();
      break;
    case "right":
      image.rightAlignImage();
      break;
    case "center":
      image.centerAlignImage();
      break;
  }

  if (props.size) {
    image.imageSize = props.size;
  }

  if (props.borderColor) {
    image.borderColor = processJSXColor(props.borderColor);
  }

  if (props.borderWidth) {
    image.borderWidth = props.borderWidth;
  }

  if (props.containerRelativeShape) {
    image.containerRelativeShape = props.containerRelativeShape;
  }

  switch (props.contentMode) {
    case "filling":
      image.applyFillingContentMode();
      break;
    case "fitting":
      image.applyFittingContentMode();
      break;
  }

  if (props.cornerRadius) {
    image.cornerRadius = props.cornerRadius;
  }

  if (props.opacity) {
    image.imageOpacity = props.opacity;
  }

  if (props.resizable) {
    image.resizable = props.resizable;
  }

  if (props.tintColor) {
    image.tintColor = processJSXColor(props.tintColor);
  }

  if (props.url) {
    image.url = props.url;
  }
}

function processWidgetProps(widget: ListWidget, props: JSX.WidgetProps) {
  if (props.backgroundColor) {
    widget.backgroundColor = processJSXColor(props.backgroundColor);
  }

  if (props.backgroundGradient) {
    widget.backgroundGradient = props.backgroundGradient;
  }

  if (props.backgroundImage) {
    widget.backgroundImage = props.backgroundImage;
  }

  if (props.refreshAfterDate) {
    widget.refreshAfterDate = props.refreshAfterDate;
  }

  if (props.spacing !== undefined) {
    widget.spacing = props.spacing;
  }

  if (props.url) {
    widget.url = props.url;
  }
}

function processContainerChildren(widget: IContainer, children: any[]) {
  for (const child of children) {
    if (
      child === null || child === undefined || child === false ||
      typeof child === "function"
    ) {
      continue;
    } else if (
      typeof child === "string" || typeof child === "number" ||
      typeof child === "bigint" || typeof child === "symbol" || child === true
    ) {
      widget.addText(String(child));
    } else if (typeof child === "object") {
      if (child instanceof Array) {
        processContainerChildren(widget, child);
      } else if (child instanceof Date) {
        widget.addDate(child);
      } else if (child instanceof Image) {
        widget.addImage(child);
      } else if ("type" in child) {
        switch (child.type) {
          case "text": {
            const text = widget.addText(child.text);
            processTextProps(text, child.props || {});
            break;
          }

          case "date": {
            const init = child.props.date;
            const date = widget.addDate(
              init instanceof Date ? init : new Date(init),
            );

            switch (child.props.style as JSX.DateStyle) {
              case "date":
                date.applyDateStyle();
                break;
              case "offset":
                date.applyOffsetStyle();
                break;
              case "time":
                date.applyTimeStyle();
                break;
              case "relative":
                date.applyRelativeStyle();
                break;
              case "timer":
                date.applyTimerStyle();
                break;
            }

            processTextProps(date, child.props || {});
            break;
          }

          case "vstack":
          case "hstack": {
            const stack = widget.addStack();
            if (child.type === "vstack") {
              stack.layoutVertically();
            }
            processStackProps(stack, child.props || {});
            processContainerChildren(stack, child.children);
            break;
          }

          case "spacer": {
            const spacer = widget.addSpacer();
            if (child.props.size) {
              spacer.length = child.props.length;
            }
            break;
          }

          case "image": {
            let init;
            if (child.props.image) {
              init = child.props.image;
            } else if (child.props.data) {
              init = Image.fromData(child.props.data);
            } else if (child.props.fileURL) {
              init = Image.fromFile(child.props.fileURL);
            }

            const image = widget.addImage(init);
            processImageProps(image, child.props || {});
            break;
          }
        }
      }
    }
  }
}

export class Scriptable {
  static createElement(
    element: unknown,
    props: Record<string, any>,
    ...children: any[]
  ) {
    if (typeof element === "string") {
      // intrinsic element
      switch (element) {
        case "widget":
          const widget = new ListWidget();
          processContainerChildren(widget, children);
          processWidgetProps(widget, props || {});
          return widget;
        case "text":
          let text = "";
          for (let child of children) {
            if (
              typeof child === "string" ||
              typeof child === "number" ||
              typeof child === "bigint"
            ) {
              text += child;
            }
          }
          return { type: element, props, text };
        case "hstack":
        case "vstack":
          return { type: element, props, children };
        case "spacer":
          return { type: element, props };
        case "image":
          return { type: element, props };
        case "date":
          return { type: element, props };
      }
    }
  }
}
