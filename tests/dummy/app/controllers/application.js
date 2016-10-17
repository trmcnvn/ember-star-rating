import Ember from 'ember';

export default Ember.Controller.extend({
  rating: 3.5,
  actions: {
    setRating(rating) {
      Ember.set(this, 'rating', rating);
      window.alert(`Rating set to ${rating}`);
    }
  }
});
