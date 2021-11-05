// Docs are very much copied from https://docs.scriptable.app

/**
 * Adds messages to the log.
 *
 * The console can be used to log information when running your script.
 * The log may be useful when debugging your script, e.g. to examine
 * values of variables.
 */
declare class console {
  /**
   * Logs a message to the console.
   *
   * The message will have a default appearance. Refer to `console.error(message)` to log errors.
   *
   * You can also use the global function `log(message)` which is a shorthand for `console.log`.
   *
   * @param message Message to log to the console.
   */
  static log(message: any): void;

  /**
   * Logs a warning message to the console.
   *
   * The message will have a distinctive appearance. Refer to `console.log(message)`
   * to log informative messages and `console.error(message)` to log errors.
   *
   * You can also use the global function `logWarning(message)` which is a shorthand for `console.warn`.
   *
   * @param message Message to log to the console.
   */
  static warn(message: any): void;

  /**
   * Logs an error message to the console.
   *
   * The message will have a distinctive appearance. Refer to `console.log(message)`
   * to log informative message and `console.warn(message)` to log warnings.
   *
   * You can also use the global function `logError(message)` which is a shorthand for `console.error`.
   *
   * @param message Message to log to the console.
   */
  static error(message: any): void;

  /**
   * Logs an error message to the console.
   *
   * @deprecated Deprecated in version 1.3. Use `console.error(message)` instead.
   */
  static logError(message: any): void;
}

/** Shorthand for `console.log` */
declare function log(message: any): void;

/** Shorthand for `console.warn` */
declare function logWarning(message: any): void;

/** Shorthand for `console.error` */
declare function logError(message: any): void;

declare class module {
  /**
   * This is the absolute path to the file containing the module.
   */
  static readonly filename: string;

  /**
   * Exported functions and modules.
   *
   * Values assigned to exports are returned by the global importModule function
   * when the module is imported.
   *
   * exports can be of any type but by default it is an empty object. Consider
   * the following example which exports the area and circumference functions.
   *
   * ```js
   * module.exports.area = (r) => {
   *   return Math.PI * Math.pow(r, 2)
   * }
   * ```
   *
   * ```js
   * module.exports.circumference = (r) => {
   *   return 2 * Math.PI * r
   * }
   * ```
   *
   * Alternatively if you only need to export a single function or object, you
   * can assign directly to the exports property as shown in the following
   * examples.
   *
   * ```js
   * module.exports = (r) => {
   *   return 2 * Math.PI * r
   * }
   * ```
   *
   * ```js
   * module.exports = "My string"
   * ```
   */
  static exports: any;
}

/**
 * Imports module with specified name.
 *
 * Modules are imported by specifying the name of the file. For example,
 * to import the file `foo.js`, call `importModule('foo')`. Including the
 * file extension is optional. Scriptable will look for modules in the
 * following directories, in order:
 *
 * - Relative to the file the module is imported into.
 *
 * - In Scriptables folder in iCloud if you have iCloud Drive enabled.
 *
 * - This folder is accessible from the Files app.
 *
 * - In Scriptables "app group" folder which is not accessible to the user but
 *   your scripts are stored in this folder if you do not have iCloud Drive
 *   enabled.
 *
 * - In Scriptables local folder. This folder is accessible from the Files app.
 *
 * - You can specify a file path rather than the name of a file e.g. `importModule('/lib/foo')`.
 *   If the path points to a directory, Scriptable will look for a file named index.js in the
 *   directory.
 *
 * The importModule function returns module.exports of the imported module.
 *
 * @param name Name of the module to import.
 */
declare function importModule(name: string): any;

/** Contains information about the configuration the script is currently being run under. */
declare class config {
  /** Whether the script is running in the app. */
  static readonly runsInApp: boolean;

  /** Whether the script is running in the action extension. */
  static readonly runsInActionExtension: boolean;

  /** Whether the script is running with Siri. */
  static readonly runsWithSiri: boolean;

  /** Whether the script is running in a widget. */
  static readonly runsInWidget: boolean;

  /** Whether the script is running in a notification. */
  static readonly runsInNotification: boolean;

  /**
   * Whether the script was run from the home screen. You can add a script to the home screen from the script settings. */
  static readonly runsFromHomeScreen: boolean;

  /**
   * The size of the widget the script is running in.
   *
   * Possible values are: `small`, `medium`, `large` and `null`. The value is
   * null when the script is not running in a widget.
   */
  static readonly widgetFamily: "small" | "medium" | "large" | null;
}

/**
 * Arguments are passed to the script when the script is executed from a share sheet.
 * You can specify the types of arguments a script supports from the script settings.
 */
declare class args {
  /**
   * Number of arguments supplied by a share sheet.
   *
   * @deprecated Deprecated in version 1.3. Instead of relying on this property,
   * take the length of the array containing the data type you are interested in.
   */
  static readonly length: number;

  /**
   * All arguments supplied by the share sheet.
   *
   * @deprecated Deprecated in version 1.3. Instead of relying on this property,
   * access the array containing the data type you are interested in.
   */
  static readonly all: any[];

  /**
   * All plain texts passed to the script from a share sheet or a shortcut action.
   *
   * If you have enabled "Text" as a share sheet input from the script settings, the script
   * can be run from any share sheet throughout the system that shares plain text.
   */
  static readonly plainTexts: string[];

  /**
   * All URLs passed to the script from a share sheet or a shortcut action.
   *
   * If you have enabled "URLs" as a share sheet input from the script settings, the script
   * can be run from any share sheet throughout the system that shares URLs.
   */
  static readonly urls: string[];

  /**
   * All file URLs passed to the script from a share sheet or a shortcut action.
   *
   * If you have enabled "File URLs" as a share sheet input from the script settings, the
   * script can be run from any share sheet throughout the system that shares URLs pointing
   * to a file.
   *
   * When large files are passed from a share sheet or a shortcut action, the system may
   * terminate the process due to memory constraints. In that case, you should enable "Run in App"
   * in the script settings or in the shortcut.
   */
  static readonly fileURLs: string[];

  /**
   * All images passed to the script from a share sheet or a shortcut action.
   *
   * If you have enabled "Images" as a share sheet input from the script settings, the
   * script can be run from any share sheet throughout the system that shares images.
   *
   * When large images are passed from a share sheet or a shortcut action, the system may
   * terminate the process due to memory constraints. In that case, you should enable "Run in App"
   * in the script settings or in the shortcut.
   */
  static readonly images: Image[];

  /**
   * Query parameters are supplied to a script when running it from a URL scheme. See the
   * documentation on Scriptables URL schemes for more information.
   */
  static readonly queryParameters: Record<string, string>;

