const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const parser = require('body-parser');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var importanttask = [
  "Building GUI", "Milestone Planning", "Guiding Customers", "Virtual Planning"
];
var priortask = [
  "Milestone Startup", "Customer meetups", "Client Logic", "Unity"
];
var finishedtask = [
"DevOPs", "Planning", "Publishing App", "finals checks"

];


app.get('/', function(req, res){
  var date = new Date();
  var fulldate = date.toLocaleDateString() ;
  var currentday = date.getDay();
  var Day = "";
  switch (currentday) {
    case 0:
  var Day = "SUNDAY";

      break;
      case 1:
var Day = "MONDAY";
        break;
        case 2:
var Day = "TUESDAY";
          break;
          case 3:
var Day = "WEDNESDAY";
            break;
            case 4:
var Day = "THURSDAY";
              break;
              case 5:
var Day = "FRIDAY";
                break;
                case 6:
var Day = "SATURDAY";
                  break;
    default:
    var Day = "";
  }
  res.render('pages/index', {d: fulldate, day: Day, prior:priortask, finished: finishedtask, important: importanttask});
});

app.post('/removeprior', function(req, res){
  priortask.pop();
  res.redirect('/');
})
app.post('/removeimportant', function(req, res){
  importanttask.pop();
  res.redirect('/');
})
app.post('/removefinished', function(req, res){
  finishedtask.pop();
  res.redirect('/');
})


app.post('/add', function(req, res){
  var title = req.body.name;
  var category = req.body.category;
  switch (category) {
    case "important":
      importanttask.push(title);
      break;
      case "prior":
      priortask.push(title);
        break;
        case "finished":
        finishedtask.push(title);

          break;
    default:

  }

  res.redirect('/');


})


app.listen(port, function(req, res){
  console.log("server is up and running on port " + port);
})
