'use strict';

module.exports.getAndSaveUser = (controller, userFound, cb) => {
    
    var isNew = false;

    controller.storage.users.all((err, all_user_data) => {
        console.log(all_user_data);
    })

    controller.storage.users.get(userFound.id, function(err, user) {
        if (!user) {
            user = {
                id: userFound.id,
            };
        }else{
            //console.log(user.id, isNew ? 'new': 'not new')
            cb(user, isNew, null);
        }
        user.name = userFound.name;
        controller.storage.users.save(user, function(err, id) {
            if(!err){
                isNew = true;
                //console.log(user.id, isNew ? 'new': 'not new')
                cb(user, isNew, null);
            }else{
                cb(null, null, err);
            }
        });
    });
};