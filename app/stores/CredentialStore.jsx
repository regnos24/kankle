import Reflux from 'reflux';
import { CredentialLookupActions } from './../actions.jsx';

var CredentialStore = Reflux.createStore({
  //////////Mixins
  listenables: CredentialLookupActions,
  //////////Attributes
  config: null,
  //////////Action Methods
  onFindCredentialFile: function(file_path){
    if(this.pathExists(file_path)) {
      this.config = this.readFile(file_path);
    } else {
      return false
    }
  },
  onReadFile: function(file_path){
    this.readFile(file_path);
  },
  ///////////Accessor Methods

  ///////////Class Methods
  pathExists: function(path){
    try {
      return fs.statSync(path);
    }
    catch (e) {
      return false;
    }
  },
  readFile: function(path){
   fs.readFile(path, (err, result) => {
      if (err) {
        console.log('Something is not right', e);
        return false
      } else {
        try {
          this.config = JSON.parse(result);
          this.emit({ config: JSON.parse(result) });
        } catch(e){
          console.warn('There was a problem parsing your json', e)
          return false
        }
      }
    });
  },
  emit: function(options) {
    this.trigger({ options: options });
  },
});

export default CredentialStore;