  /**
   * When creating a Siri Shortcut in Scriptable, you can define arguments that are passed
   * to the script when the shortcut is run. This lets you differentiate the behavior of a
   * script based on some predefiend arguments.
   *
   * For example, a script that checks the wather may expect an argument with the key "city".
   * When creating a Siri Shortcut for the script, the argument should be passed with the value
   * containing the name of the city to check the weather for.
   *
   * @deprecated Deprecated in version 1.4. Instead of using args.shortcutArguments, pass an
   * input parameter to the shortcut action using the Shortcuts app and read the parameter using
   * `args.shortcutParameter`.
   */
  static readonly siriShortcutArguments: Record<string, string>;

  /**
   * When creating a shortcut using the Shortcuts app, you can pass an input parameter that
   * can be read in your script using `args.shortcutParameter`.
   *
   * This parameter can be any text, list, dictionary or file and will be exposed in your
   * script using the appropriate type. When passing a file, the "Run Script" action will
   * attempt to read the file as JSON or a plain text. If the file cannot be read as JSON
   * or a plain text, a path to the file will be passed as the input parameter.
   */
  static readonly shortcutParameter: any;

  /**
   * When creating a widget on the Home screen, you can define a parameter that can be read
   * in your script using args.widgetParameter.
   *
   * The parameter can be used to differentiate the behavior of multiple widgets.
   */
  static readonly widgetParameter: any;

  /**
   * The notification that a script is being run in or the application was opened from.
   *
   * The notification contains all information that was set when the notification was
   * originally scheduled, including the `userInfo` property which can be used to contain
   * custom data that might be relevant when running the script.
   */
  static readonly notification: Notification;
}

/**
 * Performs HTTP requests.
 *
 * Performs a URL request and returns the response in an appropriate format.
 */
declare class Request {
  /** URL to send request to. */
  url: string;

  /**
   * Specifies the HTTP method to use when sending the request.
   * The default is to send the request using the GET HTTP method.
   */
  method: string;

  /**
   * Key value pairs where the key is the name of an HTTP header and
   * the value will be sent as the value for the HTTP header.
   */
  headers: Record<string, string>;

  /**
   * The body will be send along the request. While this property can be
   * any value, currently only strings and Data is supported.
   *
   * Be aware that this property is ignored if you convert the request to a
   * multipart request using `addParameterToMultipart`, `addFileToMultipart`
   * or `addFileDataToMultipart`.
   */
  body?: string | Data;

  /**
   * Timeout interval of the request.
   *
   * If a request remains idle for longer than the timeout interval,
   * the request is considered timed out.
   *
   * The timeout interval is measured in seconds and defaults to 60 seconds.
   */
  timeoutInterval: number;

  /**
   * Function called upon redirect.
   *
   * The function determines how redirects should be handled. By default
   * redirects are allowed. When invoked the function is supplied with
   * the request that we're about to redirect to. The function can return
   * the request to continue redirecting or it can return another request
   * to redirect to. Returning null will stop the redirect. Note that
   * onRedirect will only be invoked on the initial request. Consecutive
   * redirects should be handled on the initial request.
   */
  onRedirect: (request: Request) => Request | null;

  /**
   * The response is not populated until the request has been completed.
   */
  readonly response: {
    url: string;
    statusCode: number;
    mimeType: string;
    textEncodingName: string;
    headers: Record<string, string>;
    cookies: Record<string, string>[];
    [key: string]: any;
  };

  /**
   * Allow the request even if it is deemed insecure.
   *
   * By default Scriptable will attempt to reject requests that are deemed insecure.
   *
   * As an example, Scriptable will reject communicating with a server that has an
   * invalid certificate. Such servers might be malicious and may put confidentional
   * information at risk. By enabling this setting, those requests will be allowed.
   *
   * Enable this setting at your own risk.
   */
  allowInsecureRequest: boolean;

  /**
   * Constructs a new request that will be sent to the provided URL. The request is
   * not sent until an appropriate load method is called, e.g. loadImage for downloading
   * and interpreting the response as an image.
   *
   * @param url URL to send request to.
   */
  constructor(url: string);

  /**
   * Call to send the configured request to the specified URL. The raw response
   * is provided when the returned promise is fulfilled.
   */
  load(): Promise<Data>;

  /**
   * Call to send the configured request to the specified URL. The response is
   * parsed to a string and provided when the returned promise is fulfilled.
   */
  loadString(): Promise<string>;

  /**
   * Call to send the configured request to the specified URL. The response is
   * expected to be a valid JSON string and is parsed into an object.
   */
  loadJSON(): Promise<any>;

  /**
   * Call to send the configured request to the specified URL. The response is
   * expected to be an image.
   */
  loadImage(): Promise<Image>;

  /**
   * Converts the request to a multipart request and adds a parameter with the
   * specified name and value. Be aware that the body property on the request is
   * ignored for multipart requests as parameters and files added to the request
   * constitutes the body.
   *
   * Calling this function will make the request a multipart request. When the
   * request is send, the content type will automatically be set to "multipart/form-data".
   */
  addParameterToMultipart(name: string, value: string): void;

  /**
   * Converts the request to a multipart request and adds the file to the request.
   * Be aware that the body property on the request is ignored for multipart requests
   * as parameters and files added to the request constitutes the body.
   *
   * Calling this function will make the request a multipart request. When the request
   * is send, the content type will automatically be set to "multipart/form-data".
   */
  addFileDataToMultipart(
    data: Data,
    mimeType: string,
    name: string,
    filename: string,
  ): void;

  /**
   * Converts the request to a multipart request and adds the file to the request.
   * The function will automatically determine the MIME type of the file as well as
   * the filename. Be aware that the body property on the request is ignored for
   * multipart requests as parameters and files added to the request constitutes the body.
   *
   * Calling this function will make the request a multipart request. When the request
   * is send, the content type will automatically be set to "multipart/form-data".
   */
  addFileToMultipart(filePath: string, name: string, filename?: string): void;

  /**
   * Converts the request to a multipart request and adds the image to the request.
   * The function will automatically determine the MIME type of the file Be aware that
   * the body property on the request is ignored for multipart requests as parameters
   * and files added to the request constitutes the body.
   *
   * Calling this function will make the request a multipart request. When the request
   * is send, the content type will automatically be set to "multipart/form-data".
   */
  addImageToMultipart(image: Image, name: string, filename?: string): void;
}

declare class IContainer {
  /**
   * Adds a text element to the widget. Use the properties on the returned
   * element to style the text.
   */
  addText(text: string): WidgetText;

  /**
   * Adds a date element to the widget. Use the properties on the returned
   * element to style the date.
   */
  addDate(date: Date): WidgetDate;

  /**
   * Adds an image element to the widget. Use the properties on the returned
   * element to style the image.
   */
  addImage(image: Image): WidgetImage;

  /**
   * Adds a spacer to the widget. This can be used to offset the content
   * vertically in the widget.
   *
   * @param length Length of the spacer. Pass null to create a spacer with a flexible length.
   */
  addSpacer(length?: number): WidgetSpacer;

