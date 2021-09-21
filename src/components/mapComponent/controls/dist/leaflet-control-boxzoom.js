const L =require ('leaflet');
L.Control.BoxZoom=L.Control.extend({options:{position:"topright",title:"Click here then draw a square on the map, to zoom in to an area",aspectRatio:null,divClasses:"",enableShiftDrag:!1,iconClasses:"",keepOn:!1},initialize:function(o){L.setOptions(this,o),this.map=null,this.active=!1},onAdd:function(o){if(this.map=o,this.active=!1,this.controlDiv=L.DomUtil.create("div","leaflet-control-boxzoom"),this.options.iconClasses||L.DomUtil.addClass(this.controlDiv,"with-background-image"),this.options.divClasses&&L.DomUtil.addClass(this.controlDiv,this.options.divClasses),(this.controlDiv.control=this).controlDiv.title=this.options.title,this.controlDiv.innerHTML=" ",L.DomEvent.addListener(this.controlDiv,"mousedown",L.DomEvent.stopPropagation).addListener(this.controlDiv,"click",L.DomEvent.stopPropagation).addListener(this.controlDiv,"click",L.DomEvent.preventDefault).addListener(this.controlDiv,"click",function(){this.control.toggleState()}),this.setStateOff(),this.options.iconClasses){var t=L.DomUtil.create("i",this.options.iconClasses,this.controlDiv);t?(t.style.color=this.options.iconColor||"black",t.style.textAlign="center",t.style.verticalAlign="middle"):console.log("Unable to create element for icon")}return this.options.aspectRatio&&(this.map.boxZoom.aspectRatio=this.options.aspectRatio,this.map.boxZoom._onMouseMove=this._boxZoomControlOverride_onMouseMove,this.map.boxZoom._onMouseUp=this._boxZoomControlOverride_onMouseUp),this.controlDiv},onRemove:function(o){this.options.aspectRatio&&(delete this.map.boxZoom.aspectRatio,this.map.boxZoom._onMouseMove=L.Map.BoxZoom.prototype._onMouseMove,this.map.boxZoom._onMouseUp=L.Map.BoxZoom.prototype._onMouseUp)},toggleState:function(){this.active?this.setStateOff():this.setStateOn()},setStateOn:function(){L.DomUtil.addClass(this.controlDiv,"leaflet-control-boxzoom-active"),this.active=!0,this.map.dragging.disable(),this.options.enableShiftDrag||this.map.boxZoom.addHooks(),this.map.on("mousedown",this.handleMouseDown,this),this.options.keepOn||this.map.on("boxzoomend",this.setStateOff,this),L.DomUtil.addClass(this.map._container,"leaflet-control-boxzoom-active")},setStateOff:function(){L.DomUtil.removeClass(this.controlDiv,"leaflet-control-boxzoom-active"),this.active=!1,this.map.off("mousedown",this.handleMouseDown,this),this.map.dragging.enable(),this.options.enableShiftDrag||this.map.boxZoom.removeHooks(),L.DomUtil.removeClass(this.map._container,"leaflet-control-boxzoom-active")},handleMouseDown:function(o){this.map.boxZoom._onMouseDown.call(this.map.boxZoom,{clientX:o.originalEvent.clientX,clientY:o.originalEvent.clientY,which:1,shiftKey:!0})},_boxZoomControlOverride_onMouseMove:function(o){this._moved||(this._box=L.DomUtil.create("div","leaflet-zoom-box",this._pane),L.DomUtil.setPosition(this._box,this._startLayerPoint),this._container.style.cursor="crosshair",this._map.fire("boxzoomstart"));var t=this._startLayerPoint,i=this._box,s=this._map.mouseEventToLayerPoint(o),e=s.subtract(t),n=new L.Point(Math.min(s.x,t.x),Math.min(s.y,t.y));L.DomUtil.setPosition(i,n),this._moved=!0;var a=Math.max(0,Math.abs(e.x)-4),l=Math.max(0,Math.abs(e.y)-4);this.aspectRatio&&(l=a/this.aspectRatio),i.style.width=a+"px",i.style.height=l+"px"},_boxZoomControlOverride_onMouseUp:function(o){var t=this._box._leaflet_pos,i=new L.Point(this._box._leaflet_pos.x+this._box.offsetWidth,this._box._leaflet_pos.y+this._box.offsetHeight),s=this._map.layerPointToLatLng(t),e=this._map.layerPointToLatLng(i);if(!s.equals(e)){this._finish();var n=new L.LatLngBounds(s,e);this._map.fitBounds(n),this._map.fire("boxzoomend",{boxZoomBounds:n})}}}),L.Control.boxzoom=function(o){return new L.Control.BoxZoom(o)};