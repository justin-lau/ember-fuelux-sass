import Ember from 'ember';
import layout from '../templates/components/fuelux-checkbox-inline';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'label',
  classNames: ['checkbox-custom'],
  classNameBindings: [
      'inline:checkbox-inline',
      'checked',
      'disabled',
      'highlight',
    ],

  /**
   * @property inline
   * @type Boolean
   * @default true
   */
  inline: true,

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

  didInsertElement: function() {
    this.$().checkbox();
  }
});