  /**
   * Adds a stack to the widget. Stacks layout elements horizontally by default.
   */
  addStack(): WidgetStack;

  /**
   * Sets the padding on each side of the widget.
   * @param top Padding on the top edge.
   * @param leading Padding on the leading edge.
   * @param bottom Padding on the bottom edge.
   * @param trailing Padding on the trailing edge.
   */
  setPadding(
    top: number,
    leading: number,
    bottom: number,
    trailing: number,
  ): void;

  /**
   * Configure the widget to use the default padding. Any padding previously
   *  defined with setPadding() will be discarded.
   */
  useDefaultPadding(): void;
}

/**
 * Widget showing a list of elements.
 *
 * A widget showing a list of elements. Pass the widget
 * to Script.setWidget() display it on your Home screen.
 *
 * Be aware that the widget will refresh periodically and the rate
 * at which the widget refreshes is largely determined by the operating system.
 *
 * Also note that there are memory limitations when running a script in a widget.
 * When using too much memory the widget will crash and not render correctly.
 */
declare class ListWidget extends IContainer {
  /** Background color of the widget. */
  backgroundColor: Color;

  /** Background image. */
  backgroundImage: Image;

  /** Background gradient. */
  backgroundGradient: LinearGradient;

  /**
   * Spacing between elements.
   *
   * Specifies the spacing between elements in the widget. You can also use the
   * `addSpacer()` function on the widget to add spacing between elements.
   * Defaults to 0.
   */
  spacing: number;

  /**
   * URL to open.
   *
   * The URL will be opened when the widget is tapped. This will override any
   * behavior defined in the configuration of the widget. E.g. if the widget is
   * configured to run the script when interacting with the widget but a URL is
   * set the URL will take precedence.
   */
  url: string;

  /**
   * Earliest date to refresh the widget.
   *
   * The property indicates when the widget can be refreshed again. The widget
   * will not be refreshed before the date have been reached. It is not guaranteed
   * that the widget will refresh at exactly the specified date.
   *
   * The refresh rate of a widget is partly up to iOS/iPadOS. For example, a
   * widget may not refresh if the device is low on battery or the user is
   * rarely looking at the widget.
   *
   * When the property is null the default refresh interval is used. Defaults to null.
   */
  refreshAfterDate: Date;

  /**
   * Constructs a new ListWidget.
   *
   * A widget showing a list of elements. Pass the widget to Script.setWidget()
   * to display it on your Home screen.
   */
  constructor();

  /**
   * The widget is presented in its small size.
   *
   * Widgets on the Home screen are updated periodically so while working on
   * your widget you may want to preview it in the app.
   *
   * @returns Promise that is fulfilled when the preview is dismissed.
   */
  presentSmall(): Promise<void>;

  /**
   * The widget is presented in its medium size.
   *
   * Widgets on the Home screen are updated periodically so while working on
   * your widget you may want to preview it in the app.
   *
   * @returns Promise that is fulfilled when the preview is dismissed.
   */
  presentMedium(): Promise<void>;

  /**
   * The widget is presented in its large size.
   *
   * Widgets on the Home screen are updated periodically so while working on
   * your widget you may want to preview it in the app.
   *
   * @returns Promise that is fulfilled when the preview is dismissed.
   */
  presentLarge(): Promise<void>;
}

/**
 * A text shown in a widget. You do not create instances of this element directly.
 * Instead you should call `addText()` on an instance of a `ListWidget`.
 */
declare class WidgetText {
  /** Text to show in a widget. */
  text: string;

  /** Color of the text. */
  textColor: Color;

  /** Font and text size of the text. */
  font: Font;

  /** Opacity of the text. This must be a value between 0 and 1. Defaults to 1. */
  textOpacity: number;

  /** Maximum number of lines to display. The limit is disabled when the value is 0 or less. Defaults to 0. */
  lineLimit: number;

  /**
   * Sets the minimum amount that text scales down to fit in the available space.
   * For example, a text with a minimum scale factor of 0.5 allows the widget to
   * draw the text in a font size half the size of the actual font. The scale
   * factor should be a fraction between 0 and 1, both inclusive. Defaults to 1.
   */
  minimumScaleFactor: number;

  /**
   * Sets the color of the shadow cast by the text. The shadowRadius property
   * must have a value greater than zero for this property to have an effect.
   * Defaults to black.
   */
  shadowColor: Color;

  /**
   * Sets the size of the shadow cast by the text. Defaults to 0.
   */
  shadowRadius: number;

  /**
   * Sets the offset of the shadow cast by the text. The shadowRadius property
   * must have a value greater than zero for this property to have an effect.
   * Defaults to (0, 0).
   */
  shadowOffset: Point;

  /**
   * The URL will be opened when the text is tapped. This is only supported
   * in medium and large widgets. Small widgets can only have a single tap target,
   * which is specified by the url on the widget.
   */
  url: string;

  /**
   * Specifies that text should be left aligned. This is the default.
   *
   * This does not affect texts placed in stacks. Use spacers instead when aligning
   * text in stacks. To align the text to left right in a horizontal stack, you
   * should place a spacer after the text.
   */
  leftAlignText(): void;

  /**
   * Specifies that text should be center aligned.
   *
   * This does not affect texts placed in stacks. Use spacers instead when aligning
   * text in stacks. To align the text in the center of a horizontal stack, you should
   * place a spacer both before and after the text.
   */
  centerAlignText(): void;

  /**
   * Specifies that text should be right aligned.
   *
   * This does not affect texts placed in stacks. Use spacers instead when aligning text in
   * stacks. To align the text to the right in a horizontal stack, you should place a spacer
   * before the text.
   */
  rightAlignText(): void;
}

/**
 * Image element shown in widget.
 *
 * An image shown in a widget. You do not create instances of this element directly.
 * Instead you should call `addImage()` on an instance of a `ListWidget`.
 */
declare class WidgetImage {
  /** Image to show in widget. */
  image: Image;

  /**
   * Whether the image is resizable.
   *
   * When set to true, the image can be resized. Defaults to true.
   */
  resizable: boolean;

  /**
   * Size of the image in the widget.
   *
   * Size of the image. When set to null, the image will be shwon at
   * its full size. Defaults to null.
   */
  imageSize: Size | null;

  /**
   * Opacity when shown in widget.
   *
   * Opacity of the image. This must be a value between 0 and 1. Defaults to 1.
   */
  imageOpacity: number;

  /**
   * Radius of the corners.
   *
   * Radius of the rounded corners. This property is ignored when
   * `containerRelativeShape` is set to true. Defaults to 0.
   */
  cornerRadius: number;

  /**
   * Border width.
   *
   * Width of the border around the image. Defaults to 0.
   */
  borderWidth: number;

  /**
   * Border color.
   *
   * Color of the border around the image. Defaults to black.
   */
  borderColor: Color;

