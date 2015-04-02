Template.loading.rendered = function() {
  IonLoading.show({
    backdrop: true
  });
};

Template.loading.destroyed = function() {
  IonLoading.hide();
};
