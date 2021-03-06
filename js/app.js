var $students = 0;                // Number of Students
var $pages;                       // Number of pages to accomodate the number of students.
var $studentLimit = 10;           // Amount of students allowed on each page.
var $list = $(".student-item");   // The list items used to count number of students.
var $foundStudentsArray = [];     // The array used to keep track of the search results.

// Calculates the number of students.
function calculateStudents() {
  $(".student-item:visible").each(function() {
      $students++;
  });
}

// Hides all of the list items.
function hideAll() {
  $list.each(function() {
    $(this).hide();
  });
}

// Shows all of the list items.
function showAll() {
  $list.each(function() {
    $(this).show();
  });
}

calculateStudents();   // to initially count the number of students.
hideAll();             // to hide all of the students intially.

// Calculates the number of pages required to accomodate the number of students.
$pages = Math.ceil($students / $studentLimit);


// appends the div and the unordered list to the page
$(".page").append("<div class=\"pagination\"><ul></ul></div>");

// Initially calls the functions.
hideAll();
$(".pagination li:first").addClass("active");
pageCreate();
paginateInitial(1);

 // Provides a counter to create the right number of pages.
// Creates the list items for each page.
// This also sets the action listener for the pages.
var $item;
function pageCreate() {
  // If a page list already exists.
  if ($(".pagination ul").length !== 0) {
    $(".pagination ul").empty();
  }
  var $pageCreation = 0;       // counter to stop the while loop when it reaches
                           // the correct amount of page numbers
  console.log($pages);
  // Creates the correct number of pages.
  while ($pages !== $pageCreation) {
    $pageCreation++;
    $(".pagination ul").append("<li><a>"+$pageCreation+"</a></li>");
    $(".pagination li a").first().addClass("active");
    console.log($pageCreation);
  }
    $(".pagination li a:target").addClass("active");

  // Specifies the action listener each time this function is called.
  $(".pagination a").click(function() {
    $(".pagination a").removeClass("active");
    $(this).addClass("active");
    $item = $(this);
    var $selected = Number($(this).text());
    if ($searchText === "") {
      paginateInitial($selected);
    } else {
      paginateSearch($selected);
    }
  });
}

// pagination for the initial items.
function paginateInitial(x) {
    hideAll();
      if (x > $pages.length) {
        x = x / 10;
      }
      var $page = x;
      var $currentMax = 10 * $page - 1;
      var $min = $currentMax - 9;
      if ($page === $pages.length) {
        $currentMax = $students;
      }
      if ($(".pagination .active").text() === ""+$page+"") {
        hideAll();
        for (var i = $min; i <= $currentMax; i++) {
            $('.student-item').eq(i).fadeIn("fast", function() {
                // finished
            });
        }
      }
}

// Sorry message for when no students were found
$(".page").append("<p class=\"sorry\">Sorry, no students found...</p>");
$(".sorry").hide();

// pagination for the search items.
function paginateSearch(y) {
  hideAll();
  var $index;                           // The place in the array.
                  // Creates the pages.
  var $page = y;                        // Specifies the page number
  var $currentMax = 10 * $page - 1;     // Sets the max based on which page.
  var $min = $currentMax - 9;           // Min calculated based on the max.

  // if the page number is the last page, then paginate all of the items.
  if ($page === $pages.length) {
    $currentMax = $foundStudentsArray.length;
  }
  // If no users students were found.
  if ($foundStudentsArray.length === 0) {
    $(".sorry").show();
  } else {
    $(".sorry").hide();
  }
  if ($(".pagination .active").text() === ""+$page+"") {
    hideAll();
    for (var i = $min; i <= $currentMax; i++) {
      $index = $foundStudentsArray[i];
      console.log($page);
      $('.student-item').eq($index).fadeIn("fast", function() {
        // finished.
      });
    }
  }
}

// Append the search div, search box, and button.
$(".page-header").append("<div class=\"student-search\">" +
                          "<input placeholder=\"Search for students...\">" +
                          "<button class=\"search-button\">Search</button></div>");
// The text input from the user.
var $searchText;
var $searchChange = $(".student-search input");

// Makes the contains method case insensitive.
jQuery.expr[":"].contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// Function called when the search button is clicked.
$(".search-button").click(function() {
  $foundStudentsArray = [];
  $searchText = $(".student-search input").val();
  // If the search box is empty, reset.
  if ($searchText === '') {
    showAll();
    calculateStudents();
    pageCreate();
  }
    hideAll();              // Hides the items before comparing.
    var $counter;           // Keeps track of the items found in the search.
    // if the item is found, add it to the array.
    $(".student-list .student-details:contains("+ $searchText+")").each(function() {
        $counter = $(this).index(".student-details");
        $foundStudentsArray.push($counter);
        console.log($counter);
    });
    // Recalculates the pages with the amount of matched items that were
    // added to the array.
    $pages = Math.ceil($foundStudentsArray.length / 10);
    paginateSearch($(".pagination .active").text());
    pageCreate();
});

// Triggers the click function when the user lifts up the key
// on the keyboard.
$($searchChange).keyup(function() {
  $(".search-button").trigger("click");
});