  /**
   * Shape the image relative to its container.
   *
   * When true the corners of the image will be rounded relative to the
   * containing widget. The value of `cornerRadius` is ignored when this
   * is true. Defaults to false.
   */
  containerRelativeShape: boolean;

  /**
   * Tint color of the image.
   *
   * Changes the color of the image. Set to null to show the original image. Defaults to null.
   */
  tintColor: Color | null;

  /**
   * URL to open.
   *
   * The URL will be opened when the text is tapped. This is only supported in medium and
   * large widgets. Small widgets can only have a single tap target, which is specified
   * by the url on the widget.
   */
  url: string;

  /** Specifies that image should be left aligned. This is the default. */
  leftAlignImage(): void;

  /** Specifies that image should be center aligned. */
  centerAlignImage(): void;

  /** Specifies that image should be right aligned. */
  rightAlignImage(): void;

  /** The image will fit the available space. This content mode is the default. */
  applyFittingContentMode(): void;

  /** The image will fill the available space. */
  applyFillingContentMode(): void;
}

/**
 * Date element shown in a widget.
 *
 * A date shown in a widget. Dates will update periodically when shown in a widget.
 *
 * You do not create instances of this element directly. Instead you should call `addDate()`
 * on an instance of a `ListWidget`.
 */
declare class WidgetDate {
  /** Date to show in a widget. */
  date: Date;

  /** Color of the text. */
  textColor: Color;

  /** Font and text size of the text. */
  font: Font;

  /** Opacity of the text. This must be a value between 0 and 1. Defaults to 1. */
  textOpacity: number;

  /**
   * Maximum number of lines to display. The limit is disabled when the
   * value is 0 or less. Defaults to 0.
   */
  lineLimit: number;

  /**
   * Sets the minimum amount that text scales down to fit in the available space.
   * For example, a text with a minimum scale factor of 0.5 allows the widget to
   * draw the text in a font size half the size of the actual font. The scale
   * factor should be a fraction between 0 and 1, both inclusive. Defaults to 1.
   */
  minimumScaleFactor: number;

  /**
   * Sets the color of the shadow cast by the text. The `shadowRadius` property
   * must have a value greater than zero for this property to have an effect.
   * Defaults to black.
   */
  shadowColor: Color;

  /** Sets the size of the shadow cast by the text. Defaults to 0. */
  shadowRadius: number;

  /**
   * Sets the offset of the shadow cast by the text. The `shadowRadius` property
   * must have a value greater than zero for this property to have an effect.
   * Defaults to (0, 0).
   */
  shadowOffset: Point;

  /**
   * URL to open.
   *
   * The URL will be opened when the text is tapped. This is only supported in
   * medium and large widgets. Small widgets can only have a single tap target,
   * which is specified by the url on the widget.
   */
  url: string;

  /**
   * Specifies that text should be left aligned. This is the default.
   *
   * This does not affect texts placed in stacks. Use spacers instead when
   * aligning text in stacks. To align the text to left right in a horizontal
   * stack, you should place a spacer after the text.
   */
  leftAlignText(): void;

  /**
   * Specifies that text should be center aligned.
   *
   * This does not affect texts placed in stacks. Use spacers instead when
   * aligning text in stacks. To align the text in the center of a horizontal
   * stack, you should place a spacer both before and after the text.
   */
  centerAlignText(): void;

  /**
   * Specifies that text should be right aligned.
   *
   * This does not affect texts placed in stacks. Use spacers instead when
   * aligning text in stacks. To align the text to the right in a horizontal
   * stack, you should place a spacer before the text.
   */
  rightAlignText(): void;

  /**
   * Display time component of the date.
   *
   * Example output: 11:23PM
   */
  applyTimeStyle(): void;

  /**
   * Display entire date.
   *
   * Example output: June 3, 2019
   *
   * This is the default.
   */
  applyDateStyle(): void;

  /**
   * Display date as relative to now.
   *
   * Example output: 2 hours, 23 minutes, 1 year, 1 month
   */
  applyRelativeStyle(): void;

  /**
   * Display date as offset from now.
   *
   * Example output: +2 hours, -3 months
   */
  applyOffsetStyle(): void;

  /**
   * Display date as timer counting from now.
   *
   * Example output: 2:32 36:59:01
   */
  applyTimerStyle(): void;
}

/**
 * Spacer element shown in widget.
 *
 * Shows a spacer in the widget. A spacer with a null length has a flexible length.
 */
declare class WidgetSpacer {
  /**
   * Length of the spacer.
   */
  length: number;
}

/**
 * Stack element shown in widget.
 *
 * Shows a stack in the widget.
 */
declare class WidgetStack {
  /** Background color of the widget. */
  backgroundColor: Color;

  /** Background image. */
  backgroundImage: Image;

  /** Background gradient. */
  backgroundGradient: LinearGradient;

  /**
   * Specifies the spacing between elements in the stack. You can also
   * use the `addSpacer()` function on the widget to add spacing between
   * elements. Defaults to 0.
   */
  spacing: number;

  /**
   * Specifies the size of the stack when shown in a widget. When a dimension
   * is set to zero or less, the widget will automatically decide a length
   * for that dimension. Both dimensions default to 0.
   */
  size: Size;

  /** Radius of the rounded corners. Defaults to 0. */
  cornerRadius: number;

  /** Width of the border around the stack. Defaults to 0. */
  borderWidth: number;

  /** Color of the border around the stack. Defaults to black. */
  borderColor: Color;

  /**
   * URL to open.
   *
   * The URL will be opened when the text is tapped. This is only supported in medium and
   * large widgets. Small widgets can only have a single tap target, which is specified
   * by the url on the widget.
   */
  url: string;

  /**
   * Adds a text element to the stack. Use the properties on the returned element to
   * style the text.
   */
  addText(text: string): WidgetText;

  /**
   * Adds a date element to the widget. Use the properties on the returned element to
   * style the date.
   */
  addDate(date: Date): WidgetDate;

  /**
   * Adds an image element to the stack. Use the properties on the returned element to
   * style the image.
   */
  addImage(image: Image): WidgetImage;

  /**
   * Adds a spacer to the stack. This can be used to offset the content horizontally in
   * the stack.
   */
  addSpacer(length: number): WidgetSpacer;

  /**
   * Adds a stack to the widget. Stacks layout elements horizontally by default.
   */
  addStack(): WidgetStack;

  /**
   * Sets the padding on each side of the stack.
   */
  setPadding(
    top: number,
    leading: number,
    bottom: number,
    trailing: number,
  ): void;

  /**
   * Configure the stack to use the default padding. Any padding previously defined
   * with `setPadding()` will be discarded.
   */
  useDefaultPadding(): void;

  /**
   * Specifies that content should be top aligned. This is the default.
   */
  topAlignContent(): void;

  /**
   * Specifies that content should be center aligned.
   */
  centerAlignContent(): void;

  /**
   * Specifies that content should be bottom aligned.
   */
  bottomAlignContent(): void;

