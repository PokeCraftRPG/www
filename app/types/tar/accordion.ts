import type { InjectionKey } from "vue";

/**
 * The injection key to bind an accordion item to its container.
 */
export const bindItemKey = Symbol() as InjectionKey<(id: string, setParentId: (value?: string) => void) => void>;

/**
 * The injection key to unbind an accordion item from its container.
 */
export const unbindItemKey = Symbol() as InjectionKey<(id: string) => void>;

/**
 * Represents an item to be displayed inside a TarAccordion component.
 */
export type AccordionItem = {
  /**
   * This accordion item contents will be displayed initially.
   */
  active?: boolean | string;
  /**
   * The unique identifier of the accordion item. A random `nanoid` will be generated if unspecified.
   */
  id?: string;
  /**
   * The title of this accordion item.
   */
  title: string;
};

/**
 * The options of the TarAccordion component.
 */
export type AccordionOptions = {
  /**
   * The accordion items will stay open when another item is opened.
   */
  alwaysOpen?: boolean | string;
  /**
   * Removes some borders and rounded cornes to render accordions edge-to-edge with their parent container.
   */
  flush?: boolean | string;
  /**
   * The unique identifier of the accordion container.
   */
  id?: string;
};
