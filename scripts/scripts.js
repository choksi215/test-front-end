let selectHeight;
let selectNum;
let stepComplete = 0;
let question1Filled = false;
let question2Filled = false;
let noNeed1 = false;
let noNeed2 = false;
function selectManager(selected_num) {
	$('#attendee_container').height(selected_num);
}

function inputQuestions(selectedQuestion, questionIndex) {
	selectedQuestion.on('input', function () {
		if ($(this)[0].value.length) {
			if (questionIndex == 1) {
				question1Filled = true;
				console.log('question1Filled', question1Filled);
			} else if (questionIndex == 2) {
				question2Filled = true;
				console.log('question2Filled', question2Filled);
			}
			proceedToStep3();
		}
	});
}
function proceedToStep3() {
	if (
		(noNeed1 && noNeed2) ||
		(!noNeed1 && question1Filled && !noNeed2 && question2Filled) ||
		(!noNeed1 && question1Filled && noNeed2 && !question2Filled) ||
		(noNeed1 && !question1Filled && !noNeed2 && question2Filled)
	) {
		stepComplete = 2;
		console.log('si va allo step 3');
		checkToProceed();
	}
}

function accordionManager() {
	$('input[type=radio][name=company_name_toggle_group]').change(function () {
		if (this.value == 'on') {
			$('#step_2 #company_name_wrap').height('100%');
			noNeed1 = false;
			question1Filled = false;
			inputQuestions($('#step_2 #company_name_wrap input'), 1);
		} else {
			$('#step_2 #company_name_wrap').height('0');
			noNeed1 = true;
		}
		console.log('noNeed1', noNeed1);
		console.log('question1Filled', question1Filled);
		proceedToStep3();
	});
	$('input[type=radio][name=special_accommodations_toggle]').change(
		function () {
			if (this.value == 'on') {
				$('#step_2 #special_accommodations_wrap').height('100%');
				noNeed2 = false;
				question2Filled = false;
				inputQuestions(
					$('#step_2 #special_accommodations_wrap textarea'),
					2
				);
			} else {
				$('#step_2 #special_accommodations_wrap').height('0');
				noNeed2 = true;
			}
			console.log('noNeed2', noNeed2);
			console.log('question2Filled', question2Filled);
			proceedToStep3();
		}
	);
}
function checkToProceed() {
	if (stepComplete == 1) {
		step2();
		$('#step1_result').height(160);
	} else if (stepComplete == 2) {
		step3();
		$('#step2_result').height(160);
	}
}
function inputManager() {
	let inputWrapper = $('.pointer');

	inputWrapper.on('input', function () {
		stepComplete = 1;
		if (
			$(this)[0].value.length &&
			selectNum == $(this)[0].dataset.inputValue
		) {
			checkToProceed();
		}
	});
}
function step1() {
	let selectElement = $('#step_1 select.num_attendees');
	selectElement.on('change', function () {
		selectHeight = $(this)[0].selectedOptions[0].dataset.heightValue;
		selectNum = selectElement[0].value;
		selectManager(selectHeight);

		inputManager();
	});
}

function step2() {
	$('#step_2').prop('disabled', false);
	accordionManager();
}

function step3() {
	$('#step_3').prop('disabled', false);
	$('#rock').on('change', function () {
		if ($('#rock')[0].checked) {
			$('#submit_button').prop('disabled', false);
		} else {
			$('#submit_button').prop('disabled', true);
		}
	});
}

step1();