  /**
   * Specifies that the stack should layout elements horizontally. This is the default.
   */
  layoutHorizontally(): void;

  /**
   * Specifies that the stack should layout elements vertically.
   */
  layoutVertically(): void;
}

/** The structure encapsulates a coordinate in a two-dimensional coordinate system. */
declare class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
}

/** The structure has a width, height and a coordinate in a two-dimensional coordinate system. */
declare class Rect {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;

  width: number;
  height: number;

  origin: Point;
  size: Size;

  constructor(x: number, y: number, width: number, height: number);
}

/** A universally unique value that can be used to identify items. */
declare class UUID {
  /** Used for getting the string value of a UUID. */
  string(): string;
}

/** Raw data representation of strings, files and images. */
declare class Data {
  /**
   * The provided string is assumed to be UTF8 encoded. If the string
   * is not UTF8 encoded, the function will return null.
   */
  static fromString(string: string): Data;

  /**
   * Reads the raw data of the file at the specified file path.
   *
   * @param filePath Path of file to read data from.
   */
  static fromFile(filePath: string): Data;

  /**
   * The supplied string must be base64 encoded otherwise the function will return null.
   *
   * @param base64String Base64 encoded string to create data from.
   */
  static fromBase64String(base64String: string): Data;

  /** Creates data from JPEG image. */
  static fromJPEG(image: Image): Data;

  /** Creates data from PNG image. */
  static fromPNG(image: Image): Data;

  /**
   * The data is assumed to represent a UTF8 encoded string. If the string is not
   * UTF8 encoded string, the function will return null.
   */
  toRawString(): string | null;

  /**
   * Creates a base64 encoded string from the data.
   */
  toBase64String(): string;

  /**
   * Gets bytes from data.
   */
  getBytes(): number[];
}

declare class Color {
  /** HEX representation. */
  readonly hex: string;

  /** Amount of red in the color. */
  readonly red: number;

  /** Amount of green in the color. */
  readonly green: number;

  /** Amount of blue in the color. */
  readonly blue: number;

  /** Alpha of the color. */
  readonly alpha: number;

  /** Constructs a black color. */
  static black(): Color;

  /** Constructs a dark gray color. */
  static darkGray(): Color;

  /** Constructs a light gray color. */
  static lightGray(): Color;

  /** Constructs a white color. */
  static white(): Color;

  /** Constructs a gray color. */
  static gray(): Color;

  /** Constructs a red color. */
  static red(): Color;

  /** Constructs a green color. */
  static green(): Color;

  /** Constructs a blue color. */
  static blue(): Color;

  /** Constructs a cyan color. */
  static cyan(): Color;

  /** Constructs a yellow color. */
  static yellow(): Color;

  /** Constructs a magenta color. */
  static magenta(): Color;

  /** Constructs a orange color. */
  static orange(): Color;

  /** Constructs a purple color. */
  static purple(): Color;

  /** Constructs a brown color. */
  static brown(): Color;

  /** Constructs a transparent color. */
  static transparent(): Color;

  /**
   * Constructs a new color with a hex value and optionally an alpha value.
   * The hex value may specify the alpha value but this will be ignored if
   * the alpha value parameter is provided. Examples of valid hex values:
   * #ff0000, #00ff0080 #00f and #ff. The hashtag is optional.
   */
  constructor(hex: string, alpha?: number);

  /**
   * The dynamic color will use either its light or dark variant depending
   * the appearance of the system.
   *
   * Dynamic colors are not supported when used with `DrawContext`.
   *
   * @param lightColor Color used in light appearance.
   * @param darkColor Color used in dark appearance.
   */
  static dynamicColor(
    lightColor: Color,
    darkColor: Color,
  ): Color;
}

/**
 * Manages image data.
 *
 * Images objects contains image data. APIs in Scriptable that work with images,
 * either by taking an image as input or returning an image, will use this the
 * Image type.
 */
declare class Image {
  /** Size of the image in pixels. */
  readonly size: Size;

  /**
   * Creates an image from file.
   *
   * Loads an image from the specified file path. If the image could
   * not be read, the function will return null.
   *
   * @param filePath File path to read image from.
   */
  static fromFile(filePath: string): Image | null;

  /**
   * Creates an image from raw data.
   *
   * Loads an image from the raw data. If the image could not be read,
   * the function will return null.
   *
   * @param data Data to read image from.
   */
  static fromData(data: Data): Image | null;
}

/**
 * Linear gradient.
 *
 * A linear gradient to be used in a widget.
 */
declare class LinearGradient {
  /**
   * Colors of the gradient.
   *
   * The array of colors should include the same amount of elements
   * as the gradients `locations` property.
   */
  colors: Color[];

  /**
   * Locations of each color.
   *
   * Each location should be a value in the range of 0 to 1 and indicates
   * the location of each color in the gradients colors array.
   *
   * The array of locations should include the same amount of elements as
   * the gradients colors property.
   */
  locations: number[];

  /**
   * Point to start the gradient.
   *
   * The normalized starting point of the gradient. The `endPoint` and
   * `startPoint` together controls the direction of the gradient. The
   * X and Y component should each range from 0 to 1. Defaults to (0, 1).
   */
  startPoint: Point;

  /**
   * Point to end the gradient.
   *
   * The normalized ending point of the gradient. The endPoint and startPoint
   * together controls the direction of the gradient. The X and Y component
   * should each range from 0 to 1. Defaults to (0, 1).
   */
  endPoint: Point;
}

/**
 * Schedules and manages notifications.
 *
 * Notifications are scheduled for delivery at some point in the future.
 * A notification may be delivered even when Scriptable is not running.
 */
declare class Notification {
  /**
   * Identifier of the notification.
   *
   * To reschedule a notification, use the identifier of an existing notification.
   */
  identifier: string;

  /** Title of the notification. */
  title: string;

  /** Subtitle of the notification. */
  subtitle: string;

  /** Body of the notification. */
  body: string;

  /**
   * Preferred height of the notification.
   *
   * By default Scriptable attempts to determine an appropriate height for your notification.
   * If you want to override the default behavior, you can specify a preferred content height.
   * The preferred content height is only used when running a script inside the notification,
   * i.e. when scriptName is not null. iOS may limit the height of the notification in which
   * case the preferred content height is not guaranteed to be respected.
   */
  preferredContentHeight: number;

  /**
   * Number to display in the app icon's badge.
   *
   * When the number is zero, no badge is displayed. When the number is greater than zero,
   * the number is displayed in the app icon's badge. Setting the value to null, will leave
   * the badge unchanged. The default value is null.
   */
  badge: number | null;

  /**
   * Identifier for grouping the notification.
   *
   * Notifications are grouped by the identifier on the Home screen and in the Notification Center.
   */
  threadIdentifier: string;

