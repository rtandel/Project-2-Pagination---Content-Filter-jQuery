var $students = 0;      // Number of Students
var $pages;             // Number of pages to accomodate the number of students.
var $studentLimit = 10; // Amount of students allowed on each page.
var $list = $(".student-item");   // The list items used to count number of students.

// Calculates the number of students.
$list.each(function() {
  $students++;
  $(this).addClass("student_" + $students);
});

// Calculates the number of pages required to accomodate the number of students.
$pages = Math.ceil($students / $studentLimit);


console.log($students);
console.log($pages);

  // Creates the list of available pages.
  $(".page").append("<div class=\"pagination\"><ul></ul></div>");


$pageCreation = 0;  // Provides a counter to create the right number of pages.
// Creates the list items for each page.
while ($pages !== $pageCreation) {
  $pageCreation++;
  $(".pagination ul").append("<li><a class=\"page_"+$pageCreation+"\">"+$pageCreation+"</a></li>");
}



// Initially hides all of the list items.
function hideAll() {
  $list.each(function() {
    $(this).hide();
  });
}

// Initially, the first list item is declared as active
$(".pagination .page_1").addClass("active");
correctStudents();

// Hides all of the items Selects the specified
$(".pagination a").click(function() {
  $(".pagination .active").removeClass("active");
  $(this).addClass("active");
  $pageNumber = $(this).text();
  correctStudents();
});


// Chooses the set of students based on which page is selected.
function correctStudents() {
  hideAll();
  if ($(".pagination .page_1").hasClass("active")) {
    for (var i = 1; i < 11; i++) {
      $(".student_" + i).show();
    }
  }
  if ($(".pagination .page_2").hasClass("active")) {
    for (var i = 11; i < 21; i++) {
      $(".student_" + i).show();
    }
  }
  if ($(".pagination .page_3").hasClass("active")) {
    for (var i = 21; i < 31; i++) {
      $(".student_" + i).show();
    }
  }
  if ($(".pagination .page_4").hasClass("active")) {
    for (var i = 31; i < 41; i++) {
      $(".student_" + i).show();
    }
  }
  if ($(".pagination .page_5").hasClass("active")) {
    for (var i = 41; i < 51; i++) {
      $(".student_" + i).show();
    }
  }
  if ($(".pagination .page_6").hasClass("active")) {
    for (var i = 51; i < 55; i++) {
      $(".student_" + i).show();
    }
  }
}

//Now to get the search working.

$(".page-header").append("<div class=\"student-search\">" +
                          "<input placeholder=\"Search for students...\">" +
                          "<button class=\"search-button\">Search</button></div>");

$(".search-button").click(function() {
  var $searchText = $(".student-search input").val();

    // for (var i = 1; i < $students; i++) {
    //   if ($(".student_"+ i + " h3").text() == $searchText) {
    //     hideAll();
    //     $(".student_" + i).show();
    //     break;
    //   }
    // }
    // for (var i = 1; i < $students; i++) {
    //   if ($(".student_"+ i +" .email").text() === $searchText) {
    //     hideAll();
    //     $(".student_" + i).show();
    //     break;
    //   }
    // }
    var $counter = 0;
    hideAll();
    $list.each(function() {
      $("li:contains("+ $searchText+")").show();
    });




});
