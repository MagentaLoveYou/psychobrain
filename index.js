$(document).ready(function() {
    var items = ['PASSION', 'ETERNITY', 'LIBERTY', 'TRANQUILITY', 'DESTINY', 'FANTASTIC', 'MYNAME', 'DELAY', 'METEOR', 'HAMMER']; 
    var previous = [];
    var correct = 0;
    var incorrect = 0;
    var intervalId;
    var level = 3;
    randomIndex = 0;
    var delay = ( milliseconds ) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    var flag = true;
    var counter = 0;
    var repeat = false;
    var start_flag = true;
    var check_flag = false;
    var sync = 0;

    function displayRandomItem() {
        if (check_flag) {
          incorrect++;
//           $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
        };
        if (counter >= 20 + level*2) {
          clearInterval(intervalId);
          $("#prompt").text('');
          $("#prompt").text('Finish!');
          $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
          var percent = "Percent: " + String(correct / (correct + incorrect) * 100)
          $("#score").text(percent);
          counter = 0;
          return
        };
        sync++;
        
        var randomIndex = Math.floor(Math.random() * items.length);
        if (randomIndex === 1 || randomIndex === 3 || randomIndex === 5) {
            var text = previous[previous.length - (level + 1)] ;
            previous.push(items[randomIndex]);
        } else {
            var text = items[randomIndex];
            previous.push(items[randomIndex]);
        };
        var count = 0;
        $("#prompt").text('');
        function character(start, end, text) {
          return text.substring(start, end)
        };
        function type() {
          var rnd = 20;
          setTimeout(type, rnd);
          $("#prompt").append(character(count, count+1, text));
          count++;
        }
        type();
        flag = true;
        repeat = true;
        check_flag = false;
        counter++;
        if (previous[previous.length - (level + 1)] === previous[previous.length - 1] && repeat === true)  {  
          check_flag = true;
        };
    };

    function check() {
         if (previous[previous.length - (level + 1)] === previous[previous.length - 1]) {
           correct++;
         } else {
           incorrect++
         };
//          $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
         flag = false;
         check_flag = false
      };
   
  
    $("#start-button").click(function() {
      if (start_flag) {
        intervalId = setInterval(displayRandomItem, 3000)
        start_flag = false
      };
    });
  
    $("#yes-button").click(function() {
      repeat = false;
      if (flag) {
        check();
      };
    });
  
    $("#stop-button").click(function() {
      clearInterval(intervalId);
    });
  
    $("#reset-button").click(function() {
      clearInterval(intervalId);
      previous = [];
      correct = 0;
      incorrect = 0;
      $("#prompt").text("");
      $("#score").text("Correct: 0 Incorrect: 0");
      start_flag = true;
    });
  
    $("#set-level-button").click(function() {
      level = parseInt($("#level-input").val());
    });
  });
