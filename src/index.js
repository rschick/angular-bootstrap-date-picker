angular.module('angular-bootstrap-date-picker', [])

.directive('ngBootstrapDatePicker', function() {
	return {
		restrict: 'E',
		template: '<span class="input-group date"> \
			<span class="input-group-addon"> \
				<i class="glyphicon glyphicon-calendar"></i> \
			</span> \
			<input type="text" class="form-control" ng-model="dateString" /> \
		</span>',
		require: '?ngModel',
		replace: true,
		scope: {},
		link: function (scope, elem, attrs, ngModel) {

			if (!ngModel) {
				return;
			}

			var inputElement = $(elem).find('input[type=text]');

			inputElement.datepicker({
				orientation: 'auto',
				autoclose: true,
				todayHighlight: true
			})
			.on('changeDate', function(ev) {
				scope.$evalAsync(function() {
					var oldDate = ngModel.$viewValue;
					var value = new Date(oldDate);
					value.setFullYear(moment(ev.date).format('YYYY'));
					value.setMonth(moment(ev.date).format('MM') - 1);
					value.setDate(moment(ev.date).format('DD'));
					if (value.getTime() === oldDate.getTime()) {
						return;
					}
					ngModel.$setViewValue(value);
					scope.dateString = moment(ngModel.$viewValue).format('MM/DD/YYYY');
				});
			});

			ngModel.$render = function() {
				inputElement.datepicker('setDate', ngModel.$viewValue);
				inputElement.datepicker('update');
				scope.dateString = moment(ngModel.$viewValue).format('MM/DD/YYYY');
			};
		}
	};
});
