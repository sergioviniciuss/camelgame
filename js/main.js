(function() {
    var WEIGHT = {
        light: 1,
        medium: 2,
        heavy: 4
    }
    /**
     * Returns an array of all fields inside the form
     */
    function getFormFields() {
        var fields = [
            document.querySelector('#age'),
            document.querySelector('#height'),
            document.querySelector('#haircolor'),
            document.querySelector('input[name=hair]:checked'),
            document.querySelector('input[name=eye]:checked'),
            document.querySelector('input[name=beard]:checked'),
            document.querySelector('input[name=body]:checked')
        ]
        return fields;
    }
    /**
     * Receives the id of input and the one where
     * you want to print the output and update the value dynamically
     * in this output.
     * @param {string} idFieldListener 
     * @param {string} idFieldListenerResult 
     */
    function updateRangeValuesDynamically(idFieldListener, idFieldListenerResult) {
        var fieldListener = document.querySelector(idFieldListener);
        var fieldListenerResult = document.querySelector(idFieldListenerResult);
        fieldListenerResult.textContent = fieldListener.value;
        fieldListener.addEventListener('input', function(event) {
            var value = (event.target.value - event.target.min) / (event.target.max - event.target.min);
            event.target.background = '-webkit-gradient(linear, left top, right top, '
                                                    + 'from(#e8972c),'
                                                    + 'color-stop(' + value + ', #e8972c), '
                                                    + 'color-stop(' + value + ', #e6e6e6) '
                                                    + ')';
            if (event.target.tagName === 'INPUT') {
                fieldListenerResult.textContent = event.target.value;
            }
        })
    }
   /**
    * Calculates how many camels a person worths based on the weights
    * each form field gets by multiplying these weights
    */
    function calculateCamels() {
        var calculateButton = document.querySelector('#calculate-btn');
        calculateButton.addEventListener('click', function(event) {
            event.preventDefault();
            var calculatedWeight = 1;
            var fields = getFormFields();
            var resultDiv = document.querySelector('#result');
            var resultOutput = document.querySelector('#result-value');
            var form = document.querySelector('.form');
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].type === 'radio') {
                    calculatedWeight = (calculatedWeight * getWeight(fields[i].name, fields[i].value));
                } else {
                    calculatedWeight = (calculatedWeight * getWeight(fields[i].id, fields[i].value));
                }
            }
            if (!!resultDiv.getAttribute('class', 'hide')) {
                resultDiv.setAttribute('class', '');
            }
            form.setAttribute('class','hide');
            var counter = 0;
            var animation = setInterval(function() {
                counter = counter + 1;
                resultOutput.textContent = counter;
                if (counter >= calculatedWeight) {
                    clearInterval(animation);
                }
            }, 60);
        })
    }
    
    /**
     * Hides the result block and display the form
     * so that user can play again.
     * 
     */
    function resetForm() {
        var resetButton = document.querySelector('#reset-btn');
        resetButton.addEventListener('click', function(event) {
            var resultDiv = document.querySelector('#result');
            var form = document.querySelector('#camel-form');
            var resultOutput = document.querySelector('#result-value');
            form.setAttribute('class', 'form');
            resultDiv.setAttribute('class', 'hide');
            resultOutput.textContent = '';
        });
    }

    /**
     * Returns weight based on formField and value
     * @param {string} fieldId 
     * @param {*} fieldValue 
     */
    function getWeight(fieldId, fieldValue) {
        var weight = 0;
        switch (fieldId) {
            case 'age':
                weight = getAgeWeightByValue(fieldValue);
                break;
            case 'height':
                weight = getHeightWeightByValue(fieldValue);
                break;
            case 'haircolor':
                weight = getHairColorWeightByValue(fieldValue);
                break;
            case 'hair':
                weight = getHairLengthWeightByValue(fieldValue);
                break;
            case 'eye':
                weight = getEyeWeightByValue(fieldValue);
                break;
            case 'beard':
                weight = getBeardWeightByValue(fieldValue);
                break;
            case 'body':
                weight = getBodyWeightByValue(fieldValue);
                break;
        }
        return weight;
    }

    /**
     * Returns a weight based on Age value
     * @param {int} value 
     */
    function getAgeWeightByValue(value) {
        var result = WEIGHT.light;
        if (value < 34) {
            result = WEIGHT.light;
        } else if (value >= 34 && value < 48) {
            result = WEIGHT.medium;
        } else if (value >= 48) {
            result = WEIGHT.heavy;
        }
        return result;
    }
    /**
     * Returns a weight based on Height value
     * @param {int} value 
     */
    function getHeightWeightByValue(value) {
        var result = WEIGHT.light;
        if (value < 166) {
            result = WEIGHT.light;
        } else if (value >= 167 && value < 192) {
            result = WEIGHT.medium;
        } else if (value >= 192) {
            result = WEIGHT.heavy;
        }
        return result;
    }
    /**
     * Returns a weight based on Hair Color value
     * @param {string} value 
     */
    function getHairColorWeightByValue(value) {
        var result = WEIGHT.light;
        if (value === 'blonde') {
            result = WEIGHT.light;
        } else if (value === 'brown' || value === 'black') {
            result = WEIGHT.medium;
        } else if (value === 'red' || value === 'grey') {
            result = WEIGHT.heavy;
        }
        return result;
    }

    /**
     * Returns a weight based on Hair Lenght value
     * @param {string} value 
     */
    function getHairLengthWeightByValue(value) {
        var result = WEIGHT.light;
        if (value === 'long') {
            result = WEIGHT.light;
        } else if (value === 'middle' || value === 'bald') {
            result = WEIGHT.medium;
        } else if (value === 'short') {
            result = WEIGHT.heavy;
        }
        return result;
    }

    /**
     * Returns a weight based on Eye Color value
     * @param {string} value 
     */
    function getEyeWeightByValue(value) {
        var result = WEIGHT.light;
        if (value === 'brown') {
            result = WEIGHT.light;
        } else if (value === 'green' || value === 'grey') {
            result = WEIGHT.medium;
        } else if (value === 'blue') {
            result = WEIGHT.heavy;
        }
        return result;
    }

    /**
     * Returns a weight based on Beard value
     * @param {string} value 
     */
    function getBeardWeightByValue(value) {
        var result = WEIGHT.light;
        if (value === 'shaved') {
            result = WEIGHT.light;
        } else if (value === 'mustache' || value === 'goatee') {
            result = WEIGHT.medium;
        } else if (value === 'fullbeard') {
            result = WEIGHT.heavy;
        }
        return result;
    }

    /**
     * Returns a weight based on Body value
     * @param {string} value 
     */
    function getBodyWeightByValue(value) {
        var result = WEIGHT.light;
        if (value === 'strong') {
            result = WEIGHT.light;
        } else if (value === 'thin') {
            result = WEIGHT.medium;
        } else if (value === 'fat') {
            result = WEIGHT.heavy;
        }
        return result;
    }

    function init() {
        updateRangeValuesDynamically('#age','#age-result');
        updateRangeValuesDynamically('#height','#height-result');
        calculateCamels();
        resetForm();
    }
    init();
})();