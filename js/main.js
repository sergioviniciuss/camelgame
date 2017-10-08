(function() {
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
    var weight = {
        light: 1,
        medium: 2,
        heavy: 4
    }
    var age = document.querySelector('#age');
    var ageResult = document.querySelector('#age-result');
    ageResult.textContent = age.value;
    age.addEventListener('change', function(event) {
        var value = (event.target.value - event.target.min) / (event.target.max - event.target.min);
        this.style.backgroundImage = '-webkit-gradient(linear, left top, right, top, '
                                                + 'color-stop(' + value + ', #e8972c), '
                                                + 'color-stop(' + value + ', #e6e6e6) '
                                                + ')';
        if (event.target.tagName === 'INPUT') {
            ageResult.textContent = event.target.value;
        }
    })

    var height = document.querySelector('#height');
    var heightResult = document.querySelector('#height-result');
    heightResult.textContent = height.value;
    height.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT') {
            heightResult.textContent = event.target.value;
        }
    })

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
        console.log("Final Result", calculatedWeight);
        var animation = setInterval(function() {
            counter = counter + 1;
            resultOutput.textContent = counter;
            if (counter >= calculatedWeight) {
                clearInterval(animation);
            }
        }, 60);
    })
    var resetButton = document.querySelector('#reset-btn');
    resetButton.addEventListener('click', function(event) {
        var resultDiv = document.querySelector('#result');
        var form = document.querySelector('#camel-form');
        var resultOutput = document.querySelector('#result-value');
        form.setAttribute('class', 'form');
        resultDiv.setAttribute('class', 'hide');
        resultOutput.textContent = '';
    });

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
     * Return a weight based on Age value
     * @param {int} value 
     */
    function getAgeWeightByValue(value) {
        var result = weight.light;
        if (value < 34) {
            result = weight.light;
        } else if (value >= 34 && value < 48) {
            result = weight.medium;
        } else if (value >= 48) {
            result = weight.heavy;
        }
        return result;
    }
    /**
     * Return a weight based on Height value
     * @param {int} value 
     */
    function getHeightWeightByValue(value) {
        var result = weight.light;
        if (value < 166) {
            result = weight.light;
        } else if (value >= 167 && value < 192) {
            result = weight.medium;
        } else if (value >= 192) {
            result = weight.heavy;
        }
        return result;
    }
    /**
     * Return a weight based on Hair Color value
     * @param {int} value 
     */
    function getHairColorWeightByValue(value) {
        var result = weight.light;
        if (value === 'blonde') {
            result = weight.light;
        } else if (value === 'brown' || value === 'black') {
            result = weight.medium;
        } else if (value === 'red' || value === 'grey') {
            result = weight.heavy;
        }
        return result;
    }

    /**
     * Return a weight based on Hair Lenght value
     * @param {int} value 
     */
    function getHairLengthWeightByValue(value) {
        var result = weight.light;
        if (value === 'long') {
            result = weight.light;
        } else if (value === 'middle' || value === 'bald') {
            result = weight.medium;
        } else if (value === 'short') {
            result = weight.heavy;
        }
        return result;
    }

    /**
     * Return a weight based on Eye Color value
     * @param {int} value 
     */
    function getEyeWeightByValue(value) {
        var result = weight.light;
        if (value === 'brown') {
            result = weight.light;
        } else if (value === 'green' || value === 'grey') {
            result = weight.medium;
        } else if (value === 'blue') {
            result = weight.heavy;
        }
        return result;
    }

    /**
     * Return a weight based on Beard value
     * @param {int} value 
     */
    function getBeardWeightByValue(value) {
        var result = weight.light;
        if (value === 'shaved') {
            result = weight.light;
        } else if (value === 'mustache' || value === 'goatee') {
            result = weight.medium;
        } else if (value === 'fullbeard') {
            result = weight.heavy;
        }
        return result;
    }

    /**
     * Return a weight based on Body value
     * @param {int} value 
     */
    function getBodyWeightByValue(value) {
        var result = weight.light;
        if (value === 'strong') {
            result = weight.light;
        } else if (value === 'thin') {
            result = weight.medium;
        } else if (value === 'fat') {
            result = weight.heavy;
        }
        return result;
    }
})();