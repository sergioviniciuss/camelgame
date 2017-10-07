(function() {
    var age = document.querySelector('#age');
    var ageResult = document.querySelector('#age-result');
    ageResult.textContent = age.value;
    age.addEventListener('input', function(element) {
        if (element.target.tagName === 'INPUT') {
            ageResult.textContent = element.target.value;
        }
    })
})();