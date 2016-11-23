import Ember from 'ember';

export default Ember.Controller.extend({
  rating: 3.5,
  updateableRating: 3,

  init() {
    this._super(...arguments);
    Ember.run.later(() => this.set('updateableRating', 5), 3000);
  },

  actions: {
    setRating(rating) {
      Ember.set(this, 'rating', rating);
      window.alert(`Rating set to ${rating}`);
    }
  }
});
