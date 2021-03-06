// checklist
angular.module('xeditable').directive('editableChecklist', [
  'editableDirectiveFactory',
  'editableNgOptionsParser',
  function(editableDirectiveFactory, editableNgOptionsParser) {
    return editableDirectiveFactory({
      directiveName: 'editableChecklist',
      inputTpl: '<span></span>',
      useCopy: true,
      render: function() {
        this.parent.render.call(this);
        var parsed = editableNgOptionsParser(this.attrs.eNgOptions),
            ngChangeHtml = '',
            ngChecklistComparatorHtml = '',
            ngDisabled = '',
            ngNameHtml = '';

        if (this.attrs.eNgChange) {
          ngChangeHtml = ' ng-change="' +  this.attrs.eNgChange + '"';
        }

        if (this.attrs.eChecklistComparator) {
          ngChecklistComparatorHtml = ' checklist-comparator="' +  this.attrs.eChecklistComparator + '"';
        }

        if (this.attrs.eNgDisabled) {
          ngDisabled = ' ng-disabled="' + this.attrs.eNgDisabled+'"';
        }

        if (this.attrs.eName) {
          ngNameHtml = ' name="' +  this.attrs.eName + '"';
        }

        var html = '<label ng-repeat="'+parsed.ngRepeat+'">'+
          '<input type="checkbox" checklist-model="$parent.$parent.$data" checklist-value="'+parsed.locals.valueFn+'"' +
            ngChangeHtml + ngChecklistComparatorHtml + ngNameHtml + ngDisabled + '>'+
          '<span ng-bind="'+parsed.locals.displayFn+'"></span></label>';

        this.inputEl.removeAttr('ng-model');
        this.inputEl.removeAttr('ng-options');
        this.inputEl.removeAttr('ng-change');
        this.inputEl.removeAttr('checklist-comparator');
        this.inputEl.removeAttr('name');
        this.inputEl.html(html);
      }
    });
}]);