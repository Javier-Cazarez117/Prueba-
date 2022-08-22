const AccessControl = require ('accesscontrol');

const ac = new AccessControl();

exports.roles = () => {
  ac.grant('usuario');

  ac.grant('admin')
    .readAny(['certification', 'commentary', 'course', 'specialty'])
    .createAny(['certification', 'course', 'specialty']);
    
  ac.grant('super')
    .extend('admin')
    .readAny(['user'])
    .updateAny(['certification', 'course', 'specialty', 'user'])
    .deleteAny(['certification', 'commentary', 'course', 'specialty', 'user']);

    return ac;  
  }