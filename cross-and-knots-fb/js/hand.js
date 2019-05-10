let handCollection = db.collection('message');

handCollection.add({
  message: 'test'
})
.then(doc => {
  console.log(`${doc.id}がadded!`);
})
.catch(error => {
  console.log('うまくいかなかったよ');
})
