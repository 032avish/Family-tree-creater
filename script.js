// creating canvas
const canvas = document.getElementById('family-tree-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//array to store nodes
const nodes = [];
const addNodeButton = document.getElementById('addNodeButton');
addNodeButton.addEventListener('click', addRectangleNode);

// event listeners to drag and drop functionality
canvas.addEventListener('mousedown', startDragging);
canvas.addEventListener('mousemove', dragNode);
canvas.addEventListener('mouseup', stopDragging);


const nodeWidth = 140;
const nodeHeight = 80;


function addRectangleNode() {
    const node = {
        x: Math.random() * (canvas.width - nodeWidth),
        y: Math.random() * (canvas.height - nodeHeight),
        width: nodeWidth,
        height: nodeHeight,
        name: 'Name',
        sex: 'Sex',
        description: 'Description',
        isDragging: false,
        isResizing: false,
    };
    nodes.push(node);
    drawNodes();
    drawAllLines();
}

function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.fillRect(node.x, node.y, node.width, node.height);
        ctx.strokeRect(node.x, node.y, node.width, node.height);

        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x + node.width / 2, node.y + 20);
        ctx.fillText(node.sex, node.x + node.width / 2, node.y + 40);
        ctx.fillText(node.description, node.x + node.width / 2, node.y + 60);

    });
}

let selectedNode = null;
let prevX = 0;
let prevY = 0;

function startDragging(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (const node of nodes) {
        if (
            mouseX >= node.x && mouseX <= node.x + node.width &&
            mouseY >= node.y && mouseY <= node.y + node.height
        ) {
            selectedNode = node;
            prevX = mouseX - node.x;
            prevY = mouseY - node.y;
            if (mouseX > node.x + node.width && mouseY > node.y + node.height) {
                node.isResizing = true;
            } else {
                node.isDragging = true;
            }

            drawNodes();
            drawAllLines();
            break;
        }
    }
}


function dragNode(event) {
    if (selectedNode) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (selectedNode.isDragging) {
            selectedNode.x = mouseX - prevX;
            selectedNode.y = mouseY - prevY;
        } else if (selectedNode.isResizing) {
            selectedNode.width = Math.max(mouseX - selectedNode.x, 50);
            selectedNode.height = Math.max(mouseY - selectedNode.y, 50);
        }
        drawNodes();
        drawAllLines();
    }
}

function stopDragging() {
    if (selectedNode) {
        selectedNode.isDragging = false;
        selectedNode.isResizing = false;
        selectedNode = null;
    }
}
 // Double-click event listener for nodes
 canvas.addEventListener('dblclick', handleNodeDoubleClick);

// function handleNodeDoubleClick(event) {
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     for (const node of nodes) {
//         if (
//             mouseX >= node.x && mouseX <= node.x + node.width &&
//             mouseY >= node.y && mouseY <= node.y + node.height
//         ) {
//             const newName = prompt('Enter new name:');
//             if (newName === null) return;

//             const newSex = prompt('Enter new sex:');
//             if (newSex === null) return;

//             const newDescription = prompt('Enter new description:');
//             if (newDescription === null) return;

//             node.name = newName;
//             node.sex = newSex;
//             node.description = newDescription;

//             drawNodes();
//             drawAllLines();
//             break;
//         }
//     }
// }
function handleNodeDoubleClick(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (const node of nodes) {
        if (
            mouseX >= node.x && mouseX <= node.x + node.width &&
            mouseY >= node.y && mouseY <= node.y + node.height
        ) {
            const nodeForm = document.getElementById('node-form');
            const nameInput = document.getElementById('name');
            const sexInput = document.getElementById('sex');
            const descriptionInput = document.getElementById('description');
            const saveButton = document.getElementById('saveButton');
            const closeButton = document.getElementById('closeButton');
            const modal = document.getElementById('node-modal');

            // Populate the form with the existing node data
            nameInput.value = node.name;
            sexInput.value = node.sex;
            descriptionInput.value = node.description;

            // Display the modal with a slight delay
            setTimeout(() => {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }, 300);

            // Save button click event listener
            saveButton.addEventListener('click', () => {
                // Update node data with new values from the form
                node.name = nameInput.value;
                node.sex = sexInput.value;
                node.description = descriptionInput.value;

                // Redraw nodes and lines
                drawNodes();
                drawAllLines();

                // Hide the modal
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });

            // Close button click event listener
            closeButton.addEventListener('click', () => {
                // Hide the modal
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            });

            break;
        }
    }
}


canvas.addEventListener('mousemove', drawLine);
function drawLine(event) {
    if (!isDrawing) return;

    const endX = event.clientX - canvas.getBoundingClientRect().left;
    const endY = event.clientY - canvas.getBoundingClientRect().top;

    clearCanvas();
    drawNodes();
    drawAllLines();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

//lines array to store the lines      
const lines = [];
let isDrawing = false;
let startX = 0;
let startY = 0;



const addLineButton = document.getElementById('addLinkButton');
addLineButton.addEventListener('click', () => {
    isDrawing = true;
    canvas.addEventListener('click', setStartPoint);
});

function setStartPoint(event) {
    if (isDrawing) {
        startX = event.clientX - canvas.getBoundingClientRect().left;
        startY = event.clientY - canvas.getBoundingClientRect().top;
        canvas.removeEventListener('click', setStartPoint);
        canvas.addEventListener('click', setEndPoint);

    }
}

function setEndPoint(event) {
    const endX = event.clientX - canvas.getBoundingClientRect().left;
    const endY = event.clientY - canvas.getBoundingClientRect().top;

    lines.push({ startX, startY, endX, endY });
    isDrawing = false;
    canvas.removeEventListener('click', setEndPoint);
    clearCanvas();
    drawNodes();
    drawAllLines();
}

function drawAllLines() {
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}