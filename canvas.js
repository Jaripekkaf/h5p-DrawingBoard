(function (DrawingBoard, EventDispatcher, $) {

  /**
   * Controls all the operations for each card.
   *
   * @class H5P.MemoryGame.Card
   * @param {Object} parameters
   * @param {Number} id
   */
  DrawingBoard.Canvas = function (parameters, id) {
    var self = this;
    
    EventDispatcher.call(self);

    
    self.mousedown = function (e) {
    	self.trigger('mousedown',e);
    	
    };

    self.mouseup = function () {
    	self.trigger('mouseup');
    };


    self.mousemove = function (e) {
    	self.trigger('mousemove',e);
    };

    self.mouseleave = function () {
    	self.trigger('mouseleave');
    };

    /**
     * Append canvas to the given container.
     *
     * @param {H5P.jQuery} $container
     */
    self.appendTo = function ($container) {
      	var canvasElement = document.createElement('canvas');
      	$(canvasElement).addClass("h5p-canvas").attr('id','h5p-canvasId').attr('width', 'auto').attr('height','auto').appendTo($container);
      	if(typeof G_vmlCanvasManager != 'undefined') {
			canvasElement = G_vmlCanvasManager.initElement(canvasElement);
		}
		$(canvasElement).mousedown(function(e){
			self.mousedown(e);
		}).mouseup(function(){
			self.mouseup();
		}).mousemove(function(e){
			self.mousemove(e);
		}).mouseleave(function(){
			self.mouseleave();
		});
  		};
  	};

  // Extends the event dispatcher
  DrawingBoard.Canvas.prototype = Object.create(EventDispatcher.prototype);
  DrawingBoard.Canvas.prototype.constructor = DrawingBoard.Canvas;

})(H5P.DrawingBoard, H5P.EventDispatcher, H5P.jQuery);
