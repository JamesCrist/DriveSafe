/**
 * @summary Renders the loading template on the screen
 * @locus Client
 * @method rendered
 * @memberOf loading
 * @function
 * */
Template.loading.rendered = function () {
  IonLoading.show({
    backdrop: false
  });
};

/**
 * @summary Removes the loading template from the screen
 * @locus Client
 * @method destroyed
 * @memberOf loading
 * @function
 */
Template.loading.destroyed = function () {
  IonLoading.hide();
};
