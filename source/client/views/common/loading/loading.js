Template.loading.rendered = function() {
  IonLoading.show({
    backdrop: false
  });
};

Template.loading.destroyed = function() {
  IonLoading.hide();
};
