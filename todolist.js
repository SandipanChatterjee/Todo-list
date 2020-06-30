let title = "";
let description = "";
const arr = {
  list: [],
  inProgress: [],
  finish: [],
};

let delBtnId = 0;
let editBtnId = 0;
let okBtnId = 0;
let listId = 0;
let arrayListId = 0;

const delElement = (e) => {
  const item = document.getElementById(e.target.id);
  arrayManipulation(null, item.parentElement.parentElement.id);
  item.parentElement.parentElement.remove();
};

const btn = () => {};

const res = () => {
  console.log(arr);
};

const confirmEdit = (e) => {
  console.log("title", title, description);
  const item = document.getElementById(e.target.id).parentElement;
  console.log(item.parentElement);
  Array.from(item.childNodes).map((el, index) => {
    console.log(el);
    if (index > 2) {
      el.remove();
    } else {
      el.style.display = "block";
    }
  });

  item.childNodes[1].innerHTML = "TITLE: " + title;
  item.childNodes[2].innerHTML = "DESCRIPTION: " + description;
  if (item.parentElement.id === "list") {
    arr.list.map((el, index) => {
      if (el.id === item.id) {
        el.title = title;
        el.description = description;
      }
    });
  } else if (item.parentElement.id === "in-progress") {
    arr.inProgress.map((el, index) => {
      if (el.id === item.id) {
        el.title = title;
        el.description = description;
      }
    });
  } else {
    arr.finish.map((el, index) => {
      if (el.id === item.id) {
        el.title = title;
        el.description = description;
      }
    });
  }
};

const editElement = (e) => {
  const item = document.getElementById(e.target.id).parentNode.parentNode;
  //
  const titleInputBox = document.createElement("input");
  titleInputBox.value = item.childNodes[1].innerHTML.split(":")[1];
  // let title1 = "";
  // let description1 = "";
  titleInputBox.addEventListener("change", (e) => {
    title = e.target.value;
  });

  //
  const descInputBox = document.createElement("input");
  descInputBox.value = item.childNodes[2].innerHTML.split(":")[1];
  descInputBox.addEventListener("change", (e) => {
    description = e.target.value;
  });

  // console.log("title1", title1);

  // title = title1 !== "" ? title1 : title;
  // description = description1 !== "" ? description1 : description;

  Array.from(item.childNodes).map((item) => {
    item.style.display = "none";
  });

  //ok button
  let okBtn = document.createElement("button");
  okBtn.id = `okBtn - ${okBtnId++}`;
  okBtn.style.border = "1px solid blue";
  okBtn.style.background = "blue";
  okBtn.style.color = "white";
  okBtn.style.padding = "5px";
  okBtn.style.cursor = "pointer";
  okBtn.innerHTML = "Ok";
  okBtn.style.float = "right";
  okBtn.onclick = confirmEdit;

  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  h3.append("Title: ", titleInputBox);
  p.append("Description: ", descInputBox);
  item.appendChild(okBtn);
  item.appendChild(h3);
  item.appendChild(p);
};

const dragStart = (e) => {
  e.dataTransfer.setData("todoItem", e.target.id);
};

const dragElement = (e) => {
  // console.log("e is dragged###", e);
};

const allowDrop = (e) => {
  e.preventDefault();
};

const arrayManipulation = (e, dataId) => {
  let delItem;
  console.log("dataId ##", dataId);
  //remove from list array
  arr.list.map((item, index, array) => {
    if (item.id === dataId) {
      delItem = arr.list.splice(index, 1);
    }
  });
  //remove from inProgress array
  arr.inProgress.map((item, index, array) => {
    if (item.id === dataId) {
      delItem = arr.inProgress.splice(index, 1);
    }
  });
  //remove from finish array
  arr.finish.map((item, index, array) => {
    if (item.id === dataId) {
      console.log(item.id, dataId);
      delItem = arr.finish.splice(index, 1);
    }
  });
  if (e !== null) {
    if (e.target.id === "in-progress") {
      //push into inProgress array
      arr.inProgress.push(...delItem);
    } else if (e.target.id === "finish-list") {
      //push into finish array
      arr.finish.push(...delItem);
    } else {
      // push into list array
      arr.list.push(...delItem);
    }
  }
};

const dropElement = (e) => {
  e.preventDefault();
  const dataId = e.dataTransfer.getData("todoItem");
  const todoItem = document.getElementById(dataId);
  e.target.appendChild(todoItem);
  arrayManipulation(e, dataId);
};

const newElement = () => {
  //delete button
  let delBtn = document.createElement("button");
  delBtn.id = `delBtn - ${delBtnId++}`;
  delBtn.style.border = "1px solid red";
  delBtn.style.background = "red";
  delBtn.style.color = "white";
  delBtn.style.padding = "5px";
  delBtn.style.cursor = "pointer";
  delBtn.innerHTML = "Delete";
  delBtn.style.float = "right";
  delBtn.onclick = delElement;

  //edit button
  let editBtn = document.createElement("button");
  editBtn.id = `editBtn - ${editBtnId++}`;
  editBtn.style.border = "1px solid #333";
  editBtn.style.background = "#333";
  editBtn.style.color = "white";
  editBtn.style.padding = "5px";
  editBtn.style.marginRight = "5px";
  editBtn.style.cursor = "pointer";
  editBtn.innerHTML = "Edit";
  editBtn.style.float = "right";
  editBtn.onclick = editElement;

  const span = document.createElement("span");
  span.appendChild(delBtn);
  span.appendChild(editBtn);

  const h3 = document.createElement("h3");
  h3.innerHTML = "Title: " + title;
  const p = document.createElement("p");
  p.innerHTML = "Description: " + description;

  if (title !== "" && description !== "") {
    const div = document.createElement("div");
    //drag funtanility
    div.ondragstart = dragStart;
    div.ondrag = dragElement;
    // div.ondrop = dropElement;
    div.draggable = true;
    div.id = `${listId++}`;

    div.style.border = "1px solid #333";
    div.style.padding = "10px";
    div.style.margin = "10px";
    div.appendChild(span);
    div.appendChild(h3);
    div.appendChild(p);
    document.getElementById("list").appendChild(div);
    //stroing in array
    const list = {
      title,
      description,
      id: `${arrayListId++}`,
    };
    arr.list.push(list);
  }

  //clear input fields and title,description
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  title = "";
  description = "";
};

document.getElementById("title").addEventListener("change", (e) => {
  title = e.target.value;
});

document.getElementById("desc").addEventListener("change", (e) => {
  description = e.target.value;
});

//in-progress list
const inProgress = document.getElementById("in-progress");
inProgress.className = "droptarget";
inProgress.ondrop = dropElement;
inProgress.ondragover = allowDrop;

//finish list
const finish = document.getElementById("finish-list");
finish.className = "droptarget";
finish.ondrop = dropElement;
finish.ondragover = allowDrop;

const list = document.getElementById("list");
list.className = "droptarget";
list.ondrop = dropElement;
list.ondragover = allowDrop;
