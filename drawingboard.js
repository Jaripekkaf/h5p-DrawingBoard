H5P.DrawingBoard = (function (EventDispatcher, $) {
  /**
   * Constructor function.
   */
function DrawingBoard(parameters, id) {
  	var self = this;

	var paint = false;
	var context,offsetX,offsetY,curX,curY,prevX,prevY;
	
	var coordinates = function(e){
		prevX = curX;
  		prevY = curY;
  		curX = e.data.pageX - offsetX;
	    curY = e.data.pageY - offsetY;
	};
	
	var drawToCanvas = function(){  
	  context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  context.lineWidth = 5;
	  context.beginPath();
	  context.moveTo(prevX, prevY);
	  context.lineTo(curX, curY);
	  context.closePath();
	  context.stroke();
	};
	
	var setUpCanvas = function($container){
		var element = $container.find('#h5p-canvasId')[0];
		$(element).attr('width', $(element).width()).attr('height',$(element).height());
		context = element.getContext("2d");
		offsetX = $(element).offset().left;
		offsetY = $(element).offset().top;
	};
	
	var setMouseToNull = function(){
		paint = false;
		curX = undefined;
		curY = undefined;
	};
  
  var mouses = function(canvas) {
  	canvas.on('mousedown',function(e) {
  		  coordinates(e);
		  paint = true;
		  drawToCanvas();
  	});
  	
  	canvas.on('mousemove', function(e){
	  if(paint){
		coordinates(e);
		drawToCanvas();
	  }
	});
	
	canvas.on('mouseup', function(e) {
		setMouseToNull();
	});
	
	canvas.on('mouseleave', function(e) {
		setMouseToNull();
	});
  
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
 self.attach = function ($container) {
    // Set class on container to identify it as a canvas
    // container.  Allows for styling later.
    $container.addClass("h5p-drawingboard").html('');
    
    // Add canvas.
	$canvasDiv = $('<div/>');
	var canvas =  new DrawingBoard.Canvas(parameters, id);
	mouses(canvas);
	canvas.appendTo($canvasDiv);
	$canvasDiv.appendTo($container);
	setUpCanvas($container);
    // Add greeting text.
    $container.append('<div class="greeting-text">' + parameters.greeting + '</div>');
  };

}
  return DrawingBoard;
})(H5P.EventDispatcher, H5P.jQuery);