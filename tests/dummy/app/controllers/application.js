import Controller from '@ember/controller';
import { set } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({
  rating: 3.5,
  updateableRating: 3,

  init() {
    this._super(...arguments);
    later(() => set(this, 'updateableRating', 5), 3000);
  },

  actions: {
    setRating(rating) {
      set(this, 'rating', rating);
      window.alert(`Rating set to ${rating}`);
    }
  }
});
