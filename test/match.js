var response = 'super';

var re = new RegExp(/(large)|(extra-large)|(medium)|(small)/);
if(re.exec(response)){
    console.log(response);
}else{
    console.log('we dont have that');
}