  /**
   * Custom information.
   *
   * Store any custom information for the notification. This can be accessed from the
   * `Notification.opened` property when a script is run from a notification.
   */
  userInfo: Record<string, any>;

  /** Set sound of the notification. Null means no sound. Default is no sound. */
  sound: NotificationSound | null;

  /**
   * URL to open when notification is tapped.
   *
   * The Scriptable application will open the URL when the notification is tapped.
   * This can be a URL that uses Scriptables URL scheme, the URL scheme of another
   * application or a website URL.
   */
  openURL: string;

  /**
   * Delivery date of the notification.
   *
   * If the notification has already been delivered, for example because it was
   * fetched using `Notification.allDelivered()`, the deliveryDate will be populated.
   * Otherwise it will be null.
   *
   * The property cannot be set. In order to specify a future delivery date for a notification,
   * see the `setTriggerDate` function. For recurring notifications, see the `setDailyTrigger`
   * and `setWeeklyTrigger` functions.
   */
  readonly deliveryDate: Date | null;
}

type NotificationSound =
  | "default"
  | "accept"
  | "alert"
  | "complete"
  | "event"
  | "failure"
  | "piano_error"
  | "piano_success"
  | "popup";

/**
 * Represents a font and text size.
 *
 * The font can be used to style texts, for example in widgets.
 */
declare class Font {
  /**
   * Constructs a new font.
   *
   * Refer to https://iosfonts.com for a list of the fonts that are available in iOS and iPadOS.
   *
   * @param name Name of the font.
   * @param size Size of the font.
   */
  constructor(name: string, size: number);

  /** Preferred font for large titles. */
  static largeTitle(): Font;

  /** Preferred font for first level hierarchical headings. */
  static title1(): Font;

  /** Preferred font for second level hierarchical headings. */
  static title2(): Font;

  /** Preferred font for third level hierarchical headings. */
  static title3(): Font;

  /** Preferred font for headings. */
  static headline(): Font;

  /** Preferred font for subheadings. */
  static subheadline(): Font;

  /** Preferred font for body texts. */
  static body(): Font;

  /** Preferred font for callouts. */
  static callout(): Font;

  /** Preferred font for footnotes. */
  static footnote(): Font;

  /** Preferred font for standard captions. */
  static caption1(): Font;

  /** Preferred font for alternate captions. */
  static caption2(): Font;

  /**
   * Creates a system font.
   *
   * @param size Size of the text.
   */
  static systemFont(size: number): Font;

  /**
   * Creates an ultra light system font.
   *
   * @param size Size of the text.
   */
  static ultraLightSystemFont(size: number): Font;

  /**
   * Creates a thin system font.
   *
   * @param size Size of the text.
   */
  static thinSystemFont(size: number): Font;

  /**
   * Creates a light system font.
   *
   * @param size Size of the text.
   */
  static lightSystemFont(size: number): Font;

  /**
   * Creates a regular system font.
   *
   * @param size Size of the text.
   */
  static regularSystemFont(size: number): Font;

  /**
   * Creates a medium system font.
   *
   * @param size Size of the text.
   */
  static mediumSystemFont(size: number): Font;

  /**
   * Creates a semibold system font.
   *
   * @param size Size of the text.
   */
  static semiboldSystemFont(size: number): Font;

  /**
   * Creates a bold system font.
   *
   * @param size Size of the text.
   */
  static boldSystemFont(size: number): Font;

  /**
   * Creates a heavy system font.
   *
   * @param size Size of the text.
   */
  static heavySystemFont(size: number): Font;

  /**
   * Creates a font with the system appearance with the black weight.
   *
   * @param size Size of the text.
   */
  static blackSystemFont(size: number): Font;

  /**
   * Creates an italic system font.
   *
   * @param size Size of the text.
   */
  static italicSystemFont(size: number): Font;

  /**
   * Creates an ultra light monospaced system font.
   *
   * @param size Size of the text.
   */
  static ultraLightMonospacedSystemFont(size: number): Font;

  /**
   * Creates a thin monospaced system font.
   *
   * @param size Size of the text.
   */
  static thinMonospacedSystemFont(size: number): Font;

  /**
   * Creates a light monospaced system font.
   *
   * @param size Size of the text.
   */
  static lightMonospacedSystemFont(size: number): Font;

  /**
   * Creates a regular monospaced system font.
   *
   * @param size Size of the text.
   */
  static regularMonospacedSystemFont(size: number): Font;

  /**
   * Creates a medium monospaced system font.
   *
   * @param size Size of the text.
   */
  static mediumMonospacedSystemFont(size: number): Font;

  /**
   * Creates a semibold monospaced system font.
   *
   * @param size Size of the text.
   */
  static semiboldMonospacedSystemFont(size: number): Font;

  /**
   * Creates a bold monospaced system font.
   *
   * @param size Size of the text.
   */
  static boldMonospacedSystemFont(size: number): Font;

  /**
   * Creates a heavy monospaced system font.
   *
   * @param size Size of the text.
   */
  static heavyMonospacedSystemFont(size: number): Font;

  /**
   * Creates a monospaced system font with the black weight.
   *
   * @param size Size of the text.
   */
  static blackMonospacedSystemFont(size: number): Font;

  /**
   * Creates an ultra light and rounded system font.
   *
   * @param size Size of the text.
   */
  static ultraLightRoundedSystemFont(size: number): Font;

  /**
   * Creates a thin and rounded system font.
   *
   * @param size Size of the text.
   */
  static thinRoundedSystemFont(size: number): Font;

  /**
   * Creates a light and rounded system font.
   *
   * @param size Size of the text.
   */
  static lightRoundedSystemFont(size: number): Font;

  /**
   * Creates a regular and rounded system font.
   *
   * @param size Size of the text.
   */
  static regularRoundedSystemFont(size: number): Font;

  /**
   * Creates a medium and rounded system font.
   *
   * @param size Size of the text.
   */
  static mediumRoundedSystemFont(size: number): Font;

  /**
   * Creates a semibold and rounded system font.
   *
   * @param size Size of the text.
   */
  static semiboldRoundedSystemFont(size: number): Font;

  /**
   * Creates a bold and rounded system font.
   *
   * @param size Size of the text.
   */
  static boldRoundedSystemFont(size: number): Font;

  /**
   * Creates a heavy and rounded system font.
   *
   * @param size Size of the text.
   */
  static heavyRoundedSystemFont(size: number): Font;

  /**
   * Creates a rounded system font with the black weight.
   *
   * @param size Size of the text.
   */
  static blackRoundedSystemFont(size: number): Font;
}

/**
 * Provides information about the device.
 *
 * Reads information about the current device and its screen.
 */
declare class Device {
  /**
   * Name identifying the device.
   *
   * You can find and edit the name of your device in the system settings.
   */
  static name(): string;

  /** Name of the operating system. */
  static systemName(): string;

  /** Version of the operating system. */
  static systemVersion(): string;

  /** Model of the device, e.g. "iPhone". */
  static model(): string;

