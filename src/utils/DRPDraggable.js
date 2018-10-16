import Draggable from "@telerik/kendo-draggable";

let pressPosition = undefined;   // position of the mouse press

// this function sets up the draggable object.
const draggableObj = new Draggable({
  press: (e) => {
    const element = document.getElementsByClassName('k-dialog')[0];
    element.style.display = 'block';
    element.style.position = 'absolute';
    let elementInitialCoordinates = element.getBoundingClientRect();
    pressPosition = {
      x: e.clientX - parseFloat(element.style.left || elementInitialCoordinates.left),
      y: e.clientY - parseFloat(element.style.top || elementInitialCoordinates.top)
    }
  },
  drag: (e) => {
    const element = document.getElementsByClassName('k-dialog')[0];
    element.style.left = e.clientX - pressPosition.x + 'px';
    element.style.top = + e.clientY - pressPosition.y + 'px';
  }
});


// this function sets up the draggable handling.
const setupDraggable = (draggableObj, element) => {
  if (element) {
    const parent = element.parentElement;
    if (parent) {
      parent.style.cursor = 'move';
      const grandParent = parent.parentElement;
      if (grandParent) {
        draggableObj.bindTo(grandParent);
        grandParent.style.cursor = 'move';
      } else {
        draggableObj.bindTo(parent);
      }
    } else {
      draggableObj.bindTo(element);
      element.style.cursor = 'move';
    }
  }
}
const setupDraggableNoop = (draggableObj, element) => {
  // Draggable is not stable. Let's skip it
}

const DRPDraggable = {
  draggableObj,
  setupDraggable,
}

export default DRPDraggable;
