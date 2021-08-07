const ul = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
const collection = db.collection('cafes');
const render = (record) =>{

    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');
    const X = document.createElement('div');


    name.innerText = record.data().name;
    city.innerText = record.data().city;
    X.innerText = 'X';
    
    li.appendChild(name); 
    li.appendChild(city); 
    li.appendChild(X);

    ul.appendChild(li); 

    li.setAttribute('data-id', record.id);

    deleteRecord(X)

}

// get all data from db
        /*
        // db.collection('cafes') //
            //get collection to work on it
        // console.log(db.collection('cafes').get()) 
            //this is a promise
// =>   // collection.where('name | city(one key)', '==  | > | < ', 'the value').get().then((snapshot) =>{  
            //selecting the main record in db
        // collection.orderBy('name').get().then((snapshot) =>{ 
            //ordering data according to one value in db
        // collection.where('', '', '').orderBy('').get().then((snapshot) =>{ 
            //you can do this
        */
// collection.orderBy('name').get().then((snapshot) =>{
//     //console.log(snapshot.docs);
//     snapshot.docs.forEach(record =>{
//         //console.log(record.data());
//         render(record);
//     })
// });


//get all data from db and make it realTime with UI
collection.orderBy('name').onSnapshot(snapshot => {
    let AllChanges = snapshot.docChanges()
    //console.log(AllChanges)
    AllChanges.forEach(change =>{
        if(change.type == 'added'){
            render(change.doc)
        }else if(change.type == 'removed'){
            const li = document.querySelector('[data-id='+ change.doc.id+']');
            ul.removeChild(li)
        }
    })
})

// add record
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    collection.add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = ''
}) 

//delete a record
const deleteRecord = (X)=>{
    X.addEventListener('click' ,(e)=>{
        //selet your record id
        const id = e.target.parentElement.getAttribute('data-id')
        console.log(id,'is deleting')
        //then delete it
        collection.doc(id).delete();
        console.log(id,'is deleted')
    })
}
//updata a record

// => collection.doc(id).updata({
    //     key1: value1,
    //     key2: value2,
    //     or one key 
    // })