  /**
   * Whether the device is a phone.
   *
   * You can use this property to choose behavior of a script
   * depending on whether its running on a phone or a pad.
   */
  static isPhone(): boolean;

  /**
   * Whether the device is a pad.
   *
   * You can use this property to choose behavior of a script
   * depending on whether its running on a phone or a pad.
   */
  static isPad(): boolean;

  /**
   * Size of the screen.
   *
   * The value is measured in points. For an explanation of the relationship
   * between points and pixels, see the documentation of the `screenScale()`
   * method. The value takes the device rotation into account, so the value
   * will vary between portrait and landscape.
   */
  static screenSize(): Size;

  /**
   * Resolution of the screen.
   *
   * The value is measured in pixels. The value does not take the rotation
   * of the device into account.
   */
  static screenResolution(): Size;

  /**
   * Scale of the screen.
   *
   * Standard resolution displays have a scale of 1.0 where one point on
   * the screen equals one pixel. Retina displays will have a scale factor
   * of 2.0 or 3.0 where one point on the screen is four or nine pixels,
   * respectively.
   */
  static screenScale(): number;

  /**
   * Brightness of the screen in percentage.
   *
   * The value range from 0 to 1. To set the screen brightness, refer
   * to the `setScreenBrightness()` function.
   */
  static screenBrightness(): number;

  /**
   * Whether the device is in portrait with the home button or home
   * indicator at the bottom.
   */
  static isInPortrait(): boolean;

  /**
   * Whether the device is in portrait but upside down with the home
   * button or home indicator at the top.
   */
  static isInPortraitUpsideDown(): boolean;

  /**
   * Whether the device is in landscape with the home button or home
   * indicator on the right side.
   */
  static isInLandscapeLeft(): boolean;

  /**
   * Whether the device is in landscape with the home button or home
   * indicator on the left side.
   */
  static isInLandscapeRight(): boolean;

  /**
   * Whether the device is lying parallel to the ground with the screen
   * facing upwards.
   */
  static isFaceUp(): boolean;

  /**
   * Whether the device is lying parallel to the ground with the screen
   * facing downwards.
   */
  static isFaceDown(): boolean;

  /**
   * Current battery level.
   *
   * The value is in percentage ranging between 0 and 1.
   */
  static batteryLevel(): number;

  /**
   * Whether the device is being not plugged into power and thus discharging.
   */
  static isDischarging(): boolean;

  /**
   * Whether the device is being charged.
   */
  static isCharging(): boolean;

  /** Whether the device is fully charged. */
  static isFullyCharged(): boolean;

  /**
   * The preferred langauges.
   *
   * The list is ordered according to the language preferences specified
   * in the system settings.
   */
  static preferredLanguages(): string[];

  /** Identifier for the device locale. */
  static locale(): string;

  /** Identifier for the device language. */
  static language(): string;

  /**
   * Whether the device is using dark appearance.
   *
   * This API is not supported in widgets.
   */
  static isUsingDarkAppearance(): boolean;

  /**
   * The device volume.
   *
   * The value range from 0 to 1.
   */
  static volume(): number;

  /**
   * Sets the brightness of the screen.
   *
   * The value range from 0 to 1. To get the screen brightness, refer
   * to the `screenBrightness()` function.
   *
   * @param percentage Percentage to set the screen brightness to.
   * Value between 0 and 1.
   */
  static setScreenBrightness(percentage: number): void;
}

/**
 * Structure representing a size.
 *
 * The structure has a width and a height to specify a two-dimensional size.
 */
declare class Size {
  /** Width value. */
  width: number;
  /** Height value. */
  height: number;

  /** Constructs a new size. */
  constructor(width: number, height: number);
}

/**
 * Presents an alert.
 *
 * Use this to configure an alert presented modally or as a sheet. After
 * configuring the alert, call presentAlert() or presentSheet() to present
 * the alert. The two presentations methods will return a value which carries
 * the index of the action that was selected when fulfilled.
 */
declare class Alert {
  /** Title displayed in the alert. Usually a short string. */
  title: string;
  /** Detailed message displayed in the alert. */
  message: string;

  /**
   * Adds an action button to the alert. To check if an action was selected, you
   * should use the first parameter provided when the promise returned by `presentAlert()`
   * and `presentSheet()` is resolved.
   *
   * @param title Title of the action.
   */
  addAction(title: string): void;

  /**
   * Destructive action titles have a red text color, signaling that the action may modify or delete data.
   *
   * @param title Title of the action.
   */
  addDestructiveAction(title: string): void;

  /**
   * Adds a cancel action to the alert. When a cancel action is selected, the index provided
   * by presentAlert() or presentSheet() will always be -1. Please note that when running on
   * the iPad and presenting using presentSheet(), the action will not be shown in the list
   * of actions. The operation is cancelled by tapping outside the sheet.
   *
   * An alert can only contain a single cancel action. Attempting to add more cancel actions
   * will remove any previously added cancel actions.
   *
   * @param title
   */
  addCancelAction(title: string): void;

  /**
   * Adds a text field to the alert controller prompting for user input. Retrieve the
   * value for the text field using textFieldValue() and supply the index of the
   * text field. Indices for text fields are assigned in the same order as they are
   * added to the alert starting at 0.
   *
   * Text fields are not supported when using the sheet presentation.
   *
   * @param placeholder Optional placeholder that will be displayed when the text field is empty.
   * @param text Optional default value for the text field.
   */
  addTextField(placeholder?: string, text?: string): TextField;

  /**
   * Adds a secure text field to the alert controller prompting for user input. Values
   * entered into a secure text field will be hidden behind dots. Retrieve the value for
   * the text field using textFieldValue() and supply the index of the text field. Indices
   * for text fields are assigned in the same order as they are added to the alert starting at 0.
   *
   * @param placeholder Optional placeholder that will be displayed when the text field is empty.
   * @param text Optional default value for the text field.
   */
  addSecureTextField(placeholder?: string, text?: string): TextField;

  /**
   * Retrieves the value of a text field added using addTextField() or addSecureTextField().
   * Indices for text fields are assigned in the same order as they are added to the alert
   * starting at 0.
   *
   * @param index Index of text field to retrieve for value.
   */
  textFieldValue(index: number): string;

  /**
   * This is a shorthand for presentAlert().
   *
   * @returns A promise carrying the selected action index when fulfilled.
   */
  present(): Promise<number>;

  /**
   * Presents the alert modally.
   *
   * @returns A promise carrying the selected action index when fulfilled.
   */
  presentAlert(): Promise<number>;

  /**
   * Presents the alert as a sheet.
   *
   * @returns A promise carrying the selected action index when fulfilled.
   */
  presentSheet(): Promise<number>;
}

/**
 * Text field in an alert.
 *
 * Use the text field to customize the appearance of the text entered into it.
 *
 * You do not create create instances of this. Instead you should add a text
 * field to an Alert using the `addTextField()` and `addSecureTextField()` on
 * the alert.
 */
