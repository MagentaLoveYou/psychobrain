$(document).ready(function() {
    var items = ['PASSION', 'ETERNITY', 'LIBERTY'] //'TRANQUILITY', 'DESTINY', 'FANTASTIC']; 
    var previous = [];
    var correct = 0;
    var incorrect = 0;
    var intervalId;
    var level = 3;
    randomIndex = 0;
    var delay = ( milliseconds ) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    var flag = true;
    var clck = 0;
    var counter = 0;
    var repeat = true;
    var start_flag = true;
    var sync = 0;

    function displayRandomItem() {
        sync ++;
        var randomIndex = Math.floor(Math.random() * items.length);
        var text = items[randomIndex];
        previous.push(items[randomIndex]);
        var count = 0;
        $("#prompt").text('');
        function character(start, end, text) {
          return text.substring(start, end)
        };
        function type() {
          var rnd = 200;
          setTimeout(type, rnd);
          $("#prompt").append(character(count, count+1, text));
          count++;
        }
        type();
        flag = true;
        if (previous[previous.length - (level + 1)] === previous[previous.length - 1] && repeat === true && clck === 0 )  {
          incorrect++;
          $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
        } else {
            clck--;
        };
        counter++;
        if (counter >= 2 + level*2) {
          clearInterval(intervalId);
          $("#prompt").text('');
          $("#prompt").text('Nice!');
          counter = 0;
        };
    };

    function check() {
         if (previous[previous.length - (level + 1)] === previous[previous.length - 1]) {
           correct++;
         } else {
           incorrect++
         };
         if (clck === 0) {
           clck++;
         } else {
           clck--;
         };
         $("#score").text("Correct: " + correct + " Incorrect: " + incorrect);
         flag = false;
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
        if (clck === 0) {
          clck++
        };
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
