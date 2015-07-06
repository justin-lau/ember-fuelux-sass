import Ember from 'ember';
import layout from '../templates/components/fuelux-checkbox';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['checkbox'],
  classNameBindings: ['highlight'],

  /**
   * @property checked
   * @type Boolean
   * @default false
   */
  checked: false,

  /**
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * @property highlight
   * @type Boolean
   * @default false
   */
  highlight: false,
});