declare class TextField {
  /** Text in the text field. */
  text: string;

  /** Placeholder shown in the text field while it is empty. */
  placeholder: string;

  /**
   * Hides the text that is entered when set to true.
   *
   * The default value is false.
   */
  secure: boolean;

  /** Color of the text. */
  textColor: Color;

  /** Font of the text. */
  font: Font;

  /** Use the default keyboard for entering text. */
  setDefaultKeyboard(): void;

  /** Use a keyboard that prominently features the numbers 0 through 9. */
  setNumberPadKeyboard(): void;

  /** Use a numeric keyboard with a decimal point for entering text. */
  setDecimalPadKeyboard(): void;

  /** Use a numeric keyboard with punctuation for entering text. */
  setNumbersAndPunctuationKeyboard(): void;

  /** Use a keyboard that prominently feaetures the numbers 0 through 9 and the * and # characters. */
  setPhonePadKeyboard(): void;

  /** Use a keyboard that prominently features the space and period characters. */
  setWebSearchKeyboard(): void;

  /** Use a keyboard that prominently features the @, period and space characters. */
  setEmailAddressKeyboard(): void;

  /** Use a keyboard that prominently features the period and slash characters and the ".com" string. */
  setURLKeyboard(): void;

  /** Use a keyboard that prominently features the @ and # characters. */
  setTwitterKeyboard(): void;

  /**
   * Left aligns the text.
   *
   * This is the default text alignment.
   */
  leftAlignText(): void;

  /** Center aligns the text. */
  centerAlignText(): void;

  /** Right aligns the text. */
  rightAlignText(): void;
}

/**
 * Event driven XML parser.
 *
 * The XMLParser is an event driven XML parser that calls provided callback functions
 * when it encounters elements to be parsed. It does not iself do any parsing.
 */
declare class XMLParser {
  /** Function called when the parser begins parsing a document. */
  didStartDocument: () => void;

  /**
   * Function called when the parser ends parsing a document.
   *
   * When the parser calls the function, it has successfully completed parsing the document.
   */
  didEndDocument: () => void;

  /**
   * Function called when starting to parse an element.
   *
   * Called by the parser when it encounters a start tag for an element.
   * The function takes the element name as a parameter as well as a key
   * value pair containing all the attributes associated with the element.
   *
   * Use this function to update your state and prepare for receiving the
   * characters of the element. After this function is called, the parser
   * will call the foundCharacters callback function with all or parts of
   * the characters of the element.
   */
  didStartElement: (
    elementName: string,
    attributes: { [key: string]: string },
  ) => void;

  /**
   * Function called when ended parsing an element.
   *
   * Called by the parser when it encounters an end tag for an element. The
   * function takes the element name as a parameter.
   */
  didEndElement: (elementName: string) => void;

  /**
   * Function called when the parser finds characters of an element.
   *
   * The parser calls this function with a string whenever it finds characters
   * for the current element. This function may be called several times for a
   * single element.
   */
  foundCharacters: (string: string) => void;

  /**
   * Function called when the parser encounters an error.
   *
   * The parser will call this function when it encounters a fatal error
   * preventing it from continuing to parse. When the function is called
   * the parsing is stopped.
   */
  parseError: () => void;

  /** XML string to be parsed. */
  string: string;

  /**
   * Constructs an event driven XML parser. It does not do any parsing on
   * its own and therefore the callback functions must be set before
   * starting to parse.
   *
   * @param string XML string to be parsed.
   */
  constructor(string: string);

  /**
   * Before calling this function you should ensure that the parser is
   * correctly configured, i.e. the necessary callback functions should
   * be set.
   *
   * @returns Whether parsing was successfully started.
   */
  parse(): boolean;
}

/**
 * Allows for accessing information about the script that is currently being run
 * and controlling selected parts of the script execution.
 */
declare class Script {
  /** Name of the script. */
  static name(): string;

  /**
   * Informs the system about script completion.
   *
   * Call this function to inform the system that the script has
   * completed running.
   *
   * When a script is run inside Siri and the Shortcuts app, Scriptable
   * use heuristics to determine if the script has completed. If you find
   * that a script takes too long to complete, you can manually call the
   * `complete` function to stop the execution. Note that this should be
   * done as the very last action the script performs.
   *
   * When the script is run from a share sheet, the `complete` function will
   * complete execution and dismiss the presented view.
   */
  static complete(): void;

  /**
   * Sets output when running the script as a shortcut action.
   *
   * Use this function to pass values to other actions in the Shortcuts app.
   * The output can be a text, a number, a boolean, a dictionary or a file
   * path pointing to a file stored in iCloud.
   *
   * You can also use JavaScript's `return` keyword to output a value to a shortcut.
   */
  static setShortcutOutput(value: any): void;

  /** Sets the widget to be displayed. */
  static setWidget(widget: ListWidget): void;
}

declare namespace JSX {
  type JSXColor = Color | string | number;
  type Align = "left" | "right" | "center";
  type ContentAlign = "top" | "bottom" | "center";

  interface Alignable {
    align?: Align;
  }

  interface ContentAlignable {
    align?: ContentAlignable;
  }

  interface WidgetAndStackBase {
    spacing?: number;
    backgroundColor?: JSXColor;
    backgroundImage?: Image;
    backgroundGradient?: LinearGradient;
    url?: string;
  }

  interface StackProps extends WidgetAndStackBase, ContentAlignable {
    size?: Size;
    cornerRadius?: number;
    borderWidth?: number;
    borderColor?: JSXColor;
  }

  interface WidgetProps extends WidgetAndStackBase {
    refreshAfterDate?: Date;
  }

  interface SpacerProps {
    length?: number;
  }

  interface TextProps extends Alignable {
    font?: Font;
    color?: JSXColor;
    opacity?: number;
    lineLimit?: number;
    minimumScaleFactor?: number;
    shadowColor?: JSXColor;
    shadowOffset?: Point;
    shadowRadius?: number;
    url?: string;
  }

  type ImageContentMode = "fitting" | "filling";

  interface ImageCommonProps extends Alignable {
    size?: Size;
    cornerRadius?: number;
    resizable?: boolean;
    opacity?: number;
    borderColor?: JSXColor;
    borderWidth?: number;
    containerRelativeShape?: boolean;
    tintColor?: JSXColor;
    url?: string;
    contentMode?: ImageContentMode;
  }

  type ImageProps =
    & ImageCommonProps
    & ({ data: Data } | { fileURL: string } | { image: Image });

  interface DateProps extends TextProps {
    date: Date | string | number;
  }

  interface IntrinsicElements {
    widget: WidgetProps;
    hstack: StackProps;
    vstack: StackProps;
    image: ImageProps;
    spacer: SpacerProps;
    text: TextProps;
    date: DateProps;
  }
}
