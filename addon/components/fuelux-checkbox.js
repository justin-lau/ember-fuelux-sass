import Ember from 'ember';
import layout from '../templates/components/fuelux-checkbox';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['checkbox'],
  checked: false,
  disabled: false,
});
